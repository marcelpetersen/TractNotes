(function() {
    'use strict';

    angular
        .module('TractNotes')
        .controller('MapController', MapController);

    /* @ngInject */
    function MapController($scope, xmldataService, ctecoService, $ionicPopover, popupService, IonicClosePopupService) {

        var vm = this;
        vm.title = 'Controller';
        vm.locate = locate;
        vm.cteco = cteco;
        vm.popover = null;
        vm.openPopover = openPopover;
        vm.closePopover = closePopover;
        vm.importPopup = importPopup;
        vm.wmsPopup = wmsPopup;

        activate();

        ////////////////

        function activate() {

            L.mapbox.accessToken = 'pk.eyJ1Ijoic2RlbXVyamlhbiIsImEiOiJjaWc4OXU4NjgwMmJydXlsejB4NTF0cXNjIn0.98fgJXziGw5FQ_b1Ibl3ZQ';
            $scope.map = L.mapbox.map('map');

            autoDiscover();

            $scope.baseMaps = {
                'Mapbox Streets': L.mapbox.tileLayer('mapbox.streets').addTo($scope.map),
                'Mapbox Satellite': L.mapbox.tileLayer('mapbox.satellite')
            };
            $scope.overlayMaps = {};
            $scope.layercontrol = L.control.layers($scope.baseMaps, $scope.overlayMaps).addTo($scope.map);

            $ionicPopover.fromTemplateUrl('templates/map.popover.html', {
                scope: $scope
            }).then(function(popover) {
                vm.popover = popover;
            });

            // @TODO: remove
            xmldata('placeholder');
        }

        function autoDiscover() {
            navigator.geolocation.getCurrentPosition(
                function(position) {
                    var lat = position.coords.latitude;
                    var long = position.coords.longitude;
                    var zoom = 15;
                    $scope.map.setView([lat, long], zoom);
                })
        }

        function locate() {
            navigator.geolocation.getCurrentPosition(
                function(position) {
                    var lat = position.coords.latitude;
                    var long = position.coords.longitude;
                    var zoom = 15;
                    $scope.map.setView([lat, long], zoom);

                    L.marker([lat, long]).addTo($scope.map).bindPopup('Hi there').openPopup();
                },
                function() {
                    alert('Error getting location');
                });
            return false;
        }

        // @TODO: generalize
        function xmldata(layer) {
            xmldataService.getxmldata("LaurelHall.gpx").addTo($scope.map)

        }

        function cteco(layer) {
            var cteco = ctecoService.getcteco(layer);
            $scope.layercontrol.addOverlay(cteco.layer, cteco.name);
        }

        function openPopover($event) {
            vm.popover.show($event);
        }

        function closePopover($event) {
            vm.popover.hide();
        }

        $scope.$on('$destroy', function() {
            vm.popover.remove();
        });

        function importPopup() {
            $scope.data = {};
            var importPopup = popupService.getImportPopup($scope, vm);
            IonicClosePopupService.register(importPopup);

            importPopup.then(function(res) {
                console.log('Tapped!', res);
            });
        }

        function wmsPopup() {
            $scope.data = {};
            var wmsPopup = popupService.getWMSPopup($scope);
            IonicClosePopupService.register(wmsPopup);

            wmsPopup.then(function(res) {
                console.log('Tapped!', res);
            });
        }
    }

    MapController.$inject = ['$scope', 'xmldataService', 'ctecoService', '$ionicPopover', 'popupService', 'IonicClosePopupService'];
})();