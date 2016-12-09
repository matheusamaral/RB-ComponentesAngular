'use strict';

angular.module('QuickPeek.Acoes.ConfirmaSms', [ 
    'RB.pagina',
    'QuickPeek.Requisicao.ConfirmaSms'
])

.factory('ConfirmaSmsAcoes', ['Pagina','ConfirmaSmsRequisicoes',
    function(Pagina,ConfirmaSmsRequisicoes) {
    var scope;  
    
    function setScope(obj){
        scope = obj;
        return this;
    };
    
    function inicializar(){
        addCss();
    };
    
    function addCss(){
        $('ion-side-menu-content').addClass('background-cinza');
    }
    
    function enviarNovoSms(){
        console.log(scope.dadosSms);
        var obj = {telefone:scope.dadosSms.ddi+scope.dadosSms.numero};
        ConfirmaSmsRequisicoes.set({dados:obj,scope:scope,acaoSuccess:ConfirmaSmsRequisicoes.successEnviarSms}).enviarSms();
    }
    
    function confirmarSms(){
        var obj = {telefone:scope.dadosSms.ddi+scope.dadosSms.numero,codigo:scope.dadosSms.codigo};
        console.log(obj);
        ConfirmaSmsRequisicoes.set({dados:obj,scope:scope,acaoSuccess:ConfirmaSmsRequisicoes.successConfirmarSms}).confirmarSms();
    }
    
    return {
        setScope:setScope,
        inicializar:inicializar,
        enviarNovoSms:enviarNovoSms,
        confirmarSms:confirmarSms
    };
    
 }]);
