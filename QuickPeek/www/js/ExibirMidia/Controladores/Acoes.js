'use strict';

angular.module('QuickPeek.Acoes.ExibirMidia', [ 
    'RB.pagina',
    'QuickPeek.Requisicao.ExibirMidia',
    'RB.validacoesPadroes'
])

.factory('ExibirMidiaAcoes', ['Pagina','ExibirMidiaRequisicoes','$timeout','RBLoadingMobile','VP',
    function(Pagina,ExibirMidiaRequisicoes,$timeout,RBLoadingMobile,VP){
    var scope;  
    
    function setScope(obj){
        scope = obj;
        return this;
    };
    
    function voltarLocais(){
        Pagina.navegar({idPage:24,paramAdd:'?localId='+DGlobal.localAtual+'&atualizando=0'});
    }
    
    function inicializar(){
        $('ion-side-menu-content').addClass('background-preto');       
    };
    
    function curtir(id){
        var obj = {midiaId:id};
        ExibirMidiaRequisicoes.set({dados:obj,scope:scope,acaoSuccess:ExibirMidiaRequisicoes.successCurtir}).curtir();
    }
    
    return {
        setScope:setScope,
        inicializar:inicializar,
        voltarLocais:voltarLocais,
        curtir:curtir
    };
 }]);