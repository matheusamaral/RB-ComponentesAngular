'use strict';

angular.module('Cmp.CameraPreview', [
    'RB.validacoesPadroes'
])

.factory('CameraPreview', ['VP','$timeout','RBLoadingMobile',
    function (VP,$timeout,RBLoadingMobile) {
        var camera = 'front';
        var scope,cam = CameraPreview;  
        function setScope(obj){
            scope = obj;
            return this;
        };
        
        function inicializar(nomeObj){
            scope[nomeObj] = {};
            $timeout(function(){
                inicializaFuncoes(nomeObj);
            },0);
        }
        
        function inicializaFuncoes(nomeObj){            
            scope[nomeObj].instanciaCamera = function(){
                cam.setOnPictureTakenHandler(function(result) {
                    console.log(result);
                    cam.stopCamera();
                    scope[nomeObj].img = result[0];
                    $timeout(function(){
                        document.getElementById(nomeObj).src = result[0]; //scope[nomeObj].img; //originalPicturePath;
                    },0);
                });
            };
            
            function preparaCamera(){
                scope[nomeObj].img = false;
                scope[nomeObj].fotoTirada = false;
                $timeout(function(){
                    scope[nomeObj].instanciaCamera();
                },0);
            }
            
            scope[nomeObj].iniciarCamera = function(posicao,tamanho,camera){
                console.log('CAMERA COMPONETE!!!!');
                var tapEnabled = false;
                var dragEnabled = false;
                var toBack = true;
                cam.startCamera({
            };
            
            scope[nomeObj].pararCamera =  function(){
                cam.stopCamera(succesParar);
                    x: posicao.x,
                    y: posicao.y,
                    width: tamanho.width,
                    height: tamanho.height,
                    camera:camera, 
                    tapPhoto:tapEnabled, 
                    previewDrag: dragEnabled, 
                    toBack:toBack
                },preparaCamera);
            };
            
                scope[nomeObj].galeria = false;
                scope[nomeObj].fotoTirada = true;
            };
            
            scope[nomeObj].mostrar = function() {
                cam.show();
            };
            
            scope[nomeObj].esconder = function() {
                if(scope[nomeObj].img)
                    cam.hide(sucessEsconder);
            };
            
            function sucessEsconder(){
                scope[nomeObj].fotoTirada = false; 
            }
            
            scope[nomeObj].mudarEfeito = function() {
                var effect = document.getElementById('colorEffectCombo').value;
                cam.setColorEffect(effect);
            };
        }

        return {
            setScope:setScope,
            inicializar:inicializar
        };
    }
]);
