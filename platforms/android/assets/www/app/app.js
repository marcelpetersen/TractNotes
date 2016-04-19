(function() {
    'use strict';

    angular
        .module('TractNotes', [
            'ionic',
            'ionic.closePopup',
            'ngCordovaOauth'
        ])
        .config(config)
        .run(run);

    function config($stateProvider, $urlRouterProvider, $ionicConfigProvider, $locationProvider) {

        $stateProvider

        .state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'app/menu/menu.html' //,
            //controller: 'MenuController'
        })

        .state('app.map', {
            url: '/map',
            views: {
                'menuContent': {
                    templateUrl: 'app/map/map.html',
                    controller: 'MapController',
                    controllerAs: 'vm'
                }
            }
        })

        .state('app.tracks', {
            url: '/tracks',
            views: {
                'menuContent': {
                    templateUrl: 'app/tracks/tracks.html',
                    controller: 'TrackViewController',
                    controllerAs: 'vm'
                }
            }
        })

        .state('app.layers', {
            url: '/layers',
            views: {
                'menuContent': {
                    templateUrl: 'app/layers/layers.html',
                    controller: 'LayerListController',
                    controllerAs: 'vm'
                }
            }
        })

        .state('app.track_layer', {
            url: '/tracks/:trackName',
            views: {
                'menuContent': {
                    templateUrl: 'app/tracks/track.view.html',
                    controller: 'TrackViewController',
                    controllerAs: 'vm'
                }
            }
        })

        .state('app.wms_layer', {
            url: '/layers/:wmsName',
            views: {
                'menuContent': {
                    templateUrl: 'app/layers/wms.view.html',
                    controller: 'WMSViewController',
                    controllerAs: 'vm'
                }
            }
        })

        .state('app.login', {
            url: '/login',
            views: {
                'menuContent': {
                    templateUrl: 'app/google/login.html',
                    controller: 'GAuthController',
                    controllerAs: 'vm'
                }
            }
        })

        .state('app.form', {
            url: '/form',
            views: {
                'menuContent': {
                    templateUrl: 'app/google/form.html',
                    controller: 'FormController',
                    controllerAs: 'vm'
                }
            }
        })

        .state('app.drive', {
            url: '/drive',
            views: {
                'menuContent': {
                    templateUrl: 'app/google/drive.html',
                    controller: 'DriveController',
                    controllerAs: 'vm'
                }
            }
        })

        .state('app.wms_list', {
            url: '/wms_list',
            views: {
                'menuContent': {
                    templateUrl: 'app/wms/wms.list.html',
                    controller: 'WMSListController',
                    controllerAs: 'vm'
                }
            }
        })

        .state('app.single_cteco', {
            url: '/cteco_list/:ctecoName',
            views: {
                'menuContent': {
                    templateUrl: 'app/cteco/cteco.layers.html',
                    controller: 'CTECOLayersController',
                    controllerAs: 'vm'
                }
            }
        })

        .state('app.add_wms', {
            url: '/add_wms',
            views: {
                'menuContent': {
                    templateUrl: 'app/wms/wms.fromurl.html',
                    controller: 'wmsUrlController',
                    controllerAs: 'vm'
                }
            }
        })

        .state('app.settings', {
            url: '/settings',
            views: {
                'menuContent': {
                    templateUrl: 'app/settings/settings.html',
                    controller: 'SettingsController',
                    controllerAs: 'vm'
                }
            }
        });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/map');
    }


    function run($state, $rootScope, $ionicPlatform, $ionicPopup, $ionicHistory) {
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });

        // hardware back button opens previous view.
        // if no history then prompts to exit the app.
        $ionicPlatform.registerBackButtonAction(function(e) {
            if ($ionicHistory.backView()) {
                $ionicHistory.goBack();
            } else {
                var confirmPopup = $ionicPopup.confirm({
                    title: 'Confirm Exit',
                    template: "Are you sure you want to exit?"
                });
                confirmPopup.then(function(close) {
                    if (close) {
                        // there is no back view, so close the app instead
                        ionic.Platform.exitApp();
                    } // otherwise do nothing
                    console.log("User canceled exit.");
                });
            }

            e.preventDefault();
            return false;
        }, 101);

    }

})();