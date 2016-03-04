(function() {
    'use strict';

    angular
        .module('TractNotes')
        .factory('ctecoService', ctecoService);

    ctecoService.$inject = [];

    /* @ngInject */
    function ctecoService() {

        var openSpace0 = {
            name: '1997 Municipal and Private Open Space',
            layer: L.esri.dynamicMapLayer({
                url: 'http://www.ctecoapp2.uconn.edu/ArcGIS/rest/services/maps/Open_Space/MapServer/',
                opacity: 0.5,
                layers: [0]
            })
        };

        var openSpace1 = {
            name: 'Protected Open Space Mapping Project',
            layer: L.esri.dynamicMapLayer({
                url: 'http://www.ctecoapp2.uconn.edu/ArcGIS/rest/services/maps/Open_Space/MapServer/',
                opacity: 0.5,
                layers: [1]
            })
        };

        var openSpace2 = {
            name: '1997 Municipal and Private Open Space',
            layer: L.esri.dynamicMapLayer({
                url: 'http://www.ctecoapp2.uconn.edu/ArcGIS/rest/services/maps/Open_Space/MapServer/',
                opacity: 0.5,
                layers: [2]
            })
        };

        var openSpace3 = {
            name: 'Federal Open Space',
            layer: L.esri.dynamicMapLayer({
                url: 'http://www.ctecoapp2.uconn.edu/ArcGIS/rest/services/maps/Open_Space/MapServer/',
                opacity: 0.5,
                layers: [3]
            })
        };

        var openSpace4 = {
            name: 'DEP Property',
            layer: L.esri.dynamicMapLayer({
                url: 'http://www.ctecoapp2.uconn.edu/ArcGIS/rest/services/maps/Open_Space/MapServer/',
                opacity: 0.5,
                layers: [4]
            })
        };

        var openSpace5 = {
            name: 'Parcels for Protected Open Space Mapping',
            layer: L.esri.dynamicMapLayer({
                url: 'http://www.ctecoapp2.uconn.edu/ArcGIS/rest/services/maps/Open_Space/MapServer/',
                opacity: 0.5,
                layers: [5]
            })
        };

        var openSpace6 = {
            name: 'Connecticut State Outline ',
            layer: L.esri.dynamicMapLayer({
                url: 'http://www.ctecoapp2.uconn.edu/ArcGIS/rest/services/maps/Open_Space/MapServer/',
                opacity: 0.5,
                layers: [6]
            })
        };

        var service = {
            getcteco: getcteco
        };
        return service;

        ////////////////

        function getcteco(layer) {
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