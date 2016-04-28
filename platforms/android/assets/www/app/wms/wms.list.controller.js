(function() {
    'use strict';

    angular
        .module('TractNotes')
        .controller('WMSListController', WMSListController);

    WMSListController.$inject = ['ctecoDataService', 'ctecoViewService', 'wmsService'];

    /* @ngInject */
    function WMSListController(ctecoDataService, ctecoViewService, wmsService) {
        var vm = this;
        vm.title = 'WMSListController';

        vm.sendCategory = sendCategory;
        vm.setOrthoLayer = setOrthoLayer;
        vm.toggleDefaultWMSLayer = toggleDefaultWMSLayer;
        vm.toggleGroup = toggleGroup;
        vm.isGroupShown = isGroupShown;

        activate();

        ////////////////

        function activate() {
            vm.ctecoCategories = ctecoDataService.getCtecoCategories();
            vm.orthoLayers = ctecoDataService.getOrthoLayers();
            vm.defaultWMSLayers = wmsService.getDefaultWMSLayers();
        }

        function sendCategory(cat) {
            ctecoViewService.setCategory(cat);
        }

        function setOrthoLayer(orthoLayer) {
            ctecoDataService.sendOrthoLayer(orthoLayer);
        }

        function toggleDefaultWMSLayer(defaultWMS) {
            wmsService.sendDefaultLayerData(defaultWMS);
        }

        /*
         * if given group is the selected group, deselect it
         * else, select the given group
         */
        function toggleGroup(group) {
            if (vm.isGroupShown(group)) {
                vm.shownGroup = null;
            } else {
                vm.shownGroup = group;
            }
        };

        function isGroupShown(group) {
            return vm.shownGroup === group;
        };
    }
})();