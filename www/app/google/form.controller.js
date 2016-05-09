(function() {
    'use strict';

    /**
     * @memberof TractNotes
     * @ngdoc controller
     * @name FormController
     * @param {service} Drive Drive API service
     * @property {list} files - This list stores all currently queried Drive files.
     * @desc The FormController handles opening forms from Google Drive.
     */

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

        /**
         * Authenticate if not already signed in, then initalize file list with files obtained from Google Drive.
         * @memberof FormController
         * @function activate
         */
        function activate() {
            var auth_token = gapi.auth.getToken();
            if (auth_token) {
                getForms();
            }
            else {
                Drive.authenticate()
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

        /**
         * Obtain all forms from Google Drive and save to file list.
         * @memberof FormController
         * @function getForms
         */
        function getForms() {
            Drive.readForms().then(function(files) {
                console.log("FileRead: success.");
                vm.files = files;
            }, function() {
                console.log("FileRead: error.");
            });
        }

        /**
         * Open a Google Form on click.
         * @memberof FormController
         * @function openForm
         * @param {Object} file
         */
        function openForm(file) {
            Drive.openForm(file);
        }
    }
})();