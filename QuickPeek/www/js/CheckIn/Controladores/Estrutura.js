'use strict';

angular.module('QuickPeek.Estrutura.CheckIn', [
    'RB.gcs',
    'RB.config',
    'RB.pagina',
    'RB.validacoesPadroes'
])

.factory('CheckInEstrutura', ['GCS','$timeout','Pagina','VP',
    function(GCS,$timeout,Pagina,VP) {
    var scope;  
    
    function setScope(obj){
        scope = obj;
        return this;
    }
    
    function popular(){
        scope.dados = {};
    };
  
    return {
        setScope:setScope,
        popular:popular
    };
 }]);
