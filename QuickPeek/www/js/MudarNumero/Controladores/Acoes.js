'use strict';

angular.module('QuickPeek.Acoes.MudarNumero', [ 
    'RB.pagina'
])

.factory('MudarNumeroAcoes', ['Pagina',
    function(Pagina) {
    var scope;  
    
    function setScope(obj){
        scope = obj;
        addCss();
        return this;
    };
    
    function addCss(){
        $('ion-side-menu-content').addClass('background-cinza');
    }
    
    function avancar(){
        Pagina.navegar({idPage:13});
    }
    
    function voltarConfig(){
        Pagina.navegar({idPage:10});
    }
    
    return {
        setScope:setScope,
        avancar:avancar,
        voltarConfig:voltarConfig
    };
    
 }]);
