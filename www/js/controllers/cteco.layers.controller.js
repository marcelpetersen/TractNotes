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
            console.log(vm.currentCategory);
        }

        /** 
         * @fires $rootScope.AddCteco and $rootScope.RemoveCteco
		 * @todo Refactor to use $watch
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