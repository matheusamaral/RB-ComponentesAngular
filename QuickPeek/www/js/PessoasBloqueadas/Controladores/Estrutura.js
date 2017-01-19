'use strict';

angular.module('QuickPeek.Estrutura.PessoasBloqueadas', [
    'RB.gcs',
    'RB.config',
    'RB.pagina',
    'RB.validacoesPadroes'
])

.factory('PessoasBloqueadasEstrutura', ['GCS','Config','Pagina','VP',
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
        
        if(DGlobal.pessoasBloqueadas && DGlobal.pessoasBloqueadas.success){
            scope.dados.pessoas = DGlobal.pessoasBloqueadas.dados;
        }
    };
  
    return {
        setScope:setScope,
        popular:popular
    };
 }]);
