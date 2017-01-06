'use strict';

angular.module('QuickPeek.Estrutura.PessoasLocal', [
    'RB.gcs',
    'RB.config',
    'RB.pagina',
    'RB.validacoesPadroes'
])

.factory('PessoasLocalEstrutura', ['GCS','Config','Pagina','VP',
    function(GCS,Config,Pagina,VP) {
    var scope;  
    
    function setScope(obj){
        scope = obj;
        return this;
    }
    
    function popular(){
        scope.dados = {pessoas:new Array()};
        
        scope.dados.pessoas = [{
            "usuarioId": "2",
            "visibilidade": "1",
            "endereco": "img\/deOlhoAudacia.jpg",
            "localId": "26",
            "count": "6.1",
            "count2": "1.1",
            "minutos": "7248",
            "seguindo": "0"
        }, {
            "usuarioId": "3",
            "visibilidade": "2",
            "endereco": "endereco\/endereco",
            "localId": "26",
            "count": null,
            "count2": "0.0",
            "minutos": "27446",
            "seguindo": "1"
        }, {
            "usuarioId": "4",
            "visibilidade": "1",
            "endereco": "https:\/\/scontent-gru2-1.xx.fbcdn.net\/v\/t1.0-9\/15095557_1322110414489661_8523253620421857301_n.jpg?oh=62b60d38f48b7c3c0461f6b2de841521&oe=591E29DE",
            "localId": "26",
            "count": null,
            "count2": "0.0",
            "minutos": "17273",
            "seguindo": "0"
        }, {
            "usuarioId": "9",
            "visibilidade": "2",
            "endereco": "endereco\/endereco",
            "localId": "26",
            "count": null,
            "count2": "0.0",
            "minutos": "15991",
            "seguindo": "0"
        }];

    
        if(DGlobal.pessoas && DGlobal.pessoas.success){
            scope.dados.pessoas = DGlobal.pessoas.dados;
            
        }
        
        if(DGlobal.dadosUsuario && DGlobal.dadosUsuario.success){
            scope.dadosUser = DGlobal.dadosUsuario.dados;
        }
    };
  
    return {
        setScope:setScope,
        popular:popular
    };
 }]);
