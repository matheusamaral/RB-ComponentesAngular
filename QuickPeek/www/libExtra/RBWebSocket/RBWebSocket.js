'use strict';

angular.module('Cmp.Websocket',[
    'RB.validacoesPadroes',
    'RB.pagina'
])

.factory('Websocket', ['$timeout',
    function($timeout){
        var conn = false;
        
        function iniciarConexao(){
            conn = new WebSocket('ws://192.168.0.121:8801');

            conn.onopen = function(e) {
                console.log("Connection established!");
            };
            
            return this;
        }
        
        function setarPagina(idPagina,id,success){
            //método disparado quando alguem da conexão fazer pergunta
            if(conn === false){
                iniciarConexao();
                alert('asdaas');
            }
            
            $timeout(function(){
                conn.onmessage = function(e){
                    success(JSON.parse(e.data));
                };
                
                console.log('id pagina');
                console.log(idPagina);
                console.log('id');
                console.log(id);

                var obj = {
                    codsessrt: JSON.parse(localStorage.getItem("dadosSessao")).codsessrt,
                    processo: 'Usuario',
                    etapa: 'setarDadosBanco',
                    pagina: idPagina+'-'+id
                };

                conn.send(JSON.stringify(obj));
            },0);
            
            return conn;
        }
        
        return {
            iniciarConexao:iniciarConexao,
            setarPagina:setarPagina
        };
 }]);