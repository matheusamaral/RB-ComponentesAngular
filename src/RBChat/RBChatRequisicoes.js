'use strict';

angular.module('RB.ChatRequisicoes', [
    'RB.pagina'
])
 
.factory('RBChatRequisicoes', ['RBLoadingMobile','GCS', 'Config','ionicToast','Pagina','$timeout','InfinitScroll',
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
        
        function buscarGif(){
            RBLoadingMobile.show('Pesquisando gif...');
            var obj = {
                url: Config.getRefAmbienteReq()+"/Acoes/gifSearch",
                dados: $.param(dados),
                tipo: 'POST',
                acao: acaoSuccess,
                error: errorSalvar,
                scope: scope,
                exibeMSGCarregando: 0
            };
            GCS.conectar(obj);
        };
        
        function successBuscarGif(objRetorno){
            console.log("objRetorno",objRetorno);
            RBLoadingMobile.hide();
            if(objRetorno.success === true){
                if(objRetorno.dados.length)
                    for(var i = 0; i < objRetorno.dados.length;i++){
                        scope.rbChat.gifs.unshift(objRetorno.dados[i]);
                    }
            }
        };
        
        function adicionaRespostas(array){
//            for(var i = 0; i < array.length;i++){
                scope.dados.respostas=scope.dados.respostas.concat(array);
//            }
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
            successListarRespostas: successListarRespostas,
            buscarGif:buscarGif,
            successBuscarGif:successBuscarGif
        };       
}]);
