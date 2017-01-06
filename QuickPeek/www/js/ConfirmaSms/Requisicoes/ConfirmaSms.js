'use strict';

angular.module('QuickPeek.Requisicao.ConfirmaSms', [
    'RB.pagina'
])
 
.factory('ConfirmaSmsRequisicoes', ['RBLoadingMobile','GCS', 'Config','ionicToast','Pagina',
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

        function enviarSms(){
            RBLoadingMobile.show();
            var obj = {
                url: Config.getRefAmbienteReq()+"/Usuario/enviarSms",
                dados: $.param(dados),
                tipo: 'POST',
                acao: acaoSuccess,
                error: errorSalvar,
                scope: scope,
                exibeMSGCarregando: 0
            };
            GCS.conectar(obj);
        };
        
        
        function successEnviarSms(objRetorno){
            RBLoadingMobile.hide();
            console.log("objRetorno",objRetorno);
            if(objRetorno.success === true) {
                if(acaoPosterior)acaoPosterior();
            }
            else{
                if(objRetorno.errors) OpenToast(objRetorno.errors);
            }
        };
        
        function confirmarSms(){
            RBLoadingMobile.show();
            var obj = {
                url: Config.getRefAmbienteReq()+"/Usuario/verificarCodigoSms",
                dados: $.param(dados),
                tipo: 'POST',
                acao: acaoSuccess,
                error: errorSalvar,
                scope: scope,
                exibeMSGCarregando: 0
            };
            GCS.conectar(obj);
        };
        
        function successConfirmarSms(objRetorno){
            RBLoadingMobile.hide();
            console.log("objRetorno",objRetorno);
            if(objRetorno.success === true) {
                Pagina.navegar({idPage:5});
            }
            else{
                Pagina.navegar({idPage:5});
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
            enviarSms: enviarSms,
            successEnviarSms: successEnviarSms,
            confirmarSms:confirmarSms,
            successConfirmarSms:successConfirmarSms
        };
                           
}]);     
