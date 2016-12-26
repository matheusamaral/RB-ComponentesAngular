'use strict';

angular.module('QuickPeek.Estrutura.CadastroDados', [
    'RB.gcs',
    'RB.config',
    'RB.pagina',
    'RB.validacoesPadroes'
])

.factory('CadastroDadosEstrutura', ['GCS','Config','Pagina','VP','RBLoadingMobile','$timeout',
    function(GCS,Config,Pagina,VP,RBLoadingMobile,$timeout) {
    var scope;  
    
    function setScope(obj){
        scope = obj;
        return this;
    }
    
    function popular(){
        scope.dados = {
            nome:'',
            nascimento:'',
            generoId:1,
            avataresId:'',
            editando:''
        };

        if(DGlobal.dadosUsuario && DGlobal.dadosUsuario.success){
            alert(JSON.stringify(DGlobal.dadosUsuario.dados));
        }

        scope.genero = [{id:1,titulo:'Masculino'},{id:2,titulo:'Feminino'}];
        
        if(DGlobal.avatares && DGlobal.avatares.success){
            if(!DGlobal.avatarSelecionado){
                scope.avatares = DGlobal.avatares.dados;
                scope.indiceAvatar = VP.gerarNumeroAleatorio(0, scope.avatares.length);
                scope.dados.avataresId =  scope.avatares[scope.indiceAvatar].id;
                scope.dados.avatar =  scope.avatares[scope.indiceAvatar];
                DGlobal.avatarSelecionado = scope.dados.avatar;
            }else{
                scope.dados.avatar = DGlobal.avatarSelecionado;
            }
        }
        
        if(DGlobal.veioCadastro){
            scope.dados = DGlobal.veioCadastro;
            delete DGlobal.veioCadastro;
        }
    };
  
    return {
        setScope:setScope,
        popular:popular
    };
 }]);
