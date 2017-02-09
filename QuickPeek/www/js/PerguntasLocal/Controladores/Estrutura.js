'use strict';

angular.module('QuickPeek.Estrutura.PerguntasLocal', [
    'RB.gcs',
    'RB.config',
    'RB.pagina',
    'RB.validacoesPadroes'
])

.factory('PerguntasLocalEstrutura', ['GCS','Config','Pagina','VP',
    function(GCS,Config,Pagina,VP) {
    var scope;  
    
    function setScope(obj){
        scope = obj;
        return this;
    }
    
    function popular(){
        scope.dados = {perguntas:new Array()};
        
        //scope.dados.perguntas = [{"id":"4","titulo":"2","usuarioId":"2","respondida":"1","respostas":"16","endereco":"img\/deOlhoAudacia.jpg","nome":"Teste2","momento":"2016-11-24 15:38:41"},{"id":"15","titulo":"1","usuarioId":"2","respondida":"0","respostas":"0","endereco":"img\/deOlhoAudacia.jpg","nome":"Teste2","momento":"2016-11-23 13:29:18"},{"id":"13","titulo":"dasdasdsa","usuarioId":"4","respondida":"1","respostas":"21","endereco":"https:\/\/scontent-gru2-1.xx.fbcdn.net\/v\/t1.0-9\/15095557_1322110414489661_8523253620421857301_n.jpg?oh=62b60d38f48b7c3c0461f6b2de841521&oe=591E29DE","nome":"editado","momento":"2016-11-23 12:51:55"}];
    
        if(DGlobal.perguntas && DGlobal.perguntas.success){
            scope.dados.perguntas = DGlobal.perguntas.dados;
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
