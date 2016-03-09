(function() {
    'use strict';

    angular
        .module('TractNotes')
        .factory('xmldataService', xmldataService);

    xmldataService.$inject = [];

    /* @ngInject */
    function xmldataService() {
        var toImport = '';
        var service = {
            setImportURL: setImportURL,
            getxmldata: getxmldata
        };
        return service;

        ////////////////
        function setImportURL(url){
            toImport = url;
        }

                function getImportURL(url){
            return toImport;
        }


        function getxmldata(layer) {
            var xml = layer;
            console.log(layer);
            return new Promise(
                function(resolve, reject) {
                    $(function() {
                        $.ajax({
                        type: "GET",
                        url: layer,
                        dataType: "xml",
                        success: function(xml) {
                            if ($('kml', xml).text() != '') {console.log(omnivore.kml(layer));
                                resolve(omnivore.kml(layer));
                            }
                            if ($('gpx', xml).text() != '') {console.log(omnivore.gpx(layer));
                                resolve(omnivore.gpx(layer));
                            }
                        },
                        error: function() {
                            console.log('error');
                        }
                    });
                    });
                }
            );

            // @TODO: more robust error handling? we need ot use jquery to get the url, but maybe leaflet-omnivore is better for errors
            // could use var layer = w.e. -> layer.layers.length not equal to 0
            // @TODO: use file name as layer name, or end of web url: this will come into play once google drive is working
        }
    }
})();