'use strict';

angular.module('QuickPeek.Acoes.TiraSelfie', [ 
    'RB.pagina',
    'QuickPeek.Requisicao.TiraSelfie',
    'Cmp.CameraPreview',
    'Cmp.ImagePicker'
])

.factory('TiraSelfieAcoes', ['Pagina','TiraSelfieRequisicoes','CameraPreview','$timeout','ImagePicker','$cordovaFile',
    function(Pagina,TiraSelfieRequisicoes,CameraPreview,$timeout,ImagePicker,$cordovaFile){
    var scope;  
    
    function setScope(obj){
        scope = obj;
        scope.cameraPerfil = {};
        return this;
    };
    
    function inicializar(){
        addCss();
        iniciarCamera();
    };
    
    function iniciarCamera(){
        CameraPreview.setScope(scope).inicializar('cameraPerfil');
    }
    
    function mostrarCamera(){
        scope.cameraPerfil.mostrar();
    }
    
    function virarCamera(){
        scope.cameraPerfil.trocarCamera();
    }
    
    function abrirGaleria(){
        scope.functionsdsd = scope.functionsdsd + 1;
        scope.cameraPerfil.img = false;
        ImagePicker.setScope(scope).iniciar('cameraPerfil');
    }
    
    function addCss(){
        $('html,body,ion-side-menus,ion-side-menu-content').addClass('background-transparente');
    }
    
    function createFile(path){
        scope.arquivo = $cordovaFile.createFile(path,'perfil',true);
        DGlobal.dadosSelfie = {
            arquivo:scope.arquivo,
            urlImg: path
        };
        Pagina.navegar({idPage:6});
    }
    
    function pular(){
        Pagina.navegar({idPage:6});
    }
    
    return {
        setScope:setScope,
        inicializar:inicializar,
        mostrarCamera:mostrarCamera,
        abrirGaleria:abrirGaleria,
        virarCamera:virarCamera,
        createFile:createFile,
        pular:pular
    };
 }]);
