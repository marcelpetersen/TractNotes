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
            getScale: getScale,
            getSearch: getSearch,
            setDraw: setDraw,
            setScale: setScale,
            setSearch: setSearch,
        };
        return service;

        ////////////////

        function getDraw() {
            return drawControl;
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