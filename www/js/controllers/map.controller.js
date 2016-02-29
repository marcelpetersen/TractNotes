(function() {
    'use strict';

    angular
        .module('TractNotes')
        .controller('MapController', MapController);

    /* @ngInject */
    function MapController($scope, xmldataService, ctecoService, $ionicPopover, popupService, IonicClosePopupService) {
        // Mapbox development access token
        L.mapbox.accessToken = 'pk.eyJ1Ijoic2RlbXVyamlhbiIsImEiOiJjaWc4OXU4NjgwMmJydXlsejB4NTF0cXNjIn0.98fgJXziGw5FQ_b1Ibl3ZQ';

        // vm definitions
        var vm = this;
        vm.title = 'Controller';
        vm.map = L.mapbox.map('map');
        vm.baseMaps = {
            'Mapbox Streets': L.mapbox.tileLayer('mapbox.streets').addTo(vm.map),
            'Mapbox Satellite': L.mapbox.tileLayer('mapbox.satellite')
        };
        vm.overlayMaps = {};
        vm.layercontrol = L.control.layers(vm.baseMaps, vm.overlayMaps);
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

        activate();

        ////////////////

        function activate() {
            vm.layercontrol.addTo(vm.map);
            autoDiscover();

            L.control.scale().addTo(vm.map);
            L.Control.geocoder({
                position: 'topleft'
            }).addTo(vm.map);

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
                })
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

                            if (name != null) {
                                content = '<h2>' + name + '</h2>';
                                if (desc != null) {
                                    content += '<p>' + desc + '</p';
                                    layer.bindPopup(content);
                                } else {
                                    layer.bindPopup(content);
                                }
                            } else if (desc != null) {
                                content = '<h2>' + desc + '</h2>';
                                layer.bindPopup(content);
                            }
                        });
                    })
                    finalLayer.addTo(vm.map);
                    vm.layercontrol.addOverlay(finalLayer, layer)
                })

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

    MapController.$inject = ['$scope', 'xmldataService', 'ctecoService', '$ionicPopover', 'popupService', 'IonicClosePopupService'];
})();