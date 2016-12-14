'use strict';

angular.module('QuickPeek.ConfirmaSms', [
    'QuickPeek.Estrutura.ConfirmaSms',
    'QuickPeek.Acoes.ConfirmaSms',
    'QuickPeek.HTML.ConfirmaSms'
])

.controller('ConfirmaSmsCtrl', ['$scope','ConfirmaSmsEstrutura','ConfirmaSmsAcoes',
    function ($scope,ConfirmaSmsEstrutura,ConfirmaSmsAcoes){        
        ConfirmaSmsEstrutura.setScope($scope).popular();
        ConfirmaSmsAcoes.setScope($scope).inicializar();
        
        $scope.enviarNovoSms = ConfirmaSmsAcoes.enviarNovoSms;
        $scope.confirmarSms = ConfirmaSmsAcoes.confirmarSms;
        $scope.toggleIntercept = ConfirmaSmsAcoes.toggleIntercept;
    }
])

.directive('pagConfirmaSms', [
    'layoutPadrao',
    'ConfirmaSmsHtml',
    'ConfirmaSmsRodape',
    function(layoutPadrao,ConfirmaSmsHtml,ConfirmaSmsRodape){
        var objPag = {
            menu: '',
            barra: '',
            rodape: ConfirmaSmsRodape,
            conteudo: ConfirmaSmsHtml    
        };
        return {
          template: layoutPadrao.set(objPag).montar()
        };
}]);