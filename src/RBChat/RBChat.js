'use strict';

angular.module('RB.Chat',[
    'RB.validacoesPadroes',
    'RB.ChatRequisicoes',
    'RB.pagina',
    'RB.ChatCamera'
])

.factory('RBChat', ['Pagina','InfinitScroll','$timeout','RBChatGifs','RBChatCamera','RBChatWebSocket','RBChatRequisicoes','RBChatGaleria','$ionicPlatform',
    function (Pagina,InfinitScroll,$timeout,RBChatGifs,RBChatCamera,RBChatWebSocket,RBChatRequisicoes,RBChatGaleria,$ionicPlatform){
        var scope;
        var nomeObj;
        
        function setScope(obj){
            scope = obj;
            return this;
        };
        
        function addCss(nAnimar){
            $('ion-side-menu-content, ion-side-menu-content ion-content').addClass('background-cinza');
            $timeout(function(){
                scope.alturaChat = $('#container-input').height();
                scope.alturaBody = $('body').height();
                scope.larguraBody = $('body').width();
                //if(!nAnimar)$('#container-respostas').animate({scrollTop:$('#container-respostas > div > div').height(),duration:0});
                inicializarEmoticons();
            },0);
        }
        
        function inicializarEmoticons(){
            $(function() {
                //Initializes and creates emoji set from sprite sheet
//                window.emojiPicker = new EmojiPicker({
//                    emojiable_selector: '[data-emojiable=true]',
//                    assetsPath: 'lib/emoji-picker-gh-pages/lib/img',
//                    popupButtonClasses: 'fa fa-smile-o'
//                });
//                //Finds all elements with `emojiable_selector` and converts them to rich emoji input fields
//                //You may want to delay this step if you have dynamically created input fields that appear later in the loading process
//                //It can be called as many times as necessary; previously converted input fields will not be converted again
//                window.emojiPicker.discover();
//              
//                $timeout(function(){
//                    $('i.emoji-picker-icon').click(function(){
//                        scope.rbChat.liberaTeclado = false;
//                        $('.emoji-wysiwyg-editor').blur();
//                        $timeout(function(){
//                            $('.emoji-wysiwyg-editor').on('click', function(e){
//                                scope.rbChat.liberaTeclado = true;
//                            });
//                            
//                            $('.emoji-wysiwyg-editor').on('focus', function(e){
//                                if(scope.rbChat.liberaTeclado == false)
//                                    $('.emoji-wysiwyg-editor').blur();
//                            });
//                        },0);
//                    });
//                },0);
            });
        }
        
        function iniciarInfinitScroll(metodoInfinitScroll){
            InfinitScroll.iniciar({
                top:true,
                idSeletor:'container-respostas',
                acaoTop:metodoInfinitScroll
            });
        }
        
        function iniciaAltura(){
            $timeout(function(){
                scope.rbChat.empurraChat = $('#container-input').height();
                scope.larguraBody = $('body').width();
            },0);
        }
        
        function inicializaFactorys(metodoWebSocket,idAuxiliarWebSocket){
            RBChatGifs.setScope(scope).popular();
            RBChatWebSocket.setScope(scope).iniciar(metodoWebSocket,idAuxiliarWebSocket);
        }
        
        function inicializar(
            nomeObjeto,
            metodoWebSocket,
            idAuxiliarWebSocket,
            metodoInfinitScroll,
            metodoMidia,
            metodoResponder,
            metodoDigitando,
            metodoGif,
            respostas,
            pergunta,
            metodoPrivacidade,
            dadosConversa,
            metodoBloquear,
            metodoDesbloquear,
            metodoVoltar,
            metodoConfigurar
        ){

            nomeObj = nomeObjeto;
            
            window.addEventListener('native.keyboardshow', keyboardShowHandler);

            function keyboardShowHandler(e){
                alert(scope.rbChat.abaSelecionada);
                if(scope.rbChat.abaSelecionada == 0)
                    scope.rbChat.empurraChat = e.keyboardHeight + $('#container-input').height();
                else
                    scope.rbChat.empurraChat = e.keyboardHeight + $('.pai-gifs').height();
                
                $timeout(function(){
                    scope.rbChat.rolarChat();
                },0);
            }
            
            scope.rbChat = {
                nomeObj : nomeObj,
                alturaEspacoChat : $('#container-input').height(),
                abaSelecionada:0,
                pergunta:pergunta,
                respostas:respostas,
                dadosConversa:dadosConversa
            };
            
            if(!scope.rbChat.respostas)scope.rbChat.respostas = new Array();
            
            inicializaFactorys(metodoWebSocket,idAuxiliarWebSocket);
            
            scope.rbChat.responder = function(){
                metodoResponder();
                metodoConfigurar();
                $('.container-chat-geral').removeClass('remove-overflow-preview');
            };
            
            scope.rbChat.scrollBottom = function(indice){
                $timeout(function(){
                    $('#container-respostas').scrollTop(parseInt($('#container-respostas > div > div').height()));
                    $('.efeitoChat').addClass('visivel');
                },1000);
            };
            
            scope.rbChat.fecharTeclado = function(aba){
                scope.rbChat.alturaChatAnterior = $('#container-input').height();
                scope.rbChat.abaSelecionada = aba;
                //$timeout(function(){
                scope.rbChat.empurraChat = $('body').width();
                $timeout(function(){
                    scope.rbChat.rolarChat();
                    scope.rbChat.abrirMenu();
                },0);
            };
            
            function mudarComportamentoBackButton(){
                $ionicPlatform.registerBackButtonAction(
                    function (e){
                        e.stopPropagation();
                        e.preventDefault();
                        if(scope.rbChat.abaSelecionada == 1)scope.rbChat.voltarTeclado(0);
                        else scope.rbChat.fecharGif();
                        restauraComportamentoPadraoBackButton();
                        return false;
                    },101
                );
            }
            
            function restauraComportamentoPadraoBackButton(){
                $ionicPlatform.registerBackButtonAction(
                function (e){
                    e.stopPropagation();
                    e.preventDefault();
                    Pagina.rollBack();
                    return false;
                },101);
            }
            
            scope.rbChat.enviarMidia = function(url){
                metodoMidia(url);
                $('.container-chat-geral').removeClass('remove-overflow-preview');;
            };
            
            scope.rbChat.attPrivacidade = metodoPrivacidade;
            
            scope.rbChat.buscarGif = RBChatGifs.buscarGif;
            
            if(metodoBloquear)scope.rbChat.bloquearUser = metodoBloquear;
            if(metodoDesbloquear)scope.rbChat.desbloquearUser = metodoDesbloquear;
            
            scope.rbChat.voltar = function(){
                if(scope.rbChat.fecharCamera)scope.rbChat.fecharCamera();
                Pagina.rollBack(metodoVoltar);
            };
            
            scope.rbChat.enviarGif = function(gif){
                metodoGif(gif);
                $('.container-chat-geral').removeClass('remove-overflow-preview');
                $timeout(function(){
                    scope.rbChat.fecharGif();
                },0);
            };
                
            scope.rbChat.fecharGif = function(){
                scope.rbChat.abaSelecionada = 0;
                $('.container-chat-geral').removeClass('remove-overflow-preview');
                $timeout(function(){
                    recalculaAlturaChat(0);
                },200);
            };
            
            scope.rbChat.exibirMidiaChat = function (midia,sumir){
                scope.rbChat.tirouFoto = true;
                sobrescreverMetodoTeclado();
                if(midia.split('.')[midia.split('.').length - 1] == 'gif')
                    midia = midia.replace('100.gif','giphy.gif');
                scope.rbChat.tirouFoto = midia;
                //scope.$apply();
                scope.rbChat.sumirBtn = sumir;
            };
            
            scope.rbChat.fecharExibirMidia = function(renovar){
                restauraComportamentoPadraoBackButton();
                scope.rbChat.tirouFoto = false;
                if(scope.rbChat.camFull)scope.rbChat.camFull = false;
                if(scope.rbChat.abaSelecionada == 2){
                    scope.rbChat.menuAberto = false;
                    scope.rbChat.abaSelecionada = 0;
                    $timeout(function(){
                        scope.rbChat.empurraChat = $('#container-input').height();
                    },0);
                }
                if(renovar)scope.$apply();
            };
            
            function sobrescreverMetodoTeclado(){
                $ionicPlatform.registerBackButtonAction(
                    function (e){
                        e.stopPropagation();
                        e.preventDefault();
                        scope.rbChat.fecharExibirMidia(true);
                        return false;
                    },101
                );
            }
            
            scope.rbChat.abrirMenu = function(){
                mudarComportamentoBackButton();
                $timeout(function(){
                    scope.rbChat.liberaBtns = false;
                    scope.rbChat.menuAberto = true;
                    $('.container-chat-geral').addClass('remove-overflow-preview');
                    //$timeout(function(){
                        if(scope.rbChat.abaSelecionada == 1){
                            scope.rbChat.abrirCamBtn();
                        }
                    //},200);
                },0);
            };
            
            scope.rbChat.abrirCamBtn = function(indice){
                if(indice)scope.rbChat.abaSelecionada = indice;
                //$timeout(function(){
                recalculaAlturaChat(scope.rbChat.abaSelecionada,scope.rbChat.abrirCamera);
                //},200);
            };
            
            scope.rbChat.abrirGifs = function(indice){
                if(scope.rbChat.abaSelecionada == 1){
                    if(scope.rbChat.fecharCamera)scope.rbChat.fecharCamera();
                }
                
                //$timeout(function(){
                    //scope.rbChat.abaSelecionada = indice;
                    recalculaAlturaChat(indice);
                //},200);
                //recalculaAlturaChat(scope.rbChat.abaSelecionada,scope.rbChat.abrirCamera);
            };
            
            scope.rbChat.abrirGlr = function(abaAtual){
                if(scope.rbChat.abaSelecionada == 1){
                    scope.rbChat.fecharCamera();
                }
                
                scope.rbChat.abaSelecionada = 2;
                RBChatGaleria.abrirGaleria(scope);
            };
            
            function selecionarInput(){
                //$timeout(function(){
                    $('#txtChat').focus();
                //},200);
            }
            
            scope.rbChat.abrirCamera = function(){
                RBChatCamera.iniciar(scope);
            };
            
            scope.rbChat.rolarChat = function (){
                alert('ROLOU');
                $('#container-respostas').scrollTop(parseInt($('#container-respostas > div > div').height()));
                $('ion-side-menu-content').addClass('remove-overflow-preview');
            };
            
            scope.rbChat.calcularTxtAreaAltura = function(){
                $("#txtChat").bind("input", function(e) {
                    while( $(this).outerHeight() < this.scrollHeight +
                                                   parseFloat($(this).css("borderTopWidth")) +
                                                   parseFloat($(this).css("borderBottomWidth"))
                           && $(this).height() < 100 // Altura máxima
                    ) {
                        $(this).height($(this).height()+1);
                    };
                });
            };
            
            scope.rbChat.buscarGif = function(){
                var obj = {
                    pesquisa:scope.rbChat.gifSearch
                };

                $timeout.cancel(scope.timeoutGif);

                scope.timeoutGif = $timeout(function(){
                    RBChatRequisicoes.set({scope:scope,dados:obj,acaoSuccess:RBChatRequisicoes.successBuscarGif}).buscarGif();
                },500);
            };
            
            scope.rbChat.digitando = function(){
                metodoDigitando();
            };
            
            if(DGlobal.statusOnline && DGlobal.statusOnline.success){
                if(DGlobal.statusOnline.online || DGlobal.statusOnline.online == 0){
                    if(DGlobal.statusOnline.online == 1)
                        scope.rbChat.userOnline = true;
                    else
                        scope.rbChat.userOnline = false;
                }
            }
            
            scope.rbChat.voltarTeclado = function(novaAba){
                $('.container-chat-geral').removeClass('remove-overflow-preview');
                if(scope.rbChat.abaSelecionada == 1){
                    scope.rbChat.fecharCamera();
                }

                //$timeout(function(){
                    recalculaAlturaChat(0,selecionarInput);
                //},200);
            };
            
            iniciaAltura();
            iniciarInfinitScroll(metodoInfinitScroll);
            addCss();
        }
        
        function recalculaAlturaChat(indice,metodo){
            if(indice == 0){
                scope.rbChat.abaSelecionada = indice;
                if(scope.rbChat.menuAberto)scope.rbChat.menuAberto = false;
                $timeout(function(){
                    scope.rbChat.empurraChat = scope.rbChat.alturaChatAnterior;
                    $timeout(function(){
                        scope.rbChat.rolarChat();
                        //$timeout(function(){

                            //$timeout(function(){

                                if(metodo){
                                    $timeout(function(){
                                        metodo();
                                    },200);
                                }
                            //},200);
                        //},200);
                    },200);
                },0);
            }
            
            if(indice == 1){
                //$timeout(function(){
                    scope.rbChat.empurraChat = $('body').width();
                    $timeout(function(){
                        scope.rbChat.rolarChat();
                        //$timeout(function(){
                            if(metodo){
                                metodo();
                            }
                        //},200);
                    },0);
                //},200);
            }
            
            if(indice == 2){
                scope.rbChat.abaSelecionada = indice;
                scope.rbChat.empurraChat = $('.container-barra-sub-menu').height();
                $timeout(function(){
                    scope.rbChat.rolarChat();
                    
                    if(metodo){
                        $timeout(function(){
                            metodo(scope);
                        },200);
                    }
                },0);
            }
            
            if(indice == 3){
                scope.rbChat.abaSelecionada = indice;
                $timeout(function(){
                    scope.rbChat.empurraChat = $('.pai-gifs').height();
                    $timeout(function(){
                        scope.rbChat.menuAberto = false;
                        scope.rbChat.rolarChat();
                        //$timeout(function(){

                        //},200);
                    },0);
                },0);
            }
            
        }

        return {
            setScope:setScope,
            inicializar:inicializar
        };
    }
])

