'use strict';

angular.module('RB.gcs', ['ngRoute', 'RB.loading','RB.validacoesPadroes', 'RB.mensagem', 'RB.config', 'ngCookies'])

.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
}])

.run(['$http', '$cookies', function($http, $cookies) {
    $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
}])

.factory('GCS', ['RBLoading','VP', 'MSG', '$http', '$location', '$route',
     function(RBLoading, VP, MSG, $http, $location, $route) {
       
    function conectar(dados) {
        var dadosRequisicao = {
            url: '',
            tipo: 'get',
            crossDomain: false,
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            cache: false,
            dataType: 'html',
            dados: null,
            acao: '',
            error: null,
            guardarLocal: 0,
            exibeMSG: 0,
            exibeMSGCarregando: 1,
            tipoEnvio: '',
            idForm: '',
            scope: false
        };
        
        
        dados = VP.validarObj(dados, dadosRequisicao);
        
         
        if(typeof dados.dados === 'object') {
            if(dados.dados){ 
                dados.dados.idAba = DGlobal.acaoCliente.aba;
                dados.dados.conteudoCliente = conteudosJaNoCliente();
                dados.dados = $.param(dados.dados);
            }
        } else if(String(dados.dados) === 'null')
            dados.dados = {idAba: DGlobal.acaoCliente.aba, conteudoCliente: conteudosJaNoCliente()};
        
        else
            dados.dados += '&idAba=' + DGlobal.acaoCliente.aba
                        + '&conteudoCliente='+$.param(conteudosJaNoCliente());
        
        RBLoading.changeStatus(true);                                       
        
        var objEnviar = {
            method: dados.tipo, 
            url: dados.url, 
            data: dados.dados,
            //cache: $templateCache, 
            cache: dados.cache, 
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        };
        
        $http(objEnviar).
            success(function(data, status) {
                RBLoading.changeStatus(false);
                dados.acao(data, dados.scope);
            }).
            error(function(data, status) {
                RBLoading.changeStatus(false);
                dados.error(data, dados.scope);
          });
        };

    function conteudosJaNoCliente(){
        var array =[];
        if(GDados){
            angular.forEach(GDados.opcoesSelect, function(value, key){
                array.push(key);
            });
        }
        return array;
    };

    function verificarMsgServidor(dados) {
        if (dados.success) {
            MSG.abirMesagemAcao(dados.msg);
        } else {
            MSG.abirMesagemAcao(dados.errors);
        }
    };
    function executarAcaoServidor(dados){
        popularDadosLocais(dados);
        popularGDados(dados);
        var direcionamento;        
        if (VP.ehValido(DGlobal.acaoCliente)) {
            direcionamento = dados.acaoCliente.nomeURL;
        }
        
        if(String($location.path()) === '/'+direcionamento) $route.reload();        
        //$location.url(direcionamento);
        $location.path(direcionamento, false);
    };
    
    function popularDadosLocais(dados) {
        
        $.each(dados, function(idx, obj) {
            if (String(DGlobal[idx]) !== 'undefined') {
                delete DGlobal[idx];
            }
            var objS = JSON.stringify(obj);
          
            if(VP.ehValido(objS)){
                var objJ = JSON.parse('{"' + idx + '":' + objS + '}');
                $.extend(DGlobal, objJ);    
            }
            
        });
    };
    
    function popularGDados(dados){
        
        if(!GDados.opcoesSelect)GDados.opcoesSelect ={};
        if(!GDados.dadosTabela)GDados.dadosTabela ={};
        var stringDGlobal = JSON.stringify(dados);
        var obj = JSON.parse(stringDGlobal);
        
        $.extend(GDados.opcoesSelect,obj.opcoesSelect);
        $.extend(GDados.dadosTabela,obj.dadosTabela);
    };

    return {
        conectar: conectar,
        verificarMsgServidor: verificarMsgServidor,
        executarAcaoServidor: executarAcaoServidor,
        popularGDados: popularGDados
    };
    
 }])
 
 .provider('myCSRF',[function(){
        var headerName = 'X-CSRFToken';
        var cookieName = 'csrftoken';
        var allowedMethods = ['GET'];

        this.setHeaderName = function(n) {
          headerName = n;
        }
        this.setCookieName = function(n) {
          cookieName = n;
        }
        this.setAllowedMethods = function(n) {
          allowedMethods = n;
        }
        this.$get = ['$cookies', function($cookies){
          return {
            'request': function(config) {
              if(allowedMethods.indexOf(config.method) === -1) {
                // do something on success
                config.headers[headerName] = $cookies[cookieName];
              }
              return config;
            }
          }
        }];
    }
])

.config(function($httpProvider) {
  $httpProvider.interceptors.push('myCSRF');
});