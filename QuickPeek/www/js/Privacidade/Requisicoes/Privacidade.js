'use strict';

angular.module('QuickPeek.Requisicao.Privacidade', [
    'RB.pagina'
])
 
.factory('PrivacidadeRequisicoes', ['RBLoadingMobile','GCS', 'Config','ionicToast','Pagina',
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

        function fazerCheckIn(){
            RBLoadingMobile.show();
            var obj = {
                url: Config.getRefAmbienteReq()+"/Local/checkIn",
                dados: $.param(dados),
                tipo: 'POST',
                acao: acaoSuccess,
                error: errorSalvar,
                scope: scope,
                exibeMSGCarregando: 0
            };
            GCS.conectar(obj);
        };
        
        
        function successFazerCheckIn(objRetorno){
            RBLoadingMobile.hide();
            //alert(JSON.stringify(objRetorno));
            if(objRetorno.success === true){
                DGlobal.localAtual = dados.localId;
                Pagina.navegar({idPage:24,paramAdd:'?longitude='+DGlobal.coordenadasAtual.longitude+'&latitude='+DGlobal.coordenadasAtual.latitude+'&localId='+dados.localId+'&atualizando=0'})
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
            fazerCheckIn: fazerCheckIn,
            successFazerCheckIn: successFazerCheckIn
        };
                           
}]);     
