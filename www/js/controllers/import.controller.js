(function() {
    'use strict';

    angular
        .module('TractNotes')
        .controller('ImportController', ImportController);

    ImportController.$inject = ['$scope', '$rootScope', 'xmldataService', 'popupService', 'wmsUrlService'];

    /* @ngInject */
    function ImportController($scope, $rootScope, xmldataService, popupService, wmsUrlService) {
        var vm = this;
        vm.title = 'ImportController';
        vm.sendImportURL = sendImportURL;
        vm.urlPopup = urlPopup;
        vm.sendWMSLayer = sendWMSLayer;
        vm.data = {};

        activate();

        ////////////////

        function activate() {
            // set the 'Dynamic Map Layer' radio button to be checked by default
            vm.data.layerType = 'dynamic';
        }

        // @todo error handling
        // kml or gpx
        function sendImportURL(url){
        	xmldataService.setImportURL(url);
        	$rootScope.$emit('Import', url);
        }

        function urlPopup() {
            $scope.data = {};

            var urlPopup = popupService.getURLPopup($scope, vm);
            //IonicClosePopupService.register(urlPopup);

            urlPopup.then(function(metadata) 
            {
                if(metadata)
                {
                    wmsUrlService.setLayerData(metadata);
                    sendWMSLayer(metadata);
                }
            });
        }

        function sendWMSLayer(metadata) {
            var layer = null;
            if (metadata.layerType == 'feature')
            {
                console.log('feature layer');
                layer = L.esri.featureLayer({
                    url: metadata.url,
                    opacity: 0.5, //change this to be able to be set by the user
                    layers: [metadata.layerNum]
                });
                metadata.layer = layer;

                $rootScope.$emit('WMSFromURL', metadata);
            }
            else if (metadata.layerType == 'image')
            {
                console.log('image layer');
                layer = L.esri.imageMapLayer({
                    url: metadata.url,
                    opacity: 0.5, //change this to be able to be set by the user
                    layers: [metadata.layerNum]
                });
                metadata.layer = layer;

                $rootScope.$emit('WMSFromURL', metadata);
            }
            else if (metadata.layerType == 'dynamic')
            {
                console.log('dynamic layer');
                layer = L.esri.dynamicMapLayer({
                    url: metadata.url,
                    opacity: 0.5, //change this to be able to be set by the user
                    layers: [metadata.layerNum]
                });
                metadata.layer = layer;

                $rootScope.$emit('WMSFromURL', metadata);
            }
            else
            {
                console.log('We might have a problem here.');
            }
            
        }
    }
})();