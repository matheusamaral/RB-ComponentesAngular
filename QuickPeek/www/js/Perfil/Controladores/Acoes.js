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
        Pagina.navegar({idPage:9});
    }
    
    function irSeguidores(){
        Pagina.navegar({idPage:15});
    }
    
    function irSeguindo(){
        DGlobal.seguindo = true;
        Pagina.navegar({idPage:16});
    }
    
    function irMapa(){
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

    function onError(error){
        var coordenadas = {latitude:-21.135445,longitude:-42.365089};
        Pagina.navegar({idPage:22,paramAdd:'?latitude='+coordenadas.latitude+'&longitude='+coordenadas.longitude});
    }
    
    function addCss(){
        //$('ion-side-menu-content').addClass('background-cinza');
    }
    
    return {
        setScope:setScope,
        inicializar:inicializar,
        editarPerfil:editarPerfil,
        editarAvatar:editarAvatar,
        irConfiguracoes:irConfiguracoes,
        irSeguidores:irSeguidores,
        irSeguindo:irSeguindo,
        irMapa:irMapa
    };
    
 }]);
