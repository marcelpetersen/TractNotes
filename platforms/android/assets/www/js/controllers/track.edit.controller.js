(function() {
    'use strict';

    angular
        .module('TractNotes')
        .controller('TrackEditController', TrackEditController);

    TrackEditController.$inject = ['$ionicHistory', 'locationService', 'trackViewService', ];

    /* @ngInject */
    function TrackEditController($ionicHistory, locationService, trackViewService) {
        var vm = this;
        vm.title = 'TrackEditController';
        vm.currentTrack = null;
        vm.back = back;
        vm.update = update;
        vm.input = {};

        activate();      

        ////////////////

        function activate() {
            vm.currentTrack = trackViewService.getTrackView();
            vm.input = angular.copy(vm.currentTrack.metadata);
        }

        function back() {
            vm.input = angular.copy(trackViewService.getTrackView().metadata)
            $ionicHistory.goBack();
        }

        function update(input) {
            locationService.setCurrentTrack(vm.currentTrack);
            locationService.setTrackMetadata(input);
            vm.currentTrack = locationService.getCurrentTrack();
            vm.back();
        }
    }

})();