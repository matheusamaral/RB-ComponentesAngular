'use strict';

angular.module('QuickPeek.Acoes.PerguntasLocal', [ 
    'RB.pagina',
    'QuickPeek.Requisicao.PerguntasLocal',
    'RB.validacoesPadroes'
])

.factory('PerguntasLocalAcoes', ['Pagina','PerguntasLocalRequisicoes','VP','$timeout',
    function(Pagina,PessoasLocalRequisicoes,VP,$timeout){
    var scope,conn;  
    
    function setScope(obj){
        scope = obj;
        return this;
    };
    
    function configConexao(){
        conn = new WebSocket('ws://192.168.0.121:8801');
        var cont = 0;
        
        conn.onopen = function(e) {
            console.log("Connection established!");
        };

        //método disparado quando alguem da conexão fazer pergunta
        conn.onmessage = function(e){
            adicionaPergunta(JSON.parse(e.data));
        };
        
        $timeout(function(){
            preparaPagina();
        },300);
    }
    
    function preparaPagina(){
        if(DGlobal.acaoCliente && DGlobal.acaoCliente.idPagina)
            var idPagina = DGlobal.acaoCliente.idPagina;
        
        if(DGlobal.idLocal)
            var idLocal = DGlobal.idLocal;
        
        var obj = {
            codsessrt: JSON.parse(localStorage.getItem("dadosSessao")).codsessrt,
            processo: 'Usuario',
            etapa: 'setarDadosBanco',
            pagina: idPagina+'-'+idLocal
        };
        
        conn.send(JSON.stringify(obj));
    };
    
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
