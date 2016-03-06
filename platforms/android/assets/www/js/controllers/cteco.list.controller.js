(function() {
    'use strict';

    angular
        .module('TractNotes')
        .controller('CTECOListController', CTECOListController);

    CTECOListController.$inject = ['$scope', '$rootScope', 'ctecoDataService', 'ctecoViewService'];

    /* @ngInject */
    function CTECOListController($scope, $rootScope, ctecoDataService, ctecoViewService) {
        var vm = this;
        vm.title = 'CTECOListController';
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