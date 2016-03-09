(function() {
    'use strict';

    angular
        .module('TractNotes')
        .factory('wmsUrlService', wmsUrlService);

    wmsUrlService.$inject = [];

    /* @ngInject */
    function wmsUrlService() {
        var layerInfo = {};

        var service = {
            setLayerData: setLayerData
        };
        return service;

        ////////////////

        function setLayerData(metadata) {
            layerInfo = metadata;
            console.log(metadata);
        }
    }
})();