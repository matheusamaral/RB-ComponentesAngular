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
        if($('ion-side-menu-content').hasClass('background-cinza')){
            $('ion-side-menu-content').removeClass('background-cinza');
        }
        return this;
    };

    function configConexao(){
        if(DGlobal.acaoCliente && DGlobal.acaoCliente.idPagina)
            var idPagina = DGlobal.acaoCliente.idPagina;

        if(DGlobal.idLocal)
            var idLocal = DGlobal.idLocal;
        console.log(refAmbienteWs,'=====');
        scope.conn = Websocket.setarPagina(idPagina,false,executarResposta,refAmbienteWs);
    }

    function voltarLocais(){
        Pagina.rollBack();
    }

    function executarResposta(resposta){
        console.log('resposta');
        console.log(resposta);
        if(resposta.remetente == 1){
            Pagina.navegar({idPage:27,paramAdd:'?localId='+DGlobal.idLocal});
        }
    }

    function perguntar(){
        console.log('dados perguntados '+JSON.stringify({
            codsessrt:JSON.parse(localStorage.getItem("dadosSessao")).codsessrt,
            processo:'Acoes',
            etapa:'perguntas',
            'Perguntas::localId':DGlobal.idLocal,
            'Perguntas::titulo':scope.dados.pergunta,
            'Perguntas::visibilidadeId':scope.dados.privacidade
        }));
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
