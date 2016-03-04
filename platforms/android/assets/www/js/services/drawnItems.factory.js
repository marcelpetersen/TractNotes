(function() {
    'use strict';

    angular
        .module('TractNotes')
        .factory('drawnItemsService', drawnItemsService);

    drawnItemsService.$inject = [];

    /* @ngInject */
    function drawnItemsService() {
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

        function addToDrawnItems(e) {
            drawnItems.addLayer(e);
        }
    }
})();