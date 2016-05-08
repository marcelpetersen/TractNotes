(function() {
    'use strict';

    /**
     * @memberof TractNotes
     * @ngdoc factory
     * @name settingsService
     * @param {service} $rootScope top level scope in Angular
     * @param {service} drawnItemsService drawn items layer factory
     * @property {int} currentDiskUsage Current disk usage in bytes by cached tiles.
     * @property {object} offlineMode offlineMode Toggle status.
     * @property {object} drawControl Leaflet control for shape creation and measurement.
     * @property {object} scaleControl Leaflet control for displaying scale level.
     * @property {object} searchControl Leaflet control for geocoding.
     * @property {object} zoomControl Leaflet control for zoom slider.
     * @desc The settingsService provides accessor functions for available settings and stores the settings in local storage.
     */

    angular
        .module('TractNotes')
        .factory('settingsService', settingsService);

    settingsService.$inject = ['$rootScope', 'drawnItemsService'];

    function settingsService($rootScope, drawnItemsService) {
        var currentDiskUsage = 0;
        var offlineMode = {
            checked: false
        };

        /**
         * @memberof settingsService
         * @namespace
         * @property {string} text Textual representation of control
         * @property {boolean} checked Toggle status
         * @property {string} position Position on map of control
         * @property {object} control Initialized L.Control.Draw()
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
         * @namespace
         * @property {string} text - Textual representation of control
         * @property {boolean} checked - Toggle status
         * @property {string} position - Position on map of control
         * @property {object} control - Initialized L.Control.scale()
         */
        var scaleControl = {
            text: 'Scale Control',
            checked: false,
            position: 'bottomleft',
            control: L.control.scale()
        };

        /**
         * @memberof settingsService
         * @namespace
         * @property {string} text - Textual representation of control
         * @property {boolean} checked - Toggle status
         * @property {string} position - Position on map of control
         * @property {object} control - Initialized L.Control.geocoder()
         */
        var searchControl = {
            text: 'Search Control',
            checked: false,
            position: 'topright',
            control: L.Control.geocoder()
        };

        /**
         * @memberof settingsService
         * @namespace
         * @property {string} text - Textual representation of control
         * @property {boolean} checked - Toggle status
         * @property {string} position - Position on map of control
         * @property {object} control - Initialized L.Control.zoomslider()
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
         * Get draw control object
         * @memberof settingsService
         * @function getDrawControl
         * @returns {L.control} Draw control initialized to the top left of map
         */
        function getDrawControl() {
            return drawControl;
        }

        /**
         * Get scale control object
         * @memberof settingsService
         * @function getScaleControl
         * @returns {L.control} Scale control initialized to the bottom left of map
         */
        function getScaleControl() {
            return scaleControl;
        }

        /**
         * Get search control object
         * @memberof settingsService
         * @function getSearchControl
         * @returns {L.control} Geocoder control initialized to the top right of map
         */
        function getSearchControl() {
            return searchControl;
        }

        /**
         * Get zoom slider object
         * @memberof settingsService
         * @function getZoomControl
         * @returns {L.control} Zoom slider control initialized to the top left of map
         */
        function getZoomControl() {
            return zoomControl;
        }

        /**
         * Get current disk usage by cached tiles
         * @memberof settingsService
         * @function getCurrentDiskUsage
         * @returns {int} Number of bytes used by cached tiles
         */
        function getCurrentDiskUsage() {
            return currentDiskUsage;
        }

        /**
         * Get the current map status
         * @memberof settingsService
         * @function getOfflineMode
         * @returns {boolean} offlineMode status
         */
        function getOfflineMode() {
            return offlineMode;
        }

        /**
         * Set current disk usage
         * @memberof settingsService
         * @function setCurrentDiskUsage
         * @param {int} n disk usage
         */
        function setCurrentDiskUsage(n) {
            currentDiskUsage = n;
        }
    }
})();