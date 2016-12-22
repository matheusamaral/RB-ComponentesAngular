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
        if(!DGlobal.avatarSelecionado)DGlobal.avatarSelecionado = {};
        if(!scope.dados.avatar)scope.dados.avatar = {};
        DGlobal.avatarSelecionado = scope.dados.avatar;
        DGlobal.avatarSelecionado.perfil = true;
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
        irSeguindo:irSeguindo
    };
    
 }]);
