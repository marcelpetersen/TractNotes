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
        vm.dynamicNamePlaceholder = 'World Terrain';
        vm.imageNamePlaceholder = 'World/MODIS';
        vm.featureNamePlaceholder = 'Portland Neighborhoods';
        vm.tileNamePlaceholder = 'Thunderforest Landscape';
        vm.dynamicURLPlaceholder = 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/';
        vm.imageURLPlaceholder = 'http://sampleserver3.arcgisonline.com/ArcGIS/rest/services/World/MODIS/ImageServer';
        vm.featureURLPlaceholder = 'http://services.arcgis.com/rOo16HdIMeOBI4Mb/arcgis/rest/services/stops/FeatureServer/0/';
        vm.tileURLPlaceholder = 'http://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png';

        $scope.data = {};

        activate();

        ////////////////

        function activate() {
            $scope.data.layerType = 'dynamic';
            $scope.data.opacity = '0.5';
            vm.placeholderNameText = vm.dynamicNamePlaceholder;
            vm.placeholderURLText = vm.dynamicURLPlaceholder;
        }

        function back() {
            $ionicHistory.goBack();
        }

        function setWMSLayer(wmsInput) {
            wmsUrlService.sendLayerData(wmsInput);
        }

        function updatePlaceholder(layerType) {
            switch(layerType) {
                case 'dynamic':
                    vm.placeholderNameText = vm.dynamicNamePlaceholder;
                    vm.placeholderURLText = vm.dynamicURLPlaceholder;
                    break;
                case 'image':
                    vm.placeholderNameText = vm.imageNamePlaceholder;
                    vm.placeholderURLText = vm.imageURLPlaceholder;
                    break;
                case 'feature':
                    vm.placeholderNameText = vm.featureNamePlaceholder;
                    vm.placeholderURLText = vm.featureURLPlaceholder;
                    break;
                case 'tile':
                    vm.placeholderNameText = vm.tileNamePlaceholder;
                    vm.placeholderURLText = vm.tileURLPlaceholder;
                    break;
            }
        }
    }
})();