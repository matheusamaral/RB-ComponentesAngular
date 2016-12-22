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
        Pagina.navegar({idPage:19});
    };

    function proximoSlide(){
        $ionicSlideBoxDelegate.next();
    }
    
    function voltarSlide(){
        $ionicSlideBoxDelegate.previous();
    }
    
    function verificaBackground(){
        if($('ion-side-menu-content').hasClass('background-img')){
            $('ion-side-menu-content').removeClass('background-img');
            $('ion-side-menu-content').addClass('background-cinza');
        }else{
            if($('ion-side-menu-content').hasClass('background-cinza')){
                $('ion-side-menu-content').removeClass('background-cinza');
                $('ion-side-menu-content').addClass('background-img');
            }
        }
    }
    
    return {
        setScope:setScope,
        inicializar:inicializar,
        navegar:navegar,
        proximoSlide:proximoSlide,
        verificaBackground:verificaBackground,
        voltarSlide:voltarSlide
    };
    
 }]);
