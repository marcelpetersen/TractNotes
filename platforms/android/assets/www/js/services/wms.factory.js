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

        function sendLayerData(wmsInput) {
            var featureLayer, imageLayer, dynamicLayer, tileLayer = null;
            console.log(wmsInput);
            if (wmsInput.layerType == 'feature') {
                console.log('feature layer');
                featureLayer = L.esri.featureLayer({
                    url: wmsInput.url,
                    opacity: wmsInput.opacity
                });
                wmsInput.layer = featureLayer;

                $rootScope.$emit('wmsFromURL', wmsInput);
            } else if (wmsInput.layerType == 'image') {
                console.log('image layer');
                imageLayer = L.esri.imageMapLayer({
                    url: wmsInput.url,
                    opacity: wmsInput.opacity
                });
                wmsInput.layer = imageLayer;

                $rootScope.$emit('wmsFromURL', wmsInput);
            } else if (wmsInput.layerType == 'dynamic') {
                console.log('dynamic layer');
                dynamicLayer = L.esri.dynamicMapLayer({
                    url: wmsInput.url,
                    opacity: wmsInput.opacity
                });
                wmsInput.layer = dynamicLayer;

                $rootScope.$emit('wmsFromURL', wmsInput);
            } else if (wmsInput.layerType == 'tile') {
                console.log('tile layer');
                tileLayer = L.tileLayer(wmsInput.url, {opacity: wmsInput.opacity});
                wmsInput.layer = tileLayer;

                $rootScope.$emit('wmsFromURL', wmsInput);
            } else {
                console.log('We might have a problem here.');
            }
        }
    }
})();