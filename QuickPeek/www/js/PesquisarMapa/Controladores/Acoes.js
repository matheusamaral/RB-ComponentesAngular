'use strict';

angular.module('QuickPeek.Acoes.PesquisarMapa', [ 
    'RB.pagina',
    'QuickPeek.Requisicao.PesquisarMapa',
    'RB.validacoesPadroes',
    'Cmp.InfinitScroll'
])

.factory('PesquisarMapaAcoes', ['Pagina','PesquisarMapaRequisicoes','RBLoadingMobile','$timeout','VP','InfinitScroll',
    function(Pagina,PesquisarMapaRequisicoes,RBLoadingMobile,$timeout,VP,InfinitScroll){
    var scope;  
    
    function setScope(obj){
        scope = obj;
        scope.busca = {buscandoPessoa : false};
        iniciarInfinitScroll();
        return this;
    };
    
    function voltarMapa(){
        Pagina.rollBack();
    }
    
    function pesquisarLocal(){
        $timeout.cancel(scope.timeoutPesquisa);
        scope.timeoutPesquisa = $timeout(function(){
            RBLoadingMobile.show();
            scope.dados.latitude = DGlobal.coordenadasAtual.latitude,
            scope.dados.longitude = DGlobal.coordenadasAtual.longitude,
            scope.dados.atualizando = 0,
            PesquisarMapaRequisicoes.set({dados:scope.dados,scope:scope,acaoSuccess:PesquisarMapaRequisicoes.successPesquisarLocais}).pesquisarLocais();
        },1000);
    }
    
    function pesquisarLocalScroll(){
        scope.dados.latitude = DGlobal.coordenadasAtual.latitude,
        scope.dados.longitude = DGlobal.coordenadasAtual.longitude,
        scope.dados.atualizando = true,
        PesquisarMapaRequisicoes.set({dados:scope.dados,scope:scope,acaoSuccess:PesquisarMapaRequisicoes.successPesquisarLocaisScroll}).pesquisarLocais();
    }
        
    function iniciarInfinitScroll(){
        scope.alturaTela = $('ion-side-menu-content').height();
        $timeout(function(){
            InfinitScroll.iniciar({
                bottom:true,
                idSeletorBottom:'paiContainerScrol',
                acaoBottom:pesquisarLocalScroll
            });
        },0);
    }
    
    function iniciarInfinitScrollPessoa(){
        InfinitScroll.iniciar({
            bottom:true,
            idSeletorBottom:'paiContainerScrolPessoa',
            acaoBottom:pesquisarPessoaScroll
        });
    }
    
    function gerenciaScroll(index){
        console.log(index);
        if(index == 0)
            iniciarInfinitScroll();
        else
            iniciarInfinitScrollPessoa();
    }
    
    function pesquisarPessoa(){
        $timeout.cancel(scope.timeoutPesquisaPessoa);
        scope.timeoutPesquisaPessoa = $timeout(function(){
            RBLoadingMobile.show();
            scope.dados.atualizando = 0,
            PesquisarMapaRequisicoes.set({dados:scope.dados,scope:scope,acaoSuccess:PesquisarMapaRequisicoes.successPesquisarPessoas}).pesquisarPessoas();
        },1000);
    }
    
    function pesquisarPessoaScroll(){
        scope.dados.atualizando = true,
        PesquisarMapaRequisicoes.set({dados:scope.dados,scope:scope,acaoSuccess:PesquisarMapaRequisicoes.successPesquisarPessoasScroll}).pesquisarPessoas();
    }
    
    function irPerfil(id){
        if(scope.dadosUser.usuarioId != id){
            Pagina.navegar({idPage:8,paramAdd:'?usuarioId='+id+'&latitude='+DGlobal.coordenadasAtual.latitude+'&longitude='+DGlobal.coordenadasAtual.longitude});
            DGlobal.perfilOutros = true;
            DGlobal.paginaVoltar = 28;
        }else{
            Pagina.navegar({idPage:8,paramAdd:'?usuarioId='+id+'&latitude='+DGlobal.coordenadasAtual.latitude+'&longitude='+DGlobal.coordenadasAtual.longitude});
            if(DGlobal.perfilOutros)delete DGlobal.perfilOutros;
            DGlobal.paginaVoltar = 28;
        }
    }
    
    function checkInLocal(local){
        DGlobal.checkIn = {local:local};
        Pagina.navegar({idPage:30});
    }
    
    function converteKmM(km){
        return String((1000 * (parseFloat(km)))).split('.')[0];
    }
    
    function irLocal(id){
        DGlobal.localAtual = id;
        DGlobal.voltarPesquisa = true;
        if(DGlobal.coordenadasAtual){
            Pagina.navegar({idPage:24,paramAdd:'?latitude='+DGlobal.coordenadasAtual.latitude+'&longitude='+DGlobal.coordenadasAtual.longitude+'&localId='+id+'&atualizando=0'});
        }else{
            navigator.geolocation.getCurrentPosition(onPesquisaLocal,onPesquisaLocalError);
        }
    }
    
    var onPesquisaLocal = function(position){
        DGlobal.coordenadasAtual = {latitude:position.coords.latitude,longitude:position.coords.longitude};
        Pagina.navegar({idPage:24,paramAdd:'?latitude='+DGlobal.coordenadasAtual.latitude+'&longitude='+DGlobal.coordenadasAtual.longitude+'&localId='+DGlobal.localAtual+'&atualizando=0'});
    };

    function onPesquisaLocalError(error){
        var coordenadas = {latitude:-21.135445,longitude:-42.365089};
        Pagina.navegar({idPage:24,paramAdd:'?latitude='+coordenadas.latitude+'&longitude='+coordenadas.longitude+'&localId='+DGlobal.localAtual+'&atualizando=0'});
    }
    
    function seguir(id,evento){
        VP.pararEvento(evento);
        var obj = {usuarioSeguirId:id};
        PesquisarMapaRequisicoes.set({dados:obj,scope:scope,acaoSuccess:PesquisarMapaRequisicoes.successSeguir}).seguir();
    }
    
    function cancelarSolicitacao(id,evento){
        VP.pararEvento(evento);
        var obj = {seguirId:id};
        PesquisarMapaRequisicoes.set({dados:obj,scope:scope,acaoSuccess:PesquisarMapaRequisicoes.successCancelarSeguir}).cancelarSeguir();
    }
    
    function deixarSeguir(id,evento){
        VP.pararEvento(evento);
        var obj = {usuarioSeguirId:id};
        PesquisarMapaRequisicoes.set({dados:obj,scope:scope,acaoSuccess:PesquisarMapaRequisicoes.successDeixarDeSeguir}).deixarDeSeguir();
    }
    
    function addLocal(){
        var obj = {
            latitude:DGlobal.coordenadasAtual.latitude,
            longitude:DGlobal.coordenadasAtual.longitude,
            titulo:scope.dados.termoBuscado
        };
        
        DGlobal.dadosNovoLocal = obj;
        Pagina.navegar({idPage:39});
    }
    
    return {
        setScope:setScope,
        voltarMapa:voltarMapa,
        pesquisarLocal:pesquisarLocal,
        pesquisarLocalScroll:pesquisarLocalScroll,
        pesquisarPessoa:pesquisarPessoa,
        pesquisarPessoaScroll:pesquisarPessoaScroll,
        irPerfil:irPerfil,
        checkInLocal:checkInLocal,
        converteKmM:converteKmM,
        irLocal:irLocal,
        seguir:seguir,
        cancelarSolicitacao:cancelarSolicitacao,
        deixarSeguir:deixarSeguir,
        addLocal:addLocal,
        iniciarInfinitScroll:iniciarInfinitScroll,
        gerenciaScroll:gerenciaScroll
    };
    
 }]);
