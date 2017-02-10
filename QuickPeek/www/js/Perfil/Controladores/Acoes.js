'use strict';

angular.module('QuickPeek.Acoes.Perfil', [ 
    'RB.pagina',
    'QuickPeek.Requisicao.Perfil'
])

.factory('PerfilAcoes', ['Pagina','PerfilRequisicoes',
    function(Pagina,PerfilRequisicoes) {
    var scope;  
    
    function setScope(obj){
        scope = obj;
        return this;
    };
    
    function inicializar(){
        addCss();
    };
    
    function editarPerfil(){
        DGlobal.dadosEditar = scope.dados;
        Pagina.navegar({idPage:6});
    }
    
    function editarAvatar(){
        DGlobal.veioCadastro = scope.dados;
        DGlobal.veioCadastro.avataresId = scope.dados.avatar.id;
        DGlobal.veioCadastro.executarReq = true;
        Pagina.navegar({idPage:7});
    }
    
    function irConfiguracoes(){
        Pagina.rollBack();
    }
    
    function irSeguidores(id){
        Pagina.navegar({idPage:15,paramAdd:'?usuarioId='+id});
    }
    
    function irSeguindo(id){
        DGlobal.seguindo = true;
        Pagina.navegar({idPage:16,paramAdd:'?usuarioId='+id});
    }
    
    function irMapa(){
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
    
    function addCss(){
        //$('ion-side-menu-content').addClass('background-cinza');
    }
    
    function voltar(){
        if(DGlobal.perfilOutros)delete DGlobal.perfilOutros;
        if(DGlobal.paginaVoltar){
            if(DGlobal.idLocal){
                Pagina.navegar({idPage:DGlobal.paginaVoltar,paramAdd:'?id='+DGlobal.idLocal+'&atualizando=0'});
            }else{
                Pagina.navegar({idPage:DGlobal.paginaVoltar});
                delete DGlobal.paginaVoltar;
            }
        }
    }
    
    function seguir(id){
        var obj = {usuarioSeguirId:id};
        PerfilRequisicoes.set({dados:obj,scope:scope,acaoSuccess:PerfilRequisicoes.successSeguir}).seguir();
    }
    
    function deixarSeguir(id){
        var obj = {usuarioSeguirId:id};
        PerfilRequisicoes.set({dados:obj,scope:scope,acaoSuccess:PerfilRequisicoes.successDeixarDeSeguir}).deixarDeSeguir();
    }
    
    function retornaDistancia(dist){
        if(dist < 1)return String((1000 * dist)).split('.')[0]+'m';
        else return dist+'km';
    }
    
    function converteTempo(min){
        if(min < 60)return min+' minutos';
        else return String((min/60)).split('.')[0]+' horas';
    }
    
    function irCheckin(){
        var options = { maximumAge: 3000, timeout: 3000, enableHighAccuracy: true };
        if(DGlobal.coordenadasAtual){
            Pagina.navegar({idPage:29,paramAdd:'?latitude='+DGlobal.coordenadasAtual.latitude+'&longitude='+DGlobal.coordenadasAtual.longitude});
        }else{
            navigator.geolocation.getCurrentPosition(onCheckin,onChekinError,options);
        }
        DGlobal.paginaAnterior = 8;
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
        DGlobal.paginaAnterior = 8;
        DGlobal.checkIn = {local:local};
        if(local.localTitulo)DGlobal.checkIn.local.localNome = local.localTitulo;
        Pagina.navegar({idPage:30});
    }
    
    function irNotificacoes(){
        Pagina.navegar({idPage:36});
    }
    
    function cancelarSolicitacao(id){
        var obj = {seguirId:id};
        PerfilRequisicoes.set({dados:obj,scope:scope,acaoSuccess:PerfilRequisicoes.successCancelarSeguir}).cancelarSeguir();
    }
    
    return {
        setScope:setScope,
        inicializar:inicializar,
        editarPerfil:editarPerfil,
        editarAvatar:editarAvatar,
        irConfiguracoes:irConfiguracoes,
        irSeguidores:irSeguidores,
        irSeguindo:irSeguindo,
        irMapa:irMapa,
        voltar:voltar,
        seguir:seguir,
        deixarSeguir:deixarSeguir,
        retornaDistancia:retornaDistancia,
        converteTempo:converteTempo,
        irCheckin:irCheckin,
        checkInLocal:checkInLocal,
        irNotificacoes:irNotificacoes,
        cancelarSolicitacao:cancelarSolicitacao
    };
    
 }]);