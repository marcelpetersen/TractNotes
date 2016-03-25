(function() {
    'use strict';

    angular
        .module('TractNotes')
        .factory('xmldataService', xmldataService);

    xmldataService.$inject = ['$http'];

    /* @ngInject */
    function xmldataService($http) {
        var importURL = '';
        var importURI = '';

        var service = {
            setImportURL: setImportURL,
            setImportURI: setImportURI,
            getImportURL: getImportURL,
            gtImportURI: getImportURI,
            xmlFromURL: xmlFromURL,
            xmlFromDevice: xmlFromDevice
        };
        return service;

        ////////////////
        function setImportURL(url) {
            importURL = url;
        }

        function setImportURI(uri) {
            importURI = uri;
        }

        function getImportURL(url) {
            return importURL;
        }

        function getImportURI(uri) {
            return importURI;
        }

        function xmlFromURL(layer) {
            var xml = layer;
            return new Promise(
                function(resolve, reject) {
                    $http({
                        method: 'GET',
                        url: layer
                    }).then(function successCallback(response) {
                        var kml = omnivore.kml(layer);
                        var gpx = omnivore.gpx(layer);
                        kml.on('ready', function() {
                            if (kml._leaflet_id) {
                                resolve(omnivore.kml(layer));
                            }
                        });
                        gpx.on('ready', function() {
                            if (gpx._leaflet_id) {
                                resolve(omnivore.gpx(layer));
                            }
                        });
                        // this callback will be called asynchronously
                        // when the response is available
                    }, function errorCallback(response) {
                        console.log(response)
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                    });
                }
            );
        }

        function xmlFromDevice(uri) {
            return new Promise(
                function(resolve, reject) {
                    kml.on('ready', function() {
                        if (kml._leaflet_id) {
                            resolve(omnivore.kml(layer));
                        }
                    });
                    gpx.on('ready', function() {
                        if (gpx._leaflet_id) {
                            resolve(omnivore.gpx(layer));
                        }
                    });
                })
        }
    }
})();