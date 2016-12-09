'use strict';

angular.module('QuickPeek.Requisicao.ConfirmaNumero', [

])
 
.factory('ConfirmaNumeroRequisicoes', ['RBLoadingMobile','GCS', 'Config','ionicToast',
      function (RBLoadingMobile,GCS, Config,ionicToast) {
        
        var dados;
        var scope;
        var acaoSuccess;

        function set(obj){
            dados = obj.dados;
            scope = obj.scope;
            acaoSuccess = obj.acaoSucsess;
            return this;
        };

        function enviarSms(){
            RBLoadingMobile.show();
            var obj = {
                url: Config.getRefAmbienteReq()+"/Usuario/enviarSms",
                dados: $.param(dados),
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
                
            }
            else{
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
            successEnviarSms: successEnviarSms
            
        };
                           
}]);     