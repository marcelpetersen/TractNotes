(function() {
    'use strict';

    angular
        .module('TractNotes')
        .factory('controlService', controlService);

    controlService.$inject = ['$rootScope', 'drawnItemsService'];

    /* @ngInject */
    function controlService($rootScope, drawnItemsService) {
        var drawControl = {
            text: 'Draw Control',
            checked: false,
            position: 'topleft',
            control: new L.Control.Draw({
                draw: {
                    position: 'topleft'
                },
                edit: {
                    featureGroup: drawnItemsService.getDrawnItems()
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
            if (checked) {
                $rootScope.$emit('AddDraw', drawControl);
            } else {
                $rootScope.$emit('RemoveDraw', drawControl);
            }
        }

        function setScaleControl(checked) {
            scaleControl.checked = checked;
            if (checked) {
                $rootScope.$emit('AddScale', scaleControl);
            } else {
                $rootScope.$emit('RemoveScale', scaleControl);
            }
        }

        function setSearchControl(checked) {
            searchControl.checked = checked;
            if (checked) {
                $rootScope.$emit('AddSearch', searchControl);
            } else {
                $rootScope.$emit('RemoveSearch', searchControl);
            }
        }
    }
})();