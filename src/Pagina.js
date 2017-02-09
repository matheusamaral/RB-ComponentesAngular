'use strict';

angular.module('RB.pagina', ['RB.validacoesPadroes', 'RB.gcs', 'RB.config', 'toaster','RB.loadingMobile'])

.factory('Pagina', ['RBLoading','VP', 'GCS', 'Config', '$rootScope','$state','RBLoadingMobile','ionicToast','$timeout',
    function(RBLoading,VP, GCS, Config, $rootScope,$state,RBLoadingMobile,ionicToast,$timeout){
   
    var timeNavegar = 0;
    var appAtual = '';
    var funcaoPreNavegacao = [];
    
    function getTimeNavegar(){
        return timeNavegar;
    }
    
    function setApp(app){
        appAtual = app;
        return instancia;
    }
    
    function addPreNavegar(acao){
        funcaoPreNavegacao.push(acao);
    };
    
    function limpaAcaoPreNavegarIndice(indice){
        funcaoPreNavegacao=funcaoPreNavegacao.slice(indice,1);
    }
    
    function limpaAcaoPreNavegar(){
        funcaoPreNavegacao='';
    }
    
    function hrefDataAjax(href){
        if(typeof href === 'object' )
            return 'href="'+navegar({ idPage: href.id, href: 1})+'" \n\
                    data-ajax = "'+navegar({ idPage: href.id, href: 2})+'"';
        else
            return 'href="'+href+'"';
    };
    
    function navegar(dados){
        var dg = VP.removeReferencia(DGlobal);
        if(dg.prevDGlobal)delete dg.prevDGlobal;
        DGlobal.prevDGlobal = VP.removeReferencia(dg);
        RBLoadingMobile.show('Carregando...');
        if(funcaoPreNavegacao.length){
            for(var i=0; i<funcaoPreNavegacao.length; i++){
                funcaoPreNavegacao[i](i);
            }
        }
            var dadosPadrao = {
                idPage:'',
                opc: 2,// não vem os dados opcionais
                paramAdd: '',
                href: 0,
                dados: {}
            };
            
            dadosPadrao = VP.validarObj(dados,dadosPadrao);
            RBLoading.changeStatus(true);
            
            if(parseInt(dados.href) !== 1 && parseInt(dados.href) !== 2){
                timeNavegar = 1;
                
                var dadosRequisicao = {
                    url:Config.getRefAmbienteReq()+'/Navegacao/Tela/'+dadosPadrao.idPage+'/'+dadosPadrao.opc+'/'+appAtual+dadosPadrao.paramAdd,
                    tipo:'GET',
                    dados:dadosPadrao.dados,
                    acao: acaoNavegar, 
                    error: acaoErroNavegar,
                    guardarLocal:0,
                    exibeMSG:0,
                    exibeMSGCarregando:1
                };
                GCS.conectar(dadosRequisicao);
                return false;
            }
    };
    
    function rollBack(){
        var length = $rootScope.regraNavegacao.length - 1;
        
        $timeout(function(){
            DGlobal = VP.removeReferencia($rootScope.regraNavegacao[length].DGlobal);
            DGlobal.rollback = true;
            $state.go($rootScope.regraNavegacao[length].name);
            $rootScope.regraNavegacao.splice(length,1);
        },0);
    }
    
    function acaoErroNavegar(){
        RBLoadingMobile.hide();
        timeNavegar = 0;
        OpenToast("Servidor não responde, por favor, tente novamente!");
    };
    
    function acaoNavegar(dados){
        RBLoadingMobile.hide();
        timeNavegar = 0;
        if(dados.success){

            GCS.executarAcaoServidor(dados);
        }
    };
    
    function navegarHref(url){
        timeNavegar = 1;
        Config.fecharModais();
        Config.divCarregandoPadrao();
        Config.habilitarCarregamentoFeed();

        GCS.conectar(url,
                'get', null, acaoNavegar, null,0,0,0);
        return false;
    };
    
    function OpenToast(message) {
      ionicToast.show(message, 'top', false, 3000);
    }
    
    var instancia = {
        hrefDataAjax:hrefDataAjax,
        navegar: navegar,
        setApp: setApp,
        acaoNavegar:acaoNavegar,
        navegarHref:navegarHref,
        getTimeNavegar: getTimeNavegar,
        acaoErroNavegar: acaoErroNavegar,
        addPreNavegar:addPreNavegar,
        limpaAcaoPreNavegarIndice:limpaAcaoPreNavegarIndice,
        limpaAcaoPreNavegar:limpaAcaoPreNavegar,
        rollBack:rollBack
    };
    
    return instancia;
    
 }]);