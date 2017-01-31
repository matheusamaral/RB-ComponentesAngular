'use strict';

angular.module('QuickPeek.Acoes.PessoasLocal', [ 
    'RB.pagina',
    'QuickPeek.Requisicao.PessoasLocal',
    'RB.validacoesPadroes'
])

.factory('PessoasLocalAcoes', ['Pagina','PessoasLocalRequisicoes','VP',
    function(Pagina,PessoasLocalRequisicoes,VP){
    var scope;  
    
    function setScope(obj){
        scope = obj;
        return this;
    };
    
    function voltarLocais(){
        Pagina.navegar({idPage:24,paramAdd:'?latitude='+DGlobal.coordenadasAtual.latitude+'&longitude='+DGlobal.coordenadasAtual.longitude+'&localId='+DGlobal.localAtual+'&atualizando=0'});
    }
    
    function converteMinutoshoras(min){
        return VP.converteMinutosHoras(min);
    }
    
    function maisPessoas(){
        var obj = {id:DGlobal.idLocal,atualizando:true};
        PessoasLocalRequisicoes.set({dados:obj,scope:scope,acaoSuccess:PessoasLocalRequisicoes.successListar}).listar();
    }
    
    function irPerfil(id){
        if(id == DGlobal.dadosUser.dados.usuarioId){
            Pagina.navegar({idPage:8,paramAdd:'?usuarioId='+id+'&latitude='+DGlobal.coordenadasAtual.latitude+'&longitude='+DGlobal.coordenadasAtual.longitude});
        }else{
            Pagina.navegar({idPage:8,paramAdd:'?usuarioId='+id+'&latitude='+DGlobal.coordenadasAtual.latitude+'&longitude='+DGlobal.coordenadasAtual.longitude});
            DGlobal.perfilOutros = true;
        }
            DGlobal.paginaVoltar = 26;
    }
    
    function seguir(id,evento){
        VP.pararEvento(evento);
        var obj = {usuarioSeguirId:id};
        PessoasLocalRequisicoes.set({dados:obj,scope:scope,acaoSuccess:PessoasLocalRequisicoes.successSeguir}).seguir();
    }
    
    function cancelarSolicitacao(id,evento){
        VP.pararEvento(evento);
        var obj = {seguirId:id};
        PessoasLocalRequisicoes.set({dados:obj,scope:scope,acaoSuccess:PessoasLocalRequisicoes.successCancelarSeguir}).cancelarSeguir();
    }
    
    function deixarSeguir(id,evento){
        VP.pararEvento(evento);
        var obj = {usuarioSeguirId:id};
        PessoasLocalRequisicoes.set({dados:obj,scope:scope,acaoSuccess:PessoasLocalRequisicoes.successDeixarDeSeguir}).deixarDeSeguir();
    }
    
    return {
        setScope:setScope,
        voltarLocais:voltarLocais,
        converteMinutoshoras:converteMinutoshoras,
        maisPessoas:maisPessoas,
        irPerfil:irPerfil,
        seguir:seguir,
        cancelarSolicitacao:cancelarSolicitacao,
        deixarSeguir:deixarSeguir
    };
    
 }]);
