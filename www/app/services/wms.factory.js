(function() {
    'use strict';

    angular
        .module('TractNotes')
        .factory('wmsService', wmsService);

    wmsService.$inject = ['$rootScope'];

    /* @ngInject */
    function wmsService($rootScope) {
        var service = {
            sendUrlLayerData: sendUrlLayerData,
            sendDefaultLayerData: sendDefaultLayerData,
            getActiveWMSLayers: getActiveWMSLayers,
            getDefaultWMSLayers: getDefaultWMSLayers,
            removeFromActiveWMS: removeFromActiveWMS,
            deleteLayer: deleteLayer
        };

        var activeWMSLayers = [];

        // @TODO: add image preview of each WMS layer?
        var openStreetMapMapnik = {
            name: 'OpenStreetMap Mapnik',
            url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            opacity: '1.0',
            layerType: 'wms'
        };

        var thunderforestOutdoors = {
            name: 'Thunderforest Outdoors',
            url: 'http://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png',
            opacity: '1.0',
            layerType: 'wms'
        };

        var stamenToner = {
            name: 'Stamen Toner',
            url: 'http://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png',
            opacity: '1.0',
            layerType: 'wms'
        };

        var esriWorldImagery = {
            name: 'ESRI World Imagery',
            url: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            opacity: '1.0',
            wmsLayerType: 'wmsTile',
            layerType: 'wms',
        };

        var esriOceanBasemap = {
            name: 'ESRI Ocean Basemap',
            url: 'http://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}',
            opacity: '1.0',
            layerType: 'wms'
        };

        var esriWorldTopoMap = {
            name: 'ESRI World Topo Map',
            url: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
            opacity: '1.0',
            layerType: 'wms'
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
            console.log(wmsInput);
            var featureLayer, imageLayer, dynamicLayer, tileLayer = null;
            if (wmsInput.wmsLayerType == 'ESRI Feature Layer') {
                console.log('feature layer');
                featureLayer = L.esri.featureLayer({
                    url: wmsInput.url,
                    opacity: wmsInput.opacity / 100
                });
                wmsInput.layer = featureLayer;

                activeWMSLayers.push(wmsInput);

                $rootScope.$emit('AddLayer', wmsInput);
            } else if (wmsInput.wmsLayerType == 'ESRI Image Map Layer') {
                console.log('image layer');
                imageLayer = L.esri.imageMapLayer({
                    url: wmsInput.url,
                    opacity: wmsInput.opacity / 100
                });
                wmsInput.layer = imageLayer;

                activeWMSLayers.push(wmsInput);

                $rootScope.$emit('AddLayer', wmsInput);
            } else if (wmsInput.wmsLayerType == 'Dynamic Map Layer') {
                console.log('dynamic layer');
                dynamicLayer = L.esri.dynamicMapLayer({
                    url: wmsInput.url,
                    opacity: wmsInput.opacity / 100
                });
                wmsInput.layer = dynamicLayer;

                activeWMSLayers.push(wmsInput);

                $rootScope.$emit('AddLayer', wmsInput);
            } else if (wmsInput.wmsLayerType == 'Tile Layer') {
                console.log('tile layer');
                tileLayer = L.tileLayer(wmsInput.url, {
                    opacity: wmsInput.opacity / 100
                });
                wmsInput.layer = tileLayer;

                activeWMSLayers.push(wmsInput);

                $rootScope.$emit('AddLayer', wmsInput);
            } else {
                console.log('error');
            }
        }

        function removeFromActiveWMS(wms) {
            activeWMSLayers.splice(activeWMSLayers.indexOf(wms), 1);
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

                $rootScope.$emit('AddLayer', defaultWMS);
            }
            else if (defaultWMS.checked == false) {
                console.log('Removing default WMS layer from map');
                // remove from activeWMSLayers
                removeFromActiveWMS(defaultWMS);
                console.log(activeWMSLayers);
                console.log(defaultWMS);
                $rootScope.$emit('AddLayer', defaultWMS);
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

        function deleteLayer(wms) {
            removeFromActiveWMS(wms);
            console.log('Send remove wms event');
            $rootScope.$emit('RemoveLayer', wms);
        }
    }
})();