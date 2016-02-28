(function() {
    'use strict';

    angular
        .module('TractNotes')
        .factory('xmldataService', xmldataService);

    xmldataService.$inject = [];

    /* @ngInject */
    function xmldataService() {
        var isKML = false;
        var isGPX = false;

        var service = {
            getxmldata: getxmldata
        };
        return service;

        ////////////////

        function getxmldata(layer) {
            var kml = omnivore.gpx('this will fail')
                .on('ready', function() {
                    isKML = true;
                })
                .on('error', function() {
                    console.log("This is not a KML layer.")
                })

            var gpx = omnivore.gpx(layer)
                .on('ready', function() {
                    isGPX = true;
                })
                .on('error', function() {
                    console.log("This is not a GPX layer.")
                });

            if(isKML){
                return kml;
            }
            else if(isGPX){
                console.log('this enver happens');
                return gpx;
            }
            else{
                return 'invalid file';
            }
            // @TODO: use desc xml tag as layer name
        }
    }
})();