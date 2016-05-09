(function() {
    'use strict';

    /**
     * @memberOf TractNotes
     * @ngdoc controller
     * @name WMSListController
     * @param {service} ctecoDataService - CT ECO data service
     * @param {service} ctecoViewService - CT ECO view service
     * @param {service} wmsService - WMS data service
     * @property {object} vm - ViewModel capture variable for *this*
     * @description This controller manages the list of included WMS layers (CT ECO layers, orthophoto layers, and other WMS layers).
     */
    
    angular
        .module('TractNotes')
        .controller('WMSListController', WMSListController);

    WMSListController.$inject = ['ctecoDataService', 'ctecoViewService', 'wmsService'];

    /* @ngInject */
    function WMSListController(ctecoDataService, ctecoViewService, wmsService) {
        var vm = this;
        vm.title = 'WMSListController';

        vm.sendCategory = sendCategory;
        vm.setOrthoLayer = setOrthoLayer;
        vm.toggleDefaultWMSLayer = toggleDefaultWMSLayer;
        vm.toggleGroup = toggleGroup;
        vm.isGroupShown = isGroupShown;

        activate();

        ////////////////

        /**
         * Initializes ctecoCategories, orthoLayers, and defaultWMSLayers from ctecoDataService and wmsService.
         * @memberOf WMSListController
         * @function activate
         */
        function activate() {
            vm.ctecoCategories = ctecoDataService.getCtecoCategories();
            vm.orthoLayers = ctecoDataService.getOrthoLayers();
            vm.defaultWMSLayers = wmsService.getDefaultWMSLayers();
        }

        /**
         * Sets the current CT ECO category and renders its view via ctecoViewService.
         * @memberOf WMSListController
         * @function sendCategory
         * @param {object} cat - CT ECO category to be rendered
         */
        function sendCategory(cat) {
            ctecoViewService.setCategory(cat);
        }

        /**
         * Adds or removes an orthophoto layer via ctecoDataService.
         * @memberOf WMSListController
         * @function setOrthoLayer
         * @param {object} orthoLayer - Orthophoto layer to be added or removed
         */
        function setOrthoLayer(orthoLayer) {
            ctecoDataService.sendOrthoLayer(orthoLayer);
        }

        /**
         * Adds or removes an included other WMS layer via wmsService.
         * @memberOf WMSListController
         * @function toggleDefaultWMSLayer
         * @param {object} defaultWMS - WMS layer to be added or removed
         */
        function toggleDefaultWMSLayer(defaultWMS) {
            wmsService.sendDefaultLayerData(defaultWMS);
        }

        /**
         * Deselects group if already selected. Otherwise, selects the group.
         * @memberOf WMSListController
         * @function toggleGroup
         * @param {list} group - List of layers
         */
        function toggleGroup(group) {
            if (vm.isGroupShown(group)) {
                vm.shownGroup = null;
            } else {
                vm.shownGroup = group;
            }
        };

        /**
         * Returns whether the group is shown or not.
         * @memberOf WMSListController
         * @function isGroupShown
         * @param {list} group - List of layers
         * @return {boolean} Whether group is shown or not 
         */
        function isGroupShown(group) {
            return vm.shownGroup === group;
        };
    }
})();