angular.module('TractNotes').controller('PickerCtrl', ['$scope', 'lkGoogleSettings', function($scope, $lkGoogleSettings) {

        $scope.files = [];
        $scope.languages = [{
            code: 'en',
            name: 'English'
        }, ];

        // Check for the current language depending on lkGoogleSettings.locale
        $scope.initialize = function() {
            angular.forEach($scope.languages, function(language, index) {
                if (lkGoogleSettings.locale === language.code) {
                    $scope.selectedLocale = $scope.languages[index];
                }
            });
        };

        // Callback triggered after Picker is shown
        $scope.onLoaded = function() {
            console.log('Google Picker loaded!');
        }

        // Callback triggered after selecting files
        $scope.onPicked = function(docs) {
            angular.forEach(docs, function(file, index) {
                $scope.files.push(file);
                console.log('file pushed');
            });
        }

        // Callback triggered after clicking on cancel
        $scope.onCancel = function() {
            console.log('Google picker close/cancel!');
        }

        // Define the locale to use
        $scope.changeLocale = function(locale) {
            lkGoogleSettings.locale = locale.code;
        };
    }
]);