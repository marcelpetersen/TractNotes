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
        vm.setCTECOLayer = setCTECOLayer;

        activate();

        ////////////////

        function activate() {
            vm.currentCategory = ctecoViewService.getCategory();
        }

        function setCTECOLayer(ctecoLayer) {
            console.log(ctecoLayer)
            ctecoDataService.sendCTECOLayer(ctecoLayer);
        }
    }
})();