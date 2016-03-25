(function() {
    'use strict';

    angular
        .module('TractNotes')
        .controller('ControlController', ControlController);

    ControlController.$inject = ['controlService'];

    /* @ngInject */
    function ControlController(controlService) {
        var vm = this;
        vm.title = 'ControlController';

        vm.drawControl = null;
        vm.scaleControl = null;
        vm.searchControl = null;
        vm.controls = [];

        vm.setControl = setControl;

        activate();

        ////////////////

        function activate() {
            vm.drawControl = controlService.getDrawControl();
            vm.scaleControl = controlService.getScaleControl();
            vm.searchControl = controlService.getSearchControl();
            vm.controls = [vm.drawControl, vm.scaleControl, vm.searchControl];
        }

        function setControl(control) {
            if (control.text === 'Draw Control') {
                controlService.sendDrawControl(control.checked);
            } else if (control.text === 'Scale Control') {
                controlService.sendScaleControl(control.checked);
            } else if (control.text === 'Search Control') {
                controlService.sendSearchControl(control.checked);
            } else {
                console.log('Something went terribly wrong.');
            }
        }
    }
})();