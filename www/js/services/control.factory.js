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
            active: false,
            position: 'topleft'
        };

        var measureControl = {
            text: 'Measure Control',
            checked: false,
            active: false,
            position: 'topleft',
        };

        var scaleControl = {
            text: 'Scale Control',
            checked: false,
            active: false,
            position: 'bottomleft',
        };

        var searchControl = {
            text: 'Search Control',
            checked: false,
            active: false,
            position: 'topright',
        };

        var service = {
            getDraw: getDraw,
            getMeasure: getMeasure,
            getScale: getScale,
            getSearch: getSearch,
            setDraw: setDraw,
            setMeasure: setMeasure,
            setScale: setScale,
            setSearch: setSearch,
        };
        return service;

        ////////////////

        function getDraw() {
            return drawControl;
        }

        function getMeasure() {
            return measureControl;
        }

        function getScale() {
            return scaleControl;
        }

        function getSearch() {
            return searchControl;
        }

        function setDraw(state, checked) {
            drawControl.active = state;
            drawControl.checked = checked;
        }


        function setMeasure(state, checked) {
            measureControl.active = state;
            measureControl.checked = checked;
        }

        function setScale(state, checked) {
            scaleControl.active = state;
            scaleControl.checked = checked;
        }

        function setSearch(state, checked) {
            searchControl.active = state;
            searchControl.checked = checked;
        }
    }
})();