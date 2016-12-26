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
        
        if(DGlobal.dadosAvatares && DGlobal.dadosAvatares.success){
            scope.avatares = DGlobal.dadosAvatares.dados;
        }
        
        if(DGlobal.dadosUsuario && DGlobal.dadosUsuario.success){
            alert(JSON.stringify(DGlobal.dadosUsuario.dados));
            scope.dados = DGlobal.dadosUsuario.dados; 
            montaAvatar();
        }
    };
    
    function montaAvatar(){
        scope.dados.avatar = {};
        scope.dados.avatar.nome = DGlobal.dadosUsuario.dados.avatarNome;
        scope.dados.avatar.endereco = DGlobal.dadosUsuario.dados.avatarEndereco;
    }
  
    return {
        setScope:setScope,
        popular:popular
    };
 }]);
