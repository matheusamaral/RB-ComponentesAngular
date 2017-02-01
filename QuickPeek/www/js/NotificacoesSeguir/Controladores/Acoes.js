'use strict';

angular.module('QuickPeek.Acoes.NotificacoesSeguir', [ 
    'RB.pagina',
    'QuickPeek.HTML.NotificacoesSeguir',
    'QuickPeek.Requisicao.NotificacoesSeguir'
])

.factory('NotificacoesSeguirAcoes', ['Pagina','NotificacoesSeguirRequisicoes',
    function(Pagina,NotificacoesSeguirRequisicoes) {
    var scope;  
    
    function setScope(obj){
        scope = obj;
        return this;
    };
    
    function confirmar(seguirId,aceite){
        var obj = {
            seguirId:seguirId,
            aceitar:aceite
        };
        
        NotificacoesSeguirRequisicoes.set({dados:obj,scope:scope,acaoSuccess:NotificacoesSeguirRequisicoes.successConfirmar}).confirmar();
    }
    
    function voltar(){
        Pagina.navegar({idPage:36});
    }
    
    return {
        setScope:setScope,
        confirmar:confirmar,
        voltar:voltar
    };
    
 }]);
