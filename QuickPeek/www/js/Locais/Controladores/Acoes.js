'use strict';

angular.module('QuickPeek.Acoes.Locais', [ 
    'RB.pagina',
    'QuickPeek.Requisicao.Locais',
    'RB.validacoesPadroes',
    'QuickPeek.Estrutura.Locais',
    'Cmp.InfinitScroll'
])

.factory('LocaisAcoes', ['Pagina','$timeout','LocaisRequisicoes','VP','LocaisEstrutura','InfinitScroll',
    function(Pagina,$timeout,LocaisRequisicoes,VP,LocaisEstrutura,InfinitScroll){
    var scope;  
    
    function setScope(obj){
        scope = obj;
        return this;
    };
    
    function iniciarInfinitScroll(){
        InfinitScroll.iniciar({
            bottom:true,
            idSeletorBottom:'paiContainerScrol',
            acaoBottom:carregarLocais
        });
    }
    
    function inicializar(){
        $('ion-side-menu-content').addClass('background-cinza-claro');
        scope.alturaTela = $('ion-side-menu-content').height();
        $timeout(function(){
            iniciarInfinitScroll();
        },0);
    }
    
    function exibirMidias(id){
        Pagina.navegar({idPage:25,paramAdd:'?id='+id});
    }
    
    function carregarLocais(){
        var obj = {
            latitude:DGlobal.coordenadasAtual.latitude,
            longitude:DGlobal.coordenadasAtual.longitude,
            atualizando:true,
            localId:scope.locais[0].dados.localId
        };
        LocaisRequisicoes.set({dados:obj,scope:scope,acaoSuccess:LocaisRequisicoes.successListarAreas}).listarAreas();
    }
    
    function irPessoas(idLocal){
        DGlobal.idLocal = idLocal;
        Pagina.navegar({idPage:26,paramAdd:'?id='+idLocal+'&atualizando=0'});
    }
    
    function irPerguntas(id){
        DGlobal.idLocal = id;
        Pagina.navegar({idPage:27,paramAdd:'?localId='+id});
    }
    
    function perguntar(id){
//        LocaisRequisicoes.set({
//            dados:{localId:id},
//            scope:scope,
//            acaoSuccess:LocaisRequisicoes.successVerificarLimitePerguntas
//        }).verificarLimitePerguntas();
        DGlobal.idLocal = id;
        Pagina.navegar({idPage:35});
    }
    
    function voltarMapa(){
        if(DGlobal.voltarLocais)delete DGlobal.voltarLocais;
        Pagina.rollBack();
    }
    
    function attTutorial(){
        LocaisRequisicoes.set({dados:false,scope:scope,acaoSuccess:LocaisRequisicoes.successAttTutorial}).attTutorial();
    }
    
    function irCheckin(){
        var options = { maximumAge: 3000, timeout: 3000, enableHighAccuracy: true };
        DGlobal.voltarLocais = true;
        if(DGlobal.coordenadasAtual){
            Pagina.navegar({idPage:29,paramAdd:'?latitude='+DGlobal.coordenadasAtual.latitude+'&longitude='+DGlobal.coordenadasAtual.longitude});
        }else{
            navigator.geolocation.getCurrentPosition(onCheckin,onChekinError);
        }
    }
    
    var onCheckin = function(position){
        DGlobal.coordenadasAtual = {latitude:position.coords.latitude,longitude:position.coords.longitude};
        Pagina.navegar({idPage:29,paramAdd:'?latitude='+DGlobal.coordenadasAtual.latitude+'&longitude='+DGlobal.coordenadasAtual.longitude});
    };
    
    function onChekinError(error){
        var coordenadas = {latitude:-21.135445,longitude:-42.365089};
        Pagina.navegar({idPage:29,paramAdd:'?latitude='+coordenadas.latitude+'&longitude='+coordenadas.longitude});
    }
    
    function checkInLocal(local){
        DGlobal.checkIn = {local:local.dados};
        if(local.localTitulo)DGlobal.checkIn.local.localNome = local.localTitulo;
        Pagina.navegar({idPage:30,paramAdd:'?localId='+local.localId});
    }
    
    function curtirHashtag(hash,localId){
        var obj = {
            hashtagId:hash.hashtagId,
            localId:localId,
            categoriaHashtagId:hash.categoriaId
        };
        LocaisRequisicoes.set({acaoPosterior:LocaisEstrutura.montaHashtags,dados:obj,scope:scope,acaoSuccess:LocaisRequisicoes.successCurtirHashtag}).curtirHashTag();
    }
    
    function converteKmM(km){
        return String((1000 * (parseFloat(km)))).split('.')[0];
    }
    
    function irPublicar(local){
        DGlobal.localPublicar = local;
        Pagina.navegar({idPage:32});
    }
    
    function irAteLocal(local){
        console.log(local);
        var coord = new Array();
        coord.push(local.dados.latitude);
        coord.push(local.dados.longitude);
        launchnavigator.navigate(coord);
    }
    
    return {
        setScope:setScope,
        inicializar:inicializar,
        exibirMidias:exibirMidias,
        irPessoas:irPessoas,
        irPerguntas:irPerguntas,
        carregarLocais:carregarLocais,
        voltarMapa:voltarMapa,
        attTutorial:attTutorial,
        irCheckin:irCheckin,
        checkInLocal:checkInLocal,
        curtirHashtag:curtirHashtag,
        converteKmM:converteKmM,
        irPublicar:irPublicar,
        perguntar:perguntar,
        irAteLocal:irAteLocal
    };
    
 }]);
