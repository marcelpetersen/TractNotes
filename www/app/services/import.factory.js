(function() {
    'use strict';

    /**
     * @memberof TractNotes
     * @ngdoc factory
     * @name importService
     * @param {service} $http Angular service
     * @property {string} importURL URL of current layer to import.
     * @property {string} importURI Device path of current layer to import.
     * @desc This factory contains functions to import KML or GPX files from device or a URL.
     */

    angular
        .module('TractNotes')
        .factory('importService', importService);

    importService.$inject = ['$http'];

    /* @ngInject */
    function importService($http) {
        var importURL = '';
        var importURI = '';

        var service = {
            setImportURL: setImportURL,
            setImportURI: setImportURI,
            getImportURL: getImportURL,
            getImportURI: getImportURI,
            importFromURL: importFromURL,
            importFromText: importFromText,
            getFileText: getFileText
        };
        return service;

        ////////////////

        /**
         * Set the current import URL
         * @memberof importService
         * @function setImportURL
         * @param {string} url Website URL of KML or GPX file
         */
        function setImportURL(url) {
            importURL = url;
        }

        /**
         * Set the current import URI
         * @memberof importService
         * @function setImportURI
         * @param {string} uri Device path to file of KML or GPX file
         */
        function setImportURI(uri) {
            importURI = uri;
        }

        /**
         * Get the current import URL
         * @memberof importService
         * @function getImportURL
         * @returns {string} importURL
         */
        function getImportURL(url) {
            return importURL;
        }

        /**
         * Get the current import URI
         * @memberof importService
         * @function getImportURI
         * @returns {string} importURI
         */
        function getImportURI(uri) {
            return importURI;
        }

        /**
         * Import a GPX or KML file from URL
         * @memberof importService
         * @function importFromURL
         * @param {string} layer Layer URL
         * @returns {promise} KML or GPX layer on $http success
         */
        function importFromURL(layer) {
            return new Promise(
                function(resolve, reject) {
                    $http({
                        method: 'GET',
                        url: layer
                    }).then(function successCallback(response) {
                        console.log(response)
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

        /**
         * Import a GPX or KML file from text
         * @memberof importService
         * @function importFromText
         * @param {string} layer Layer text
         * @returns {object} KML or GPX layer based on contents of XML string
         */
        function importFromText(text) {
            // hack
            if (text.indexOf('kml') > -1) {
                return omnivore.kml.parse(text);
            } else if (text.indexOf('gpx') > -1) {
                return omnivore.gpx.parse(text);
            } else {
                console.log('error')
            }

            /* @TODO replace with similar to the following:
            var kml = omnivore.kml.parse(text);
            var gpx = omnivoee.gpx.parse();
            kml.on('ready', function() {
                console.log(kml._leaflet_id)
                if (kml._leaflet_id) {
                    console.log('kml')
                    resolve(omnivore.kml.parse(text));
                }
            }).on('error', function() {
                console.log('error')
            });
            gpx.on('ready', function() {
                        console.log(gpx._leaflet_id)

                        if (gpx._leaflet_id) {
                            console.log('gpx')
                            resolve(omnivore.gpx.parse(text));
                        }
                    }).on('error', function() {
                        console.log('error')
                    });
            */

        }

        /**
         * Get the text of a file stored on the device
         * @memberof importService
         * @function getFileText
         * @param {string} uri Device path to file of KML or GPX file
         * @returns {promise} Stringified file contents
         */
        function getFileText(uri) {
            return new Promise(
                function(resolve, reject) {
                    window.FilePath.resolveNativePath(uri, gotPath, resolveError);

                    function gotPath(path) {
                        console.log('gotpath: ' + path)
                        window.resolveLocalFileSystemURL(path, gotFile, pathError);

                        function gotFile(fileEntry) {
                            console.log('gotfileentry: ' + fileEntry)
                            fileEntry.file(function(file) {
                                var reader = new FileReader();

                                reader.onloadend = function(e) {
                                    var res = this.result;
                                    resolve(res);
                                }

                                reader.readAsText(file);
                            });

                        }

                        function pathError(e) {
                            console.log("FileSystem Error");
                            console.dir(e);
                        }
                    }

                    function resolveError(e) {
                        console.log(JSON.stringify(e))
                        return e;
                    }
                }
            );
        }
    }
})();