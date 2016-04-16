(function() {
    'use strict';

    angular
        .module('TractNotes')
        .controller('ImportController', ImportController);

    ImportController.$inject = ['$scope', '$rootScope', 'importService', 'popupService', 'wmsUrlService', 'Drive', '$state'];

    /* @ngInject */
    function ImportController($scope, $rootScope, importService, popupService, wmsUrlService, Drive, $state) {
        var vm = this;
        vm.title = 'ImportController';

        vm.importFromDevice = importFromDevice;
        vm.goToDrive = goToDrive;
        vm.importFromURL = importFromURL;

        activate();

        ////////////////

        function activate() {}

        // todo : event -> service, name -> importfromdevice
        // get text contents of file with cordova file thing, then use that
        function importFromDevice() {
            fileChooser.open(function(uri) {
                console.log(uri);
                $rootScope.$emit('Import', uri);
            });
        }

        // restructured import.html so it now uses 3 buttons
        // load all gpx/kml files in this function (eventually we should have a search bar that dynamically generates lists based on user input)
        function goToDrive() {
            var auth_token = gapi.auth.getToken();
            if (auth_token) {
                Drive.readGPXAndKML().then(function(files) {
                    console.log("FileRead: success.");
                    Drive.setFileList(files);
                    $state.go('app.drive');
                }, function() {
                    console.log("FileRead: error.");
                });
            }

            //Google Picker API
            // Drive.showPicker().then(function(id) {
            //     vm.id = id;
            //     console.log("FileSelection: success.");
            //     }, function() {
            //         console.log("FileSelection: error.");
            //         });
        }

        // todo event to service
        function importFromURL(url) {
            importService.setImportURL(url);
            $rootScope.$emit('Import', url);
        }

    }
})();