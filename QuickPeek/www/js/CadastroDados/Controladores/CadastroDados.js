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
        
         $scope.showAlert = function() {
   var alertPopup = $ionicPopup.alert({
     title: 'O que é isso?',
     template: 'O avatar escolhido será a sua identidade anônima que aparecerá para as outras pessoas'
   });

   alertPopup.then(function(res) {
     console.log('Thank you for not eating my delicious ice cream cone');
   });
 };
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