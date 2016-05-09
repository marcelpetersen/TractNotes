(function() {
    'use strict';

    /**
     * @memberof TractNotes
     * @ngdoc factory
     * @name layerViewService
     * @property {object} displayedLayer - Layer to render view from
     * @desc This factory assists in dynamically rendering individual layer views.
     */
    
    angular
        .module('TractNotes')
        .factory('layerViewService', layerViewService);

    layerViewService.$inject = [];

//@todo rename

    /* @ngInject */
    function layerViewService() {
        var displayedLayer = null;

        var service = {
            setLayerView: setLayerView,
            getLayerView: getLayerView
        };
        return service;

        ////////////////

        /**
         * Sets layer to be rendered.
         * @memberOf layerViewService
         * @function setLayerView
         * @param {object} layer - Layer to render
         */
        function setLayerView(layer) {
            displayedLayer = layer;
        }

        /**
         * Gets currently displayed layer.
         * @memberOf layerViewService
         * @function getLayerView
         * @returns {object} Displayed layer
         */
        function getLayerView() {
            return displayedLayer;
        }
    }
})();