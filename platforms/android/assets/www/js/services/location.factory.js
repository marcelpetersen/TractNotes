(function() {
    'use strict';

    angular
        .module('TractNotes')
        .factory('locationService', locationService);

    locationService.$inject = [];

    /* @ngInject */
    function locationService() {
        var service = {
            current: current
        };
        return service;

        ////////////////

        function current() {
            return new Promise(
                function(resolve, reject) {
                    navigator.geolocation.getCurrentPosition(
                        function(position) {
                            var lat = position.coords.latitude;
                            var long = position.coords.longitude;
                            var zoom = 15;
                            resolve({
                                gps: [lat, long],
                                zoom: zoom
                            });
                        });
                })
        }
    }
})();