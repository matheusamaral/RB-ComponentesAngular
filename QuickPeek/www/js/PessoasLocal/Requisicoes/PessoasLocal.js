'use strict';

angular.module('QuickPeek.Requisicao.PessoasLocal', [
    'RB.pagina',
    'Cmp.InfinitScroll'
])
 
.factory('PessoasLocalRequisicoes', ['RBLoadingMobile','GCS', 'Config','ionicToast','InfinitScroll',
      function (RBLoadingMobile,GCS, Config,ionicToast,InfinitScroll) {
        
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
            $timeout(function(){
                InfinitScroll.fechaLoaderBottom();
            },500);
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
                for(var i = 0;i < scope.dados.pessoas.length; i++){
                    if(dados.usuarioSeguirId == scope.dados.pessoas[i].usuarioId){
                        if(objRetorno.aceite == 1)
                            scope.dados.pessoas[i].seguindo = 1;
                        else
                            scope.dados.pessoas[i].seguindo = 2;
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
                for(var i = 0;i < scope.dados.pessoas.length; i++){
                    if(dados.seguirId == scope.dados.pessoas[i].seguirId){
                        scope.dados.pessoas[i].seguindo = 0;
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
                for(var i = 0;i < scope.dados.pessoas.length; i++){
                    if(dados.usuarioSeguirId == scope.dados.pessoas[i].usuarioId){
                        scope.dados.pessoas[i].seguindo = 0;
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
            OpenToast("Não existem mais pessoas neste local");
        };
        
        
        function OpenToast(message) {
            ionicToast.show(message, 'bottom', false, 3000);
        }
        
        return {
            set: set,
            listar: listar,
            successListar: successListar,
            seguir:seguir,
            successSeguir:successSeguir,
            cancelarSeguir:cancelarSeguir,
            successCancelarSeguir:successCancelarSeguir,
            successDeixarDeSeguir:successDeixarDeSeguir,
            deixarDeSeguir:deixarDeSeguir
        };       
}]);