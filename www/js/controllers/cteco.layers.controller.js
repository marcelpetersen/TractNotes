(function() {
    'use strict';

    angular
        .module('TractNotes')
        .controller('CTECOLayersController', CTECOLayersController);

    CTECOLayersController.$inject = ['ctecoDataService', 'ctecoViewService'];

    /* @ngInject */
    function CTECOLayersController(ctecoDataService, ctecoViewService) {
        var vm = this;
        vm.title = 'CTECOLayersController';

        vm.currentCategory = null;
        vm.ctecoToggle = ctecoToggle;

        activate();

        ////////////////

        function activate() {
            vm.currentCategory = ctecoViewService.getCategory();
        }

        function setCTECO(ctecoLayer) {
            ctecoDataService.setCategoryLayer(ctecoLayer);
        }
    }
})();