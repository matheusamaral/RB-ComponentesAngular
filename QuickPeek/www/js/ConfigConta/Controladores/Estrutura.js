'use strict';

angular.module('QuickPeek.Estrutura.ConfigConta', [
    'RB.gcs',
    'RB.config',
    'RB.pagina',
    'RB.validacoesPadroes'
])

.factory('ConfigContaEstrutura', ['GCS','Config','Pagina','VP',
    function(GCS,Config,Pagina,VP) {
    var scope;  
    
    function setScope(obj){
        scope = obj;
        return this;
    }
    
    function popular(){
        scope.dados = {
            contaPrivada:0,
            visibilidade:2,
            visibilidadeTitulo:'Ninguém'
        };
        
        scope.dados.vistoUltimoOp = [
            {id:0,titulo:'Todos'},
            {id:1,titulo:'Meus seguidores'},
            {id:2,titulo:'Ninguém'}
        ];
    };
  
    return {
        setScope:setScope,
        popular:popular
    };
 }]);
