'use strict';

angular.module('QuickPeek.MudarNumero', [
    'QuickPeek.Estrutura.MudarNumero',
    'QuickPeek.Acoes.MudarNumero',
    'QuickPeek.HTML.MudarNumero'
])

.controller('MudarNumeroCtrl', ['$scope','MudarNumeroEstrutura','MudarNumeroAcoes',
    function ($scope,MudarNumeroEstrutura,MudarNumeroAcoes){        
        MudarNumeroEstrutura.setScope($scope).popular();
        MudarNumeroAcoes.setScope($scope);
        
        $scope.avancar = MudarNumeroAcoes.avancar;
        $scope.voltarConfig = MudarNumeroAcoes.voltarConfig;
    }
])

.directive('pagMudarNumero', [
    'layoutPadrao',
    'MudarNumeroHtml',
    function(layoutPadrao,MudarNumeroHtml){
        var objPag = {
            menu: '',
            barra: '',
            rodape: false,
            conteudo: MudarNumeroHtml    
        };
        return {
          template: layoutPadrao.set(objPag).montar()
        };
}]);