'use strict';

angular.module('QuickPeek.PerguntasLocal', [
    'QuickPeek.Estrutura.PerguntasLocal',
    'QuickPeek.Acoes.PerguntasLocal',
    'QuickPeek.HTML.PerguntasLocal'
])

.controller('PerguntasLocalCtrl', ['$scope','PerguntasLocalEstrutura','PerguntasLocalAcoes',
    function ($scope,PerguntasLocalEstrutura,PerguntasLocalAcoes){        
        PerguntasLocalEstrutura.setScope($scope).popular();
        PerguntasLocalAcoes.setScope($scope);
        
        $scope.voltarLocais = PerguntasLocalAcoes.voltarLocais;
    }
])

.directive('pagPerguntasLocal', [
    'layoutPadrao',
    'PerguntasLocalHtml',
    function(layoutPadrao,PerguntasLocalHtml){
        var objPag = {
            menu: '',
            barra: '',
            rodape: false,
            conteudo: PerguntasLocalHtml    
        };
        return {
          template: layoutPadrao.set(objPag).montar()
        };
}]);