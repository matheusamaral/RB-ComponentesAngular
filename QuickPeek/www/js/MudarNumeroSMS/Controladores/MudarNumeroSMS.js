'use strict';

angular.module('QuickPeek.MudarNumeroSMS', [
    'QuickPeek.Estrutura.MudarNumeroSMS',
    'QuickPeek.Acoes.MudarNumeroSMS',
    'QuickPeek.HTML.MudarNumeroSMS'
])

.controller('MudarNumeroSMSCtrl', ['$scope','MudarNumeroSMSEstrutura','MudarNumeroSMSAcoes',
    function ($scope,MudarNumeroSMSEstrutura,MudarNumeroSMSAcoes){        
        MudarNumeroSMSEstrutura.setScope($scope).popular();
        MudarNumeroSMSAcoes.setScope($scope).inicializar();
        
        $scope.voltar = MudarNumeroSMSAcoes.voltar;
        $scope.confirmarSms = MudarNumeroSMSAcoes.confirmarSms;
        
    }
])

.directive('pagMudarNumeroSMS', [
    'layoutPadrao',
    'MudarNumeroSMSHtml',
    function(layoutPadrao,MudarNumeroSMSHtml){
        var objPag = {
            menu: '',
            barra: '',
            rodape: false,
            conteudo: MudarNumeroSMSHtml    
        };
        return {
          template: layoutPadrao.set(objPag).montar()
        };
}]);