(function() {
    'use strict';

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