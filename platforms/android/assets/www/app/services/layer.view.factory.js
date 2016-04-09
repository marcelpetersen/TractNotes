(function() {
    'use strict';

    angular
        .module('TractNotes')
        .factory('layerViewService', layerViewService);

    layerViewService.$inject = [];

    /* @ngInject */
    function layerViewService() {
        var displayedLayer = null;

        var service = {
            setLayerView: setLayerView,
            getLayerView: getLayerView
        };
        return service;

        ////////////////

        function setLayerView(layer) {
            displayedLayer = layer;
        }

        function getLayerView() {
            return displayedLayer;
        }
    }
})();