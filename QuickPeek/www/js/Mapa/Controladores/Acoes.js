'use strict';

angular.module('QuickPeek.Acoes.Mapa', [ 
    'RB.pagina',
    'QuickPeek.Requisicao.Mapa',
    'Cmp.Geolocation'
])

.factory('MapaAcoes', ['Pagina','MapaRequisicoes','Geolocation','$timeout',
    function(Pagina,MapaRequisicoes,Geolocation,$timeout){
    var scope;  
    
    function setScope(obj){
        scope = obj;
        return this;
    };
    
    function checkin(){
        FB.api('/me/checkins', 'post', 
        { message: 'MESSAGE_HERE',
           place: 165122993538708,
           coordinates: {
               'latitude': 1.3019399200902,
               'longitude': 103.84067653695
           }
        },
            function (response) {
                console.log(response);
                alert("Checked in!");
            }
        );
    }
    
    function inicializar(){
        var watchId = navigator.geolocation.watchPosition(geolocationSuccess);
    };
    
    function irFiltro(){
        var options = { maximumAge: 3000, timeout: 3000, enableHighAccuracy: true };
        if(DGlobal.coordenadasAtual){
            Pagina.navegar({idPage:23});
        }else{
            navigator.geolocation.getCurrentPosition(onSuccess,onError,options);
        }
    }
    
    function irPesquisa(){
        var options = { maximumAge: 3000, timeout: 3000, enableHighAccuracy: true };
        if(DGlobal.coordenadasAtual){
            Pagina.navegar({idPage:28});
        }else{
            navigator.geolocation.getCurrentPosition(onPesquisa,onPesquisaError,options);
        }
    }
    
    function irCheckin(){
        var options = { maximumAge: 3000, timeout: 3000, enableHighAccuracy: true };
        if(DGlobal.coordenadasAtual){
            Pagina.navegar({idPage:29,paramAdd:'?latitude='+DGlobal.coordenadasAtual.latitude+'&longitude='+DGlobal.coordenadasAtual.longitude});
        }else{
            navigator.geolocation.getCurrentPosition(onCheckin,onChekinError,options);
        }
    }
    
    var onSuccess = function(position){
        DGlobal.coordenadasAtual = {latitude:position.coords.latitude,longitude:position.coords.longitude};
        Pagina.navegar({idPage:23});
    };
    
    var onCheckin = function(position){
        DGlobal.coordenadasAtual = {latitude:position.coords.latitude,longitude:position.coords.longitude};
        Pagina.navegar({idPage:29,paramAdd:'?latitude='+DGlobal.coordenadasAtual.latitude+'&longitude='+DGlobal.coordenadasAtual.longitude});
    };
    
    var onPesquisa = function(position){
        DGlobal.coordenadasAtual = {latitude:position.coords.latitude,longitude:position.coords.longitude};
        Pagina.navegar({idPage:28});
    };

    function onError(error){
        var coordenadas = {latitude:-21.135445,longitude:-42.365089};
        Pagina.navegar({idPage:23});
    }
    
    function onPesquisaError(error){
        var coordenadas = {latitude:-21.135445,longitude:-42.365089};
        Pagina.navegar({idPage:28});
    }
    
    function onChekinError(error){
        var coordenadas = {latitude:-21.135445,longitude:-42.365089};
        Pagina.navegar({idPage:29,paramAdd:'?latitude='+coordenadas.latitude+'&longitude='+coordenadas.longitude});
    }
    
    function attTutorial(){
        MapaRequisicoes.set({dados:false,scope:scope,acaoSuccess:MapaRequisicoes.successAttTutorial}).attTutorial();
    }
    
    function geolocationSuccess(position){
        //alert('Alterour posicao'+JSON.stringify(position));
    };
    
    function irPerfil(){
        Pagina.navegar({idPage:8});
    }
    
    return {
        setScope:setScope,
        inicializar:inicializar,
        irFiltro:irFiltro,
        irPesquisa:irPesquisa,
        irCheckin:irCheckin,
        checkin:checkin,
        attTutorial:attTutorial,
        irPerfil:irPerfil
    };
    
 }]);
