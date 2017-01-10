'use strict';

angular.module('QuickPeek.Requisicao.Locais', [
    'RB.pagina'
])
 
.factory('LocaisRequisicoes', ['RBLoadingMobile','GCS', 'Config','ionicToast','Pagina','$timeout',
      function (RBLoadingMobile,GCS, Config,ionicToast,Pagina,$timeout) {
        
        var dados;
        var scope;
        var acaoSuccess;
        var acaoPosterior = false;

        function set(obj){
            dados = obj.dados;
            scope = obj.scope;
            acaoSuccess = obj.acaoSuccess;
            if(obj.acaoPosterior)acaoPosterior = obj.acaoPosterior;
            return this;
        };
        
        function listarAreas(){
            console.log('atençãaaaaaoo');
            console.log(this);
            if (scope.busy) return;
            scope.busy = true;
            RBLoadingMobile.show();
            var obj = {
                url: Config.getRefAmbienteReq()+"/Listar/listarAreaMapa",
                dados: $.param(dados),
                tipo: 'POST',
                acao: acaoSuccess,
                error: errorSalvar,
                scope: scope,
                exibeMSGCarregando: 0
            };
            GCS.conectar(obj);
        };
        
        function successListarAreas(objRetorno){
            console.log("objRetorno",objRetorno);
            if(objRetorno.success === true){
                $timeout(function(){
                    for(var i = 0; i < objRetorno.dados.length;i++){
                        scope.locais.push(objRetorno.dados[i]);
                    }
                    RBLoadingMobile.hide();
                    scope.busy = false;
                },0);
            }
            else{
                OpenToast('Não foi possível localizar mais locais proximos');
            }
        };
        
        function listarMidias(){
            RBLoadingMobile.show();
            var obj = {
                url: Config.getRefAmbienteReq()+"/Listar/listarMidias",
                dados: $.param(dados),
                tipo: 'POST',
                acao: acaoSuccess,
                error: errorSalvar,
                scope: scope,
                exibeMSGCarregando: 0
            };
            GCS.conectar(obj);
        };
        
        function successListarMidias(objRetorno){
            RBLoadingMobile.hide();
            console.log("objRetorno",objRetorno);
            if(objRetorno.success === true){
                DGlobal.midias = objRetorno.dados;
                Pagina.navegar({idPage:25});
            }
            else{
                OpenToast('Não foi possível localizar midias');
            }
        };
        
        function curtirHashTag(){
            var obj = {
                url: Config.getRefAmbienteReq()+"/Acoes/curtirHashtag",
                dados: $.param(dados),
                tipo: 'POST',
                acao: acaoSuccess,
                error: errorSalvar,
                scope: scope,
                exibeMSGCarregando: 0
            };
            GCS.conectar(obj);
        };
        
        function successCurtirHashtag(objRetorno){
            console.log("objRetorno",objRetorno);
            console.log(scope.locais);
            if(objRetorno.success === true){
                for(var i = 0; i < scope.locais.length;i++){
                    if(scope.locais[i].dados.localId == dados.localId){
                        for(var j = 0; j < scope.locais[i].hashtags.length;j++){
                            if(scope.locais[i].hashtags[j].hashtagId == dados.hashtagId){
                                if(scope.locais[i].hashtags[j].jaCurtiu == 1)scope.locais[i].hashtags[j].jaCurtiu = 0;
                                else scope.locais[i].hashtags[j].jaCurtiu = 1;
                            }
                        }
                    }
                }
                
                if(acaoPosterior)acaoPosterior();
                console.log(scope.locais);
            }
            else{
                OpenToast('Não foi possível curtir esta hashtag');
            }
        };
        
        
        function errorSalvar(dados, scope){
            RBLoadingMobile.hide();
            OpenToast("Não foi possível efetuar a ação, por favor, tente novamente!");
        };
        
        
        function OpenToast(message) {
          ionicToast.show(message, 'bottom', false, 3000);
        }
        
        function attTutorial(){
            RBLoadingMobile.show();
            var obj = {
                url: Config.getRefAmbienteReq()+"/Usuario/tutorial",
                dados: $.param(dados),
                tipo: 'POST',
                acao: acaoSuccess,
                error: errorSalvar,
                scope: scope,
                exibeMSGCarregando: 0
            };
            GCS.conectar(obj);
        };
        
        
        function successAttTutorial(objRetorno){
            RBLoadingMobile.hide();
            //alert(JSON.stringify(objRetorno));
            console.log(objRetorno);
            if(objRetorno.success === true) {
                scope.dadosUser.tutorial ++;
            }
            else{
                if(objRetorno.errors) OpenToast(objRetorno.errors);
            }
        };
        
        return {
            set: set,
            successListarAreas: successListarAreas,
            listarAreas: listarAreas,
            listarMidias:listarMidias,
            successListarMidias:successListarMidias,
            attTutorial:attTutorial,
            successAttTutorial:successAttTutorial,
            successCurtirHashtag:successCurtirHashtag,
            curtirHashTag:curtirHashTag
        };
                           
}]);     
