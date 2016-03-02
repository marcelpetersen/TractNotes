(function() {
    'use strict';

    angular
        .module('TractNotes')
        .controller('MenuController', MenuController);

    MenuController.$inject = [];

    /* @ngInject */
    function MenuController() {
        var vm = this;
        vm.title = 'Controller';

        activate();

        ////////////////

        function activate() {
        }
    }
})();