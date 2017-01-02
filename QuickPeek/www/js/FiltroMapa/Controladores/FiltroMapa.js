'use strict';

angular.module('QuickPeek.FiltroMapa', [
    'QuickPeek.Estrutura.FiltroMapa',
    'QuickPeek.Acoes.FiltroMapa',
    'QuickPeek.HTML.FiltroMapa'
])

.controller('FiltroMapaCtrl', ['$scope','FiltroMapaEstrutura','FiltroMapaAcoes',
    function ($scope,FiltroMapaEstrutura,FiltroMapaAcoes){        
        FiltroMapaEstrutura.setScope($scope).popular();
        FiltroMapaAcoes.setScope($scope).inicializar();
        
        $scope.selecionarCategoria = FiltroMapaAcoes.selecionarCategoria;
        $scope.redefinir = FiltroMapaAcoes.redefinir;
        $scope.aplicarFiltro = FiltroMapaAcoes.aplicarFiltro;
        $scope.voltarMapa = FiltroMapaAcoes.voltarMapa;
        
    }
])

.directive('pagFiltroMapa', [
    'layoutPadrao',
    'FiltroMapaHtml',
    function(layoutPadrao,FiltroMapaHtml){
        var objPag = {
            menu: '',
            barra: '',
            rodape: null,
            conteudo: FiltroMapaHtml    
        };
        return {
          template: layoutPadrao.set(objPag).montar()
        };
}]);