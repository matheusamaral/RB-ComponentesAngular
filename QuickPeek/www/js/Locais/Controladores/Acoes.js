'use strict';

angular.module('QuickPeek.Acoes.Locais', [ 
    'RB.pagina',
    'QuickPeek.Requisicao.Locais',
    'RB.validacoesPadroes'
])

.factory('LocaisAcoes', ['Pagina','$timeout','LocaisRequisicoes','VP',
    function(Pagina,$timeout,LocaisRequisicoes,VP){
    var scope;  
    
    function setScope(obj){
        scope = obj;
        return this;
    };
    
    function inicializar(){
        $('ion-side-menu-content').addClass('background-cinza-claro');
    }
    
    function exibirMidias(id){
        var obj = {id:id};
        LocaisRequisicoes.set({dados:obj,scope:scope,acaoSuccess:LocaisRequisicoes.successListarMidias}).listarMidias();
    }
    
    function irPessoas(idLocal){
        DGlobal.idLocal = idLocal;
        Pagina.navegar({idPage:26,paramAdd:'?id='+idLocal+'&atualizando=0'});
    }
    
    return {
        setScope:setScope,
        inicializar:inicializar,
        exibirMidias:exibirMidias,
        irPessoas:irPessoas
    };
    
 }]);
