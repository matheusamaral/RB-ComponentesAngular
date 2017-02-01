'use strict';

angular.module('QuickPeek.PrivacidadeRespostas', [
    'QuickPeek.Estrutura.PrivacidadeRespostas',
    'QuickPeek.Acoes.PrivacidadeRespostas',
    'QuickPeek.HTML.PrivacidadeRespostas'
])

.controller('PrivacidadeRespostasCtrl', ['$scope','PrivacidadeRespostasEstrutura','PrivacidadeRespostasAcoes',
    function ($scope,PrivacidadeRespostasEstrutura,PrivacidadeRespostasAcoes){        
        PrivacidadeRespostasEstrutura.setScope($scope).popular();
        PrivacidadeRespostasAcoes.setScope($scope).inicializar();
        
        $scope.voltarPerguntas = PrivacidadeRespostasAcoes.voltarPerguntas;
        $scope.irResposta = PrivacidadeRespostasAcoes.irResposta;
    }
])

.directive('pagPrivacidadeRespostas', [
    'layoutPadrao',
    'PrivacidadeRespostasHtml',
    function(layoutPadrao,PrivacidadeRespostasHtml){
        var objPag = {
            menu: '',
            barra: '',
            rodape: null,
            conteudo: PrivacidadeRespostasHtml    
        };
        return {
          template: layoutPadrao.set(objPag).montar()
        };
}]);
