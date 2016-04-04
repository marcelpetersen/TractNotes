(function() {
    'use strict';

    angular
        .module('TractNotes', [
            'ionic',
            'ionic.closePopup',
            'ngCordova'
        ])
        .config(config)
        .run(run);

    function config($stateProvider, $urlRouterProvider, $ionicConfigProvider, $locationProvider) {

        $stateProvider

        .state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'templates/menu.html' //,
            //controller: 'MenuController'
        })

        .state('app.map', {
            url: '/map',
            views: {
                'menuContent': {
                    templateUrl: 'templates/map.html',
                    controller: 'MapController',
                    controllerAs: 'vm'
                }
            }
        })

        .state('app.import', {
            url: '/import',
            views: {
                'menuContent': {
                    templateUrl: 'templates/import.html',
                    controller: 'ImportController',
                    controllerAs: 'vm'
                }
            }
        })

        .state('app.manage_tracks', {
            url: '/manage_tracks',
            views: {
                'menuContent': {
                    templateUrl: 'templates/track.list.html',
                    controller: 'TrackListController',
                    controllerAs: 'vm'
                }
            }
        })

        .state('app.single_track', {
            url: '/manage_tracks/:trackName',
            views: {
                'menuContent': {
                    templateUrl: 'templates/track.view.html',
                    controller: 'TrackViewController',
                    controllerAs: 'vm'
                }
            }
        })

        .state('app.single_layer', {
            url: '/manage_layers/:layerName',
            views: {
                'menuContent': {
                    templateUrl: 'templates/layer.view.html',
                    controller: 'LayerViewController',
                    controllerAs: 'vm'
                }
            }
        })


        .state('app.control', {
            url: '/control',
            views: {
                'menuContent': {
                    templateUrl: 'templates/control.html',
                    controller: 'ControlController',
                    controllerAs: 'vm'
                }
            }
        })

        .state('app.login', {
            url: '/login',
            views: {
                'menuContent': {
                    templateUrl: 'templates/login.html',
                    controller: 'GAuthController',
                    controllerAs: 'vm'
                }
            }
        })

        .state('app.form', {
            url: '/form',
            views: {
                'menuContent': {
                    templateUrl: 'templates/form.html',
                    controller: 'FormController',
                    controllerAs: 'vm'
                }
            }
        })

        .state('app.drive', {
            url: '/drive',
            views: {
                'menuContent': {
                    templateUrl: 'templates/drive.html',
                    controller: 'DriveController',
                    controllerAs: 'vm'
                }
            }
        })

        .state('app.cteco_list', {
            url: '/cteco_list',
            views: {
                'menuContent': {
                    templateUrl: 'templates/cteco.list.html',
                    controller: 'CTECOListController',
                    controllerAs: 'vm'
                }
            }
        })

        .state('app.single_cteco', {
            url: '/cteco_list/:ctecoName',
            views: {
                'menuContent': {
                    templateUrl: 'templates/cteco.layers.html',
                    controller: 'CTECOLayersController',
                    controllerAs: 'vm'
                }
            }
        })

        .state('app.wms', {
            url: '/wms',
            views: {
                'menuContent': {
                    templateUrl: 'templates/wms.fromurl.html',
                    controller: 'wmsUrlController',
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
        $ionicPlatform.registerBackButtonAction(function (e) {
          if ($ionicHistory.backView()) {
            $ionicHistory.goBack();
          } else {
            var confirmPopup = $ionicPopup.confirm({
              title: 'Confirm Exit',
              template: "Are you sure you want to exit?"
            });
            confirmPopup.then(function (close) {
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