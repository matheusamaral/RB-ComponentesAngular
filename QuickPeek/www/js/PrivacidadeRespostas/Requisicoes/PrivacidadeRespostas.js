'use strict';

angular.module('QuickPeek.Requisicao.PrivacidadeRespostas', [
    'RB.pagina'
])
 
.factory('PrivacidadeRespostasRequisicoes', ['RBLoadingMobile','GCS', 'Config','ionicToast','Pagina',
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

        function setarVisibilidade(){
            RBLoadingMobile.show();
            var obj = {
                url: Config.getRefAmbienteReq()+"/Acoes/setarVisibilidadeResposta",
                dados: $.param(dados),
                tipo: 'POST',
                acao: acaoSuccess,
                error: errorSalvar,
                scope: scope,
                exibeMSGCarregando: 0
            };
            GCS.conectar(obj);
        };
        
        
        function successSetarVisibilidade(objRetorno){
            RBLoadingMobile.hide();
            console.log(objRetorno);
            //alert(JSON.stringify(objRetorno));
            if(objRetorno.success === true){
                Pagina.navegar({idPage:34,paramAdd:'?perguntasId='+dados.perguntasId});
            }
            else{
                if(objRetorno.errors) OpenToast(objRetorno.errors);
                else OpenToast('Não foi possível mudar sua privacidade');
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
            setarVisibilidade: setarVisibilidade,
            successSetarVisibilidade: successSetarVisibilidade
        };
                           
}]);     
