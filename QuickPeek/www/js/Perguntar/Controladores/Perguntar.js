'use strict';

angular.module('QuickPeek.Perguntar', [
    'QuickPeek.Estrutura.Perguntar',
    'QuickPeek.Acoes.Perguntar',
    'QuickPeek.HTML.Perguntar'
])

.controller('PerguntarCtrl', ['$scope','PerguntarEstrutura','PerguntarAcoes',
    function ($scope,PerguntarEstrutura,PerguntarAcoes){        
        PerguntarEstrutura.setScope($scope).popular();
        PerguntarAcoes.setScope($scope).configConexao('quickpeek.rubeus.com.br:9876');
        
        $scope.voltarLocais = PerguntarAcoes.voltarLocais;
        $scope.perguntar = PerguntarAcoes.perguntar;
    }
])

.directive('pagPerguntar', [
    'layoutPadrao',
    'PerguntarHtml',
    function(layoutPadrao,PerguntarHtml){
        var objPag = {
            menu: '',
            barra: '',
            rodape: false,
            conteudo: PerguntarHtml    
        };
        return {
          template: layoutPadrao.set(objPag).montar()
        };
}]);