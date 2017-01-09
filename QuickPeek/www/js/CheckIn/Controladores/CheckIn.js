'use strict';

angular.module('QuickPeek.CheckIn', [
    'QuickPeek.Estrutura.CheckIn',
    'QuickPeek.Acoes.CheckIn',
    'QuickPeek.HTML.CheckIn'
])

.controller('CheckInCtrl', ['$scope','CheckInEstrutura','CheckInAcoes',
    function ($scope,CheckInEstrutura,CheckInAcoes){        
        CheckInEstrutura.setScope($scope).popular();
        CheckInAcoes.setScope($scope).inicializar();
        
        $scope.checkInLocal = CheckInAcoes.checkInLocal;
        $scope.voltarMapa = CheckInAcoes.voltarMapa;
        $scope.attLocais = CheckInAcoes.attLocais;
        $scope.irPesquisa = CheckInAcoes.irPesquisa;
    }
])

.directive('pagCheckIn', [
    'layoutPadrao',
    'CheckInHtml',
    function(layoutPadrao,CheckInHtml){
        var objPag = {
            menu: '',
            barra: '',
            rodape: null,
            conteudo: CheckInHtml    
        };
        return {
          template: layoutPadrao.set(objPag).montar()
        };
}]);
