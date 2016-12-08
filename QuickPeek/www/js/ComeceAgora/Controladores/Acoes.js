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
        navegar();
        addCss();
    };
    
    function addCss(){
        $('ion-side-menu-content').addClass('background-img');
    }
    
    function navegar(){ 
        console.log('teste');
//        Pagina.navegar({idPage:1});
    };

    
    return {
        setScope:setScope,
        inicializar:inicializar
    };
    
 }]);
