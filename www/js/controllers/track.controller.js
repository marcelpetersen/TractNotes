(function() {
    'use strict';

    angular
        .module('TractNotes')
        .controller('TrackController', TrackController);
    TrackController.$inject = ['$rootScope', '$scope', 'locationService', 'trackService', 'popupService'];

    /* @ngInject */
    function TrackController($rootScope, $scope, locationService, trackService, popupService) {
        var vm = this;
        vm.title = 'TrackController';
        vm.currentTrack = null;
        vm.trackPopup = trackPopup;

        activate();

        ////////////////

        function activate() {
            vm.currentTrack = trackService.getTrack();
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