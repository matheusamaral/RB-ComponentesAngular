'use strict';

angular.module('QuickPeek.Acoes.Termos', [ 
    'RB.pagina'
])

.factory('TermosAcoes', ['Pagina',
    function(Pagina) {
    var scope;  
    
    function setScope(obj){
        scope = obj;
        addCss();
        return this;
    };
    
    function navegar(){
        Pagina.navegar({idPage:19});
    }
    
    function addCss(){
        $('ion-side-menu-content').addClass('background-cinza');       
    }
    
    return {
        setScope:setScope,
        navegar:navegar
    };
    
 }]);