(function() {
    'use strict';

    /**
     * @memberof TractNotes
     * @ngdoc factory
     * @name locationService
     * @param {service} trackService track creation factory
     * @property {object} watchID Variable that stores the current navigator
     * @property {int} zoom Default zoom level
     * @property {object} lastPos The last recorded position
     * @desc This factory interfaces with ngCordova Geolocation for live GPS track creation.
     */

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

        /**
         * Create a navigator and get the current GPS location of the device
         * @memberof locationService
         * @function locate
         * @returns {promise} GPS location
         */
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

        /**
         * Create a navigator and watch GPS location of the device. This is used for starting record mode.
         * @memberof locationService
         * @function start
         */
        function start() {
            watchID = navigator.geolocation.watchPosition(onSuccess, onError, {
                enableHighAccuracy: true
            });
        }


        /**
         * Clear navigator. This is used for stopping record mode.
         * @memberof locationService
         * @function stop
         */
        function stop() {
            if (watchID !== null) {
                navigator.geolocation.clearWatch(watchID);
                watchID = null;
            }
        }


        /**
         * Success callback for start(). If the position has changed, add a new point to the polyline of the current track from trackService.
         * @memberof locationService
         * @function onSuccess
         */
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

        /**
         * Error callback for start().
         * @memberof locationService
         * @function onError
         */
        function onError(error) {
            stop();
            console.log(error.message);
        }

        /**
         * Get last recorded position
         * @memberof locationService
         * @function getLastPos
         * @returns {object} lastPos
         */
        function getLastPos() {
            return lastPos;
        }
    }
})();