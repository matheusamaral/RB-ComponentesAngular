'use strict';

angular.module('QuickPeek.Estrutura.NotificacoesSeguir', [
    'RB.gcs',
    'RB.config',
    'RB.pagina',
    'RB.validacoesPadroes'
])

.factory('NotificacoesSeguirEstrutura', ['GCS','Config','Pagina','VP',
    function(GCS,Config,Pagina,VP) {
    var scope;  
    
    function setScope(obj){
        scope = obj;
        return this;
    }
    
    function popular(){
        scope.dados = {
            pessoas:new Array()
        };
        
        if(DGlobal.seguir && DGlobal.seguir.success){
            scope.dados.pessoas = DGlobal.seguir.dados;
        }
    };
  
    return {
        setScope:setScope,
        popular:popular
    };
 }]);
