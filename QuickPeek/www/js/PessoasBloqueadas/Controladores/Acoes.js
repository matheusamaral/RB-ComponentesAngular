'use strict';

angular.module('QuickPeek.Acoes.PessoasBloqueadas', [ 
    'RB.pagina',
    'QuickPeek.HTML.PessoasBloqueadas',
    'QuickPeek.Requisicao.PessoasBloqueadas'
])

.factory('PessoasBloqueadasAcoes', ['Pagina','$ionicPopup','PessoasBloqueadasHtmlPopup','ConfigContaRequisicoes',
    function(Pagina,$ionicPopup,PessoasBloqueadasHtmlPopup,ConfigContaRequisicoes) {
    var scope;  
    
    function setScope(obj){
        scope = obj;
        return this;
    };
    
    function popupDesbloquear(codigo,nome){
        scope.dadosDesbloquear={
            id:codigo,
            nome: nome
        };
        scope.desbloquearPopup = $ionicPopup.alert({
            scope:scope,
            title: '',
            template: PessoasBloqueadasHtmlPopup.montar(),
            buttons:false
        });
    }
    
    function voltarConfig(){
        Pagina.navegar({idPage:10});
    }
    
    function desbloquear(id,visibilidade){
        var obj = {usuarioBloqueadoId:id,visibilidadeId:visibilidade};
        ConfigContaRequisicoes.set({dados:obj,scope:scope,acaoSuccess:ConfigContaRequisicoes.successDesbloquear}).desbloquear();
    }
    
    return {
        setScope:setScope,
        popupDesbloquear:popupDesbloquear,
        voltarConfig:voltarConfig,
        desbloquear:desbloquear
    };
    
 }]);
