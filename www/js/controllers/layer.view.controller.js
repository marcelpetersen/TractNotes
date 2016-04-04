(function() {
    'use strict';

    angular
        .module('TractNotes')
        .controller('LayerViewController', LayerViewController);

    LayerViewController.$inject = ['layerViewService', '$ionicHistory'];

    /* @ngInject */
    function LayerViewController(layerViewService, $ionicHistory) {
        var vm = this;
        vm.title = 'LayerViewController';
        vm.currentLayer = null;
        vm.input = {};

        vm.back = back;
        vm.updateLayerData = updateLayerData;
        vm.updateSliderOpacity = updateSliderOpacity;
        vm.updateTextOpacity = updateTextOpacity;

        activate();

        ////////////////

        function activate() {
            vm.currentLayer = layerViewService.getLayerView();
            vm.input.name = angular.copy(vm.currentLayer.name);
            vm.input.sliderOpacity = angular.copy(vm.currentLayer.layer.options.opacity) * 100;
            vm.input.textOpacity = vm.input.sliderOpacity;
        }

        function back() {
            $ionicHistory.goBack();
        }

        function updateLayerData() {
            vm.currentLayer.name = vm.input.name;
            var layerOpacity = vm.input.textOpacity/100;
            vm.currentLayer.layer.options.opacity = layerOpacity;
            if (vm.currentLayer.layerType == 'tile') {
                vm.currentLayer.layer.setOpacity(layerOpacity);
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