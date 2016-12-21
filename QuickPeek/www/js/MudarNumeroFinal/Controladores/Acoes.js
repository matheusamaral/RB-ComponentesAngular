'use strict';

angular.module('QuickPeek.Acoes.MudarNumeroFinal', [ 
    'RB.pagina'
])

.factory('MudarNumeroFinalAcoes', ['Pagina',
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
    
    function voltarNumero(){
        Pagina.navegar({idPage:12});
    }
    
    return {
        setScope:setScope,
        voltarNumero:voltarNumero
    };
    
 }]);
