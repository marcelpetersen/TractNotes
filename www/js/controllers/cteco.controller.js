(function() {
    'use strict';

    angular
        .module('TractNotes')
        .controller('ctecoController', ctecoController);

    /* @ngInject */
    function ctecoController($scope, ctecoService) {
        var vm = this;
        vm.title = 'ctecoController';

        ////////////////
        // loops through the layers of ctecoCategories and prints value of 'checked'
        function loopThroughLayers(ctecoCategories) {
            for (var category in ctecoCategories) 
            {
                if (ctecoCategories.hasOwnProperty(category))
                {
                    var categoryObj = ctecoCategories[category];
                    for (var layer in categoryObj.layers)
                    {
                        console.log(categoryObj.layers[layer].checked);
                        $scope.$watch('categoryObj.layers[layer].checked', function(newValue, oldValue) {
                            if (newValue !== oldValue) {
                                ctecoService.setLayer(categoryObj.layers[layer], newValue);
                                var checked = ctecoService.getLayer(categoryObj.layers[layer]).checked;
                                $rootScope.$emit(categoryObj.layers[layer], checked);
                            }
                        });
                    }
                }   
            }
        }

        $scope.$watch('vm.drawControl.checked', function(newValue, oldValue) {
            if (newValue !== oldValue) {
                controlService.setDrawControl(newValue);
                var checked = controlService.getDrawControl().checked;
                $rootScope.$emit('Draw', checked);
            }
        });

        function activate() {
            vm.ctecoCategories = ctecoService.getCtecoCategories();
            vm.orthoLayers = ctecoService.getOrthoLayers();
            loopThroughLayers(vm.ctecoCategories);
        }
        
        activate();
    }

    ctecoController.$inject = ['$scope', 'ctecoService'];
})();