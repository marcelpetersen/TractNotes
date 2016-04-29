(function() {
    'use strict';

    angular
        .module('TractNotes')
        .controller('TrackController', TrackController);

    TrackController.$inject = ['$scope', '$rootScope', 'importService', 'trackService', 'trackViewService', 'Drive', 'popupService', 'IonicClosePopupService', '$state'];

    /* @ngInject */
    function TrackController($scope, $rootScope, importService, trackService, trackViewService, Drive, popupService, IonicClosePopupService, $state) {
        var vm = this;
        vm.title = 'TrackController';
        vm.showDelete = false;
        vm.tracks = [];
        vm.importedTracks = [];

        vm.importFromDevice = importFromDevice;
        vm.goToDrive = goToDrive;
        vm.getDriveFiles = getDriveFiles;
        vm.importFromURL = importFromURL;
        vm.sendTrack = sendTrack;
        vm.sendTrackDelete = sendTrackDelete;
        vm.getUrlInput = getUrlInput;

        activate();

        ////////////////

        function activate() {
            vm.tracks = trackService.getTracks();
            vm.importedTracks = trackService.getImportedTracks();
        }

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
                getDriveFiles();
            }
            else {
                Drive.authenticate()
                    .then(function(response) { //authenticate
                            if (response) {
                                gapi.auth.setToken(response);
                                getDriveFiles();
                            }
                        },
                        function(error) {
                            console.log("" + error);
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

        function getDriveFiles() {
            Drive.readGPXAndKML(null).then(function(files) {
                console.log("FileRead: success.");
                Drive.setFileList(files);
                $state.go('app.drive');
            }, function() {
                console.log("FileRead: error.");
            });
        }

        // todo event to service
        function importFromURL(url) {
            console.log('URL: ' + url);
            importService.setImportURL(url);
            $rootScope.$emit('Import', url);
        }

        function sendTrack(track) {
            trackViewService.setTrackView(track);
        }

        // @todo refactor to modify layer control in service, remove listener in map controller
        function sendTrackDelete(track) {
            // confirmation popup for track deletion
            var trackDeletePopup = popupService.getDeletePopup(track, 'Track');
            trackDeletePopup.then(function(res) {
                if(res) {
                    console.log('Track deletion (' + track.name + ') confirmed');
                    trackService.deleteTrack(track);
                    $rootScope.$emit("RemoveTrack", track)
                }
                else {
                    console.log('Track deletion (' + track.name + ') cancelled');
                }
            });
            IonicClosePopupService.register(trackDeletePopup);
        }

        function getUrlInput() {
            // gets URL input from user and passes it to vm.importFromURL
            $scope.data = {};
            var trackUrlPopup = popupService.getUrlPopup($scope);
            trackUrlPopup.then(function(res) {
                if(res) {
                    console.log('Import track from URL confirmed');
                    vm.importFromURL($scope.data.urlInput);
                }
                else {
                    console.log('Import track from URL cancelled');
                }
            });
            IonicClosePopupService.register(trackUrlPopup);
        }
    }

})();