(function() {
    'use strict';

    angular
        .module('TractNotes')
        .controller('DriveController', DriveController);

    DriveController.$inject = ['$scope', 'Drive', '$state'];

    /* @ngInject */
    function DriveController($scope, Drive, $state) {

        var vm = this;
        vm.title = 'DriveController';
        vm.files = [];

        function getFiles() {

                Drive.readFiles().then(function(files) {
                    vm.files = files;
                    console.log("FileRead: success.");
                }, function() {
                    console.log("FileRead: error.");
                });
        }

        activate();

        ////////////////

        function activate() {
            getFiles();
        }
    }
})();