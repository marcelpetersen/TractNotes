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
            addToDrawnItems: addToDrawnItems,
            getDrawnItems: getDrawnItems
        };
        return service;

        ////////////////

        function addToDrawnItems(e) {
            drawnItems.addLayer(e);
        }

        function getDrawnItems() {
            return drawnItems;
        }
    }
})();