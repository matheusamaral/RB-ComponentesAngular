'use strict';

angular.module('QuickPeek.Requisicao.PerguntasLocal', [
    'RB.pagina'
])
 
.factory('PerguntasLocalRequisicoes', ['RBLoadingMobile','GCS', 'Config','ionicToast','Pagina',
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

        function verfificarResposta(){
            var obj = {
                url: Config.getRefAmbienteReq()+"/Acoes/verificarVisibilidadeResposta",
                dados: $.param(dados),
                tipo: 'POST',
                acao: acaoSuccess,
                error: errorSalvar,
                scope: scope,
                exibeMSGCarregando: 0
            };
            GCS.conectar(obj);
        };
        
        function successVerificar(objRetorno){
            RBLoadingMobile.hide();
            console.log("objRetorno",objRetorno);
            if(objRetorno.success === true){
                if(objRetorno.dados == 0)
                    Pagina.navegar({idPage:38});
                else
                    Pagina.navegar({idPage:34,paramAdd:'?perguntasId='+dados.perguntasId});
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
            verfificarResposta: verfificarResposta,
            successVerificar: successVerificar
        };       
}]);