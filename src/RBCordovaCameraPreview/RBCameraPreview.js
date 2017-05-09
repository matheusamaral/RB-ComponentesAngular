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
                scope[nomeObj].containerImgAltura = $('body').width();
                inicializaFuncoes(nomeObj);
            },0);
        }
        
        function inicializaFuncoes(nomeObj){
            scope[nomeObj].larguraBody = $('body').width();
//            scope[nomeObj].instanciaCamera = function(){
//                cam.setOnPictureTakenHandler(function(result) {
//                    console.log(result);
//                    cam.hide();
//                    scope[nomeObj].img = result;
//                    $timeout(function(){
//                        document.getElementById(nomeObj).src = scope[nomeObj].img; //originalPicturePath;
//                    },0);
//                });
//            };

            scope[nomeObj].instanciaCamera = function(){
            };
            
            scope[nomeObj].iniciarCamera = function(){
                //RBLoadingMobile.show('Preparando câmera...');
                var tapEnabled = false;
                var dragEnabled = false;
                var toBack = true;
                cam.startCamera({
                    x: 0,
                    y: $('#cameraPerfilBarra').height() + 40,
                    width: $('body').width(),
                    height: scope[nomeObj].containerImgAltura,
                    camera:camera, 
                    tapPhoto:tapEnabled, 
                    previewDrag: dragEnabled, 
                    toBack:toBack},preparaCamera);
            };
            
            function preparaCamera(){
                scope[nomeObj].img = false;
                scope[nomeObj].fotoTirada = false;
                $timeout(function(){
                    scope[nomeObj].instanciaCamera();
                },0);
            }
            
//            document.addEventListener('deviceready', scope[nomeObj].instanciaCamera, false);
            document.addEventListener('deviceready', scope[nomeObj].iniciarCamera, false);
            
            scope[nomeObj].pararCamera =  function(){
                cam.stopCamera(succesParar);
            };
            
            function succesParar(){
                scope[nomeObj].fotoTirada = false;
            }
            
            scope[nomeObj].trocarCamera = function(){
                cam.stopCamera();
                virarCamera();
            };
            
            function virarCamera(){
                if(camera == 'front')camera = 'rear';
                else camera = 'front';
                var tapEnabled = false;
                var dragEnabled = false;
                var toBack = true;
                cam.startCamera({
                    x: 0,
                    y: $('#cameraPerfilBarra').height() + 40,
                    width: $('body').width(),
                    height: scope[nomeObj].containerImgAltura,
                    camera:camera, 
                    tapPhoto:tapEnabled, 
                    previewDrag: dragEnabled, 
                    toBack:toBack},preparaCamera);
            }
            
            scope[nomeObj].tirarFoto = function(){
                scope[nomeObj].galeria = false;
                scope[nomeObj].fotoTirada = true;
                cam.takePicture(
                    {width:600, height:600, quality: 100},
                    function(result){
                        cam.stopCamera();
                        scope[nomeObj].img = 'data:image/jpeg;base64,' + result[0];
                        scope.$apply();
                        //não pode ser fixo a extensão, tem que ser a extensão correta;
                        $timeout(function(){
                            document.getElementById(nomeObj).src = scope[nomeObj].img; //scope[nomeObj].img; //originalPicturePath;
                        },0);   
                    }
                );
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