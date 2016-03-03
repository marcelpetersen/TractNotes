(function() {
    'use strict';

    angular
        .module('TractNotes')
        .controller('MapController', MapController);

    /* @ngInject */
    function MapController($scope, $stateParams, locationService, controlService, drawnItems, xmldataService, ctecoService, $ionicPopover, popupService, IonicClosePopupService) {
        var vm = this;
        vm.title = 'MapController';

        vm.draw = draw;
        vm.scale = scale;
        vm.search = search;
        vm.showPolygonArea = showPolygonArea;
        vm.showPolygonAreaEdited = showPolygonAreaEdited;
        vm.locate = locate;
        vm.cteco = cteco;
        vm.xmldata = xmldata;
        vm.gisPopup = gisPopup;
        vm.wmsPopup = wmsPopup;
        vm.msPopup = msPopup;
        vm.arcgisPopup = arcgisPopup;

        $scope.$on("$stateChangeSuccess", function(event, toState, toParams, fromState, fromParams) {
            if (toState.name == 'app.map') {


                vm.draw();
                vm.scale();
                vm.search();
            }
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

            vm.drawControl = {
                position: '',
                control: null
            };
            vm.scaleControl = {
                position: '',
                control: null
            };
            vm.searchControl = {
                position: '',
                control: null
            };
            // @TODO: remove examples once import is finalized
            //xmldata('LaurelHall.gpx');
            //xmldata('https://developers.google.com/kml/documentation/KML_Samples.kml');
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
                vm.map.setView(val.gps, val.zoom);
                L.marker([lat, long]).addTo(vm.map).bindPopup('Hi there').openPopup();
            });
        }

        // add and remove draw control
        function draw() {
            var drawn = drawnItems.getDrawnItems();
            // if the control is not on the map, but the control was set to active by ControlController, display the control
            if (controlService.getDraw().active === true) {
                vm.map.addLayer(drawn);
                vm.layercontrol.addOverlay(drawn, 'Drawn items');

                // initialize the control and add to map
                vm.drawControl.control = new L.Control.Draw({
                    draw: {
                        position: 'topleft'
                    },
                    edit: {
                        featureGroup: drawn
                    }
                });

                vm.map.addControl(vm.drawControl.control);
            }
            // if the control is on the map, but the control was set to inactive, remove the control from the map
            else if (controlService.getDraw().active === false && vm.drawControl.control !== null) {
                vm.map.removeControl(vm.drawControl.control);
                if (!$.isEmptyObject(drawn._layers)) {vm.layercontrol.addOverlay(drawn, 'Drawn items');}
            }

            vm.map.on('draw:created', showPolygonArea);
            vm.map.on('draw:edited', showPolygonAreaEdited);
        }

        // add and remove scale control
        function scale() {
            if (controlService.getScale().active !== false) {
                vm.scaleControl.control = L.control.scale().addTo(vm.map);
            } else if (vm.scaleControl.control !== null && controlService.getScale().active !== true) {
                vm.scaleControl.control.removeFrom(vm.map);
            }
        }

        // add and remove search control
        function search() {
            if (controlService.getSearch().active !== false) {
                vm.searchControl.control = L.Control.geocoder().addTo(vm.map);
            } else if (vm.searchControl.control !== null && controlService.getSearch().active !== true) {
                vm.searchControl.control.removeFrom(vm.map);
            }
        }

        function showPolygonAreaEdited(e) {
            e.layers.eachLayer(function(layer) {
                showPolygonArea({
                    layer: layer
                });
            });
        }


        function showPolygonArea(e) {
            var type = e.layerType;
            var layer = e.layer;
            if (type === 'polyline') {
                drawnItems.addToDrawnItems(layer);
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
                drawnItems.addToDrawnItems(layer);
                var area = 0;
                var radius = e.layer.getRadius();
                area = (Math.PI) * (radius * radius);
                e.layer.bindPopup((area / 1000000).toFixed(2) + ' km<sup>2</sup>');
                e.layer.openPopup();
            } else if (type === 'polygon' || type === 'rectangle') {
                drawnItems.addToDrawnItems(layer);
                e.layer.bindPopup(((LGeo.area(e.layer) / 1000000) * 0.62137).toFixed(2) + ' mi<sup>2</sup>');
                e.layer.openPopup();
            } else {
                drawnItems.addToDrawnItems(layer);
                var newLoc = layer.getLatLng();
                console.log(newLoc);
                var currentPosition = locationService.current();
                currentPosition.then(function(val) {
                    e.layer.bindPopup((newLoc.distanceTo(val.gps)).toFixed(0) + 'm from current position.');
                });
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

    MapController.$inject = ['$scope', '$stateParams', 'locationService', 'controlService', 'drawnItems', 'xmldataService', 'ctecoService', '$ionicPopover', 'popupService', 'IonicClosePopupService'];
})();