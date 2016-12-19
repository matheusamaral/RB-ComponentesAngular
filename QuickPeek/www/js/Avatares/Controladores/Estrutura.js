'use strict';

angular.module('QuickPeek.Estrutura.Avatares', [
    'RB.gcs',
    'RB.config',
    'RB.pagina',
    'RB.validacoesPadroes'
])

.factory('AvataresEstrutura', ['GCS','Config','Pagina','VP','RBLoadingMobile',
    function(GCS,Config,Pagina,VP,RBLoadingMobile) {
    var scope;  
    
    function setScope(obj){
        scope = obj;
        return this;
    }
    
    function popular(){
        if(DGlobal.avatares && DGlobal.avatares.success){
            scope.objAvatares = new Array();
            estruturaLinhas(0,2);
        }
    };
    
    function estruturaLinhas(){
        var contAvatares = 0;
        var linhaAvatar = new Array();
        for(var i = 0; i < scope.avatares.length; i++){
            contAvatares++;
            if(DGlobal.avatarSelecionado){
                if(DGlobal.avatarSelecionado.id == scope.avatares[i].id)
                    scope.avatares[i].selecionado = true;
            }
            linhaAvatar.push(scope.avatares[i]);
            if(contAvatares == 3 || (contAvatares != 3 && i == scope.avatares.length - 1)){
                scope.objAvatares.push(linhaAvatar);
                linhaAvatar = new Array();
                contAvatares = 0;
            }
        }
    }
    
    function reqIniciais(){
        getAvatares();
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
        reqIniciais:reqIniciais
    };
 }]);
