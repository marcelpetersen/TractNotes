(function() {
    'use strict';

    angular
        .module('TractNotes')
        .factory('drawnItems', drawnItems);

    drawnItems.$inject = [];

    /* @ngInject */
    function drawnItems() {
    	var drawnItems = new L.FeatureGroup();

        var service = {
            getDrawnItems: getDrawnItems,
            addToDrawnItems: addToDrawnItems
        };
        return service;

        ////////////////

        function getDrawnItems() {
        	return drawnItems;
        }
        function addToDrawnItems(e){
        	drawnItems.addLayer(e);
        }
    }
})();