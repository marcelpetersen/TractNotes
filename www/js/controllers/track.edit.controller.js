(function() {
    'use strict';

    angular
        .module('TractNotes')
        .controller('TrackEditController', TrackEditController);

    TrackEditController.$inject = ['$ionicHistory', 'trackService', 'trackViewService', ];

    /* @ngInject */
    function TrackEditController($ionicHistory, trackService, trackViewService) {
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
            trackService.setCurrentTrack(vm.currentTrack);
            trackService.setTrackMetadata(input);
            vm.currentTrack = trackService.getCurrentTrack();
            vm.back();
        }
    }

})();