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
    
    function cadastrarNumero(){
        var tel = scope.dadosCel.numero;
        var obj = {telefone:tel};
        ConfirmaSmsRequisicoes.set({dados:obj,scope:scope,acaoSuccess:ConfirmaSmsRequisicoes.successEnviarSms}).enviarSms();
    }
    
    return {
        setScope:setScope,
        inicializar:inicializar,
        cadastrarNumero:cadastrarNumero
    };
    
 }]);
