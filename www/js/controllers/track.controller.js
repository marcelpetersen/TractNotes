(function() {
    'use strict';

    angular
        .module('TractNotes')
        .controller('TrackController', TrackController);

    /* @ngInject */
    function TrackController($rootScope, $scope, locationService, popupService) {
        var vm = this;
        vm.title = 'TrackController';

        vm.currentTrack = {};
        vm.trackPopup = trackPopup;

        /** @listens $rootScope.TrackChange */
        $rootScope.$on('TrackChange', function(event, data) {
            vm.currentTrack = data;
            console.log(data)
        });

        activate();

        ////////////////

        function activate() {}

         function trackPopup() {
            $scope.data = {};

            var trackPopup = popupService.getTrackPopup($scope, vm);
            //IonicClosePopupService.register(trackPopup);

            trackPopup.then(function(res) {
                //set current track
                // error here
                locationService.setCurrentTrack(vm.currentTrack.name);
                locationService.setTrackMetadata(res);
                vm.currentTrack = locationService.getCurrentTrack();
            });
        }
    }

    TrackController.$inject = ['$rootScope', '$scope', 'locationService', 'popupService'];
})();