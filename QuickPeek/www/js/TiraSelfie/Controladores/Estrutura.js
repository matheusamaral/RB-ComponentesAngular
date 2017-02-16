'use strict';

angular.module('QuickPeek.Estrutura.TiraSelfie', [
    'RB.gcs',
    'RB.config',
    'RB.pagina',
    'RB.validacoesPadroes'
])

.factory('TiraSelfieEstrutura', ['GCS','Config','Pagina','VP',
    function(GCS,Config,Pagina,VP) {
    var scope;  
    
    function setScope(obj){
        scope = obj;
        requestpermissioncamera();
        return this;
    }
    
    function requestpermissioncamera(){
        cordova.plugins.diagnostic.requestCameraAuthorization(function(){console.log('sd')}, function(){});
    }
    
    function popular(){
        scope.dadosSms = {
            ddi:'55',
            numero:'',
            codigo:true
        };
        
        if(DGlobal.dadosTelefone){
            scope.dadosSms = DGlobal.dadosTelefone;
        }
        
        scope.ddis = VP.getDDiPaises();
    };
  
    return {
        setScope:setScope,
        popular:popular
    };
 }]);
