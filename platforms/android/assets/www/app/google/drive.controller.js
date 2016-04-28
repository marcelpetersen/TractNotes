(function() {
    'use strict';

    angular
        .module('TractNotes')
        .controller('DriveController', DriveController);

    DriveController.$inject = ['$rootScope', '$scope', 'Drive', '$state', 'importService'];

    /* @ngInject */
    function DriveController($rootScope, $scope, Drive, $state, importService) {
        var vm = this;
        vm.title = 'DriveController';

        vm.files = []; /**@param name, id, url, mimeType, isDirectory **/
        vm.importFromDrive = importFromDrive;
        vm.onSearchChange = onSearchChange;

        activate();

        ////////////////

        function activate() {
            vm.files = Drive.getFileList();
        }

        // todo event to service
        function importFromDrive(file) {
            importService.setImportURL(file.url);
            $rootScope.$emit('Import', file.name);
        }

        function onSearchChange(fileSearch) {
            // vm.files = Drive.getFileList()
            Drive.readGPXAndKML(fileSearch).then(function(files) {
                    console.log("FileRead: success.");
                    Drive.setFileList(files);
                    vm.files = files;
                    // $state.go('app.drive');
                }, function() {
                    console.log("FileRead: error.");
                });
        }
    }
})();