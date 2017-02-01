'use strict';

angular.module('QuickPeek.Estrutura.DadosPergunta', [
    'RB.pagina',
    'RB.validacoesPadroes'
])

.factory('DadosPerguntaEstrutura', ['Pagina','VP',
    function(Pagina,VP) {
    var scope;  
    
    function setScope(obj){
        scope = obj;
        return this;
    }
    
    function popular(){
        scope.dados = {};
        
        if(DGlobal.dadosPergunta && DGlobal.dadosPergunta.success){
            scope.dados = DGlobal.dadosPergunta.dados
        }
    };
  
    return {
        setScope:setScope,
        popular:popular
    };
 }]);
