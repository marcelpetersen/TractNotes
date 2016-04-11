(function() {
    'use strict';

    angular
        .module('TractNotes')
        .factory('wmsUrlService', wmsUrlService);

    wmsUrlService.$inject = ['$rootScope'];

    /* @ngInject */
    function wmsUrlService($rootScope) {
        var service = {
            sendUrlLayerData: sendUrlLayerData,
            sendDefaultLayerData: sendDefaultLayerData,
            getActiveWMSLayers: getActiveWMSLayers,
            getDefaultWMSLayers: getDefaultWMSLayers
        };

        var activeWMSLayers = [];

        // @TODO: add image preview of each WMS layer?
        var openStreetMapMapnik = {
            name: 'OpenStreetMap Mapnik',
            url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            opacity: '1.0',
            layerType: 'tile'
        };

        var thunderforestOutdoors = {
            name: 'Thunderforest Outdoors',
            url: 'http://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png',
            opacity: '1.0',
            layerType: 'tile'
        };

        var stamenToner = {
            name: 'Stamen Toner',
            url: 'http://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png',
            opacity: '1.0',
            layerType: 'tile'
        };

        var esriWorldImagery = {
            name: 'ESRI World Imagery',
            url: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            opacity: '1.0',
            layerType: 'tile'
        };

        var esriOceanBasemap = {
            name: 'ESRI Ocean Basemap',
            url: 'http://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}',
            opacity: '1.0',
            layerType: 'tile'
        };

        var esriWorldTopoMap = {
            name: 'ESRI World Topo Map',
            url: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
            opacity: '1.0',
            layerType: 'tile'
        };


        var defaultWMSLayers = {
            openStreetMapMapnik: openStreetMapMapnik,
            thunderforestOutdoors: thunderforestOutdoors,
            stamenToner: stamenToner,
            esriWorldImagery: esriWorldImagery,
            esriOceanBasemap: esriOceanBasemap,
            esriWorldTopoMap: esriWorldTopoMap
        };

        return service;

        ////////////////

        function sendUrlLayerData(wmsInput) {
            var featureLayer, imageLayer, dynamicLayer, tileLayer = null;
            if (wmsInput.layerType == 'ESRI Feature Layer') {
                console.log('feature layer');
                featureLayer = L.esri.featureLayer({
                    url: wmsInput.url,
                    opacity: wmsInput.opacity
                });
                wmsInput.layer = featureLayer;

                activeWMSLayers.push(wmsInput);

                $rootScope.$emit('wmsFromURL', wmsInput);
            } else if (wmsInput.layerType == 'ESRI Image Map Layer') {
                console.log('image layer');
                imageLayer = L.esri.imageMapLayer({
                    url: wmsInput.url,
                    opacity: wmsInput.opacity
                });
                wmsInput.layer = imageLayer;

                activeWMSLayers.push(wmsInput);

                $rootScope.$emit('wmsFromURL', wmsInput);
            } else if (wmsInput.layerType == 'Dynamic Map Layer') {
                console.log('dynamic layer');
                dynamicLayer = L.esri.dynamicMapLayer({
                    url: wmsInput.url,
                    opacity: wmsInput.opacity
                });
                wmsInput.layer = dynamicLayer;

                activeWMSLayers.push(wmsInput);

                $rootScope.$emit('wmsFromURL', wmsInput);
            } else if (wmsInput.layerType == 'Tile Layer') {
                console.log('tile layer');
                tileLayer = L.tileLayer(wmsInput.url, {
                    opacity: wmsInput.opacity
                });
                wmsInput.layer = tileLayer;

                activeWMSLayers.push(wmsInput);

                $rootScope.$emit('wmsFromURL', wmsInput);
            } else {
                console.log('We might have a problem here.');
            }
        }

        function sendDefaultLayerData(defaultWMS) {
            var tileLayer = null;
            if (defaultWMS.checked == true) {
                console.log('Adding default WMS layer to map');
                tileLayer = L.tileLayer(defaultWMS.url, {
                    opacity: defaultWMS.opacity
                });
                defaultWMS.layer = tileLayer;

                activeWMSLayers.push(defaultWMS);

                console.log(activeWMSLayers);

                $rootScope.$emit('AddWMSFromDefault', defaultWMS);
            }
            else if (defaultWMS.checked == false) {
                console.log('Removing default WMS layer from map');
                // remove from activeWMSLayers
                activeWMSLayers.splice(activeWMSLayers.indexOf(defaultWMS));
                console.log(activeWMSLayers);
                console.log(defaultWMS);
                $rootScope.$emit('RemoveWMSFromDefault', defaultWMS);
            }
            else {
                console.log('Error: WMS Layer is neither checked nor unchecked...');
            }
        }

        function getActiveWMSLayers() {
            return activeWMSLayers;
        }

        function getDefaultWMSLayers() {
            return defaultWMSLayers;
        }
    }
})();