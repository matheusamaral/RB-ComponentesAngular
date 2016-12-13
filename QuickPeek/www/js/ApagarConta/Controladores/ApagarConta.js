'use strict';

angular.module('QuickPeek.ApagarConta', [
    'QuickPeek.Estrutura.ApagarConta',
    'QuickPeek.Acoes.ApagarConta',
    'QuickPeek.HTML.ApagarConta'
])

.controller('ApagarContaCtrl', ['$scope','ApagarContaEstrutura','ApagarContaAcoes',
    function ($scope,ApagarContaEstrutura,ApagarContaAcoes){        
        ApagarContaEstrutura.setScope($scope).popular();
        ApagarContaAcoes.setScope($scope);
        
        $scope.voltarConfig = ApagarContaAcoes.voltarConfig;
    }
])

.directive('pagApagarConta', [
    'layoutPadrao',
    'ApagarContaHtml',
    function(layoutPadrao,ApagarContaHtml){
        var objPag = {
            menu: '',
            barra: '',
            rodape: false,
            conteudo: ApagarContaHtml    
        };
        return {
          template: layoutPadrao.set(objPag).montar()
        };
}]);