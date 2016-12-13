'use strict';

angular.module('QuickPeek.ConfigConta', [
    'QuickPeek.Estrutura.ConfigConta',
    'QuickPeek.Acoes.ConfigConta',
    'QuickPeek.HTML.ConfigConta'
])

.controller('ConfigContaCtrl', ['$scope','ConfigContaEstrutura','ConfigContaAcoes',
    function ($scope,ConfigContaEstrutura,ConfigContaAcoes){        
        ConfigContaEstrutura.setScope($scope).popular();
        ConfigContaAcoes.setScope($scope);
    }
])

.directive('pagConfigConta', [
    'layoutPadrao',
    'ConfigContaHtml',
    function(layoutPadrao,ConfigContaHtml){
        var objPag = {
            menu: '',
            barra: '',
            rodape: false,
            conteudo: ConfigContaHtml    
        };
        return {
          template: layoutPadrao.set(objPag).montar()
        };
}]);