'use strict';

angular.module('QuickPeek.CadastroDados', [
    'QuickPeek.Estrutura.CadastroDados',
    'QuickPeek.Acoes.CadastroDados',
    'QuickPeek.HTML.CadastroDados'
])

.controller('CadastroDadosCtrl', ['$scope','CadastroDadosEstrutura','CadastroDadosAcoes','$ionicPopup',
    function ($scope,CadastroDadosEstrutura,CadastroDadosAcoes,$ionicPopup){        
        CadastroDadosEstrutura.setScope($scope).popular();
        CadastroDadosAcoes.setScope($scope).inicializar();
        
        $scope.cadastrar = CadastroDadosAcoes.cadastrar;
        $scope.showAlert = CadastroDadosAcoes.showAlert;
        $scope.irAvatares = CadastroDadosAcoes.irAvatares;
        $scope.voltarSelfie = CadastroDadosAcoes.voltarSelfie;
        $scope.voltarPerfil = CadastroDadosAcoes.voltarPerfil;
    }
])

.directive('pagCadastroDados', [
    'layoutPadrao',
    'CadastroDadosHtml',
    'CadastroDadosRodape',
    function(layoutPadrao,CadastroDadosHtml,CadastroDadosRodape){
        var objPag = {
            menu: '',
            barra: '',
            rodape: CadastroDadosRodape,
            conteudo: CadastroDadosHtml    
        };
        return {
          template: layoutPadrao.set(objPag).montar()
        };
}]);
