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
        $scope.pesquisarLocal = PesquisarMapaAcoes.pesquisarLocal;
        $scope.pesquisarLocalScroll = PesquisarMapaAcoes.pesquisarLocalScroll;
        $scope.pesquisarPessoa = PesquisarMapaAcoes.pesquisarPessoa;
        $scope.pesquisarPessoaScroll = PesquisarMapaAcoes.pesquisarPessoaScroll;
        $scope.irPerfil = PesquisarMapaAcoes.irPerfil;
        $scope.checkInLocal = PesquisarMapaAcoes.checkInLocal;
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