'use strict';

angular.module('QuickPeek.Acoes.Seguindo', [ 
    'RB.pagina',
    'QuickPeek.Requisicao.Seguindo'
])

.factory('SeguindoAcoes', ['Pagina','SeguindoRequisicoes',
    function(Pagina,SeguindoRequisicoes) {
    var scope;  
    
    function setScope(obj){
        scope = obj;
        return this;
    };
    
    function voltarPerfil(){
        Pagina.navegar({idPage:8,paramAdd:'?latitude='+DGlobal.coordenadasAtual.latitude+'&longitude='+DGlobal.coordenadasAtual.longitude});
    }
    
    function deixarDeSeguir(id){
        var obj = {usuarioSeguirId: id};
        SeguindoRequisicoes.set({dados:obj,acaoSuccess:SeguindoRequisicoes.successDeixarSeguir,scope:scope}).deixarSeguir();
    }
    
    return {
        setScope:setScope,
        voltarPerfil:voltarPerfil,
        deixarDeSeguir:deixarDeSeguir
    };
    
 }]);
