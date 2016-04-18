(function() {
    'use strict';

    angular
        .module('TractNotes')
        .controller('SettingsController', SettingsController);

    SettingsController.$inject = ['settingsService'];

    /* @ngInject */
    function SettingsController(settingsService) {
        var vm = this;
        vm.title = 'SettingsController';

        vm.drawControl = null;
        vm.scaleControl = null;
        vm.searchControl = null;
        vm.controls = [];

        vm.setControl = setControl;

        activate();

        ////////////////

        function activate() {
            vm.drawControl = settingsService.getDrawControl();
            vm.scaleControl = settingsService.getScaleControl();
            vm.searchControl = settingsService.getSearchControl();
            vm.controls = [vm.drawControl, vm.scaleControl, vm.searchControl];
        }

        function setControl(control) {
            if (control.text === 'Draw Control') {
                settingsService.sendDrawControl(control.checked);
            } else if (control.text === 'Scale Control') {
                settingsService.sendScaleControl(control.checked);
            } else if (control.text === 'Search Control') {
                settingsService.sendSearchControl(control.checked);
            } else {
                console.log('error in setting control');
            }
        }
    }
})();