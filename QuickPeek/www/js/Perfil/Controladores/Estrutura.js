'use strict';

angular.module('QuickPeek.Estrutura.Perfil', [
    'RB.gcs',
    'RB.config',
    'RB.pagina',
    'RB.validacoesPadroes'
])

.factory('PerfilEstrutura', ['GCS','Config','Pagina','VP',
    function(GCS,Config,Pagina,VP) {
    var scope;  
    
    function setScope(obj){
        scope = obj;
        return this;
    }
    
    function popular(){
        scope.dados = {
            avatar:''
        };
        
        if(DGlobal.dadosPerfil){
            scope.dados = DGlobal.dadosPerfil;
        }
        
        if(DGlobal.avatarSelecionado){
            scope.dados.avatar = DGlobal.avatarSelecionado;
        }
        
        console.log('scope.dados');
        console.log(scope.dados);
    };
  
    return {
        setScope:setScope,
        popular:popular
    };
 }]);
