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

        function setDraw(checked) {
            drawControl.checked = checked;
        }

        function setScale(checked) {
            scaleControl.checked = checked;
        }

        function setSearch(checked) {
            searchControl.checked = checked;
        }
    }
})();