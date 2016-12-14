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
    
    return {
        setScope:setScope
    };
    
 }]);
