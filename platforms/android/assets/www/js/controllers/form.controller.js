(function() {
    'use strict';

    angular
        .module('TractNotes')
        .controller('FormController', FormController);

    FormController.$inject = ['Drive'];

    /* @ngInject */
    function FormController(Drive) {
        var vm = this;
        vm.title = 'FormController';
        vm.openForm = openForm;
        vm.files = [];

        activate();

        ////////////////

        function activate() {
            var auth_token = gapi.auth.getToken();
            if(auth_token) {
                Drive.readForms().then(function(files) {
                    console.log("FileRead: success.");
                    vm.files = files;
                }, function() {
                  console.log("FileRead: error.");
                });
            }
            
        }

        function openForm(file) {
            Drive.openForm(file);
        }
    }
})();