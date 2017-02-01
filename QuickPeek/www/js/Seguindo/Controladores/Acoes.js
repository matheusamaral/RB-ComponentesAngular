'use strict';

angular.module('QuickPeek.Acoes.Seguindo', [ 
    'RB.pagina',
    'QuickPeek.Requisicao.Seguindo',
    'RB.validacoesPadroes'
])

.factory('SeguindoAcoes', ['Pagina','SeguindoRequisicoes','VP',
    function(Pagina,SeguindoRequisicoes,VP){
    var scope;  
    
    function setScope(obj){
        scope = obj;
        return this;
    };
    
    function voltarPerfil(){
        Pagina.navegar({idPage:8,paramAdd:'?latitude='+DGlobal.coordenadasAtual.latitude+'&longitude='+DGlobal.coordenadasAtual.longitude});
    }
    
    function deixarDeSeguir(id,$event){
        VP.pararEvento($event);
        var obj = {usuarioSeguirId: id};
        SeguindoRequisicoes.set({dados:obj,acaoSuccess:SeguindoRequisicoes.successDeixarSeguir,scope:scope}).deixarSeguir();
    }
    
    function irPerfil(id){
        Pagina.navegar({idPage:8,paramAdd:'?usuarioId='+id+'&latitude='+DGlobal.coordenadasAtual.latitude+'&longitude='+DGlobal.coordenadasAtual.longitude});
        DGlobal.perfilOutros = true;
        DGlobal.paginaVoltar = 15;
    }
    
    return {
        setScope:setScope,
        voltarPerfil:voltarPerfil,
        deixarDeSeguir:deixarDeSeguir,
        irPerfil:irPerfil
    };
    
 }]);
