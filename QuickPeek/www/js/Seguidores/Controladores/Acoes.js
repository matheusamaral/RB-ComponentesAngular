'use strict';

angular.module('QuickPeek.Acoes.Seguidores', [ 
    'RB.pagina'
])

.factory('SeguidoresAcoes', ['Pagina',
    function(Pagina) {
    var scope;  
    
    function setScope(obj){
        scope = obj;
        return this;
    };
    
    function voltarPerfil(){
        Pagina.navegar({idPage:8});
    }
    
    return {
        setScope:setScope,
        voltarPerfil:voltarPerfil
    };
    
 }]);
