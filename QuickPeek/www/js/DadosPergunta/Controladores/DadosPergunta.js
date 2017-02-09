'use strict';

angular.module('QuickPeek.DadosPergunta', [
    'QuickPeek.Estrutura.DadosPergunta',
    'QuickPeek.Acoes.DadosPergunta',
    'QuickPeek.HTML.DadosPergunta'
])

.controller('DadosPerguntaCtrl', ['$scope','DadosPerguntaEstrutura','DadosPerguntaAcoes',
    function ($scope,RespostasEstrutura,RespostasAcoes){        
        RespostasEstrutura.setScope($scope).popular();
        RespostasAcoes.setScope($scope);
        
        $scope.verificaData = RespostasAcoes.verificaData;
        $scope.calcLargurahr = RespostasAcoes.calcLargurahr;
        $scope.voltar = RespostasAcoes.voltar;
    }
])

.directive('pagDadosPergunta', [
    'layoutPadrao',
    'DadosPerguntaHtml',
    function(layoutPadrao,DadosPerguntaHtml){
        var objPag = {
            menu: '',
            barra: '',
            rodape: false,
            conteudo: DadosPerguntaHtml    
        };
        return {
          template: layoutPadrao.set(objPag).montar()
        };
}]);