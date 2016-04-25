(function() {
    'use strict';

    angular
        .module('TractNotes')
        .controller('LayerController', LayerController);

    LayerController.$inject = ['$rootScope', 'layerControlService', 'layerViewService', 'ctecoDataService', 'wmsService', 'popupService', 'IonicClosePopupService'];

    /* @ngInject */
    function LayerController($rootScope, layerControlService, layerViewService, ctecoDataService, wmsService, popupService, IonicClosePopupService) {
        var vm = this;
        vm.title = 'TrackController';

        vm.ctecoLayers = [];
        vm.orthoLayers = [];
        vm.wmsLayers = [];
        vm.showDelete = false;

        vm.sendLayer = sendLayer;
        vm.sendLayerDelete = sendLayerDelete;

        activate();

        ////////////////

        function activate() {
            vm.ctecoLayers = ctecoDataService.getActiveCTECOLayers();
            vm.orthoLayers = ctecoDataService.getActiveOrthoLayers();
            vm.wmsLayers = wmsService.getActiveWMSLayers();
        }

        function sendLayer(layer) {
            layerViewService.setLayerView(layer);
        }

        function sendLayerDelete(layer) {
            console.log('Layer type: ' + layer.layerType);
            // confirmation popup for layer deletion
            var layerDeletePopup = popupService.getDeletePopup(layer, 'Layer');
            layerDeletePopup.then(function(res) {
                if(res) {
                    console.log('Layer deletion (' + layer.name + ') confirmed');
                    if (layer.layerType == 'cteco' || layer.layerType == 'ortho') 
                    {
                        ctecoDataService.deleteLayer(layer);
                    }
                    else if (layer.layerType == 'wmsTile' || layer.layerType == 'Dynamic Map Layer' ||
                        layer.layerType == 'ESRI Image Map Layer' || layer.layerType == 'ESRI Feature Layer' ||
                        layer.layerType == 'Tile Layer')
                    {
                        wmsService.deleteLayer(layer);
                    }
                    layer.checked = false; 
                }
                else {
                    console.log('Layer deletion (' + layer.name + ') cancelled');
                }
            });
            IonicClosePopupService.register(layerDeletePopup);
        }
    }
})();