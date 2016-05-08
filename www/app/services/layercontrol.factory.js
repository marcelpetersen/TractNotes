(function() {
    'use strict';

    /**
     * @memberof TractNotes
     * @ngdoc factory
     * @name layerControlService
     * @desc Remove a layer from a group in layer control by id
     */

    angular
        .module('TractNotes')
        .factory('layerControlService', layerControlService);

    layerControlService.$inject = [];

    /* @ngInject */
    function layerControlService() {
        var service = {
            removeLayerInGroup: removeLayerInGroup
        };
        return service;

        ////////////////

        /**
         * Remove a layer from a group in layer control
         * @memberof trackViewService
         * @function setTrackView
         * @param {object} layercontrol Map layer control
         * @param {object} layer Layer to remove
         */
        function removeLayerInGroup(layercontrol, layer) {
        	console.log(layercontrol)
        	console.log(layer)
            var id = L.Util.stamp(layer);
            console.log(id)
            delete layercontrol._layers[id];
            layercontrol._map.removeLayer(layer);
            layercontrol._update();
            console.log(layercontrol)
        }
    }
})();