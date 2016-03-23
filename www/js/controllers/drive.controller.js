(function() {
    'use strict';

    angular
        .module('TractNotes')
        .controller('DriveController', DriveController);

    DriveController.$inject = ['$rootScope', '$scope', 'Drive', '$state', 'xmldataService'];

    /* @ngInject */
    function DriveController($rootScope, $scope, Drive, $state, xmldataService) {
        var vm = this;
        vm.title = 'DriveController';

        vm.files = [];
        vm.importFromDrive = importFromDrive;

        activate();

        ////////////////

        function activate() {
            vm.files = Drive.getFileList();
        }

        function importFromDrive(file) {
            xmldataService.setImportURL(file.url);
            $rootScope.$emit('Import', file.url);
        }
    }
})();