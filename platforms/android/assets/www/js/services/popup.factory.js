(function() {
    'use strict';

    angular
        .module('TractNotes')
        .factory('popupService', popupService);

    popupService.$inject = ['$ionicPopup'];

    /* @ngInject */
    function popupService($ionicPopup) {
        var service = {
            getGISPopup: getGISPopup,
            getWMSPopup: getWMSPopup,
            getArcGISPopup: getArcGISPopup,
            getMSPopup: getMSPopup
        };
        return service;

        ////////////////

        function getGISPopup(scope, vm) {
            return $ionicPopup.show({
                title: 'Add a GPX or KML layer to the map',
                template: 'URL<input type="url" ng-model="data.url">', // @TODO: if not valid url, output error message
                scope: scope,
                cssClass: 'popup-import',
                buttons: [{
                    text: 'Google Drive',
                    type: 'button-positive',
                    //@TODO : picker screen file -> variable
                    //@TODO : fill screen automatically with url
                }, {
                    text: 'Submit',
                    type: 'button-positive',
                    onTap: function(e) {
                        return scope.data.url;
                    }
                }]
            });
        }


        function getWMSPopup(scope, vm) {
            return $ionicPopup.show({
                title: 'Select WMS source',
                scope: scope,
                cssClass: 'popup-import',
                buttons: [{
                    text: 'ArcGIS',
                    type: 'button-positive',
                    onTap: function(e) {
                        return vm.arcgisPopup();
                    }
                }, {
                    text: 'MapServer',
                    type: 'button-positive',
                    onTap: function(e) {
                        return vm.msPopup();
                    }
                }]
            });
        }

        function getMSPopup(scope) {
            return $ionicPopup.show({
                title: 'MapServer and layer details',
                template: 'MapServer URL<input type="url" ng-model="data.url"> List of layers (ex: "soil,landcover") <input type="text" ng-model="data.text">', // @TODO: if not valid url, output error message
                scope: scope,
                cssClass: 'popup-import',
                buttons: [{
                    text: 'Submit',
                    type: 'button-positive',
                    onTap: function(e) {
                        return scope.data;
                    }
                }]
            });
        }

        function getArcGISPopup(scope) {
            return $ionicPopup.show({
                title: 'ArcGIS REST endpoint details',
                template: 'ArcGIS server URL<input type="url" ng-model="data.url"> Layer ID List (ex: "0, 1, 2") <input type="text" ng-model="data.text">', // @TODO: if not valid url, output error message
                scope: scope,
                cssClass: 'popup-import',
                buttons: [{
                    text: 'Submit',
                    type: 'button-positive',
                    onTap: function(e) {
                        return scope.data;
                    }
                }]
            });
        }
    }
})();