'use strict';

angular.module('QuickPeek.PesquisarLocaisCheckin', [
    'QuickPeek.Estrutura.PesquisarLocaisCheckin',
    'QuickPeek.Acoes.PesquisarLocaisCheckin',
    'QuickPeek.HTML.PesquisarLocaisCheckin'
])

.controller('PesquisarLocaisCheckinCtrl', ['$scope','PesquisarLocaisCheckinEstrutura','PesquisarLocaisCheckinAcoes',
    function ($scope,PesquisarLocaisCheckinEstrutura,PesquisarLocaisCheckinAcoes){        
        PesquisarLocaisCheckinEstrutura.setScope($scope).popular();
        PesquisarLocaisCheckinAcoes.setScope($scope);
        
        $scope.pesquisarLocal = PesquisarLocaisCheckinAcoes.pesquisarLocal;
    }
])

.directive('pagPesquisarLocaisCheckin', [
    'layoutPadrao',
    'PesquisarLocaisCheckinHtml',
    function(layoutPadrao,PesquisarLocaisCheckinHtml){
        var objPag = {
            menu: '',
            barra: '',
            rodape: false,
            conteudo: PesquisarLocaisCheckinHtml    
        };
        return {
          template: layoutPadrao.set(objPag).montar()
        };
}]);