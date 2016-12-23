'use strict';

angular.module('QuickPeek.Estrutura.LoadingInicial', [
    'RB.gcs',
    'RB.config',
    'RB.pagina',
    'RB.loadingMobile'
])

.factory('LoadingInicialEstrutura', ['GCS','Config','Pagina','RBLoadingMobile',
    function(GCS,Config,Pagina,RBLoadingMobile) {
    var scope;  
    
    function setScope(obj){
        scope = obj;
        return this;
    }
    
    function popular(){
        scope.esconderBotao = true;
    };

    return {
        setScope:setScope,
        popular:popular
    };
 }]);
