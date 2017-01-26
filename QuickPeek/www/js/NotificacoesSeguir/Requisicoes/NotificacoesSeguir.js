'use strict';

angular.module('QuickPeek.Requisicao.NotificacoesSeguir', [
    'RB.pagina'
])
 
.factory('NotificacoesSeguirRequisicoes', ['RBLoadingMobile','GCS', 'Config','ionicToast','Pagina',
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

        function confirmar(){
            RBLoadingMobile.show();
            var obj = {
                url: Config.getRefAmbienteReq()+"/Acoes/confirmarSeguir",
                dados: $.param(dados),
                tipo: 'POST',
                acao: acaoSuccess,
                error: errorSalvar,
                scope: scope,
                exibeMSGCarregando: 0
            };
            GCS.conectar(obj);
        };
        
        function successConfirmar(objRetorno){
            RBLoadingMobile.hide();
            console.log("objRetorno",objRetorno);
            if(objRetorno.success === true) {
                for(var i = 0; i < scope.dados.pessoas.length;i++){
                    if(dados.seguirId == scope.dados.pessoas[i].seguirId){
                        scope.dados.pessoas.splice(i,1);
                    }
                }
            }
            else{
                if(objRetorno.errors) OpenToast(objRetorno.errors);
                else OpenToast('Não foi possível confirmar esta pessoa!');
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
            confirmar: confirmar,
            successConfirmar: successConfirmar
        };
                           
}]);     