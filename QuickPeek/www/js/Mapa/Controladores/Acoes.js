'use strict';

angular.module('QuickPeek.Acoes.Mapa', [ 
    'RB.pagina',
    'QuickPeek.Requisicao.Mapa',
    'Cmp.Geolocation',
    'RB.validacoesPadroes'
])

.factory('MapaAcoes', ['Pagina','MapaRequisicoes','$timeout','VP',
    function(Pagina,MapaRequisicoes,$timeout,VP){
    var scope;  
    
    function setScope(obj){
        scope = obj;
        return this;
    };
    
    function inicializar(){
        //var watchId = navigator.geolocation.watchPosition(geolocationSuccess);
        $timeout(function(){
            scope.btnAltura = $('#barra-local-atual').height();
            $('ion-side-menu-content').addClass('background-mapa');
        },0);
    };
    
    function irFiltro(){
        var options = { maximumAge: 3000, timeout: 3000, enableHighAccuracy: true };
        if(DGlobal.coordenadasAtual){
            Pagina.navegar({idPage:23});
        }else{
            navigator.geolocation.getCurrentPosition(onSuccess,onError);
        }
    }
    
    function irPesquisa(){
        var options = { maximumAge: 3000, timeout: 3000, enableHighAccuracy: true };
        if(DGlobal.coordenadasAtual){
            Pagina.navegar({idPage:28,paramAdd:'?usuarioId='+scope.dadosUser.usuarioId+'&latitude='+DGlobal.coordenadasAtual.latitude+'&longitude='+DGlobal.coordenadasAtual.longitude});
        }else{
            navigator.geolocation.getCurrentPosition(onPesquisa,onPesquisaError);
        }
    }
    
    function irCheckin(evento){
        VP.pararEvento(evento);
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
        Pagina.navegar({idPage:28,paramAdd:'?latitude='+DGlobal.coordenadasAtual.latitude+'&longitude='+DGlobal.coordenadasAtual.longitude});
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
    
    function irPerfil(id){
        Pagina.navegar({idPage:8,paramAdd:'?usuarioId='+id+'&latitude='+DGlobal.coordenadasAtual.latitude+'&longitude='+DGlobal.coordenadasAtual.longitude});
    };
    
    function checkInLocal(local,evento){
        VP.pararEvento(evento);
        DGlobal.checkIn = {local:local};
        if(local.localTitulo)DGlobal.checkIn.local.localNome = local.localTitulo;
        Pagina.navegar({idPage:30});
    }
    
    function irLocal(id){
        DGlobal.localAtual = id;
        if(DGlobal.coordenadasAtual){
            Pagina.navegar({idPage:24,paramAdd:'?latitude='+DGlobal.coordenadasAtual.latitude+'&longitude='+DGlobal.coordenadasAtual.longitude+'&localId='+id+'&atualizando=0'});
        }else{
            navigator.geolocation.getCurrentPosition(onPesquisaLocal,onPesquisaLocalError);
        }
    }
    
    var onPesquisaLocal = function(position){
        DGlobal.coordenadasAtual = {latitude:position.coords.latitude,longitude:position.coords.longitude};
        Pagina.navegar({idPage:24,paramAdd:'?latitude='+DGlobal.coordenadasAtual.latitude+'&longitude='+DGlobal.coordenadasAtual.longitude+'&localId='+DGlobal.localAtual+'&atualizando=0'});
    };

    function onPesquisaLocalError(error){
        var coordenadas = {latitude:-21.135445,longitude:-42.365089};
        Pagina.navegar({idPage:24,paramAdd:'?latitude='+coordenadas.latitude+'&longitude='+coordenadas.longitude+'&localId='+DGlobal.localAtual+'&atualizando=0'});
    }
    
    function irNotificacoes(){
        Pagina.navegar({idPage:36});
    }
    
    function irAteLocal(local){
        var coord = new Array();
        coord.push(local.latitude);
        coord.push(local.longitude);
        launchnavigator.navigate(coord);
    }
    
    function estouEmCasa(){
        var obj = {
            latitude:DGlobal.coordenadasAtual.latitude,
            longitude:DGlobal.coordenadasAtual.longitude
        };
        MapaRequisicoes.set({dados:obj,scope:scope,acaoSuccess:MapaRequisicoes.successEstouEmCasa}).estouEmCasa();
    }
    
    function estounoTrabalho(){
        var obj = {
            latitude:DGlobal.coordenadasAtual.latitude,
            longitude:DGlobal.coordenadasAtual.longitude
        };
        MapaRequisicoes.set({dados:obj,scope:scope,acaoSuccess:MapaRequisicoes.successEstouNoTrabalho}).estouNoTrabalho();
    }
    
    function cadLocal(){
        Pagina.navegar({idPage:41});
    }
    
    function irCentro(){
        scope.mapaGeral.map.panTo({lat:DGlobal.coordenadasAtual.latitude,lng:DGlobal.coordenadasAtual.longitude});
    }
    
    return {
        setScope:setScope,
        inicializar:inicializar,
        irFiltro:irFiltro,
        irPesquisa:irPesquisa,
        irCheckin:irCheckin,
        attTutorial:attTutorial,
        irPerfil:irPerfil,
        checkInLocal:checkInLocal,
        irLocal:irLocal,
        irNotificacoes:irNotificacoes,
        irAteLocal:irAteLocal,
        estouEmCasa:estouEmCasa,
        estounoTrabalho:estounoTrabalho,
        cadLocal:cadLocal
    };
    
 }]);
