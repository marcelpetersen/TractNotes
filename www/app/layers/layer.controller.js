(function() {
    'use strict';

    /**
     * @memberOf TractNotes
     * @ngdoc controller
     * @name LayerController
     * @param {service} $rootScope - Highest level scope in Angular
     * @param {service} layerControlService - Layer control service
     * @param {service} layerViewService - Layer view service
     * @param {service} ctecoDataService - CT ECO data service
     * @param {service} wmsService - WMS data service
     * @param {service} popupService - Popup creation service
     * @param {service} IonicClosePopupService - Ionic close popup service
     * @property {object} vm - ViewModel capture variable for *this*
     * @description Manages the Layers view and maintains lists of each type of layer
     */
    
    angular
        .module('TractNotes')
        .controller('LayerController', LayerController);

    LayerController.$inject = ['$rootScope', 'layerControlService', 'layerViewService', 'ctecoDataService', 'wmsService', 'popupService', 'IonicClosePopupService'];

    /* @ngInject */
    function LayerController($rootScope, layerControlService, layerViewService, ctecoDataService, wmsService, popupService, IonicClosePopupService) {
        var vm = this;
        vm.title = 'LayerController';

        vm.ctecoLayers = [];
        vm.orthoLayers = [];
        vm.wmsLayers = [];
        vm.showDelete = false;

        vm.sendLayer = sendLayer;
        vm.sendLayerDelete = sendLayerDelete;

        activate();

        ////////////////

        /**
         * Initialize ctecoLayers, orthoLayers, and wmsLayers from ctecoDataService and wmsService
         * @memberOf LayerController
         * @function activate
         */
        function activate() {
            vm.ctecoLayers = ctecoDataService.getActiveCTECOLayers();
            vm.orthoLayers = ctecoDataService.getActiveOrthoLayers();
            vm.wmsLayers = wmsService.getActiveWMSLayers();
        }

        /**
         * Sends a layer object to Layer View Service
         * @memberOf LayerController
         * @function sendLayer
         * @param {object} layer - The layer object to be sent to layer view service
         */
        function sendLayer(layer) {
            layerViewService.setLayerView(layer);
        }

        /**
         * Prompts user to confirm layer deletion and sends a layer object to CT ECO Data Service or WMS Data Service for deletion
         * @memberOf LayerController
         * @function sendLayerDelete
         * @param {object} layer - The layer object to be deleted
         */
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
                    else if (layer.layerType == 'wms')
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