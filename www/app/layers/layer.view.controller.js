(function() {
    'use strict';

    /**
     * @memberOf TractNotes
     * @ngdoc controller
     * @name LayerViewController
     * @param {service} layerViewService - Layer view service
     * @param {service} $ionicHistory - Ionic view history service
     * @property {object} vm - ViewModel capture variable for *this*
     * @description This controller manages individual layer views.
     */

    angular
        .module('TractNotes')
        .controller('LayerViewController', LayerViewController);

    LayerViewController.$inject = ['layerViewService', '$ionicHistory'];

    /* @ngInject */
    function LayerViewController(layerViewService, $ionicHistory) {
        var vm = this;
        vm.title = 'LayerViewController';

        vm.currentWmsLayer = null;
        vm.input = {};

        vm.back = back;
        vm.updateWmsLayerData = updateWmsLayerData;
        activate();

        ////////////////

        /**
         * Initializes currentWmsLayer from layerViewService, and initializes input.name and input.opacity from currentWmsLayer.
         * @memberOf LayerViewController
         * @function activate
         */
        function activate() {
            vm.currentWmsLayer = layerViewService.getLayerView();
            vm.input.name = angular.copy(vm.currentWmsLayer.name);
            vm.input.opacity = angular.copy(vm.currentWmsLayer.layer.options.opacity) * 100;
        }

        /**
         * Goes back one state from the history.
         * @memberOf LayerViewController
         * @function back
         */
        function back() {
            $ionicHistory.goBack();
        }

        /**
         * Updates current layer data based on user input and go back to Layers view. Calls vm.back().
         * @memberOf LayerViewController
         * @function updateWmsLayerData
         */
        function updateWmsLayerData() {
            vm.currentWmsLayer.name = vm.input.name;
            var layerOpacity = vm.input.opacity / 100;
            vm.currentWmsLayer.layer.setOpacity(layerOpacity);
            vm.currentWmsLayer.opacity = layerOpacity;
            console.log(vm.currentWmsLayer);
            vm.back();
        }
    }
})();