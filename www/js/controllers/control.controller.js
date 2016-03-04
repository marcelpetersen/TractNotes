(function() {
    'use strict';

    angular
        .module('TractNotes')
        .controller('ControlController', ControlController);

    /* @ngInject */
    function ControlController($rootScope, $scope, controlService) {
        var vm = this;
        vm.title = 'ControlController';

        activate();

        ////////////////

        function activate() {
            vm.drawControl = controlService.getDraw();
            vm.scaleControl = controlService.getScale();
            vm.searchControl = controlService.getSearch();
            vm.controls = [vm.drawControl, vm.scaleControl, vm.searchControl];
        }

        $scope.$watch('vm.drawControl.checked', function(newValue, oldValue) {
            if (newValue !== oldValue) {
                controlService.setDraw(newValue);
                var data = controlService.getDraw().checked;
                $rootScope.$emit('Draw', data);
            }
        });

        $scope.$watch('vm.scaleControl.checked', function(newValue, oldValue) {
            if (newValue !== oldValue) {
                controlService.setScale(newValue);
                var data = controlService.getScale().checked;
                $rootScope.$emit('Scale', data);
            }
        });

        $scope.$watch('vm.searchControl.checked', function(newValue, oldValue) {
            if (newValue !== oldValue) {
                controlService.setSearch(newValue);
                var data = controlService.getSearch().checked;
                $rootScope.$emit('Search', data);
            }
        });
    }

    ControlController.$inject = ['$rootScope', '$scope', 'controlService'];
})();