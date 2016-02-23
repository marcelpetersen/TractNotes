angular.module('TractNotes').controller('ImportCtrl', function($scope, IonicClosePopupService, $ionicPopup) {
    $scope.url = '';

    $scope.import = function() {
        $scope.data = {};

        var importPopup = $ionicPopup.show({
            title: 'Import File',
            subTitle: '(GPX, KML or WMS layer)',
            scope: $scope,
            cssClass: 'popup-import',
            buttons: [{
                text: '<b>From Drive</b>', // @TODO : drive icon
                type: 'button-positive',
                //@TODO : picker screen file -> variable, download file/open or whatever
            }, {
                text: '<b>From URL</b>', // @TODO : WMS icon
                type: 'button-positive',
                onTap: function(e) {
                    $scope.url();
                    // @TODO run function on scope.url here
                }
            }]
        });
        IonicClosePopupService.register(importPopup);

        importPopup.then(function(res) {
            console.log('Tapped!', res);
        });

        
    },

    $scope.url = function() {
        $scope.data = {};

        var urlPopup = $ionicPopup.show({
            title: 'Enter URL',
            template: '<input type="url" ng-model="data.url">', // @TODO: if not valid url, output error message, @TODO make field more visible
            scope: $scope,
            cssClass: 'popup-import',
            buttons: [{
                text: '<b>Submit</b>',
                type: 'button-positive',
                onTap: function(e) {
                    return $scope.data.url;
                }
            }]
        });

        IonicClosePopupService.register(urlPopup);

        urlPopup.then(function(res) {
            console.log('Tapped!', res);
        });
    }
});