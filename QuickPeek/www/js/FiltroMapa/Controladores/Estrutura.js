'use strict';

angular.module('QuickPeek.Estrutura.FiltroMapa', [
    'RB.gcs',
    'RB.config',
    'RB.pagina',
    'RB.validacoesPadroes'
])

.factory('FiltroMapaEstrutura', ['GCS','Config','Pagina','VP','$timeout',
    function(GCS,Config,Pagina,VP,$timeout) {
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
        
        if(DGlobal.filtro){
            scope.dados.categorias = DGlobal.filtro.categorias;
            scope.dados.tipos = DGlobal.filtro.tipos;
            
            for(var i = 0; i < scope.dados.categorias.length; i++){
                for(var j = 0;j < scope.categorias.length;j++){
                    if(scope.dados.categorias[i] == scope.categorias[j].id && scope.categorias[j].tipo == 0){
                        scope.categorias[j].selecionado = true;
                    }
                }
            }
            
            for(var i = 0; i < scope.dados.tipos.length; i++){
                for(var j = 0;j < scope.categorias.length;j++){
                    if(scope.dados.tipos[i] == scope.categorias[j].id && scope.categorias[j].tipo == 1){
                        scope.categorias[j].selecionado = true;
                    }
                }
            }
        }
        
        $timeout(function(){
            estruturaLinhas();
        },0);
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
