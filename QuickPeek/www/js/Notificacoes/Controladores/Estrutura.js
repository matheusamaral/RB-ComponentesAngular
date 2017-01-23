'use strict';

angular.module('QuickPeek.Estrutura.Notificacoes', [
    'RB.gcs',
    'RB.config',
    'RB.pagina',
    'RB.validacoesPadroes'
])

.factory('NotificacoesEstrutura', ['GCS','Config','Pagina','VP',
    function(GCS,Config,Pagina,VP) {
    var scope;  
    
    function setScope(obj){
        scope = obj;
        return this;
    }
    
    function popular(){
        scope.dados = {
        };
        
        if(DGlobal.dadosUsuario && DGlobal.dadosUsuario.success){
            scope.dadosUser = DGlobal.dadosUsuario.dados; 
        }
        
        if(DGlobal.notificacoes && DGlobal.notificacoes.success){
            scope.dados.seguir = DGlobal.notificacoes.dados; 
        }
    };
  
    return {
        setScope:setScope,
        popular:popular
    };
 }]);
