(function() {
    'use strict';

    angular
        .module('TractNotes')
        .factory('gisdataService', gisdataService);

    factory.$inject = [];

    /* @ngInject */
    function gisdataService() {
        var service = {
            func: func
        };
        return service;

        ////////////////

        function func() {
        }
    }
})();