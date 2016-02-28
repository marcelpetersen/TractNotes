(function() {
    'use strict';

    angular
        .module('TractNotes')
        .factory('xmldataService', xmldataService);

    xmldataService.$inject = [];

    /* @ngInject */
    function xmldataService() {
        var service = {
            getxmldata: getxmldata
        };
        return service;

        ////////////////

        function getxmldata(layer) {

            var kml = omnivore.gpx(layer)
                .on('ready', function() {
                    console.log('ready');
                })
                .on('error', function() {
                    console.log("This is not a KML layer.");
                });

            var gpx = omnivore.gpx(layer)
                .on('ready', function() {
                    console.log('ready');
                })
                .on('error', function() {
                    console.log("This is not a GPX layer.");
                });

            if (kml != null) {
                return kml;
            } else {
                return gpx;
            }

            // @TODO: use desc xml tag as layer name
        }
    }
})();