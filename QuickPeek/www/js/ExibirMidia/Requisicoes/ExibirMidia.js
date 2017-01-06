'use strict';

angular.module('QuickPeek.Requisicao.ExibirMidia', [
    'RB.pagina'
])
 
.factory('ExibirMidiaRequisicoes', ['RBLoadingMobile','GCS', 'Config','ionicToast','Pagina',
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

        function curtir(){
            RBLoadingMobile.show();
            console.log(dados);
            var obj = {
                url: Config.getRefAmbienteReq()+"/Acoes/curtirMidia",
                dados: $.param(dados),
                tipo: 'POST',
                acao: acaoSuccess,
                error: errorSalvar,
                scope: scope,
                exibeMSGCarregando: 0
            };
            GCS.conectar(obj);
        };
        
        
        function successCurtir(objRetorno){
            RBLoadingMobile.hide();
            console.log("objRetorno",objRetorno);
            if(objRetorno.success === true){
                validaCurtidaCliente();
            }else{
                if(objRetorno.errors) OpenToast(objRetorno.errors);
                else OpenToast('Algo de errado ocorreu, tente novamente mais tarde');
                //alidaCurtidaCliente();
            }
        };
        
        function validaCurtidaCliente(){
            for(var i = 0; i < scope.midias.length; i++){
                if(dados.midiaId == scope.midias[i].id){
                    if(scope.midias[i].jaCurtiu == 0){
                        scope.midias[i].jaCurtiu = 1;
                        scope.midias[i].curtidas.push(
                            {usuarioId:scope.dadosUser.usuarioId,nome:scope.dadosUser.usuarioNome}
                        );
                    }else{
                        scope.midias[i].jaCurtiu = 0;
                        for(var j = 0; j < scope.midias[i].curtidas.length; j++){
                            if(scope.dadosUser.usuarioId == scope.midias[i].curtidas[j].usuarioId)
                            scope.midias[i].curtidas.splice(j,1);
                        }
                    }
                }
            }
        }
        
        function errorSalvar(dados, scope){
            RBLoadingMobile.hide();
            OpenToast("Não foi possível efetuar a ação, por favor, tente novamente!");
        };
        
        function OpenToast(message) {
          ionicToast.show(message, 'bottom', false, 3000);
        }
        
        return {
            set: set,
            successCurtir: successCurtir,
            curtir: curtir
        };
                           
}]);     
