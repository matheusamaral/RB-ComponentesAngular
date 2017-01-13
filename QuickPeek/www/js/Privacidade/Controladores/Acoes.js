'use strict';

angular.module('QuickPeek.Acoes.Privacidade', [ 
    'RB.pagina',
    'QuickPeek.Requisicao.Privacidade'
])

.factory('PrivacidadeAcoes', ['Pagina','PrivacidadeRequisicoes','$timeout',
    function(Pagina,PrivacidadeRequisicoes,$timeout){
    var scope;  
    
    function setScope(obj){
        scope = obj;
        return this;
    };
    
    function inicializar(){
        $('ion-side-menu-content').addClass('background-chekin');
    };
    
    function voltar(){
        if(DGlobal.paginaAnterior){
            Pagina.navegar({idPage:DGlobal.paginaAnterior});
            delete DGlobal.paginaAnterior;
        }else{
            if(DGlobal.voltarLocais){
                Pagina.navegar({idPage:24,paramAdd:'?localId='+DGlobal.localAtual+'&atualizando=0'});
            }else{
                if(DGlobal.checkIn)
                    Pagina.navegar({idPage:29,paramAdd:'?latitude='+DGlobal.coordenadasAtual.latitude+'&longitude='+DGlobal.coordenadasAtual.longitude});
            }
        }
    }
    
    function editarAvatar(){
        DGlobal.veioCadastro = scope.dados;
        if(scope.dadosUser)
            DGlobal.veioCadastro.avataresId = scope.dadosUser.avatarId;
        else
            DGlobal.veioCadastro.avataresId = 1;
        DGlobal.veioCadastro.executarReqPrivacidade = true;
        Pagina.navegar({idPage:7});
    }
    
    function fazerCheckin(){
        PrivacidadeRequisicoes.set({dados:scope.dados,scope:scope,acaoSuccess:PrivacidadeRequisicoes.successFazerCheckIn}).fazerCheckIn();
    }
    
    return {
        setScope:setScope,
        inicializar:inicializar,
        voltar:voltar,
        editarAvatar:editarAvatar,
        fazerCheckin:fazerCheckin
    };
    
 }]);
