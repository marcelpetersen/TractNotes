(function() {
    'use strict';

    /**
     * @memberOf TractNotes
     * @ngdoc controller
     * @name SettingsController
     * @param {service} settingsService - Settings service
     * @param {service} $rootScope - Root application model in AngularJS
     * @param {service} Drive - Drive API service
     * @param {service} drawnItemsService - Drawn items service
     * @param {service} trackService - Track service
     * @property {object} vm - ViewModel capture variable for *this*
     * @description This controller manages the settings of the app.
     */
    
    angular
        .module('TractNotes')
        .controller('SettingsController', SettingsController);

    SettingsController.$inject = ['settingsService', '$rootScope', 'Drive', 'drawnItemsService', 'trackService'];

    /* @ngInject */
    function SettingsController(settingsService, $rootScope, Drive, drawnItemsService, trackService) {
        var vm = this;
        vm.title = 'SettingsController';

        vm.drawControl = null;
        vm.scaleControl = null;
        vm.searchControl = null;
        vm.zoomControl = null;
        vm.controls = [];
        vm.offlineMode = null;
        vm.diskUsage = 0;
        vm.drawStroke = true;
        vm.drawWeight = 'Normal';
        vm.trackColor = 'Blue';
        vm.drawColor = 'Red';
        vm.lineOpacity = 50;
        vm.drawOpacity = 20;

        vm.setControl = setControl;
        vm.changeMapStatus = changeMapStatus;
        vm.cacheCurrentBounds = cacheCurrentBounds;
        vm.emptyCurrentCache = emptyCurrentCache;

        vm.login = login;
        vm.logout = logout;
        vm.profilePic = "";
        vm.userName = "";
        vm.emailAddress = "";

        vm.updateUnits = updateUnits;
        vm.updateTrackColor = updateTrackColor;
        vm.updateDraw = updateDraw;

        activate();

        ////////////////

        /**
         * Initializes the controls, units, offline mode, and disk usage settings from settingsService and drawnItemsService.
         * @memberOf SettingsController
         * @function activate
         */
        function activate() {
            vm.drawControl = settingsService.getDrawControl();
            vm.scaleControl = settingsService.getScaleControl();
            vm.searchControl = settingsService.getSearchControl();
            vm.zoomControl = settingsService.getZoomControl();
            vm.units = drawnItemsService.getUnitsInfo().units;
            vm.offlineMode = settingsService.getOfflineMode();
            vm.controls = [vm.drawControl, vm.scaleControl, vm.searchControl, vm.zoomControl];

            vm.diskUsage = settingsService.getCurrentDiskUsage();
            vm.offlineMode = settingsService.getOfflineMode();

            getGoogleID();
        }

        /**
         * Set current control to add to map
         * @memberof SettingsController
         * @function setControl
         * @fires $rootScope#AddControl
         * @fires $rootScope#RemoveControl
         * @eventType emit
         */
        function setControl(control) {
            if (control.checked) {
                if (control.text == 'Zoom Slider Control' && vm.drawControl.checked) {
                    // checks to see if draw control has been added already; if so it removes it from the map,
                    // adds the zoom slider control, then adds the draw control back to the map
                    $rootScope.$emit('RemoveControl', vm.drawControl);
                    $rootScope.$emit('AddControl', control);
                    $rootScope.$emit('AddControl', vm.drawControl);
                } else {
                    $rootScope.$emit('AddControl', control);
                }
            } else {
                $rootScope.$emit('RemoveControl', control);
            }
        }

        /**
         * Toggle between offline and online mode
         * @memberof SettingsController
         * @function changeMapStatus
         * @fires $rootScope#ChangeMapStatus
         * @eventType emit
         */
        function changeMapStatus() {
            console.log(vm.offlineMode.checked)
            $rootScope.$emit('ChangeMapStatus', vm.offlineMode.checked);
        }

        /**
         * Send a cache event
         * @memberof SettingsController
         * @function cacheCurrentBounds
         * @fires $rootScope#CacheByBounds
         * @eventType emit
         */
        function cacheCurrentBounds() {
            console.log('cachecurrentbounds')
            $rootScope.$emit('CacheByBounds', true);
        }


        /**
         * Send an empty cache event
         * @memberof SettingsController
         * @function emptyCurrentCache
         * @fires $rootScope#EmptyCache
         * @eventType emit
         */
        function emptyCurrentCache() {
            $rootScope.$emit('EmptyCache', true);
        }

        function login() {
            Drive.authenticate()
                .then(function(response) { //authenticate
                        if (response) {
                            var token = response.access_token;
                            gapi.auth.setToken(response);
                            getGoogleID();
                        }
                    },
                    function(error) {
                        console.log("" + error);
                    });
        }

        function logout() {
            gapi.auth.setToken(null);
            vm.profilePic = "";
            vm.userName = "";
            vm.emailAddress = "";
            console.log("logged out");
        }

        function getGoogleID() {
            /** Obtain user data from id_token **/
            var auth_token = gapi.auth.getToken();
            if (auth_token) {
                var id = Drive.getID();
                var parts = id.split('.');
                var headerBuf = window.atob(parts[0]); //decode from base64
                var bodyBuf = window.atob(parts[1]);
                var header = JSON.parse(headerBuf.toString());
                var body = JSON.parse(bodyBuf.toString());
                vm.profilePic = body.picture;
                vm.userName = body.name;
                vm.emailAddress = body.email;
            }
        }

        /**
         * Updates the units used for measuring drawn items.
         * @memberOf SettingsController
         * @function updateUnits
         * @param {string} units - The units used for drawn item measurement
         */
        function updateUnits(units) {
            console.log(units);
            switch (units) {
                case 'Meters':
                    drawnItemsService.setUnitsInfo('Meters', 'm', '0', '1');
                    break;
                case 'Kilometers':
                    drawnItemsService.setUnitsInfo('Kilometers', 'km', '2', '1000');
                    break;
                case 'Miles':
                    drawnItemsService.setUnitsInfo('Miles', 'mi', '2', '1609.34');
                    break;
                default:
                    console.log('Error setting units');
            }
            var drawnItems = drawnItemsService.getDrawnItems();
            drawnItems.eachLayer(function(layer) {
                drawnItemsService.updatePopup(layer);
            });
        }

        function updateTrackColor(color) {
            // set the color of all current + future tracks to color parameter
            // @ TODO: does not work yet
            // try to make tracks feature group like with drawnItems
            console.log(color);
            var tracks = trackService.getTracks();
            var importedTracks = trackService.getImportedTracks();
            /*for (var track in tracks) {
                console.log(track);
                track.polyline.setStyle({color: color});
                console.log(track);
            }
            for (var importedTrack in importedTracks) {
                importedTrack.polyline.setStyle({color: color});
            }*/
        }

        /* not currently used, will be used if individual settings change options on click
        function updateDrawColor(color) {
            // set the color of all current + future drawn items to color parameter
            console.log(color);
            drawnItems.setStyle({color: color});
        }

        function updateDrawOpacity(opacity) {
            console.log(opacity);
            drawnItems.setStyle({fillOpacity: opacity/100});
        }*/

        // @TODO also set these in a factory and get them from the factory in activate so their values are preserved
        // this should also allow new shapes to be drawn with these settings, which currently isn't happening
        /**
         * Updates the settings of drawn items.
         * @memberOf SettingsController
         * @function updateDraw
         * @param  {boolean} stroke - Whether the stroke of drawn items is enabled or not
         * @param  {string} color - The color of drawn items
         * @param  {number} weight - The width of the stroke of drawn items
         * @param  {number} strokeOpacity - The opacity of the stroke of drawn items
         * @param  {number} fillOpacity - The opacity of the fill of drawn items
         */
        function updateDraw(stroke, color, weight, strokeOpacity, fillOpacity) {
            var drawnItems = drawnItemsService.getDrawnItems();
            console.log(drawnItems);
            var weightNum;
            switch (weight) {
                case 'Thin':
                    weightNum = 2;
                    break;
                case 'Normal':
                    weightNum = 5;
                    break;
                case 'Thick':
                    weightNum = 10;
                    break;
            }
            drawnItems.setStyle({
                stroke: stroke,
                color: color,
                weight: weightNum,
                opacity: strokeOpacity / 100,
                fillOpacity: fillOpacity / 100
            });
        }
    }
})();