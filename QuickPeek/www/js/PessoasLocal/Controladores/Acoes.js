'use strict';

angular.module('QuickPeek.Acoes.PessoasLocal', [ 
    'RB.pagina',
    'QuickPeek.Requisicao.PessoasLocal',
    'RB.validacoesPadroes',
    'Cmp.InfinitScroll'
])

.factory('PessoasLocalAcoes', ['Pagina','PessoasLocalRequisicoes','VP','$window','$state','InfinitScroll',
    function(Pagina,PessoasLocalRequisicoes,VP,$window,$state,InfinitScroll){
    var scope;  
    
    function setScope(obj){
        scope = obj;
        scope.alturaTela = $('ion-side-menu-content').height();
        iniciarInfinitScroll();
        return this;
    };
    
    function voltarLocais(){
        Pagina.rollBack();
    }
    
    function iniciarInfinitScroll(){
        InfinitScroll.iniciar({
            bottom:true,
            idSeletorBottom:'paiContainerScrol',
            acaoBottom:maisPessoas
        });
    }
    
    function converteMinutoshoras(min){
        return VP.converteMinutosHoras(min);
    }
    
    function maisPessoas(){
        var obj = {id:DGlobal.idLocal,atualizando:true};
        PessoasLocalRequisicoes.set({dados:obj,scope:scope,acaoSuccess:PessoasLocalRequisicoes.successListar}).listar();
    }
    
    function irPerfil(id){
        if(id.visibilidadeId != 3){
            if(id.usuarioId == DGlobal.dadosUser.dados.usuarioId){
                Pagina.navegar({idPage:8,paramAdd:'?usuarioId='+id.usuarioId+'&latitude='+DGlobal.coordenadasAtual.latitude+'&longitude='+DGlobal.coordenadasAtual.longitude});
            }else{
                Pagina.navegar({idPage:8,paramAdd:'?usuarioId='+id.usuarioId+'&latitude='+DGlobal.coordenadasAtual.latitude+'&longitude='+DGlobal.coordenadasAtual.longitude});
                DGlobal.perfilOutros = true;
            }
            DGlobal.paginaVoltar = 26;
        }
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
    
    function voltar(){
        Pagina.rollBack();
    }
    
    return {
        setScope:setScope,
        voltarLocais:voltarLocais,
        converteMinutoshoras:converteMinutoshoras,
        maisPessoas:maisPessoas,
        irPerfil:irPerfil,
        seguir:seguir,
        cancelarSolicitacao:cancelarSolicitacao,
        deixarSeguir:deixarSeguir,
        voltar:voltar
    };
    
 }]);
