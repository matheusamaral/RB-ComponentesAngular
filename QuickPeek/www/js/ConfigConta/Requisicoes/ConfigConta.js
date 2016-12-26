'use strict';

angular.module('QuickPeek.Requisicao.ConfigConta', [
    'RB.pagina'
])
 
.factory('ConfigContaRequisicoes', ['RBLoadingMobile','GCS', 'Config','ionicToast','Pagina',
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

        function editarVisibilidade(){
            RBLoadingMobile.show();
            var obj = {
                url: Config.getRefAmbienteReq()+"/Usuario/editarVisibilidadePadrao",
                dados: $.param(dados),
                tipo: 'POST',
                acao: acaoSuccess,
                error: errorSalvar,
                scope: scope,
                exibeMSGCarregando: 0
            };
            GCS.conectar(obj);
        };
        
        
        function successEditarVisibilidade(objRetorno){
            RBLoadingMobile.hide();
            console.log("objRetorno",objRetorno);
            if(objRetorno.success === true){
                scope.dados.visibilidadeTitulo = dados.titulo;
                scope.dados.visibilidade = dados.visibilidadeId;
                scope.popupVisibilidade.close();
            }
            else{
                scope.dados.visibilidadeTitulo = scope.dadosAntigos.visibilidadeTitulo;
                scope.dados.visibilidade = scope.dadosAntigos.visibilidade;
                scope.popupVisibilidade.close();
                if(objRetorno.errors){
                    OpenToast(objRetorno.errors);
                }else{
                    OpenToast("Não foi possível atualizar esta configuração");
                }
            }
        };
        
        function editarCPrivada(){
            RBLoadingMobile.show();
            var obj = {
                url: Config.getRefAmbienteReq()+"/Usuario/editarContaPrivada",
                dados: $.param(dados),
                tipo: 'POST',
                acao: acaoSuccess,
                error: errorSalvar,
                scope: scope,
                exibeMSGCarregando: 0
            };
            GCS.conectar(obj);
        };
        
        
        function successEditarCPrivada(objRetorno){
            RBLoadingMobile.hide();
            console.log("objRetorno",objRetorno);
            if(objRetorno.success === true){
                scope.contaPrivadaPopup.close();
            }
            else{
                scope.dados.contaPrivada = scope.opTemporarea;
                scope.contaPrivadaPopup.close();
                if(objRetorno.errors){
                    OpenToast(objRetorno.errors);
                }else{
                    OpenToast("Não foi possível atualizar esta configuração");
                }
            }
        };
        
        
        function errorSalvar(dados, scope){
            RBLoadingMobile.hide();
            OpenToast("Não foi possível efetuar a ação, por favor, tente novamente!");
        };
        
        
        function OpenToast(message) {
          ionicToast.show(message, 'top', false, 3000);
        }
        
        return {
            set: set,
            editarVisibilidade: editarVisibilidade,
            editarCPrivada:editarCPrivada,
            successEditarVisibilidade: successEditarVisibilidade,
            successEditarCPrivada: successEditarCPrivada
        };
                           
}]);     