.factory('RBChatWebSocket', ['VP','$timeout','Websocket',
    function (VP,$timeout,Websocket) {
        var scope;
        
        function setScope(obj){
            scope = obj;
            scope.rbChatWebSocket = {};
            return this;
        };
        
        function iniciar(metodoWebSocket,idAuxiliar){
            configConexao(metodoWebSocket,idAuxiliar);
        }
        
        function configConexao(metodoWebSocket,idAuxiliar){
            if(DGlobal.acaoCliente && DGlobal.acaoCliente.idPagina)
                var idPagina = DGlobal.acaoCliente.idPagina;
            scope.rbChatWebSocket = Websocket.setarPagina(idPagina,idAuxiliar,metodoWebSocket,refAmbienteWs);
        }

        return {
            setScope:setScope,
            iniciar:iniciar
        };
    }
])

.factory('RBChatGaleria', ['VP','$timeout','ImagePicker',
    function (VP,$timeout,ImagePicker) {
        var scope;
        var permissions;
        
        function setScope(obj){
            scope = obj;
            return this;
        };
        
        ionic.Platform.ready(function(){
            if(cordova)permissions = cordova.plugins.permissions;
        });
        
        function iniciar(){
        }
        
        function abrirGaleria(escopo){
            scope = escopo;
            if(ionic.Platform.isAndroid())
                permissions.hasPermission(permissions.READ_EXTERNAL_STORAGE, checkPermissionSTORAGE, null);
            else{
                ImagePicker.setScope(scope).iniciar('rbChat',organizaImg);
            }
        }
        
        function checkPermissionSTORAGE(status) {
            if(!status.hasPermission) {
                var errorCallback = function() {
                    console.warn('Camera permission is not turned on');
                };

                permissions.requestPermission(
                    permissions.READ_EXTERNAL_STORAGE,
                    function(status) {
                    if(!status.hasPermission) errorCallback();
                    else
                        ImagePicker.setScope(scope).iniciar('rbChat',organizaImg);
                    },
                    errorCallback);
            }else{
                $timeout(function(){
                    ImagePicker.setScope(scope).iniciar('rbChat',organizaImg);
                },0);
            }
        }
        
        function organizaImg(img){
            //scope.$apply();
            $('.container-chat-geral').removeClass('remove-overflow-preview');
            scope.rbChat.tirouFoto = img;
            scope.rbChat.sumirBtn = false;
            scope.rbChat.veioGaleria = true;
            if(!img){
                scope.rbChat.menuAberto = false;
                $timeout(function(){
                    scope.rbChat.abaSelecionada = 0;
                    $timeout(function(){
                        scope.rbChat.empurraChat = $('#container-input').height();
                        $timeout(function(){
                            scope.rbChat.rolarChat();
                        },200);
                    },200);
                },200);
            }
        }

        return {
            setScope:setScope,
            iniciar:iniciar,
            abrirGaleria:abrirGaleria
        };
    }
])

.factory('RBChatGifs', ['VP','$timeout','RBChatRequisicoes',
    function (VP,$timeout,RBChatRequisicoes) {
        var scope;
        
        function setScope(obj){
            scope = obj;
            return this;
        };
        
        function popular(){
            if(DGlobal.gifs && DGlobal.gifs.success){
                scope.rbChat.gifs = DGlobal.gifs.dados;
            }
            
            scope.rbChat.ehGif = function(link1,link2){
                if(link1){
                    if(link1.split('.')[link1.split('.').length - 1] == 'gif'){
                        return true;
                    }
                }
                
                if(link2){
                    if(link2.split('.')[link2.split('.').length - 1] == 'gif'){
                        return true;
                    }
                }
                
                return false;
            }
        }
        
        function buscarGif(){
            var obj = {
                pesquisa:scope.rbChat.gifSearch
            };

            $timeout.cancel(scope.timeoutGif);

            scope.timeoutGif = $timeout(function(){
                
                RBChatRequisicoes.set({scope:scope,dados:obj,acaoSuccess:RBChatRequisicoes.successBuscarGif}).buscarGif();
            },1000);
        }

        return {
            setScope:setScope,
            popular:popular,
            buscarGif:buscarGif
        };
    }
]);