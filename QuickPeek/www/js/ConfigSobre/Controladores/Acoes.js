'use strict';

angular.module('QuickPeek.Acoes.ConfigSobre', [ 
    'RB.pagina'
])

.factory('ConfigSobreAcoes', ['Pagina',
    function(Pagina) {
    var scope;  
    
    function setScope(obj){
        scope = obj;
        return this;
    };
    
    function voltarConfiguracoes(){
        Pagina.navegar({idPage:9});
    }
    
    function irSobre(){
        Pagina.navegar({idPage:20});
    }
    
    function irTermos(){
        Pagina.navegar({idPage:21});
    }
    
    return {
        setScope:setScope,
        voltarConfiguracoes:voltarConfiguracoes,
        irSobre:irSobre,
        irTermos:irTermos
    };
    
 }]);
