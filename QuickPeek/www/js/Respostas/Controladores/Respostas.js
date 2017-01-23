'use strict';

angular.module('QuickPeek.Respostas', [
    'QuickPeek.Estrutura.Respostas',
    'QuickPeek.Acoes.Respostas',
    'QuickPeek.HTML.Respostas'
])

.controller('RespostasCtrl', ['$scope','RespostasEstrutura','RespostasAcoes',
    function ($scope,RespostasEstrutura,RespostasAcoes){        
        RespostasEstrutura.setScope($scope).popular();
        RespostasAcoes.setScope($scope).configConexao();
        
        $scope.voltarLocais = RespostasAcoes.voltarLocais;
        $scope.setarCursorInicio = RespostasAcoes.setarCursorInicio;
        $scope.responder = RespostasAcoes.responder;
        $scope.carregarRespostas = RespostasAcoes.carregarRespostas;
        $scope.digitando = RespostasAcoes.digitando;
        $scope.removeMarginTeclado = RespostasAcoes.removeMarginTeclado;
        $scope.addMarginTeclado = RespostasAcoes.addMarginTeclado;
        $scope.voltarPerguntas = RespostasAcoes.voltarPerguntas;
    }
])

.directive('pagRespostas', [
    'layoutPadrao',
    'RespostasHtml',
    function(layoutPadrao,RespostasHtml){
        var objPag = {
            menu: '',
            barra: '',
            rodape: false,
            conteudo: RespostasHtml    
        };
        return {
          template: layoutPadrao.set(objPag).montar()
        };
}]);