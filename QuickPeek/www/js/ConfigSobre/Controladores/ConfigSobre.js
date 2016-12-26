'use strict';

angular.module('QuickPeek.ConfigSobre', [
    'QuickPeek.Estrutura.ConfigSobre',
    'QuickPeek.Acoes.ConfigSobre',
    'QuickPeek.HTML.ConfigSobre'
])

.controller('ConfigSobreCtrl', ['$scope','ConfigSobreEstrutura','ConfigSobreAcoes',
    function ($scope,ConfigSobreEstrutura,ConfigSobreAcoes){        
        ConfigSobreEstrutura.setScope($scope).popular();
        ConfigSobreAcoes.setScope($scope);
        
        $scope.voltarConfiguracoes = ConfigSobreAcoes.voltarConfiguracoes;
        $scope.irTermos = ConfigSobreAcoes.irTermos;
        $scope.irSobre = ConfigSobreAcoes.irSobre;
        $scope.irFAQ = ConfigSobreAcoes.irFAQ;
        $scope.irFaleConosco = ConfigSobreAcoes.irFaleConosco;
    }
])

.directive('pagConfigSobre', [
    'layoutPadrao',
    'ConfigSobreHtml',
    function(layoutPadrao,ConfigSobreHtml){
        var objPag = {
            menu: '',
            barra: '',
            rodape: false,
            conteudo: ConfigSobreHtml    
        };
        return {
          template: layoutPadrao.set(objPag).montar()
        };
}]);