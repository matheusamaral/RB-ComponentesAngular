'use strict';

angular.module('QuickPeek.Acoes.Respostas', [ 
    'RB.pagina',
    'QuickPeek.Requisicao.Respostas',
    'RB.validacoesPadroes'
])

.factory('RespostasAcoes', ['Pagina','RespostasRequisicoes','VP','$timeout','Websocket',
    function(Pagina,RespostasRequisicoes,VP,$timeout,Websocket){
    var scope;  
    
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
        addCss();
        
        if(DGlobal.acaoCliente && DGlobal.acaoCliente.idPagina)
            var idPagina = DGlobal.acaoCliente.idPagina;
        
        scope.conn = Websocket.setarPagina(idPagina,scope.dados.idPergunta,adicionarResposta);
    }
    
    function responder(){
        scope.conn.send(JSON.stringify({
            codsessrt:JSON.parse(localStorage.getItem("dadosSessao")).codsessrt,
            processo:'Acoes',
            etapa:'respostas',
            'Respostas::titulo':scope.dados.resposta, 
            'Respostas::perguntasId':scope.dados.idPergunta
        }));
    }
    
    function adicionarResposta(resposta){
        console.log(resposta);
        scope.dados.respostas.push(resposta);
    }
    
    return {
        setScope:setScope,
        configConexao:configConexao,
        responder:responder,
        setarCursorInicio:setarCursorInicio
    };
    
 }]);
