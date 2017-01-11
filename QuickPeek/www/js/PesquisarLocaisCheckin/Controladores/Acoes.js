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
        Pagina.navegar({idPage:29,paramAdd:'?latitude='+DGlobal.coordenadasAtual.latitude+'&longitude='+DGlobal.coordenadasAtual.longitude});
    }
    
    function pesquisarLocal(){
        $timeout.cancel(scope.timeOut);
        scope.timeOut = $timeout(function(){
            var obj = {nome:scope.dados.nome,latitude:DGlobal.coordenadasAtual.latitude,longitude:DGlobal.coordenadasAtual.longitude};
            PesquisarLocaisCheckinRequisicoes.set({dados:obj,scope:scope,acaoSuccess:PesquisarLocaisCheckinRequisicoes.successPesquisarLocais}).pesquisarLocais();
        },1500);
    }
    
    return {
        setScope:setScope,
        pesquisarLocalScroll:pesquisarLocalScroll,
        voltarCheckin:voltarCheckin,
        pesquisarLocal:pesquisarLocal
    };
    
 }]);
