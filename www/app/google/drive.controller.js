(function() {
    'use strict';

    /**
     * @memberof TractNotes
     * @ngdoc controller
     * @name DriveController
     * @desc The DriveController handles importing and searching for files as well as navigating folders from Google Drive.
     */

    angular
        .module('TractNotes')
        .controller('DriveController', DriveController);

    DriveController.$inject = ['$rootScope', '$scope', 'Drive', '$state', 'importService'];

    /* @ngInject */
    function DriveController($rootScope, $scope, Drive, $state, importService) {
        var vm = this;
        vm.title = 'DriveController';

        /**
         * @memberof DriveController
         * @name files
         * @member {list}
         * @desc This list stores all currently queried Drive files.
         */
        vm.files = []; /**@param name, id, url, mimeType, isDirectory **/
        vm.onClick = onClick;
        vm.onSearchChange = onSearchChange;

        activate();

        ////////////////

        /**
         * Initialize file list with files obtained from Google Drive.
         * @memberof DriveController
         * @method activate
         */
        function activate() {
            vm.files = Drive.getFileList();
        }

        /**
         * Import files or traverse folders on click.
         * @memberof DriveController
         * @method onClick
         * @param {Object} file
         */
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

        /**
         * Obtains the search results on search change.
         * @memberof DriveController
         * @method onSearchChange
         * @param {string} fileSearch - name of the file to be queried
         */
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