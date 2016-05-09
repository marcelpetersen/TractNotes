(function() {
    'use strict';

    /**
     * @memberof TractNotes
     * @ngdoc factory
     * @name wmsService
     * @param {service} $rootScope - Root application model in AngularJS
     * @property {list} activeWMSLayers - Contains all the WMS layers that have been added to the map.
     * @property {object} defaultWMSLayers - Contains all the included WMS layers.
     * @description This factory contains the data for the included WMS layers, along with functions to access, add, or delete either them or layers from a URL.
     */
    
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

        /**
         * Sends a user-defined WMS layer from a URL to be imported.
         * @memberOf wmsService
         * @function sendUrlLayerData
         * @param {object} wmsInput - Contains the WMS layer name, type, URL, and opacity
         * @fires $rootScope#AddLayer
         * @eventType emit
         */
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

        /**
         * Removes a WMS layer from activeWMSLayers.
         * @memberOf wmsService
         * @function removeFromActiveWMS
         * @param {object} wms - The WMS layer to be removed
         */
        function removeFromActiveWMS(wms) {
            activeWMSLayers.splice(activeWMSLayers.indexOf(wms), 1);
        }

        /**
         * Sends one of the included WMS layers to be added or removed.
         * @memberOf wmsService
         * @function sendDefaultLayerData
         * @param {object} defaultWMS - Contains the WMS layer name, type, URL, and opacity
         * @fires $rootScope#AddLayer
         * @eventType emit
         */
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

        /**
         * Gets list of active WMS layers.
         * @memberOf wmsService
         * @function getActiveWMSLayers
         * @returns {object} List of active WMS layers
         */
        function getActiveWMSLayers() {
            return activeWMSLayers;
        }

        /**
         * Gets list of included WMS layers.
         * @memberOf wmsService
         * @function getDefaultWMSLayers
         * @returns {object} List of included WMS layers
         */
        function getDefaultWMSLayers() {
            return defaultWMSLayers;
        }

        /**
         * Deletes a WMS layer from the map.
         * @memberOf wmsService
         * @function deleteLayer
         * @param {object} wms - The WMS layer to be deleted
         * @fires $rootScope#RemoveLayer
         * @eventType emit
         */
        function deleteLayer(wms) {
            removeFromActiveWMS(wms);
            console.log('Send remove wms event');
            $rootScope.$emit('RemoveLayer', wms);
        }
    }
})();