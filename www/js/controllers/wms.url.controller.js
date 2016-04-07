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
        vm.placeholderText;
        vm.updatePlaceholder = updatePlaceholder;
        // placeholder text for different layer types //
        vm.dynamicPlaceholder = 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/';
        vm.imagePlaceholder = 'http://sampleserver3.arcgisonline.com/ArcGIS/rest/services/World/MODIS/ImageServer';
        vm.featurePlaceholder = 'http://services.arcgis.com/rOo16HdIMeOBI4Mb/arcgis/rest/services/stops/FeatureServer/0/';
        vm.tilePlaceholder = 'http://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png';

        $scope.data = {};

        activate();

        ////////////////

        function activate() {
            $scope.data.layerType = 'dynamic';
            $scope.data.opacity = '0.5';
            vm.placeholderText = vm.dynamicPlaceholder;
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
                    vm.placeholderText = vm.dynamicPlaceholder;
                    break;
                case 'image':
                    vm.placeholderText = vm.imagePlaceholder;
                    break;
                case 'feature':
                    vm.placeholderText = vm.featurePlaceholder;
                    break;
                case 'tile':
                    vm.placeholderText = vm.tilePlaceholder;
                    break;
            }
        }
    }
})();