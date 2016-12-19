'use strict';

angular.module('QuickPeek.Avatares', [
    'QuickPeek.Estrutura.Avatares',
    'QuickPeek.Acoes.Avatares',
    'QuickPeek.HTML.Avatares'
])

.controller('AvataresCtrl', ['$scope','AvataresEstrutura','AvataresAcoes',
    function ($scope,AvataresEstrutura,AvataresAcoes){        
        AvataresEstrutura.setScope($scope).reqIniciais();
        AvataresAcoes.setScope($scope).inicializar();
        
        $scope.voltarCad = AvataresAcoes.voltarCad;
        $scope.selecionarAvatar = AvataresAcoes.selecionarAvatar;
        $scope.mudarAvatar = AvataresAcoes.mudarAvatar;
    }
])

.directive('pagAvatares', [
    'layoutPadrao',
    'AvataresHtml',
    function(layoutPadrao,AvataresHtml){
        var objPag = {
            menu: '',
            barra: '',
            rodape: null,
            conteudo: AvataresHtml    
        };
        return {
          template: layoutPadrao.set(objPag).montar()
        };
}]);