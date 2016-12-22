'use strict';

angular.module('QuickPeek.Requisicao.ConfigNotificacoes', [
    'RB.pagina'
])
 
.factory('ConfigNotificacoesRequisicoes', ['RBLoadingMobile','GCS', 'Config','ionicToast','Pagina',
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

        function editarNotificacoes(){
            RBLoadingMobile.show();
            var obj = {
                url: Config.getRefAmbienteReq()+"/Usuario/editarNotificacoes",
                dados: $.param(dados),
                tipo: 'POST',
                acao: acaoSuccess,
                error: errorSalvar,
                scope: scope,
                exibeMSGCarregando: 0
            };
            GCS.conectar(obj);
        };
        
        
        function successEditarNotificacoes(objRetorno){
            RBLoadingMobile.hide();
            console.log("objRetorno",objRetorno);
            if(objRetorno.success === true){
            }
            else{
                if(scope.dados.notificacaoPublicacao == 1)scope.dados.notificacaoPublicacao = 0;
                else scope.dados.notificacaoPublicacao = 1;
                OpenToast('Não foi possível atualizar as configurações de suas notificações');
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
            editarNotificacoes: editarNotificacoes,
            successEditarNotificacoes: successEditarNotificacoes
        };
                           
}]);     