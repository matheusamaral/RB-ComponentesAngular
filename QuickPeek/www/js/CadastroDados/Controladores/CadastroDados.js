'use strict';

angular.module('QuickPeek.CadastroDados', [
    'QuickPeek.Estrutura.CadastroDados',
    'QuickPeek.Acoes.CadastroDados',
    'QuickPeek.HTML.CadastroDados'
])

.controller('CadastroDadosCtrl', ['$scope','CadastroDadosEstrutura','CadastroDadosAcoes',
    function ($scope,CadastroDadosEstrutura,CadastroDadosAcoes){        
        CadastroDadosEstrutura.setScope($scope).popular();
        CadastroDadosAcoes.setScope($scope).inicializar();
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