(function() {
    'use strict';

    angular
        .module('TractNotes')
        .controller('CTECOLayersController', CTECOLayersController);

    CTECOLayersController.$inject = ['$rootScope', 'ctecoViewService'];

    /* @ngInject */
    function CTECOLayersController($rootScope, ctecoViewService) {
        var vm = this;
        vm.title = 'CTECOLayersController';
        vm.currentCategory = null;
        vm.ctecoToggle = ctecoToggle;

        activate();

        ////////////////

        function activate() {
            vm.currentCategory = ctecoViewService.getCategory();
        }

        /** 
         * @fires $rootScope.AddCteco and $rootScope.RemoveCteco
         */
        function ctecoToggle(ctecoLayer) {
            if (ctecoLayer.checked !== false) {
                $rootScope.$emit('AddCTECO', ctecoLayer);
            } else {
                $rootScope.$emit('RemoveCTECO', ctecoLayer);
            }
        }
    }
})();