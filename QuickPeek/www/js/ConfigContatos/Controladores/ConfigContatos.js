'use strict';

angular.module('QuickPeek.ConfigContatos', [
    'QuickPeek.Estrutura.ConfigContatos',
    'QuickPeek.Acoes.ConfigContatos',
    'QuickPeek.HTML.ConfigContatos'
])

.controller('ConfigContatosCtrl', ['$scope','ConfigContatosEstrutura','ConfigContatosAcoes',
    function ($scope,ConfigNotificacoesEstrutura,ConfigNotificacoesAcoes){        
        ConfigNotificacoesEstrutura.setScope($scope).popular();
        ConfigNotificacoesAcoes.setScope($scope);
        
        $scope.voltarConfig = ConfigNotificacoesAcoes.voltarConfig;
        $scope.attNotificacoes = ConfigNotificacoesAcoes.attNotificacoes;
        $scope.abrirBarra = ConfigNotificacoesAcoes.abrirBarra;
        $scope.fecharBarra = ConfigNotificacoesAcoes.fecharBarra;
        $scope.compartilhar = ConfigNotificacoesAcoes.compartilhar;
    }
])

.directive('pagConfigContatos', [
    'layoutPadrao',
    'ConfigContatosHtml',
    function(layoutPadrao,ConfigContatosHtml){
        var objPag = {
            menu: '',
            barra: '',
            rodape: false,
            conteudo: ConfigContatosHtml    
        };
        return {
          template: layoutPadrao.set(objPag).montar()
        };
}]);