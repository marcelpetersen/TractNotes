(function() {
    'use strict';

    angular
        .module('TractNotes')
        .controller('TracksController', TracksController);

    /* @ngInject */
    function TracksController($rootScope, locationService) {
        var vm = this;
        vm.title = 'TrackController';

        vm.tracks = [];
        vm.currentTrack = {};
        vm.setTrack = setTrack;
        activate();

        ////////////////

        function activate() {
        	vm.tracks = locationService.getTracks();
        }

        /** @fires $rootScope.TrackChange */
        function setTrack(track){
        	vm.currentTrack = track;
           $rootScope.$emit('TrackChange', track);
        }
    }

    TracksController.$inject = ['$rootScope', 'locationService'];
})();