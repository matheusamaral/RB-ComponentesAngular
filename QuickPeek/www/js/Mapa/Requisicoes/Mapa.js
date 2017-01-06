'use strict';

angular.module('QuickPeek.Requisicao.Mapa', [
    'RB.pagina'
])
 
.factory('MapaRequisicoes', ['RBLoadingMobile','GCS', 'Config','ionicToast','Pagina',
      function (RBLoadingMobile,GCS, Config,ionicToast,Pagina) {
        
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

        function verificarLocaisProximos(){
            var obj = {
                url: Config.getRefAmbienteReq()+"/Local/mapa",
                dados: $.param(dados),
                tipo: 'POST',
                acao: acaoSuccess,
                error: errorSalvar,
                scope: scope,
                exibeMSGCarregando: 0
            };
            GCS.conectar(obj);
        };
        
        
        function successVerificarLocaisProximos(objRetorno){
            RBLoadingMobile.hide();
            //alert(JSON.stringify(objRetorno));
            console.log(objRetorno);
            if(objRetorno.success === true){
                
            }
            else{
                //if(objRetorno.errors) OpenToast(objRetorno.errors);
            }
        };
        
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
                if(acaoPosterior)acaoPosterior(scope.locais);
                if(objRetorno.errors) OpenToast(objRetorno.errors);
            }
        };
        
        
        function errorSalvar(dados, scope){
            RBLoadingMobile.hide();
            OpenToast("Não foi possível efetuar a ação, por favor, tente novamente!");
        };
        
        
        function OpenToast(message) {
          ionicToast.show(message, 'bottom', false, 3000);
        }
        
        return {
            set: set,
            verificarLocaisProximos: verificarLocaisProximos,
            successVerificarLocaisProximos: successVerificarLocaisProximos,
            attTutorial:attTutorial,
            successAttTutorial:successAttTutorial
        };
                           
}]);     
