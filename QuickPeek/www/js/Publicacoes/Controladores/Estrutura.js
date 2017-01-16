'use strict';

angular.module('QuickPeek.Estrutura.Publicacoes', [
    'RB.gcs',
    'RB.config',
    'RB.pagina',
    'RB.validacoesPadroes'
])

.factory('PublicacoesEstrutura', ['GCS','$timeout','Pagina','VP',
    function(GCS,$timeout,Pagina,VP) {
    var scope;  
    
    function setScope(obj){
        scope = obj;
        return this;
    }
    
    function popular(){
        scope.dados = {};
        
        if(DGlobal.dadosUsuario && DGlobal.dadosUsuario.success){
            scope.dadosUser = DGlobal.dadosUsuario.dados;
        }
        
        if(DGlobal.localPublicar){
            scope.local = DGlobal.localPublicar;
            console.log(scope.local);
        }
    };
  
    return {
        setScope:setScope,
        popular:popular
    };
 }]);
