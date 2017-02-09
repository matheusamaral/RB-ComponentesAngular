'use strict';

angular.module('QuickPeek.CriarLocal', [
    'QuickPeek.Estrutura.CriarLocal',
    'QuickPeek.Acoes.CriarLocal',
    'QuickPeek.HTML.CriarLocal'
])

.controller('CriarLocalCtrl', ['$scope','CriarLocalEstrutura','CriarLocalAcoes',
    function ($scope,CriarLocalEstrutura,CriarLocalAcoes){        
        CriarLocalEstrutura.setScope($scope).popular();
        CriarLocalAcoes.setScope($scope);
        
        $scope.selecionarCat = CriarLocalAcoes.selecionarCat;
    }
])

.directive('pagCriarLocal', [
    'layoutPadrao',
    'CriarLocalHtml',
    function(layoutPadrao,CriarLocalHtml){
        var objPag = {
            menu: '',
            barra: '',
            rodape: false,
            conteudo: CriarLocalHtml    
        };
        return {
          template: layoutPadrao.set(objPag).montar()
        };
}]);