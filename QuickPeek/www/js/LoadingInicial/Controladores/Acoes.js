'use strict';

angular.module('QuickPeek.Acoes.LoadingInicial', [ 
    'RB.pagina',
    'RB.loadingMobile',
    'RB.validacoesPadroes'
])

.factory('LoadingInicialAcoes', ['Pagina','RBLoadingMobile','$timeout','VP',
    function(Pagina,RBLoadingMobile,$timeout,VP){
    var scope;  
    
    function setScope(obj){
        scope = obj;
        RBLoadingMobile.show('Encontrando você no mapa');
        return this;
    };
    
    function inicializar(){
        addCss();
        onDeviceReady();
    };
    
    function addCss(){
        $('ion-side-menu-content').addClass('background-img');
    }
    
    function onDeviceReady(){
        var options = { maximumAge: 3000, timeout: 3000, enableHighAccuracy: true };
        navigator.geolocation.getCurrentPosition(onSuccess,onError,options);
    }
    
    var onSuccess = function(position){
        RBLoadingMobile.hide();
        var coordenadas = {latitude:position.coords.latitude,longitude:position.coords.longitude};
        DGlobal.coordenadasAtual = coordenadas;
        Pagina.navegar({idPage:29,paramAdd:'?latitude='+coordenadas.latitude+'&longitude='+coordenadas.longitude});
    };

    function onError(error){
        RBLoadingMobile.hide();
        var coordenadas = {latitude:-21.135445,longitude:-42.365089};
        Pagina.navegar({idPage:29,paramAdd:'?latitude='+coordenadas.latitude+'&longitude='+coordenadas.longitude});
    }

    
    return {
        setScope:setScope,
        inicializar:inicializar
    };
    
 }]);
