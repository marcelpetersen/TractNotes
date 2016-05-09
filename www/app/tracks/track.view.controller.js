(function() {
    'use strict';

    /**
     * @memberof TractNotes
     * @ngdoc controller
     * @name TrackViewController
     * @param {service} $scope Application model in AngularJS
     * @param {service} $rootScope Root application model in AngularJS
     * @param {service} trackService Track creation factory
     * @param {service} trackViewService Track view rendering factory
     * @param {service} $ionicHistory State history service in Ionic
     * @param {service} Drive Drive API service
     * @param {service} $state State service in Angular UI Router
     * @property {object} vm ViewModel capture variable for *this*.
     * @desc This controller manages individual track views.
     */

    angular
        .module('TractNotes')
        .controller('TrackViewController', TrackViewController);

    TrackViewController.$inject = ['$scope', '$rootScope', 'trackService', 'trackViewService', '$ionicHistory', 'Drive', '$state'];

    /* @ngInject */
    function TrackViewController($scope, $rootScope, trackService, trackViewService, $ionicHistory, Drive, $state) {
        var vm = this;
        vm.title = 'TrackViewController';
        vm.currentTrack = null;
        vm.input = {};

        vm.back = back;
        vm.updateMetadata = updateMetadata;
        vm.exportTrack = exportTrack;
        vm.uploadToDrive = uploadToDrive;
        vm.exportTrackToDevice = exportTrackToDevice;
        vm.discardChanges = discardChanges;

        activate();

        ////////////////

        /**
         * Initialize currentTrack to view to be rendered from trackViewService
         * @memberof TrackViewController
         * @function activate
         */
        function activate() {
            vm.currentTrack = trackViewService.getTrackView();
            if (vm.currentTrack) {
                vm.input = angular.copy(vm.currentTrack.metadata);
            }
        }

        /**
         * Ensures the user is logged in and calls uploadToDrive.
         * @memberof TrackViewController
         * @function exportTrack
         */
        function exportTrack() {
            var auth_token = gapi.auth.getToken();
            if (auth_token) {
                uploadToDrive();
            } else {
                Drive.authenticate()
                    .then(function(response) { //authenticate
                            if (response) {
                                gapi.auth.setToken(response);
                                uploadToDrive();
                            }
                        },
                        function(error) {
                            console.log("" + error);
                        });
            }
        }

        /**
         * Generates GPX and KML files from toExport and uploads them to Google Drive in the TractNotes folder.
         * @memberof TrackViewController
         * @function uploadToDrive
         */
        function uploadToDrive() {
            var toExport = {
                "type": "FeatureCollection",
                "features": []
            }

            toExport.features.push(vm.currentTrack.polyline.toGeoJSON());

            for (var i = 0; i < vm.currentTrack.markers.length; i++) {
                toExport.features.push(vm.currentTrack.markers[i].toGeoJSON());
            }

            var gpx = togpx(toExport, {
                metadata: vm.currentTrack.metadata
            });

            var kml = tokml(toExport);

            console.log("GPX file:");
            console.log(gpx);
            console.log("KML file:");
            console.log(kml);

            //Ensure TractNotes Folder exists or create one
            Drive.tractNotesFolder().then(function(tractNotesID) {
                //Make Folder for Track
                Drive.trackFolder(vm.currentTrack.metadata.name, tractNotesID).then(function(folderID) {
                    console.log("Track Folder: success.");

                    /** Export GPX */
                    var name = vm.currentTrack.metadata.name + ".gpx";
                    var metadata = {
                        'title': name,
                        'mimeType': 'application/gpx+xml',
                        'parents': [{
                            "id": folderID
                        }]
                        // "description": vm.currentTrack.metadata.desc
                    };
                    Drive.saveFile(metadata, gpx).then(function(files) {
                        console.log("FileSave: success.");
                        // window.alert("file uploaded");
                    }, function() {
                        console.log("FileSave: error.");
                    });

                    /** Export KML */
                    name = vm.currentTrack.metadata.name + ".kml";
                    metadata = {
                        'title': name,
                        'mimeType': 'application/vnd.google-earth.kml+xml',
                        'parents': [{
                            "id": folderID
                        }]
                        // "description": vm.currentTrack.metadata.desc
                    };
                    Drive.saveFile(metadata, kml).then(function(files) {
                        console.log("FileSave: success.");
                        //@todo change alert to popup or view element
                        window.alert("File uploaded:\nMyDrive/TractNotes/" + vm.currentTrack.metadata.name);
                    }, function() {
                        console.log("FileSave: error.");
                    });
                    // create file
                    // upload to drive
                    // upload media to drive [images, audio, video]
                }, function() {
                    console.log("Track Folder: error.");
                });
            });
        }

        function exportTrackToDevice() {
            //@TODO
            console.log('Export to device not yet implemented.');
        }

        /**
         * Go back a single state by history
         * @memberof TrackViewController
         * @function back
         */
        function back() {
            $ionicHistory.goBack();
        }

        /**
         * Update changes in track metadata
         * Calls vm.back()
         * @memberof TrackViewController
         * @function updateMetadata
         */
        function updateMetadata() {
            trackService.setCurrentTrack(vm.currentTrack);
            trackService.setTrackMetadata(vm.input);
            vm.input = angular.copy(trackViewService.getTrackView().metadata)
            vm.currentTrack = trackService.getCurrentTrack();
            vm.back();
        }

        /**
         * Discard changes in track metadata
         * Calls vm.back()
         * @memberof TrackViewController
         * @function discardChanges
         */
        function discardChanges() {
            vm.back();
        }
    }
})();