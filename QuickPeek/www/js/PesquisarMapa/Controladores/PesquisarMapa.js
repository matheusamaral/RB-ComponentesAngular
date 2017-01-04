'use strict';

angular.module('QuickPeek.PesquisarMapa', [
    'QuickPeek.Estrutura.PesquisarMapa',
    'QuickPeek.Acoes.PesquisarMapa',
    'QuickPeek.HTML.PesquisarMapa'
])

.controller('PesquisarMapaCtrl', ['$scope','PesquisarMapaEstrutura','PesquisarMapaAcoes',
    function ($scope,PesquisarMapaEstrutura,PesquisarMapaAcoes){        
        PesquisarMapaEstrutura.setScope($scope).popular();
        PesquisarMapaAcoes.setScope($scope);
        
        $scope.voltarMapa = PesquisarMapaAcoes.voltarMapa;
        $scope.pesquisar = PesquisarMapaAcoes.pesquisar;
    }
])

.directive('pagPesquisarMapa', [
    'layoutPadrao',
    'PesquisarMapaHtml',
    function(layoutPadrao,PesquisarMapaHtml){
        var objPag = {
            menu: '',
            barra: '',
            rodape: false,
            conteudo: PesquisarMapaHtml    
        };
        return {
          template: layoutPadrao.set(objPag).montar()
        };
}]);