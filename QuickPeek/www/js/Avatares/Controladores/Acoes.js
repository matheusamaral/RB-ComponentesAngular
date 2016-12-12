'use strict';

angular.module('QuickPeek.Acoes.Avatares', [ 
    'RB.pagina'
])

.factory('AvataresAcoes', ['Pagina',
    function(Pagina) {
    var scope;  
    
    function setScope(obj){
        scope = obj;
        return this;
    };
    
    function inicializar(){
        addCss();
    };
    
    function addCss(){
        
    }  
    
    return {
        setScope:setScope,
        inicializar:inicializar
    };
    
 }]);
