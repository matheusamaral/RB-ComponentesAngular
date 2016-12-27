'use strict';

angular.module('QuickPeek.Estrutura.Seguindo', [
    'RB.gcs',
    'RB.config',
    'RB.pagina',
    'RB.validacoesPadroes'
])

.factory('SeguindoEstrutura', ['GCS','Config','Pagina','VP',
    function(GCS,Config,Pagina,VP) {
    var scope;  
    
    function setScope(obj){
        scope = obj;
        return this;
    }
    
    function popular(){
        scope.dados = {
            seguidores:new Array()
        };
        
        if(DGlobal.seguindos && DGlobal.seguindos.success){
            scope.dados.seguidores = DGlobal.seguindos.dados;
        }
    };
  
    return {
        setScope:setScope,
        popular:popular
    };
 }]);
