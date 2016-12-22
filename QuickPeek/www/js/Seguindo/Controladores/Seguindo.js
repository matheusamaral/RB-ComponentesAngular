'use strict';

angular.module('QuickPeek.Seguindo', [
    'QuickPeek.Estrutura.Seguindo',
    'QuickPeek.Acoes.Seguindo',
    'QuickPeek.HTML.Seguindo'
])

.controller('SeguindoCtrl', ['$scope','SeguindoEstrutura','SeguindoAcoes',
    function ($scope,SeguindoEstrutura,SeguindoAcoes){        
        SeguindoEstrutura.setScope($scope).popular();
        SeguindoAcoes.setScope($scope);
        
        $scope.voltarPerfil = SeguindoAcoes.voltarPerfil;
    }
])

.directive('pagSeguindo', [
    'layoutPadrao',
    'SeguindoHtml',
    function(layoutPadrao,SeguindoHtml){
        var objPag = {
            menu: '',
            barra: '',
            rodape: false,
            conteudo: SeguindoHtml    
        };
        return {
          template: layoutPadrao.set(objPag).montar()
        };
}]);