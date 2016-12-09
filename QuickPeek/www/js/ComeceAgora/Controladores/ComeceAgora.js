'use strict';

angular.module('QuickPeek.ComeceAgora', [
    'QuickPeek.Estrutura.ComeceAgora',
    'QuickPeek.Acoes.ComeceAgora',
    'QuickPeek.HTML.ComeceAgoraCarrousel'
])

.controller('ComeceAgoraCtrl', ['$scope','ComeceAgoraEstrutura','ComeceAgoraAcoes',
    function ($scope,ComeceAgoraEstrutura,ComeceAgoraAcoes) {        
        ComeceAgoraEstrutura.setScope($scope).popular();
        ComeceAgoraAcoes.setScope($scope).inicializar();
        
        $scope.navegar =  ComeceAgoraAcoes.navegar;
    }
])

.directive('pagComeceAgora', [
    'layoutPadrao',
    'ComeceAgoraCarrouselHtml',
    function(layoutPadrao,ComeceAgoraCarrouselHtml){
        var objPag = {
            menu: '',
            barra: '',
            rodape: '',
            conteudo: ComeceAgoraCarrouselHtml    
        };
        return {
          template: layoutPadrao.set(objPag).montar()
        };
}]);