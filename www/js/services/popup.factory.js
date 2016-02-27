(function() {
    'use strict';

    angular
        .module('TractNotes')
        .factory('popupService', popupService);

    popupService.$inject = ['$ionicPopup'];

    /* @ngInject */
    function popupService($ionicPopup) {
        var service = {
            getImportPopup: getImportPopup,
            getWMSPopup: getWMSPopup
        };
        return service;

        ////////////////

        function getImportPopup(scope) {
            return $ionicPopup.show({
                title: 'Add GIS data',
                subTitle: '(Add your data here!)',
                scope: scope,
                cssClass: 'popup-import',
                buttons: [{
                    text: '<b>Google Drive</b>',
                    type: 'button-positive',
                    //@TODO : picker screen file -> variable, download file/open or whatever
                }, {
                    text: '<b>Link WMS data</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        scope.wmsPopup();
                    }
                }]
            });
        }

        function getWMSPopup(scope) {
            return $ionicPopup.show({
                title: 'WMS endpoint URL',
                template: '<input type="url" ng-model="data.url">', // @TODO: if not valid url, output error message, @TODO make field more visible
                scope: scope,
                cssClass: 'popup-import',
                buttons: [{
                    text: '<b>Submit</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        return scope.data.url;
                    }
                }]
            });
        }
    }
})();