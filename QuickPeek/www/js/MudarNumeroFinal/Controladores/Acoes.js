'use strict';

angular.module('QuickPeek.Acoes.MudarNumeroFinal', [ 
    'RB.pagina',
    'QuickPeek.Requisicao.MudarNumeroFinal'
])

.factory('MudarNumeroFinalAcoes', ['Pagina','MudarNumeroFinalRequisicoes',
    function(Pagina,MudarNumeroFinalRequisicoes){
    var scope;  
    
    function setScope(obj){
        scope = obj;
        addCss();
        return this;
    };
    
    function addCss(){
        $('ion-side-menu-content').addClass('background-cinza');
        $('#telNovo').mask('(99)999999999');
        $('#telAntigo').mask('(99)999999999');
    }
    
    function voltarNumero(){
        Pagina.navegar({idPage:12});
    }
    
    function alterarNumero(){
        var obj = {
            telefoneAntigo:scope.dados.ddiAntigo+scope.dados.telAntigo,
            telefoneNovo:scope.dados.ddiNovo+scope.dados.telNovo
        };
        MudarNumeroFinalRequisicoes.set({dados:obj,scope:scope,acaoSuccess:MudarNumeroFinalRequisicoes.successEditarNumero}).editarNumero();
    }
    
    return {
        setScope:setScope,
        voltarNumero:voltarNumero,
        alterarNumero:alterarNumero
    };
    
 }]);
