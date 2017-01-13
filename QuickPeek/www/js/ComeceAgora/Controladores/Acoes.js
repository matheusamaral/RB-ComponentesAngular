'use strict';

angular.module('QuickPeek.Acoes.ComeceAgora', [ 
    'RB.pagina'
])

.factory('ComeceAgoraAcoes', ['Pagina',
    function(Pagina) {
    var scope;  
    
    function setScope(obj){
        scope = obj;
        return this;
    };
    
    function inicializar(){
        addCss();
    };
    
    function addCss(){
        $('ion-side-menu-content').addClass('background-img');
    }
    
    function navegar(){
        Pagina.navegar({idPage:3});
    };

    
    return {
        setScope:setScope,
        inicializar:inicializar,
        navegar:navegar
    };
    
 }]);
