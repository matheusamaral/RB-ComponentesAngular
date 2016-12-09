'use strict';

angular.module('QuickPeek.Acoes.TiraSelfie', [ 
    'RB.pagina',
    'QuickPeek.Requisicao.TiraSelfie',
    'Cmp.CameraPreview'
])

.factory('TiraSelfieAcoes', ['Pagina','TiraSelfieRequisicoes','CameraPreview','$timeout',
    function(Pagina,TiraSelfieRequisicoes,CameraPreview,$timeout){
    var scope;  
    
    function setScope(obj){
        scope = obj;
        return this;
    };
    
    function inicializar(){
        addCss();
        iniciarCamera();
    };
    
    function iniciarCamera(){
        CameraPreview.setScope(scope).inicializar('cameraPerfil');
    }
    
    function addCss(){
        $('ion-side-menu-content').addClass('background-cinza');
    }
    
    return {
        setScope:setScope,
        inicializar:inicializar
    };
 }]);
