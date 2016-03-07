(function() {
    'use strict';

    angular
        .module('TractNotes')
        .controller('ImportController', ImportController);

    ImportController.$inject = ['$rootScope', 'xmldataService'];

    /* @ngInject */
    function ImportController($rootScope, xmldataService) {
        var vm = this;
        vm.title = 'ImportController';
        vm.sendImportURL = sendImportURL;

        activate();

        ////////////////

        function activate() {}

        // @todo error handling
        function sendImportURL(url) {
            xmldataService.setImportURL(url);
        }
    }
})();