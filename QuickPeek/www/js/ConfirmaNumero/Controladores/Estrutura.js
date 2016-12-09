'use strict';

angular.module('QuickPeek.Estrutura.ConfirmaNumero', [
    'RB.gcs',
    'RB.config',
    'RB.pagina',
    'RB.validacoesPadroes'
])

.factory('ConfirmaNumeroEstrutura', ['GCS','Config','Pagina','VP',
    function(GCS,Config,Pagina,VP) {
    var scope;  
    
    function setScope(obj){
        scope = obj;
        return this;
    }
    
    function popular(){
        scope.dadosCel = {
            ddi:'55',
            numero:''
        };
        scope.ddis = VP.getDDiPaises();
    };
  
    return {
        setScope:setScope,
        popular:popular
    };
 }]);
