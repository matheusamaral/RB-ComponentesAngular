'use strict';

angular.module('QuickPeek.Perfil', [
    'QuickPeek.Estrutura.Perfil',
    'QuickPeek.Acoes.Perfil',
    'QuickPeek.HTML.Perfil'
])

.controller('PerfilCtrl', ['$scope','PerfilEstrutura','PerfilAcoes',
    function ($scope,PerfilEstrutura,PerfilAcoes){        
        PerfilEstrutura.setScope($scope).popular();
        PerfilAcoes.setScope($scope).inicializar();
        
        $scope.editarAvatar = PerfilAcoes.editarAvatar;
        $scope.editarPerfil = PerfilAcoes.editarPerfil;
    }
])

.directive('pagPerfil', [
    'layoutPadrao',
    'PerfilHtml',
    function(layoutPadrao,PerfilHtml){
        var objPag = {
            menu: '',
            barra: '',
            rodape: null,
            conteudo: PerfilHtml    
        };
        return {
          template: layoutPadrao.set(objPag).montar()
        };
}]);