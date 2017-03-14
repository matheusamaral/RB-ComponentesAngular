'use strict';

angular.module('RB.mensagem', ['RB.validacoesPadroes', 'toaster'])

.factory('MSG', ['VP', 'toaster', 
    function(VP, toaster) {
   
    var dadosMsg = {
        textoCarregado: 'Carregando...',
        arrayMensagens : new Array('Estamos tentando conectar...', 'Parece que você está sem conexão...', 'Ainda estamos tentando conectar...', 'Tentando salvar, mas a aplicação não responde...', 'O sistema não está conseguindo conectar...')
    };
    
    function set(obj){
        dadosMsg = VP.validarObj(obj,dadosMsg);
        return this;
    };
    
    function abrirJanelaErro(){
       var intervaloDeAtualizacao = setInterval(function(){  
            MSG.mensagensSemConexao();
        },3000); 
    };        
    
    function abrirJanelaCarregando(){
        if(GCS.exibeMSGCarregando){
            toaster.success({title: 'Carregando...', body:""});
        }
    };
    
    function mensagensSemConexao(){
        toaster.success({title: dadosMsg.arrayMensagens[Math.floor((Math.random()*5)+0)], body:""});
    };
    
    function fecharJanelaCarregando(){           
        //implementar
    };
   
    function abrirMesagemAcao(texto){
        toaster.success({title: texto, body:""});
    };
    
    function fecharMensagemAcao(){
        //implementar
    };
    
    return {
        abrirJanelaErro: abrirJanelaErro,
        abrirJanelaCarregando: abrirJanelaCarregando,
        mensagensSemConexao: mensagensSemConexao,
        fecharJanelaCarregando: fecharJanelaCarregando,
        abrirMesagemAcao: abrirMesagemAcao,
        fecharMensagemAcao: fecharMensagemAcao,
        set: set
    };
    
 }]);