'use strict';

angular.module('QuickPeek.Acoes.PesquisarMapa', [ 
    'RB.pagina',
    'QuickPeek.Requisicao.PesquisarMapa',
    'RB.validacoesPadroes'
])

.factory('PesquisarMapaAcoes', ['Pagina','PesquisarMapaRequisicoes','VP','$timeout',
    function(Pagina,PessoasLocalRequisicoes,VP,$timeout){
    var scope;  
    
    function setScope(obj){
        scope = obj;
        
        return this;
    };
    
    function voltarMapa(){
        if(DGlobal.coordenadasAtual){
            Pagina.navegar({idPage:22,paramAdd:'?atualizando=0&latitude='+DGlobal.coordenadasAtual.latitude+'&longitude='+DGlobal.coordenadasAtual.longitude});
        }else{
            var options = { maximumAge: 3000, timeout: 3000, enableHighAccuracy: true };
            navigator.geolocation.getCurrentPosition(onSuccess,onError);
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
    
    function pesquisar(){
        $timeout.cancel(scope.timeoutPesquisa);
        scope.timeoutPesquisa = $timeout(function(){
            alert('pesquisou');
        },1500);
    }
    
    return {
        setScope:setScope,
        voltarMapa:voltarMapa,
        pesquisar:pesquisar
    };
    
 }]);
