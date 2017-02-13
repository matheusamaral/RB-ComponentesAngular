'use strict';

angular.module('RB.gcs', ['ui.router', 'RB.loading','RB.validacoesPadroes', 'RB.mensagem', 'RB.config', 'ngCookies'])

.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}])

.run(['$http', '$cookies', function($http, $cookies) {
    $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
}])

.factory('GCS', ['RBLoading','VP', 'MSG', '$http', '$timeout','$state','runtimeStates','$rootScope',
    function(RBLoading, VP, MSG, $http, $timeout,$state,runtimeStates,$rootScope){
        
    var codsessrt = '';
        
    if(DGlobal && !DGlobal.codsessrt){
        var rbDadosSessao = JSON.parse(localStorage.getItem("dadosSessao"));
        if(!VP.ehValido(rbDadosSessao)){
        }else{
            codsessrt = rbDadosSessao.codsessrt;
        }
    }
       
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
        
        if(dados.exibeMSGCarregando == 1){
            RBLoading.changeStatus(true); 
        }
        
        if(!DGlobal.countReq && DGlobal.countReq!=0) DGlobal.countReq=0;
        else DGlobal.countReq++;
        
        if(typeof dados.dados === 'object') {
            if(dados.dados){ 
                dados.dados.conteudoCliente = conteudosJaNoCliente();
                dados.dados = $.param(dados.dados);
            }
        }
        var concatUrl = '&codsessrt=';
        if(!verfificaParametroGet(dados.url))
                concatUrl = '?codsessrt=';
                
        var objEnviar = {
            method: dados.tipo,
            url: dados.url+concatUrl+codsessrt, 
            data: dados.dados,
            cache: dados.cache, 
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        };
        
        $http(objEnviar).
            success(function(data, status){
                codsessrt = data.codsessrt;
                RBLoading.changeStatus(false);
                dados.acao(data, dados.scope);
                if(data && data.codsessrt){
                    var objSessao = {codsessrt:data.codsessrt};
                    localStorage.setItem('dadosSessao', JSON.stringify(objSessao));
                }
            }).
            error(function(data, status){
                if(data && data.codsessrt){
                    var objSessao = {codsessrt:data.codsessrt};
                    localStorage.setItem('dadosSessao', JSON.stringify(objSessao));
                }
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
    
    function verfificaParametroGet(url){
        for(var i = 0; i < url.length;i++){
            if(url[i] == '?')
                return true;
        }
        return false;
    }

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
        
        if(!$state.get(DGlobal.acaoCliente.acao))
            runtimeStates.addState(VP.removeReferencia(DGlobal));
        
        $timeout(function(){
            $state.go(DGlobal.acaoCliente.acao);
        },0);
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