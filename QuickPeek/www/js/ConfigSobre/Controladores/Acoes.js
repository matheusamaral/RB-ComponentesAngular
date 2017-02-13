'use strict';

angular.module('QuickPeek.Acoes.ConfigSobre', [
    'RB.pagina'
])

.factory('ConfigSobreAcoes', ['Pagina',
    function(Pagina) {
    var scope;

    function setScope(obj){
        scope = obj;
        return this;
    };

    function voltarConfiguracoes(){
        Pagina.rollBack();
    }

    function irSobre(){
        Pagina.navegar({idPage:20});
    }

    function irTermos(){
        window.open('http://quickpeek.dev.codevip.com.br/termos-e-privacidade?app=true','_blank');
    }

    function irFAQ(){
        window.open('http://quickpeek.dev.codevip.com.br/faq?app=true','_blank');
    }

    function irFaleConosco(){
        window.open('http://quickpeek.dev.codevip.com.br/relatar-um-erro?app=true','_blank');
    }

    return {
        setScope:setScope,
        voltarConfiguracoes:voltarConfiguracoes,
        irSobre:irSobre,
        irTermos:irTermos,
        irFAQ:irFAQ,
        irFaleConosco:irFaleConosco
    };

 }]);
