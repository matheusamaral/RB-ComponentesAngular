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
            scope.dados = DGlobal.dadosUsuario.dados; 
            montaAvatar();
        }
        
        if(DGlobal.perfilOutros)
            scope.outraPessoa = true;
    };
    
    function montaAvatar(){
        scope.dados.avatar = {};
        scope.dados.avatar.nome = DGlobal.dadosUsuario.dados.avatarNome;
        scope.dados.avatar.endereco = DGlobal.dadosUsuario.dados.avatarEndereco;
        scope.dados.avatar.id = DGlobal.dadosUsuario.dados.avatarId;
    }
  
    return {
        setScope:setScope,
        popular:popular
    };
 }]);
