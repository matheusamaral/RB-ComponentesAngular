'use strict';

angular.module('QuickPeek.MudarNumeroFinal', [
    'QuickPeek.Estrutura.MudarNumeroFinal',
    'QuickPeek.Acoes.MudarNumeroFinal',
    'QuickPeek.HTML.MudarNumeroFinal'
])

.controller('MudarNumeroFinalCtrl', ['$scope','MudarNumeroFinalEstrutura','MudarNumeroFinalAcoes',
    function ($scope,MudarNumeroFinalEstrutura,MudarNumeroFinalAcoes){        
        MudarNumeroFinalEstrutura.setScope($scope).popular();
        MudarNumeroFinalAcoes.setScope($scope);
        
        $scope.voltarNumero = MudarNumeroFinalAcoes.voltarNumero;
    }
])

.directive('pagMudarNumeroFinal', [
    'layoutPadrao',
    'MudarNumeroFinalHtml',
    function(layoutPadrao,MudarNumeroFinalHtml){
        var objPag = {
            menu: '',
            barra: '',
            rodape: false,
            conteudo: MudarNumeroFinalHtml    
        };
        return {
          template: layoutPadrao.set(objPag).montar()
        };
}]);