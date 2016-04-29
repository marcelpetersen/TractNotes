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
        vm.onClick = onClick;
        vm.onSearchChange = onSearchChange;

        activate();

        ////////////////

        function activate() {
            vm.files = Drive.getFileList();
        }

        // todo event to service
        function onClick(file) {
            if(file.isDirectory) {
                Drive.getChildren(file).then(function(files) {
                        console.log("FileRead: success.");
                        Drive.setFileList(files);
                        vm.files = files;
                    }, function() {
                        console.log("FileRead: error.");
                    });
            }
            else {
                importService.setImportURL(file.url);
                $rootScope.$emit('Import', file.name);
            }
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