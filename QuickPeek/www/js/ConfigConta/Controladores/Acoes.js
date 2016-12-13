'use strict';

angular.module('QuickPeek.Acoes.ConfigConta', [ 
    'RB.pagina'
])

.factory('ConfigContaAcoes', ['Pagina',
    function(Pagina) {
    var scope;  
    
    function setScope(obj){
        scope = obj;
        return this;
    };
    
    return {
        setScope:setScope
    };
    
 }]);
