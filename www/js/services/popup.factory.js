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
                title: 'Import File',
                subTitle: '(GPX, KML or WMS layer)',
                scope: scope,
                cssClass: 'popup-import',
                buttons: [{
                    text: '<b>Google Drive</b>',
                    type: 'button-positive',
                    //@TODO : picker screen file -> variable, download file/open or whatever
                }, {
                    text: '<b>WMS Endpoint</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        scope.wmsPopup();
                    }
                }]
            });
        }

        function getWMSPopup(scope) {
            return $ionicPopup.show({
                title: 'WMS endpoint',
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