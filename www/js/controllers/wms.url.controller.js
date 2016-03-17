(function() {
    'use strict';

    angular
        .module('TractNotes')
        .controller('wmsUrlController', wmsUrlController);

    wmsUrlController.$inject = ['wmsUrlService', '$scope', '$rootScope', '$ionicHistory'];

    /* @ngInject */
    function wmsUrlController(wmsUrlService, $scope, $rootScope, $ionicHistory) {
        var vm = this;
        vm.title = 'wmsUrlController';
        vm.setWMSLayer = setWMSLayer;
        vm.back = back;

        $scope.data = {};

        activate();

        ////////////////

        function activate() {
            $scope.data.layerType = 'dynamic';
            $scope.data.opacity = '0.5';
        }

        function back() {
            $ionicHistory.goBack();
        }

        function setWMSLayer(wmsInput) {
            wmsUrlService.sendLayerData(wmsInput);           
        }
    }
})();