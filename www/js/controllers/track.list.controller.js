(function() {
    'use strict';

    angular
        .module('TractNotes')
        .controller('TrackListController', TrackListController);

    TrackListController.$inject = ['trackService', 'trackViewService'];

    /* @ngInject */
    function TrackListController(trackService, trackViewService) {
        var vm = this;
        vm.title = 'TrackController';
        vm.tracks = [];
        vm.sendTrack = sendTrack;

        activate();

        ////////////////

        function activate() {
            vm.tracks = trackService.getTracks();
        }

        function sendTrack(track) {
            trackViewService.setTrackView(track);
        }

        /** @todo Delete selected tracks, remove from overlay Track control group. https://codepen.io/ionic/pen/JsHjf */
        function deleteTrack() {}
    }
})();