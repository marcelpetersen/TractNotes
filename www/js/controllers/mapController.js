angular.module('TractNotes').controller('MapCtrl', ['$scope',
    '$cordovaGeolocation',
    '$stateParams',
    '$ionicModal',
    '$ionicPopup',
    function(
        $scope,
        $cordovaGeolocation,
        $stateParams,
        $ionicModal,
        $ionicPopup
    ) {

        /**
         * Once state loaded, get put map on scope.
         */
        $scope.$on("$stateChangeSuccess", function() {

            $scope.map = {
                defaults: {
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
                                apikey:
                                mapid: 'mapbox.streets'
                            }
                        },
                        mapbox_satellite: {
                            name: 'Mapbox Satellite',
                            url: 'http://api.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}',
                            type: 'xyz',
                            layerOptions: {
                                apikey:
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

    }
]);