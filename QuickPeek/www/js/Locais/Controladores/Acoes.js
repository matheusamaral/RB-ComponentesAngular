'use strict';

angular.module('QuickPeek.Acoes.Locais', [ 
    'RB.pagina',
    'QuickPeek.Requisicao.Locais',
    'RB.validacoesPadroes'
])

.factory('LocaisAcoes', ['Pagina','$timeout','LocaisRequisicoes','VP',
    function(Pagina,$timeout,LocaisRequisicoes,VP){
    var scope;  
    
    function setScope(obj){
        scope = obj;
        return this;
    };
    
    function inicializar(){
        $('ion-side-menu-content').addClass('background-cinza-claro');
    }
    
    function exibirMidias(id){
        var obj = {id:id};
        LocaisRequisicoes.set({dados:obj,scope:scope,acaoSuccess:LocaisRequisicoes.successListarMidias}).listarMidias();
    }
    
    function carregarLocais(){
        navigator.geolocation.getCurrentPosition(onSuccessScroll,onErrorScroll);
    }
    
    function irPessoas(idLocal){
        DGlobal.idLocal = idLocal;
        Pagina.navegar({idPage:26,paramAdd:'?id='+idLocal+'&atualizando=0'});
    }
    
    function irPerguntas(id){
        Pagina.navegar({idPage:27,paramAdd:'?localId='+id});
    }
    
    function voltarMapa(){
        if(DGlobal.coordenadasAtual){
            Pagina.navegar({idPage:22,paramAdd:'?latitude='+DGlobal.coordenadasAtual.latitude+'&longitude='+DGlobal.coordenadasAtual.longitude});
        }else{
            var options = { maximumAge: 3000, timeout: 3000, enableHighAccuracy: true };
            navigator.geolocation.getCurrentPosition(onSuccess,onError,options);
        }
    }
    
    var onSuccess = function(position){
        DGlobal.coordenadasAtual = {latitude:position.coords.latitude,longitude:position.coords.longitude};
        Pagina.navegar({idPage:22,paramAdd:'?latitude='+DGlobal.coordenadasAtual.latitude+'&longitude='+DGlobal.coordenadasAtual.longitude});
    };
    
    var onSuccessScroll = function(position){
        DGlobal.coordenadasAtual = {latitude:position.coords.latitude,longitude:position.coords.longitude};
        var obj = {latitude:DGlobal.coordenadasAtual.latitude,longitude:DGlobal.coordenadasAtual.longitude,atualizando:true};
        LocaisRequisicoes.set({dados:obj,scope:scope,acaoSuccess:LocaisRequisicoes.successListarAreas}).listarAreas();
    };

    function onErrorScroll(error){
        
    }
    
    function onError(error){
        var coordenadas = {latitude:-21.135445,longitude:-42.365089};
        Pagina.navegar({idPage:22,paramAdd:'?latitude='+coordenadas.latitude+'&longitude='+coordenadas.longitude});
    }
    
    function attTutorial(){
        LocaisRequisicoes.set({dados:false,scope:scope,acaoSuccess:LocaisRequisicoes.successAttTutorial}).attTutorial();
    }
    
    return {
        setScope:setScope,
        inicializar:inicializar,
        exibirMidias:exibirMidias,
        irPessoas:irPessoas,
        irPerguntas:irPerguntas,
        carregarLocais:carregarLocais,
        voltarMapa:voltarMapa,
        attTutorial:attTutorial
    };
    
 }]);
