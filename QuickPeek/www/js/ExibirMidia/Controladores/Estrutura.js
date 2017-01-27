'use strict';

angular.module('QuickPeek.Estrutura.ExibirMidia', [
    'RB.gcs',
    'RB.config',
    'RB.pagina',
    'RB.validacoesPadroes'
])

.factory('ExibirMidiaEstrutura', ['GCS','Config','Pagina','VP',
    function(GCS,Config,Pagina,VP) {
    var scope;  
    
    function setScope(obj){
        scope = obj;
        return this;
    }
    
    function popular(){
        scope.dados= {};
        
        if(DGlobal.midias && DGlobal.midias.success){
            scope.midias = DGlobal.midias.dados;
        }
        
        if(DGlobal.dadosUsuario && DGlobal.dadosUsuario.success){
            scope.dadosUser = DGlobal.dadosUsuario.dados;
        }
    };
  
    return {
        setScope:setScope,
        popular:popular
    };
 }]);
