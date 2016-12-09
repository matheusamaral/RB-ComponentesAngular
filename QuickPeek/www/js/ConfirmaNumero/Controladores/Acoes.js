'use strict';

angular.module('QuickPeek.Acoes.ConfirmaNumero', [ 
    'RB.pagina',
    'QuickPeek.Requisicao.ConfirmaNumero'
])

.factory('ConfirmaNumeroAcoes', ['Pagina','ConfirmaNumeroRequisicoes',
    function(Pagina,ConfirmaNumeroRequisicoes) {
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
                console.log(obj);
        ConfirmaNumeroRequisicoes.set({dados:obj,scope:scope,acaoSuccess:ConfirmaNumeroRequisicoes.successEnviarSms}).enviarSms();
    }
    
    return {
        setScope:setScope,
        inicializar:inicializar,
        cadastrarNumero:cadastrarNumero
    };
    
 }]);
