(function() {
    'use strict';

    angular
        .module('TractNotes')
        .controller('MapController', MapController);

    /* @ngInject */
    function MapController($rootScope, $scope, $stateParams, locationService, controlService, drawnItemsService, xmldataService, ctecoDataService, $ionicPopover, popupService, IonicClosePopupService) {
        var vm = this;
        vm.title = 'MapController';

        vm.map = null;
        vm.baseMaps = null;
        vm.overlayMaps = null;
        vm.layercontrol = null;
        vm.hiThere = null;
        vm.recording = false;
        vm.drawControl = null;
        vm.scaleControl = null;
        vm.searchControl = null;

        vm.autoDiscover = autoDiscover;
        vm.createMarker = createMarker;
        vm.record = record;
        vm.draw = draw;
        vm.scale = scale;
        vm.search = search;
        vm.showPolygonArea = showPolygonArea;
        vm.showPolygonAreaEdited = showPolygonAreaEdited;
        vm.xmldata = xmldata;
        vm.trackPopup = trackPopup;

        activate();

        ////////////////

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
                'Tracks': {},
                'Other': {}
            };
            vm.layercontrol = L.control.groupedLayers(vm.baseMaps, vm.overlayMaps).addTo(vm.map);

            autoDiscover();
        }

        $scope.$watch((function() {
            return controlService.getDrawControl().checked;
        }), function(newVal, oldVal) {
            if (typeof newVal !== 'undefined') {
                vm.draw(newVal);

            }
        });

        $scope.$watch((function() {
            return controlService.getScaleControl().checked;
        }), function(newVal, oldVal) {
            if (typeof newVal !== 'undefined') {
                vm.scale(newVal);

            }
        });

        $scope.$watch((function() {
            return controlService.getSearchControl().checked;
        }), function(newVal, oldVal) {
            if (typeof newVal !== 'undefined') {
                vm.search(newVal);

            }
        });

        $scope.$watch((function() {
            return xmldataService.getImportURL();
        }), function(newVal, oldVal) {
            if (typeof newVal !== 'undefined' && newVal !== null) {
                vm.xmldata(newVal);

            }
        });

        /** @listens $rootScope.AddCTECO */
        $rootScope.$on('AddCTECO', function(event, data) {
            data.layer.addTo(vm.map);
            vm.layercontrol.addOverlay(data.layer, data.name, 'CTECO');
        });

        /** 
         * @listens $rootScope.RemoveCTECO
         * @todo remove layer from layer control
         */
        $rootScope.$on('RemoveCTECO', function(event, data) {
            data.layer.removeFrom(vm.map);
            //vm.layercontrol.removeLayer(CTECO.data.name);
        });

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
         * @function
         */
        function createMarker() {
            var currentPosition = locationService.locate();
            currentPosition.then(function(val) {
                if (typeof(val.error) === 'undefined') {
                    var lat = val.position.coords.latitude;
                    var long = val.position.coords.longitude;
                    var zoom = val.zoom;
                    if (vm.recording) {
                        var marker = L.marker([lat, long], zoom).addTo(vm.map);
                        locationService.addtocurrentTrack(marker);
                    } else {
                        if (vm.hiThere === null) {
                            vm.hiThere = L.marker([lat, long], zoom);
                            vm.hiThere.addTo(vm.map).bindPopup("Hi there!").openPopup();
                        } else {
                            vm.hiThere.setLatLng([lat, long], zoom);
                            vm.hiThere.addTo(vm.map).bindPopup("Hi there!").openPopup();
                        }
                    }
                } else {
                    console.log(val.error.message);
                }
            });
        }

        /**
         * Start or stop recording a track based on vm.recording state.
         * @function
         * @todo Abstract into two functions, startRecording() and stopRecording()
         */
        function record() {
            if (vm.recording === false) {
                vm.recording = true;
                var track = locationService.createTrack();
                var polyline = locationService.createPolyline();

                track.track.addLayer(polyline);
                polyline.addTo(vm.map);

                track.track.addTo(vm.map);
                vm.layercontrol.addOverlay(track.track, track.name, 'Tracks');

                locationService.start();
            } else {
                vm.recording = !vm.recording;
                if (vm.recording) {
                    locationService.start();
                } else {
                    locationService.stop();
                    vm.recording = false;
                    vm.trackPopup();
                }
            }
        }

        /**
         * Add or remove draw control.
         * @function
         * @param {boolean} data
         */
        function draw(data) {
            var drawn = drawnItemsService.getDrawnItems();

            if (vm.drawControl === null && data === true) {
                vm.map.addLayer(drawn);
                vm.layercontrol.addOverlay(drawn, 'Drawn items', 'Other');
                vm.map.on('draw:created', showPolygonArea);
                vm.map.on('draw:edited', showPolygonAreaEdited);
            }

            if (data === true) {
                vm.map.addLayer(drawn);
                vm.drawControl = new L.Control.Draw({
                    draw: {
                        position: 'topleft'
                    },
                    edit: {
                        featureGroup: drawn
                    }
                });

                vm.map.addControl(vm.drawControl);
            } else if (data === false && vm.drawControl !== null) {
                vm.map.removeControl(vm.drawControl);

                if (!$.isEmptyObject(drawn._layers)) {
                    vm.layercontrol.addOverlay(drawn, 'Drawn items');
                }
            }
        }

        /**
         * Add or remove scale control.
         * @function
         * @param {boolean} data
         */
        function scale(data) {
            if (data === true) {
                vm.scaleControl = L.control.scale().addTo(vm.map);
            } else if (data === false && vm.scaleControl !== null) {
                vm.scaleControl.removeFrom(vm.map);
            }
        }

        /**
         * Add or remove search control.
         * @function
         * @param {boolean} data
         */
        function search(data) {
            if (data === true) {
                vm.searchControl = L.Control.geocoder().addTo(vm.map);
            } else if (data === false && vm.searchControl !== null) {
                vm.searchControl.removeFrom(vm.map);
            }
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
                var tempLatLng = null;
                var totalDistance = 0.00000;
                $.each(e.layer._latlngs, function(i, latlng) {
                    if (tempLatLng === null) {
                        tempLatLng = latlng;
                        return;
                    }
                    totalDistance += tempLatLng.distanceTo(latlng);
                    tempLatLng = latlng;
                });
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

        function trackPopup() {
            $scope.data = {};

            var trackPopup = popupService.getTrackPopup($scope, vm);
            //IonicClosePopupService.register(trackPopup);

            trackPopup.then(function(res) {
                locationService.setTrackMetadata(res);
            });
        }
    }

    MapController.$inject = ['$rootScope', '$scope', '$stateParams', 'locationService', 'controlService', 'drawnItemsService', 'xmldataService', 'ctecoDataService', '$ionicPopover', 'popupService', 'IonicClosePopupService'];
})();