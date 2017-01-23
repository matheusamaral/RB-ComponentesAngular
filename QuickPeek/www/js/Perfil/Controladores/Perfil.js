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
        $scope.irConfiguracoes = PerfilAcoes.irConfiguracoes;
        $scope.irSeguindo = PerfilAcoes.irSeguindo;
        $scope.irSeguidores = PerfilAcoes.irSeguidores;
        $scope.irMapa = PerfilAcoes.irMapa;
        $scope.voltar = PerfilAcoes.voltar;
        $scope.seguir = PerfilAcoes.seguir;
        $scope.retornaDistancia = PerfilAcoes.retornaDistancia;
        $scope.converteTempo = PerfilAcoes.converteTempo;
        $scope.irCheckin = PerfilAcoes.irCheckin;
        $scope.checkInLocal = PerfilAcoes.checkInLocal;
        $scope.irNotificacoes = PerfilAcoes.irNotificacoes;
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