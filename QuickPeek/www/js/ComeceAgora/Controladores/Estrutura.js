'use strict';

angular.module('QuickPeek.Estrutura.ComeceAgora', [
    'RB.gcs',
    'RB.config',
    'RB.pagina'
])

.factory('ComeceAgoraEstrutura', ['GCS','Config','Pagina',
    function(GCS,Config,Pagina) {
    var scope;  
    
    function setScope(obj){
        scope = obj;
        return this;
    }
    
    function popular(){
        //RBLoadingMobile.show();
    };
  
    return {
        setScope:setScope,
        popular:popular
    };
 }]);
