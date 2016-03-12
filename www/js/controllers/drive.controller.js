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

        vm.files = [];
        vm.importFromURL = importFromURL;

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