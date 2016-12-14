'use strict';

angular.module('QuickPeek.Acoes.ConfirmaNumero', [ 
    'RB.pagina',
    'QuickPeek.Requisicao.ConfirmaNumero',
    'Cmp.AutoComplete'
])

.factory('ConfirmaNumeroAcoes', ['Pagina','ConfirmaNumeroRequisicoes','AutoComplete',
    function(Pagina,ConfirmaNumeroRequisicoes,AutoComplete) {
    var scope;  
    
    function setScope(obj){
        scope = obj;
        return this;
    };
    
    function inicializar(){
        addCss();
        iniciarAutoComplete();
    };
    
    function iniciarAutoComplete(){
        AutoComplete.setScope(scope).iniciarAutoComplete('ddiAutoComplete',scope.ddis,scope.dadosCel.ddi);
    }
    
    function addCss(){
        $('ion-side-menu-content').addClass('background-cinza');
    }
    
    function cadastrarNumero(){
        var obj = {telefone:scope.dadosCel.ddi + scope.dadosCel.numero};;
        ConfirmaNumeroRequisicoes.set({dados:obj,scope:scope,acaoSuccess:ConfirmaNumeroRequisicoes.successEnviarSms}).enviarSms();
    }
    
    return {
        setScope:setScope,
        inicializar:inicializar,
        cadastrarNumero:cadastrarNumero
    };
    
 }]);
