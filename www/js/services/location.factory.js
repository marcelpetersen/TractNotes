(function() {
    'use strict';

    angular
        .module('TractNotes')
        .factory('locationService', locationService);

    locationService.$inject = [];

    /* @ngInject */
    function locationService() {
        var watchID = null;
        var zoom = 15;

        var lastPos = {
            lat: null,
            long: null
        };
        var positions = [];

        var tracks = [];
        var currentTrack = null;
        var currentPolyline = null;

        var service = {
            current: current,
            start: start,
            stop: stop,
            createPolyline: createPolyline,
            createTrack: createTrack,
            getTracks: getTracks
        };
        return service;

        ////////////////

        function current() {
            return new Promise(
                function(resolve, reject) {
                    navigator.geolocation.getCurrentPosition(
                        function(position) {
                            resolve({
                                gps: [position.coords.latitude, position.coords.longitude],
                                zoom: zoom,
                                error: null
                            });
                        }, function(error) {
                            // location error, resolve at UConn coordinates and popup error
                            resolve({
                                gps: [41.8193203, -72.2511833],
                                zoom: zoom,
                                error: {
                                    code: error.code,
                                    message: error.message
                                }
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
            if (watchID != null) {
                navigator.geolocation.clearWatch(watchID);
                watchID = null;
            }
            currentPolyline = null;
        }

        function onSuccess(position) {

            var lat = position.coords.latitude;
            var long = position.coords.longitude;
            if (lastPos.lat === null || lastPos.long === null) {
                lastPos.lat = lat;
                lastPos.long = long;
                positions.push(lastPos);
                currentPolyline.addLatLng(L.latLng(lastPos.lat, lastPos.long));
                console.log(currentPolyline)
            } else if (lastPos.lat != lat || lastPos.long != long) { //if distance is 0, same point then add to line
                lastPos.lat = lat;
                lastPos.long = long;
                currentPolyline.addLatLng(L.latLng(lastPos.lat, lastPos.long));
                                console.log(currentPolyline)

            }
            console.log(lat)
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
                name: name
            });
            console.log(tracks[tracks.length - 1])
            return tracks[tracks.length - 1];
        }

        function getTracks() {
            return tracks;
        }
    }
})();