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
    
    function voltarCheckin(){
        Pagina.rollBack();
    }
    
    function pesquisarLocal(){
        $timeout.cancel(scope.timeOut);
        scope.timeOut = $timeout(function(){
            var obj = {nome:scope.dados.nome,latitude:DGlobal.coordenadasAtual.latitude,longitude:DGlobal.coordenadasAtual.longitude};
            PesquisarLocaisCheckinRequisicoes.set({dados:obj,scope:scope,acaoSuccess:PesquisarLocaisCheckinRequisicoes.successPesquisarLocais}).pesquisarLocais();
        },1500);
    }
    
    function irLocal(local){
        DGlobal.checkIn = {local:local};
        DGlobal.paginaAnterior = 31;
        Pagina.navegar({idPage:30});
    }
    
    return {
        setScope:setScope,
        pesquisarLocalScroll:pesquisarLocalScroll,
        voltarCheckin:voltarCheckin,
        pesquisarLocal:pesquisarLocal,
        irLocal:irLocal
    };
    
 }]);
