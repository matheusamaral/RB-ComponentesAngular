'use strict';

angular.module('QuickPeek.Acoes.Seguidores', [ 
    'RB.pagina',
    'QuickPeek.Requisicao.Seguidores'
])

.factory('SeguidoresAcoes', ['Pagina','SeguidoresRequisicoes',
    function(Pagina,SeguidoresRequisicoes){
    var scope;  
    
    function setScope(obj){
        scope = obj;
        return this;
    };
    
    function voltarPerfil(){
        Pagina.navegar({idPage:8});
    }
    
    function seguir(id){
        var obj = {usuarioSeguirId:id};
        SeguidoresRequisicoes.set({dados:obj,scope:scope,acaoSuccess:SeguidoresRequisicoes.successSeguir}).seguir();
    }
    
    function deixarSeguir(id){
        var obj = {usuarioSeguirId:id};
        SeguidoresRequisicoes.set({dados:obj,scope:scope,acaoSuccess:SeguidoresRequisicoes.successDeixarDeSeguir}).deixarDeSeguir();
    }
    
    return {
        setScope:setScope,
        voltarPerfil:voltarPerfil,
        seguir:seguir,
        deixarSeguir:deixarSeguir
    };
    
 }]);
