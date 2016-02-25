(function() {
    'use strict';

    angular
        .module('TractNotes')
        .controller('MapController', MapController);

    /* @ngInject */
    function MapController($scope, $cordovaGeolocation, $stateParams, $ionicModal, $ionicPopup, $ionicPopover, IonicClosePopupService) {
        var vm = this;
        vm.title = 'MapController';

        activate();

        ////////////////

        function activate() {}

        $scope.$on("$stateChangeSuccess", function() {

            $scope.map = {
                Layercontrol: {
                    icons: {
                        uncheck: "fa fa-toggle-off",
                        check: "fa fa-toggle-on"
                    }
                },
                markers: {},
                events: {
                    map: {
                        enable: ['context'],
                        logic: 'emit'
                    }
                },
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
                    }
                }
            };

            $scope.map.center = {
                autoDiscover: true
            };
        });

        $ionicModal.fromTemplateUrl('templates/addLocation.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });

        /**
         * Center map on user's current position
         */
        $scope.locate = function() {

            $cordovaGeolocation
                .getCurrentPosition()
                .then(function(position) {
                    $scope.map.center.lat = position.coords.latitude;
                    $scope.map.center.lng = position.coords.longitude;
                    $scope.map.center.zoom = 15;

                    $scope.map.markers.now = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                        message: "You Are Here",
                        focus: true,
                        draggable: false
                    };

                }, function(err) {
                    // error
                    console.log("Location error!");
                    console.log(err);
                });

        };

        // .fromTemplateUrl() method
        $ionicPopover.fromTemplateUrl('templates/filePopover.html', {
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
        //Cleanup the popover when we're done with it!
        $scope.$on('$destroy', function() {
            $scope.popover.remove();
        });
        // Execute action on hide popover
        $scope.$on('popover.hidden', function() {
            // Execute action
        });
        // Execute action on remove popover
        $scope.$on('popover.removed', function() {
            // Execute action
        });


        $scope.url = '';



        $scope.url = function() {
            $scope.data = {};

            var urlPopup = $ionicPopup.show({
                title: 'Enter URL',
                template: '<input type="url" ng-model="data.url">', // @TODO: if not valid url, output error message, @TODO make field more visible
                scope: $scope,
                cssClass: 'popup-import',
                buttons: [{
                    text: '<b>Submit</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        return $scope.data.url;
                    }
                }]
            });

            IonicClosePopupService.register(urlPopup);

            urlPopup.then(function(res) {
                console.log('Tapped!', res);
            });
        };

        $scope.import = function() {
            $scope.data = {};

            var importPopup = $ionicPopup.show({
                title: 'Import File',
                subTitle: '(GPX, KML or WMS layer)',
                scope: $scope,
                cssClass: 'popup-import',
                buttons: [{
                    text: '<b>From Drive</b>', // @TODO : drive icon
                    type: 'button-positive',
                    //@TODO : picker screen file -> variable, download file/open or whatever
                }, {
                    text: '<b>From URL</b>', // @TODO : WMS icon
                    type: 'button-positive',
                    onTap: function(e) {
                        $scope.url();
                        // @TODO run function on scope.url here
                    }
                }]
            });
            IonicClosePopupService.register(importPopup);

            importPopup.then(function(res) {
                console.log('Tapped!', res);
            });
        };

    }

    MapController.$inject = ['$scope', '$cordovaGeolocation', '$stateParams', '$ionicModal', '$ionicPopup', '$ionicPopover', 'IonicClosePopupService'];
})();