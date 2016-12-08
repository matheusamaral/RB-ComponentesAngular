'use strict';

angular.module('QuickPeek.Acoes.LoadingInicial', [ 
    'RB.pagina',
    'RB.loadingMobile'
])

.factory('LoadingInicialAcoes', ['Pagina','RBLoadingMobile','$timeout',
    function(Pagina,RBLoadingMobile,$timeout) {
    var scope;  
    
    function setScope(obj){
        scope = obj;
        return this;
    };
    
    function inicializar(){
        addCss();
        RBLoadingMobile.show();
        $timeout(function(){
            navegar();
            RBLoadingMobile.hide();
        },1000);
    };
    
    function addCss(){
        $('ion-side-menu-content').addClass('background-img');
    }
    
    function navegar(){ 
        Pagina.navegar({idPage:2});
    };

    
    return {
        setScope:setScope,
        inicializar:inicializar
    };
    
 }]);
