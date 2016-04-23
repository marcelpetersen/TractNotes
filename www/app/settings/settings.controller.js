(function() {
    'use strict';

    angular
        .module('TractNotes')
        .controller('SettingsController', SettingsController);

    SettingsController.$inject = ['settingsService', '$rootScope', 'Drive'];

    /* @ngInject */
    function SettingsController(settingsService, $rootScope, Drive) {
        var vm = this;
        vm.title = 'SettingsController';

        vm.drawControl = null;
        vm.scaleControl = null;
        vm.searchControl = null;
        vm.zoomControl = null;
        vm.controls = [];

        vm.setControl = setControl;

        vm.login = login;
        vm.profilePic = "";
        vm.userName = "";
        vm.emailAddress = "";

        activate();

        ////////////////

        function activate() {
            vm.drawControl = settingsService.getDrawControl();
            vm.scaleControl = settingsService.getScaleControl();
            vm.searchControl = settingsService.getSearchControl();
            vm.zoomControl = settingsService.getZoomControl();
            vm.controls = [vm.drawControl, vm.scaleControl, vm.searchControl, vm.zoomControl];
        }

        function setControl(control) {
            if (control.checked) {
                $rootScope.$emit('AddControl', control);
            } else {
                $rootScope.$emit('RemoveControl', control);
            }
        }

        function login() {
            var client_id = "775512295394-hhg8etqdcmoc8i7r5a6m9d42d4ebu63d.apps.googleusercontent.com"; //web-app
            // var scopes = ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/drive.file', 'https://www.googleapis.com/auth/userinfo.email'];
            var scopes = ['https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/drive.file'];

            Drive.authenticate(client_id, scopes, {
                redirect_uri: 'http://localhost/callback/'
            })
                .then(function(response) { //authenticate
                        if (response) {
                            var token = response.access_token;

                            gapi.auth.setToken(response);
                            /** Obtain user data from id_token **/
                            // window.alert("hi");
                            // var id = JSON.stringify(response.id_token);
                            // var id = response.id_token;
                            // var parts = id.split('.');
                            // var headerBuf = window.atob(parts[0]); //decode from base64
                            // var bodyBuf = window.atob(parts[1]);
                            // var header = JSON.parse(headerBuf.toString());
                            // var body = JSON.parse(bodyBuf.toString());
                            // window.alert(headerBuf.toString());
                            // window.alert(bodyBuf.toString());
                            // vm.profilePic = body.picture;
                            // vm.userName = body.name;
                            // vm.emailAddress = body.email;
                            // $state.go('app.drive');
                        }
                    },
                    function(error) {
                        console.log("" + error);
                    });
        }
    }
})();