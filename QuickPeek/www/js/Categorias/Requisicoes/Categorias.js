'use strict';

angular.module('QuickPeek.Requisicao.Categorias', [
    'RB.pagina'
])
 
.factory('CategoriasRequisicoes', ['RBLoadingMobile','GCS', 'Config','ionicToast','Pagina',
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

        function addLocal(){
            RBLoadingMobile.show();
            var obj = {
                url: Config.getRefAmbienteReq()+"/Local/cadastro",
                dados: $.param(dados),
                tipo: 'POST',
                acao: acaoSuccess,
                error: errorSalvar,
                scope: scope,
                exibeMSGCarregando: 1
            };
            GCS.conectar(obj);
        };
        
        function successAddlocal(objRetorno){
            RBLoadingMobile.hide();
            console.log('objRetorno');
            console.log(objRetorno);
            //alert(JSON.stringify(objRetorno));
            if(objRetorno.success === true) {
                DGlobal.checkIn = {
                    local:{
                        localId:objRetorno.dados.id,
                        localTitulo:dados.titulo
                    }
                };
                Pagina.navegar({idPage:30});
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
            addLocal: addLocal,
            successAddlocal: successAddlocal
        };
                           
}]);     
