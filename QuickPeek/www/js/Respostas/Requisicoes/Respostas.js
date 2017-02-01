'use strict';

angular.module('QuickPeek.Requisicao.Respostas', [
    'RB.pagina'
])
 
.factory('RespostasRequisicoes', ['RBLoadingMobile','GCS', 'Config','ionicToast','Pagina','$timeout','InfinitScroll',
      function (RBLoadingMobile,GCS, Config,ionicToast,Pagina,$timeout,InfinitScroll) {
        
        var dados;
        var scope;
        var acaoSuccess;

        function set(obj){
            dados = obj.dados;
            scope = obj.scope;
            acaoSuccess = obj.acaoSuccess;
            return this;
        };

        function listarRespostas(){
            var obj = {
                url: Config.getRefAmbienteReq()+"/Listar/listarMensagensPerguntas",
                dados: $.param(dados),
                tipo: 'POST',
                acao: acaoSuccess,
                error: errorSalvar,
                scope: scope,
                exibeMSGCarregando: 0
            };
            GCS.conectar(obj);
        };
        
        function successListarRespostas(objRetorno){
            console.log("objRetorno",objRetorno);
            if(objRetorno.success === true){
                console.log('deu certo');
                if(objRetorno.dados.respostas)
                    adicionaRespostas(objRetorno.dados.respostas);
            }
            $timeout(function(){
                InfinitScroll.fechaLoader();
            },500);
        };
        
        function adicionaRespostas(array){
            for(var i = 0; i < array.length;i++){
                scope.dados.respostas.push(array[i]);
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
            listarRespostas: listarRespostas,
            successListarRespostas: successListarRespostas
        };       
}]);
