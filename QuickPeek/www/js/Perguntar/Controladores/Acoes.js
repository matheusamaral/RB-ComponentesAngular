'use strict';

angular.module('QuickPeek.Acoes.Perguntar', [ 
    'RB.pagina',
    'QuickPeek.Requisicao.Perguntar',
    'RB.validacoesPadroes'
])

.factory('PerguntarAcoes', ['Pagina','PerguntarRequisicoes','VP','Websocket',
    function(Pagina,PerguntarRequisicoes,VP,Websocket){
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
        
        scope.conn = Websocket.setarPagina(idPagina,idLocal,executarResposta);
    }
    
    function voltarLocais(){
        Pagina.navegar({idPage:24,paramAdd:'?latitude='+DGlobal.coordenadasAtual.latitude+'&longitude='+DGlobal.coordenadasAtual.longitude+'&localId='+DGlobal.idLocal+'&atualizando=0'});
    }
    
    function executarResposta(resposta){
        console.log('resposta');
        console.log(resposta);
        if(resposta){
            voltarLocais(resposta);
        }
    }
    
    function perguntar(){
        scope.conn.send(JSON.stringify({
            codsessrt:JSON.parse(localStorage.getItem("dadosSessao")).codsessrt,
            processo:'Acoes',
            etapa:'perguntas',
            'Perguntas::localId':DGlobal.idLocal,
            'Perguntas::titulo':scope.dados.pergunta,
            'Perguntas::visibilidadeId':scope.dados.privacidade
        }));
    }
    
    return {
        setScope:setScope,
        voltarLocais:voltarLocais,
        configConexao:configConexao,
        perguntar:perguntar
    };
    
 }]);
