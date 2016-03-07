(function() {
    'use strict';

    angular
        .module('TractNotes')
        .controller('ControlController', ControlController);


    ControlController.$inject = ['$rootScope', '$scope', 'controlService'];

    /* @ngInject */
    function ControlController($rootScope, $scope, controlService) {
        var vm = this;
        vm.title = 'ControlController';
        vm.drawControl = null;
        vm.scaleControl = null;
        vm.searchControl = null;
        vm.controls = [];

        activate();

        ////////////////

        function activate() {
            vm.drawControl = controlService.getDrawControl();
            vm.scaleControl = controlService.getScaleControl();
            vm.searchControl = controlService.getSearchControl();
            vm.controls = [vm.drawControl, vm.scaleControl, vm.searchControl];
        }

        $scope.$watch('vm.drawControl.checked', function(newValue, oldValue) {
            if (newValue !== oldValue) {
                controlService.setDrawControl(newValue);
            }
        });

        $scope.$watch('vm.scaleControl.checked', function(newValue, oldValue) {
            if (newValue !== oldValue) {
                controlService.setScaleControl(newValue);
            }
        });

        $scope.$watch('vm.searchControl.checked', function(newValue, oldValue) {
            if (newValue !== oldValue) {
                controlService.setSearchControl(newValue);
            }
        });
    }
})();