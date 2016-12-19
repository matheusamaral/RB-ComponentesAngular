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
        Pagina.navegar({idPage:10});
    }
    
    return {
        setScope:setScope,
        voltarConfig:voltarConfig
    };
    
 }]);
