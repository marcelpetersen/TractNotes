(function() {
    'use strict';

    angular
        .module('TractNotes')
        .controller('ControlController', ControlController);

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

        /** @fires $rootScope.Draw */
        $scope.$watch('vm.drawControl.checked', function(newValue, oldValue) {
            if (newValue !== oldValue) {
                controlService.setDrawControl(newValue);
                var checked = controlService.getDrawControl().checked;
                $rootScope.$emit('Draw', checked);
            }
        });

        /** @fires $rootScope.Scale */
        $scope.$watch('vm.scaleControl.checked', function(newValue, oldValue) {
            if (newValue !== oldValue) {
                controlService.setScaleControl(newValue);
                var checked = controlService.getScaleControl().checked;
                $rootScope.$emit('Scale', checked);
            }
        });

        /** @fires $rootScope.Search */
        $scope.$watch('vm.searchControl.checked', function(newValue, oldValue) {
            if (newValue !== oldValue) {
                controlService.setSearchControl(newValue);
                var checked = controlService.getSearchControl().checked;
                $rootScope.$emit('Search', checked);
            }
        });
    }

    ControlController.$inject = ['$rootScope', '$scope', 'controlService'];
})();