(function() {
    'use strict';

    angular
        .module('TractNotes')
        .controller('TrackEditController', TrackEditController);
    
    TrackEditController.$inject = ['$rootScope', '$scope', '$ionicHistory', 'locationService', 'trackViewService',];

    /* @ngInject */
    function TrackEditController($rootScope, $scope, $ionicHistory, locationService, trackViewService) {
        var vm = this;
        vm.title = 'TrackEditController';
        vm.currentTrack = null;
        vm.goBack = goBack;

        activate();

        ////////////////

        function activate() {
            vm.currentTrack = trackViewService.getTrackView();
        }

        function goBack() {
            $ionicHistory.goBack();
        }

        function editTrackInfo() {
            var trackName = document.getElementById('trackName').value;
            var trackDesc = document.getElementById('trackDesc').value;
            var trackAuthor = document.getElementById('trackAuthor').value;
            locationService.setCurrentTrack(vm.currentTrack);
            locationService.setTrackName(trackName);
            locationService.setTrackDesc(trackDesc);
            locationService.setTrackAuthor(trackAuthor);
            vm.currentTrack = locationService.getCurrentTrack();
            vm.goBack();
        }

        var saveButton = document.getElementById('saveButton');
        saveButton.addEventListener('click', editTrackInfo);

        console.log(vm.currentTrack.metadata.name);
    }

})();