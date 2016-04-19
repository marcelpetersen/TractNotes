(function() {
    'use strict';

    angular
        .module('TractNotes')
        .controller('WMSListController', WMSListController);

    WMSListController.$inject = ['ctecoDataService', 'ctecoViewService', 'wmsUrlService'];

    /* @ngInject */
    function WMSListController(ctecoDataService, ctecoViewService, wmsUrlService) {
        var vm = this;
        vm.title = 'WMSListController';

        vm.sendCategory = sendCategory;
        vm.setOrthoLayer = setOrthoLayer;
        vm.toggleDefaultWMSLayer = toggleDefaultWMSLayer;

        activate();

        ////////////////

        function activate() {
            vm.ctecoCategories = ctecoDataService.getCtecoCategories();
            vm.orthoLayers = ctecoDataService.getOrthoLayers();
            vm.defaultWMSLayers = wmsUrlService.getDefaultWMSLayers();
        }

        function sendCategory(cat) {
            ctecoViewService.setCategory(cat);
        }

        function setOrthoLayer(orthoLayer) {
            ctecoDataService.sendOrthoLayer(orthoLayer);
        }

        function toggleDefaultWMSLayer(defaultWMS) {
            wmsUrlService.sendDefaultLayerData(defaultWMS);
        }
    }
})();