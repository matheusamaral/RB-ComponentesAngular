'use strict';

angular.module('QuickPeek.TiraSelfie', [
    'QuickPeek.Estrutura.TiraSelfie',
    'QuickPeek.Acoes.TiraSelfie',
    'QuickPeek.HTML.TiraSelfie'
])

.controller('TiraSelfieCtrl', ['$scope','TiraSelfieEstrutura','TiraSelfieAcoes',
    function ($scope,TiraSelfieEstrutura,TiraSelfieAcoes){        
        TiraSelfieEstrutura.setScope($scope).popular();
        TiraSelfieAcoes.setScope($scope).inicializar();
        
        $scope.openCamera = TiraSelfieAcoes.openCamera;
    }
])

.directive('pagTiraSelfie', [
    'layoutPadrao',
    'TiraSelfieHtml',
    'TiraSelfieRodape',
    function(layoutPadrao,TiraSelfieHtml,TiraSelfieRodape){
        var objPag = {
            menu: '',
            barra: '',
            rodape: TiraSelfieRodape,
            conteudo: TiraSelfieHtml    
        };
        return {
          template: layoutPadrao.set(objPag).montar()
        };
}]);