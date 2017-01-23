'use strict';

angular.module('QuickPeek.NotificacoesSeguir', [
    'QuickPeek.Estrutura.NotificacoesSeguir',
    'QuickPeek.Acoes.NotificacoesSeguir',
    'QuickPeek.HTML.NotificacoesSeguir'
])

.controller('NotificacoesSeguirCtrl', ['$scope','NotificacoesSeguirEstrutura','NotificacoesSeguirAcoes',
    function ($scope,NotificacoesSeguirEstrutura,NotificacoesSeguirAcoes){        
        NotificacoesSeguirEstrutura.setScope($scope).popular();
        NotificacoesSeguirAcoes.setScope($scope);
        
        $scope.confirmar = NotificacoesSeguirAcoes.confirmar;
        $scope.voltar = NotificacoesSeguirAcoes.voltar;
    }
])

.directive('pagNotificacoesSeguir', [
    'layoutPadrao',
    'NotificacoesSeguirHtml',
    function(layoutPadrao,NotificacoesSeguirHtml){
        var objPag = {
            menu: '',
            barra: '',
            rodape: false,
            conteudo: NotificacoesSeguirHtml    
        };
        return {
          template: layoutPadrao.set(objPag).montar()
        };
}]);