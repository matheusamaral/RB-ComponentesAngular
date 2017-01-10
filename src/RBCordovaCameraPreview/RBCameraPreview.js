'use strict';

angular.module('Cmp.CameraPreview', [
    'RB.validacoesPadroes'
])

.factory('CameraPreview', ['VP','$timeout','RBLoadingMobile',
    function (VP,$timeout,RBLoadingMobile) {
        var scope;  

        function setScope(obj){
            scope = obj;
            return this;
        };
        
        function inicializar(nomeObj){
            scope[nomeObj] = {};
            $timeout(function(){
                scope[nomeObj].containerImgAltura = $('body').width();
                inicializaFuncoes(nomeObj);
            },0);
        }
        
        function inicializaFuncoes(nomeObj){
            
            scope[nomeObj].instanciaCamera = function(){
                cordova.plugins.camerapreview.setOnPictureTakenHandler(function(result) {
                    scope[nomeObj].img = result[1];
                    scope[nomeObj].galeria = false;
                    document.getElementById(nomeObj).src = scope[nomeObj].img; //originalPicturePath;
                });
            };
            
            scope[nomeObj].iniciarCamera = function(){
                //RBLoadingMobile.show('Preparando câmera...');
                var tapEnabled = false;
                var dragEnabled = false;
                var toBack = true;
                cordova.plugins.camerapreview.startCamera({
                    x: 0,
                    y: $('#cameraPerfilBarra').height() + 40,
                    width: $('body').width(),
                    height: scope[nomeObj].containerImgAltura
                }, "front", tapEnabled, dragEnabled, toBack);
                
                scope[nomeObj].img = false;
                scope[nomeObj].fotoTirada = false;
                    //scope[nomeObj].trocarCamera();
                        //scope[nomeObj].trocarCamera();
                        RBLoadingMobile.hide();
            };
            
            document.addEventListener('deviceready', scope[nomeObj].instanciaCamera, false);
            document.addEventListener('deviceready', scope[nomeObj].iniciarCamera, false);
            
            scope[nomeObj].pararCamera =  function(){
                if(scope[nomeObj].img)
                    cordova.plugins.camerapreview.stopCamera();
                scope[nomeObj].fotoTirada = false;
            };
            
            scope[nomeObj].trocarCamera = function() {
                cordova.plugins.camerapreview.switchCamera();
            };
            
            scope[nomeObj].tirarFoto = function(){
                cordova.plugins.camerapreview.hide();
                cordova.plugins.camerapreview.takePicture();
                scope[nomeObj].galeria = false;
                scope[nomeObj].fotoTirada = true;
            };
            
            scope[nomeObj].mostrar = function() {
                cordova.plugins.camerapreview.show();
            };
            
            scope[nomeObj].esconder = function() {
                if(scope[nomeObj].img)
                    cordova.plugins.camerapreview.hide();
                scope[nomeObj].fotoTirada = false; 
            };
            
            scope[nomeObj].mudarEfeito = function() {
                var effect = document.getElementById('colorEffectCombo').value;
                cordova.plugins.camerapreview.setColorEffect(effect);
            };
        }

        return {
            setScope:setScope,
            inicializar:inicializar
        };
    }
]);