(function() {
    'use strict';

    /**
     * @memberof TractNotes
     * @ngdoc factory
     * @name ctecoViewService
     * @property {object} displayedCategory - CT ECO category to render view from
     * @desc This factory assists in dynamically rendering individual CT ECO category views.
     */

    angular
        .module('TractNotes')
        .factory('ctecoViewService', ctecoViewService);

    ctecoViewService.$inject = [];

    /* @ngInject */
    function ctecoViewService() {
        var displayedCategory = '';

        var service = {
            setCategory: setCategory,
            getCategory: getCategory
        };
        return service;

        ////////////////

        /**
         * Sets CT ECO category to be rendered.
         * @memberof ctecoViewService
         * @function setCategory
         * @param {object} cat - CT ECO category to render
         */
        function setCategory(cat) {
            displayedCategory = cat;
        }

        /**
         * Gets currently displayed CT ECO category.
         * @memberof ctecoViewService
         * @function getCategory
         * @returns {object} Displayed CT ECO category
         */
        function getCategory() {
            return displayedCategory;
        }
    }
})();