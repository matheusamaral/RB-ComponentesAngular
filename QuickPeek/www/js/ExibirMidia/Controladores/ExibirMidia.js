'use strict';

angular.module('QuickPeek.ExibirMidia', [
    'QuickPeek.Estrutura.ExibirMidia',
    'QuickPeek.Acoes.ExibirMidia',
    'QuickPeek.HTML.ExibirMidia'
])

.controller('ExibirMidiaCtrl', ['$scope','ExibirMidiaEstrutura','ExibirMidiaAcoes',
    function ($scope,ExibirMidiaEstrutura,ExibirMidiaAcoes){        
        ExibirMidiaEstrutura.setScope($scope).popular();
        ExibirMidiaAcoes.setScope($scope).inicializar();
        
        $scope.voltarLocais = ExibirMidiaAcoes.voltarLocais;
        $scope.curtir = ExibirMidiaAcoes.curtir;
    }
])

.directive('pagExibirMidia', [
    'layoutPadrao',
    'ExibirMidiaHtml',
    function(layoutPadrao,ExibirMidiaHtml){
        var objPag = {
            menu: '',
            barra: '',
            rodape: null,
            conteudo: ExibirMidiaHtml    
        };
        return {
          template: layoutPadrao.set(objPag).montar()
        };
}]);