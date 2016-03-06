(function() {
    'use strict';

    angular
        .module('TractNotes')
        .controller('ctecoLayersController', ctecoLayersController);

    /* @ngInject */
    function ctecoLayersController($rootScope, ctecoService) {
        var vm = this;

        vm.title;
        vm.categories = [];
        
        activate();

        ////////////////

        function activate() {
        	vm.categories = ctecoService.getCtecoCategories();
            vm.title = "test";
        }

        /** @fires $rootScope.TrackChange */
        // function setTrack(track){
        // 	vm.currentTrack = track;
        //    $rootScope.$emit('TrackChange', track);
        // }
    }

    ctecoLayersController.$inject = ['$rootScope', 'ctecoService'];
})();