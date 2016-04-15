(function() {
    'use strict';

    angular
        .module('TractNotes')
        .controller('LayerListController', LayerListController);

    LayerListController.$inject = ['$rootScope', 'layerControlService', 'trackService', 'trackViewService', 'layerViewService', 'ctecoDataService', 'wmsUrlService'];

    /* @ngInject */
    function LayerListController($rootScope, layerControlService, trackService, trackViewService, layerViewService, ctecoDataService, wmsUrlService) {
        var vm = this;
        vm.title = 'TrackController';

// @todo rename variables

        vm.tracks = [];
        vm.ctecoLayers = [];
        vm.orthoLayers = [];
        vm.wmsLayers = [];
        vm.showDelete = false;

        vm.sendTrack = sendTrack;
        vm.sendTrackDelete = sendTrackDelete;
        vm.sendLayer = sendLayer;
        vm.sendLayerDelete = sendLayerDelete;

        activate();

        ////////////////

        function activate() {
            vm.tracks = trackService.getTracks();
            vm.ctecoLayers = ctecoDataService.getActiveCTECOLayers();
            vm.orthoLayers = ctecoDataService.getActiveOrthoLayers();
            vm.wmsLayers = wmsUrlService.getActiveWMSLayers();
        }

        function sendTrack(track) {
            trackViewService.setTrackView(track);
        }

        function sendLayer(layer) {
            layerViewService.setLayerView(layer);
        }

        // @todo refactor to modify layer control in service, remove listener in map controller
        function sendTrackDelete(track) {
            trackService.deleteTrack(track);
            $rootScope.$emit("RemoveTrack", track)
            //utilityService.removeLayerInGroup(vm.layercontrol, vm.currentTrack.track);
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