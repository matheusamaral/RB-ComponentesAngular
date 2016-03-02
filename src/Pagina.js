'use strict';

angular.module('RB.pagina', ['RB.validacoesPadroes', 'RB.gcs', 'RB.config', 'toaster'])

.factory('Pagina', ['VP', 'GCS', 'Config', 'toaster',
    function(VP, GCS, Config, toaster) {
   
    var timeNavegar = 0;
    
    function getTimeNavegar(){
        return timeNavegar;
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
            
            if(parseInt(dados.href) !== 1 && parseInt(dados.href) !== 2){
                timeNavegar = 1;
                
                //AbasGerenc.gerarIdAba();
                dadosPadrao.dados.idAba = DGlobal.acaoCliente.aba;
                
                var dadosRequisicao = {
                    //url:Config.getRefAmbienteReq()+'?c=Navegacao&o=getDados&idPage='+dadosPadrao.idPage+'&opc='+dadosPadrao.opc+dadosPadrao.paramAdd,
                    url:Config.getRefAmbienteReq()+'/Navegacao/Tela/'+dadosPadrao.idPage+'/'+dadosPadrao.opc+dadosPadrao.paramAdd,
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
        timeNavegar = 0;
        //MSG.abirMesagemAcao('Servidor não responde! Tente novamente.');
        toaster.error({title: "Servidor não responde!", body: 'Tente novamente.'});
    };
    
    function acaoNavegar(dados){
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
    
    return {
        hrefDataAjax:hrefDataAjax,
        navegar: navegar,
        acaoNavegar:acaoNavegar,
        navegarHref:navegarHref,
        getTimeNavegar: getTimeNavegar,
        acaoErroNavegar: acaoErroNavegar
    };
    
 }]);