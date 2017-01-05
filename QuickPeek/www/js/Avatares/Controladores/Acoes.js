'use strict';

angular.module('QuickPeek.Acoes.Avatares', [ 
    'RB.pagina',
    'QuickPeek.Requisicao.Avatares'
])

.factory('AvataresAcoes', ['Pagina','AvataresRequisicoes',
    function(Pagina,AvataresRequisicoes){
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
        if(DGlobal.veioCadastro && !DGlobal.veioCadastro.executarReq && !DGlobal.veioCadastro.executarReqPrivacidade){
            Pagina.navegar({idPage:6});
        }
        
        if(DGlobal.veioCadastro && DGlobal.veioCadastro.executarReq){
            Pagina.navegar({idPage:8});
        }
        
        if(DGlobal.veioCadastro && DGlobal.veioCadastro.executarReqPrivacidade){
            Pagina.navegar({idPage:30});
        }
    }
    
    function mudarAvatar(){
        //alert(JSON.stringify(scope.avatarSelecionado));
        var obj = {avataresId:scope.avatarSelecionado.id};
        if(DGlobal.veioCadastro.executarReq || DGlobal.veioCadastro.executarReqPrivacidade){
            AvataresRequisicoes.set({dados:obj,scope:scope,acaoSuccess:AvataresRequisicoes.successEditarAvatar}).editarAvatar();
        }else{
            DGlobal.avatarSelecionado = scope.avatarSelecionado;
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
