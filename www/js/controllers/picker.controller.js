(function() {
    'use strict';

    angular
        .module('TractNotes')
        .controller('PickerController', PickerController);

    /* @ngInject */
    function PickerController($scope, $lkGoogleSettings, $cordovaOauth, $http) {
        var vm = this;
        vm.file = '';
        vm.title = 'PickerController';
        
        /*
        $scope.googleLogin = function() {
            $cordovaOauth.google("775512295394-hhg8etqdcmoc8i7r5a6m9d42d4ebu63d.apps.googleusercontent.com  ", ["https://www.googleapis.com/auth/urlshortener", "https://www.googleapis.com/auth/userinfo.email",
                "https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/plus.me"
            ]).
            then(function(result) {
                console.log("google login success");
                var accessToken;
                //$location.url('/scan');
                console.log(JSON.stringify(result));
                accessToken = JSON.stringify(result);
                console.log(result.access_token);
                console.log(typeof(result.access_token));

                //getting profile info of the user
                $http({
                    method: "GET",
                    url: "https://www.googleapis.com/plus/v1/people/me?access_token=" + result.access_token
                }).
                success(function(response) {
                    console.log(response);
                    var param = {
                        provider: 'google',
                        google: {
                            uid: response["id"],
                            provider: 'google',
                            first_name: response["name"]["givenName"],
                            last_name: response["name"]["familyName"],
                            email: response.emails[0]["value"],
                            image: response.image.url
                        }
                    };
                    console.log(param);
                }, function(error) {
                    console.log(error);
                });

            }, function(error) {
                console.log(error);
            });
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
        */
    }

    PickerController.$inject = ['$scope', 'lkGoogleSettings', '$cordovaOauth', '$http'];
})();