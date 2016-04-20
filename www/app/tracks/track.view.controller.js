(function() {
    'use strict';

    angular
        .module('TractNotes')
        .controller('TrackViewController', TrackViewController);

    TrackViewController.$inject = ['$scope', '$rootScope', 'importService', 'trackService', 'trackViewService', '$ionicHistory', 'Drive', '$ionicPopup', 'IonicClosePopupService', '$state'];

    /* @ngInject */
    function TrackViewController($scope, $rootScope, importService, trackService, trackViewService, $ionicHistory, Drive, $ionicPopup, IonicClosePopupService, $state) {
        var vm = this;
        vm.title = 'TrackViewController';
        vm.currentTrack = null;
        vm.showDelete = false;
        vm.input = {};
        vm.tracks = [];

        vm.back = back;
        vm.updateMetadata = updateMetadata;
        vm.exportTrack = exportTrack;
        vm.uploadToDrive = uploadToDrive;
        vm.exportTrackToDevice = exportTrackToDevice;
        vm.importFromDevice = importFromDevice;
        vm.goToDrive = goToDrive;
        vm.getDriveFiles = getDriveFiles;
        vm.importFromURL = importFromURL;
        vm.sendTrack = sendTrack;
        vm.sendTrackDelete = sendTrackDelete;
        vm.showUrlPopup = showUrlPopup;
        vm.discardChanges = discardChanges;

        activate();

        ////////////////

        function activate() {
            vm.tracks = trackService.getTracks();
            vm.currentTrack = trackViewService.getTrackView();
            if(vm.currentTrack) {
                vm.input = angular.copy(vm.currentTrack.metadata);
            }
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
                var client_id = "775512295394-hhg8etqdcmoc8i7r5a6m9d42d4ebu63d.apps.googleusercontent.com"; //web-app
                var scopes = ['https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/drive.file'];

                Drive.authenticate(client_id, scopes, {
                    redirect_uri: 'http://localhost/callback/'
                })
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
            console.log(url);
            importService.setImportURL(url);
            $rootScope.$emit('Import', url);
        }

        /** @todo Upload files to drive */
        function exportTrack() {
            var auth_token = gapi.auth.getToken();
            if (auth_token) {
                uploadToDrive();
            }
            else {
                var client_id = "775512295394-hhg8etqdcmoc8i7r5a6m9d42d4ebu63d.apps.googleusercontent.com"; //web-app
                var scopes = ['https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/drive.file'];

                Drive.authenticate(client_id, scopes, {
                    redirect_uri: 'http://localhost/callback/'
                })
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

            /** Export GPX */
            var name = vm.currentTrack.metadata.name + ".gpx";
            var metadata = {
              'title': name,
              'mimeType': 'application/gpx+xml'
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
              'mimeType': 'application/vnd.google-earth.kml+xml'
              // "description": vm.currentTrack.metadata.desc
            };
            Drive.saveFile(metadata, kml).then(function(files) {
                console.log("FileSave: success.");
                // window.alert("file uploaded");
            }, function() {
                console.log("FileSave: error.");
            });
            // create file
            // upload to drive
            // upload media to drive [images, audio, video]
        }

        function exportTrackToDevice() {
            //@TODO
            console.log('Export to device not yet implemented.');
        }

        function back() {
            $ionicHistory.goBack();
        }

        function updateMetadata() {
            trackService.setCurrentTrack(vm.currentTrack);
            trackService.setTrackMetadata(vm.input);
            vm.input = angular.copy(trackViewService.getTrackView().metadata)
            vm.currentTrack = trackService.getCurrentTrack();
            //@todo should we go back?
        }

        function discardChanges() {
            vm.back();
        }

        function sendTrack(track) {
            trackViewService.setTrackView(track);
        }

        // @todo refactor to modify layer control in service, remove listener in map controller
        function sendTrackDelete(track) {
            trackService.deleteTrack(track);
            $rootScope.$emit("RemoveTrack", track)
            //utilityService.removeLayerInGroup(vm.layercontrol, vm.currentTrack.track);
        }

        function showUrlPopup() {
            $scope.data = {};
            var urlPopup = $ionicPopup.show({
                template: '<div ng-show="data.invalidUrl" style="color:red">Invalid URL.</div><input type="url" ng-model="data.urlInput" placeholder="http://www.google.com">',
                title: 'Enter a URL',
                scope: $scope,
                buttons: [
                    {
                        text: 'Import',
                        type: 'button-positive',
                        onTap: function(e) {
                            if (!$scope.data.urlInput) {
                                //prevent the popup from being submitted without a valid URL
                                e.preventDefault();
                                $scope.data.invalidUrl = true;
                            }
                            else {
                                console.log('URL: ' + $scope.data.urlInput);
                                $scope.data.invalidUrl = false;
                                vm.importFromURL($scope.data.urlInput);
                            }
                        }
                    },
                    { text: 'Cancel' }
                ]
            });
            IonicClosePopupService.register(urlPopup);
        }
    }

})();