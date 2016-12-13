'use strict';

angular.module('QuickPeek.Configuracoes', [
    'QuickPeek.Estrutura.Configuracoes',
    'QuickPeek.Acoes.Configuracoes',
    'QuickPeek.HTML.Configuracoes'
])

.controller('ConfiguracoesCtrl', ['$scope','ConfiguracoesEstrutura','ConfiguracoesAcoes',
    function ($scope,ConfiguracoesEstrutura,ConfiguracoesAcoes){        
        ConfiguracoesEstrutura.setScope($scope).popular();
        ConfiguracoesAcoes.setScope($scope);
        
        $scope.voltarPerfil = ConfiguracoesAcoes.voltarPerfil;
        $scope.irConfigConta = ConfiguracoesAcoes.irConfigConta;
    }
])

.directive('pagConfiguracoes', [
    'layoutPadrao',
    'ConfiguracoesHtml',
    function(layoutPadrao,ConfiguracoesHtml){
        var objPag = {
            menu: '',
            barra: '',
            rodape: false,
            conteudo: ConfiguracoesHtml    
        };
        return {
          template: layoutPadrao.set(objPag).montar()
        };
}]);