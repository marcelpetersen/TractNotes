(function() {
    'use strict';

    /**
     * @memberOf TractNotes
     * @ngdoc controller
     * @name WMSUrlController
     * @param {service} wmsService - WMS data service
     * @param {service} $scope - Application model in AngularJS
     * @param {service} $rootScope - Root application model in AngularJS
     * @param {service} $ionicHistory - Ionic view history service
     * @param {service} popupService - Popup creation service
     * @property {object} vm - ViewModel capture variable for *this*
     * @description This controller manages view for adding a WMS layer from a URL.
     */
    
    angular
        .module('TractNotes')
        .controller('WMSUrlController', WMSUrlController);

    WMSUrlController.$inject = ['wmsService', '$scope', '$rootScope', '$ionicHistory', 'popupService'];

    /* @ngInject */
    function WMSUrlController(wmsService, $scope, $rootScope, $ionicHistory, popupService) {
        var vm = this;
        vm.title = 'WMSUrlController';

        vm.back = back;
        vm.setWMSLayer = setWMSLayer;
        vm.updatePlaceholder = updatePlaceholder;

        vm.input = {};
        vm.placeholderNameText = '';
        vm.placeholderURLText = '';
        vm.namePlaceholder = {
            dynamic: 'World Terrain',
            image: 'World/MODIS',
            feature: 'Portland Neighborhoods',
            tile: 'Thunderforest Landscape'
        };
        vm.urlPlaceholder = {
            dynamic: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/',
            image: 'http://sampleserver3.arcgisonline.com/ArcGIS/rest/services/World/MODIS/ImageServer',
            feature: 'http://services.arcgis.com/rOo16HdIMeOBI4Mb/ArcGIS/rest/services/Neighborhoods_pdx/FeatureServer/0',
            tile: 'http://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png'
        };

        activate();

        ////////////////

        /**
         * Initializes the layer type and opacity, as well as the placeholder text for the form's fields.
         * @memberOf WMSUrlController
         * @function activate
         */
        function activate() {
            vm.input.wmsLayerType = 'Dynamic Map Layer';
            vm.input.layerType = 'wms';
            vm.input.opacity = '50';
            vm.placeholderNameText = vm.namePlaceholder.dynamic;
            vm.placeholderURLText = vm.urlPlaceholder.dynamic;
        }

        /**
         * Goes back one state from the history.
         * @memberOf WMSUrlController
         * @function back
         */
        function back() {
            $ionicHistory.goBack();
        }

        /**
         * Adds a WMS layer via wmsService.
         * @memberOf WMSUrlController
         * @function setWMSLayer
         * @param {object} wmsInput - The layer name, type, opacity, and URL of the WMS layer
         */
        function setWMSLayer(wmsInput) {
            console.log('WMS layer type: ' + wmsInput.wmsLayerType);
            console.log('Control layer type: ' + wmsInput.layerType);
            if (!wmsInput.name || !wmsInput.url) {
                var wmsAlertPopup = popupService.getAlertPopup(wmsInput.name, wmsInput.url);
            }
            else {
                console.log('Name: ' + wmsInput.name + ', URL: ' + wmsInput.url);
                wmsService.sendUrlLayerData(wmsInput);
            }
        }

        /**
         * Updates the placeholder text in the form based on the selected WMS layer type.
         * @memberOf WMSUrlController
         * @function updatePlaceholder
         * @param {string} wmsLayerType - The currently selected WMS layer type from the drop down
         */
        function updatePlaceholder(wmsLayerType) {
            switch (wmsLayerType) {
                case 'Dynamic Map Layer':
                    vm.placeholderNameText = vm.namePlaceholder.dynamic;
                    vm.placeholderURLText = vm.urlPlaceholder.dynamic;
                    break;
                case 'ESRI Image Map Layer':
                    vm.placeholderNameText = vm.namePlaceholder.image;
                    vm.placeholderURLText = vm.urlPlaceholder.image;
                    break;
                case 'ESRI Feature Layer':
                    vm.placeholderNameText = vm.namePlaceholder.feature;
                    vm.placeholderURLText = vm.urlPlaceholder.feature;
                    break;
                case 'Tile Layer':
                    vm.placeholderNameText = vm.namePlaceholder.tile;
                    vm.placeholderURLText = vm.urlPlaceholder.tile;
                    break;
            }
        }
    }
})();