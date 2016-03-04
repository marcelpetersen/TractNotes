(function() {
    'use strict';

    angular
        .module('TractNotes')
        .controller('ctecoController', ctecoController);

    /* @ngInject */
    function ctecoController($scope, ctecoService) {
        var vm = this;
        vm.title = 'ctecoController';

        //////////////// 

        function activate() {
            vm.ctecoCategories = ctecoService.getCtecoCategories();
            vm.orthoList = ctecoService.getOrthoList();
        }

        activate();
    }

    ctecoController.$inject = ['$scope', 'ctecoService'];
})();