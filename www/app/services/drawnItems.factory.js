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
            getDrawnItems: getDrawnItems,
            showPolygonArea: showPolygonArea,
            showPolygonAreaEdited: showPolygonAreaEdited
        };
        return service;

        ////////////////

        function addToDrawnItems(e) {
            drawnItems.addLayer(e);
        }

        function getDrawnItems() {
            return drawnItems;
        }

        /**
         * Show area/length of each layer on created.
         * @function
         * @author https://stackoverflow.com/questions/31221088/how-to-calculate-the-distance-of-a-polyline-in-leaflet-like-geojson-io
         * @param {object} layer
         */
        function showPolygonArea(e) {
            var type = e.layerType;
            var layer = e.layer;
            if (type === 'polyline') {
                addToDrawnItems(layer);
                var tempLatLng = e.layer._latlngs[0];
                var totalDistance = 0.00000;
                for (var i = 0; i < e.layer._latlngs.length; i++) {
                    var latlng = e.layer._latlngs[i];
                    totalDistance += tempLatLng.distanceTo(latlng);
                    tempLatLng = latlng;
                }
                e.layer.bindPopup((totalDistance).toFixed(2) + ' meters');
                e.layer.openPopup();
            } else if (type === 'circle') {
                addToDrawnItems(layer);
                var area = 0;
                var radius = e.layer.getRadius();
                area = (Math.PI) * (radius * radius);
                e.layer.bindPopup((area / 1000000).toFixed(2) + ' km<sup>2</sup>');
                e.layer.openPopup();
            } else if (type === 'polygon' || type === 'rectangle') {
                addToDrawnItems(layer);
                e.layer.bindPopup((LGeo.area(e.layer) / 1000000).toFixed(2) + ' km<sup>2</sup>');
                e.layer.openPopup();
            } else if (type === 'marker') {
                addToDrawnItems(layer);
                var newLoc = layer.getLatLng();
                var currentPosition = locationService.locate();
                currentPosition.then(function(val) {
                    var lat = val.position.coords.latitude;
                    var long = val.position.coords.longitude;
                    e.layer.bindPopup((newLoc.distanceTo([lat, long])).toFixed(2) + 'm from current position.');
                });
            } else {
                addToDrawnItems(layer);
            }
        }


        /**
         * Recalculate area/length of each layer on edit.
         * @function
         * @param {object} layer
         */
        function showPolygonAreaEdited(e) {
            e.layers.eachLayer(function(layer) {
                showPolygonArea({
                    layer: layer
                });
            });
        }
    }
})();