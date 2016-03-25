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
            vm.input = angular.copy(vm.currentTrack.metadata);
        }

        /** @todo Upload files to drive */
        function exportTrack() {
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

            //generate metadata for drive file
            // var name = vm.currentTrack.metadata.name + ".gpx";
            var name = vm.currentTrack.metadata.name + ".kml";
            var metadata = {
              'title': name
              // 'mimeType': 'application/gpx+xml',
              // "description": vm.currentTrack.metadata.desc
            };
            Drive.saveFile(metadata, kml).then(function(files) {
                console.log("FileRead: success.");
                // window.alert("file uploaded");
            }, function() {
                console.log("FileRead: error.");
            });

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