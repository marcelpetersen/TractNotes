(function() {
    'use strict';

    /**
     * @memberof TractNotes
     * @ngdoc factory
     * @name settingsService
     * @param {service} $rootScope top level scope in Angular
     * @param {service} drawnItemsService drawn items layer factory
     * @desc The settingsService provides accessor functions for available settings and stores the settings in local storage.
     */

    angular
        .module('TractNotes')
        .factory('settingsService', settingsService);

    settingsService.$inject = ['$rootScope', 'drawnItemsService'];

    /* @ngInject */
    function settingsService($rootScope, drawnItemsService) {
        var currentDiskUsage = 0;
        var offlineMode = {
            checked: false
        };

        /**
         * @memberof settingsService
         * @name drawControl
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
         * @name scaleControl
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
         * @name searchControl
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
         * @name zoomControl
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
         * @method getDrawControl
         * @returns {L.control} Draw control initialized to the top left of map
         */
        function getDrawControl() {
            return drawControl;
        }

        /**
         * Accessor for scale control object
         * @memberof settingsService
         * @method getScaleControl
         * @returns {L.control} Scale control initialized to the bottom left of map
         */
        function getScaleControl() {
            return scaleControl;
        }

        /**
         * Accessor for search control object
         * @memberof settingsService
         * @method getSearchControl
         * @returns {L.control} Geocoder control initialized to the top right of map
         */
        function getSearchControl() {
            return searchControl;
        }

        /**
         * Accessor for zoom slider object
         * @memberof settingsService
         * @method getZoomControl
         * @returns {L.control} Zoom slider control initialized to the top left of map
         */
        function getZoomControl() {
            return zoomControl;
        }

        /**
         * Accessor for current disk usage by cached tiles
         * @memberof settingsService
         * @method getCurrentDiskUsage
         * @returns {int} Number of bytes used by cached tiles
         */
        function getCurrentDiskUsage() {
            return currentDiskUsage;
        }

        /**
         * Accessor for offline mode
         * @memberof settingsService
         * @method getOfflineMode
         * @returns {boolean} offlineMode status
         */
        function getOfflineMode() {
            return offlineMode;
        }

        /**
         * Set current disk usage
         * @memberof settingsService
         * @method setCurrentDiskUsage
         * @param {int} n disk usage
         */
        function setCurrentDiskUsage(n) {
            currentDiskUsage = n;
        }
    }
})();