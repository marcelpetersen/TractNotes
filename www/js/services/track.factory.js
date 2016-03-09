(function() {
    'use strict';

    angular
        .module('TractNotes')
        .factory('trackService', trackService);

    trackService.$inject = [];

    /* @ngInject */
    function trackService() {
        var tracks = [];
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

            addToCurrentPolyline: addToCurrentPolyline
        };
        return service;

        ////////////////

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

        function createPolyline() {
            currentPolyline = L.polyline([]);
            return currentPolyline;
        }

        function setCurrentTrack(track) {
            currentTrack = track;
        }

        function setCurrentPolyline(p) {
            currentPolyline = p;
        }

        function setTrackMetadata(metadata) {
            if (metadata.name && metadata.name !== '') {
                currentTrack.name = metadata.name;
                currentTrack.metadata.name = metadata.name;
            }
            if (metadata.desc && metadata.desc !== '') {
                currentTrack.metadata.desc = metadata.desc;
            }
            if (metadata.author && metadata.author !== '') {
                currentTrack.metadata.author = metadata.author;
            }
        }

        function getTracks() {
            return tracks;
        }

        function getCurrentTrack(track) {
            return currentTrack;
        }

        function getCurrentPolyline(p) {
            return currentPolyline;
        }

        function addToCurrentPolyline(lat, long) {
            currentPolyline.addLatLng(L.latLng(lat, long));
        }
    }
})();