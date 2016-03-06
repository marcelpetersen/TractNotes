(function() {
    'use strict';

    angular
        .module('TractNotes')
        .controller('ctecoLayersController', ctecoLayersController);

    ctecoLayersController.$inject = ['$rootScope', 'ctecoViewService'];

    /* @ngInject */
    function ctecoLayersController($rootScope, ctecoViewService) {
        var vm = this;
        vm.title = 'ctecoLayersController';
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
                $rootScope.$emit('AddCteco', ctecoLayer);
            } else {
                $rootScope.$emit('RemoveCteco', ctecoLayer);
            }
        }

    }
})();