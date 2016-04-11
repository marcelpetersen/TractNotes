(function() {
    'use strict';

    angular
        .module('TractNotes')
        .controller('WMSViewController', WMSViewController);

    WMSViewController.$inject = ['layerViewService', '$ionicHistory'];

    /* @ngInject */
    function WMSViewController(layerViewService, $ionicHistory) {
        var vm = this;
        vm.title = 'WMSViewController';

// @todo rename variables

        vm.currentWmsLayer = null;
        vm.input = {};

        vm.back = back;
        vm.updateWmsLayerData = updateWmsLayerData;
        vm.updateSliderOpacity = updateSliderOpacity;
        vm.updateTextOpacity = updateTextOpacity;

        activate();

        ////////////////

        function activate() {
            vm.currentWmsLayer = layerViewService.getLayerView();
            vm.input.name = angular.copy(vm.currentWmsLayer.name);
            vm.input.sliderOpacity = angular.copy(vm.currentWmsLayer.layer.options.opacity) * 100;
            vm.input.textOpacity = vm.input.sliderOpacity;
        }

        function back() {
            $ionicHistory.goBack();
        }

        function updateWmsLayerData() {
            vm.currentWmsLayer.name = vm.input.name;
            var layerOpacity = vm.input.textOpacity / 100;
            vm.currentWmsLayer.layer.options.opacity = layerOpacity;
            if (vm.currentWmsLayer.layerType == 'tile') {
                vm.currentWmsLayer.layer.setOpacity(layerOpacity);
            }
            //@todo should we go back?
        }

        function updateSliderOpacity(textOpacity) {
            vm.input.sliderOpacity = textOpacity;
        }

        function updateTextOpacity(sliderOpacity) {
            vm.input.textOpacity = Number(sliderOpacity);
        }
    }

})();