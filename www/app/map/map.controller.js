(function() {
    'use strict';

    angular
        .module('TractNotes')
        .controller('MapController', MapController);

    MapController.$inject = ['$rootScope', '$scope', '$stateParams', 'layerControlService', 'locationService', 'trackService', 'drawnItemsService', 'importService', 'ctecoDataService', 'settingsService', '$ionicModal', 'popupService', 'IonicClosePopupService', 'Drive'];

    /* @ngInject */
    function MapController($rootScope, $scope, $stateParams, layerControlService, locationService, trackService, drawnItemsService, importService, ctecoDataService, settingsService, $ionicModal, popupService, IonicClosePopupService, Drive) {
        var vm = this;
        vm.title = 'MapController';

        vm.map = null;
        vm.baseMaps = null;
        vm.overlayMaps = null;
        vm.layercontrol = null;
        vm.hiThere = null;
        vm.recording = false;
        vm.currentTrack = null;
        vm.currentPolyline = null;
        vm.drawnItems = null;
        vm.files = null;
        vm.urlList = [];
        vm.input = {
            marker: {
                title: null,
                description: null
            },
            track: null
        };

        vm.autoDiscover = autoDiscover;
        vm.createMarker = createMarker;
        vm.record = record;
        vm.drawInit = drawInit;
        vm.xmldata = xmldata;
        vm.saveTrack = saveTrack;
        vm.discardTrack = discardTrack;

        vm.saveMarkerModal = saveMarkerModal;
        vm.closeMarkerModal = closeMarkerModal;
        vm.showUrlPopup = showUrlPopup;
        vm.goToDrive = goToDrive;
        vm.importFromDevice = importFromDevice;
        vm.importFromDrive = importFromDrive;

        activate();

        ////////////////

        // @TODO refactor layers into service
        function activate() {
            L.mapbox.accessToken = 'pk.eyJ1Ijoic2RlbXVyamlhbiIsImEiOiJjaWc4OXU4NjgwMmJydXlsejB4NTF0cXNjIn0.98fgJXziGw5FQ_b1Ibl3ZQ';
            var streetsTiles = 'http://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=' + L.mapbox.accessToken;
            var satelliteTiles = 'http://api.tiles.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.png?access_token=' + L.mapbox.accessToken;

            vm.map = L.mapbox.map('map');

            vm.streets = L.tileLayerCordova(streetsTiles, {
                'minzoom': 0,
                'maxzoom': 18,
                folder: 'TractNotes',
                name: 'streets',
                debug: true
            })
            

            vm.satellite = L.tileLayer(satelliteTiles, {
                'minzoom': 0,
                'maxzoom': 18
            })

            vm.baseMaps = {
                'Mapbox Streets': vm.streets.addTo(vm.map),
                'Mapbox Satellite': vm.satellite
            };


            vm.overlayMaps = {
                'Imported': {},
                'CTECO': {},
                'WMS': {},
                'Tracks': {},
                'Other': {}
            };
            vm.layercontrol = L.control.groupedLayers(vm.baseMaps, vm.overlayMaps).addTo(vm.map);

            autoDiscover();
        }

        /**
         * Set map view to the user's current location.
         * @function
         */
        function autoDiscover() {
            var currentPosition = locationService.locate();
            currentPosition.then(function(val) {
                if (typeof(val.error) === 'undefined') {
                    var lat = val.position.coords.latitude;
                    var long = val.position.coords.longitude;
                    var zoom = val.zoom;
                    vm.map.setView([lat, long], zoom);
                } else {
                    console.log(val.error.message);
                    vm.map.setView([41.6, -72.7], 10);
                }
            });
        }

        /**
         * Create a marker at the user's current location.
         * During record mode, add the marker to the current Track.
         * @function
         */
        function createMarker() {
            if (vm.recording) {
                //might want to find position here and pass value along
                $scope.openMarkerModal(); //goes to either saveMarkerModal or closeMarkerModal
            } else {
                var currentPosition = locationService.locate();
                currentPosition.then(function(val) {
                    if (typeof(val.error) === 'undefined') {
                        var lat = val.position.coords.latitude;
                        var long = val.position.coords.longitude;
                        var zoom = val.zoom;
                        if (vm.hiThere === null) {
                            vm.hiThere = L.marker([lat, long], zoom);
                            vm.hiThere.addTo(vm.map).bindPopup("Hi there!").openPopup();
                        } else {
                            vm.hiThere.setLatLng([lat, long], zoom);
                            vm.hiThere.addTo(vm.map).bindPopup("Hi there!").openPopup();
                        }
                    } else {
                        console.log(val.error.message);
                    }
                });
            }
        }

        /**
         * Start or stop recording a track based on vm.recording state.
         * @function
         * @todo Abstract into two functions, startRecording() and stopRecording()
         */
        function record() {
            if (vm.recording === false) {
                vm.recording = true;
                vm.currentTrack = trackService.createTrack();
                vm.currentPolyline = trackService.createPolyline();

                vm.currentTrack.track.addLayer(vm.currentPolyline);
                vm.currentTrack.polyline = vm.currentPolyline;
                vm.currentPolyline.addTo(vm.map);

                vm.currentTrack.track.addTo(vm.map);

                vm.layercontrol.addOverlay(vm.currentTrack.track, vm.currentTrack.name, 'Tracks');

                // Listener for clicks on layer elements
                vm.currentTrack.track.on('click', function(e) {
                    console.log(e)
                    // I do not think this is an acceptable way to test if layer is marker
                    // works in layer of just polyline + markers but is not elegant
                    // @TODO improve
                    if (e.layer._icon) {
                        // @TODO add info submitted to marker
                        // $scope.openMarkerModal();
                    }

                });

                locationService.start();
            } else {
                vm.recording = !vm.recording;
                if (vm.recording) {
                    locationService.start();
                } else {
                    locationService.stop();
                    vm.recording = false;
                    $scope.openTrackModal();
                }
            }
        }

        /**
         * Initialize the drawnItems layer.
         * @function
         */
        function drawInit() {
            vm.drawnItems = drawnItemsService.getDrawnItems();
            vm.map.addLayer(vm.drawnItems);
            vm.layercontrol.addOverlay(vm.drawnItems, 'Drawn items', 'Other');
            vm.map.on('draw:created', drawnItemsService.showPolygonArea);
            vm.map.on('draw:edited', drawnItemsService.showPolygonAreaEdited);
        }

        function xmldata(p) {
            // @todo layer should be object with source information + url
            // this check will change
            if (p.indexOf('content://') > -1) {
                var textResult = importService.getFileText(p);
                textResult.then(function(text) {
                    var layer = importService.importFromText(text);
                    console.log(layer)
                    addLayer(layer);
                    var name = p.substring(p.lastIndexOf('/') + 1)
                    vm.layercontrol.addOverlay(layer, name, 'Tracks');

                });
            } else {
                var layerResult = importService.importFromURL(p);
                layerResult.then(function(layer) {
                    addLayer(layer);
                    var name = p.substring(p.lastIndexOf('/') + 1)
                    vm.layercontrol.addOverlay(layer, name, 'Tracks');
                });
            }

            //@todo should move to VM, better yet, move to map factory
            function addLayer(layer) {
                $scope.$apply(function() {
                    var finalLayer = layer.on('ready', function() {
                        if (layer._leaflet_id == true) {
                            vm.map.fitBounds(layer.getBounds());
                            layer.eachLayer(function(layer) {
                                var content;
                                var name = layer.feature.properties.name;
                                var desc = layer.feature.properties.desc;

                                if (name !== undefined) {
                                    content = '<h2>' + name + '</h2>';
                                    if (desc !== undefined) {
                                        content += '<p>' + desc + '</p';
                                        layer.bindPopup(content);
                                    } else {
                                        layer.bindPopup(content);
                                    }
                                } else if (desc !== undefined) {
                                    content = '<h2>' + desc + '</h2>';
                                    layer.bindPopup(content);
                                }
                            });
                        }
                    });
                    finalLayer.addTo(vm.map);
                    vm.layercontrol.addOverlay(finalLayer, layer);
                });
            }
        }

        function saveTrack() {
            trackService.setCurrentTrack(vm.currentTrack);
            trackService.setTrackMetadata(vm.input.track);
            vm.input.track = null;
            $scope.closeTrackModal();
        }

        function discardTrack() {
            layerControlService.removeLayerInGroup(vm.layercontrol, vm.currentTrack.track);
            trackService.deleteTrack(vm.currentTrack.track);
            $scope.closeTrackModal();
        }

        /**
         * Patches map in corner bug, by "resizing" the map whenever it would occur
         */
        $scope.$on('$ionicView.afterEnter', function() {
            ionic.trigger('resize');
        });

        ////////////////

        /** @listens $rootScope.AddControl */
        /** @todo force layer to be toggled while control is active */
        $rootScope.$on('AddControl', function(event, data) {
            if (data.text === 'Draw Control' && vm.drawnItems === null) {
                vm.drawInit();
            }
            if (data.text === 'Zoom Control') {
                vm.map.removeControl(vm.map.zoomControl);
            }
            data.control.addTo(vm.map);
        });
        /** @listens $rootScope.RemoveControl */
        $rootScope.$on('RemoveControl', function(event, data) {
            data.control.removeFrom(vm.map);
            if (data.text === 'Zoom Control') {
                vm.map.addControl(vm.map.zoomControl);
            }
        });

        /** @listens $rootScope.AddLayer */
        $rootScope.$on('AddLayer', function(event, data) {
            data.layer.addTo(vm.map);
            vm.layercontrol.addOverlay(data.layer, data.name, data.layerType.toUpperCase());
        });
        /** @listens $rootScope.RemoveLayer */
        $rootScope.$on('RemoveLayer', function(event, data) {
            if (data.layerType == 'wms') {
                vm.map.removeLayer(data.layer);
            } else {
                data.layer.removeFrom(vm.map);
            }
            layerControlService.removeLayerInGroup(vm.layercontrol, data.layer);
        });


        /** @listens $rootScope.Import */
        $rootScope.$on('Import', function(event, data) {
            vm.xmldata(data);
        });
        // @todo remove once track.list.controller is refactored
        $rootScope.$on('RemoveTrack', function(event, data) {
            layerControlService.removeLayerInGroup(vm.layercontrol, data.track);
        });

        $rootScope.$on('ChangeMapStatus', function(event, data) {
            if (data === true) {
                console.log('going offline')
                vm.streets.goOffline();
            } else if (data === false) {
                console.log('going online')

                vm.streets.goOnline();
            }
        })
        $rootScope.$on('CacheBounds', function(event, data) {
            console.log('trying to cache')
            var tile_list = vm.streets.calculateXYZListFromBounds(vm.map.getBounds(), vm.map.getZoom(), 18)
            vm.streets.downloadXYZList(tile_list, false, function() {}, function() {
                vm.streets.getDiskUsage(function(filecount, bytes) {
                    console.log(bytes)
                    settingsService.setCurrentDiskUsage(bytes)
                });
            }, function() {})

        })

        // move to view model
        $ionicModal.fromTemplateUrl('app/map/modal.marker.edit.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.marker_edit_modal = modal;
        });

        $scope.openMarkerModal = function() {
            $scope.marker_edit_modal.show();
        };

        function closeMarkerModal() {
            $scope.marker_edit_modal.hide();
            vm.input.marker.title = null;
            vm.input.marker.description = null;
            vm.urlList = [];
        };

        function saveMarkerModal() {
            var pos = locationService.getLastPos();
            var marker = L.marker([pos.lat, pos.long], 15).addTo(vm.map);
            vm.currentTrack.track.addLayer(marker);
            vm.currentTrack.markers.push(marker);

            //marker popup information
            var content = "";
            var name = vm.input.marker.title;
            var desc = vm.input.marker.description;

            if (name) {
                content = '<h2>' + name + '</h2>';
                if (desc) {
                    content += '<p>' + desc + '</p>';
                }
            } else if (desc) {
                content = '<h2>' + desc + '</h2>';
            }

            //add imported images
            if (vm.urlList.length > 0) {
                var url;
                for (url in vm.urlList) {
                    content += '<img width=100% src="' + vm.urlList[url] + '" />';
                }
            }
            console.log(content);
            marker.bindPopup(content).openPopup();
            closeMarkerModal();
        };

        function showUrlPopup() {
            $scope.data = {};
            var waypointUrlPopup = popupService.getUrlPopup($scope);
            waypointUrlPopup.then(function(res) {
                if (res) {
                    console.log('Import to waypoint from URL confirmed');
                    vm.urlList.push($scope.data.urlInput);
                } else {
                    console.log('Import to waypoint from URL cancelled');
                }
            });
            // tapping to close popup seems to not work when popup is on top of a modal (like this one)
            IonicClosePopupService.register(waypointUrlPopup);
        }

        function importFromDevice() {
            var textResult = null;
            fileChooser.open(function(uri) {
                console.log(uri);
                window.FilePath.resolveNativePath(uri,
                    function(result) {
                        console.log("result: " + result);
                        vm.urlList.push(result);
                    },
                    function(error) {
                        console.log("file path error");
                    });
            });
        }

        function goToDrive() {
            var auth_token = gapi.auth.getToken();
            if (auth_token) {
                $scope.openDriveModal();
            } else {
                var client_id = "775512295394-hhg8etqdcmoc8i7r5a6m9d42d4ebu63d.apps.googleusercontent.com"; //web-app
                var scopes = ['https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/drive.file'];

                Drive.authenticate(client_id, scopes, {
                    redirect_uri: 'http://localhost/callback/'
                })
                    .then(function(response) { //authenticate
                            if (response) {
                                gapi.auth.setToken(response);
                                $scope.openDriveModal();
                            }
                        },
                        function(error) {
                            console.log("" + error);
                        });
            }
        }

        function importFromDrive(url) {
            vm.urlList.push(url);
            $scope.closeDriveModal();
        }

        //Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function() {
            $scope.marker_edit_modal.remove();
        });
        /*
        // Execute action on hide modal
        $scope.$on('modal.hidden', function() {
            // Execute action
        });
        // Execute action on remove modal
        $scope.$on('modal.removed', function() {
            // Execute action
        });
        */

        $ionicModal.fromTemplateUrl('app/map/modal.marker.drive.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.marker_drive_modal = modal;
        });
        $scope.openDriveModal = function() {
            Drive.readImages().then(function(files) {
                console.log("FileRead: success.");
                vm.files = files;
            }, function() {
                console.log("FileRead: error.");
            });
            $scope.marker_drive_modal.show();
        };
        $scope.closeDriveModal = function() {
            $scope.marker_drive_modal.hide();
        };
        //Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function() {
            $scope.marker_drive_modal.remove();
        });
        /*
        // Execute action on hide modal
        $scope.$on('modal.hidden', function() {
            // Execute action
        });
        // Execute action on remove modal
        $scope.$on('modal.removed', function() {
            // Execute action
        });
        */


        $ionicModal.fromTemplateUrl('app/map/modal.track.save.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.track_save_modal = modal;
        });
        $scope.openTrackModal = function() {
            $scope.track_save_modal.show();
        };
        $scope.closeTrackModal = function() {
            $scope.track_save_modal.hide();
        };
        //Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function() {
            $scope.track_save_modal.remove();
        });
        /*
        // Execute action on hide modal
        $scope.$on('modal.hidden', function() {
            // Execute action
        });
        // Execute action on remove modal
        $scope.$on('modal.removed', function() {
            // Execute action
        });
        */
    }
})();