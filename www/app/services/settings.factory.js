(function() {
    'use strict';

    angular
        .module('TractNotes')
        .factory('settingsService', settingsService);

    settingsService.$inject = ['$rootScope', 'drawnItemsService'];

    /* @ngInject */
    function settingsService($rootScope, drawnItemsService) {
        var drawControl = {
            text: 'Draw Control',
            checked: false,
            position: 'topleft',
            control: new L.Control.Draw({
                draw: {
                    position: 'topleft'
                },
                edit: {
                    featureGroup: drawnItemsService.getDrawnItems() // better way of doing this?
                }
            })
        };

        var scaleControl = {
            text: 'Scale Control',
            checked: false,
            position: 'bottomleft',
            control: L.control.scale()
        };

        var searchControl = {
            text: 'Search Control',
            checked: false,
            position: 'topright',
            control: L.Control.geocoder()
        };

        var zoomControl = {
            text: 'Zoom Control',
            checked: false,
            position: 'topleft',
            control: L.control.zoomslider()
        };

        var service = {
            getDrawControl: getDrawControl,
            getScaleControl: getScaleControl,
            getSearchControl: getSearchControl,
            getZoomControl: getZoomControl,
        };
        return service;

        ////////////////

        function getDrawControl() {
            return drawControl;
        }

        function getScaleControl() {
            return scaleControl;
        }

        function getSearchControl() {
            return searchControl;
        }

        function getZoomControl() {
            return zoomControl;
        }
    }
})();