'use strict';

angular.module('QuickPeek.Estrutura.Privacidade', [
    'RB.gcs',
    'RB.config',
    'RB.pagina',
    'RB.validacoesPadroes'
])

.factory('PrivacidadeEstrutura', ['GCS','$timeout','Pagina','VP',
    function(GCS,$timeout,Pagina,VP) {
    var scope;  
    
    function setScope(obj){
        scope = obj;
        return this;
    }
    
    function popular(){
        scope.dados = {};
        
        scope.dados.localId = DGlobal.checkIn.local.localId;
        
        if(DGlobal.dadosUsuario && DGlobal.dadosUsuario.success){
            scope.dadosUser = DGlobal.dadosUsuario.dados;
            scope.dados.visibilidadeId = scope.dadosUser.visibilidadeId;
        }
        
        if(DGlobal.checkIn){
            scope.dados.local = DGlobal.checkIn.local;
            scope.dados.localId = DGlobal.checkIn.local.localId;
            if(DGlobal.checkIn.local.visibilidadeCheckIn)scope.dados.visibilidadeId = DGlobal.checkIn.local.visibilidadeCheckIn;
            if(DGlobal.checkIn.local.id)scope.dados.localId = DGlobal.checkIn.local.id;
            if(DGlobal.checkIn.local.titulo)scope.dados.local.nome = DGlobal.checkIn.local.titulo;
            if(DGlobal.checkIn.local.localTitulo)scope.dados.local.nome = DGlobal.checkIn.local.localTitulo;
            if(DGlobal.checkIn.local.localNome)scope.dados.local.nome = DGlobal.checkIn.local.localNome;
        }
    };
  
    return {
        setScope:setScope,
        popular:popular
    };
 }]);
