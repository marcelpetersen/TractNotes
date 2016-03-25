
        function trackPopup() {
            $scope.data = {};

            var trackPopup = popupService.getTrackPopup($scope, vm);
            //IonicClosePopupService.register(trackPopup);

            trackPopup.then(function(res) {
                trackService.setTrackMetadata(res);
            });
        }



        function getTrackPopup(scope) {
            return $ionicPopup.show({
                title: 'Edit Track Information',
                template: 'Name<input type="text" ng-model="data.name"> Description <input type="text" ng-model="data.desc"> Author<input type="text" ng-model="data.author">', // @TODO: if not valid url, output error message    
                scope: scope,
                buttons: [{
                    text: 'Save',
                    type: 'button-positive',
                    onTap: function(e) {
                        return scope.data;
                    }
                }, {
                    text: 'Cancel',
                    type: 'button-positive'
                }]
            });
        }



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

var geoJsonData = [{
  "type": "FeatureCollection",
  "features": [{
    "type": "Feature",
    "properties": {
      "fillColor": "#eeffee",
      "fillOpacity": 0.8
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [119.2895599, 21.718679],
          [119.2895599, 25.373809],
          [122.61840, 25.37380917],
          [122.61840, 21.71867980],
          [119.2895599, 21.718679]
        ]
      ]
    }
  }, {
    "type": "Feature",
    "properties": {
      "marker-color": "#00ff00"
    },
    "geometry": {
      "type": "Point",
      "coordinates": [120.89355, 23.68477]
    }
  }]
}];

// Here we use the `L.geoJson` layer type from Leaflet, that lets us use
// Polygons, Points, and all other GeoJSON types - but we specify that it
// should also pull styles for polygons with the `style` option
// and use the custom `L.mapbox.marker.style` function
// to make fancy markers with the `pointToLayer` option.
var geoJson = L.geoJson(geoJsonData, {
    pointToLayer: L.mapbox.marker.style,
    style: function(feature) { return feature.properties; }
}).addTo(vm.map);

vm.map.removeLayer(geoJson);


var lol = togpx(geoJsonData)

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