(function() {
    'use strict';

    angular
        .module('TractNotes')
        .factory('trackService', trackService);

    /* @ngInject */
    function trackService() {
        var displayedTrack = '';

        var service = {
            setTrack: setTrack,
            getTrack: getTrack,
            displayedTrack: displayedTrack
        };
        return service;

        ////////////////

        function setTrack(track) {
            displayedTrack = track;
        }

        function getTrack() {
            return displayedTrack;
        }
    }

    trackService.$inject = [];
})();