'use strict';

angular.module('QuickPeek.Requisicao.CheckIn', [
    'RB.pagina'
])
 
.factory('CheckInRequisicoes', ['RBLoadingMobile','GCS', 'Config','ionicToast','Pagina',
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
            RBLoadingMobile.show();
            var obj = {
                url: Config.getRefAmbienteReq()+"/Local/mapaLocaisPertos",
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
            if(objRetorno.success === true) {
                scope.locais = objRetorno.dados;
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
            verificarLocaisProximos: verificarLocaisProximos,
            successVerificarLocaisProximos: successVerificarLocaisProximos
        };
                           
}]);     
