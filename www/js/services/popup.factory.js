(function() {
    'use strict';

    angular
        .module('TractNotes')
        .factory('popupService', popupService);

    popupService.$inject = ['$ionicPopup'];

    /* @ngInject */
    function popupService($ionicPopup) {
        var service = {
            getTrackPopup: getTrackPopup
        };
        return service;

        ////////////////

        function getTrackPopup(scope) {
            return $ionicPopup.show({
                title: 'Edit Track Information',
                template: 'Name<input type="text" ng-model="data.name"> Description <input type="text" ng-model="data.desc"> Author<input type="text" ng-model="data.author">', // @TODO: if not valid url, output error message    
                scope: scope,
                buttons: [{
                    text: 'Save',
                    type: 'button-positive',
                    onTap: function(e) {
                        return scope.data;
                    }
                }, {
                    text: 'Cancel',
                    type: 'button-positive'
                }]
            });
        }
    }
})();