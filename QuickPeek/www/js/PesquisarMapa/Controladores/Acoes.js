'use strict';

angular.module('QuickPeek.Acoes.PesquisarMapa', [ 
    'RB.pagina',
    'QuickPeek.Requisicao.PesquisarMapa',
    'RB.validacoesPadroes'
])

.factory('PesquisarMapaAcoes', ['Pagina','PesquisarMapaRequisicoes','RBLoadingMobile','$timeout',
    function(Pagina,PesquisarMapaRequisicoes,RBLoadingMobile,$timeout){
    var scope;  
    
    function setScope(obj){
        scope = obj;
        return this;
    };
    
    function voltarMapa(){
        if(DGlobal.coordenadasAtual){
            Pagina.navegar({idPage:22,paramAdd:'?atualizando=0&latitude='+DGlobal.coordenadasAtual.latitude+'&longitude='+DGlobal.coordenadasAtual.longitude});
        }else{
            var options = { maximumAge: 3000, timeout: 3000, enableHighAccuracy: true };
            navigator.geolocation.getCurrentPosition(onSuccess,onError);
        }
    }
    
    var onSuccess = function(position){
        DGlobal.coordenadasAtual = {latitude:position.coords.latitude,longitude:position.coords.longitude};
        Pagina.navegar({idPage:22,paramAdd:'?atualizando=0&latitude='+DGlobal.coordenadasAtual.latitude+'&longitude='+DGlobal.coordenadasAtual.longitude});
    };

    function onError(error){
        var coordenadas = {latitude:-21.135445,longitude:-42.365089};
        Pagina.navegar({idPage:22,paramAdd:'?atualizando=0&latitude='+coordenadas.latitude+'&longitude='+coordenadas.longitude});
    }
    
    function pesquisarLocal(){
        $timeout.cancel(scope.timeoutPesquisa);
        scope.timeoutPesquisa = $timeout(function(){
            RBLoadingMobile.show();
            scope.dados.latitude = DGlobal.coordenadasAtual.latitude,
            scope.dados.longitude = DGlobal.coordenadasAtual.longitude,
            scope.dados.atualizando = 0,
            PesquisarMapaRequisicoes.set({dados:scope.dados,scope:scope,acaoSuccess:PesquisarMapaRequisicoes.successPesquisarLocais}).pesquisarLocais();
        },1500);
    }
    
    function pesquisarLocalScroll(){
        scope.dados.latitude = DGlobal.coordenadasAtual.latitude,
        scope.dados.longitude = DGlobal.coordenadasAtual.longitude,
        scope.dados.atualizando = true,
        PesquisarMapaRequisicoes.set({dados:scope.dados,scope:scope,acaoSuccess:PesquisarMapaRequisicoes.successPesquisarLocaisScroll}).pesquisarLocais();
    }
    
    function pesquisarPessoa(){
        $timeout.cancel(scope.timeoutPesquisaPessoa);
        scope.timeoutPesquisaPessoa = $timeout(function(){
            RBLoadingMobile.show();
            scope.dados.atualizando = 0,
            PesquisarMapaRequisicoes.set({dados:scope.dados,scope:scope,acaoSuccess:PesquisarMapaRequisicoes.successPesquisarPessoas}).pesquisarPessoas();
        },1500);
    }
    
    function pesquisarPessoaScroll(){
        scope.dados.atualizando = true,
        PesquisarMapaRequisicoes.set({dados:scope.dados,scope:scope,acaoSuccess:PesquisarMapaRequisicoes.successPesquisarPessoasScroll}).pesquisarPessoas();
    }
    
    function irPerfil(id){
        Pagina.navegar({idPage:8,paramAdd:'?usuarioId='+id});
        DGlobal.perfilOutros = true;
        DGlobal.paginaVoltar = 28;
    }
    
    function checkInLocal(local){
        DGlobal.checkIn = {local:local};
        Pagina.navegar({idPage:30});
    }
    
    return {
        setScope:setScope,
        voltarMapa:voltarMapa,
        pesquisarLocal:pesquisarLocal,
        pesquisarLocalScroll:pesquisarLocalScroll,
        pesquisarPessoa:pesquisarPessoa,
        pesquisarPessoaScroll:pesquisarPessoaScroll,
        irPerfil:irPerfil,
        checkInLocal:checkInLocal
    };
    
 }]);
