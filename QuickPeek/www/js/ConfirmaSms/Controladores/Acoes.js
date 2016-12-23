'use strict';

angular.module('QuickPeek.Acoes.ConfirmaSms', [ 
    'RB.pagina',
    'QuickPeek.Requisicao.ConfirmaSms',
    'Cmp.AutoComplete',
    'Cmp.GerenciaSMS'
])

.factory('ConfirmaSmsAcoes', ['Pagina','ConfirmaSmsRequisicoes','AutoComplete','RBLoadingMobile','$timeout','ionicToast','GerenciaSMS',
    function(Pagina,ConfirmaSmsRequisicoes,AutoComplete,RBLoadingMobile,$timeout,ionicToast,GerenciaSMS){
    var scope;  
    
    function setScope(obj){
        scope = obj;
        verificarSMS();
       
        return this;
    };
    
    function verificarSMS(){
        //startWatch();
        GerenciaSMS.setScope(scope).inicializar('objMsg',confirmarSms);
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
    
    function OpenToast(message) {
        ionicToast.show(message, 'bottom', false, 5000);
    }
    
    return {
        setScope:setScope,
        inicializar:inicializar,
        enviarNovoSms:enviarNovoSms,
        confirmarSms:confirmarSms
    };
    
 }]);
