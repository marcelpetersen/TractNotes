(function() {
    'use strict';

    /**
     * @memberOf TractNotes
     * @ngdoc controller
     * @name CTECOLayersController
     * @param {service} ctecoDataService - CT ECO data service
     * @param {service} ctecoViewService - CT ECO view service
     * @property {object} vm - ViewModel capture variable for *this*
     * @description This controller manages individual CT ECO category views.
     */
    
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

        /**
         * Initializes currentCategory from ctecoViewService
         * @memberOf CTECOLayersController
         * @function activate
         */
        function activate() {
            vm.currentCategory = ctecoViewService.getCategory();
        }

        /**
         * Adds or removes a CT ECO layer via ctecoDataService
         * @memberOf CTECOLayersController
         * @function setCTECOLayer
         * @param {object} ctecoLayer - CT ECO layer to be set
         */
        function setCTECOLayer(ctecoLayer) {
            ctecoDataService.sendCTECOLayer(ctecoLayer);
        }
    }
})();