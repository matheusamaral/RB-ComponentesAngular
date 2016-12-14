'use strict';

angular.module('QuickPeek.Requisicao.ApagarConta', [
    'RB.pagina'
])
 
.factory('ApagarContaRequisicoes', ['RBLoadingMobile','GCS', 'Config','ionicToast','Pagina',
      function (RBLoadingMobile,GCS, Config,ionicToast,Pagina) {
        
        var dados;
        var scope;
        var acaoSuccess;

        function set(obj){
            dados = obj.dados;
            scope = obj.scope;
            acaoSuccess = obj.acaoSuccess;
            return this;
        };

        function cadastrar(){
            RBLoadingMobile.show();
            var obj = {
                url: Config.getRefAmbienteReq()+"/Usuario/cadastro",
                dados: $.param(dados),
                tipo: 'POST',
                acao: acaoSuccess,
                error: errorSalvar,
                scope: scope,
                exibeMSGCarregando: 0
            };
            GCS.conectar(obj);
        };
        
        
        function successCadastrar(objRetorno){
            RBLoadingMobile.hide();
            console.log("objRetorno",objRetorno);
            if(objRetorno.success === true) {
                Pagina.navegar({idPage : 7});
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
            cadastrar: cadastrar,
            successCadastrar: successCadastrar
        };
                           
}]);     