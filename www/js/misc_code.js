//@ controller:
        function xmldata(layer) {
            var layerResult = xmldataService.getxmldata(layer);
            layerResult.then(function(val) {
                $scope.$apply(function() {
                    var finalLayer = val.on('ready', function() {
                        vm.map.fitBounds(val.getBounds());
                        val.eachLayer(function(layer) {
                            var content;
                            var name = layer.feature.properties.name;
                            var desc = layer.feature.properties.desc;

                            if (name !== null) {
                                content = '<h2>' + name + '</h2>';
                                if (desc !== null) {
                                    content += '<p>' + desc + '</p';
                                    layer.bindPopup(content);
                                } else {
                                    layer.bindPopup(content);
                                }
                            } else if (desc !== null) {
                                content = '<h2>' + desc + '</h2>';
                                layer.bindPopup(content);
                            }
                        });
                    });
                    finalLayer.addTo(vm.map);
                    vm.layercontrol.addOverlay(finalLayer, layer);
                });

            });

        }

        function cteco(layer) {
            var cteco = ctecoService.getcteco(layer);
            vm.layercontrol.addOverlay(cteco.layer, cteco.name);
        }

//@ controller:
        function gisPopup() {
            $scope.data = {};
            var gisPopup = popupService.getGISPopup($scope, vm);
            IonicClosePopupService.register(gisPopup);

            gisPopup.then(function(res) {
                vm.xmldata(res);
                console.log('Tapped!', res);
            });
        }

        function wmsPopup() {
            $scope.data = {};
            var wmsPopup = popupService.getWMSPopup($scope, vm);
            IonicClosePopupService.register(wmsPopup);

            wmsPopup.then(function(res) {
                console.log('Tapped!', res);
            });
        }

        function arcgisPopup() {
            $scope.data = {};
            var arcgisPopup = popupService.getArcGISPopup($scope, vm);
            IonicClosePopupService.register(arcgisPopup);

            arcgisPopup.then(function(res) {
                console.log('Tapped!', res);
            });
        }

        function msPopup() {
            $scope.data = {};
            var msPopup = popupService.getMSPopup($scope, vm);
            IonicClosePopupService.register(msPopup);

            msPopup.then(function(res) {
                console.log('Tapped!', res);
            });
        }

//@ factory:
       function getGISPopup(scope, vm) {
            return $ionicPopup.show({
                title: 'Add a GPX or KML layer to the map',
                template: 'URL<input type="url" ng-model="data.url">', // @TODO: if not valid url, output error message
                scope: scope,
                cssClass: 'popup-import',
                buttons: [{
                    text: 'Google Drive',
                    type: 'button-positive',
                    //@TODO : picker screen file -> variable
                    //@TODO : fill screen automatically with url
                }, {
                    text: 'Submit',
                    type: 'button-positive',
                    onTap: function(e) {
                        return scope.data.url;
                    }
                }]
            });
        }


        function getWMSPopup(scope, vm) {
            return $ionicPopup.show({
                title: 'Select WMS source',
                scope: scope,
                cssClass: 'popup-import',
                buttons: [{
                    text: 'ArcGIS',
                    type: 'button-positive',
                    onTap: function(e) {
                        return vm.arcgisPopup();
                    }
                }, {
                    text: 'MapServer',
                    type: 'button-positive',
                    onTap: function(e) {
                        return vm.msPopup();
                    }
                }]
            });
        }

        function getMSPopup(scope) {
            return $ionicPopup.show({
                title: 'MapServer and layer details',
                template: 'MapServer URL<input type="url" ng-model="data.url"> List of layers (ex: "soil,landcover") <input type="text" ng-model="data.text">', // @TODO: if not valid url, output error message
                scope: scope,
                cssClass: 'popup-import',
                buttons: [{
                    text: 'Submit',
                    type: 'button-positive',
                    onTap: function(e) {
                        return scope.data;
                    }
                }]
            });
        }

        function getArcGISPopup(scope) {
            return $ionicPopup.show({
                title: 'ArcGIS REST endpoint details',
                template: 'ArcGIS server URL<input type="url" ng-model="data.url"> Layer ID List (ex: "0, 1, 2") <input type="text" ng-model="data.text">', // @TODO: if not valid url, output error message
                scope: scope,
                cssClass: 'popup-import',
                buttons: [{
                    text: 'Submit',
                    type: 'button-positive',
                    onTap: function(e) {
                        return scope.data;
                    }
                }]
            });
        }