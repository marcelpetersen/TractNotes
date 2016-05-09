(function() {
    'use strict';

    /**
     * @memberof TractNotes
     * @ngdoc factory
     * @name trackService
     * @property {array} tracks List of user created tracks.
     * @property {array} importedTracks List of user imported tracks.
     * @property {object} currentTrack Current track available for use.
     * @property {L.polyline} currentPolyline Current polyline available for use.
     * @desc The trackService provides functions to create, delete, and edit tracks.
     */

    angular
        .module('TractNotes')
        .factory('trackService', trackService);

    trackService.$inject = [];

    /* @ngInject */
    function trackService() {
        var tracks = [];
        var importedTracks = [];

        /**
         * @memberof trackService
         * @namespace
         * @property {L.FeatureGroup} track L.FeatureGroup object
         * @property {string} name Name of track
         * @property {L.polyline} polyline Polyline associated with track
         * @property {array} markers List of markers associated with track
         * @property {object} metadata GPX and KML metadata
         */
        var currentTrack = null;
        var currentPolyline = null;

        var service = {
            createTrack: createTrack,
            createPolyline: createPolyline,

            setCurrentTrack: setCurrentTrack,
            setCurrentPolyline: setCurrentPolyline,
            setTrackMetadata: setTrackMetadata,

            getTracks: getTracks,
            getCurrentTrack: getCurrentTrack,
            getCurrentPolyline: getCurrentPolyline,

            addToCurrentPolyline: addToCurrentPolyline,
            deleteTrack: deleteTrack,

            addToImportedTracks: addToImportedTracks,
            getImportedTracks: getImportedTracks
        };
        return service;

        ////////////////

        /**
         * Create a new track (initialize polyline, markers, and metadata properties) and add to tracks list
         * @memberof trackService
         * @function createTrack
         * @returns {object} Current track
         */
        function createTrack() {
            var name = 'Track ' + tracks.length;
            tracks.push({
                track: new L.FeatureGroup(),
                name: name,
                polyline: null,
                markers: [],
                metadata: {
                    name: '',
                    desc: '',
                    author: '',
                    date: new Date().toLocaleString()
                },
                image: null
            });
            currentTrack = tracks[tracks.length - 1];
            return currentTrack;
        }

        /**
         * Create a new Leaflet polyline
         * @memberof trackService
         * @function createPolyline
         * @returns {L.polyline} Current polyline
         */
        function createPolyline() {
            currentPolyline = L.polyline([]);
            return currentPolyline;
        }


        /**
         * Set the current track to a new track
         * @memberof trackService
         * @function setCurrentTrack
         * @param {object} track new current track
         */
        function setCurrentTrack(track) {
            currentTrack = track;
        }

        /**
         * Set the current polyline to a new polyline
         * @memberof trackService
         * @function setCurrentPolyline
         * @param {L.polyline} polyline new current polyline
         */
        function setCurrentPolyline(p) {
            currentPolyline = p;
        }

        /**
         * Set the current track's metadata
         * @memberof trackService
         * @function setTrackMetadata
         * @param {object} track metadata
         */
        function setTrackMetadata(metadata) {
            if (metadata) {
                if (metadata.name) {
                    currentTrack.name = metadata.name;
                    currentTrack.metadata.name = metadata.name;
                } else {
                    currentTrack.metadata.name = '';
                }
                if (metadata.desc) {
                    currentTrack.metadata.desc = metadata.desc;
                } else {
                    currentTrack.metadata.desc = '';
                }
                if (metadata.author) {
                    currentTrack.metadata.author = metadata.author;
                } else {
                    currentTrack.metadata.author = '';
                }
            }
        }

        /**
         * Get tracks list
         * @memberof trackService
         * @function getTracks
         * @returns {array} tracks
         */
        function getTracks() {
            return tracks;
        }

        /**
         * Get currentTrack
         * @memberof trackService
         * @function getCurrentTrack
         * @returns {object} currentTrack
         */
        function getCurrentTrack() {
            return currentTrack;
        }

        /**
         * Get currentPolyline
         * @memberof trackService
         * @function getCurrentPolyline
         * @returns {L.polyline} currentPolyline
         */
        function getCurrentPolyline(p) {
            return currentPolyline;
        }

        /**
         * Add a latitude and longitude coordinate to the current polyline
         * @memberof trackService
         * @function addToCurrentPolyline
         * @param {int} lat
         * @param {int} long
         */
        function addToCurrentPolyline(lat, long) {
            currentPolyline.addLatLng(L.latLng(lat, long));
        }

        /**
         * Delete a track from the tracks list
         * @memberof trackService
         * @function deleteTrack
         * @param {object} track track to delete
         */
        function deleteTrack(track) {
            if (track.imported) {
                importedTracks.splice(importedTracks.indexOf(track), 1);
            } else {
                tracks.splice(tracks.indexOf(track), 1);
            }
        }

        /**
         * Add a track to imported tracks list
         * @memberof trackService
         * @function addToImportedTracks
         * @param {object} track track to add
         * @param {string} name track name
         */
        function addToImportedTracks(track, name) {
            track.metadata = {};
            track.name = name;
            track.metadata.name = name;
            track.imported = true;
            importedTracks.push(track);
            console.log(importedTracks);
        }

        /**
         * Get imported tracks list
         * @memberof trackService
         * @function getImportedTracks
         * @returns {array} importedTracks
         */
        function getImportedTracks() {
            return importedTracks;
        }
    }
})();