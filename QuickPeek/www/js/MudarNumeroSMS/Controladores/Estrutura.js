'use strict';

angular.module('QuickPeek.Estrutura.MudarNumeroSMS', [
    'RB.gcs',
    'RB.config',
    'RB.pagina',
    'RB.validacoesPadroes'
])

.factory('MudarNumeroSMSEstrutura', ['GCS','Config','Pagina','VP',
    function(GCS,Config,Pagina,VP) {
    var scope;  
    
    function setScope(obj){
        scope = obj;
        return this;
    }
    
    function popular(){
        scope.dados = {
        };
        
        if(DGlobal.dadosTel)
            scope.dados = DGlobal.dadosTel;
        console.log('scope.dados');
        console.log(scope.dados);
    };
  
    return {
        setScope:setScope,
        popular:popular
    };
 }]);
