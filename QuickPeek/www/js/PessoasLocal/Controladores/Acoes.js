'use strict';

angular.module('QuickPeek.Acoes.PessoasLocal', [ 
    'RB.pagina',
    'QuickPeek.Requisicao.PessoasLocal',
    'RB.validacoesPadroes'
])

.factory('PessoasLocalAcoes', ['Pagina','PessoasLocalRequisicoes','VP',
    function(Pagina,PessoasLocalRequisicoes,VP){
    var scope;  
    
    function setScope(obj){
        scope = obj;
        return this;
    };
    
    function voltarLocais(){
        Pagina.navegar({idPage:24,paramAdd:'?localId='+DGlobal.localAtual+'&atualizando=0'});
    }
    
    function converteMinutoshoras(min){
        return VP.converteMinutosHoras(min);
    }
    
    function maisPessoas(){
        var obj = {id:DGlobal.idLocal,atualizando:true};
        PessoasLocalRequisicoes.set({dados:obj,scope:scope,acaoSuccess:PessoasLocalRequisicoes.successListar}).listar();
    }
    
    function irPerfil(id){
        Pagina.navegar({idPage:8,paramAdd:'?usuarioId='+id});
        DGlobal.perfilOutros = true;
        DGlobal.paginaVoltar = 26;
    }
    
    return {
        setScope:setScope,
        voltarLocais:voltarLocais,
        converteMinutoshoras:converteMinutoshoras,
        maisPessoas:maisPessoas,
        irPerfil:irPerfil
    };
    
 }]);
