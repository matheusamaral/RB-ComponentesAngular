'use strict';

angular.module('QuickPeek.Termos', [
    'QuickPeek.Estrutura.Termos',
    'QuickPeek.Acoes.Termos',
    'QuickPeek.HTML.Termos'
])

.controller('TermosCtrl', ['$scope','TermosEstrutura','TermosAcoes',
    function ($scope,TermosEstrutura,TermosAcoes){        
        TermosEstrutura.setScope($scope).popular();
        TermosAcoes.setScope($scope);
        
        $scope.navegar = TermosAcoes.navegar;
    }
])

.directive('pagTermos', [
    'layoutPadrao',
    'TermosHtml',
    function(layoutPadrao,TermosHtml){
        var objPag = {
            menu: '',
            barra: '',
            rodape: false,
            conteudo: TermosHtml    
        };
        return {
          template: layoutPadrao.set(objPag).montar()
        };
}]);