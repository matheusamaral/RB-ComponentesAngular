'use strict';

angular.module('QuickPeek.Acoes.PesquisarLocaisCheckin', [ 
    'RB.pagina',
    'QuickPeek.Requisicao.PesquisarLocaisCheckin',
    'RB.validacoesPadroes'
])

.factory('PesquisarLocaisCheckinAcoes', ['Pagina','PesquisarLocaisCheckinRequisicoes','RBLoadingMobile','$timeout',
    function(Pagina,PesquisarLocaisCheckinRequisicoes,RBLoadingMobile,$timeout){
    var scope;  
    
    function setScope(obj){
        scope = obj;
        return this;
    };
    
    function pesquisarLocalScroll(){
        
    }
    
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
        $timeout.cancel(scope.timeOut);
        scope.timeOut = $timeout(function(){
            var obj = {nome:scope.dados.nome,latitude:DGlobal.coordenadasAtual.latitude,longitude:DGlobal.coordenadasAtual.longitude};
            PesquisarLocaisCheckinRequisicoes.set({dados:obj,scope:scope,acaoSuccess:PesquisarLocaisCheckinRequisicoes.successPesquisarLocais}).pesquisarLocais();
        },1.500);
    }
    
    return {
        setScope:setScope,
        pesquisarLocalScroll:pesquisarLocalScroll,
        voltarMapa:voltarMapa,
        pesquisarLocal:pesquisarLocal
    };
    
 }]);
