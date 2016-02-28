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
            getWMSPopup: getWMSPopup
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

        function getWMSPopup(scope) {
            return $ionicPopup.show({
                title: 'WMS endpoint URL',
                template: 'MapServer<input type="url" ng-model="data.url"> Layer(s) ID (ex. 0, 1, 2) <input type="text" ng-model="data.text">', // @TODO: if not valid url, output error message
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