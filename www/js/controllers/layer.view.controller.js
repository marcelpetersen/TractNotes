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

        activate();

        ////////////////

        function activate() {
            vm.currentLayer = layerViewService.getLayerView();
            vm.input.name = angular.copy(vm.currentLayer.name);
            vm.input.opacity = angular.copy(vm.currentLayer.layer.options.opacity);
        }

        function back() {
            $ionicHistory.goBack();
        }

        function updateLayerData() {
            vm.currentLayer.name = vm.input.name;
            vm.currentLayer.layer.options.opacity = vm.input.opacity;
            if (vm.currentLayer.layerType == 'tile') {
                vm.currentLayer.layer.setOpacity(vm.input.opacity);
            }
            //@todo should we go back?
        }
    }

})();