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
            visibilidade:'',
            visibilidadeTitulo:''
        };
        
        scope.dados.vistoUltimoOp = [
            {id:1,titulo:'Todos'},
            {id:2,titulo:'Meus seguidores'},
            {id:3,titulo:'Ninguém'}
        ];
        
        if(DGlobal.dadosUsuario && DGlobal.dadosUsuario.success){
            alert(JSON.stringify(DGlobal.dadosUsuario.dados));
            scope.dados.visibilidade = DGlobal.dadosUsuario.dados.visibilidadeId;
            scope.dados.contaPrivada = DGlobal.dadosUsuario.dados.contaPrivada;
            scope.dados.bloqueados = DGlobal.dadosUsuario.dados.bloqueados;
            for(var i = 0;i < scope.dados.vistoUltimoOp.length; i++){
                if(scope.dados.vistoUltimoOp[i].id == scope.dados.visibilidade){
                    scope.dados.visibilidadeTitulo = scope.dados.vistoUltimoOp[i].titulo; 
                }
            }
        }
    };
  
    return {
        setScope:setScope,
        popular:popular
    };
 }]);
