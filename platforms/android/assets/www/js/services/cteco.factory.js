(function() {
    'use strict';

    angular
        .module('TractNotes')
        .factory('ctecoService', ctecoService);

    ctecoService.$inject = [];

    /* @ngInject */
    function ctecoService() {
        // begin open space layer definitions

        var openSpace0 = {
            name: "1997 Municipal and Private Open Space",
            type: "agsDynamic",
            url: "http://www.ctecoapp2.uconn.edu/ArcGIS/rest/services/maps/Open_Space/MapServer",
            visible: true,
            layerOptions: {
                layers: [0],
                opacity: 1,
            },
        };

        var openSpace1 = {
            name: "DOT Scenic Land Strips",
            type: "agsDynamic",
            url: "http://www.ctecoapp2.uconn.edu/ArcGIS/rest/services/maps/Open_Space/MapServer",
            visible: true,
            layerOptions: {
                layers: [1],
                opacity: 1,
            }
        };

        var openSpace2 = {
            name: "Protected Open Space Mapping Project",
            type: "agsDynamic",
            url: "http://www.ctecoapp2.uconn.edu/ArcGIS/rest/services/maps/Open_Space/MapServer",
            visible: true,
            layerOptions: {
                layers: [2],
                opacity: 1,
            }
        };

        var openSpace3 = {
            name: "Federal Open Space",
            type: "agsDynamic",
            url: "http://www.ctecoapp2.uconn.edu/ArcGIS/rest/services/maps/Open_Space/MapServer",
            visible: true,
            layerOptions: {
                layers: [3],
                opacity: 1,
            }
        };

        var openSpace4 = {
            name: "DEP Property",
            type: "agsDynamic",
            url: "http://www.ctecoapp2.uconn.edu/ArcGIS/rest/services/maps/Open_Space/MapServer",
            visible: true,
            layerOptions: {
                layers: [4],
                opacity: 1,
            }
        };

        var openSpace5 = {
            name: "Parcels for Protected Open Space Mapping",
            type: "agsDynamic",
            url: "http://www.ctecoapp2.uconn.edu/ArcGIS/rest/services/maps/Open_Space/MapServer",
            visible: true,
            layerOptions: {
                layers: [5],
                opacity: 1,
            }
        };

        var openSpace6 = {
            name: "Connecticut State Outline ",
            type: "agsDynamic",
            url: "http://www.ctecoapp2.uconn.edu/ArcGIS/rest/services/maps/Open_Space/MapServer",
            visible: true,
            layerOptions: {
                layers: [6],
                opacity: 1,
            }
        };

        var service = {
            getCTLayer: getCTLayer
        };
        return service;

        ////////////////

        function getCTLayer(layer) {
            switch (layer) {
                case 'openSpace0':
                    return openSpace0;
                case 'openSpace1':
                    return openSpace1;
                case 'openSpace2':
                    return openSpace2;
                case 'openSpace3':
                    return openSpace3;
                case 'openSpace4':
                    return openSpace4;
                case 'openSpace5':
                    return openSpace5;
                case 'openSpace6':
                    return openSpace6;
                default:
                    return '';
            }
        }
    }
})();