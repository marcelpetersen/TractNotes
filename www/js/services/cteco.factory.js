(function() {
    'use strict';

    angular
        .module('TractNotes')
        .factory('ctecoService', ctecoService);

    ctecoService.$inject = [];

    /* @ngInject */
    function ctecoService() {
        console.log('asdf')
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

        var bedrockGeology = {
            name: 'Bedrock Geology',
            image: 'img/bedrock.gif',
            layers: {}
        };

        var elevationB = {
            name: 'Elevation and Bathymetry',
            image: 'img/elevation_bathymetry.gif'
        };

        var erosion = {
            name: 'Erosion Susceptibility',
            image: 'img/erosionsusceptibility.gif'
        };

        var habitat = {
            name: 'Habitat',
            image: 'img/habitat.gif'
        };

        var hurricaneEvac = {
            name: 'Hurricane Evacuation Zones 2014',
            image: 'img/hurricane_evacuation_zones_2014.gif'
        };

        var hurricaneSurge = {
            name: 'Hurricane Surge Inundation',
            image: 'img/hurricane_surge_inundation.gif'
        };

        var nwiWetlands = {
            name: 'NWI Wetlands Functions 2010',
            image: 'img/nwi_wetland_function_2010.gif'
        };

        var openSpace = {
            name: 'Open Space',
            image: 'img/open_space.gif'
        };

        var ortho1990 = {
            name: 'Ortho 1990',
            image: 'img/ortho_1990.jpg'
        };

        var ortho2004 = {
            name: 'Ortho 2004',
            image: 'img/ortho_2004.jpg'
        };

        var ortho2004cc = {
            name: 'Ortho 2004 Coast Color',
            image: 'img/ortho_2004_cc.jpg'
        };

        var ortho2004ci = {
            name: 'Ortho 2004 Coast Infrared',
            image: 'img/ortho_2004_ci.jpg'
        };

        var ortho2005ci = {
            name: 'Ortho 2005 Coast Infrared',
            image: 'img/ortho_2005_ci.jpg'
        };

        var ortho2006 = {
            name: 'Ortho 2006 Color NAIP',
            image: 'img/ortho_2006.jpg'
        };

        var ortho2008naip = {
            name: 'Ortho 2008 4Band NAIP',
            image: 'img/ortho_2008_naip.jpg'
        };

        var ortho2008ua = {
            name: 'Ortho 2008 Urban Area Color',
            image: 'img/ortho_2008_ua.jpg'
        };

        var ortho2009 = {
            name: 'Ortho 2009 CRCOG Color',
            image: 'img/ortho_2009.jpg'
        };

        var ortho2010coast = {
            name: 'Ortho 2010 Coast 4Band',
            image: 'img/ortho_2010_coast.jpg'
        };

        var ortho2010naip = {
            name: 'Ortho 4Band NAIP',
            image: 'img/ortho_2010_naip.jpg'
        };

        var quaternary = {
            name: 'Quaternary Geology',
            image: 'img/quaternary.gif'
        };

        var soils = {
            name: 'Soils',
            image: 'img/soils.gif'
        };

        var surficialMats = {
            name: 'Surficial Materials',
            image: 'img/surficial_materials.gif'
        };

        var waterResource = {
            name: 'Water Resource Management',
            image: 'img/water_resource_mgmt.gif'
        };

        var watershed = {
            name: 'Watershed',
            image: 'img/watershed.gif'
        };

        var categories = {
            bedrockGeology: bedrockGeology,
            elevationB: elevationB,
            erosion: erosion,
            habitat: habitat,
            hurricaneEvac: hurricaneEvac,
            hurricaneSurge: hurricaneSurge,
            nwiWetlands: nwiWetlands,
            openSpace: openSpace,
            quaternary: quaternary,
            soils: soils,
            surficialMats: surficialMats,
            waterResource: waterResource,
            watershed: watershed,
            ortho1990: ortho1990,
            ortho2004: ortho2004,
            ortho2004cc: ortho2004cc,
            ortho2004ci: ortho2004ci,
            ortho2005ci: ortho2005ci,
            ortho2006: ortho2006,
            ortho2008naip: ortho2008naip,
            ortho2008ua: ortho2008ua,
            ortho2009: ortho2009,
            ortho2010coast: ortho2010coast,
            ortho2010naip: ortho2010naip
        };

        var service = {
            getCtecoCategories: getCtecoCategories
        };
        return service;

        ////////////////

        function getCtecoCategories() {
            return categories;
        }
    }
})();