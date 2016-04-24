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
        vm.getForms = getForms;
        vm.openForm = openForm;
        vm.files = [];

        activate();

        ////////////////

        function activate() {
            var auth_token = gapi.auth.getToken();
            if (auth_token) {
                getForms();
            }
            else {
                var client_id = "775512295394-hhg8etqdcmoc8i7r5a6m9d42d4ebu63d.apps.googleusercontent.com"; //web-app
                var scopes = ['https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/drive.file'];

                Drive.authenticate(client_id, scopes, {
                    redirect_uri: 'http://localhost/callback/'
                })
                    .then(function(response) { //authenticate
                            if (response) {
                                gapi.auth.setToken(response);
                                getForms();
                            }
                        },
                        function(error) {
                            console.log("" + error);
                        });
            }

        }

        function getForms() {
            Drive.readForms().then(function(files) {
                console.log("FileRead: success.");
                vm.files = files;
            }, function() {
                console.log("FileRead: error.");
            });
        }

        function openForm(file) {
            Drive.openForm(file);
        }
    }
})();