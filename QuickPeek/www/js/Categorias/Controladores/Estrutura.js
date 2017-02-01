'use strict';

angular.module('QuickPeek.Estrutura.Categorias', [
])

.factory('CategoriasEstrutura', ['$timeout',
    function($timeout) {
    var scope;  
    
    function setScope(obj){
        scope = obj;
        return this;
    }
    
    function popular(){
        scope.dados = {
            categorias:new Array(),
            tipos:new Array
        };
        scope.objCategorias = new Array();
        
        if(DGlobal.categorias && DGlobal.categorias.success){
            scope.categorias = DGlobal.categorias.dados;
            for(var i = 0; i < scope.categorias.length;i++){
                scope.categorias[i].indice = i;
            }
        }
        
        $timeout(function(){
            estruturaLinhas();
        },0);
        
        if(DGlobal.dadosNovoLocal){
            scope.dadosNovoLocal = DGlobal.dadosNovoLocal;
            scope.dadosNovoLocal.categoriaId = new Array();
            delete DGlobal.dadosNovoLocal;
        }
    };
    
    function estruturaLinhas(){
        var contCat = 0;
        var linhaCat = new Array();
        for(var i = 0; i < scope.categorias.length; i++){
            contCat++;
            linhaCat.push(scope.categorias[i]);
            if(contCat == 3 || (contCat != 3 && i == scope.categorias.length - 1)){
                scope.objCategorias.push(linhaCat);
                linhaCat = new Array();
                contCat = 0;
            }
        }
    }
  
    return {
        setScope:setScope,
        popular:popular
    };
 }]);
