(function() {
    'use strict';

    /**
     * @memberof TractNotes
     * @ngdoc factory
     * @param {service} $rootScope highest level scope in Angular
     * @param {service} drawnItemsService
     * @description
     *   Stores and provides accessor functions for available settings
     */

    angular
        .module('TractNotes')
        .factory('settingsService', settingsService);

    settingsService.$inject = ['$rootScope', 'drawnItemsService'];

    /* @ngInject */
    function settingsService($rootScope, drawnItemsService) {
        var currentDiskUsage = 0;
        var offlineMode = {checked: false};

        /**
         * @memberof settingsService
         * @member {object}
         * @property {drawControl} Draw control object
         * @property {drawControl.text} Textual representation of variable name
         * @property {drawControl.position} Position on map of draw control
         * @property {drawControl.control} Initialized L.Control.Draw()
         */
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

        /**
         * @memberof settingsService
         * @member {object}
         * @property {scaleControl} Scale control object
         * @property {scaleControl.text} Textual representation of variable name
         * @property {scaleControl.position} Position on map of scale control
         * @property {scaleControl.control} Initialized L.Control.scale()
         */
        var scaleControl = {
            text: 'Scale Control',
            checked: false,
            position: 'bottomleft',
            control: L.control.scale()
        };

        /**
         * @memberof settingsService
         * @member {object}
         * @property {searchControl} Search control object
         * @property {searchControl.text} Textual representation of variable name
         * @property {searchControl.position} Position on map of search control
         * @property {searchControl.control} Initialized L.Control.search()
         */
        var searchControl = {
            text: 'Search Control',
            checked: false,
            position: 'topright',
            control: L.Control.geocoder()
        };

        /**
         * @memberof settingsService
         * @member {object}
         * @property {zoomControl} Zoom Slider control object
         * @property {zoomControl.text} Textual representation of variable name
         * @property {zoomControl.position} Position on map of zoomslider control
         * @property {zoomControl.control} Initialized L.Control.zoomslider()
         */
        var zoomControl = {
            text: 'Zoom Slider Control',
            checked: false,
            position: 'topleft',
            control: L.control.zoomslider()
        };

        var service = {
            getDrawControl: getDrawControl,
            getScaleControl: getScaleControl,
            getSearchControl: getSearchControl,
            getZoomControl: getZoomControl,
            getCurrentDiskUsage: getCurrentDiskUsage,
            setCurrentDiskUsage: setCurrentDiskUsage,
             getOfflineMode: getOfflineMode
        };
        return service;

        ////////////////

        /**
         * Accessor for draw control object
         * @memberof settingsService
         * @returns {L.control} Draw control initialized to the top left of map
         */
        function getDrawControl() {
            return drawControl;
        }

        /**
         * Accessor for scale control object
         * @memberof settingsService
         * @returns {L.control} Scale control initialized to the bottom left of map
         */
        function getScaleControl() {
            return scaleControl;
        }

        /**
         * Accessor for search control object
         * @memberof settingsService
         * @returns {L.control} Geocoder control initialized to the top right of map
         */
        function getSearchControl() {
            return searchControl;
        }

        /**
         * Accessor for zoom slider object
         * @memberof settingsService
         * @returns {L.control} Zoom slider control initialized to the top left of map
         */
        function getZoomControl() {
            return zoomControl;
        }

        function getCurrentDiskUsage() {
            return currentDiskUsage;
        }

        function getOfflineMode() {
            return offlineMode;
        }

        function setCurrentDiskUsage(n) {
            currentDiskUsage = n;
        }
    }
})();