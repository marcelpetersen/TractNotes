(function() {
    'use strict';

    /**
     * @memberof TractNotes
     * @ngdoc controller
     * @name TrackController
     * @param {service} $scope Application model in AngularJS
     * @param {service} $rootScope Root application model in AngularJS
     * @param {service} importService Track import factory
     * @param {service} trackService Track creation factory
     * @param {service} trackViewService Track view rendering factory
     * @param {service} Drive Drive API service
     * @param {service} popupService Popup storage factory
     * @param {service} IonicClosePopupService Service to close popups by tapping outside popup
     * @param {service} $state State service in Angular UI Router
     * @property {object} vm ViewModel capture variable for *this*.
     * @desc This controller manages the tracks view and maintains a list of tracks.
     */

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

        /**
         * Initialize tracks and importedTracks from trackService
         * @memberof TrackController
         * @function activate
         */
        function activate() {
            vm.tracks = trackService.getTracks();
            vm.importedTracks = trackService.getImportedTracks();
        }

        /**
         * Fire an import from device event on user selected file
         * @memberof TrackController
         * @function importFromDevice
         * @fires $rootScope#Import
         * @eventType emit
         */
        function importFromDevice() {
            fileChooser.open(function(uri) {
                console.log(uri);
                $rootScope.$emit('Import', uri);
            });
        }

        /**
         * Ensures the user is logged in and calls getDriveFiles
         * @memberof TrackController
         * @function goToDrive
         */
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

        /**
         * Loads all gpx/kml files and routes to drive.html.
         * @memberof TrackController
         * @function getDriveFiles
         */
        function getDriveFiles() {
            Drive.readGPXAndKML(null).then(function(files) {
                console.log("FileRead: success.");
                Drive.setFileList(files);
                $state.go('app.drive');
            }, function() {
                console.log("FileRead: error.");
            });
        }

        /**
         * Fire an import from device event on import from url
         * @memberof TrackController
         * @function importFromURL
         * @fires $rootScope#Import
         * @eventType emit
         * @param {string} url URL to import
         */
        function importFromURL(url) {
            console.log('URL: ' + url);
            importService.setImportURL(url);
            $rootScope.$emit('Import', url);
        }

        /**
         * Set track view to be rendered
         * @memberof TrackController
         * @function sendTrack
         * @param {object} track Track to render
         */
        function sendTrack(track) {
            trackViewService.setTrackView(track);
        }

        /**
         * Fire a track remove event
         * @memberof TrackController
         * @function sendTrackDelete
         * @fires $rootScope#RemoveTrack
         * @eventType emit
         * @param {object} track Track to delete
         */
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

        /**
         * Bind URL input to ViewModel
         * @memberof TrackController
         * @function getURLInput
         */
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