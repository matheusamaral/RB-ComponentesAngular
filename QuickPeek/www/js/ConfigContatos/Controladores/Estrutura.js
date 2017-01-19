'use strict';

angular.module('QuickPeek.Estrutura.ConfigContatos', [
    'RB.gcs',
    'RB.config',
    'RB.pagina',
    'RB.validacoesPadroes'
])

.factory('ConfigContatosEstrutura', ['GCS','Config','Pagina','VP',
    function(GCS,Config,Pagina,VP) {
    var scope;  
    
    function setScope(obj){
        scope = obj;
        return this;
    }
    
    function popular(){
        scope.dados = {
            contato:0
        };
        
        if(DGlobal.dadosUser && DGlobal.dadosUser.success){
            scope.dados.contato = DGlobal.dadosUser.dados.contato;
        }
    };
  
    return {
        setScope:setScope,
        popular:popular
    };
 }]);
