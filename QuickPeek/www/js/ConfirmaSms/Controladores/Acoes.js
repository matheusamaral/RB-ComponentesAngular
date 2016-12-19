'use strict';

angular.module('QuickPeek.Acoes.ConfirmaSms', [ 
    'RB.pagina',
    'QuickPeek.Requisicao.ConfirmaSms',
    'Cmp.AutoComplete'
])

.factory('ConfirmaSmsAcoes', ['Pagina','ConfirmaSmsRequisicoes','AutoComplete','RBLoadingMobile','$timeout',
    function(Pagina,ConfirmaSmsRequisicoes,AutoComplete,RBLoadingMobile,$timeout) {
    var scope;  
    
    function setScope(obj){
        scope = obj;
        scope.smsList = [];
        //verificarSMS();
        return this;
    };
    
    function verificarSMS(){
        onLoad();
        RBLoadingMobile.show('Verificando SMS...');
        $timeout(function(){
            listSMS();
        },10000);
    }
    
    function inicializar(){
        addCss();
        iniciarAutoComplete();
    };
    
    function addCss(){
        $('ion-side-menu-content').addClass('background-cinza');
    }
    
    function iniciarAutoComplete(){
        AutoComplete.setScope(scope).iniciarAutoComplete('ddiAutoComplete',scope.ddis,scope.dadosSms.ddi);
    }
    
    function enviarNovoSms(){
        console.log(scope.dadosSms);
        var obj = {telefone:scope.dadosSms.ddi+scope.dadosSms.numero};
        ConfirmaSmsRequisicoes.set({dados:obj,scope:scope,acaoPosterior:verificarSMS,acaoSuccess:ConfirmaSmsRequisicoes.successEnviarSms}).enviarSms();
    }
    
    function confirmarSms(){
        var obj = {telefone:scope.dadosSms.ddi+scope.dadosSms.numero,codigo:scope.dadosSms.codigo};
        console.log(obj);
        ConfirmaSmsRequisicoes.set({dados:obj,scope:scope,acaoSuccess:ConfirmaSmsRequisicoes.successConfirmarSms}).confirmarSms();
    }
    
    function onLoad() {
            if(( /(ipad|iphone|ipod|android)/i.test(navigator.userAgent) )) {
                document.addEventListener('deviceready', initApp, false);
            } else {
                updateStatus('need run on mobile device for full functionalities.');
            }
            
        }
        // we will restore the intercepted SMS here, for later restore
        var interceptEnabled = false;
        function initApp() {
        	if (! SMS ) { alert( 'SMS plugin not ready' ); return; }
        	
            document.addEventListener('onSMSArrive', function(e){
            	var data = e.data;
            	scope.smsList.push( data );
            	updateStatus('SMS arrived, count: ' + scope.smsList.length );
            	
            	var divdata = $('div#data');
            	divdata.html( divdata.html() + JSON.stringify( data ) );
            	
            });
        }
        
        function update( id, str ) {
        	$('div#' + id).html( str );
        }
        function updateStatus( str ) {
        	$('div#status').html( str );
        }
        function updateData( str ) {
        	$('div#data').html( str );
        }
        
        function sendSMS() {
        	var sendto = $('input#sendto').val().trim();
        	var textmsg = $('textarea#textmsg').val();
        	if(sendto.indexOf(";") >=0) {
        		sendto = sendto.split(";");
        		for(i in sendto) {
        			sendto[i] = sendto[i].trim();
        		}
        	}
        	if(SMS) SMS.sendSMS(sendto, textmsg, function(){}, function(str){alert(str);});
        }
        
        function listSMS() {
    		updateData('');
    		
        	if(SMS) SMS.listSMS({}, function(data){
    			updateStatus('sms listed as json array');
    			//updateData( JSON.stringify(data) );
    			
    			var html = "";
        		if(Array.isArray(data)) {
        			for(var i in data) {
        				var sms = data[i];
        				scope.smsList.push(sms);
        				html += sms.address + ": " + sms.body + "<br/>";
        			}
        		}

        		updateData( html );
        		
        	}, function(err){
        		updateStatus('error list sms: ' + err);
        	});
            
            $timeout(function(){
                scope.dadosSms.codigo = organizaSms(scope.smsList);
                RBLoadingMobile.hide();
            },0);
        }
        
        function organizaSms(array){
            var msgAtual;
            if(array.length < 1 || array[0].address != '+5511990009044'){
                return false;
            }
            msgAtual = array[0].body.split(' ');
            return msgAtual[msgAtual.length - 1];
        }
        
        function deleteLastSMS() {
    		updateData('');
        	if(scope.smsList.length == 0) {
        		updateStatus( 'no sms id to delete' );
        		return;
        	}
        	
    		var sms = scope.smsList.pop();
    		
        	if(SMS) SMS.deleteSMS({
        		_id : sms["_id"]
        	}, function( n ){
        		updateStatus( n + ' sms messages deleted' );
        	}, function(err){
        		updateStatus('error delete sms: ' + err);
        	});
        }
        function restoreAllSMS() {
    		updateData('');
    		
        	if(SMS) SMS.restoreSMS(scope.smsList, function( n ){
        		// clear the list if restore successfully
        		scope.smsList.length = 0;
        		updateStatus(n + ' sms messages restored');
        		
        	}, function(err){
        		updateStatus('error restore sms: ' + err);
        	});
        }
        function startWatch() {
        	if(SMS) SMS.startWatch(function(){
        		update('watching', 'watching started');
        	}, function(){
                    alert('sdssd dfdf');
        		updateStatus('failed to start watching');
        	});
        }
        function stopWatch() {
        	if(SMS) SMS.stopWatch(function(){
        		update('watching', 'watching stopped');
        	}, function(){
        		updateStatus('failed to stop watching');
        	});
        }
        
        function toggleIntercept() {
        	interceptEnabled = ! interceptEnabled;
        	
        	if(interceptEnabled) { // clear the list before we start intercept
        		scope.smsList.length = 0;
        	}
        	
        	if(SMS) SMS.enableIntercept(interceptEnabled, function(){}, function(){});
        	
        	$('span#intercept').text( 'intercept ' + (interceptEnabled ? 'ON' : 'OFF') );
        	$('button#enable_intercept').text( interceptEnabled ? 'Disable' : 'Enable' );
        }
    
    return {
        setScope:setScope,
        inicializar:inicializar,
        enviarNovoSms:enviarNovoSms,
        confirmarSms:confirmarSms,
        toggleIntercept:startWatch
    };
    
 }]);
