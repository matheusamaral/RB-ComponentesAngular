'use strict';

angular.module('QuickPeek.Estrutura.Perguntar', [
    'RB.gcs',
    'RB.config',
    'RB.pagina',
    'RB.validacoesPadroes'
])

.factory('PerguntarEstrutura', ['GCS','Config','Pagina','VP',
    function(GCS,Config,Pagina,VP) {
    var scope;  
    
    function setScope(obj){
        scope = obj;
        return this;
    }
    
    function popular(){
        scope.dados = {
            pergunta:''
        };
        
        scope.privacidades =[
            {id:1,titulo:'Publicamente'},
            {id:2,titulo:'Meus Seguidores'},
            {id:3,titulo:'Anônimamente'}
        ];
        
        scope.dados.privacidade = 1;
        
        if(DGlobal.dadosUsuario && DGlobal.dadosUsuario.success){
            scope.dadosUser = DGlobal.dadosUsuario.dados;
        }
    };
  
    return {
        setScope:setScope,
        popular:popular
    };
 }]);
