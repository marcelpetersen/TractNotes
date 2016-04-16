(function() {
    'use strict';

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
            gtImportURI: getImportURI,
            importFromURL: importFromURL,
            importFromText: importFromText,
            getFileText: getFileText
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