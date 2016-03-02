(function() {
    'use strict';

    angular
        .module('TractNotes', [
            'ionic',
            'ionic.closePopup',
            'lk-google-picker',
            'ngCordovaOauth'
        ])
        .config(config)
        .run(run);

    function config($stateProvider, $urlRouterProvider) {
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
                    //controller: 'ImportController',
                    //controllerAs: 'vm'
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
        });

        /*
        .state('app.form', {
                url: '/form',
                views: {
                    form: {
                        templateUrl: 'templates/form.html',
                        controller: 'PickerController',
                    }
                }
        });
        */

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/map');
    }


    function run($ionicPlatform) {
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
    }

})();