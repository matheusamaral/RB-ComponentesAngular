'use strict';

angular.module('QuickPeek.Acoes.PessoasBloqueadas', [ 
    'RB.pagina',
    'QuickPeek.HTML.PessoasBloqueadas'
])

.factory('PessoasBloqueadasAcoes', ['Pagina','$ionicPopup','PessoasBloqueadasHtmlPopup',
    function(Pagina,$ionicPopup,PessoasBloqueadasHtmlPopup) {
    var scope;  
    
    function setScope(obj){
        scope = obj;
        return this;
    };
    
    function popupDesbloquear(){
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
    
    function desbloquear(){
        scope.dados.pessoas = new Array();
        scope.desbloquearPopup.close();
    }
    
    return {
        setScope:setScope,
        popupDesbloquear:popupDesbloquear,
        voltarConfig:voltarConfig,
        desbloquear:desbloquear
    };
    
 }]);
