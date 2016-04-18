(function() {
    'use strict';

    angular
        .module('TractNotes')
        .controller('LayerListController', LayerListController);

    LayerListController.$inject = ['$rootScope', 'layerControlService', 'layerViewService', 'ctecoDataService', 'wmsUrlService'];

    /* @ngInject */
    function LayerListController($rootScope, layerControlService, layerViewService, ctecoDataService, wmsUrlService) {
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
            else if (selectedLayer.layerType == 'wmsTile')
            {
                wmsUrlService.deleteLayer(selectedLayer);
            }
        }
    }
})();