'use strict';

angular.module('QuickPeek.Acoes.Mapa', [ 
    'RB.pagina',
    'QuickPeek.Requisicao.Mapa',
    'Cmp.Geolocation',
    'RB.validacoesPadroes'
])

.factory('MapaAcoes', ['Pagina','MapaRequisicoes','Geolocation','$timeout','VP',
    function(Pagina,MapaRequisicoes,Geolocation,$timeout,VP){
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
        $timeout(function(){
            scope.btnAltura = $('#barra-local-atual').height();
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
    
    function geolocationSuccess(position){
        //alert('Alterour posicao'+JSON.stringify(position));
    };
    
    function irPerfil(id){
        Pagina.navegar({idPage:8,paramAdd:'?usuarioId='+id+'&latitude='+DGlobal.coordenadasAtual.latitude+'&longitude='+DGlobal.coordenadasAtual.longitude});
    };
    
    function checkInLocal(local){
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
    
    return {
        setScope:setScope,
        inicializar:inicializar,
        irFiltro:irFiltro,
        irPesquisa:irPesquisa,
        irCheckin:irCheckin,
        checkin:checkin,
        attTutorial:attTutorial,
        irPerfil:irPerfil,
        checkInLocal:checkInLocal,
        irLocal:irLocal,
        irNotificacoes:irNotificacoes
    };
    
 }]);
