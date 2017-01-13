'use strict';

angular.module('QuickPeek.Acoes.CheckIn', [ 
    'RB.pagina',
    'QuickPeek.Requisicao.CheckIn'
])

.factory('CheckInAcoes', ['Pagina','CheckInRequisicoes','$timeout',
    function(Pagina,CheckInRequisicoes,$timeout){
    var scope;  
    
    function setScope(obj){
        scope = obj;
        return this;
    };
    
    function inicializar(){
        scope.larguraTela = $('body').width();
        scope.alturaTela = $('body').height();
        $('ion-side-menu-content').addClass('background-chekin');
    };
    
    function voltarMapa(){
        if(DGlobal.voltarLocais){
            Pagina.navegar({idPage:24,paramAdd:'?latitude='+DGlobal.coordenadasAtual.latitude+'&longitude='+DGlobal.coordenadasAtual.longitude+'&localId='+DGlobal.localAtual+'&atualizando=0'});
        }else{
            if(DGlobal.coordenadasAtual){
                Pagina.navegar({idPage:22,paramAdd:'?atualizando=0&latitude='+DGlobal.coordenadasAtual.latitude+'&longitude='+DGlobal.coordenadasAtual.longitude});
            }else{
                var options = { maximumAge: 3000, timeout: 3000, enableHighAccuracy: true };
                navigator.geolocation.getCurrentPosition(onSuccess,onError);
            }
        }
    }
    
    var onSuccess = function(position){
        DGlobal.coordenadasAtual = {latitude:position.coords.latitude,longitude:position.coords.longitude};
        Pagina.navegar({idPage:22,paramAdd:'?atualizando=0&latitude='+DGlobal.coordenadasAtual.latitude+'&longitude='+DGlobal.coordenadasAtual.longitude});
    };

    function onError(error){
        var coordenadas = {latitude:-21.135445,longitude:-42.365089};
        Pagina.navegar({idPage:22,paramAdd:'?atualizando=0&latitude='+coordenadas.latitude+'&longitude='+coordenadas.longitude});
    }
    
    function checkInLocal(local){
        DGlobal.checkIn = {local:local};
        Pagina.navegar({idPage:30});
    }
    
    function attLocais(){
        if(DGlobal.coordenadasAtual){
            var obj = {latitude:DGlobal.coordenadasAtual.latitude,longitude:DGlobal.coordenadasAtual.longitude}
            CheckInRequisicoes.set({dados:obj,scope:scope,acaoSuccess:CheckInRequisicoes.successVerificarLocaisProximos}).verificarLocaisProximos();
        }else{
            navigator.geolocation.getCurrentPosition(onSuccessGetNovaCoord,onErrorNovaCoord);
        }
    }
    
    var onSuccessGetNovaCoord = function(position){
        DGlobal.coordenadasAtual = {latitude:position.coords.latitude,longitude:position.coords.longitude};
        var obj = {latitude:DGlobal.coordenadasAtual.latitude,longitude:DGlobal.coordenadasAtual.longitude}
        CheckInRequisicoes.set({dados:obj,scope:scope,acaoSuccess:CheckInRequisicoes.successVerificarLocaisProximos}).verificarLocaisProximos();
    };

    function onErrorNovaCoord(error){
        var coordenadas = {latitude:-21.135445,longitude:-42.365089};
        var obj = {latitude:coordenadas.latitude,longitude:coordenadas.longitude};
        CheckInRequisicoes.set({dados:{},scope:scope,acaoSuccess:CheckInRequisicoes.successVerificarLocaisProximos}).verificarLocaisProximos();
    }
    
    function irPesquisa(){
        var options = { maximumAge: 3000, timeout: 3000, enableHighAccuracy: true };
        if(DGlobal.coordenadasAtual){
            Pagina.navegar({idPage:31,paramAdd:'?usuarioId='+scope.dadosUser.usuarioId+'&latitude='+DGlobal.coordenadasAtual.latitude+'&longitude='+DGlobal.coordenadasAtual.longitude});
        }else{
            navigator.geolocation.getCurrentPosition(onPesquisa,onPesquisaError);
        }
    }
    
    var onPesquisa = function(position){
        DGlobal.coordenadasAtual = {latitude:position.coords.latitude,longitude:position.coords.longitude};
        Pagina.navegar({idPage:31,paramAdd:'?latitude='+DGlobal.coordenadasAtual.latitude+'&longitude='+DGlobal.coordenadasAtual.longitude});
    };
    
    function onPesquisaError(error){
        var coordenadas = {latitude:-21.135445,longitude:-42.365089};
        Pagina.navegar({idPage:31});
    }
    
    return {
        setScope:setScope,
        inicializar:inicializar,
        checkInLocal:checkInLocal,
        voltarMapa:voltarMapa,
        attLocais:attLocais,
        irPesquisa:irPesquisa
    };
    
 }]);
