(function() {
    'use strict';

    angular
        .module('TractNotes')
        .factory('popupService', popupService);

    popupService.$inject = ['$ionicPopup'];

    /* @ngInject */
    function popupService($ionicPopup) {
        var service = {
            getURLPopup: getURLPopup
        };
        return service;

        ////////////////
        
        function getURLPopup(scope) {
            return $ionicPopup.show({
                title: 'Add Layer from URL',
                subTitle: 'Add a layer to the map from a URL.',
                template: 'Name<input type="text" ng-model="vm.data.name"> URL<input type="text" ng-model="vm.data.url"> Layer Number<input type="text" ng-model="vm.data.layerNum"> Layer Type<ion-radio ng-model="vm.data.layerType" value="dynamic" checked>Dynamic Map Layer</ion-radio> <ion-radio ng-model="vm.data.layerType" value="image">Image Map Layer</ion-radio> <ion-radio ng-model="vm.data.layerType" value="feature">Feature Layer</ion-radio>', // @TODO: if not valid url, output error message    
                scope: scope,
                buttons: [
                {
                    text: 'Add',
                    type: 'button-positive',
                    onTap: function(e) 
                    {
                        return scope.vm.data;
                    }
                }, 
                {
                    text: 'Cancel',
                    type: 'button-assertive'
                }]
            });
        }
    }
})();