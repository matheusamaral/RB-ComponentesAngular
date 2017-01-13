'use strict';

angular.module('QuickPeek.LoadingInicial', [
    'QuickPeek.Estrutura.LoadingInicial',
    'QuickPeek.Acoes.LoadingInicial',
    'QuickPeek.HTML.ComeceAgoraCarrousel'
])

.controller('LoadingInicialCtrl', ['$scope','LoadingInicialEstrutura','LoadingInicialAcoes',
    function ($scope,LoadingInicialEstrutura,LoadingInicialAcoes) {        
        LoadingInicialEstrutura.setScope($scope).popular();
        LoadingInicialAcoes.setScope($scope).inicializar();
        
        $scope.onDeviceReady = LoadingInicialAcoes.onDeviceReady;
    }
])

.directive('pagLoadingInicial', [
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