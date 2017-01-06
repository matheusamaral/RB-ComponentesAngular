'use strict';

angular.module('QuickPeek.Acoes.PerguntasLocal', [ 
    'RB.pagina',
    'QuickPeek.Requisicao.PerguntasLocal',
    'RB.validacoesPadroes'
])

.factory('PerguntasLocalAcoes', ['Pagina','PerguntasLocalRequisicoes','VP',
    function(Pagina,PessoasLocalRequisicoes,VP){
    var scope;  
    
    function setScope(obj){
        scope = obj;
        
        return this;
    };
    
    function voltarLocais(){
        Pagina.navegar({idPage:24});
    }
    
    return {
        setScope:setScope,
        voltarLocais:voltarLocais
    };
    
 }]);
