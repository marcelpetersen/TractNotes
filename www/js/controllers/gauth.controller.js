(function() {
    'use strict';

    angular
        .module('TractNotes')
        .controller('GAuthController', GAuthController);

    /* @ngInject */
    function GAuthController($scope, Drive, $state) {
        $scope.loginByGoogle = function() {

            var auth_token = gapi.auth.getToken();
            if(auth_token) {
                $state.go('app.drive');
            }
            
            else  {
            var client_id = "775512295394-hhg8etqdcmoc8i7r5a6m9d42d4ebu63d.apps.googleusercontent.com"; //web-app
            var scopes = ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/drive.file', 'https://www.googleapis.com/auth/userinfo.email'];
            Drive.authenticate(client_id, scopes, {
                redirect_uri: 'http://localhost/callback/'
                })
                .then(function(response) { //authenticate
                        if (response) {
                            var token = response.access_token;
                            gapi.auth.setToken(response);
                            $state.go('app.drive');
                        }
                    },
                    function(error) {
                        console.log("" + error);
                    });
            }
        };

        var vm = this;
        vm.title = 'Controller';

        activate();

        ////////////////

        function activate() {}
    }

    GAuthController.$inject = ['$scope', 'Drive', '$state'];
})();