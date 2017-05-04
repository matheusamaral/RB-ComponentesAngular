'use strict';

angular.module('RB.ChatGifs',[
    'RB.pagina',
    'RB.ChatRequisicoes'
])

.factory('RBChatGifs', ['$timeout','RBChatRequisicoes',
    function ($timeout,RBChatRequisicoes) {
        var scope;
        
        function setScope(obj){
            scope = obj;
            return this;
        };
        
        function popular(){
            if(DGlobal.gifs && DGlobal.gifs.success){
                scope.rbChat.gifs = DGlobal.gifs.dados;
            }
            
            scope.rbChat.ehGif = function(link1,link2){
                if(link1){
                    if(link1.split('.')[link1.split('.').length - 1] == 'gif'){
                        return true;
                    }
                }
                
                if(link2){
                    if(link2.split('.')[link2.split('.').length - 1] == 'gif'){
                        return true;
                    }
                }
                
                return false;
            }
        }
        
        function buscarGif(){
            var objGif = {
                pesquisa:scope.rbChat.gifSearch
            };

            $timeout.cancel(scope.timeoutGif);

            scope.timeoutGif = $timeout(function(){
                
                RBChatRequisicoes.set({scope:scope,dados:objGif,acaoSuccess:RBChatRequisicoes.successBuscarGif}).buscarGif();
            },1000);
        }

        return {
            setScope:setScope,
            popular:popular,
            buscarGif:buscarGif
        };
    }
]);