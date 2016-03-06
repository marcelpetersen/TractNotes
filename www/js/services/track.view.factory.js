(function() {
    'use strict';

    angular
        .module('TractNotes')
        .factory('trackViewService', trackViewService);

    trackViewService.$inject = [];

    /* @ngInject */
    function trackViewService() {
        var displayedTrack = '';

        var service = {
            setTrackView: setTrackView,
            getTrackView: getTrackView,
            displayedTrack: displayedTrack
        };
        return service;

        ////////////////

        function setTrackView(track) {
            displayedTrack = track;
        }

        function getTrackView() {
            return displayedTrack;
        }
    }
})();