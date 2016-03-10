(function() {
    'use strict';

    angular
        .module('TractNotes')
        .controller('DriveController', DriveController);

    DriveController.$inject = ['$scope', 'Drive', '$state', 'xmldataService'];

    /* @ngInject */
    function DriveController($scope, Drive, $state, xmldataService) {
        var vm = this;
        vm.title = 'DriveController';
        vm.importFromURL = importFromURL;
        vm.files = [];

        activate();

        ////////////////

        function activate() {
            vm.files = Drive.getFileList();
        }

        function importFromDrive(file) {
            xmldataService.setImportURL(file.url);
        }
    }
})();