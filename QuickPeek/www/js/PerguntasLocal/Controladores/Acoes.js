'use strict';

angular.module('QuickPeek.Acoes.PerguntasLocal', [ 
    'RB.pagina',
    'QuickPeek.Requisicao.PerguntasLocal',
    'RB.validacoesPadroes'
])

.factory('PerguntasLocalAcoes', ['Pagina','PerguntasLocalRequisicoes','VP','Websocket',
    function(Pagina,PessoasLocalRequisicoes,VP,Websocket){
    var scope,conn;  
    
    function setScope(obj){
        scope = obj;
        return this;
    };
    
    function configConexao(){
        if(DGlobal.acaoCliente && DGlobal.acaoCliente.idPagina)
            var idPagina = DGlobal.acaoCliente.idPagina;
        
        if(DGlobal.idLocal)
            var idLocal = DGlobal.idLocal;
        
        Websocket.setarPagina(idPagina,idLocal,adicionaPergunta);
    }
    
    function voltarLocais(){
        Pagina.navegar({idPage:24});
    }
    
    function adicionaPergunta(pergunta){
        console.log(pergunta);
        scope.dados.perguntas.push(pergunta);
    }
    
    function responder(id){
        DGlobal.idPergunta = id;
        Pagina.navegar({idPage:34,paramAdd:'?perguntasId='+id});
    }
    
    return {
        setScope:setScope,
        voltarLocais:voltarLocais,
        configConexao:configConexao,
        responder:responder
    };
    
 }]);
