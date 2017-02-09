'use strict';

angular.module('QuickPeek.Acoes.Sobre', [ 
    'RB.pagina'
])

.factory('SobreAcoes', ['Pagina','$ionicSlideBoxDelegate',
    function(Pagina,$ionicSlideBoxDelegate) {
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
        $('ion-side-menu-content > .slider').addClass('altura-maxima');
    }
    
    function navegar(){ 
        Pagina.rollBack();
    };

    function irTermos(){
        window.open('http://quickpeek.dev.codevip.com.br/termos-e-privacidade?app=true','_blank'); 
    }
    
    function voltarSlide(){
        $ionicSlideBoxDelegate.previous();
    }
    
    return {
        setScope:setScope,
        inicializar:inicializar,
        navegar:navegar,
        irTermos:irTermos,
        voltarSlide:voltarSlide
    };
    
 }]);
