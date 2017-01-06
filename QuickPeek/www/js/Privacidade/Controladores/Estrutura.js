'use strict';

angular.module('QuickPeek.Estrutura.Privacidade', [
    'RB.gcs',
    'RB.config',
    'RB.pagina',
    'RB.validacoesPadroes'
])

.factory('PrivacidadeEstrutura', ['GCS','$timeout','Pagina','VP',
    function(GCS,$timeout,Pagina,VP) {
    var scope;  
    
    function setScope(obj){
        scope = obj;
        return this;
    }
    
    function popular(){
        scope.dados = {};
        if(!DGlobal.veioCadastro){
            scope.dados = {
                visibilidadeId:1
            };
        }else{
            scope.dados = {
                visibilidadeId:3
            };
        }
        
        if(DGlobal.dadosUsuario && DGlobal.dadosUsuario.success){
            scope.dadosUser = DGlobal.dadosUsuario.dados;
        }
        
        if(DGlobal.checkIn){
            scope.dados.local = DGlobal.checkIn.local;
            scope.dados.localId = DGlobal.checkIn.local.localId;
        }
    };
  
    return {
        setScope:setScope,
        popular:popular
    };
 }]);
