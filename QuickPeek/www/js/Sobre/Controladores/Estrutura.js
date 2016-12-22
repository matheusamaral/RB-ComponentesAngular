'use strict';

angular.module('QuickPeek.Estrutura.Sobre', [
    'RB.gcs',
    'RB.config',
    'RB.pagina'
])

.factory('SobreEstrutura', ['GCS','Config','Pagina',
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
