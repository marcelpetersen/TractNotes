(function() {
    'use strict';

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

        function getUnitsInfo() {
            return unitsInfo;
        }

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