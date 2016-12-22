'use strict';

angular.module('QuickPeek.Sobre', [
    'QuickPeek.Estrutura.Sobre',
    'QuickPeek.Acoes.Sobre',
    'QuickPeek.HTML.Sobre'
])

.controller('SobreCtrl', ['$scope','SobreEstrutura','SobreAcoes',
    function ($scope,SobreEstrutura,SobreAcoes) {        
        SobreEstrutura.setScope($scope).popular();
        SobreAcoes.setScope($scope).inicializar();
        
        $scope.navegar =  SobreAcoes.navegar;
        $scope.proximoSlide =  SobreAcoes.proximoSlide;
        $scope.verificaBackground =  SobreAcoes.verificaBackground;
        $scope.voltarSlide =  SobreAcoes.voltarSlide;
    }
])

.directive('pagSobre', [
    'layoutPadrao',
    'SobreHtml',
    function(layoutPadrao,SobreHtml){
        var objPag = {
            menu: '',
            barra: '',
            rodape: '',
            conteudo: SobreHtml    
        };
        return {
          template: layoutPadrao.set(objPag).montar()
        };
}]);