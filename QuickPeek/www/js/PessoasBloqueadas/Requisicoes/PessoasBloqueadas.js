'use strict';

angular.module('QuickPeek.Requisicao.PessoasBloqueadas', [
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

        function desbloquear(){
            RBLoadingMobile.show();
            var obj = {
                url: Config.getRefAmbienteReq()+"/Usuario/desbloquear",
                dados: $.param(dados),
                tipo: 'POST',
                acao: acaoSuccess,
                error: errorSalvar,
                scope: scope,
                exibeMSGCarregando: 0
            };
            GCS.conectar(obj);
        };
        
        function successDesbloquear(objRetorno){
            RBLoadingMobile.hide();
            alert(JSON.stringify(objRetorno));
            console.log("objRetorno",objRetorno);
            if(objRetorno.success === true) {
                for(var i = 0; i < scope.dados.pessoas.length;i++){
                    if(dados.usuarioBloqueadoId == scope.dados.pessoas[i].usuarioId){
                        scope.dados.pessoas.splice(i,1);
                    }
                }
                scope.desbloquearPopup.close();
            }
            else{
                if(objRetorno.errors) OpenToast(objRetorno.errors);
                else OpenToast('Não foi possível desbloquear esta pessoa!');
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
            desbloquear: desbloquear,
            successDesbloquear: successDesbloquear
        };
                           
}]);     