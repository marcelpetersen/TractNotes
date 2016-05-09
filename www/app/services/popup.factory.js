(function() {
    'use strict';

    /**
     * @memberof TractNotes
     * @ngdoc factory
     * @name popupService
     * @param {service} $ionicPopup - Ionic popup service
     * @desc This factory creates the popups that are used throughout the app.
     */

    angular
        .module('TractNotes')
        .factory('popupService', popupService);

    popupService.$inject = ['$ionicPopup'];

    /* @ngInject */
    function popupService($ionicPopup) {
        var service = {
            getDeletePopup: getDeletePopup,
            getUrlPopup: getUrlPopup,
            getAlertPopup: getAlertPopup
        };

        return service;

        ////////////////

        /**
         * Creates confirmation popup for track or layer deletion.
         * @memberOf popupService
         * @function getDeletePopup
         * @param {object} data - User input (track or layer name)
         * @param {string} type - Type of object to be deleted (track or layer)
         * @returns {$ionicPopup} Popup
         */
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

        /**
         * Creates popup for getting a URL from user input.
         * @memberOf popupService
         * @function getUrlPopup
         * @param {object} scope - Scope for the popup
         * @returns {$ionicPopup} Popup
         */
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
        }

        /**
         * Creates alert popup for adding a WMS layer from a URL.
         * @memberOf popupService
         * @function getAlertPopup
         * @param {string} layerName - Name of layer to be added
         * @param {string} layerUrl - URL of layer to be added
         * @returns {$ionicPopup} Alert popup
         */
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