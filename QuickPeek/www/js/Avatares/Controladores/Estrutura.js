'use strict';

angular.module('QuickPeek.Estrutura.Avatares', [
    'RB.gcs',
    'RB.config',
    'RB.pagina',
    'RB.validacoesPadroes'
])

.factory('AvataresEstrutura', ['GCS','Config','Pagina','VP',
    function(GCS,Config,Pagina,VP) {
    var scope;  
    
    function setScope(obj){
        scope = obj;
        return this;
    }
    
    function popular(){
        scope.avatares = {};
        
        if(DGlobal.dadosEditar){
            scope.avatares.editando = true;
            delete DGlobal.dadosEditar;
        }
    };
  
    return {
        setScope:setScope,
        popular:popular
    };
 }]);
