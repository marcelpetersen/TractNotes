(function() {
    'use strict';

    angular
        .module('TractNotes')
        .controller('CTECOListController', CTECOListController);

    CTECOListController.$inject = ['ctecoDataService', 'ctecoViewService'];

    /* @ngInject */
    function CTECOListController(ctecoDataService, ctecoViewService) {
        var vm = this;
        vm.title = 'CTECOListController';

        vm.sendCategory = sendCategory;
        vm.setOrthoLayer = setOrthoLayer;

        activate();

        ////////////////

        function activate() {
            vm.ctecoCategories = ctecoDataService.getCtecoCategories();
            vm.orthoLayers = ctecoDataService.getOrthoLayers();
        }

        function sendCategory(cat) {
            ctecoViewService.setCategory(cat);
        }

        function setOrthoLayer(orthoLayer) {
            ctecoDataService.sendOrthoLayer(orthoLayer);
        }
    }
})();