(function() {
    'use strict';

    angular
        .module('TractNotes')
        .controller('ImportController', ImportController);

    ImportController.$inject = ['$scope', '$rootScope', 'xmldataService', 'popupService', 'wmsUrlService', 'Drive', '$state'];

    /* @ngInject */
    function ImportController($scope, $rootScope, xmldataService, popupService, wmsUrlService, Drive, $state) {
        var vm = this;
        vm.title = 'ImportController';
        vm.sendImportURL = sendImportURL;
        vm.urlPopup = urlPopup;
        vm.sendWMSLayer = sendWMSLayer;
        vm.importButton = importButton;
        vm.data = {};
        vm.files = [];
        vm.type = [];
        vm.source = [];
        vm.selectedSource = null;
        vm.selectedType = null;

        activate();

        ////////////////

        function activate() {
            // set the 'Dynamic Map Layer' radio button to be checked by default
            vm.data.layerType = 'dynamic';
            vm.type = [
              { text: "GPX", value: "gpx" },
              { text: "KML", value: "kml" }
            ];

            vm.source = [
              { text: "Google Drive", value: "drive" },
              { text: "Device", value: "device" }
              // { text: "URL", value: "url" }
            ];
        }

        // @todo error handling
        // kml or gpx
        function importButton(url) {
            if(vm.selectedSource == "drive") {
                var auth_token = gapi.auth.getToken();
                if(auth_token) {
                    importFromDrive();
                }
            }
            if(vm.selectedSource == "url") {
                sendImportURL(url);
            }
        }

        function importFromDrive() {
            Drive.readFilesOfType(vm.selectedType).then(function(files) {
                console.log("FileRead: success.");
                Drive.setFileList(files);
                $state.go('app.drive');
            }, function() {
                console.log("FileRead: error.");
            });
            
            //Google Picker API 
            // Drive.showPicker().then(function(id) {
            //     vm.id = id;
            //     console.log("FileSelection: success.");
            //     }, function() {
            //         console.log("FileSelection: error.");
            //         });
        }

        function sendImportURL(url) {
            xmldataService.setImportURL(url);
            $rootScope.$emit('Import', url);
        }

        function urlPopup() {
            $scope.data = {};

            var urlPopup = popupService.getURLPopup($scope, vm);
            //IonicClosePopupService.register(urlPopup);

            urlPopup.then(function(metadata) {
                if (metadata) {
                    wmsUrlService.setLayerData(metadata);
                    sendWMSLayer(metadata);
                }
            });
        }

        function sendWMSLayer(metadata) {
            var layer = null;
            if (metadata.layerType == 'feature') {
                console.log('feature layer');
                layer = L.esri.featureLayer({
                    url: metadata.url,
                    opacity: 0.5, //change this to be able to be set by the user
                    layers: [metadata.layerNum]
                });
                metadata.layer = layer;

                $rootScope.$emit('WMSFromURL', metadata);
            } else if (metadata.layerType == 'image') {
                console.log('image layer');
                layer = L.esri.imageMapLayer({
                    url: metadata.url,
                    opacity: 0.5, //change this to be able to be set by the user
                    layers: [metadata.layerNum]
                });
                metadata.layer = layer;

                $rootScope.$emit('WMSFromURL', metadata);
            } else if (metadata.layerType == 'dynamic') {
                console.log('dynamic layer');
                layer = L.esri.dynamicMapLayer({
                    url: metadata.url,
                    opacity: 0.5, //change this to be able to be set by the user
                    layers: [metadata.layerNum]
                });
                metadata.layer = layer;

                $rootScope.$emit('WMSFromURL', metadata);
            } else {
                console.log('We might have a problem here.');
            }

        }
    }
})();