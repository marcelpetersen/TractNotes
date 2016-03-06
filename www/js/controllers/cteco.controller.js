(function() {
    'use strict';

    angular
        .module('TractNotes')
        .controller('ctecoController', ctecoController);

    /* @ngInject */
    function ctecoController($scope, $rootScope, ctecoService) {
        var vm = this;
        vm.title = 'ctecoController';

        vm.ctecoToggle = ctecoToggle;

        ////////////////

        /** @fires $rootScope.AddCteco or $rootScope.RemoveCteco depending on checkbox status */
        function ctecoToggle(ctecoLayer) {
            if (ctecoLayer.checked != false) {
                $rootScope.$emit('AddCteco', ctecoLayer);
            } else {
                $rootScope.$emit('RemoveCteco', ctecoLayer);
            }
        }

        function activate() {
            vm.ctecoCategories = ctecoService.getCtecoCategories();
            vm.orthoLayers = ctecoService.getOrthoLayers();
        }

        activate();
    }

    ctecoController.$inject = ['$scope', '$rootScope', 'ctecoService'];
})();