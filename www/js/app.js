// TractNotes
(function() {
    'use strict';

    angular
        .module('TractNotes', [
            'ionic',
            'ionic.closePopup',
            'leaflet-directive',
            'lk-google-picker',
            'ngCordova'
        ])

    .run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                window.cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })

    .config(['lkGoogleSettingsProvider',
        function(lkGoogleSettingsProvider) {

            // Configure the API credentials here
            lkGoogleSettingsProvider.configure({
            });
        }
    ])

    .filter('getExtension', function() {
        return function(url) {
            return url.split('.').pop();
        };
    })

    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider

        .state('app', {
            url: "/app",
            abstract: true,
            templateUrl: "templates/menu.html",
            controller: 'MapController'
        })

        .state('app.form', {
            url: "/form",
            controller: 'Controller',
            views: {
                'menuContent': {
                    templateUrl: "templates/form.html"
                }
            }
        })

        .state('app.map', {
            url: "/map",
            views: {
                'menuContent': {
                    templateUrl: "templates/map.html"
                }
            }
        });
        $urlRouterProvider.otherwise('/app/map');
    });
})();