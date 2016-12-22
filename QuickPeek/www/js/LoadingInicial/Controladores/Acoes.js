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
        navegar();
    };
    
    function addCss(){
        $('ion-side-menu-content').addClass('background-img');
    }
    
    function navegar(){ 
        Pagina.navegar({idPage:8});
    };

    
    return {
        setScope:setScope,
        inicializar:inicializar
    };
    
 }]);
