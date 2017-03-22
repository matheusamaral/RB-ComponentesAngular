'use strict';

angular.module('Cmp.Websocket',[
    'RB.validacoesPadroes',
    'RB.pagina'
])

.factory('Websocket', ['$timeout',
    function($timeout){
        var conn = false;
        
        function iniciarConexao(server,idPagina,id,success){
            console.log('Servidor '+server);
            conn = new WebSocket('ws://'+server);

            conn.onopen = function(e){
                console.log("Connection established!");
                var pagina;
                if(id)
                    pagina = idPagina+'-'+id;
                else
                    pagina = idPagina;
                
                var obj = {
                    codsessrt: JSON.parse(localStorage.getItem("dadosSessao")).codsessrt,
                    processo: 'Usuario',
                    etapa: 'setarDadosBanco',
                    pagina: pagina
                };
                                console.log('obj configuracao pagina');
                console.log(obj);
                
                conn.onmessage = function(e){
                    console.log('RESPOSTA SERVIDOR');
                    console.log(e);
                    if(success)success(angular.fromJson(e.data));
                };
                
                conn.send(JSON.stringify(obj));
            };
            
            return this;
        }
        
        function setarPagina(idPagina,id,success,server){
            //método disparado quando alguem da conexão fazer pergunta
            if(conn === false && conn.readyState !== 1){
                iniciarConexao(server,idPagina,id,success);
            }else{
                conn.onmessage = function(e){
                    console.log('RESPOSTA SERVIDOR');
                    console.log(e);
                    if(success)success(angular.fromJson(e.data));
                };

                var obj = {
                    codsessrt: JSON.parse(localStorage.getItem("dadosSessao")).codsessrt,
                    processo: 'Usuario',
                    etapa: 'setarDadosBanco',
                    pagina: idPagina+'-'+id
                };

                conn.send(JSON.stringify(obj));
            }
            
            return conn;
        }
        
        return {
            iniciarConexao:iniciarConexao,
            setarPagina:setarPagina
        };
 }]);
