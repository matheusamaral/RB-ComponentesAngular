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
        $timeout(function(){
            scope.dados = {
                nome:'',
                nascimento:'',
                generoId:1,
                avataresId:'',
                arquivo:'',
                arquivoAvatar:''
            };
            
            if(DGlobal.dadosCadastro){
                scope.dados = DGlobal.dadosCadastro;
            }

            if(DGlobal.dadosSelfie){
                scope.dados.arquivo = DGlobal.dadosSelfie.arquivo;
                scope.dados.urlImg = DGlobal.dadosSelfie.urlImg;
            }

            if(DGlobal.dadosEditar){
                scope.dados = DGlobal.dadosEditar;
                scope.dados.editando = true;
                delete DGlobal.dadosEditar;
            }else{
                if(!DGlobal.avatarSelecionado){
                    scope.indiceAvatar = VP.gerarNumeroAleatorio(0, scope.avatares.length);
                    scope.dados.avataresId =  scope.avatares[scope.indiceAvatar].id;
                    scope.dados.avatar =  scope.avatares[scope.indiceAvatar];
                    DGlobal.avatarSelecionado = scope.dados.avatar;
                }else{
                    scope.dados.avatar = DGlobal.avatarSelecionado;
                    scope.dados.avataresId = scope.dados.avatar.id;
                    DGlobal.avatarSelecionado = scope.dados.avatar;
                }
            }

            scope.genero = [{id:1,titulo:'Masculino'},{id:2,titulo:'Feminino'}];
        },0);
    };
    
    function requisicoesIniciais(){
        getAvatares();
        return this;
    }
    
    function getAvatares(){
        RBLoadingMobile.show();
        var obj = {
            url: Config.getRefAmbienteReq()+"/Listar/listarAvatares",
            dados: false,
            tipo: 'POST',
            acao: successGetAvatares,
            error: errorSalvar,
            scope: scope,
            exibeMSGCarregando: 0
        };
        GCS.conectar(obj);
    };
    
    function successGetAvatares(objRetorno){
        RBLoadingMobile.hide();
        console.log("objRetorno",objRetorno);
        if(objRetorno.success === true) {
            DGlobal.avatares = objRetorno;
            if(DGlobal.avatares && DGlobal.avatares.success){
                scope.avatares = DGlobal.avatares.dados;
                console.log('scope.avatares');
                console.log(scope.avatares);
            }
        }
        else{
            if(objRetorno.errors) OpenToast(objRetorno.errors);
        }
        
        popular();
    };


    function errorSalvar(dados, scope){
        RBLoadingMobile.hide();
        OpenToast("Não foi possível efetuar a ação, por favor, tente novamente!");
    };
  
    return {
        setScope:setScope,
        popular:popular,
        requisicoesIniciais:requisicoesIniciais
    };
 }]);
