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
        
        $scope.irFiltro = MapaAcoes.irFiltro;
        $scope.irLocal = MapaAcoes.irLocal;
        $scope.irPesquisa = MapaAcoes.irPesquisa;
        $scope.irCheckin = MapaAcoes.irCheckin;
        $scope.checkin = MapaAcoes.checkin;
        $scope.attTutorial = MapaAcoes.attTutorial;
        $scope.irPerfil = MapaAcoes.irPerfil;
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
