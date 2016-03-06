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
            console.log(vm.currentTrack)
            // create one list
            // iterate through features and populate options with featureTitle
            // create a list of image urls [audio, video]
            var gpx = togpx(vm.currentTrack.track._layers, {metadata: vm.currentTrack.metadata});
            console.log (gpx)
            // create file
            // upload to drive
            // upload images to drive [audio, video]
        }
    }

})();