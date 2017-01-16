'use strict';

angular.module('QuickPeek.Acoes.Publicacoes', [ 
    'RB.pagina',
    'QuickPeek.Requisicao.Publicacoes'
])

.factory('PublicacoesAcoes', ['Pagina','PublicacoesRequisicoes','$timeout',
    function(Pagina,PublicacoesRequisicoes,$timeout){
    var scope;  
    
    function setScope(obj){
        scope = obj;
        return this;
    };
    
    function inicializar(){
        $('ion-side-menu-content').addClass('background-chekin');
    };
    
    function voltar(){
        Pagina.navegar({idPage:24,paramAdd:'?localId='+DGlobal.localAtual+'&atualizando=0'});
    }
    
    return {
        setScope:setScope,
        inicializar:inicializar,
        voltar:voltar
    };
    
 }]);
