'use strict';

angular.module('Cmp.Websocket',[
    'RB.validacoesPadroes',
    'RB.pagina'
])

.factory('Websocket', ['$timeout',
    function($timeout){
        var conn = false;

        function iniciarConexao(idPagina,id,success,server){
            conn = new WebSocket('ws://'+server);

            conn.onopen = function(e){
                console.log("Connection established!");
                conn.onmessage = function(e){
                    success(angular.fromJson(e.data));
                };

                var obj = {
                    codsessrt: JSON.parse(localStorage.getItem("dadosSessao")).codsessrt,
                    processo: 'Usuario',
                    etapa: 'setarDadosBanco',
                    pagina: idPagina+'-'+id
                };

                conn.send(JSON.stringify(obj));
            };

            return this;
        }

        function setarPagina(idPagina,id,success,server){
            //método disparado quando alguem da conexão fazer pergunta
            if(conn === false){
                iniciarConexao(idPagina,id,success,server);
            }else{

                $timeout(function(){
                    conn.onmessage = function(e){
                        success(angular.fromJson(e.data));
                    };

                    var obj = {
                        codsessrt: JSON.parse(localStorage.getItem("dadosSessao")).codsessrt,
                        processo: 'Usuario',
                        etapa: 'setarDadosBanco',
                        pagina: idPagina+'-'+id
                    };

                    conn.send(JSON.stringify(obj));
                },0);
            }
            return conn;
        }

        return {
            iniciarConexao:iniciarConexao,
            setarPagina:setarPagina
        };
 }]);
