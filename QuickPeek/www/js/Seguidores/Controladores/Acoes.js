'use strict';

angular.module('QuickPeek.Acoes.Seguidores', [ 
    'RB.pagina',
    'QuickPeek.Requisicao.Seguidores',
    'RB.validacoesPadroes'
])

.factory('SeguidoresAcoes', ['Pagina','SeguidoresRequisicoes','VP',
    function(Pagina,SeguidoresRequisicoes,VP){
    var scope;  
    
    function setScope(obj){
        scope = obj;
        return this;
    };
    
    function voltarPerfil(){
        Pagina.rollBack();
    }
    
    function seguir(id,evento){
        VP.pararEvento(evento);
        var obj = {usuarioSeguirId:id};
        SeguidoresRequisicoes.set({dados:obj,scope:scope,acaoSuccess:SeguidoresRequisicoes.successSeguir}).seguir();
    }
    
    function deixarSeguir(id,evento){
        VP.pararEvento(evento);
        var obj = {usuarioSeguirId:id};
        SeguidoresRequisicoes.set({dados:obj,scope:scope,acaoSuccess:SeguidoresRequisicoes.successDeixarDeSeguir}).deixarDeSeguir();
    }
    
    function cancelarSolicitacao(id,evento){
        VP.pararEvento(evento);
        var obj = {seguirId:id};
        SeguidoresRequisicoes.set({dados:obj,scope:scope,acaoSuccess:SeguidoresRequisicoes.successCancelarSeguir}).cancelarSeguir();
    }
    
    function irPerfil(id){
        Pagina.navegar({idPage:8,paramAdd:'?usuarioId='+id+'&latitude='+DGlobal.coordenadasAtual.latitude+'&longitude='+DGlobal.coordenadasAtual.longitude});
        DGlobal.perfilOutros = true;
        DGlobal.paginaVoltar = 15;
    }
    
    return {
        setScope:setScope,
        voltarPerfil:voltarPerfil,
        seguir:seguir,
        deixarSeguir:deixarSeguir,
        cancelarSolicitacao:cancelarSolicitacao,
        irPerfil:irPerfil
    };
    
 }]);
