'use strict';

angular.module('QuickPeek.Acoes.CriarLocal', [ 
    'RB.pagina',
    'QuickPeek.Requisicao.CriarLocal',
    'RB.validacoesPadroes'
])

.factory('CriarLocalAcoes', ['Pagina','CriarLocalRequisicoes',
    function(Pagina,CriarLocalRequisicoes){
    var scope,conn;  
    
    function setScope(obj){
        scope = obj;
        return this;
    };
    
    function selecionarCat(){
        DGlobal.tituloNovoLocal = scope.dados.nome;
        Pagina.navegar({idPage:39});
    }
    
    return {
        setScope:setScope,
        selecionarCat:selecionarCat
    };
    
 }]);
