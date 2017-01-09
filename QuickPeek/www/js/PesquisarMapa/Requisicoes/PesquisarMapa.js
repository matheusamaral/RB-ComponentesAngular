'use strict';

angular.module('QuickPeek.Requisicao.PesquisarMapa', [
    'RB.pagina'
])
 
.factory('PesquisarMapaRequisicoes', ['RBLoadingMobile','GCS', 'Config','ionicToast','Pagina',
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

        function pesquisarLocais(){
            var obj = {
                url: Config.getRefAmbienteReq()+"/Local/pesquisarLocais",
                dados: $.param(dados),
                tipo: 'POST',
                acao: acaoSuccess,
                error: errorSalvar,
                scope: scope,
                exibeMSGCarregando: 0
            };
            GCS.conectar(obj);
        };
        
        function successPesquisarLocais(objRetorno){
            RBLoadingMobile.hide();
            console.log("objRetorno",objRetorno);
            if(objRetorno.success === true){
//                for(var i = 0; i < objRetorno.dados.length;i++){
//                    scope.locais.push(objRetorno.dados[i]);
//                }
                scope.locais = objRetorno.dados;
            }
        };
        
        function successPesquisarLocaisScroll(objRetorno){
            RBLoadingMobile.hide();
            console.log("objRetorno",objRetorno);
            if(objRetorno.success === true){
                for(var i = 0; i < objRetorno.dados.length;i++){
                    scope.locais.push(objRetorno.dados[i]);
                }
            }
        };
        
        function pesquisarPessoas(){
            var obj = {
                url: Config.getRefAmbienteReq()+"/Local/pesquisarPessoas",
                dados: $.param(dados),
                tipo: 'POST',
                acao: acaoSuccess,
                error: errorSalvar,
                scope: scope,
                exibeMSGCarregando: 0
            };
            GCS.conectar(obj);
        };
        
        function successPesquisarPessoas(objRetorno){
            RBLoadingMobile.hide();
            console.log("objRetorno",objRetorno);
            if(objRetorno.success === true){
//                for(var i = 0; i < objRetorno.dados.length;i++){
//                    scope.locais.push(objRetorno.dados[i]);
//                }
                scope.pessoas = objRetorno.dados;
            }
        };
        
        function successPesquisarPessoasScroll(objRetorno){
            RBLoadingMobile.hide();
            console.log("objRetorno",objRetorno);
            if(objRetorno.success === true){
                for(var i = 0; i < objRetorno.dados.length;i++){
                    scope.pessoas.push(objRetorno.dados[i]);
                }
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
            pesquisarLocais: pesquisarLocais,
            successPesquisarLocais: successPesquisarLocais,
            successPesquisarLocaisScroll: successPesquisarLocaisScroll,
            pesquisarPessoas: pesquisarPessoas,
            successPesquisarPessoas: successPesquisarPessoas,
            successPesquisarPessoasScroll: successPesquisarPessoasScroll
        };       
}]);