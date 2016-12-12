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
    
    function voltarCad(){
        if(scope.avatares.editando)
            Pagina.navegar({idPage:8});
        else
            Pagina.navegar({idPage:6});
    }
    
    return {
        setScope:setScope,
        inicializar:inicializar,
        voltarCad:voltarCad
    };
    
 }]);
