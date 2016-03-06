(function() {
    'use strict';

    angular
        .module('TractNotes')
        .controller('ctecoListController', ctecoListController);

    ctecoListController.$inject = ['$scope', '$rootScope', 'ctecoDataService', 'ctecoViewService'];

    /* @ngInject */
    function ctecoListController($scope, $rootScope, ctecoDataService, ctecoViewService) {
        var vm = this;
        vm.title = 'ctecoListController';
        vm.sendCategory = sendCategory;

        activate();

        ////////////////

        function activate() {
            vm.ctecoCategories = ctecoDataService.getCtecoCategories();
            vm.orthoLayers = ctecoDataService.getOrthoLayers();
        }

        function sendCategory(cat) {
            ctecoViewService.setCategory(cat);
        }
    }
})();