(function() {
    'use strict';

    angular
        .module('TractNotes')
        .controller('ctecoController', ctecoController);

    /* @ngInject */
    function ctecoController($scope, ctecoService) {
        var vm = this;
        vm.title = 'ctecoController';
        vm.categories = [];

        //////////////// 

        function activate() {
            vm.categories = ctecoService.getCtecoCategories();
        }

        activate();
    }

    ctecoController.$inject = ['$scope', 'ctecoService'];
})();