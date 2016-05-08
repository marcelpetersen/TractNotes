(function() {
    'use strict';

    /**
     * @memberof TractNotes
     * @ngdoc factory
     * @name trackViewService
     * @property {object} displayedTrack Track to render view of
     * @desc This factory assists in dynamically rendering individual track views.
     */

    angular
        .module('TractNotes')
        .factory('trackViewService', trackViewService);

    trackViewService.$inject = [];

    /* @ngInject */
    function trackViewService() {
        var displayedTrack = null;

        var service = {
            setTrackView: setTrackView,
            getTrackView: getTrackView
        };
        return service;

        ////////////////

        /**
         * Set track to render
         * @memberof trackViewService
         * @function setTrackView
         * @param {object} track Track to render
         */
        function setTrackView(track) {
            displayedTrack = track;
        }

        /**
         * Get current track to render
         * @memberof trackViewService
         * @function getTrackView
         * @returns {object} displayedTrack
         */
        function getTrackView() {
            return displayedTrack;
        }
    }
})();