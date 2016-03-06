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

        function activate() {
        }

        // @todo error handling
        // kml or gpx
        function sendImportURL(url){
        	xmldataService.setImportURL(url);
        	$rootScope.$emit('Import', url);
        }
    }
})();