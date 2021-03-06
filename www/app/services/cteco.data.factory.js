(function() {
    'use strict';

    /**
     * @memberOf TractNotes
     * @ngdoc factory
     * @name ctecoDataService
     * @param {service} $rootScope - Root application model in AngularJS
     * @property {object} bedrockGeology - Contains the Bedrock Geology image and layers.
     * @property {object} elevationB - Contains the Elevation and Bathymetry image and layers.
     * @property {object} erosion - Contains the Erosion image and layers.
     * @property {object} habitat - Contains the Habitat image and layers.
     * @property {object} hurricaneEvac - Contains the Hurricane Evacuation Zones 2014 image and layers.
     * @property {object} hurricaneSurge - Contains the Hurricane Surge Inundation image and layers.
     * @property {object} nwiWetlands - Contains the NWI Wetlands Functions 2010 image and layers.
     * @property {object} openSpace - Contains the Open Space image and layers.
     * @property {object} quaternary - Contains the Quaternary Geology image and layers.
     * @property {object} soils - Contains the Soils image and layers.
     * @property {object} surficialMats - Contains the Surficial Materials image and layers.
     * @property {object} waterResource - Contains the Water Resource Management image and layers.
     * @property {object} watershed - Contains the Watershed image and layers.
     * @property {object} ortho1990 - Contains the Ortho 1990 image and layers.
     * @property {object} ortho2004 - Contains the Ortho 2004 image and layers.
     * @property {object} ortho2004cc - Contains the Ortho 2004 Coast Color image and layers.
     * @property {object} ortho2004ci - Contains the Ortho 2004 Coast Infrared image and layers.
     * @property {object} ortho2005ci - Contains the Ortho 2005 Coast Infrared image and layers.
     * @property {object} ortho2006 - Contains the Ortho 2006 Color NAIP image and layers.
     * @property {object} ortho2008naip - Contains the Ortho 2008 4Band NAIP image and layers.
     * @property {object} ortho2008ua - Contains the Ortho 2008 Urban Area Color image and layers.
     * @property {object} ortho2009 - Contains the Ortho 2009 CRCOG Color image and layers.
     * @property {object} ortho2010coast - Contains the Ortho 2010 Coast 4Band image and layers.
     * @property {object} ortho2010naip - Contains the Ortho 2010 4Band NAIP image and layers.
     * @property {object} ortho2012 - Contains the Ortho 2012 4Band image and layers.
     * @property {object} ortho2012naip - Contains the Ortho 2012 4Band NAIP image and layers.
     * @property {object} ortho2014 - Contains the Ortho 2014 4Band NAIP image and layers.
     * @property {object} categories - Contains all the CT ECO layer categories, with their associated layers.
     * @property {object} orthoLayers - Contains all the Orthophoto layers.
     * @property {array} activeCTECOLayers - Contains all the CT ECO layers that have been added to the map.
     * @property {array} activeOrthoLayers - Contains all the Orthophoto layers that have been added to the map.
     * @description This factory contains the data for the included CT ECO layers, along with functions to access, add, or delete them.
     */

    angular
        .module('TractNotes')
        .factory('ctecoDataService', ctecoDataService);

    ctecoDataService.$inject = ['$rootScope'];

    /* @ngInject */
    function ctecoDataService($rootScope) {
        // Bedrock Geology Layers
        var bedrockGeology0 = {
            name: 'Bedrock Terrane',
            checked: false,
            layerType: 'cteco',
            layer: L.esri.dynamicMapLayer({
                url: 'http://www.ctecoapp2.uconn.edu/arcgis/rest/services/maps/Bedrock_Geology/MapServer',
                opacity: 0.5,
                layers: [0]
            })
        };

        var bedrockGeology1 = {
            name: 'Bedrock Geology',
            checked: false,
            layerType: 'cteco',
            layer: L.esri.dynamicMapLayer({
                url: 'http://www.ctecoapp2.uconn.edu/arcgis/rest/services/maps/Bedrock_Geology/MapServer',
                opacity: 0.5,
                layers: [3]
            })
        };

        var bedrockGeology = {
            name: 'Bedrock Geology',
            image: 'img/bedrock.gif',
            image_full: 'img/bedrock_full.gif',
            view: '#/app/cteco/bedrockgeology',
            layers: {
                bedrockGeology0: bedrockGeology0,
                bedrockGeology1: bedrockGeology1
            }
        };

        // Elevation and Bathymetry Layers
        var elevationB0 = {
            name: 'Bathymetry',
            checked: false,
            layerType: 'cteco',
            layer: L.esri.dynamicMapLayer({
                url: 'http://www.ctecoapp2.uconn.edu/arcgis/rest/services/maps/Elevation_Bathymetry/MapServer',
                opacity: 0.5,
                layers: [0]
            })
        };

        var elevationB1 = {
            name: 'Elevation Contours',
            checked: false,
            layerType: 'cteco',
            layer: L.esri.dynamicMapLayer({
                url: 'http://www.ctecoapp2.uconn.edu/arcgis/rest/services/maps/Elevation_Bathymetry/MapServer',
                opacity: 0.5,
                layers: [4]
            })
        };

        var elevationB2 = {
            name: 'Imagery and Topo',
            checked: false,
            layerType: 'cteco',
            layer: L.esri.dynamicMapLayer({
                url: 'http://www.ctecoapp2.uconn.edu/arcgis/rest/services/maps/Elevation_Bathymetry/MapServer',
                opacity: 0.5,
                layers: [12]
            })
        };

        var elevationB = {
            name: 'Elevation and Bathymetry',
            image: 'img/elevation_bathymetry.gif',
            image_full: 'img/elevation_bathymetry_full.gif',
            view: '#/app/cteco/elevationbathymetry',
            layers: {
                elevationB0: elevationB0,
                elevationB1: elevationB1,
                elevationB2: elevationB2
            }
        };

        // Erosion Layers
        var erosion0 = {
            name: 'Erosion Susceptibility',
            checked: false,
            layerType: 'cteco',
            layer: L.esri.dynamicMapLayer({
                url: 'http://www.ctecoapp2.uconn.edu/arcgis/rest/services/maps/Erosion_Susceptibility/MapServer',
                opacity: 0.5,
                layers: [0]
            })
        };

        var erosion = {
            name: 'Erosion Susceptibility',
            image: 'img/erosionsusceptibility.gif',
            image_full: 'img/erosionsusceptibility_full.gif',
            view: '#/app/cteco/erosionsusceptibility',
            layers: {
                erosion0: erosion0
            }
        };

        // Habitat Layers
        var habitat0 = {
            name: 'Critical Habitats',
            checked: false,
            layerType: 'cteco',
            layer: L.esri.dynamicMapLayer({
                url: 'http://www.ctecoapp2.uconn.edu/arcgis/rest/services/maps/Habitat/MapServer',
                opacity: 0.5,
                layers: [0]
            })
        };

        var habitat1 = {
            name: 'Natural Diversity Database Areas',
            checked: false,
            layerType: 'cteco',
            layer: L.esri.dynamicMapLayer({
                url: 'http://www.ctecoapp2.uconn.edu/arcgis/rest/services/maps/Habitat/MapServer',
                opacity: 0.5,
                layers: [4]
            })
        };

        var habitat = {
            name: 'Habitat',
            image: 'img/habitat.gif',
            image_full: 'img/habitat_full.gif',
            view: '#/app/cteco/habitat',
            layers: {
                habitat0: habitat0,
                habitat1: habitat1
            }
        };

        // Hurricane Evacuation Zones 2014 Layers
        // @todo Make these work
        var hurricaneEvac0 = {
            name: 'Hurricane Evacuation Zone A',
            checked: false,
            layerType: 'cteco',
            layer: L.esri.dynamicMapLayer({
                url: 'http://www.ctecoapp2.uconn.edu/ArcGIS/rest/services/maps/CT_Hurricane_Evacuation_Zones_2014/MapServer',
                opacity: 0.5,
                layers: [0],
                f: 'image'
            })
        };

        var hurricaneEvac1 = {
            name: 'Hurricane Evacuation Zone B',
            checked: false,
            layerType: 'cteco',
            layer: L.esri.dynamicMapLayer({
                url: 'http://www.ctecoapp2.uconn.edu/ArcGIS/rest/services/maps/CT_Hurricane_Evacuation_Zones_2014/MapServer',
                opacity: 0.5,
                layers: [1],
                f: 'image'
            })
        };

        var hurricaneEvac = {
            name: 'Hurricane Evacuation Zones 2014',
            image: 'img/hurricane_evacuation_zones_2014.gif',
            image_full: 'img/hurricane_evacuation_zones_2014_full.gif',
            view: '#/app/cteco/hurricaneevacuation',
            layers: {
                hurricaneEvac0: hurricaneEvac0,
                hurricaneEvac1: hurricaneEvac1
            }
        };

        // Hurrican Surge Inundation Layers
        var hurricaneSurge0 = {
            name: 'Category 1',
            checked: false,
            layerType: 'cteco',
            layer: L.esri.dynamicMapLayer({
                url: 'http://www.ctecoapp2.uconn.edu/arcgis/rest/services/maps/Hurricane_Surge_Inundation/MapServer',
                opacity: 0.5,
                layers: [1]
            })
        };

        var hurricaneSurge1 = {
            name: 'Category 2',
            checked: false,
            layerType: 'cteco',
            layer: L.esri.dynamicMapLayer({
                url: 'http://www.ctecoapp2.uconn.edu/arcgis/rest/services/maps/Hurricane_Surge_Inundation/MapServer',
                opacity: 0.5,
                layers: [2]
            })
        };

        var hurricaneSurge2 = {
            name: 'Category 3',
            checked: false,
            layerType: 'cteco',
            layer: L.esri.dynamicMapLayer({
                url: 'http://www.ctecoapp2.uconn.edu/arcgis/rest/services/maps/Hurricane_Surge_Inundation/MapServer',
                opacity: 0.5,
                layers: [3]
            })
        };

        var hurricaneSurge3 = {
            name: 'Category 4',
            checked: false,
            layerType: 'cteco',
            layer: L.esri.dynamicMapLayer({
                url: 'http://www.ctecoapp2.uconn.edu/arcgis/rest/services/maps/Hurricane_Surge_Inundation/MapServer',
                opacity: 0.5,
                layers: [4]
            })
        };

        var hurricaneSurge = {
            name: 'Hurricane Surge Inundation',
            image: 'img/hurricane_surge_inundation.gif',
            image_full: 'img/hurricane_surge_inundation_full.gif',
            view: '#/app/cteco/hurricanesurge',
            layers: {
                hurricaneSurge0: hurricaneSurge0,
                hurricaneSurge1: hurricaneSurge1,
                hurricaneSurge2: hurricaneSurge2,
                hurricaneSurge3: hurricaneSurge3
            }
        };

        // NWI Wetlands Functions 2010 Layers
        var nwiWetlands0 = {
            name: 'Freshwater Emergent Wetland',
            checked: false,
            layerType: 'cteco',
            layer: L.esri.dynamicMapLayer({
                url: 'http://www.ctecoapp2.uconn.edu/ArcGIS/rest/services/maps/NWI_CT_Wetland_Functions_2010/MapServer',
                opacity: 0.5,
                layers: [0],
                f: 'image'
            })
        };

        var nwiWetlands1 = {
            name: 'Freshwater Forest and Shrub Wetlands',
            checked: false,
            layerType: 'cteco',
            layer: L.esri.dynamicMapLayer({
                url: 'http://www.ctecoapp2.uconn.edu/ArcGIS/rest/services/maps/NWI_CT_Wetland_Functions_2010/MapServer',
                opacity: 0.5,
                layers: [1],
                f: 'image'
            })
        };

        var nwiWetlands2 = {
            name: 'Other Freshwater Wetland',
            checked: false,
            layerType: 'cteco',
            layer: L.esri.dynamicMapLayer({
                url: 'http://www.ctecoapp2.uconn.edu/ArcGIS/rest/services/maps/NWI_CT_Wetland_Functions_2010/MapServer',
                opacity: 0.5,
                layers: [2],
                f: 'image'
            })
        };

        var nwiWetlands3 = {
            name: 'Estuarine and Marine Wetlands',
            checked: false,
            layerType: 'cteco',
            layer: L.esri.dynamicMapLayer({
                url: 'http://www.ctecoapp2.uconn.edu/ArcGIS/rest/services/maps/NWI_CT_Wetland_Functions_2010/MapServer',
                opacity: 0.5,
                layers: [3],
                f: 'image'
            })
        };

        var nwiWetlands4 = {
            name: 'Estuarine and Marine Deep Water',
            checked: false,
            layerType: 'cteco',
            layer: L.esri.dynamicMapLayer({
                url: 'http://www.ctecoapp2.uconn.edu/ArcGIS/rest/services/maps/NWI_CT_Wetland_Functions_2010/MapServer',
                opacity: 0.5,
                layers: [4],
                f: 'image'
            })
        };

        var nwiWetlands5 = {
            name: 'Freshwater Ponds',
            checked: false,
            layerType: 'cteco',
            layer: L.esri.dynamicMapLayer({
                url: 'http://www.ctecoapp2.uconn.edu/ArcGIS/rest/services/maps/NWI_CT_Wetland_Functions_2010/MapServer',
                opacity: 0.5,
                layers: [5],
                f: 'image'
            })
        };

        var nwiWetlands6 = {
            name: 'Lakes',
            checked: false,
            layerType: 'cteco',
            layer: L.esri.dynamicMapLayer({
                url: 'http://www.ctecoapp2.uconn.edu/ArcGIS/rest/services/maps/NWI_CT_Wetland_Functions_2010/MapServer',
                opacity: 0.5,
                layers: [6],
                f: 'image'
            })
        };

        var nwiWetlands7 = {
            name: 'Riverine',
            checked: false,
            layerType: 'cteco',
            layer: L.esri.dynamicMapLayer({
                url: 'http://www.ctecoapp2.uconn.edu/ArcGIS/rest/services/maps/NWI_CT_Wetland_Functions_2010/MapServer',
                opacity: 0.5,
                layers: [7],
                f: 'image'
            })
        };

        var nwiWetlands = {
            name: 'NWI Wetlands Functions 2010',
            image: 'img/nwi_wetland_function_2010.gif',
            image_full: 'img/nwi_wetland_function_2010_full.gif',
            view: '#/app/cteco/nwiwetlands',
            layers: {
                nwiWetlands0: nwiWetlands0,
                nwiWetlands1: nwiWetlands1,
                nwiWetlands2: nwiWetlands2,
                nwiWetlands3: nwiWetlands3,
                nwiWetlands4: nwiWetlands4,
                nwiWetlands5: nwiWetlands5,
                nwiWetlands6: nwiWetlands6,
                nwiWetlands7: nwiWetlands7
            }
        };

        // Open Space Layers
        var openSpace0 = {
            name: '1997 Municipal and Private Open Space',
            checked: false,
            layerType: 'cteco',
            layer: L.esri.dynamicMapLayer({
                url: 'http://www.ctecoapp2.uconn.edu/ArcGIS/rest/services/maps/Open_Space/MapServer/',
                opacity: 0.5,
                layers: [0]
            })
        };

        var openSpace1 = {
            name: 'DOT Scenic Land Strips',
            checked: false,
            layerType: 'cteco',
            layer: L.esri.dynamicMapLayer({
                url: 'http://www.ctecoapp2.uconn.edu/ArcGIS/rest/services/maps/Open_Space/MapServer/',
                opacity: 0.5,
                layers: [1]
            })
        };

        var openSpace2 = {
            name: 'Protected Open Space Mapping Project',
            checked: false,
            layerType: 'cteco',
            layer: L.esri.dynamicMapLayer({
                url: 'http://www.ctecoapp2.uconn.edu/ArcGIS/rest/services/maps/Open_Space/MapServer/',
                opacity: 0.5,
                layers: [2]
            })
        };

        var openSpace3 = {
            name: 'Federal Open Space',
            checked: false,
            layerType: 'cteco',
            layer: L.esri.dynamicMapLayer({
                url: 'http://www.ctecoapp2.uconn.edu/ArcGIS/rest/services/maps/Open_Space/MapServer/',
                opacity: 0.5,
                layers: [3]
            })
        };

        var openSpace4 = {
            name: 'DEP Property',
            checked: false,
            layerType: 'cteco',
            layer: L.esri.dynamicMapLayer({
                url: 'http://www.ctecoapp2.uconn.edu/ArcGIS/rest/services/maps/Open_Space/MapServer/',
                opacity: 0.5,
                layers: [4]
            })
        };

        var openSpace5 = {
            name: 'Parcels for Protected Open Space Mapping',
            checked: false,
            layerType: 'cteco',
            layer: L.esri.dynamicMapLayer({
                url: 'http://www.ctecoapp2.uconn.edu/ArcGIS/rest/services/maps/Open_Space/MapServer/',
                opacity: 0.5,
                layers: [5]
            })
        };

        var openSpace = {
            name: 'Open Space',
            image: 'img/open_space.gif',
            image_full: 'img/open_space_full.gif',
            view: '#/app/cteco/openspace',
            layers: {
                openSpace0: openSpace0,
                openSpace1: openSpace1,
                openSpace2: openSpace2,
                openSpace3: openSpace3,
                openSpace4: openSpace4,
                openSpace5: openSpace5
            }
        };

        // Orthophoto Layers
        var ortho1990 = {
            name: 'Ortho 1990',
            image: 'img/ortho_1990.jpg',
            checked: false,
            layerType: 'ortho',
            layer: L.esri.imageMapLayer({
                url: 'http://www.ctecoapp3.uconn.edu/arcgis/rest/services/images/ortho_1990/ImageServer',
                f: 'image'
            })
        };

        var ortho2004 = {
            name: 'Ortho 2004',
            image: 'img/ortho_2004.jpg',
            checked: false,
            layerType: 'ortho',
            layer: L.esri.imageMapLayer({
                url: 'http://www.ctecoapp3.uconn.edu/arcgis/rest/services/images/ortho_2004/ImageServer',
                f: 'image'
            })
        };

        var ortho2004cc = {
            name: 'Ortho 2004 Coast Color',
            image: 'img/ortho_2004_cc.jpg',
            checked: false,
            layerType: 'ortho',
            layer: L.esri.imageMapLayer({
                url: 'http://www.ctecoapp3.uconn.edu/arcgis/rest/services/images/ortho_2004_coast_color/ImageServer',
                f: 'image'
            })
        };

        var ortho2004ci = {
            name: 'Ortho 2004 Coast Infrared',
            image: 'img/ortho_2004_ci.jpg',
            checked: false,
            layerType: 'ortho',
            layer: L.esri.imageMapLayer({
                url: 'http://www.ctecoapp3.uconn.edu/arcgis/rest/services/images/ortho_2004_color_infrared/ImageServer',
                f: 'image'
            })
        };

        var ortho2005ci = {
            name: 'Ortho 2005 Coast Infrared',
            image: 'img/ortho_2005_ci.jpg',
            checked: false,
            layerType: 'ortho',
            layer: L.esri.imageMapLayer({
                url: 'http://www.ctecoapp3.uconn.edu/arcgis/rest/services/images/ortho_2005_coast_infrared/ImageServer',
                f: 'image'
            })
        };

        var ortho2006 = {
            name: 'Ortho 2006 Color NAIP',
            image: 'img/ortho_2006.jpg',
            checked: false,
            layerType: 'ortho',
            layer: L.esri.imageMapLayer({
                url: 'http://www.ctecoapp3.uconn.edu/arcgis/rest/services/images/ortho_2006_color_NAIP/ImageServer',
                f: 'image'
            })
        };

        var ortho2008naip = {
            name: 'Ortho 2008 4Band NAIP',
            image: 'img/ortho_2008_naip.jpg',
            checked: false,
            layerType: 'ortho',
            layer: L.esri.imageMapLayer({
                url: 'http://www.ctecoapp3.uconn.edu/arcgis/rest/services/images/ortho_2008_4band_NAIP/ImageServer',
                f: 'image'
            })
        };

        var ortho2008ua = {
            name: 'Ortho 2008 Urban Area Color',
            image: 'img/ortho_2008_ua.jpg',
            checked: false,
            layerType: 'ortho',
            layer: L.esri.imageMapLayer({
                url: 'http://www.ctecoapp3.uconn.edu/arcgis/rest/services/images/ortho_2008_color_urban_area/ImageServer',
                f: 'image'
            })
        };

        var ortho2009 = {
            name: 'Ortho 2009 CRCOG Color',
            image: 'img/ortho_2009.jpg',
            checked: false,
            layerType: 'ortho',
            layer: L.esri.imageMapLayer({
                url: 'http://www.ctecoapp3.uconn.edu/arcgis/rest/services/images/ortho_2009_color_CRCOG/ImageServer',
                f: 'image'
            })
        };

        var ortho2010coast = {
            name: 'Ortho 2010 Coast 4Band',
            image: 'img/ortho_2010_coast.jpg',
            checked: false,
            layerType: 'ortho',
            layer: L.esri.imageMapLayer({
                url: 'http://www.ctecoapp3.uconn.edu/arcgis/rest/services/images/ortho_2010_coast_4band/ImageServer',
                f: 'image'
            })
        };

        var ortho2010naip = {
            name: 'Ortho 4Band NAIP',
            image: 'img/ortho_2010_naip.jpg',
            checked: false,
            layerType: 'ortho',
            layer: L.esri.imageMapLayer({
                url: 'http://www.ctecoapp3.uconn.edu/arcgis/rest/services/images/ortho_2010_4band_NAIP/ImageServer',
                f: 'image'
            })
        };

        var ortho2012 = {
            name: 'Ortho 2012 4Band',
            image: 'img/ortho_2012.jpg',
            checked: false,
            layerType: 'ortho',
            layer: L.esri.imageMapLayer({
                url: 'http://www.ctecoapp3.uconn.edu/arcgis/rest/services/images/ortho_2012/ImageServer',
                f: 'image'
            })
        };

        var ortho2012naip = {
            name: 'Ortho 2012 4Band NAIP',
            image: 'img/ortho_2012_naip.jpg',
            checked: false,
            layerType: 'ortho',
            layer: L.esri.imageMapLayer({
                url: 'http://www.ctecoapp3.uconn.edu/arcgis/rest/services/images/ortho_2012_4band_NAIP/ImageServer',
                f: 'image'
            })
        };

        var ortho2014 = {
            name: 'Ortho 2014 4Band NAIP',
            image: 'img/ortho_2014_naip.jpg',
            checked: false,
            layerType: 'ortho',
            layer: L.esri.imageMapLayer({
                url: 'http://www.ctecoapp3.uconn.edu/arcgis/rest/services/images/ortho_2014_4band_NAIP/ImageServer',
                f: 'image'
            })
        };

        // Quaternary Geology Layers
        var quaternary0 = {
            name: 'Quaternary Geology',
            checked: false,
            layerType: 'cteco',
            layer: L.esri.dynamicMapLayer({
                url: 'http://www.ctecoapp2.uconn.edu/ArcGIS/rest/services/maps/Open_Space/MapServer/',
                opacity: 0.5,
                layers: [5]
            })
        };

        var quaternary = {
            name: 'Quaternary Geology',
            image: 'img/quaternary.gif',
            image_full: 'img/quaternary_full.gif',
            view: '#/app/cteco/quaternarygeology',
            layers: {
                quaternary0: quaternary0
            }
        };

        // Soil Layers
        var soils0 = {
            name: 'Soils',
            checked: false,
            layerType: 'cteco',
            layer: L.esri.dynamicMapLayer({
                url: 'http://www.ctecoapp2.uconn.edu/arcgis/rest/services/maps/Soils/MapServer',
                opacity: 0.5,
                layers: [0]
            })
        };

        var soils1 = {
            name: 'Farmland Soils',
            checked: false,
            layerType: 'cteco',
            layer: L.esri.dynamicMapLayer({
                url: 'http://www.ctecoapp2.uconn.edu/arcgis/rest/services/maps/Soils/MapServer',
                opacity: 0.5,
                layers: [1]
            })
        };

        var soils2 = {
            name: 'Hydric Soils',
            checked: false,
            layerType: 'cteco',
            layer: L.esri.dynamicMapLayer({
                url: 'http://www.ctecoapp2.uconn.edu/arcgis/rest/services/maps/Soils/MapServer',
                opacity: 0.5,
                layers: [2]
            })
        };

        var soils3 = {
            name: 'Inland Wetland Soils',
            checked: false,
            layerType: 'cteco',
            layer: L.esri.dynamicMapLayer({
                url: 'http://www.ctecoapp2.uconn.edu/arcgis/rest/services/maps/Soils/MapServer',
                opacity: 0.5,
                layers: [3]
            })
        };

        var soils4 = {
            name: 'Soil Parent Material',
            checked: false,
            layerType: 'cteco',
            layer: L.esri.dynamicMapLayer({
                url: 'http://www.ctecoapp2.uconn.edu/arcgis/rest/services/maps/Soils/MapServer',
                opacity: 0.5,
                layers: [4]
            })
        };

        var soils5 = {
            name: 'Soil Potential for Subsurface Sewage Disposal',
            checked: false,
            layerType: 'cteco',
            layer: L.esri.dynamicMapLayer({
                url: 'http://www.ctecoapp2.uconn.edu/arcgis/rest/services/maps/Soils/MapServer',
                opacity: 0.5,
                layers: [5]
            })
        };

        var soils6 = {
            name: 'Soil Flooding Class',
            checked: false,
            layerType: 'cteco',
            layer: L.esri.dynamicMapLayer({
                url: 'http://www.ctecoapp2.uconn.edu/arcgis/rest/services/maps/Soils/MapServer',
                opacity: 0.5,
                layers: [6]
            })
        };

        var soils7 = {
            name: 'Soil Drainage Class',
            checked: false,
            layerType: 'cteco',
            layer: L.esri.dynamicMapLayer({
                url: 'http://www.ctecoapp2.uconn.edu/arcgis/rest/services/maps/Soils/MapServer',
                opacity: 0.5,
                layers: [7]
            })
        };

        var soils = {
            name: 'Soils',
            image: 'img/soils.gif',
            image_full: 'img/soils_full.gif',
            view: '#/app/cteco/soils',
            layers: {
                soils0: soils0,
                soils1: soils1,
                soils2: soils2,
                soils3: soils3,
                soils4: soils4,
                soils5: soils5,
                soils6: soils6,
                soils7: soils7
            }
        };

        // Surficial Materials Layers
        var surficialMats0 = {
            name: 'Surficial Materials',
            checked: false,
            layerType: 'cteco',
            layer: L.esri.dynamicMapLayer({
                url: 'http://www.ctecoapp2.uconn.edu/arcgis/rest/services/maps/Surficial_Materials/MapServer',
                opacity: 0.5,
                layers: [0]
            })
        };

        var surficialMats1 = {
            name: 'Surficial Stratified Drift',
            checked: false,
            layerType: 'cteco',
            layer: L.esri.dynamicMapLayer({
                url: 'http://www.ctecoapp2.uconn.edu/arcgis/rest/services/maps/Surficial_Materials/MapServer',
                opacity: 0.5,
                layers: [1]
            })
        };

        var surficialMats2 = {
            name: 'Surficial Aquifer Texture',
            checked: false,
            layerType: 'cteco',
            layer: L.esri.dynamicMapLayer({
                url: 'http://www.ctecoapp2.uconn.edu/arcgis/rest/services/maps/Surficial_Materials/MapServer',
                opacity: 0.5,
                layers: [2]
            })
        };

        var surficialMats3 = {
            name: 'Surficial Aquifer Potential',
            checked: false,
            layerType: 'cteco',
            layer: L.esri.dynamicMapLayer({
                url: 'http://www.ctecoapp2.uconn.edu/arcgis/rest/services/maps/Surficial_Materials/MapServer',
                opacity: 0.5,
                layers: [3]
            })
        };

        var surficialMats = {
            name: 'Surficial Materials',
            image: 'img/surficial_materials.gif',
            image_full: 'img/surficial_materials_full.gif',
            view: '#/app/cteco/surficialmaterials',
            layers: {
                surficialMats0: surficialMats0,
                surficialMats1: surficialMats1,
                surficialMats2: surficialMats2,
                surficialMats3: surficialMats3
            }
        };

        // Water Resource Management Layers
        var waterResource0 = {
            name: 'Aquifer Protection Area',
            checked: false,
            layerType: 'cteco',
            layer: L.esri.dynamicMapLayer({
                url: 'http://www.ctecoapp2.uconn.edu/arcgis/rest/services/maps/Water_Resource_Mgmt/MapServer',
                opacity: 0.5,
                layers: [0]
            })
        };

        var waterResource1 = {
            name: 'Assessed Waterbody 305b 2014',
            checked: false,
            layerType: 'cteco',
            layer: L.esri.dynamicMapLayer({
                url: 'http://www.ctecoapp2.uconn.edu/arcgis/rest/services/maps/Water_Resource_Mgmt/MapServer',
                opacity: 0.5,
                layers: [1]
            })
        };

        var waterResource2 = {
            name: 'Impaired Waterbody 2014',
            checked: false,
            layerType: 'cteco',
            layer: L.esri.dynamicMapLayer({
                url: 'http://www.ctecoapp2.uconn.edu/arcgis/rest/services/maps/Water_Resource_Mgmt/MapServer',
                opacity: 0.5,
                layers: [5]
            })
        };

        var waterResource3 = {
            name: 'Assessed Waterbody 305b 2012',
            checked: false,
            layerType: 'cteco',
            layer: L.esri.dynamicMapLayer({
                url: 'http://www.ctecoapp2.uconn.edu/arcgis/rest/services/maps/Water_Resource_Mgmt/MapServer',
                opacity: 0.5,
                layers: [9]
            })
        };

        var waterResource4 = {
            name: 'Impaired Waterbody 2012',
            checked: false,
            layerType: 'cteco',
            layer: L.esri.dynamicMapLayer({
                url: 'http://www.ctecoapp2.uconn.edu/arcgis/rest/services/maps/Water_Resource_Mgmt/MapServer',
                opacity: 0.5,
                layers: [13]
            })
        };

        var waterResource5 = {
            name: 'Assessed Waterbody 305b 2010',
            checked: false,
            layerType: 'cteco',
            layer: L.esri.dynamicMapLayer({
                url: 'http://www.ctecoapp2.uconn.edu/arcgis/rest/services/maps/Water_Resource_Mgmt/MapServer',
                opacity: 0.5,
                layers: [17]
            })
        };

        var waterResource6 = {
            name: 'Impaired Waterbody 2010',
            checked: false,
            layerType: 'cteco',
            layer: L.esri.dynamicMapLayer({
                url: 'http://www.ctecoapp2.uconn.edu/arcgis/rest/services/maps/Water_Resource_Mgmt/MapServer',
                opacity: 0.5,
                layers: [21]
            })
        };

        var waterResource7 = {
            name: 'Assessed Waterbody 305b 2008',
            checked: false,
            layerType: 'cteco',
            layer: L.esri.dynamicMapLayer({
                url: 'http://www.ctecoapp2.uconn.edu/arcgis/rest/services/maps/Water_Resource_Mgmt/MapServer',
                opacity: 0.5,
                layers: [25]
            })
        };

        var waterResource8 = {
            name: 'Impaired Waterbodies 2008',
            checked: false,
            layerType: 'cteco',
            layer: L.esri.dynamicMapLayer({
                url: 'http://www.ctecoapp2.uconn.edu/arcgis/rest/services/maps/Water_Resource_Mgmt/MapServer',
                opacity: 0.5,
                layers: [29]
            })
        };

        var waterResource9 = {
            name: 'Assessed Waterbody 305b 2006',
            checked: false,
            layerType: 'cteco',
            layer: L.esri.dynamicMapLayer({
                url: 'http://www.ctecoapp2.uconn.edu/arcgis/rest/services/maps/Water_Resource_Mgmt/MapServer',
                opacity: 0.5,
                layers: [33]
            })
        };

        var waterResource10 = {
            name: 'Impaired Waterbodies 2006',
            checked: false,
            layerType: 'cteco',
            layer: L.esri.dynamicMapLayer({
                url: 'http://www.ctecoapp2.uconn.edu/arcgis/rest/services/maps/Water_Resource_Mgmt/MapServer',
                opacity: 0.5,
                layers: [37]
            })
        };

        var waterResource11 = {
            name: 'Surface Water Quality',
            checked: false,
            layerType: 'cteco',
            layer: L.esri.dynamicMapLayer({
                url: 'http://www.ctecoapp2.uconn.edu/arcgis/rest/services/maps/Water_Resource_Mgmt/MapServer',
                opacity: 0.5,
                layers: [41]
            })
        };

        var waterResource12 = {
            name: 'Ground Water Quality Classifications',
            checked: false,
            layerType: 'cteco',
            layer: L.esri.dynamicMapLayer({
                url: 'http://www.ctecoapp2.uconn.edu/arcgis/rest/services/maps/Water_Resource_Mgmt/MapServer',
                opacity: 0.5,
                layers: [44]
            })
        };

        var waterResource = {
            name: 'Water Resource Management',
            image: 'img/water_resource_mgmt.gif',
            image_full: 'img/water_resource_mgmt_full.gif',
            view: '#/app/cteco/waterresourcemgmt',
            layers: {
                waterResource0: waterResource0,
                waterResource1: waterResource1,
                waterResource2: waterResource2,
                waterResource3: waterResource3,
                waterResource4: waterResource4,
                waterResource5: waterResource5,
                waterResource6: waterResource6,
                waterResource7: waterResource7,
                waterResource8: waterResource8,
                waterResource9: waterResource9,
                waterResource10: waterResource10,
                waterResource11: waterResource11,
                waterResource12: waterResource12
            }
        };

        // Watershed Layers
        var watershed0 = {
            name: 'Major Drainage Basins',
            checked: false,
            layerType: 'cteco',
            layer: L.esri.dynamicMapLayer({
                url: 'http://www.ctecoapp2.uconn.edu/arcgis/rest/services/maps/Watershed/MapServer',
                opacity: 0.5,
                layers: [0]
            })
        };

        var watershed1 = {
            name: 'Regional Drainage Basins',
            checked: false,
            layerType: 'cteco',
            layer: L.esri.dynamicMapLayer({
                url: 'http://www.ctecoapp2.uconn.edu/arcgis/rest/services/maps/Watershed/MapServer',
                opacity: 0.5,
                layers: [3]
            })
        };

        var watershed2 = {
            name: 'Subregional Drainage Basins',
            checked: false,
            layerType: 'cteco',
            layer: L.esri.dynamicMapLayer({
                url: 'http://www.ctecoapp2.uconn.edu/arcgis/rest/services/maps/Watershed/MapServer',
                opacity: 0.5,
                layers: [6]
            })
        };

        var watershed3 = {
            name: 'Local Drainage Basins',
            checked: false,
            layerType: 'cteco',
            layer: L.esri.dynamicMapLayer({
                url: 'http://www.ctecoapp2.uconn.edu/arcgis/rest/services/maps/Watershed/MapServer',
                opacity: 0.5,
                layers: [10]
            })
        };

        var watershed4 = {
            name: 'All Drainage Basins',
            checked: false,
            layerType: 'cteco',
            layer: L.esri.dynamicMapLayer({
                url: 'http://www.ctecoapp2.uconn.edu/arcgis/rest/services/maps/Watershed/MapServer',
                opacity: 0.5,
                layers: [14]
            })
        };

        var watershed = {
            name: 'Watershed',
            image: 'img/watershed.gif',
            image_full: 'img/watershed_full.gif',
            view: '#/app/cteco/watershed',
            layers: {
                watershed0: watershed0,
                watershed1: watershed1,
                watershed2: watershed2,
                watershed3: watershed3,
                watershed4: watershed4
            }
        };

        // WMS Categories
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
            watershed: watershed
        };

        var orthoLayers = {
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
            ortho2010naip: ortho2010naip,
            ortho2012: ortho2012,
            ortho2012naip: ortho2012naip,
            ortho2014: ortho2014
        };

        var service = {
            getCtecoCategories: getCtecoCategories,
            getOrthoLayers: getOrthoLayers,
            sendCTECOLayer: sendCTECOLayer,
            sendOrthoLayer: sendOrthoLayer,
            getActiveCTECOLayers: getActiveCTECOLayers,
            getActiveOrthoLayers: getActiveOrthoLayers,
            getOpacity: getOpacity,
            removeFromActiveCTECO: removeFromActiveCTECO,
            removeFromActiveOrtho: removeFromActiveOrtho,
            deleteLayer: deleteLayer
        };

        var activeCTECOLayers = [];
        var activeOrthoLayers = [];

        return service;

        ////////////////

        /**
         * Gets list of all CT ECO layer categories.
         * @memberOf ctecoDataService
         * @function getCtecoCategories
         * @returns {object} List of CT ECO categories
         */
        function getCtecoCategories() {
            return categories;
        }

        /**
         * Gets kist of all orthophoto layers.
         * @memberOf ctecoDataService
         * @function getOrthoLayers
         * @returns {object} List of Orthophoto layers
         */
        function getOrthoLayers() {
            return orthoLayers;
        }

        /**
         * Gets list of active CT ECO layers.
         * @memberOf ctecoDataService
         * @function getActiveCTECOLayers
         * @returns {object} List of active CT ECO layers
         */
        function getActiveCTECOLayers() {
            return activeCTECOLayers;
        }

        /**
         * Gets list of active orthophoto layers.
         * @memberOf ctecoDataService
         * @function getActiveOrthoLayers
         * @returns {object} List of active orthophoto layers
         */
        function getActiveOrthoLayers() {
            return activeOrthoLayers;
        }

        /**
         * Gets the opacity of a layer.
         * @memberOf ctecoDataService
         * @function getOpacity
         * @param {object} layer - The layer to get the opacity of
         * @returns {number} Opacity of layer (0 - 1)
         */
        function getOpacity(layer) {
            return layer.options.opacity;
        }

        /**
         * Adds or removes a CT ECO layer.
         * @memberOf ctecoDataService
         * @function sendCTECOLayer
         * @param {object} cteco - The CT ECO layer to add or remove
         * @fires $rootScope#AddLayer
         * @fires $rootScope#RemoveLayer
         * @eventType emit
         */
        function sendCTECOLayer(cteco) {
            console.log(cteco)
            if (cteco.checked) {
                console.log('send addcteco event')
                activeCTECOLayers.push(cteco);
                $rootScope.$emit('AddLayer', cteco);
            } else {
                console.log('send removecteco event')
                // remove cteco from activeCTECOLayers
                removeFromActiveCTECO(cteco);
                $rootScope.$emit('RemoveLayer', cteco);
            }
        }

        /**
         * Adds or removes an orthophoto layer.
         * @memberOf ctecoDataService
         * @function sendOrthoLayer
         * @param {object} ortho - The orthophoto layer to add or remove
         * @fires $rootScope#AddLayer
         * @fires $rootScope#RemoveLayer
         * @eventType emit
         */
        function sendOrthoLayer(ortho) {
            if (ortho.checked)
            {
                console.log('send ortho event')
                activeOrthoLayers.push(ortho);
                $rootScope.$emit('AddLayer', ortho);
            }
            else
            {
                console.log('send removeortho event')
                // remove ortho from activeOrthoLayers
                removeFromActiveOrtho(ortho);
                $rootScope.$emit('RemoveLayer', ortho);
            }
        }

        /**
         * Removes a CT ECO layer from activeCTECOLayers
         * @memberOf ctecoDataService
         * @function removeFromActiveCTECO
         * @param {object} cteco - The CT ECO layer to remove
         */
        function removeFromActiveCTECO(cteco) {
            activeCTECOLayers.splice(activeCTECOLayers.indexOf(cteco), 1);
        }

        /**
         * Removes an orthophoto layer from activeOrthoLayers
         * @memberOf ctecoDataService
         * @function removeFromActiveOrtho
         * @param {object} ortho - The orthophoto layer to remove
         */
        function removeFromActiveOrtho(ortho) {
            activeOrthoLayers.splice(activeOrthoLayers.indexOf(ortho), 1);
        }

        /**
         * Deletes an added layer.
         * @memberOf ctecoDataService
         * @function deleteLayer
         * @param {object} layer - The layer to delete
         * @fires $rootScope#RemoveLayer
         * @eventType emit
         */
        function deleteLayer(layer) {
            if (layer.layerType == 'cteco')
            {
                removeFromActiveCTECO(layer);
            }
            else if (layer.layerType == 'ortho')
            {
                removeFromActiveOrtho(layer);
            }
            $rootScope.$emit('RemoveLayer', layer);
        }
    }
})();