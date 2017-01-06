'use strict';

angular.module('QuickPeek.Requisicao.PessoasLocal', [
    'RB.pagina'
])
 
.factory('PessoasLocalRequisicoes', ['RBLoadingMobile','GCS', 'Config','ionicToast','Pagina',
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

        function listar(){
            var obj = {
                url: Config.getRefAmbienteReq()+"/Listar/listarPessoas",
                dados: $.param(dados),
                tipo: 'POST',
                acao: acaoSuccess,
                error: errorSalvar,
                scope: scope,
                exibeMSGCarregando: 0
            };
            GCS.conectar(obj);
        };
        
        function successListar(objRetorno){
            RBLoadingMobile.hide();
            //alert(JSON.stringify(objRetorno));
            console.log("objRetorno",objRetorno);
            if(objRetorno.success === true){
                for(var i = 0; i < objRetorno.dados.length;i++){
                    scope.dados.pessoas.push(objRetorno.dados[i]);
                }
            }
        };
        
        function errorSalvar(dados, scope){
            RBLoadingMobile.hide();
            OpenToast("Não existem mais pessoas neste local");
        };
        
        
        function OpenToast(message) {
            ionicToast.show(message, 'bottom', false, 3000);
        }
        
        return {
            set: set,
            listar: listar,
            successListar: successListar
        };       
}]);