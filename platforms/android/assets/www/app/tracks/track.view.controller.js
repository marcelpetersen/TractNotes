(function() {
    'use strict';

    angular
        .module('TractNotes')
        .controller('TrackViewController', TrackViewController);

    TrackViewController.$inject = ['$scope', '$rootScope', 'importService', 'trackService', 'trackViewService', '$ionicHistory', 'Drive', '$state'];

    /* @ngInject */
    function TrackViewController($scope, $rootScope, importService, trackService, trackViewService, $ionicHistory, Drive, $state) {
        var vm = this;
        vm.title = 'TrackViewController';
        vm.currentTrack = null;
        vm.showDelete = false;
        vm.input = {};
        vm.tracks = [];

        vm.back = back;
        vm.updateMetadata = updateMetadata;
        vm.exportTrack = exportTrack;
        vm.importFromDevice = importFromDevice;
        vm.goToDrive = goToDrive;
        vm.importFromURL = importFromURL;
        vm.sendTrack = sendTrack;
        vm.sendTrackDelete = sendTrackDelete;

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

        /** @todo Upload files to drive */
        function exportTrack() {
            var auth_token = gapi.auth.getToken();
            if (auth_token) {
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
            }
            else {
                /** @todo add redirect to authentication */
                console.log("Must authenticate to Drive");
            }
            // create file
            // upload to drive
            // upload media to drive [images, audio, video]
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

        function sendTrack(track) {
            trackViewService.setTrackView(track);
        }

        // @todo refactor to modify layer control in service, remove listener in map controller
        function sendTrackDelete(track) {
            trackService.deleteTrack(track);
            $rootScope.$emit("RemoveTrack", track)
            //utilityService.removeLayerInGroup(vm.layercontrol, vm.currentTrack.track);
        }
    }

})();