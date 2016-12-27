'use strict';

angular.module('QuickPeek.Mapa', [
    'QuickPeek.Estrutura.Mapa',
    'QuickPeek.Acoes.Mapa',
    'QuickPeek.HTML.Mapa',
    'Cmp.Geolocation'
])

.controller('MapaCtrl', ['$scope','MapaEstrutura','MapaAcoes','$cordovaGeolocation','Geolocation',
    function ($scope,MapaEstrutura,MapaAcoes,$cordovaGeolocation,Geolocation){        
        MapaEstrutura.setScope($scope).popular();
        MapaAcoes.setScope($scope).inicializar();
        
        $scope.loading = true;
 
            $scope.toCelsius = function(temperature) {
                return ((temperature - 32) / 1.8).toFixed(1);
            };
 
            $cordovaGeolocation
                .getCurrentPosition({
                    timeout: 10000,
                    enableHighAccuracy: false
                })
                .then(function(position) {
                    var lat = position.coords.latitude;
                    var long = position.coords.longitude;
 
                    Geolocation.getCurrentWeather(lat, long).then(function(data) {
                        $scope.weatherInfo = data;
                        $scope.loading = false;
                    }, function(error) {
                        //TODO Display error message
                    });
                }, function(err) {
                    //TODO Display error message
                });
    }
])

.directive('pagMapa', [
    'layoutPadrao',
    'MapaHtml',
    function(layoutPadrao,MapaHtml){
        var objPag = {
            menu: '',
            barra: '',
            rodape: null,
            conteudo: MapaHtml    
        };
        return {
          template: layoutPadrao.set(objPag).montar()
        };
}]);