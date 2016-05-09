(function() {
    'use strict';

    /**
     * @memberof TractNotes
     * @ngdoc factory
     * @name drawnItemsService
     * @param {service} locationService Geolocation and track creation factory
     * @property {L.FeatureGroup} drawnItems Feature layer containing all items created with draw control.
     * @property {object} unitsInfo Current units, abbreviation and scale factor
     * @desc This factory provides functions for maintaining the feature layer associated with draw control.
     */

    angular
        .module('TractNotes')
        .factory('drawnItemsService', drawnItemsService);

    drawnItemsService.$inject = ['locationService'];

    /* @ngInject */
    function drawnItemsService(locationService) {
        var drawnItems = new L.FeatureGroup();
        var unitsInfo = {
            units: 'Kilometers',
            unitsAbbrv: 'km',
            decimalPlaces: 2,
            // conversion factor from meters to new unit
            scaleFactor: 1000
        };

        var service = {
            addToDrawnItems: addToDrawnItems,
            getDrawnItems: getDrawnItems,
            showPolygonArea: showPolygonArea,
            showPolygonAreaEdited: showPolygonAreaEdited,
            getUnitsInfo: getUnitsInfo,
            setUnitsInfo: setUnitsInfo,
            updatePopup: updatePopup
        };
        return service;

        ////////////////

        /**
         * Add a feature to drawnItems layer
         * @memberof drawnItemsService
         * @function addToDrawnItems
         * @param {object} e GeoJSON feature
         */
        function addToDrawnItems(e) {
            drawnItems.addLayer(e);
        }

        /**
         * Get drawnItems layer
         * @memberof drawnItemsService
         * @function getDrawnItems
         * @returns {L.FeatureGroup} drawnItems
         */
        function getDrawnItems() {
            return drawnItems;
        }

        /**
         * Show area or length of each layer on create.
         * @function showPolygonArea
         * @param {object} e GeoJSON feature
         */
        function showPolygonArea(e) {
            var type = e.layerType;
            var layer = e.layer;
            layer.layerType = type;
            if (type === 'polyline') {
                addToDrawnItems(layer);
                var tempLatLng = e.layer._latlngs[0];
                var totalDistance = 0.00000;
                for (var i = 0; i < e.layer._latlngs.length; i++) {
                    var latlng = e.layer._latlngs[i];
                    totalDistance += tempLatLng.distanceTo(latlng);
                    tempLatLng = latlng;
                }
                e.layer.bindPopup(((totalDistance) / unitsInfo.scaleFactor).toFixed(unitsInfo.decimalPlaces) + ' ' + unitsInfo.unitsAbbrv);
                e.layer.openPopup();
            } else if (type === 'circle') {
                addToDrawnItems(layer);
                var area = 0;
                var radius = e.layer.getRadius();
                area = (Math.PI) * (radius * radius);
                e.layer.bindPopup((area / Math.pow(unitsInfo.scaleFactor, 2)).toFixed(unitsInfo.decimalPlaces) + ' ' + unitsInfo.unitsAbbrv + '<sup>2</sup>');
                e.layer.openPopup();
            } else if (type === 'polygon' || type === 'rectangle') {
                addToDrawnItems(layer);
                e.layer.bindPopup((LGeo.area(e.layer) / Math.pow(unitsInfo.scaleFactor, 2)).toFixed(unitsInfo.decimalPlaces) + ' ' + unitsInfo.unitsAbbrv + '<sup>2</sup>');
                e.layer.openPopup();
            } else if (type === 'marker') {
                addToDrawnItems(layer);
                var newLoc = layer.getLatLng();
                var currentPosition = locationService.locate();
                currentPosition.then(function(val) {
                    var lat = val.position.coords.latitude;
                    var long = val.position.coords.longitude;
                    e.layer.bindPopup(((newLoc.distanceTo([lat, long])) / unitsInfo.scaleFactor).toFixed(unitsInfo.decimalPlaces) + unitsInfo.unitsAbbrv + ' from current position.');
                });
            } else {
                addToDrawnItems(layer);
            }
        }

        /**
         * Recalculate area or length of each layer on edit.
         * @function showPolygonAreaEdited
         * @param {object} e GeoJSON feature
         */
        function showPolygonAreaEdited(e) {
            e.layers.eachLayer(function(layer) {
                showPolygonArea({
                    layer: layer
                });
            });
        }

        /**
         * Get unitsInfo
         * @function getUnitsInfo
         * @returns {object} unitsInfo
         */
        function getUnitsInfo() {
            return unitsInfo;
        }

        /**
         * Set unitsInfo units, abbreviation, decimal places, and scale factor
         * @function setUnitsInfo
         * @param {string} units Textual representation of units
         * @param {string} unitsAbbrv Textual abbreviation of units
         * @param {number} decimalPlaces Number of decimal places to display
         * @param {number} scaleFactor Conversion factor to use with L.Geodesy area values
         */
        function setUnitsInfo(units, unitsAbbrv, decimalPlaces, scaleFactor) {
            unitsInfo.units = units;
            unitsInfo.unitsAbbrv = unitsAbbrv;
            unitsInfo.decimalPlaces = decimalPlaces;
            unitsInfo.scaleFactor = scaleFactor;
            console.log(unitsInfo);
        }

        // update the popup info of a drawn item
        // might be able to update the popup without recalculating everything, but this may be useful for updating popup info for distance from marker
        function updatePopup(layer) {
            var type = layer.layerType;
            if (type === 'polyline') {
                var tempLatLng = layer._latlngs[0];
                var totalDistance = 0.00000;
                for (var i = 0; i < layer._latlngs.length; i++) {
                    var latlng = layer._latlngs[i];
                    totalDistance += tempLatLng.distanceTo(latlng);
                    tempLatLng = latlng;
                }
                layer.bindPopup(((totalDistance) / unitsInfo.scaleFactor).toFixed(unitsInfo.decimalPlaces) + ' ' + unitsInfo.unitsAbbrv);
            } else if (type === 'circle') {
                var area = 0;
                var radius = layer.getRadius();
                area = (Math.PI) * (radius * radius);
                layer.bindPopup((area / Math.pow(unitsInfo.scaleFactor, 2)).toFixed(unitsInfo.decimalPlaces) + ' ' + unitsInfo.unitsAbbrv + '<sup>2</sup>');
            } else if (type === 'polygon' || type === 'rectangle') {
                addToDrawnItems(layer);
                layer.bindPopup((LGeo.area(layer) / Math.pow(unitsInfo.scaleFactor, 2)).toFixed(unitsInfo.decimalPlaces) + ' ' + unitsInfo.unitsAbbrv + '<sup>2</sup>');
            } else if (type === 'marker') {
                var newLoc = layer.getLatLng();
                var currentPosition = locationService.locate();
                currentPosition.then(function(val) {
                    var lat = val.position.coords.latitude;
                    var long = val.position.coords.longitude;
                    layer.bindPopup(((newLoc.distanceTo([lat, long])) / unitsInfo.scaleFactor).toFixed(unitsInfo.decimalPlaces) + unitsInfo.unitsAbbrv + ' from current position.');
                });
            }
        }
    }
})();