'use strict';

angular.module('QuickPeek.Requisicao.TiraSelfie', [
    'RB.pagina'
])
 
.factory('TiraSelfieRequisicoes', ['RBLoadingMobile','GCS', 'Config','ionicToast','Pagina',
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

        function salvarImg(){
            RBLoadingMobile.show();
            console.log(dados);
            var obj = {
                url: Config.getRefAmbienteReq()+"/Usuario/salvarFoto",
                dados: $.param(dados),
                tipo: 'POST',
                acao: acaoSuccess,
                error: errorSalvar,
                scope: scope,
                exibeMSGCarregando: 0
            };
            GCS.conectar(obj);
        };
        
        function successSalvar(objRetorno){
            RBLoadingMobile.hide();
            if(objRetorno.success === true){
                DGlobal.dadosSelfie = objRetorno.endereco;
                Pagina.navegar({idPage:6});
            }else{
                if(objRetorno.errors) OpenToast(objRetorno.errors);
            }
        };
        
        function editarImg(){
            RBLoadingMobile.show();
            console.log(dados);
            var obj = {
                url: Config.getRefAmbienteReq()+"/Usuario/editarFotoPerfil",
                dados: $.param(dados),
                tipo: 'POST',
                acao: acaoSuccess,
                error: errorSalvar,
                scope: scope,
                exibeMSGCarregando: 0
            };
            GCS.conectar(obj);
        };
        
        function successEditar(objRetorno){
            RBLoadingMobile.hide();
            console.log("objRetorno",objRetorno);
            if(objRetorno.success === true){
                DGlobal.dadosSelfie = objRetorno.endereco;
                Pagina.navegar({idPage:6});
            }else{
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
            salvarImg: salvarImg,
            successSalvar: successSalvar,
            editarImg:editarImg,
            successEditar:successEditar
        };
                           
}]);     
