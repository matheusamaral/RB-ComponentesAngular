'use strict';

angular.module('QuickPeek.Acoes.ApagarConta', [ 
    'RB.pagina',
    'QuickPeek.HTML.ApagarConta'
])

.factory('ApagarContaAcoes', ['Pagina',
    function(Pagina) {
    var scope;  
    
    function setScope(obj){
        scope = obj;
        return this;
    };
    
    function voltarConfig(){
        Pagina.rollBack();
    }
    
    function voltarInicio(){
        Pagina.navegar({idPage:2});
    }
    
    function alterarNumero(){
        Pagina.navegar({idPage:12});
    }
    
    return {
        setScope:setScope,
        voltarConfig:voltarConfig,
        voltarInicio:voltarInicio,
        alterarNumero:alterarNumero
    };
    
 }]);
