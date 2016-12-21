'use strict';

angular.module('QuickPeek.Acoes.Avatares', [ 
    'RB.pagina'
])

.factory('AvataresAcoes', ['Pagina',
    function(Pagina) {
    var scope;  
    
    function setScope(obj){
        scope = obj;
        return this;
    };
    
    function inicializar(){
        addCss();
    };
    
    function addCss(){
        
    }  
    
    function voltarCad(){
        if(DGlobal.avatarSelecionado && DGlobal.avatarSelecionado.perfil){
            Pagina.navegar({idPage:8});
        }else{
            if(scope.avatares.editando)
                Pagina.navegar({idPage:8});
            else
                Pagina.navegar({idPage:6});
        }
    }
    
    function mudarAvatar(){
        if(DGlobal.avatarSelecionado && DGlobal.avatarSelecionado.perfil){
            Pagina.navegar({idPage:8});
            DGlobal.avatarSelecionado = scope.avatarSelecionado;
        }else{
            DGlobal.avatarSelecionado = scope.avatarSelecionado;
            if(DGlobal.dadosEditar){
                delete DGlobal.dadosEditar;
                Pagina.navegar({idPage:8});
            }else
                Pagina.navegar({idPage:6});
        }
    }
    
    function selecionarAvatar(id){
        console.log(id);
        for(var i = 0; i < scope.avatares.length; i++){
            if(id == scope.avatares[i].id){
                scope.avatares[i].selecionado = true;
                scope.avatarSelecionado = scope.avatares[i];
            }
            else scope.avatares[i].selecionado = false;
        }
        scope.avatarMarcado = true;
    }
    
    return {
        setScope:setScope,
        inicializar:inicializar,
        voltarCad:voltarCad,
        selecionarAvatar:selecionarAvatar,
        mudarAvatar:mudarAvatar
    };
    
 }]);
