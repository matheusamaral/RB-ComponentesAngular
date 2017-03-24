'use strict';

angular.module('RB.ChatCamera',[
    'RB.validacoesPadroes',
    'RB.ChatRequisicoes',
    'RB.pagina'
])

.factory('RBChatCamera', ['VP','$timeout','RBLoadingMobile',
    function (VP,$timeout,RBLoadingMobile) {
        var scope,y;
        var tapEnabled = false;
        var dragEnabled = false;
        var toBack = true;
        var camera = 'front';
        var altura = $('body').width();
        var largura = $('body').width();
        var dimensoes = {};
        
        function setScope(obj){
            scope = obj;
            scope.camera = CameraPreview;
            y = $('body').height() - scope.rbChat.empurraChat;
            return this;
        };
        
        function getDimensoes(){
            return dimensoes;
        }
        
        function iniciar(scope){
            setScope(scope);
            
            scope.rbChat.iniciarCamera = function(){
                dimensoes = {
                    x:10,
                    y:($('body').height() - largura) / 2,
                    w:largura , 
                    h:largura,
                    wr:largura, 
                    hr:$('body').height()
                };
                
                scope.camera.startCamera({
                    x: 0,
                    y: y,
                    width: largura,
                    height: altura,
                    camera:camera, 
                    tapPhoto:tapEnabled, 
                    previewDrag: dragEnabled, 
                    toBack:toBack
                },addFundoTransp);
            };
            
            scope.rbChat.tirarFoto = function(){
                scope.camera.takePicture(
                    {width:600, height:600, quality: 100},
                    function(result){
                        if(!scope.rbChat.camFull){
                            scope.rbChat.acabouDeTirarFotoQuadrada = true;
                        }else{ 
                            scope.rbChat.acabouDeTirarFotoQuadrada = false;
                        }
                        scope.rbChat.tirouFoto = 'data:image/jpeg;base64,' + result[0];
                        scope.rbChat.sumirBtn = false;
                        scope.$apply();
                    }
                );
            };
            
            scope.rbChat.instanciaCamera = function(){
                //scope.camera.setOnPictureTakenHandler(function(result){
                    
                //});
            };
            
            scope.rbChat.girarcamera = function (){
                scope.camera.stopCamera();
                if(camera == 'front')camera = 'back';
                else camera = 'front';
                var tapEnabled = false;
                var dragEnabled = false;
                var toBack = true;
                scope.imgPrevAltura = altura;
                scope.imgPrevLargura = largura;
                scope.imgPrevY = 0 ;

                scope.camera.startCamera({
                    x: 0,
                    y: y,
                    width: largura,
                    height: altura,
                    camera:camera, 
                    tapPhoto:tapEnabled, 
                    previewDrag: dragEnabled, 
                    toBack:toBack
                });
            };
            
            scope.rbChat.cameraFull = function (){
                scope.camera.stopCamera();
                var tapEnabled = false;
                var dragEnabled = false;
                var toBack = true;
                altura = $('body').height();
                y = 0;
                
                dimensoes = {
                    x:0,y:0, w:largura, h:altura,wr:largura, hr:$('body').height() 
                };
                
                scope.camera.startCamera({
                    x: 0,
                    y: y,
                    width: $('body').width(),
                    height: altura,
                    camera:camera, 
                    tapPhoto:tapEnabled, 
                    previewDrag: dragEnabled, 
                    toBack:toBack
                },arrumaCamFull);
                
            };
            
            scope.rbChat.resetarCamera = function(){
                scope.camera.stopCamera();
                var tapEnabled = false;
                var dragEnabled = false;
                var toBack = true;
                altura = $('body').width();
                y = $('body').height() - $('body').width();
                scope.camera.startCamera({
                    x: 0,
                    y: y,
                    width: $('body').width(),
                    height: altura,
                    camera:camera, 
                    tapPhoto:tapEnabled, 
                    previewDrag: dragEnabled, 
                    toBack:toBack
                },arrumaCamNormal);
            };
            
            function arrumaCamNormal(){
                scope.rbChat.empurraChat = $('body').width();
                $timeout(function(){
                    scope.rbChat.rolarChat();
                    $timeout(function(){
                        scope.rbChat.camFull = false;
                    },200);
                },200);
            }
            
            function arrumaCamFull(){
                //scope.$apply();
                //$('ion-side-menu-content').removeClass('remove-overflow-preview');
                alert($('body').height());
                scope.rbChat.empurraChat = $('body').height();
                $timeout(function(){
                    scope.rbChat.rolarChat();
                    scope.rbChat.camFull = true;
                    //$timeout(function(){
                        //scope.rbChat.camFull = true;
                    //},200);
                    
                },0);
            }
            
            scope.rbChat.fecharCamera = function(){
                scope.rbChat.cameraAberta = false;
                scope.rbChat.camFull = false;
                //$timeout(function(){
                    scope.camera.stopCamera();
                    removeFundoTransp();
                //},200);
            };
            
            function removeFundoTransp(){
                $('html,body,ion-side-menus,ion-side-menu-content,ion-content').removeClass('fundo-transparente-camera');
            }
            
            function addFundoTransp(){
                $('html,body,ion-side-menus,ion-side-menu-content,ion-content').addClass('fundo-transparente-camera');
                $timeout(function(){
                    scope.rbChat.cameraAberta = true;
                    scope.rbChat.liberaBtns = true;
                    //scope.$apply();
                },500);
            }
            
            scope.rbChat.instanciaCamera();
            scope.rbChat.iniciarCamera();
            
        }

        return {
            setScope:setScope,
            iniciar:iniciar,
            getDimensoes:getDimensoes
        };
    }
]);