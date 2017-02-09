'use strict';

angular.module('QuickPeek.Categorias', [
    'QuickPeek.Estrutura.Categorias',
    'QuickPeek.Acoes.Categorias',
    'QuickPeek.HTML.Categorias'
])

.controller('CategoriasCtrl', ['$scope','CategoriasEstrutura','CategoriasAcoes',
    function ($scope,CategoriasEstrutura,CategoriasAcoes){        
        CategoriasEstrutura.setScope($scope).popular();
        CategoriasAcoes.setScope($scope).inicializar();
        
        $scope.selecionarCategoria = CategoriasAcoes.selecionarCategoria;
        $scope.redefinir = CategoriasAcoes.redefinir;
        $scope.addLocal = CategoriasAcoes.addLocal;
        $scope.voltar = CategoriasAcoes.voltar;
        
    }
])

.directive('pagCategorias', [
    'layoutPadrao',
    'CategoriasHtml',
    function(layoutPadrao,CategoriasHtml){
        var objPag = {
            menu: '',
            barra: '',
            rodape: null,
            conteudo: CategoriasHtml    
        };
        return {
          template: layoutPadrao.set(objPag).montar()
        };
}]);