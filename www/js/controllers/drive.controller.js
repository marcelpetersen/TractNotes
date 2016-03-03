(function() {
    'use strict';

    angular
        .module('TractNotes')
        .controller('DriveController', DriveController);

    DriveController.$inject = ['$scope', 'Drive', '$state'];

    /* @ngInject */
    function DriveController($scope, Drive, $state) {

        $scope.loginByGoogle = function() {

            $scope.files = [];

            $scope.readFiles = function() {
                Drive.readFiles().then(function(files) {
                    $scope.files = files;
                    console.log("FileRead: success.");
                }, function() {
                    console.log("FileRead: error.");
                });
            };
            $scope.readFiles();
        }
        var vm = this;
        vm.title = 'Controller';

        activate();

        ////////////////

        function activate() {}
    }
})();