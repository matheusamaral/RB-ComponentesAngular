'use strict';

angular.module('QuickPeek.ConfigNotificacoes', [
    'QuickPeek.Estrutura.ConfigNotificacoes',
    'QuickPeek.Acoes.ConfigNotificacoes',
    'QuickPeek.HTML.ConfigNotificacoes'
])

.controller('ConfigNotificacoesCtrl', ['$scope','ConfigNotificacoesEstrutura','ConfigNotificacoesAcoes',
    function ($scope,ConfigNotificacoesEstrutura,ConfigNotificacoesAcoes){        
        ConfigNotificacoesEstrutura.setScope($scope).popular();
        ConfigNotificacoesAcoes.setScope($scope);
        
        $scope.voltarConfig = ConfigNotificacoesAcoes.voltarConfig;
        $scope.attNotificacoes = ConfigNotificacoesAcoes.attNotificacoes;
    }
])

.directive('pagConfigNotificacoes', [
    'layoutPadrao',
    'ConfigNotificacoesHtml',
    function(layoutPadrao,ConfigNotificacoesHtml){
        var objPag = {
            menu: '',
            barra: '',
            rodape: false,
            conteudo: ConfigNotificacoesHtml    
        };
        return {
          template: layoutPadrao.set(objPag).montar()
        };
}]);