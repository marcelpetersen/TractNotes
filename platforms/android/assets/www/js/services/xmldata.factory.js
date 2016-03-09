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
            getImportURL: getImportURL,
            getxmldata: getxmldata
        };
        return service;

        ////////////////
        function setImportURL(url) {
            toImport = url;
        }

        function getImportURL() {
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
                                if ($('kml', xml).text() != '') {
                                    console.log(omnivore.kml(layer));
                                    resolve(omnivore.kml(layer));
                                }
                                if ($('gpx', xml).text() != '') {
                                    console.log(omnivore.gpx(layer));
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

            // @TODO: use file name as layer name, or end of web url: this will come into play once google drive is working
        }
    }
})();