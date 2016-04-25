(function() {
    'use strict';

    angular
        .module('TractNotes')
        .factory('popupService', popupService);

    popupService.$inject = ['$ionicPopup', 'IonicClosePopupService'];

    /* @ngInject */
    function popupService($ionicPopup, IonicClosePopupService) {
        var service = {
            getDeletePopup: getDeletePopup,
            getUrlPopup: getUrlPopup,
            getAlertPopup: getAlertPopup
        };

        return service;

        ////////////////

        // confirmation popup for track/layer deletion
        function getDeletePopup(data, type) {
            return $ionicPopup.show({
                title: 'Confirm ' + type + ' Deletion',
                template: 'Are you sure you want to delete this ' + type.toLowerCase() + ' (' + data.name + ')?',
                buttons: [
                    {
                        text: 'Delete',
                        type: 'button-positive',
                        onTap: function(e) {
                            return true;                            
                        }
                    },
                    {text: 'Cancel'}
                ]
            });
        }

        // popup for getting URL from user input
        function getUrlPopup(scope) {
            return $ionicPopup.show({
                template: '<div ng-show="data.invalidUrl" style="color:red">Invalid URL.</div><input type="url" ng-model="data.urlInput" placeholder="http://www.google.com">',
                title: 'Enter a URL',
                scope: scope,
                buttons: [
                    {
                        text: 'Import',
                        type: 'button-positive',
                        onTap: function(e) {
                            if (!scope.data.urlInput) {
                                //prevent the popup from being submitted without a valid URL
                                e.preventDefault();
                                scope.data.invalidUrl = true;
                            }
                            else {
                                scope.data.invalidUrl = false;
                                return scope.data;
                            }
                        }
                    },
                    {text: 'Cancel'}
                ]
            });
            // I don't think the popup can be closed by clicking outside of its bounds because of e.preventDefault
            IonicClosePopupService.register(urlPopup);
        }

        // alert popup for adding wms from url
        function getAlertPopup(layerName, layerUrl) {
            var templateText = null;
            if (layerName == null && layerUrl == null) {
                console.log('Layer name and URL required.');
                templateText = 'Please enter a valid layer name and URL.';
            }
            else if (layerName == null) {
                console.log('Layer name required.');
                templateText = 'Please enter a valid layer name.';
            }
            else if (layerUrl == null) {
                console.log('Layer URL required.');
                templateText = 'Please enter a valid layer URL.';
            }
            return $ionicPopup.alert({
                title: 'Form is incomplete.',
                template: templateText
            });
        }
    }
})();