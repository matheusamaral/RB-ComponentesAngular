'use strict';

angular.module('QuickPeek.Acoes.TiraSelfie', [ 
    'RB.pagina',
    'QuickPeek.Requisicao.TiraSelfie',
    'Cmp.CameraPreview',
    'Cmp.ImagePicker',
    'RB.validacoesPadroes'
])

.factory('TiraSelfieAcoes', ['Pagina','TiraSelfieRequisicoes','CameraPreview','$timeout','ImagePicker','$cordovaFile','RBLoadingMobile','VP','$base64',
    function(Pagina,TiraSelfieRequisicoes,CameraPreview,$timeout,ImagePicker,$cordovaFile,RBLoadingMobile,VP,$base64){
    var scope;  
    
    function setScope(obj){
        scope = obj;
        scope.cameraPerfil = {};
        calcularAlturaRodape();
        return this;
    };
    
    function inicializar(){
        addCss();
        iniciarCamera();
    };
    
    function iniciarCamera(){
        CameraPreview.setScope(scope).inicializar('cameraPerfil');
    }
    
    function mostrarCamera(evento){
        VP.pararEvento(evento);
        $timeout(function(){
            scope.cameraPerfil.mostrar();
            scope.cameraPerfil.img = '';
            scope.cameraPerfil.fotoTirada = false;
            scope.cameraPerfil.galeria = false;
        },0);
    }
    
    function virarCamera(evento){
        VP.pararEvento(evento);
        $timeout(function(){
            scope.cameraPerfil.trocarCamera();
        },0);
    }
    
    function abrirGaleria(evento){
        VP.pararEvento(evento);
        $timeout(function(){
            scope.cameraPerfil.img = false;
            ImagePicker.setScope(scope).iniciar('cameraPerfil');
        },0);
    }
    
    function addCss(){
        $('html,body,ion-side-menus,ion-side-menu-content').addClass('background-transparente');
        $('html,body,ion-side-menus,ion-side-menu-content').removeClass('background-cinza');
    }
    
    function createFile(path){
        var obj = {};
        RBLoadingMobile.show('Salvando foto...');
        $timeout(function(){
            window.plugins.Base64.encodeFile(path, function(base64){
                obj = {arquivoBase64:base64};
            });

            $timeout(function(){
                TiraSelfieRequisicoes.set({dados:obj, scope:scope,acaoSuccess:TiraSelfieRequisicoes.successSalvar}).salvarImg();
            },0);
        },0);
    }
    
    function preparaArquivo(url){
        var nomeArquivo = url.split('/')[url.split('/').length - 1];
        var caminho = '';
        for(var i = 0 ; i < url.split('/').length - 1; i++){
            caminho = caminho + url.split('/')[i]+'/';
        }
        
        alert(caminho);
        
        return $cordovaFile.checkFile(caminho, nomeArquivo);
    }
    
    function tirarFoto(evento){
        VP.pararEvento(evento);
        $timeout(function(){
            scope.cameraPerfil.tirarFoto();
        },0);
    }
    
    function pular(){
        scope.cameraPerfil.pararCamera();
        Pagina.navegar({idPage:6});
    }
    
    function calcularAlturaRodape(){
        scope.alturaRodape = $('body').height() - (($('#cameraPerfilBarra').height() + 40) + $('body').width());
    }
    
    return {
        setScope:setScope,
        inicializar:inicializar,
        mostrarCamera:mostrarCamera,
        abrirGaleria:abrirGaleria,
        virarCamera:virarCamera,
        createFile:createFile,
        pular:pular,
        tirarFoto:tirarFoto
    };
 }]);
