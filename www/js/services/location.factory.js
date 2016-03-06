(function() {
    'use strict';

    angular
        .module('TractNotes')
        .factory('locationService', locationService);

    locationService.$inject = [];

    /* @ngInject */
    function locationService() {
        var watchID = null;
        var zoom = 15; // @todo allow the user to set zoom

        var lastPos = {
            lat: null,
            long: null
        };

        var tracks = []; // @todo allow the user to delete tracks
        var currentTrack = null;
        var currentPolyline = null;

        var service = {
            setZoom: setZoom,
            locate: locate,
            start: start,
            stop: stop,
            createPolyline: createPolyline,
            createTrack: createTrack,
            addtocurrentTrack: addtocurrentTrack,
            setTrackMetadata: setTrackMetadata,
            setCurrentTrack: setCurrentTrack,
            getTracks: getTracks
        };
        return service;

        ////////////////

        function setZoom(zoom) {
            zoom = zoom;
        }

        function locate() {
            return new Promise(
                function(resolve, reject) {
                    navigator.geolocation.getCurrentPosition(
                        function(position) {
                            resolve({
                                position: position,
                                zoom: zoom
                            });
                        }, function(error) {
                            resolve({
                                error: error.message
                            });
                        });
                })
        }

        function start() {
            watchID = navigator.geolocation.watchPosition(onSuccess, onError, {
                enableHighAccuracy: true
            });
        }

        function stop() {
            if (watchID !== null) {
                navigator.geolocation.clearWatch(watchID);
                watchID = null;
            }
            currentPolyline = null;
        }

        function onSuccess(position) {
            var lat = position.coords.latitude;
            var long = position.coords.longitude;
            if (lastPos.lat === null) { // || lastPos.long === null) {
                lastPos.lat = lat;
                lastPos.long = long;
                currentPolyline.addLatLng(L.latLng(lastPos.lat, lastPos.long));
            } else if (lastPos.lat != lat || lastPos.long != long) { //if distance is 0, same point then add to line
                lastPos.lat = lat;
                lastPos.long = long;
                currentPolyline.addLatLng(L.latLng(lastPos.lat, lastPos.long));
            }
        }

        function onError(error) {
            stop();
            console.log(error.message);
        }


        function createPolyline() {
            currentPolyline = L.polyline([]);
            return currentPolyline;
        }

        function createTrack() {
            var name = 'Track ' + tracks.length;
            tracks.push({
                track: new L.FeatureGroup(),
                name: name,
                metadata: {
                    name: '',
                    desc: '',
                    author: '',
                    date: new Date().toLocaleString()
                }
            });
            currentTrack = tracks[tracks.length - 1];
            return currentTrack;
        }

        function addtocurrentTrack(layer) {
            currentTrack.track.addLayer(layer);
        }

        function setTrackMetadata(metadata) {
            if (typeof(metadata.name) !== 'undefined') {
                currentTrack.name = metadata.name;
                currentTrack.metadata.name = metadata.name;
            }
            if (typeof(metadata.desc) !== 'undefined') {
                currentTrack.metadata.desc = metadata.desc;
            }
            if (typeof(metadata.author) !== 'undefined') {
                currentTrack.metadata.author = metadata.author;
            }
        }

        function setCurrentTrack(track){
            currentTrack = track;
        }

        function getTracks() {
            return tracks;
        }
    }
})();