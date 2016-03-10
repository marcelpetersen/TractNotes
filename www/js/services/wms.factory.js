(function() {
    'use strict';

    angular
        .module('TractNotes')
        .factory('wmsUrlService', wmsUrlService);

    wmsUrlService.$inject = ['$rootScope'];

    /* @ngInject */
    function wmsUrlService($rootScope) {
        var service = {
            sendLayerData: sendLayerData
        };
        return service;

        ////////////////

        function sendLayerData(layerObj) {
            var wmsLayer = null;
            console.log(layerObj);
            if (layerObj.layerType == 'feature')
            {
                console.log('feature layer');
                wmsLayer = L.esri.featureLayer({
                    url: layerObj.url,
                    opacity: 0.5, //change this to be able to be set by the user
                    layers: [layerObj.layerNum]
                });
                layerObj.layer = wmsLayer;

                $rootScope.$emit('wmsFromURL', layerObj);
            }
            else if (layerObj.layerType == 'image')
            {
                console.log('image layer');
                wmsLayer = L.esri.imageMapLayer({
                    url: layerObj.url,
                    opacity: 0.5, //change this to be able to be set by the user
                    layers: [layerObj.layerNum]
                });
                layerObj.layer = wmsLayer;

                $rootScope.$emit('wmsFromURL', layerObj);
            }
            else if (layerObj.layerType == 'dynamic')
            {
                console.log('dynamic layer');
                wmsLayer = L.esri.dynamicMapLayer({
                    url: layerObj.url,
                    opacity: 0.5, //change this to be able to be set by the user
                    layers: [layerObj.layerNum]
                });
                layerObj.layer = wmsLayer;

                $rootScope.$emit('wmsFromURL', layerObj);
            }
            else
            {
                console.log('We might have a problem here.');
            }
        }
    }
})();