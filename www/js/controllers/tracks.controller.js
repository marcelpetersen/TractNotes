(function() {
    'use strict';

    angular
        .module('TractNotes')
        .controller('TracksController', TracksController);

    /* @ngInject */
    function TracksController(locationService, trackService) {
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
            trackService.setTrack(track);
        }
    }

    TracksController.$inject = ['locationService', 'trackService'];
})();