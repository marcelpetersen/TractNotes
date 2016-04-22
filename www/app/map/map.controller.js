(function() {
    'use strict';

    angular
        .module('TractNotes')
        .controller('MapController', MapController);

    MapController.$inject = ['$rootScope', '$scope', '$stateParams', 'layerControlService', 'locationService', 'trackService', 'drawnItemsService', 'importService', 'ctecoDataService', '$ionicModal'];

    /* @ngInject */
    function MapController($rootScope, $scope, $stateParams, layerControlService, locationService, trackService, drawnItemsService, importService, ctecoDataService, $ionicModal) {
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
        vm.input = {marker: null, track: null};

        vm.autoDiscover = autoDiscover;
        vm.createMarker = createMarker;
        vm.record = record;
        vm.drawInit = drawInit;
        vm.xmldata = xmldata;
        vm.saveTrack = saveTrack;
        vm.discardTrack = discardTrack;

        activate();

        ////////////////

        // @TODO refactor layers into service
        function activate() {
            L.mapbox.accessToken = 'pk.eyJ1Ijoic2RlbXVyamlhbiIsImEiOiJjaWc4OXU4NjgwMmJydXlsejB4NTF0cXNjIn0.98fgJXziGw5FQ_b1Ibl3ZQ';

            vm.map = L.mapbox.map('map');

            vm.baseMaps = {
                'Mapbox Streets': L.mapbox.tileLayer('mapbox.streets').addTo(vm.map),
                'Mapbox Satellite': L.mapbox.tileLayer('mapbox.satellite')
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
                var pos = locationService.getLastPos();
                var marker = L.marker([pos.lat, pos.long], 15).addTo(vm.map);
                vm.currentTrack.track.addLayer(marker);
                vm.currentTrack.markers.push(marker);
                // @TODO add info submitted to marker
                $scope.openMarkerModal();
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
                        $scope.openMarkerModal();
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
                });
            } else {
                var layerResult = importService.importFromURL(p);
                layerResult.then(function(layer) {
                    addLayer(layer);
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

        /** @listens $rootScope.Import */
        $rootScope.$on('Import', function(event, data) {
            vm.xmldata(data);
        });
        /** @listens $rootScope.AddDraw */
        /** @todo force layer to be toggled while control is active */
        $rootScope.$on('AddDraw', function(event, data) {
            if (vm.drawnItems === null) {
                vm.drawInit();
            }
            data.control.addTo(vm.map);
        });
        /** @listens $rootScope.RemoveDraw */
        $rootScope.$on('RemoveDraw', function(event, data) {
            data.control.removeFrom(vm.map);
        });

        /** @listens $rootScope.AddScale */
        $rootScope.$on('AddScale', function(event, data) {
            data.control.addTo(vm.map);
        });
        /** @listens $rootScope.RemoveScale */
        $rootScope.$on('RemoveScale', function(event, data) {
            data.control.removeFrom(vm.map);
        });

        /** @listens $rootScope.AddSearch */
        $rootScope.$on('AddSearch', function(event, data) {
            data.control.addTo(vm.map);
        });
        /** @listens $rootScope.RemoveSearch */
        $rootScope.$on('RemoveSearch', function(event, data) {
            data.control.removeFrom(vm.map);
        });

        /** @listens $rootScope.AddZoom */
        $rootScope.$on('AddZoom', function(event, data) {
            vm.map.removeControl(vm.map.zoomControl);
            data.control.addTo(vm.map);
        });
        /** @listens $rootScope.RemoveZoom */
        $rootScope.$on('RemoveZoom', function(event, data) {
            data.control.removeFrom(vm.map);
            vm.map.addControl(vm.map.zoomControl);
        });

        /** @listens $rootScope.AddCTECO */
        $rootScope.$on('AddCTECO', function(event, data) {
            data.layer.addTo(vm.map);
            vm.layercontrol.addOverlay(data.layer, data.name, 'CTECO');
        });
        /** @listens $rootScope.RemoveCTECO */
        $rootScope.$on('RemoveCTECO', function(event, data) {
            data.layer.removeFrom(vm.map);
            layerControlService.removeLayerInGroup(vm.layercontrol, data.layer);
        });

        /** @listens $rootScope.AddOrtho */
        $rootScope.$on('AddOrtho', function(event, data) {
            data.layer.addTo(vm.map);
            vm.layercontrol.addOverlay(data.layer, data.name, 'CTECO');
        });
        /** @listens $rootScope.RemoveOrtho */
        $rootScope.$on('RemoveOrtho', function(event, data) {
            data.layer.removeFrom(vm.map);
            layerControlService.removeLayerInGroup(vm.layercontrol, data.layer);
        });

        /** @listens $rootScope.WMSFromURL */
        $rootScope.$on('AddWMSFromURL', function(event, data) {
            data.layer.addTo(vm.map);
            vm.layercontrol.addOverlay(data.layer, data.name, 'WMS');
        });

        /** @listens $rootScope.AddWMSFromDefault */
        $rootScope.$on('AddWMSFromDefault', function(event, data) {
            data.layer.addTo(vm.map);
            vm.layercontrol.addOverlay(data.layer, data.name, 'WMS');
        });

        /** @listens $rootScope.RemoveWMSFromDefault */
        $rootScope.$on('RemoveWMSFromDefault', function(event, data) {
            console.log(data.layer);
            vm.map.removeLayer(data.layer);
            layerControlService.removeLayerInGroup(vm.layercontrol, data.layer);
        });

        // @todo remove once track.list.controller is refactored
        $rootScope.$on('RemoveTrack', function(event, data) {
            layerControlService.removeLayerInGroup(vm.layercontrol, data.track);
        });

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
        $scope.closeMarkerModal = function() {
            $scope.marker_edit_modal.hide();
        };
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