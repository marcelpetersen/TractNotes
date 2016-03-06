(function() {
    'use strict';

    angular
        .module('TractNotes')
        .factory('ctecoViewService', ctecoViewService);

    ctecoViewService.$inject = [];

    /* @ngInject */
    function ctecoViewService() {
        var displayedCategory = '';

        var service = {
            setCategory: setCategory,
            getCategory: getCategory,
            displayedCategory: displayedCategory
        };
        return service;

        ////////////////

        function setCategory(cat) {
            displayedCategory = cat;
        }

        function getCategory() {
            return displayedCategory;
        }
    }
})();