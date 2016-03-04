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
        })

        .state('app.form', {
                url: '/form',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/form.html',
                        controller: 'GAuthController'
                    }
                }
        })

        .state('app.drive', {
                url: '/drive',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/drive.html',
                        controller: 'DriveController'
                    }
                }
        })

        .state('app.cteco', {
                url: '/cteco',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/cteco.html',
                        controller: 'ctecoController',
                        controllerAs: 'vm'
                    }
                }
        });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/map');
    }


    function run($state, $rootScope, $ionicPlatform) {
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