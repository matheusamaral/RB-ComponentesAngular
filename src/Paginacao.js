'use strict';

angular.module('RB.Paginacao', [ 
'RB.validacoesPadroes'
])

.factory('Paginacao', ['VP',
    function(VP) {
    var scope;  
    var dados = {}; 
    var controleOrdencao = {};
    
    function setScope(obj,config, dadosPaginacao){
        scope = obj;
        if(!scope.paginacao)scope.paginacao = {};
        controleOrdencao[config.indice] = {};
        if(dadosPaginacao.length){
            dados[config.indice] = dadosPaginacao;
        }else{
            dados[config.indice] = [];
        }
        
        scope.paginacao[config.indice] = {
            totalItems : dados[config.indice].length,
            currentPage : 1,
            itemsPerPage: config.itemPage,
            numPaginas:10,
            maxSize : 10,
            exibirPaginacao: dados[config.indice].length > config.itemPage
        };
        return this;
    };
    
    function inicializar(indice){
        atualizaPaginacao(indice);
    }
    
    function limparOrdenacao(indice){
        controleOrdencao[indice].ordenacaoAtual = false;
    }
    
    function atualizaPaginacao(indice,ordernacao){
        if(ordernacao !== 1){
            if(VP.ehValido(controleOrdencao[indice].ordenacaoAtual)
                    && controleOrdencao[indice].ordenacaoAtual){
                ordenarDados(indice,    controleOrdencao[indice].ordenacaoAtual.valor, 
                                        controleOrdencao[indice].ordenacaoAtual.direcao, 
                                        controleOrdencao[indice].ordenacaoAtual.tipo);
                return;
            }
        }
        if(dados[indice].length){
            var arrayInverso= [];
            for(var i = 0; i < dados[indice].length; i++){
                arrayInverso.push(dados[indice][i]);
            }
            scope[indice] = arrayInverso.reverse().slice(((scope.paginacao[indice].currentPage-1) * scope.paginacao[indice].itemsPerPage),((scope.paginacao[indice].currentPage) * scope.paginacao[indice].itemsPerPage));
        }else{
            scope[indice] = [];
        }
        if(ordernacao)
            VP.irTopoPagina('#'+indice,50);
    }
    
    function atualizarDados(indice, valor){
        if(valor.length){
            dados[indice] = valor;
        }else{
           dados[indice] = []; 
           scope[indice] = [];
        }
        scope.paginacao[indice].totalItems =dados[indice].length;
        scope.paginacao[indice].currentPage = 1;
        scope.paginacao[indice].exibirPaginacao = dados[indice].length > scope.paginacao[indice].itemsPerPage;
        atualizaPaginacao(indice);
    }

    function ordenarDados(indice, valor, direcao, tipo){
        controleOrdencao[indice][valor] = direcao;
        controleOrdencao[indice].ordenacaoAtual = {direcao: direcao, tipo: tipo, valor: valor};
        dados[indice].forEach(function(elemento, index){
            elemento.ordenar = valor;
            elemento.tipo = tipo;
            dados[indice][index] = elemento;
        });
        if(direcao === 0){
            dados[indice].sort(compareDesc);
        }else{
            dados[indice].sort(compareAsc);
        }
        setTimeout(atualizaPaginacao(indice,1),0);
        iconesOrdenacao(indice,valor,direcao);
    }
    
    function iconesOrdenacao(indice,valor,direcao){
        if($('#'+indice+' span.config-setas').hasClass('setaPersonalizada'))
            $('#'+indice+' span.config-setas').removeClass('setaPersonalizada');
        if($('#'+indice+' span.config-setas').hasClass('glyphicon glyphicon-chevron-up'))
            $('#'+indice+' span.config-setas').removeClass('glyphicon glyphicon-chevron-up');
        if($('#'+indice+' span.config-setas').hasClass('glyphicon glyphicon-chevron-down'))
            $('#'+indice+' span.config-setas').removeClass('glyphicon glyphicon-chevron-down');
        $('#'+indice+' h4').addClass('outlinepaginacao');
        $('#'+indice+' span.config-setas').addClass('setaPersonalizada');
        if(direcao===0){
            $('#'+indice+' #'+valor+' span.config-setas').addClass("glyphicon glyphicon-chevron-up");
        }
        if(direcao===1){
            $('#'+indice+' #'+valor+' span.config-setas').addClass("glyphicon glyphicon-chevron-down");
        }
    }
    
    function convertTipo(valor, tipo){
        switch(tipo){
            case 'date':
                if(!VP.ehValido(valor)){
                    return 0; 
                }
                return VP.dataInt(valor);
            break;
            case 'int':
                if(!VP.ehValido(valor)){
                    return 0; 
                }
                return parseInt(valor);
            break;
            default:
                if(!VP.ehValido(valor)){
                    return ""; 
                }
                return valor;
            break;
        }
    }
    
    function compareAsc(a,b) {
        if (convertTipo(a[a.ordenar],a.tipo) < convertTipo(b[a.ordenar],a.tipo))
            return -1;
        else if (convertTipo(a[a.ordenar],a.tipo) > convertTipo(b[a.ordenar],a.tipo))
            return 1;
        else 
            return 0;
    }
    
    function compareDesc(a,b) {
        if (convertTipo(a[a.ordenar],a.tipo) > convertTipo(b[a.ordenar],a.tipo))
            return -1;
        else if (convertTipo(a[a.ordenar],a.tipo) < convertTipo(b[a.ordenar],a.tipo))
            return 1;
        else 
            return 0;
    }
    
    function getControleOrdenacao(indice, valor) {
        if(typeof controleOrdencao[indice] !== 'object') return 0;
        return controleOrdencao[indice][valor];
    }
    
    function getDados(indice) {
        return dados[indice];
    }
    
    return {
        setScope:setScope,
        inicializar:inicializar,
        atualizarDados:atualizarDados,
        ordenarDados:ordenarDados,
        atualizaPaginacao: atualizaPaginacao,
        getControleOrdenacao: getControleOrdenacao,
        getDados: getDados,
        limparOrdenacao:limparOrdenacao
    };
    
 }]);



