(function() {
    'use strict';

    angular
        .module('TractNotes')
        .factory('locationService', locationService);

    locationService.$inject = ['trackService'];

    /* @ngInject */
    function locationService(trackService) {
        var watchID = null;
        var zoom = 15; // @todo allow the user to set zoom

        var lastPos = {
            lat: null,
            long: null
        };

        var service = {
            locate: locate,
            start: start,
            stop: stop,
            getLastPos: getLastPos
        };
        return service;

        ////////////////

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
        }

        function onSuccess(position) {
            var lat = position.coords.latitude;
            var long = position.coords.longitude;

            if (lastPos.lat === null) {
                lastPos.lat = lat;
                lastPos.long = long;
                trackService.addToCurrentPolyline(lastPos.lat, lastPos.long); // should this be moved somewhere?
            } else if (lastPos.lat != lat || lastPos.long != long) {
                lastPos.lat = lat;
                lastPos.long = long;
                trackService.addToCurrentPolyline(lastPos.lat, lastPos.long); // should this be moved somewhere?
            }
        }

        function onError(error) {
            stop();
            console.log(error.message);
        }

        function getLastPos() {
            return lastPos;
        }
    }
})();