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
        Pagina.navegar({idPage:8});
    }
    
    function irConfigConta(){
        Pagina.navegar({idPage:10});
    }
    
    function voltarPerfil(){
        Pagina.navegar({idPage:8});
    }
    
    return {
        setScope:setScope,
        voltarPerfil:voltarPerfil,
        irConfigConta:irConfigConta
    };
    
 }]);
