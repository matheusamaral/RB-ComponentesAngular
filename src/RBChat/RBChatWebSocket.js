'use strict';

angular.module('RB.ChatWebSocket',[])

.factory('RBChatWebSocket', ['Websocket',
    function (Websocket) {
        var scope;
        
        function setScope(obj){
            scope = obj;
            scope.rbChatWebSocket = {};
            return this;
        };
        
        function iniciar(metodoWebSocket,idAuxiliar){
            configConexao(metodoWebSocket,idAuxiliar);
        }
        
        function configConexao(metodoWebSocket,idAuxiliar){
            if(DGlobal.acaoCliente && DGlobal.acaoCliente.idPagina)
                var idPagina = DGlobal.acaoCliente.idPagina;
            scope.rbChatWebSocket = Websocket.setarPagina(idPagina,idAuxiliar,metodoWebSocket,refAmbienteWs);
        }

        return {
            setScope:setScope,
            iniciar:iniciar
        };
    }
]);