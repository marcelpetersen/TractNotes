(function() {
    'use strict';

    angular
        .module('TractNotes')
        .controller('MapController', MapController);

    /* @ngInject */
    function MapController($rootScope, $scope, $stateParams, locationService, controlService, drawnItemsService, xmldataService, ctecoService, $ionicPopover, popupService, IonicClosePopupService) {
        var vm = this;
        vm.title = 'MapController';

        vm.draw = draw;
        vm.scale = scale;
        vm.search = search;
        vm.drawControl = null;
        vm.scaleControl = null;
        vm.searchControl = null;
        vm.showPolygonArea = showPolygonArea;
        vm.showPolygonAreaEdited = showPolygonAreaEdited;
        vm.locate = locate;
        vm.cteco = cteco;
        vm.xmldata = xmldata;
        vm.gisPopup = gisPopup;
        vm.wmsPopup = wmsPopup;
        vm.msPopup = msPopup;
        vm.arcgisPopup = arcgisPopup;

        // actions on $rootScope events - controller to controller interaction
        $rootScope.$on('Draw', function(event, data) {
            vm.draw(data);
        });
        $rootScope.$on('Scale', function(event, data) {
            vm.scale(data);
        });

        $rootScope.$on('Search', function(event, data) {
            vm.search(data);
        });


        activate();

        ////////////////

        function activate() {
            L.mapbox.accessToken = 'pk.eyJ1Ijoic2RlbXVyamlhbiIsImEiOiJjaWc4OXU4NjgwMmJydXlsejB4NTF0cXNjIn0.98fgJXziGw5FQ_b1Ibl3ZQ';

            vm.map = L.mapbox.map('map');

            vm.baseMaps = {
                'Mapbox Streets': L.mapbox.tileLayer('mapbox.streets').addTo(vm.map),
                'Mapbox Satellite': L.mapbox.tileLayer('mapbox.satellite')
            };
            vm.overlayMaps = {};
            vm.layercontrol = L.control.layers(vm.baseMaps, vm.overlayMaps).addTo(vm.map);
            
            autoDiscover();

            // @TODO
            // remove tests
            // locate();
        }

        function autoDiscover() {
            var currentPosition = locationService.current();
            currentPosition.then(function(val) {
                vm.map.setView(val.gps, val.zoom);
            });
        }

        function locate() {
            var currentPosition = locationService.current();
            currentPosition.then(function(val) {
                var message = 'Hi there!';
                vm.map.setView(val.gps, val.zoom);
                if(val.error !== null){
                    message = 'Geolocation error'
                }

                L.marker(val.gps).addTo(vm.map).bindPopup(message).openPopup();
            });
        }

        // add or remove draw control
        function draw(data) {
            var drawn = drawnItemsService.getDrawnItems();

            if (vm.drawControl === null) {
                vm.map.addLayer(drawn);
                vm.layercontrol.addOverlay(drawn, 'Drawn items');
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
            } else if (data === false) {
                vm.map.removeControl(vm.drawControl);

                if (!$.isEmptyObject(drawn._layers)) {
                    vm.layercontrol.addOverlay(drawn, 'Drawn items');
                }
            }

            vm.map.on('draw:created', showPolygonArea);
            vm.map.on('draw:edited', showPolygonAreaEdited);
        }

        // add and remove scale control
        function scale(data) {
            if (data === true) {
                vm.scaleControl = L.control.scale().addTo(vm.map);
            } else if (data === false) {
                vm.scaleControl.removeFrom(vm.map);
            }
        }

        // add and remove search control
        function search(data) {
            if (data === true) {
                vm.searchControl = L.Control.geocoder().addTo(vm.map);
            } else if (data === false) {
                vm.searchControl.removeFrom(vm.map);
            }
        }

        function showPolygonAreaEdited(e) {
            e.layers.eachLayer(function(layer) {
                showPolygonArea({
                    layer: layer
                });
            });
        }

        // @TODO
        // abstract to drawnItems factory
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
                e.layer.bindPopup(((LGeo.area(e.layer) / 1000000) * 0.62137).toFixed(2) + ' mi<sup>2</sup>');
                e.layer.openPopup();
            } else if (type === 'marker') {
                drawnItemsService.addToDrawnItems(layer);
                var newLoc = layer.getLatLng();
                console.log(newLoc);
                var currentPosition = locationService.current();
                currentPosition.then(function(val) {
                    e.layer.bindPopup((newLoc.distanceTo(val.gps)).toFixed(0) + 'm from current position.');
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

                            if (name !== null) {
                                content = '<h2>' + name + '</h2>';
                                if (desc !== null) {
                                    content += '<p>' + desc + '</p';
                                    layer.bindPopup(content);
                                } else {
                                    layer.bindPopup(content);
                                }
                            } else if (desc !== null) {
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

        function cteco(layer) {
            var cteco = ctecoService.getcteco(layer);
            vm.layercontrol.addOverlay(cteco.layer, cteco.name);
        }

        // Popup functions
        function gisPopup() {
            $scope.data = {};
            var gisPopup = popupService.getGISPopup($scope, vm);
            IonicClosePopupService.register(gisPopup);

            gisPopup.then(function(res) {
                vm.xmldata(res);
                console.log('Tapped!', res);
            });
        }

        function wmsPopup() {
            $scope.data = {};
            var wmsPopup = popupService.getWMSPopup($scope, vm);
            IonicClosePopupService.register(wmsPopup);

            wmsPopup.then(function(res) {
                console.log('Tapped!', res);
            });
        }

        function arcgisPopup() {
            $scope.data = {};
            var arcgisPopup = popupService.getArcGISPopup($scope, vm);
            IonicClosePopupService.register(arcgisPopup);

            arcgisPopup.then(function(res) {
                console.log('Tapped!', res);
            });
        }

        function msPopup() {
            $scope.data = {};
            var msPopup = popupService.getMSPopup($scope, vm);
            IonicClosePopupService.register(msPopup);

            msPopup.then(function(res) {
                console.log('Tapped!', res);
            });
        }
    }

    MapController.$inject = ['$rootScope', '$scope', '$stateParams', 'locationService', 'controlService', 'drawnItemsService', 'xmldataService', 'ctecoService', '$ionicPopover', 'popupService', 'IonicClosePopupService'];
})();