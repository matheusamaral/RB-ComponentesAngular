'use strict';

angular.module('QuickPeek.Requisicao.MudarNumeroFinal', [
    'RB.pagina'
])
 
.factory('MudarNumeroFinalRequisicoes', ['RBLoadingMobile','GCS', 'Config','ionicToast','Pagina',
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

        function editarNumero(){
            RBLoadingMobile.show();
            var obj = {
                url: Config.getRefAmbienteReq()+"/Usuario/editarNumero",
                dados: $.param(dados),
                tipo: 'POST',
                acao: acaoSuccess,
                error: errorSalvar,
                scope: scope,
                exibeMSGCarregando: 0
            };
            GCS.conectar(obj);
        };
        
        function successEditarNumero(objRetorno){
            RBLoadingMobile.hide();
            console.log("objRetorno",objRetorno);
            if(objRetorno.success === true) {
                Pagina.navegar({idPage : 10});
                OpenToast('Número editado com sucesso!');
            }else{
                if(objRetorno.errors) OpenToast(objRetorno.errors)
                else OpenToast('Não foi possível realizar esta ação, tente novamente mais tarde');
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
            editarNumero: editarNumero,
            successEditarNumero: successEditarNumero
        };
                           
}]);     