'use strict';

angular.module('RB.pagina', ['RB.validacoesPadroes', 'RB.gcs', 'RB.config', 'toaster'])

.factory('Pagina', ['RBLoading','VP', 'GCS', 'Config', 'toaster','$timeout',
    function(RBLoading,VP, GCS, Config, toaster,$timeout) {
   
    var timeNavegar = 0;
    var appAtual = '';
    
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
    
    function navegar(dados){
        //if(parseInt(timeNavegar) === 0){
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
                
                //AbasGerenc.gerarIdAba();
                dadosPadrao.dados.idAba = DGlobal.acaoCliente.aba;
                
                var dadosRequisicao = {
                    //url:Config.getRefAmbienteReq()+'?c=Navegacao&o=getDados&idPage='+dadosPadrao.idPage+'&opc='+dadosPadrao.opc+dadosPadrao.paramAdd,
                    url:Config.getRefAmbienteReq()+'/Navegacao/Tela/'+dadosPadrao.idPage+'/'+dadosPadrao.opc+'/'+appAtual+dadosPadrao.paramAdd,
                    tipo:'post',
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
            else if(parseInt(dados.href) === 1){
                return Config.getRefAmbiente()+'../index.php?nvp=1&idPage='+dados.idPage+'&opc=1'+dados.paramAdd;
            }else if(parseInt(dados.href) === 2){
                return Config.getRefAmbienteReq()+'?c=Navegacao&o=getDados&idPage='+dados.idPage+'&opc='+dados.opc+dados.paramAdd;
            }
        //}else toaster.error({title: "Aguarde...", body: 'O servidor ainda não respondeu sua solicitação.'});
    };
    
    function acaoErroNavegar(){
        RBLoading.changeStatus(false);
        timeNavegar = 0;
        //MSG.abirMesagemAcao('Servidor não responde! Tente novamente.');
        toaster.error({title: "Servidor não responde!", body: 'Tente novamente.'});
    };
    
    function acaoNavegar(dados){
        RBLoading.changeStatus(false);
        timeNavegar = 0;
        if(dados.success){
            console.log("cheguei acao servidor");
            GCS.executarAcaoServidor(dados);  
            
            $timeout(function(){
                $('html, body').animate({
                           scrollTop:0
                        }, 1000);
            },1000);
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
    
    var instancia = {
        hrefDataAjax:hrefDataAjax,
        navegar: navegar,
        setApp: setApp,
        acaoNavegar:acaoNavegar,
        navegarHref:navegarHref,
        getTimeNavegar: getTimeNavegar,
        acaoErroNavegar: acaoErroNavegar
    };
    
    return instancia;
    
 }]);