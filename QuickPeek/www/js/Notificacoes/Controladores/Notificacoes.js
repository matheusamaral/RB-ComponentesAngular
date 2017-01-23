'use strict';

angular.module('QuickPeek.Notificacoes', [
    'QuickPeek.Estrutura.Notificacoes',
    'QuickPeek.Acoes.Notificacoes',
    'QuickPeek.HTML.Notificacoes'
])

.controller('NotificacoesCtrl', ['$scope','NotificacoesEstrutura','NotificacoesAcoes',
    function ($scope,NotificacoesEstrutura,NotificacoesAcoes){        
        NotificacoesEstrutura.setScope($scope).popular();
        NotificacoesAcoes.setScope($scope).inicializar();
        
        $scope.irMapa = NotificacoesAcoes.irMapa;
        $scope.irPerfil = NotificacoesAcoes.irPerfil;
        $scope.irNotSeguir = NotificacoesAcoes.irNotSeguir;
    }
])

.directive('pagNotificacoes', [
    'layoutPadrao',
    'NotificacoesHtml',
    function(layoutPadrao,NotificacoesHtml){
        var objPag = {
            menu: '',
            barra: '',
            rodape: null,
            conteudo: NotificacoesHtml    
        };
        return {
          template: layoutPadrao.set(objPag).montar()
        };
}]);