'use strict';

angular.module('QuickPeek.Estrutura.ConfigNotificacoes', [
    'RB.gcs',
    'RB.config',
    'RB.pagina',
    'RB.validacoesPadroes'
])

.factory('ConfigNotificacoesEstrutura', ['GCS','Config','Pagina','VP',
    function(GCS,Config,Pagina,VP) {
    var scope;  
    
    function setScope(obj){
        scope = obj;
        return this;
    }
    
    function popular(){
        scope.dados = {
            notificacaoPresenca:0,
            notificacaoPublicacao:0
        };
        
        if(DGlobal.dadosUser && DGlobal.dadosUser.success){
            scope.dados.notificacaoPublicacao = DGlobal.dadosUser.dados.notificacaoPublicacao;
        }
    };
  
    return {
        setScope:setScope,
        popular:popular
    };
 }]);
