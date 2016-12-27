'use strict';

angular.module('QuickPeek.Requisicao.Seguidores', [
    'RB.pagina'
])
 
.factory('SeguidoresRequisicoes', ['RBLoadingMobile','GCS', 'Config','ionicToast','Pagina',
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

        function seguir(){
            RBLoadingMobile.show();
            var obj = {
                url: Config.getRefAmbienteReq()+"/Acoes/seguir",
                dados: $.param(dados),
                tipo: 'POST',
                acao: acaoSuccess,
                error: errorSalvar,
                scope: scope,
                exibeMSGCarregando: 0
            };
            GCS.conectar(obj);
        };
        
        
        function successSeguir(objRetorno){
            RBLoadingMobile.hide();
            console.log("objRetorno",objRetorno);
            if(objRetorno.success === true) {
                for(var i = 0; i < scope.dados.seguidores.length; i++){
                    if(dados.usuarioSeguirId == scope.dados.seguidores[i].usuarioId){
                        scope.dados.seguidores[i].seguindo = 1;
                    }
                }
            }
            else{
                if(objRetorno.errors) OpenToast(objRetorno.errors);
                else
                    OpenToast('Não foi possível seguir!');
            }
        };
        function deixarDeSeguir(){
            RBLoadingMobile.show();
            var obj = {
                url: Config.getRefAmbienteReq()+"/Acoes/deixarSeguir",
                dados: $.param(dados),
                tipo: 'POST',
                acao: acaoSuccess,
                error: errorSalvar,
                scope: scope,
                exibeMSGCarregando: 0
            };
            GCS.conectar(obj);
        };
        
        
        function successDeixarDeSeguir(objRetorno){
            RBLoadingMobile.hide();
            console.log("objRetorno",objRetorno);
            if(objRetorno.success === true) {
                for(var i = 0; i < scope.dados.seguidores.length; i++){
                    if(dados.usuarioSeguirId == scope.dados.seguidores[i].usuarioId){
                        scope.dados.seguidores[i].seguindo = 0;
                    }
                }
            }else{
                if(objRetorno.errors) OpenToast(objRetorno.errors);
                else
                    OpenToast('Não foi possível seguir!');
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
            seguir: seguir,
            successSeguir: successSeguir,
            deixarDeSeguir:deixarDeSeguir,
            successDeixarDeSeguir:successDeixarDeSeguir
        };
                           
}]);     