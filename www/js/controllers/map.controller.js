(function() {
    'use strict';

    angular
        .module('TractNotes')
        .controller('MapController', MapController);

    MapController.$inject = ['$rootScope', '$scope', '$stateParams', 'layerControlService', 'locationService', 'trackService', 'controlService', 'drawnItemsService', 'xmldataService', 'ctecoDataService', '$ionicModal'];

    /* @ngInject */
    function MapController($rootScope, $scope, $stateParams, layerControlService, locationService, trackService, controlService, drawnItemsService, xmldataService, ctecoDataService, $ionicModal) {
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
        vm.input = null;

        vm.autoDiscover = autoDiscover;
        vm.createMarker = createMarker;
        vm.record = record;
        vm.drawInit = drawInit;
        vm.showPolygonArea = showPolygonArea;
        vm.showPolygonAreaEdited = showPolygonAreaEdited;
        vm.xmldata = xmldata;
        vm.saveTrack = saveTrack;
        vm.discardTrack = discardTrack;


        //@todo change events to factory listeners
        /** @listens $rootScope.Import */
        $rootScope.$on('Import', function(event, data) {
            vm.xmldata(data);
        });

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

                locationService.start();
            } else {
                vm.recording = !vm.recording;
                if (vm.recording) {
                    locationService.start();
                } else {
                    locationService.stop();
                    vm.recording = false;
                    $scope.openModal();
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
            vm.map.on('draw:created', showPolygonArea);
            vm.map.on('draw:edited', showPolygonAreaEdited);
        }

        /**
         * Recalculate area/length of each layer on edit.
         * @function
         * @param {object} layer
         */
        function showPolygonAreaEdited(e) {
            e.layers.eachLayer(function(layer) {
                showPolygonArea({
                    layer: layer
                });
            });
        }

        /**
         * Show area/length of each layer on created.
         * @function
         * @author https://stackoverflow.com/questions/31221088/how-to-calculate-the-distance-of-a-polyline-in-leaflet-like-geojson-io
         * @param {object} layer
         * @todo Abstract into drawnItems.factory.js
         */
        function showPolygonArea(e) {
            var type = e.layerType;
            var layer = e.layer;
            if (type === 'polyline') {
                drawnItemsService.addToDrawnItems(layer);
                var tempLatLng = e.layer._latlngs[0];
                var totalDistance = 0.00000;
                console.log(e.layer._latlngs.length)
                for (var i = 0; i < e.layer._latlngs.length; i++){
                    var latlng = e.layer._latlngs[i];
                    totalDistance += tempLatLng.distanceTo(latlng);
                    tempLatLng = latlng;
                }
                e.layer.bindPopup((totalDistance).toFixed(2) + ' meters');
                e.layer.openPopup();
            } else if (type === 'circle') {
                drawnItemsService.addToDrawnItems(layer);
                var area = 0;
                var radius = e.layer.getRadius();
                area = (Math.PI) * (radius * radius);
                e.layer.bindPopup((area / 1000000).toFixed(2) + ' km<sup>2</sup>');
                e.layer.openPopup();
            } else if (type === 'polygon' || type === 'rectangle') {
                drawnItemsService.addToDrawnItems(layer);
                e.layer.bindPopup((LGeo.area(e.layer) / 1000000).toFixed(2) + ' km<sup>2</sup>');
                e.layer.openPopup();
            } else if (type === 'marker') {
                drawnItemsService.addToDrawnItems(layer);
                var newLoc = layer.getLatLng();
                var currentPosition = locationService.locate();
                currentPosition.then(function(val) {
                    var lat = val.position.coords.latitude;
                    var long = val.position.coords.longitude;
                    e.layer.bindPopup((newLoc.distanceTo([lat, long])).toFixed(2) + 'm from current position.');
                });
            } else {
                drawnItemsService.addToDrawnItems(layer);
            }

        }

        function xmldata(layer) {
            var layerResult = xmldataService.getxmldata(layer);
            layerResult.then(function(val) {
                $scope.$apply(function() {
                    var finalLayer = val.on('ready', function() {
                        vm.map.fitBounds(val.getBounds());
                        val.eachLayer(function(layer) {
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
                    });
                    finalLayer.addTo(vm.map);
                    vm.layercontrol.addOverlay(finalLayer, layer);
                });

            });

        }

        function saveTrack() {
            trackService.setCurrentTrack(vm.currentTrack);
            trackService.setTrackMetadata(vm.input);
            vm.input = null;
            $scope.closeModal();
        }

        function discardTrack() {
            layerControlService.removeLayerInGroup(vm.layercontrol, vm.currentTrack.track);
            trackService.deleteTrack(vm.currentTrack.track);
            $scope.closeModal();
        }

        ////////////////

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
        $rootScope.$on('wmsFromURL', function(event, data) {
            console.log(data.layer);
            data.layer.addTo(vm.map);
            vm.layercontrol.addOverlay(data.layer, data.name, 'WMS');
        });

        // @todo remove once track.list.controller is refactored
        $rootScope.$on('RemoveTrack', function(event, data) {
            layerControlService.removeLayerInGroup(vm.layercontrol, data.track);
        });

        // @TODO refactor into service
        $ionicModal.fromTemplateUrl('../templates/modal.track.save.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });
        $scope.openModal = function() {
            $scope.modal.show();
        };
        $scope.closeModal = function() {
            $scope.modal.hide();
        };
        //Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function() {
            $scope.modal.remove();
        });
        // Execute action on hide modal
        $scope.$on('modal.hidden', function() {
            // Execute action
        });
        // Execute action on remove modal
        $scope.$on('modal.removed', function() {
            // Execute action
        });
    }
})();