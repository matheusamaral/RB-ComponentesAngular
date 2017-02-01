'use strict';

angular.module('QuickPeek.Estrutura.PrivacidadeRespostas', [
    'RB.gcs',
    'RB.config',
    'RB.pagina',
    'RB.validacoesPadroes'
])

.factory('PrivacidadeRespostasEstrutura', ['GCS','$timeout','Pagina','VP',
    function(GCS,$timeout,Pagina,VP) {
    var scope;  
    
    function setScope(obj){
        scope = obj;
        
        return this;
    }
    
    function popular(){
        scope.dados = {visibilidadeId:1};
        
        if(DGlobal.dadosUsuario && DGlobal.dadosUsuario.success){
            scope.dadosUser = DGlobal.dadosUsuario.dados;
        }
        
        if(DGlobal.pergunta){
            scope.dadosPergunta = DGlobal.pergunta;
            console.log(scope.dadosPergunta);
        }
    };
  
    return {
        setScope:setScope,
        popular:popular
    };
 }]);
