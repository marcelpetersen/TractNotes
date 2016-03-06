(function() {
    'use strict';

    angular
        .module('TractNotes')
        .factory('controlService', controlService);

    controlService.$inject = [];

    /* @ngInject */
    function controlService() {

        var drawControl = {
            text: 'Draw Control',
            checked: false,
            position: 'topleft'
        };

        var scaleControl = {
            text: 'Scale Control',
            checked: false,
            position: 'bottomleft'
        };

        var searchControl = {
            text: 'Search Control',
            checked: false,
            position: 'topright'
        };

        var service = {
            getDrawControl: getDrawControl,
            getScaleControl: getScaleControl,
            getSearchControl: getSearchControl,
            setDrawControl: setDrawControl,
            setScaleControl: setScaleControl,
            setSearchControl: setSearchControl,
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

        function setDrawControl(checked) {
            drawControl.checked = checked;
        }

        function setScaleControl(checked) {
            scaleControl.checked = checked;
        }

        function setSearchControl(checked) {
            searchControl.checked = checked;
        }
    }
})();