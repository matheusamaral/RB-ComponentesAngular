'use strict';

angular.module('QuickPeek.PessoasBloqueadas', [
    'QuickPeek.Estrutura.PessoasBloqueadas',
    'QuickPeek.Acoes.PessoasBloqueadas',
    'QuickPeek.HTML.PessoasBloqueadas'
])

.controller('PessoasBloqueadasCtrl', ['$scope','PessoasBloqueadasEstrutura','PessoasBloqueadasAcoes',
    function ($scope,PessoasBloqueadasEstrutura,PessoasBloqueadasAcoes){        
        PessoasBloqueadasEstrutura.setScope($scope).popular();
        PessoasBloqueadasAcoes.setScope($scope);
        
        $scope.voltarConfig = PessoasBloqueadasAcoes.voltarConfig;
        $scope.popupDesbloquear = PessoasBloqueadasAcoes.popupDesbloquear;
        $scope.desbloquear = PessoasBloqueadasAcoes.desbloquear;
    }
])

.directive('pagPessoasBloqueadas', [
    'layoutPadrao',
    'PessoasBloqueadasHtml',
    function(layoutPadrao,PessoasBloqueadasHtml){
        var objPag = {
            menu: '',
            barra: '',
            rodape: false,
            conteudo: PessoasBloqueadasHtml    
        };
        return {
          template: layoutPadrao.set(objPag).montar()
        };
}]);