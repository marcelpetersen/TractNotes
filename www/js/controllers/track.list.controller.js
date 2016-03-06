(function() {
    'use strict';

    angular
        .module('TractNotes')
        .controller('TrackListController', TrackListController);

    TrackListController.$inject = ['locationService', 'trackViewService'];

    /* @ngInject */
    function TrackListController(locationService, trackViewService) {
        var vm = this;
        vm.title = 'TrackController';
        vm.tracks = [];
        vm.sendTrack = sendTrack;

        activate();

        ////////////////

        function activate() {
            vm.tracks = locationService.getTracks();
        }

        function sendTrack(track) {
            trackViewService.setTrackView(track);
        }
    }
})();