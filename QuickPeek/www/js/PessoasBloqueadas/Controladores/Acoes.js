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
    
    function popupContaPrivada(){
        scope.desbloquearPopup = $ionicPopup.alert({
            scope:scope,
            title: 'Alterar para conta privada?',
            template: PessoasBloqueadasHtmlPopup.montar(),
            buttons:[
                {text:'CANCELAR',type:['button-stable','button-outline']}
            ]
        });
    }
    
    function voltarConfig(){
        Pagina.navegar({idPage:10});
    }
    
    return {
        setScope:setScope,
        popupContaPrivada:popupContaPrivada,
        voltarConfig:voltarConfig
    };
    
 }]);
