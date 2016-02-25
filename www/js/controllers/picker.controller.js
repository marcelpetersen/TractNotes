(function() {
    'use strict';

    angular
        .module('TractNotes')
        .controller('PickerController', PickerController);

    /* @ngInject */
    function PickerController($scope, $lkGoogleSettings) {
        var vm = this;
        vm.file = '';
        vm.title = 'PickerController';

        activate();

        ////////////////

        function activate() {
        }

        $scope.files = [];

        // Callback triggered after Picker is shown
        $scope.onLoaded = function() {
            console.log('Google Picker loaded!');
        };

        // Callback triggered after selecting files
        $scope.onPicked = function(docs) {
            angular.forEach(docs, function(file, index) {
                $scope.files.push(file);
                console.log('file pushed');
            });
        };

        // Callback triggered after clicking on cancel
        $scope.onCancel = function() {
            console.log('Google picker close/cancel!');
        };

        // Define the locale to use
        $scope.changeLocale = function(locale) {
            lkGoogleSettings.locale = locale.code;
        };
    }

    PickerController.$inject = ['$scope', 'lkGoogleSettings'];
})();