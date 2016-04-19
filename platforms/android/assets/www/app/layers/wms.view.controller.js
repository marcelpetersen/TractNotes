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

        vm.currentWmsLayer = null;
        vm.input = {};

        vm.back = back;
        vm.updateWmsLayerData = updateWmsLayerData;
        activate();

        ////////////////

        function activate() {
            vm.currentWmsLayer = layerViewService.getLayerView();
            vm.input.name = angular.copy(vm.currentWmsLayer.name);
            vm.input.opacity = angular.copy(vm.currentWmsLayer.layer.options.opacity) * 100;
        }

        function back() {
            $ionicHistory.goBack();
        }

        function updateWmsLayerData() {
            vm.currentWmsLayer.name = vm.input.name;
            var layerOpacity = vm.input.opacity / 100;
            vm.currentWmsLayer.layer.setOpacity(layerOpacity);
            vm.currentWmsLayer.opacity = layerOpacity;
            console.log(vm.currentWmsLayer);
            //@todo should we go back?
        }
    }
})();