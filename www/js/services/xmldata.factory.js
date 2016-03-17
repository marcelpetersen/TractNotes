(function() {
    'use strict';

    angular
        .module('TractNotes')
        .factory('xmldataService', xmldataService);

    xmldataService.$inject = ['$http'];

    /* @ngInject */
    function xmldataService($http) {
        var toImport = '';
        var service = {
            setImportURL: setImportURL,
            getxmldata: getxmldata
        };
        return service;

        ////////////////
        function setImportURL(url) {
            toImport = url;
        }

        function getImportURL(url) {
            return toImport;
        }

        function getxmldata(layer) {
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
    }
})();