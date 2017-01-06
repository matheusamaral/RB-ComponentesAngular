'use strict';

angular.module('QuickPeek.Estrutura.PessoasLocal', [
    'RB.gcs',
    'RB.config',
    'RB.pagina',
    'RB.validacoesPadroes'
])

.factory('PessoasLocalEstrutura', ['GCS','Config','Pagina','VP',
    function(GCS,Config,Pagina,VP) {
    var scope;  
    
    function setScope(obj){
        scope = obj;
        return this;
    }
    
    function popular(){
        scope.dados = {pessoas:new Array()};
    
        if(DGlobal.pessoas && DGlobal.pessoas.success){
            scope.dados.pessoas = DGlobal.pessoas.dados;
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
