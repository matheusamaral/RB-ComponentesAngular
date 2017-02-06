'use strict';

angular.module('QuickPeek.Acoes.Categorias', [ 
    'RB.pagina',
    'QuickPeek.Requisicao.Categorias'
])

.factory('CategoriasAcoes', ['Pagina','CategoriasRequisicoes',
    function(Pagina,CategoriasRequisicoes){
    var scope;  
    
    function setScope(obj){
        scope = obj;
        return this;
    };
    
    function inicializar(){
        $('ion-side-menu-content').addClass('background-cinza-claro');
    };
    
    function selecionarCategoria(indice){
        for(var i = 0;i < scope.objCategorias.length;i++){
            for(var j = 0; j < scope.objCategorias[i].length; j++){
                if(scope.objCategorias[i][j].indice == indice){
                    if(scope.objCategorias[i][j].selecionado){
                        scope.objCategorias[i][j].selecionado = false;
                        removeCategoria(scope.objCategorias[i][j].id);
                    }
                    else{
                        scope.objCategorias[i][j].selecionado = true;
                        addCategoria(scope.objCategorias[i][j].id);
                    }
                }
            }
        }
    }
    
    function addCategoria(id){
        scope.dadosNovoLocal.categoriaId.push(id);
    }
    
    function removeCategoria(id){
        var achou = false, indiceAchado;
        for(var i = 0; i < scope.dadosNovoLocal.categoriaId.length;i++){
            if(id == scope.dadosNovoLocal.categoriaId[i]){
                achou = true;
                indiceAchado = i;
            }
        }
        
        if(achou){
            scope.dadosNovoLocal.categoriaId.splice(indiceAchado,1);
        }
    }
    
    function redefinir(){
        for(var i = 0;i < scope.objCategorias.length;i++){
            for(var j = 0; j < scope.objCategorias[i].length; j++){
                scope.objCategorias[i][j].selecionado = false;
            }
        }
        
        scope.dadosNovoLocal.categoriaId = new Array();
    }
    
    function voltar(){
         Pagina.navegar({idPage:28,paramAdd:'?latitude='+DGlobal.coordenadasAtual.latitude+'&longitude='+DGlobal.coordenadasAtual.longitude});
    }
    
    function addLocal(){
        console.log('sdsd');
        console.log(scope.dadosNovoLocal);
        CategoriasRequisicoes.set({dados:scope.dadosNovoLocal,scope:scope,acaoSuccess:CategoriasRequisicoes.successAddlocal}).addLocal();
    }
    
    return {
        setScope:setScope,
        inicializar:inicializar,
        selecionarCategoria:selecionarCategoria,
        redefinir:redefinir,
        addLocal:addLocal,
        voltar:voltar
    };
    
 }]);
