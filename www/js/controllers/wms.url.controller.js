(function() {
    'use strict';

    angular
        .module('TractNotes')
        .controller('wmsUrlController', wmsUrlController);

    wmsUrlController.$inject = ['wmsUrlService', '$scope', '$rootScope', '$ionicHistory'];

    /* @ngInject */
    function wmsUrlController(wmsUrlService, $scope, $rootScope, $ionicHistory) {
        var vm = this;
        vm.title = 'wmsUrlController';
        vm.setWMSLayer = setWMSLayer;
        vm.back = back;
        vm.placeholderURLText;
        vm.placeholderNameText;
        vm.updatePlaceholder = updatePlaceholder;
        // placeholder text for different layer types //
        vm.namePlaceholder = {
            dynamic: 'World Terrain',
            image: 'World/MODIS',
            feature: 'Portland Neighborhoods',
            tile: 'Thunderforest Landscape'
        };
        vm.urlPlaceholder = {
            dynamic: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/',
            image: 'http://sampleserver3.arcgisonline.com/ArcGIS/rest/services/World/MODIS/ImageServer',
            feature: 'http://services.arcgis.com/rOo16HdIMeOBI4Mb/arcgis/rest/services/stops/FeatureServer/0/',
            tile: 'http://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png'
        };

        activate();

        ////////////////

        function activate() {
            vm.input = {};
            vm.input.layerType = 'dynamic';
            vm.input.opacity = '0.5';
            vm.placeholderNameText = vm.namePlaceholder.dynamic;
            vm.placeholderURLText = vm.urlPlaceholder.dynamic;
        }

        function back() {
            $ionicHistory.goBack();
        }

        function setWMSLayer(wmsInput) {
            wmsUrlService.sendLayerData(wmsInput);
        }

        function updatePlaceholder(layerType) {
            switch (layerType) {
                case 'dynamic':
                    vm.placeholderNameText = vm.namePlaceholder.dynamic;
                    vm.placeholderURLText = vm.urlPlaceholder.dynamic;
                    break;
                case 'image':
                    vm.placeholderNameText = vm.namePlaceholder.image;
                    vm.placeholderURLText = vm.urlPlaceholder.image;
                    break;
                case 'feature':
                    vm.placeholderNameText = vm.namePlaceholder.feature;
                    vm.placeholderURLText = vm.urlPlaceholder.feature;
                    break;
                case 'tile':
                    vm.placeholderNameText = vm.namePlaceholder.tile;
                    vm.placeholderURLText = vm.urlPlaceholder.tile;
                    break;
            }
        }
    }
})();