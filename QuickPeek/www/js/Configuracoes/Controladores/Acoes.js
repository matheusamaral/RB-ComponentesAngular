'use strict';

angular.module('QuickPeek.Acoes.Configuracoes', [ 
    'RB.pagina'
])

.factory('ConfiguracoesAcoes', ['Pagina',
    function(Pagina) {
    var scope;  
    
    function setScope(obj){
        scope = obj;
        return this;
    };
    
    function voltarPerfil(){
        Pagina.rollBack();
    }
    
    function irConfigConta(){
        Pagina.navegar({idPage:10});
    }
    
    function irNotificacoes(){
        Pagina.navegar({idPage:17});
    }
    
    function irContatos(){
        Pagina.navegar({idPage:18});
    }
    
    function irSobre(){
        Pagina.navegar({idPage:19});
    }
    
    return {
        setScope:setScope,
        voltarPerfil:voltarPerfil,
        irConfigConta:irConfigConta,
        irNotificacoes:irNotificacoes,
        irContatos:irContatos,
        irSobre:irSobre
    };
    
 }]);
