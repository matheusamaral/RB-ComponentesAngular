'use strict';

angular.module('QuickPeek.Acoes.ConfigNotificacoes', [ 
    'RB.pagina',
    'QuickPeek.Requisicao.ConfigNotificacoes'
])

.factory('ConfigNotificacoesAcoes', ['Pagina','$timeout','ConfigNotificacoesRequisicoes',
    function(Pagina,$timeout,ConfigNotificacoesRequisicoes) {
    var scope;  
    
    function setScope(obj){
        scope = obj;
        return this;
    };
    
    function voltarConfig(){
        Pagina.navegar({idPage:9});
    }
    
    function attNotificacoes(){
        $timeout(function(){
            ConfigNotificacoesRequisicoes.set({dados:scope.dados,scope:scope,acaoSuccess:ConfigNotificacoesRequisicoes.successEditarNotificacoes}).editarNotificacoes();
        });
    }
    
    return {
        setScope:setScope,
        voltarConfig:voltarConfig,
        attNotificacoes:attNotificacoes
    };
    
 }]);
