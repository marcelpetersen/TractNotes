(function() {
    'use strict';

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

        function activate() {
            vm.input.layerType = 'Dynamic Map Layer';
            vm.input.opacity = '50';
            vm.placeholderNameText = vm.namePlaceholder.dynamic;
            vm.placeholderURLText = vm.urlPlaceholder.dynamic;
        }

        function back() {
            $ionicHistory.goBack();
        }

        function setWMSLayer(wmsInput) {
            console.log('Layer type: ' + wmsInput.layerType);
            if (!wmsInput.name || !wmsInput.url) {
                var wmsAlertPopup = popupService.getAlertPopup(wmsInput.name, wmsInput.url);
            }
            else {
                console.log('Name: ' + wmsInput.name + ', URL: ' + wmsInput.url);
                wmsService.sendUrlLayerData(wmsInput);
            }
        }

        function updatePlaceholder(layerType) {
            switch (layerType) {
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