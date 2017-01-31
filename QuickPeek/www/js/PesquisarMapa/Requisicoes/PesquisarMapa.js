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
                scope.locais = objRetorno.dados;
                scope.dados.termoBuscado = false;
            }
            scope.dados.termoBuscado = dados.nome;
        };
        
        function successPesquisarLocaisScroll(objRetorno){
            RBLoadingMobile.hide();
            scope.pesquisou = true;
            console.log("objRetorno",objRetorno);
            if(objRetorno.success === true){
                for(var i = 0; i < objRetorno.dados.length;i++){
                    scope.locais.push(objRetorno.dados[i]);
                }
            }
        };
        
        function pesquisarPessoas(){
            if(scope.busca.buscandoPessoa == false){
                scope.busca.buscandoPessoa = true;
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
            }
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
            scope.busca.buscandoPessoa = false;
        };
        
        function successPesquisarPessoasScroll(objRetorno){
            RBLoadingMobile.hide();
            console.log("objRetorno",objRetorno);
            if(objRetorno.success === true){
                for(var i = 0; i < objRetorno.dados.length;i++){
                    scope.pessoas.push(objRetorno.dados[i]);
                }
            }
            scope.busca.buscandoPessoa = false;
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
            if(objRetorno.success === true){
                for(var i = 0;i < scope.pessoas.length; i++){
                    if(dados.usuarioSeguirId == scope.pessoas[i].usuarioId){
                        scope.pessoas[i].seguindo = 2;
                    }
                }
            }
            else{
                if(objRetorno.errors) OpenToast(objRetorno.errors);
                else OpenToast('Não foi possível seguir este usuário');
            }
        };
        
        function cancelarSeguir(){
            RBLoadingMobile.show();
            var obj = {
                url: Config.getRefAmbienteReq()+"/Acoes/cancelarSolicitacaoSeguir",
                dados: $.param(dados),
                tipo: 'POST',
                acao: acaoSuccess,
                error: errorSalvar,
                scope: scope,
                exibeMSGCarregando: 0
            };
            GCS.conectar(obj);
        };
        
        function successCancelarSeguir(objRetorno){
            RBLoadingMobile.hide();
            console.log("objRetorno",objRetorno);
            if(objRetorno.success === true){
                for(var i = 0;i < scope.pessoas.length; i++){
                    if(dados.seguirId == scope.pessoas[i].seguirId){
                        scope.pessoas[i].seguindo = 0;
                    }
                }
            }
            else{
                if(objRetorno.errors) OpenToast(objRetorno.errors);
                else OpenToast('Não foi possível seguir este usuário');
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
                for(var i = 0;i < scope.pessoas.length; i++){
                    if(dados.usuarioSeguirId == scope.pessoas[i].usuarioId){
                        scope.pessoas[i].seguindo = 0;
                    }
                }
            }
            else{
                if(objRetorno.errors) OpenToast(objRetorno.errors);
                else OpenToast('Não foi possível deixar de seguir este usuário');
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
            successPesquisarPessoasScroll: successPesquisarPessoasScroll,
            seguir:seguir,
            successSeguir:successSeguir,
            cancelarSeguir:cancelarSeguir,
            successCancelarSeguir:successCancelarSeguir,
            deixarDeSeguir:deixarDeSeguir,
            successDeixarDeSeguir:successDeixarDeSeguir
        };       
}]);