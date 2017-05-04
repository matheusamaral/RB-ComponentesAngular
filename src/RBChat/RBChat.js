'use strict';

angular.module('RB.Chat',[
    'RB.validacoesPadroes',
    'RB.ChatRequisicoes',
    'RB.pagina',
    'RB.ChatCamera',
    'RB.ChatWebSocket',
    'RB.ChatGifs'
])

.factory('RBChat', ['Pagina','InfinitScroll','$timeout','RBChatGifs','RBChatCamera',
'RBChatWebSocket','RBChatRequisicoes','RBChatGaleria',
'$ionicPlatform','$rootScope','VP','$ionicScrollDelegate','RBLoadingMobile',
    function (
        Pagina,InfinitScroll,$timeout,RBChatGifs,RBChatCamera,
        RBChatWebSocket,RBChatRequisicoes,RBChatGaleria,
        $ionicPlatform,$rootScope,VP,$ionicScrollDelegate,RBLoadingMobile){
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
                scope.platformAndroid = $rootScope.platformAndroid;
                //if(!nAnimar)$('#container-respostas').animate({scrollTop:$('#container-respostas > div > div').height(),duration:0});
            },0);
        }
        
        function scrollBottom(){
            $timeout(function(){
                $ionicScrollDelegate.$getByHandle('mainScroll').scrollBottom(false);
            },1000);
            $timeout(function(){
                $('.efeitoChat').addClass('visivel');
            },1500);
        };
        
        function iniciarInfinitScroll(metodoInfinitScroll){
            InfinitScroll.iniciar({
                top:true,
                idSeletor:'container-infinit',
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
                //VP.posicionaBarraIos(true,e.keyboardHeight);
                scope.rbChat.alturaTeclado = e.keyboardHeight;
                $timeout(function(){
                    if( ionic.Platform.isAndroid() ){               
                        if(scope.rbChat.abaSelecionada == 0)
                            scope.rbChat.empurraChat = e.keyboardHeight + $('#container-input').height();
                        else
                            scope.rbChat.empurraChat = e.keyboardHeight + $('.pai-gifs').height();
                    }
                },0);
                $timeout(function(){
                    scope.rbChat.rolarChat();
                },0);
            }
            
            window.addEventListener('native.keyboardhide', keyboardHideHandler);

            function keyboardHideHandler(e){
                //VP.posicionaBarraIos(false);
                $timeout(function(){
                    if( ionic.Platform.isAndroid() ){
                        if(scope.rbChat.abaSelecionada == 0)
                            scope.rbChat.empurraChat = $('#container-input').height();
                        if(scope.rbChat.abaSelecionada == 3)
                            scope.rbChat.empurraChat = $('.pai-gifs').height();
                    }
                },0);
                $timeout(function(){
                    scope.rbChat.rolarChat();
                },0);
            }
            
            document.addEventListener('deviceready', function() {
                scrollBottom();
            });
            
            scope.rbChat = {
                nomeObj : nomeObj,
                alturaEspacoChat : $('#container-input').height(),
                abaSelecionada:0,
                pergunta:pergunta,
                respostas:respostas,
                dadosConversa:dadosConversa
            };
            
            if(!scope.rbChat.respostas){
                scope.rbChat.respostas = new Array();
            }else{
                if(pergunta){
                    for(var i = 0 ; i < scope.rbChat.respostas.length;i++){
                        scope.rbChat.respostas[i].statusMensagem = 2
                    }
                }
            }
            
            inicializaFactorys(metodoWebSocket,idAuxiliarWebSocket);
            var enviou = 0;
            
            scope.rbChat.responder = function(e){
                enviou = 1;
                $('#txtAreaChat').blur(
                    function(){
                        if(enviou == 1){
                            $('#txtAreaChat').focus();
                            if(ionic.Platform.isIOS())
                                cordova.plugins.Keyboard.show();
                            enviou = 0;
                        }
                    }
                );
                metodoConfigurar();
                metodoResponder();
                $('.container-chat-geral').removeClass('remove-overflow-preview');
                $timeout(function(){
                   $("#txtAreaChat").height(24); 
                },0);
            };
            
            scope.rbChat.abrirMdMenu = function($event){
//                cordova.plugins.Keyboard.close();
//                $timeout(function(){
//                    $mdOpenMenu($event);
//                },0);
            };
            
            scope.rbChat.fecharTeclado = function(aba){
                if(cordova.plugins.Keyboard.isVisible){
                    cordova.plugins.Keyboard.close();
                }
                $timeout(function(){
                    scope.rbChat.alturaChatAnterior = $('#container-input').height();
                    scope.rbChat.abaSelecionada = aba;
                    //$timeout(function(){
                    scope.rbChat.empurraChat = $('body').width();
                },0);
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
                        if(scope.rbChat.abaSelecionada == 1 && scope.rbChat.tirouFoto && !scope.rbChat.camFull){
                            scope.rbChat.fecharExibirMidia(true);
                        }else{
                            if(scope.rbChat.abaSelecionada == 1 && scope.rbChat.camFull){
                                scope.rbChat.resetarCamera(true);
                            }else{
                                if(scope.rbChat.abaSelecionada == 1 && !scope.rbChat.tirouFoto && !scope.rbChat.camFull){
                                    scope.rbChat.voltarTeclado(0)
                                }else{
                                    if(scope.rbChat.abaSelecionada == 3)
                                        scope.rbChat.fecharGif();
                                    else{
                                        if(scope.rbChat.tirouFoto)scope.rbChat.tirouFoto = false;
                                        Pagina.rollBack();
                                        restauraComportamentoPadraoBackButton();
                                    }
                                }
                            }
                        }
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
                if(scope.rbChat.dadosConversa.bloqueado == 1){
                    scope.rbChat.metodoDesbloquear = function(){
                        metodoConfigurar(url,false);
                        $timeout(function(){
                            metodoMidia(url);
                        },0);
                        $('.container-chat-geral').removeClass('remove-overflow-preview');
                    }
                    metodoDesbloquear(scope.rbChat.metodoDesbloquear);
                }else{
                    metodoConfigurar(url,false);
                    $timeout(function(){
                        metodoMidia(url);
                    },0);
                    $('.container-chat-geral').removeClass('remove-overflow-preview');
                }
            };
            
            scope.rbChat.enviarGif = function(gif){
                if(scope.rbChat.dadosConversa.bloqueado == 1){
                    scope.rbChat.metodoDesbloquear = function(){
                        metodoConfigurar(false, gif.medium);
                        metodoGif(gif);

                        $('.container-chat-geral').removeClass('remove-overflow-preview');
                        $timeout(function(){
                            scope.rbChat.fecharGif();
                        },0);
                    }
                    metodoDesbloquear(scope.rbChat.metodoDesbloquear);
                }else{
                    metodoConfigurar(false, gif.medium);
                    metodoGif(gif);

                    $('.container-chat-geral').removeClass('remove-overflow-preview');
                    $timeout(function(){
                        scope.rbChat.fecharGif();
                    },0);
                }
            };
            
            scope.rbChat.attPrivacidade = metodoPrivacidade;
            
            scope.rbChat.buscarGif = RBChatGifs.buscarGif;
            
            if(metodoBloquear)scope.rbChat.bloquearUser = metodoBloquear;
            if(metodoDesbloquear)scope.rbChat.desbloquearUser = metodoDesbloquear;
            
            scope.rbChat.voltar = function(){
                //if(scope.rbChat.fecharCamera)scope.rbChat.fecharCamera();
                RBLoadingMobile.show('Carregando...');
                $timeout(function(){
                    CameraPreview.stopCamera(sucessClose,function(){});
                },200);
            };
            
            function sucessClose(){
                Pagina.rollBack(metodoVoltar);
                RBLoadingMobile.hide();
            }
                
            scope.rbChat.fecharGif = function(){
                scope.rbChat.abaSelecionada = 0;
                $('.container-chat-geral').removeClass('remove-overflow-preview');
                $timeout(function(){
                    recalculaAlturaChat(0);
                },0);
            };
            
            scope.rbChat.exibirMidiaChat = function (midia,sumir){
                mudarComportamentoBackButton();
                scope.rbChat.tirouFoto = true;
                sobrescreverMetodoTeclado();
                if(midia.split('.')[midia.split('.').length - 1] == 'gif')
                    midia = midia.replace('100.gif','giphy.gif');
                scope.rbChat.tirouFoto = midia;
                scope.rbChat.sumirBtn = sumir;
            };
            
            scope.rbChat.fecharExibirMidia = function(renovar){
                //restauraComportamentoPadraoBackButton();
                scope.rbChat.tirouFoto = false;
                if(scope.rbChat.camFull)scope.rbChat.camFull = false;
                if(scope.rbChat.abaSelecionada != 1)scope.rbChat.fecharCamera();
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
                scope.rbChat.abrindoCamera = true;
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
            
            scope.rbChat.abrirGifs = function(indice,evento){
                VP.pararEvento(evento);
                $timeout(function(){
                    if(scope.rbChat.abaSelecionada == 1){
                        if(scope.rbChat.fecharCamera)scope.rbChat.fecharCamera();
                    }

                //$timeout(function(){
                    //scope.rbChat.abaSelecionada = indice;
                    recalculaAlturaChat(indice);
                },0);
                //},200);
                //recalculaAlturaChat(scope.rbChat.abaSelecionada,scope.rbChat.abrirCamera);
            };
            
            scope.rbChat.abrirGlr = function(abaAtual,evento){
                VP.pararEvento(evento);
                
                $timeout(function(){
                    if(scope.rbChat.abaSelecionada == 1){
                        scope.rbChat.fecharCamera();
                    }

                    scope.rbChat.abaSelecionada = 2;
                    RBChatGaleria.abrirGaleria(scope);
                },0);
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
                //$('#container-respostas').scrollTop(parseInt($('#container-respostas > div > div').height()));
                $ionicScrollDelegate.$getByHandle('mainScroll').scrollBottom(false);
                $('ion-side-menu-content').addClass('remove-overflow-preview');
            };
            
            var caracteres = 0;
            var linhas = 0;
            var caracLinha;
            scope.rbChat.calcularTxtAreaAltura = function(){
                caracteres++;
                $("#txtAreaChat").bind("input", function(e) {
                    while( $(this).outerHeight() < this.scrollHeight +
                                                   parseFloat($(this).css("borderTopWidth")) +
                                                   parseFloat($(this).css("borderBottomWidth"))
                           && $(this).height() < 100 // Altura máxima
                    ) {
                        linhas++;
                        if(linhas == 1)
                            caracLinha = caracteres;
                        $(this).height($(this).height()+1);
                        scope.rbChat.empurraChat = $("#container-input").height() + scope.rbChat.alturaTeclado;
                        $timeout(function(){
                            scope.rbChat.rolarChat();
                        },0);
                    };
                    if((Math.floor(caracteres/linhas)) < caracLinha){
                        $(this).height($(this).height()-1);
                        scope.rbChat.empurraChat = $("#container-input").height() + scope.rbChat.alturaTeclado;
                        $timeout(function(){
                            scope.rbChat.rolarChat();
                        },0);
                    }
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
                //caracteres++;
                //scope.rbChat.calcularTxtAreaAltura();
                if(scope.rbChat.dadosConversa.bloqueado != 1)
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
            $timeout(function(){
                iniciaAltura();
                iniciarInfinitScroll(metodoInfinitScroll);
                addCss();
            },0);
            //$timeout(function(){
                //scope.rbChat.scrollBottom();
            //},0);
        }
        
        function recalculaAlturaChat(indice,metodo){
            if(indice == 0){
                scope.rbChat.abaSelecionada = indice;
                if(scope.rbChat.menuAberto)scope.rbChat.menuAberto = false;
                $timeout(function(){
                    scope.rbChat.empurraChat = scope.rbChat.alturaChatAnterior;
                    $timeout(function(){
                        scope.rbChat.rolarChat();
                        if(metodo){
                            $timeout(function(){
                                metodo();
                            },200);
                        }
                    },0);
                },0);
            }
            
            if(indice == 1){
                $timeout(function(){
                    scope.rbChat.empurraChat = $('body').width();
                },0);
                $timeout(function(){
                    scope.rbChat.rolarChat();
                    //alert(scope.rbChat.empurraChat);
                    //$timeout(function(){
                        if(metodo){
                            metodo();
                        }
                    //},200);
                },0);
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
                },0);
                $timeout(function(){
                    scope.rbChat.menuAberto = false;
                    scope.rbChat.rolarChat();
                },0);
            }
            
        }

        return {
            setScope:setScope,
            inicializar:inicializar
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
                    StatusBar.hide();
                    StatusBar.show();
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
            StatusBar.hide();
            StatusBar.show();
            $('.container-chat-geral').removeClass('remove-overflow-preview');
            scope.rbChat.tirouFoto = img;
            scope.rbChat.sumirBtn = false;
            scope.rbChat.veioGaleria = true;
            //if(!img){
                scope.rbChat.menuAberto = false;
                $timeout(function(){
                    scope.rbChat.abaSelecionada = 0;
                },0);
                $timeout(function(){
                    scope.rbChat.empurraChat = $('#container-input').height();
                },0);
                $timeout(function(){
                    scope.rbChat.rolarChat();
                },0);
            //}
        }

        return {
            setScope:setScope,
            iniciar:iniciar,
            abrirGaleria:abrirGaleria
        };
    }
]);
