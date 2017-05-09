'use strict';

angular.module('RB.pagina', ['RB.validacoesPadroes', 'RB.gcs', 'RB.config', 'toaster','RB.loadingMobile'])

.factory('Pagina', ['RBLoading','VP', 'GCS', 'Config', '$rootScope','$state','RBLoadingMobile','ionicToast','$timeout',
    function(RBLoading,VP, GCS, Config, $rootScope,$state,RBLoadingMobile,ionicToast,$timeout){

    var timeNavegar = 0;
    var appAtual = '';
    var ultDados;

    function getTimeNavegar(){
        return timeNavegar;
    }

    function setApp(app){
        appAtual = app;
        return instancia;
    }

    function hrefDataAjax(href){
        if(typeof href === 'object' )
            return 'href="'+navegar({ idPage: href.id, href: 1})+'" \n\
                    data-ajax = "'+navegar({ idPage: href.id, href: 2})+'"';
        else
            return 'href="'+href+'"';
    };

    function navegar(dados,voltar){
        if(cordova.plugins.Keyboard.isVisible && ionic.Platform.isIOS()){
            cordova.plugins.Keyboard.close();
        }
        $rootScope.dadosVoltar = dados;
          RBLoadingMobile.show('Carregando...');

          if(DGlobal.hitoricoApp == 1){
                if(voltar!=1 && DGlobal.sequenciaVoltar){
                    DGlobal.sequenciaVoltar = false;
                    DGlobal.iniciarHistorico = true;
                }
                ultDados = VP.removeReferencia(dados);
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

            //if(parseInt(dados.href) !== 1 && parseInt(dados.href) !== 2){
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
            //}
    };

    function rollBack(metodoExit){
        if(cordova.plugins.Keyboard.isVisible && ionic.Platform.isIOS()){
            cordova.plugins.Keyboard.close();
        }
        var posicao = historicoNavegacao.length -(DGlobal.reduzirNavegacao) ;

        DGlobal.reduzirNavegacao =2;
        
        while(posicao != -1 && typeof historicoNavegacao[posicao] != "undefined"){
            if(DGlobal.acaoCliente.idPagina == historicoNavegacao[posicao].dados.idPage){
                posicao--;
            }else{
                break;
            }
        }
        console.log(historicoNavegacao);
        console.log(posicao);
        if(posicao == -1){
            console.log("Pressione novamente para fechar.");
            OpenToast("Pressione novamente para fechar.");
            navegar(VP.removeReferencia(historicoNavegacao[0].dados),1);
        }else if(posicao <= -2){
            if(metodoExit)metodoExit();
            else ionic.Platform.exitApp();
        }
        
        if(posicao >= 0){
            if(historicoNavegacao[posicao].cache==1){
                DGlobal = VP.removeReferencia(historicoNavegacao[posicao].DGlobal);
                $timeout(function(){ $state.go(DGlobal.acaoCliente.acao);},0);
            }else{
                navegar(VP.removeReferencia(historicoNavegacao[posicao].dados),1);
            }
            
        }
        

        historicoNavegacao.splice(posicao+1,1);
        DGlobal.sequenciaVoltar = true;
                
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
        if(DGlobal.hitoricoApp == 1){
            acaoPosNavegarHistorico();
        }
    };

    function acaoPosNavegarHistorico(){
        DGlobal.reduzirNavegacao =2;
        $timeout(function(){
            if(!DGlobal.sequenciaVoltar && DGlobal.acaoCliente.historico == 1){
                if(DGlobal.iniciarHistorico){
                    var posicao = historicoNavegacao.length -1;
                    if(typeof VP.removeReferencia(historicoNavegacao[posicao]) != "undefined"){
                        var novoHistorico = VP.removeReferencia(historicoNavegacao[posicao]);
                        historicoNavegacao = [novoHistorico];
                    }
                    DGlobal.iniciarHistorico = false;
                }

                historicoNavegacao.push({cache:DGlobal.acaoCliente.cache,dados:ultDados});
                var posicao = historicoNavegacao.length -1;

                if(DGlobal.acaoCliente.cache==1){
                    if(typeof VP.removeReferencia(DGlobal) != "undefined") 
                        historicoNavegacao[posicao].DGlobal=VP.removeReferencia(DGlobal);
                }
            }else if(!DGlobal.sequenciaVoltar){
                DGlobal.reduzirNavegacao = 1;
            }
            //console.log(VP.removeReferencia(historicoNavegacao), 'PASSOU ACAO NAVEGAR');
        },0);
    }

    function navegarHref(url){
        timeNavegar = 1;
        Config.fecharModais();
        Config.divCarregandoPadrao();
        Config.habilitarCarregamentoFeed();

        GCS.conectar(url, 'get', null, acaoNavegar, null,0,0,0);
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
        rollBack:rollBack
    };

    return instancia;

 }]);
