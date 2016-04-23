(function() {
    'use strict';

    angular
        .module('TractNotes')
        .controller('LayerController', LayerController);

    LayerController.$inject = ['$rootScope', 'layerControlService', 'layerViewService', 'ctecoDataService', 'wmsUrlService'];

    /* @ngInject */
    function LayerController($rootScope, layerControlService, layerViewService, ctecoDataService, wmsUrlService) {
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
            vm.wmsLayers = wmsUrlService.getActiveWMSLayers();
        }

        function sendLayer(layer) {
            layerViewService.setLayerView(layer);
        }

        function sendLayerDelete(selectedLayer) {
            console.log('Layer type: ' + selectedLayer.layerType);
            if (selectedLayer.layerType == 'cteco' || selectedLayer.layerType == 'ortho') 
            {
                ctecoDataService.deleteLayer(selectedLayer);
            }
            else if (selectedLayer.layerType == 'wmsTile' || selectedLayer.layerType == 'Dynamic Map Layer' ||
                selectedLayer.layerType == 'ESRI Image Map Layer' || selectedLayer.layerType == 'ESRI Feature Layer' ||
                selectedLayer.layerType == 'Tile Layer')
            {
                wmsUrlService.deleteLayer(selectedLayer);
            }
            selectedLayer.checked = false;
        }
    }
})();