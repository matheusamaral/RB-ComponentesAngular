'use strict';

angular.module('QuickPeek.Locais', [
    'QuickPeek.Estrutura.Locais',
    'QuickPeek.Acoes.Locais',
    'QuickPeek.HTML.Locais'
])

.controller('LocaisCtrl', ['$scope','LocaisEstrutura','LocaisAcoes',
    function ($scope,LocaisEstrutura,LocaisAcoes){        
        LocaisEstrutura.setScope($scope).popular();
        LocaisAcoes.setScope($scope).inicializar();
        
        $scope.montaLinhasHashs = LocaisEstrutura.montaLinhasHashs;
        $scope.exibirMidias = LocaisAcoes.exibirMidias;
    }
])

.directive('pagLocais',[
    'layoutPadrao',
    'LocaisHtml',
    function(layoutPadrao,LocaisHtml){
        var objPag = {
            menu: '',
            barra: '',
            rodape: false,
            conteudo: LocaisHtml    
        };
        return {
          template: layoutPadrao.set(objPag).montar()
        };
}]);
