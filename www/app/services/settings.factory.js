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
            sendDrawControl: sendDrawControl,
            sendScaleControl: sendScaleControl,
            sendSearchControl: sendSearchControl,
            sendZoomControl: sendZoomControl
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

        function sendDrawControl(checked) {
            drawControl.checked = checked;
            if (checked) {
                $rootScope.$emit('AddDraw', drawControl);
            } else {
                $rootScope.$emit('RemoveDraw', drawControl);
            }
        }

        function sendScaleControl(checked) {
            scaleControl.checked = checked;
            if (checked) {
                $rootScope.$emit('AddScale', scaleControl);
            } else {
                $rootScope.$emit('RemoveScale', scaleControl);
            }
        }

        function sendSearchControl(checked) {
            searchControl.checked = checked;
            if (checked) {
                $rootScope.$emit('AddSearch', searchControl);
            } else {
                $rootScope.$emit('RemoveSearch', searchControl);
            }
        }

        function sendZoomControl(checked) {
            zoomControl.checked = checked;
            if (checked) {
                $rootScope.$emit('AddZoom', zoomControl);
            } else {
                $rootScope.$emit('RemoveZoom', zoomControl);
            }
        }
    }
})();