'use strict';

angular.module('QuickPeek.Acoes.Respostas', [ 
    'RB.pagina',
    'QuickPeek.Requisicao.Respostas',
    'RB.validacoesPadroes'
])

.factory('RespostasAcoes', ['Pagina','RespostasRequisicoes','VP','$timeout',
    function(Pagina,RespostasRequisicoes,VP,$timeout){
    var scope,conn;  
    
    function setScope(obj){
        scope = obj;
        return this;
    };
    
    function addCss(){
        $('ion-side-menu-content').addClass('background-cinza');
        $timeout(function(){
            scope.alturaChat = $('#container-input').height();
            scope.alturaBody = $('body').height();
            scope.larguraBody = $('body').width();
        },0);
    }
    
    function setarCursorInicio(){
        var begin=0;
        var end=0;
        if(scope.dados.resposta != ''){
            $('#txtChat').focus();
            $('#txtChat').setSelectionRange(begin,end);
        }
    }
    
    function configConexao(){
        conn = new WebSocket('ws://192.168.0.121:8801');
        var cont = 0;
        conn.onopen = function(e) {
            console.log("Connection established!");
        };

        //método disparado quando alguem da conexão fazer pergunta
        conn.onmessage = function(e){
            adicionarResposta(JSON.parse(e.data));
        };
        
        $timeout(function(){
            preparaPagina();
            addCss();
        },300);
    }
    
    function preparaPagina(){
        if(DGlobal.acaoCliente && DGlobal.acaoCliente.idPagina)
            var idPagina = DGlobal.acaoCliente.idPagina;
        
        var obj = {
            codsessrt: JSON.parse(localStorage.getItem("dadosSessao")).codsessrt,
            processo: 'Usuario',
            etapa: 'setarDadosBanco',
            pagina: idPagina+'-'+scope.dados.idPergunta
        };
        
        conn.send(JSON.stringify(obj));
    };
    
    function responder(){
        console.log(scope.dados);
        conn.send(JSON.stringify({
            codsessrt:JSON.parse(localStorage.getItem("dadosSessao")).codsessrt,
            processo:'Acoes',
            etapa:'perguntas',
            'Perguntas::titulo':scope.dados.resposta, 
            'Perguntas::perguntasId':scope.dados.idPergunta
        }));
    }
    
    function adicionarResposta(resposta){
        console.log(resposta);
    }
    
    return {
        setScope:setScope,
        configConexao:configConexao,
        responder:responder,
        setarCursorInicio:setarCursorInicio
    };
    
 }]);
