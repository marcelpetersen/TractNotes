(function() {
    'use strict';

    angular
        .module('TractNotes')
        .controller('ControlController', ControlController);

    /* @ngInject */
    function ControlController($scope, controlService) {
        var vm = this;
        vm.title = 'ControlController';

        activate();

        ////////////////

        function activate() {
            vm.drawControl = controlService.getDraw();
            vm.measureControl = controlService.getMeasure();
            vm.scaleControl = controlService.getScale();
            vm.searchControl = controlService.getSearch();
            vm.controls = [vm.drawControl, vm.measureControl, vm.scaleControl, vm.searchControl];
        }

        $scope.$watch('vm.drawControl.checked', function(newValue, oldValue) {
            if (newValue !== oldValue) controlService.setDraw(newValue, newValue);
        });

        $scope.$watch('vm.measureControl.checked', function(newValue, oldValue) {
            if (newValue !== oldValue) controlService.setMeasure(newValue, newValue);
        });

        $scope.$watch('vm.scaleControl.checked', function(newValue, oldValue) {
            if (newValue !== oldValue) controlService.setScale(newValue, newValue);
        });

        $scope.$watch('vm.searchControl.checked', function(newValue, oldValue) {
            if (newValue !== oldValue) controlService.setSearch(newValue, newValue);
        });
    }

    ControlController.$inject = ['$scope', 'controlService'];
})();