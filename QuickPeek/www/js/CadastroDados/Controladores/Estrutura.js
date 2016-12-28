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
        
        if(DGlobal.avatares && DGlobal.avatares.success){
            scope.avatares = DGlobal.avatares.dados;
        }

        if(DGlobal.dadosUsuario && DGlobal.dadosUsuario.success && DGlobal.dadosUsuario.dados){
            if(DGlobal.dadosUsuario.dados.usuarioNome)scope.dados.nome = DGlobal.dadosUsuario.dados.usuarioNome;
            if(DGlobal.dadosUsuario.dados.usuarioNascimento)scope.dados.nascimento = DGlobal.dadosUsuario.dados.usuarioNascimento;
            if(DGlobal.dadosUsuario.dados.usuarioNascimento)scope.dados.nascimentoVisao = VP.organizaDataVisao(DGlobal.dadosUsuario.dados.usuarioNascimento);
            if(DGlobal.dadosUsuario.dados.usuarioGeneroId)scope.dados.generoId = DGlobal.dadosUsuario.dados.usuarioGeneroId;
            if(DGlobal.dadosUsuario.dados.usuarioEndereco)scope.dados.urlImg = DGlobal.dadosUsuario.dados.usuarioEndereco;
        }
        
        if(DGlobal.dadosSelfie){
            scope.dados.urlImg = DGlobal.dadosSelfie;
            delete DGlobal.dadosSelfie;
        }
        
        scope.indiceAvatar = VP.gerarNumeroAleatorio(0, scope.avatares.length);
        scope.dados.avataresId =  scope.avatares[scope.indiceAvatar].id;
        scope.dados.avatar =  scope.avatares[scope.indiceAvatar];
        //DGlobal.avatarSelecionado = scope.dados.avatar;
        
        if(!DGlobal.avatarSelecionado && DGlobal.dadosUsuario && DGlobal.dadosUsuario.success && DGlobal.dadosUsuario.dados.avatarId){
            scope.dados.avataresId = DGlobal.dadosUsuario.dados.avatarId;
            pegaLinkAvatar();
        }
        
        $timeout(function(){
            if(DGlobal.avatarSelecionado){
                scope.dados.avataresId = DGlobal.avatarSelecionado.id;
                pegaLinkAvatar();
            }
        },0);
        
        scope.genero = [{id:1,titulo:'Masculino'},{id:2,titulo:'Feminino'}];
        
        if(DGlobal.veioCadastro){
            scope.dados = DGlobal.veioCadastro;
            delete DGlobal.veioCadastro;
        }
        
        if(DGlobal.dadosEditar)scope.dados.editando = true;
    };
    
    function pegaLinkAvatar(){
        for(var i = 0 ; i < scope.avatares.length; i++){
            if(scope.dados.avataresId == scope.avatares[i].id){
                scope.dados.avatar = scope.avatares[i];
                DGlobal.avatarSelecionado = scope.dados.avatar;
            }
        }
    }
    
  
    return {
        setScope:setScope,
        popular:popular
    };
 }]);
