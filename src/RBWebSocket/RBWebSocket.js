'use strict';

angular.module('Cmp.Websocket',[
    'RB.validacoesPadroes',
    'RB.pagina'
])

.factory('Websocket', ['$timeout',
    function($timeout){
        var conn = false;
        var serverG = false;
        var idPaginaG = false;
        var idG = false;
        var successG = false;
        
        function iniciarConexao(server,idPagina,id,success){
//            serverG = server;
//            idPaginaG = idPagina;
//            idG = id;
//            successG = success;
            
            console.log('Servidor '+server);
            conn = new ReconnectingWebSocket('ws://'+server);

            conn.onopen = function(e){
                console.log("Connection established!");
                var pagina;
                if(id)
                    pagina = idPagina+'-'+id;
                else if(idG) pagina = idPaginaG+'-'+idG;
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
                    if(successG)successG(angular.fromJson(e.data));
                    else if(success)success(angular.fromJson(e.data));
                };
                
                console.log()
                console.log(typeof obj);
                
                conn.send(JSON.stringify(obj));
            };
            
            
            conn.onclose = function () {
                conn.refresh();
            };
            
            return conn;
        }
        
        function setarPagina(idPagina,id,success,server){
            serverG = server;
            idPaginaG = idPagina;
            idG = id;
            successG = success;
            //método disparado quando alguem da conexão fazer pergunta
            if(conn === false || (conn.readyState !== 0 && conn.readyState !== 1)){
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
                
                conn.error = function () {
                    alert('AEEE');
                };
            }
            
            return conn;
        }
        
//        function enviar(obj){
//            console.log('conn: '+conn);
//            console.log('readyState: '+conn.readyState);
//            if(conn === false || (conn.readyState !== 0 && conn.readyState !== 1 && serverG)){
//                console.log('Entrou no iniciar nova conexao ao enviar mensagem');
//                
//            }else{
//                return conn.send(JSON.stringify(obj));
//            }
//        };
        
        return {
            iniciarConexao:iniciarConexao,
            setarPagina:setarPagina
//            enviar: enviar
        };
 }]);