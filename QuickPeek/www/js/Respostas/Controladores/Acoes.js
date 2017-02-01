'use strict';

angular.module('QuickPeek.Acoes.Respostas', [ 
    'RB.pagina',
    'QuickPeek.Requisicao.Respostas',
    'RB.validacoesPadroes'
])

.factory('RespostasAcoes', ['Pagina','RespostasRequisicoes','VP','$timeout','Websocket','InfinitScroll','RespostasAcoesCamera',
    function(Pagina,RespostasRequisicoes,VP,$timeout,Websocket,InfinitScroll,RespostasAcoesCamera){
    var scope;  
    
    function setScope(obj){
        scope = obj;
        scope.dados.moredata = false;
        scope.digitandoObj = false;
        return this;
    };
    
    function addCss(){
        $('ion-side-menu-content ion-content').addClass('background-cinza');
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
    
    function enviarMidia(url){
        window.plugins.Base64.encodeFile(url, function(base64){
            scope.dados.base64 = base64;
        });
        
        $timeout(function(){
            var extensao = scope.dados.base64.split(';')[0].split('/')[1];
            scope.conn.send(JSON.stringify({
                codsessrt:JSON.parse(localStorage.getItem("dadosSessao")).codsessrt,
                processo:'Acoes',
                etapa:'respostas',
                ArquivoBase64:scope.dados.base64,
                'Respostas::perguntasId':scope.dados.idPergunta,
                Extensao:extensao
            }));
        },0);
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
        if(resposta.remetente == 1 && !resposta.enderecoMidia)scope.dados.resposta = '';
        if(resposta.enderecoMidia){
            resetaEstrutura();
        }
        $timeout(function(){
            $('#container-respostas').animate({scrollTop:$('#container-respostas > div > div').height()}, 'slow');
        },0);
        scope.$apply();
    }
    
    function resetaEstrutura(){
        scope.cameraPrev.tirouFoto = false;
        scope.exibirBarra = false;
        scope.camera.stopCamera();
        scope.previewAberto = false;
        scope.cameraFull = false;
        $('html,body,ion-side-menus.view,ion-side-menu-content').addClass('background-cinza');
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
    
    function irDados(){
        Pagina.navegar({idPage:40,paramAdd:'?perguntasId='+DGlobal.idPergunta});
    }
    
    function abrirCamera(){
        RespostasAcoesCamera.setScope(scope).iniciar();
    }
    
    function exibirMidiaChat(midia){
        if(!scope.cameraPrev) scope.cameraPrev = {};
        scope.cameraPrev.tirouFoto = true;
        scope.cameraPrev.urlImg = midia;
        scope.sumirBtn = true;
    }
    
    function abrirBarraTools(){
        scope.exibirBarra = true;
        abrirCamera();
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
        attPrivacidade:attPrivacidade,
        irDados:irDados,
        abrirCamera:abrirCamera,
        enviarMidia:enviarMidia,
        exibirMidiaChat:exibirMidiaChat,
        abrirBarraTools:abrirBarraTools
    };
    
 }])
 
.factory('RespostasAcoesCamera', ['VP','$timeout',
    function(VP,$timeout){
    var scope;  
    var tapEnabled = false;
    var dragEnabled = false;
    var toBack = true;
    
    function setScope(obj){
        scope = obj;
        scope.cameraPrev = {};
        scope.camera = cordova.plugins.camerapreview;
        return this;
    };
    
    function iniciar(){
    
        scope.cameraPrev.containerImgAltura = $('body').width();
        
        scope.girarcamera = function (){
            $timeout(function(){
                scope.camera.switchCamera();
            },1000);
        };
        
        scope.cameraPrev.instanciaCamera = function(){
            scope.camera.setOnPictureTakenHandler(function(result){
                //preparaImg(result[1]);
                //document.getElementById(cameraPrev).src = result[1]; //originalPicturePath;
                scope.tirouFoto(result[1]);
            });
        };
        
        scope.tirouFoto = function(url){
            scope.cameraPrev.tirouFoto = true;
            scope.cameraPrev.urlImg = url;
            $timeout(function(){
                scope.$apply();
            },0);
        };

        scope.cameraPrev.iniciarCamera = function(){
            scope.camera.startCamera({
                x: 0,
                y: ($('body').height() - scope.cameraPrev.containerImgAltura),
                width: $('body').width(),
                height: scope.cameraPrev.containerImgAltura
            }, "rear", tapEnabled, dragEnabled, toBack);
            scope.girarcamera();
        };
        
        scope.cameraPrev.iniciarCameraFull = function(){
            scope.camera.stopCamera();
            scope.cameraFull = true;
            $timeout(function(){
                scope.cameraPrev.instanciaCamera();
                $timeout(function(){
                    scope.cameraPrev.containerImgAltura = $('body').height();
                    cordova.plugins.camerapreview.startCamera({
                        x: 0,
                        y: 0,
                        width: $('body').width(),
                        height: $('body').height()
                    }, "rear", tapEnabled, dragEnabled, toBack);
                    rolarChat();
                    scope.girarcamera();
                },0);
            },0);
        };
        
        criaEpacoTransparente();
        
        scope.cameraPrev.resetarCamera = function(){
            scope.camera.stopCamera();
            scope.cameraPrev.containerImgAltura = $('body').width();
            scope.cameraFull = false;
            scope.cameraPrev.instanciaCamera();
            $timeout(function(){
                scope.cameraPrev.iniciarCamera();
                rolarChat();
            },0);
        };
        
        scope.cameraPrev.tirarFoto = function(){  
            scope.sumirBtn = false;
            scope.camera.takePicture();
        };
        
        scope.cameraPrev.instanciaCamera();
        $timeout(function(){
            scope.cameraPrev.iniciarCamera();
        },0);
    }
    
    function criaEpacoTransparente(){
        scope.previewAberto = true;
        addCss();
    }
    
    function addCss(){
        $('html,body,ion-side-menus.view,ion-side-menu-content').addClass('fundo-transparente');
        rolarChat();
    }
    
    function rolarChat(){
        $timeout(function(){
            $('ion-side-menu-content').animate({scrollTop:$('ion-side-menu-content').height()}, 'slow');
            $('ion-side-menu-content').addClass('remove-overflow-preview');
        },1000);
    }
    
    return {
        setScope:setScope,
        iniciar:iniciar
    };
    
 }]);