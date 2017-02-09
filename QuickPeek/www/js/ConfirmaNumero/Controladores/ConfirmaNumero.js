'use strict';

angular.module('QuickPeek.ConfirmaNumero', [
    'QuickPeek.Estrutura.ConfirmaNumero',
    'QuickPeek.Acoes.ConfirmaNumero',
    'QuickPeek.HTML.ConfirmaNumero'
])

.controller('ConfirmaNumeroCtrl', ['$scope','ConfirmaNumeroEstrutura','ConfirmaNumeroAcoes',
    function ($scope,ConfirmaNumeroEstrutura,ConfirmaNumeroAcoes){        
        ConfirmaNumeroEstrutura.setScope($scope).popular();
        ConfirmaNumeroAcoes.setScope($scope).inicializar();
        
        $scope.cadastrarNumero = ConfirmaNumeroAcoes.cadastrarNumero;
    }
])

.directive('pagConfirmaNumero', [
    'layoutPadrao',
    'ConfirmaNumeroHtml',
    'ConfirmaNumeroRodape',
    function(layoutPadrao,ConfirmaNumeroHtml,ConfirmaNumeroRodape){
        var objPag = {
            menu: '',
            barra: '',
            rodape: ConfirmaNumeroRodape,
            conteudo: ConfirmaNumeroHtml    
        };
        return {
          template: layoutPadrao.set(objPag).montar()
        };
}]);