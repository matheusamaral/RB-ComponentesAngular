'use strict';

angular.module('QuickPeek.Acoes.Respostas', [ 
    'RB.pagina',
    'QuickPeek.Requisicao.Respostas',
    'RB.validacoesPadroes'
])

.factory('RespostasAcoes', ['Pagina','RespostasRequisicoes','VP','$timeout','Websocket','InfinitScroll',
    function(Pagina,RespostasRequisicoes,VP,$timeout,Websocket,InfinitScroll){
    var scope;  
    
    function setScope(obj){
        scope = obj;
        scope.dados.moredata = false;
        scope.digitandoObj = false;
        return this;
    };
    
    function addCss(){
        $('ion-side-menu-content').addClass('background-cinza');
        $timeout(function(){
            scope.alturaChat = $('#container-input').height();
            scope.alturaBody = $('body').height();
            scope.larguraBody = $('body').width();
            $('#container-respostas').animate({scrollTop:$('#container-respostas > div > div').height()}, 'slow');
        },1000);
        iniciarInfinitScroll();
    }
    
    function setarCursorInicio(){
        $('#container-respostas').animate({scrollTop:$('#container-respostas > div > div').height()}, 'slow');
    }
    
    function configConexao(){
        addCss();
        
        if(DGlobal.acaoCliente && DGlobal.acaoCliente.idPagina)
            var idPagina = DGlobal.acaoCliente.idPagina;
        
        scope.conn = Websocket.setarPagina(idPagina,scope.dados.idPergunta,acaoReal);
    }
    
    function responder(){
        if(scope.dados.resposta != ''){
            scope.conn.send(JSON.stringify({
                codsessrt:JSON.parse(localStorage.getItem("dadosSessao")).codsessrt,
                processo:'Acoes',
                etapa:'respostas',
                'Respostas::titulo':scope.dados.resposta, 
                'Respostas::perguntasId':scope.dados.idPergunta
            }));
        }
    }
    
    function digitando(){
        calcularTxtAreaAltura()
        scope.conn.send(JSON.stringify({
            codsessrt:JSON.parse(localStorage.getItem("dadosSessao")).codsessrt,
            processo:'Acoes',
            etapa:'digitando',
            PerguntaId:scope.dados.idPergunta
        }));
    }
    
    function acaoReal(resposta){
        console.log(resposta);
        if(resposta && resposta.respostaId)
            addResp(resposta);
        
        if(resposta && resposta.digitando == 1 && resposta.remetente != 1)
            confirmaDigitando(resposta);
    }
    
    function confirmaDigitando(resposta){
        scope.$apply();
        scope.digitandoObj = {
            idDigitando:resposta.usuarioId,
            endereco:resposta.endereco
        };
        
        $timeout.cancel(scope.timeDigitando);
        scope.timeDigitando = $timeout(function(){
            scope.digitandoObj = false;
            //
        },1000);
    }
    
    function addResp(resposta){
        scope.dados.respostas.unshift(resposta);
        if(resposta.remetente == 1)scope.dados.resposta = '';
        $timeout(function(){
            $('#container-respostas').animate({scrollTop:$('#container-respostas > div > div').height()}, 'slow');
        },0);
        scope.$apply();
    }
    
    function carregarRespostas(){
        var obj = {
            atualizando:true,
            perguntasId:scope.dados.idPergunta
        };
        
        $timeout(function(){
            RespostasRequisicoes.set({dados:obj,scope:scope,acaoSuccess:RespostasRequisicoes.successListarRespostas}).listarRespostas();
        },0);
    }
    
    function addMarginTeclado(){
        //alert('focus');
        //scope.divBranco = true;
        addCss();
    }
    
    function removeMarginTeclado(){
        addCss();
    }
    
    function voltarPerguntas(){
        Pagina.navegar({idPage:27,paramAdd:'?localId='+DGlobal.idLocal});
    }
    
    function attPrivacidade(){
        Pagina.navegar({idPage:38});
    }
    
    function iniciarInfinitScroll(){
        InfinitScroll.iniciar({
            top:true,
            idSeletor:'container-respostas',
            acaoTop:carregarRespostas
        });
    }
    
    function calcularTxtAreaAltura(){
        $("#txtChat").bind("input", function(e) {
            while( $(this).outerHeight() < this.scrollHeight +
                                           parseFloat($(this).css("borderTopWidth")) +
                                           parseFloat($(this).css("borderBottomWidth"))
                   && $(this).height() < 100 // Altura máxima
            ) {
                $(this).height($(this).height()+1);
            };
        });
    }
    
    window.addEventListener('native.keyboardshow', keyboardShowHandler);

    function keyboardShowHandler(e){
        //alert('Keyboard height is: ' + e.keyboardHeight);
        addMarginTeclado();
    }
    
    window.addEventListener('native.keyboardhide', keyboardHideHandler);

    function keyboardHideHandler(e){
        removeMarginTeclado();
    }
    
    return {
        setScope:setScope,
        configConexao:configConexao,
        responder:responder,
        setarCursorInicio:setarCursorInicio,
        carregarRespostas:carregarRespostas,
        digitando:digitando,
        addMarginTeclado:addMarginTeclado,
        removeMarginTeclado:removeMarginTeclado,
        voltarPerguntas:voltarPerguntas,
        attPrivacidade:attPrivacidade
    };
    
 }]);
