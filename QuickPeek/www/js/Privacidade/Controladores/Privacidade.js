'use strict';

angular.module('QuickPeek.Privacidade', [
    'QuickPeek.Estrutura.Privacidade',
    'QuickPeek.Acoes.Privacidade',
    'QuickPeek.HTML.Privacidade'
])

.controller('PrivacidadeCtrl', ['$scope','PrivacidadeEstrutura','PrivacidadeAcoes',
    function ($scope,PrivacidadeEstrutura,PrivacidadeAcoes){        
        PrivacidadeEstrutura.setScope($scope).popular();
        PrivacidadeAcoes.setScope($scope).inicializar();
        
        $scope.voltar = PrivacidadeAcoes.voltar;
        $scope.editarAvatar = PrivacidadeAcoes.editarAvatar;
        $scope.fazerCheckin = PrivacidadeAcoes.fazerCheckin;
    }
])

.directive('pagPrivacidade', [
    'layoutPadrao',
    'PrivacidadeHtml',
    function(layoutPadrao,PrivacidadeHtml){
        var objPag = {
            menu: '',
            barra: '',
            rodape: null,
            conteudo: PrivacidadeHtml    
        };
        return {
          template: layoutPadrao.set(objPag).montar()
        };
}]);
