(function() {
    'use strict';

    angular
        .module('TractNotes')
        .controller('MapController', MapController);

    /* @ngInject */
    function MapController($scope, ctecoService, $ionicModal, $ionicPopover, popupService, IonicClosePopupService) {

        $scope.map = {
            layers: {
                baselayers: {
                    mapbox_streets: {
                        name: 'Mapbox Streets',
                        url: 'http://api.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}',
                        type: 'xyz',
                        layerOptions: {
                            apikey: 'pk.eyJ1Ijoic2RlbXVyamlhbiIsImEiOiJjaWc4OXU4NjgwMmJydXlsejB4NTF0cXNjIn0.98fgJXziGw5FQ_b1Ibl3ZQ',
                            mapid: 'mapbox.streets'
                        }
                    },
                    mapbox_satellite: {
                        name: 'Mapbox Satellite',
                        url: 'http://api.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}',
                        type: 'xyz',
                        layerOptions: {
                            apikey: 'pk.eyJ1Ijoic2RlbXVyamlhbiIsImEiOiJjaWc4OXU4NjgwMmJydXlsejB4NTF0cXNjIn0.98fgJXziGw5FQ_b1Ibl3ZQ',
                            mapid: 'mapbox.satellite'
                        }
                    }
                },
                overlays: {}
            },
            markers: {
                currentPosition: {},
            },
            controls: {
                scale: true
            },
            center: {
                autoDiscover: true
            }
        };

        // Center and create a popup on the map at the user's current position
        $scope.locate = function() {
            navigator.geolocation.getCurrentPosition(
                function(position) {
                    $scope.map.center.lat = position.coords.latitude;
                    $scope.map.center.lng = position.coords.longitude;
                    $scope.map.center.zoom = 15;

                    $scope.map.markers.currentPosition = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                        focus: true,
                        draggable: false,
                        message: "Hi there!",
                    };
                },
                function() {
                    alert('Error getting location');
                });
            return false;
        };

        $scope.addCTLayer = function(layer) {
            $scope.map.layers.overlays[layer] = ctecoService.getCTLayer(layer);
        };

        // Create popover instance from template
        $ionicPopover.fromTemplateUrl('templates/map.popover.html', {
            scope: $scope
        }).then(function(popover) {
            $scope.popover = popover;
        });

        $scope.openPopover = function($event) {
            $scope.popover.show($event);
        };
        $scope.closePopover = function() {
            $scope.popover.hide();
        };
        $scope.$on('$destroy', function() {
            $scope.popover.remove();
        });

        // Create importPopup and WMSPopup functions
        $scope.importPopup = function() {
            $scope.data = {};

            var importPopup = popupService.getImportPopup($scope);
            IonicClosePopupService.register(importPopup);

            importPopup.then(function(res) {
                console.log('Tapped!', res);
            });
        };

        $scope.wmsPopup = function() {
            $scope.data = {};

            var wmsPopup = popupService.getWMSPopup($scope);
            IonicClosePopupService.register(wmsPopup);

            wmsPopup.then(function(res) {
                console.log('Tapped!', res);
            });
        };
    }

    MapController.$inject = ['$scope', 'ctecoService', '$ionicModal', '$ionicPopover', 'popupService', 'IonicClosePopupService'];
})();