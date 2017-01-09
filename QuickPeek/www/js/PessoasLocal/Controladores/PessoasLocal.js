'use strict';

angular.module('QuickPeek.PessoasLocal', [
    'QuickPeek.Estrutura.PessoasLocal',
    'QuickPeek.Acoes.PessoasLocal',
    'QuickPeek.HTML.PessoasLocal'
])

.controller('PessoasLocalCtrl', ['$scope','PessoasLocalEstrutura','PessoasLocalAcoes',
    function ($scope,PessoasLocalEstrutura,PessoasLocalAcoes){        
        PessoasLocalEstrutura.setScope($scope).popular();
        PessoasLocalAcoes.setScope($scope);
        
        $scope.voltarLocais = PessoasLocalAcoes.voltarLocais;
        $scope.converteMinutoshoras = PessoasLocalAcoes.converteMinutoshoras;
        $scope.maisPessoas = PessoasLocalAcoes.maisPessoas;
        $scope.irPerfil = PessoasLocalAcoes.irPerfil;
    }
])

.directive('pagPessoasLocal', [
    'layoutPadrao',
    'PessoasLocalHtml',
    function(layoutPadrao,PessoasLocalHtml){
        var objPag = {
            menu: '',
            barra: '',
            rodape: false,
            conteudo: PessoasLocalHtml    
        };
        return {
          template: layoutPadrao.set(objPag).montar()
        };
}]);