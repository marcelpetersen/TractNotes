(function() {
    'use strict';

    angular
        .module('TractNotes')
        .controller('TrackListController', TrackListController);

    TrackListController.$inject = ['$rootScope', 'layerControlService', 'trackService', 'trackViewService'];

    /* @ngInject */
    function TrackListController($rootScope, layerControlService, trackService, trackViewService) {
        var vm = this;
        vm.title = 'TrackController';
        vm.tracks = [];
        vm.showDelete = false;

        vm.sendTrack = sendTrack;
        vm.sendTrackDelete = sendTrackDelete;

        activate();

        ////////////////

        function activate() {
            vm.tracks = trackService.getTracks();
        }

        function sendTrack(track) {
            trackViewService.setTrackView(track);
        }

        // @todo refactor to modify layer control in service, remove listener in map controller
        function sendTrackDelete(track) {
            trackService.deleteTrack(track);
            $rootScope.$emit("RemoveTrack", track)
            //utilityService.removeLayerInGroup(vm.layercontrol, vm.currentTrack.track);
        }
    }
})();