(function() {
    'use strict';

    angular
        .module('TractNotes')
        .controller('TrackViewController', TrackViewController);

    TrackViewController.$inject = ['$rootScope', '$scope', 'locationService', 'trackViewService', 'popupService'];

    /* @ngInject */
    function TrackViewController($rootScope, $scope, locationService, trackViewService, popupService) {
        var vm = this;
        vm.title = 'TrackViewController';
        vm.currentTrack = null;
        vm.trackPopup = trackPopup;
        vm.deleteTrack = deleteTrack;
        vm.exportTrack = exportTrack;

        activate();

        ////////////////

        function activate() {
            vm.currentTrack = trackViewService.getTrackView();
        }

        function trackPopup() {
            $scope.data = {};

            var trackPopup = popupService.getTrackPopup($scope, vm);
            //IonicClosePopupService.register(trackPopup);

            trackPopup.then(function(res) {
                // update track metadata and then reset the current track
                locationService.setCurrentTrack(vm.currentTrack);
                locationService.setTrackMetadata(res);
                vm.currentTrack = locationService.getCurrentTrack();
            });
        }

        /** @todo Delete current track and remove from overlay Track control group */
        function deleteTrack() {}

        /** @todo Upload files to drive */
        function exportTrack() {
            var toExport = {"type": "FeatureCollection", "features":[]}
            // iterate through markers
            toExport.features.push(vm.currentTrack.polyline.toGeoJSON());
            for (var i = 0; i < vm.currentTrack.markers.length; i++){
               toExport.features.push(vm.currentTrack.markers[i].toGeoJSON());
            }
            console.log(toExport)
            var gpx = togpx(toExport, {metadata: vm.currentTrack.metadata});
           console.log (gpx)
            // create file
            // upload to drive
            // upload images to drive [audio, video]
        }
    }

})();