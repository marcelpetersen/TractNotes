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

        .state('app.tracks', {
            url: '/tracks',
            views: {
                'menuContent': {
                    templateUrl: 'templates/tracks.html',
                    controller: 'TracksController',
                    controllerAs: 'vm'
                }
            }
        })

        .state('app.track', {
            url: '/track',
            views: {
                'menuContent': {
                    templateUrl: 'templates/track.html',
                                        controller: 'TrackController',
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
        })

        /** @todo refactor in dynamic state creation */

        .state('app.cteco/bedrockgeology', {
            url: '/cteco/bedrockgeology',
            views: {
                'menuContent': {
                    templateUrl: 'templates/ctecoTemplates/bedrockGeology.html',
                    controller: 'ctecoController',
                    controllerAs: 'vm'
                }
            }
        })

        .state('app.cteco/elevationbathymetry', {
            url: '/cteco/elevationbathymetry',
            views: {
                'menuContent': {
                    templateUrl: 'templates/ctecoTemplates/elevationBathymetry.html',
                    controller: 'ctecoController',
                    controllerAs: 'vm'
                }
            }
        })

        .state('app.cteco/erosion', {
            url: '/cteco/erosionsusceptibility',
            views: {
                'menuContent': {
                    templateUrl: 'templates/ctecoTemplates/erosion.html',
                    controller: 'ctecoController',
                    controllerAs: 'vm'
                }
            }
        })

        .state('app.cteco/habitat', {
            url: '/cteco/habitat',
            views: {
                'menuContent': {
                    templateUrl: 'templates/ctecoTemplates/habitat.html',
                    controller: 'ctecoController',
                    controllerAs: 'vm'
                }
            }
        })

        .state('app.cteco/hurricaneevacuation', {
            url: '/cteco/hurricaneevacuation',
            views: {
                'menuContent': {
                    templateUrl: 'templates/ctecoTemplates/hurricaneEvac.html',
                    controller: 'ctecoController',
                    controllerAs: 'vm'
                }
            }
        })

        .state('app.cteco/hurricanesurge', {
            url: '/cteco/hurricanesurge',
            views: {
                'menuContent': {
                    templateUrl: 'templates/ctecoTemplates/hurricaneSurge.html',
                    controller: 'ctecoController',
                    controllerAs: 'vm'
                }
            }
        })

        .state('app.cteco/nwiwetlands', {
            url: '/cteco/nwiwetlands',
            views: {
                'menuContent': {
                    templateUrl: 'templates/ctecoTemplates/nwiWetlands.html',
                    controller: 'ctecoController',
                    controllerAs: 'vm'
                }
            }
        })

        .state('app.cteco/openspace', {
            url: '/cteco/openspace',
            views: {
                'menuContent': {
                    templateUrl: 'templates/ctecoTemplates/openSpace.html',
                    controller: 'ctecoController',
                    controllerAs: 'vm'
                }
            }
        })

        .state('app.cteco/quaternarygeology', {
            url: '/cteco/quaternarygeology',
            views: {
                'menuContent': {
                    templateUrl: 'templates/ctecoTemplates/quaternaryGeology.html',
                    controller: 'ctecoController',
                    controllerAs: 'vm'
                }
            }
        })

        .state('app.cteco/soils', {
            url: '/cteco/soils',
            views: {
                'menuContent': {
                    templateUrl: 'templates/ctecoTemplates/soils.html',
                    controller: 'ctecoController',
                    controllerAs: 'vm'
                }
            }
        })

        .state('app.cteco/surficialmaterials', {
            url: '/cteco/surficialmaterials',
            views: {
                'menuContent': {
                    templateUrl: 'templates/ctecoTemplates/surficialMaterials.html',
                    controller: 'ctecoController',
                    controllerAs: 'vm'
                }
            }
        })

        .state('app.cteco/waterresourcemgmt', {
            url: '/cteco/waterresourcemgmt',
            views: {
                'menuContent': {
                    templateUrl: 'templates/ctecoTemplates/waterResourceMgmt.html',
                    controller: 'ctecoController',
                    controllerAs: 'vm'
                }
            }
        })

        .state('app.cteco/watershed', {
            url: '/cteco/watershed',
            views: {
                'menuContent': {
                    templateUrl: 'templates/ctecoTemplates/watershed.html',
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