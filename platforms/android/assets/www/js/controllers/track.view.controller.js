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
    }

})();