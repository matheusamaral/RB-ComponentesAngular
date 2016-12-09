'use strict';

angular.module('QuickPeek.Estrutura.ConfirmaSms', [
    'RB.gcs',
    'RB.config',
    'RB.pagina',
    'RB.validacoesPadroes'
])

.factory('ConfirmaSmsEstrutura', ['GCS','Config','Pagina','VP',
    function(GCS,Config,Pagina,VP) {
    var scope;  
    
    function setScope(obj){
        scope = obj;
        return this;
    }
    
    function popular(){
        scope.dadosSms = {
            ddi:'55',
            numero:'',
            codigo:''
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
