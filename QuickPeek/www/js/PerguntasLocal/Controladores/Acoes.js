'use strict';

angular.module('QuickPeek.Acoes.PerguntasLocal', [ 
    'RB.pagina',
    'QuickPeek.Requisicao.PerguntasLocal',
    'RB.validacoesPadroes'
])

.factory('PerguntasLocalAcoes', ['Pagina','PerguntasLocalRequisicoes','VP','Websocket',
    function(Pagina,PerguntasLocalRequisicoes,VP,Websocket){
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
        
        scope.conn = Websocket.setarPagina(idPagina,idLocal,executarResposta,'quickpeek.rubeus.com.br:9876');
    }
    
    function voltarLocais(){
        Pagina.rollBack();
    }
    
    function executarResposta(resposta){
        console.log('resposta');
        console.log(resposta);
        if(resposta && resposta.pergunta == 0){
            editarPergunta(resposta);
        }
        
        if(resposta && resposta.pergunta == 1){
            addPergunta(resposta);
        }
    }
    
    function addPergunta(pergunta){
        scope.dados.perguntas.unshift(pergunta);
        scope.$apply();
    }
    
    function editarPergunta(resposta){
        for(var i = 0; i < scope.dados.perguntas.length; i++){
            if(scope.dados.perguntas[i].id == resposta.perguntaId){
                scope.dados.perguntas[i].respostas++;
            }
        }
        scope.$apply();
    }
    
    function responder(id,perg){
        DGlobal.idPergunta = id;
        DGlobal.pergunta = perg;
        var obj = {perguntasId:id};
        PerguntasLocalRequisicoes.set({dados:obj,scope:scope,acaoSuccess:PerguntasLocalRequisicoes.successVerificar}).verfificarResposta();
    }
    
    return {
        setScope:setScope,
        voltarLocais:voltarLocais,
        configConexao:configConexao,
        responder:responder
    };
    
 }]);
