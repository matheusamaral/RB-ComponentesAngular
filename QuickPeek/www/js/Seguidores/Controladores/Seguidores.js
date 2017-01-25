'use strict';

angular.module('QuickPeek.Seguidores', [
    'QuickPeek.Estrutura.Seguidores',
    'QuickPeek.Acoes.Seguidores',
    'QuickPeek.HTML.Seguidores'
])

.controller('SeguidoresCtrl', ['$scope','SeguidoresEstrutura','SeguidoresAcoes',
    function ($scope,SeguidoresEstrutura,SeguidoresAcoes){        
        SeguidoresEstrutura.setScope($scope).popular();
        SeguidoresAcoes.setScope($scope);
        
        $scope.voltarPerfil = SeguidoresAcoes.voltarPerfil;
        $scope.seguir = SeguidoresAcoes.seguir;
        $scope.deixarSeguir = SeguidoresAcoes.deixarSeguir;
        $scope.cancelarSolicitacao = SeguidoresAcoes.cancelarSolicitacao;
        $scope.irPerfil = SeguidoresAcoes.irPerfil;
    }
])

.directive('pagSeguidores', [
    'layoutPadrao',
    'SeguidoresHtml',
    function(layoutPadrao,SeguidoresHtml){
        var objPag = {
            menu: '',
            barra: '',
            rodape: false,
            conteudo: SeguidoresHtml    
        };
        return {
          template: layoutPadrao.set(objPag).montar()
        };
}]);