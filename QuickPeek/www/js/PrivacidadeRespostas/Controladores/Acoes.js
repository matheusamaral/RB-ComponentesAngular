'use strict';

angular.module('QuickPeek.Acoes.PrivacidadeRespostas', [ 
    'RB.pagina',
    'QuickPeek.Requisicao.PrivacidadeRespostas'
])

.factory('PrivacidadeRespostasAcoes', ['Pagina','PrivacidadeRespostasRequisicoes','$timeout',
    function(Pagina,PrivacidadeRespostasRequisicoes,$timeout){
    var scope;  
    
    function setScope(obj){
        scope = obj;
        return this;
    };
    
    function inicializar(){
        $('ion-side-menu-content').addClass('background-cinza');
    };
    
    function voltarPerguntas(){
        Pagina.navegar({idPage:27,paramAdd:'?localId='+DGlobal.idLocal});
    }
    
    function irResposta(id){
        $timeout(function(){
            var obj = {
                visibilidadeId:scope.dados.visibilidadeId,
                perguntasId:id,
                editando:0
            };

            PrivacidadeRespostasRequisicoes.set({dados:obj,scope:scope,acaoSuccess:PrivacidadeRespostasRequisicoes.successSetarVisibilidade}).setarVisibilidade();
        },0);
        
    }
    
    return {
        setScope:setScope,
        inicializar:inicializar,
        voltarPerguntas:voltarPerguntas,
        irResposta:irResposta
    };
    
 }]);
