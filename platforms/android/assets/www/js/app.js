// TractNotes
(function() {
    'use strict';

    angular
        .module('TractNotes', [
            'ionic',
            'ionic.closePopup',
            'lk-google-picker',
            'ngCordovaOauth'
        ])
        .config(config);

    /*
    .config(['lkGoogleSettingsProvider',
        function(lkGoogleSettingsProvider) {

            // Configure the API credentials here
            lkGoogleSettingsProvider.configure({
                apiKey: 'AIzaSyDJ38qrLrTAZMsp0Kaq1ynKP5jKsjNFFy4',
                clientId: '775512295394-b73trc22sril3j04nhfa7fn2nuekkv0b.apps.googleusercontent.com'
            });
        }
    ])

    .filter('getExtension', function() {
        return function(url) {
            return url.split('.').pop();
        };
    })
    */

    function config($stateProvider, $urlRouterProvider, $compileProvider) {
        $stateProvider
            .state('map', {
                url: '/map',
                views: {
                    map: {
                        templateUrl: 'templates/map.html',
                        controller: 'MapController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('form', {
                url: '/form',
                views: {
                    form: {
                        templateUrl: 'templates/form.html',
                        controller: 'PickerController',
                    }
                }
            });

        $urlRouterProvider.otherwise('/map');
        $compileProvider.imgSrcSanitizationWhitelist('../img');
    }
})();