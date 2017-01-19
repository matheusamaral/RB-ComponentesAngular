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