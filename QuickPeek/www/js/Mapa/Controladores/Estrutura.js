'use strict';

angular.module('QuickPeek.Estrutura.Mapa', [
    'RB.gcs',
    'RB.config',
    'RB.pagina',
    'RB.validacoesPadroes'
])

.factory('MapaEstrutura', ['GCS','Config','Pagina','VP',
    function(GCS,Config,Pagina,VP) {
    var scope;  
    
    function setScope(obj){
        scope = obj;
        return this;
    }
    
    function popular(){
        scope.dados = {};
    };
  
    return {
        setScope:setScope,
        popular:popular
    };
 }]);
