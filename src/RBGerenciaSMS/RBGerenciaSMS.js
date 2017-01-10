'use strict';

angular.module('Cmp.GerenciaSMS', [
    'RB.validacoesPadroes'
])

.factory('GerenciaSMS', ['VP','$timeout','RBLoadingMobile',
    function (VP,$timeout,RBLoadingMobile) {
        var scope,nomeObj,acaoSucess = false;  

        function setScope(obj){
            scope = obj;
            return this;
        };
        
        function inicializar(nome,acao){
            acaoSucess = acao;
            nomeObj = nome;
            scope[nomeObj] = {};
            montaMetodos();
            scope[nomeObj].smsList = new Array();
            RBLoadingMobile.show('Verificando SMS...');
            scope[nomeObj].iniciarEscuta();
            scope[nomeObj].acaoChegadaSms();
            scope[nomeObj].timeout = $timeout(function(){
                RBLoadingMobile.hide();
            },30000);
        }
        
        function montaMetodos(){
            scope[nomeObj].acaoChegadaSms = function(){
                if(!SMS){
                    return; 
                }
                document.addEventListener('onSMSArrive', function(e){
                    var data = e.data;
                    scope[nomeObj].smsList.push(data);
                    scope[nomeObj].organizaSms(scope[nomeObj].smsList);
                });
            };

            scope[nomeObj].enviarSms = function(){
                var sendto = $('input#sendto').val().trim();
                var textmsg = $('textarea#textmsg').val();
                if(sendto.indexOf(";") >=0) {
                    sendto = sendto.split(";");
                    for(var i in sendto) {
                        sendto[i] = sendto[i].trim();
                    }
                }
                if(SMS)SMS.sendSMS(sendto, textmsg, function(){}, function(str){alert(str);});
            };

            scope[nomeObj].listarSms = function(){
                if(SMS)SMS.listSMS({}, function(data){
                    if(Array.isArray(data)) {
                        for(var i in data) {
                            var sms = data[i];
                            scope.smsList.push(sms);
                        }
                    }
                }, function(err){

                });
            };

            scope[nomeObj].organizaSms = function(array){
                var msgRecebida = array[0].body.split(' ');
                var msgConcatenada = '';
                for(var i = 0; i < msgRecebida.length - 1; i++){
                    msgConcatenada = msgConcatenada + msgRecebida[i];
                }
                
                if(msgConcatenada == 'OseucódigodoQuickpeeké'){
                    $timeout.cancel(scope[nomeObj].timeout);
                    RBLoadingMobile.hide();
                    RBLoadingMobile.show('SMS identificado...');
                    scope.dadosSms.codigo = msgRecebida[msgRecebida.length - 1];
                    scope[nomeObj].pararEscuta();
                    $timeout(function(){
                        RBLoadingMobile.hide();
                        if(acaoSucess)acaoSucess();
                    },2000);
                }

                return false;
            };

            scope[nomeObj].deleteLastSMS = function(){
                    updateData('');
                    if(scope.smsList.length == 0) {
                            updateStatus( 'no sms id to delete' );
                            return;
                    }

                    var sms = scope.smsList.pop();

                    if(SMS) SMS.deleteSMS({
                            _id : sms["_id"]
                    }, function( n ){
                        //sucesso se apagar
                    }, function(err){
                       //falaha ao apagar
                    });
            };

            scope[nomeObj].restoreAllSMS = function() {
                if(SMS) SMS.restoreSMS(scope.smsList, function( n ){
                    scope[nomeObj].smsList.length = 0;
                    //sucesso ao restaurar
                }, function(err){
                    //erro ao restaurar
                });
            };

            scope[nomeObj].iniciarEscuta = function() {
                if(SMS) SMS.startWatch(function(){
                    //sucesso ao iniciar
                }, function(){
                    //falaha ao iniciar
                });
            };

            scope[nomeObj].pararEscuta = function() {
                if(SMS) SMS.stopWatch(function(){
                    //sucesso ao iniciar
                }, function(){
                    //falaha ao iniciar
                });
            };

            scope[nomeObj].habDesabilitarInterceptacao = function(){
                interceptEnabled = ! interceptEnabled;

                if(interceptEnabled) { // clear the list before we start intercept
                    scope[nomeObj].smsList.length = 0;
                }
                if(SMS) SMS.enableIntercept(interceptEnabled,
                function(){
                    //sucesso 
                }, function(){
                    //falaha
                });
            };
        }

        return {
            setScope:setScope,
            inicializar:inicializar
        };
    }
]);