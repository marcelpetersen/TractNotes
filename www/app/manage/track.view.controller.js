(function() {
    'use strict';

    angular
        .module('TractNotes')
        .controller('TrackViewController', TrackViewController);

    TrackViewController.$inject = ['trackService', 'trackViewService', '$ionicHistory', 'Drive'];

    /* @ngInject */
    function TrackViewController(trackService, trackViewService, $ionicHistory, Drive) {
        var vm = this;
        vm.title = 'TrackViewController';
        vm.currentTrack = null;
        vm.input = {};

        vm.back = back;
        vm.updateMetadata = updateMetadata;
        vm.exportTrack = exportTrack;

        activate();

        ////////////////

        function activate() {
            vm.currentTrack = trackViewService.getTrackView();
            if(vm.currentTrack) {
                vm.input = angular.copy(vm.currentTrack.metadata);
            }
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
    }

})();