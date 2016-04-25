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
        vm.offlineMode = null;
        vm.diskUsage = 0;

        vm.setControl = setControl;
        vm.changeMapStatus = changeMapStatus;
        vm.cacheCurrentBounds = cacheCurrentBounds;
        vm.emptyCurrentCache = emptyCurrentCache;

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
            vm.offlineMode = settingsService.getOfflineMode();
            vm.controls = [vm.drawControl, vm.scaleControl, vm.searchControl, vm.zoomControl];

            vm.diskUsage = settingsService.getCurrentDiskUsage();
            vm.offlineMode = settingsService.getOfflineMode();
        }

        function setControl(control) {
            if (control.checked) {
                if (control.text == 'Zoom Slider Control' && vm.drawControl.checked) {
                    // checks to see if draw control has been added already; if so it removes it from the map,
                    // adds the zoom slider control, then adds the draw control back to the map
                    $rootScope.$emit('RemoveControl', vm.drawControl);
                    $rootScope.$emit('AddControl', control);
                    $rootScope.$emit('AddControl', vm.drawControl);
                }
                else {
                    $rootScope.$emit('AddControl', control);
                }
            } else {
                $rootScope.$emit('RemoveControl', control);
            }
        }

        function changeMapStatus(){
            console.log(vm.offlineMode.checked)
            $rootScope.$emit('ChangeMapStatus', vm.offlineMode.checked);
        }

        function cacheCurrentBounds() {
            console.log('cachecurrentbounds')
             $rootScope.$emit('CacheByBounds', true);
        }

        function emptyCurrentCache(){
            $rootScope.$emit('EmptyCache', true);
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