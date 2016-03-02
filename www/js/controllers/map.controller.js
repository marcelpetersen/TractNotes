(function() {
    'use strict';

    angular
        .module('TractNotes')
        .controller('MapController', MapController);

    /* @ngInject */
    function MapController($scope, $stateParams, controlService, xmldataService, ctecoService, $ionicPopover, popupService, IonicClosePopupService) {
        var vm = this;
        vm.title = 'MapController';
        vm.draw = draw;
        vm.measure = measure;
        vm.scale = scale;
        vm.search = search;
        vm.drawnItems = null;
        vm.locate = locate;
        vm.cteco = cteco;
        vm.xmldata = xmldata;
        vm.popover = null;
        vm.openPopover = openPopover;
        vm.closePopover = closePopover;
        vm.gisPopup = gisPopup;
        vm.wmsPopup = wmsPopup;
        vm.msPopup = msPopup;
        vm.arcgisPopup = arcgisPopup;

        $scope.$on("$stateChangeSuccess", function(event, toState, toParams, fromState, fromParams) {
            if (toState.name == 'app.map') {
                vm.draw();
                vm.scale();
                vm.search();
                vm.measure();
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
                state: false,
                position: '',
                control: null
            };
            vm.measureControl = {
                state: false,
                position: '',
                control: null
            };
            vm.scaleControl = {
                state: false,
                position: '',
                control: null
            };
            vm.searchControl = {
                state: false,
                position: '',
                control: null
            };

            $ionicPopover.fromTemplateUrl('templates/map.popover.html', {
                scope: $scope
            }).then(function(popover) {
                vm.popover = popover;
            });
            // @TODO: remove examples once import is finalized
            //xmldata('LaurelHall.gpx');
            //xmldata('https://developers.google.com/kml/documentation/KML_Samples.kml');
        }

        function autoDiscover() {
            navigator.geolocation.getCurrentPosition(
                function(position) {
                    var lat = position.coords.latitude;
                    var long = position.coords.longitude;
                    var zoom = 15;
                    vm.map.setView([lat, long], zoom);
                });
        }

        // add and remove draw control
        function draw() {
            if (vm.drawControl.state == false && controlService.getDraw().active != vm.drawControl.state) { // if state is true and the control is not on the map, display the control
                if (vm.drawnItems === null) { // create drawnitems layer if it does not exist
                    vm.drawnItems = new L.FeatureGroup();
                    vm.map.addLayer(vm.drawnItems);
                    vm.layercontrol.addOverlay(vm.drawnItems, 'Drawn items');

                    vm.map.on('draw:created', function(e) {
                        var type = e.layerType,
                            layer = e.layer;

                        if (type === 'marker') {
                            layer.bindPopup('A popup!');
                        }

                        vm.drawnItems.addLayer(layer);
                    });
                }

                vm.drawControl.control = new L.Control.Draw({ // reinit the control
                    draw: {
                        position: 'topleft'
                    },
                    edit: {
                        featureGroup: vm.drawnItems
                    }
                });

                vm.drawControl.state = true; // set state to true
                vm.map.addControl(vm.drawControl.control); //add the control to map

            } else if (vm.drawControl.state == true && controlService.getDraw().active != vm.drawControl.state) { // remove from the map
                vm.map.removeControl(vm.drawControl.control);
                vm.drawControl.state = false;
            }
        }

        // add and remove scale control
        function scale() {
            if (vm.scaleControl.state == false && controlService.getScale().active != vm.scaleControl.state) {
                vm.scaleControl.control = L.control.scale().addTo(vm.map);
                vm.scaleControl.state = true;
            } else if (vm.scaleControl.state == true && controlService.getScale().active != vm.scaleControl.state) {
                vm.scaleControl.control.removeFrom(vm.map);
                vm.scaleControl.state = false;
            }
        }

        // add and remove search control
        function search() {
            if (vm.searchControl.state == false && controlService.getSearch().active != vm.searchControl.state) {
                vm.searchControl.control = L.Control.geocoder().addTo(vm.map);
                vm.searchControl.state = true;
            } else if (vm.searchControl.state == true && controlService.getSearch().active != vm.searchControl.state) {
                vm.searchControl.control.removeFrom(vm.map);
                vm.searchControl.state = false;
            }
        }

        // add and remove measure control
        function measure() {
            if (vm.measureControl.state == false && controlService.getMeasure().active != vm.measureControl.state) {
                vm.measureControl.control = L.Control.measureControl().addTo(vm.map);
                vm.measureControl.state = true;
            } else if (vm.measureControl.state == true && controlService.getMeasure().active != vm.measureControl.state) {
                vm.measureControl.control.removeFrom(vm.map);
                vm.measureControl.state = false;
            }
        }


        function locate() {
            navigator.geolocation.getCurrentPosition(
                function(position) {
                    var lat = position.coords.latitude;
                    var long = position.coords.longitude;
                    var zoom = 15;
                    vm.map.setView([lat, long], zoom);

                    L.marker([lat, long]).addTo(vm.map).bindPopup('Hi there').openPopup();
                },
                function() {
                    alert('Error getting location');
                });
            return false;
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


        // Popover functions
        function openPopover($event) {
            vm.popover.show($event);
        }

        function closePopover($event) {
            vm.popover.hide();
        }

        $scope.$on('$destroy', function() {
            vm.popover.remove();
        });

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

    MapController.$inject = ['$scope', '$stateParams', 'controlService', 'xmldataService', 'ctecoService', '$ionicPopover', 'popupService', 'IonicClosePopupService'];
})();