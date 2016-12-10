'use strict';

angular.module('QuickPeek.Acoes.CadastroDados', [ 
    'RB.pagina',
    'QuickPeek.Requisicao.CadastroDados'
])

.factory('CadastroDadosAcoes', ['Pagina','CadastroDadosRequisicoes',
    function(Pagina,CadastroDadosRequisicoes) {
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
    
    return {
        setScope:setScope,
        inicializar:inicializar
    };
    
 }]);
