'use strict';

angular.module('QuickPeek.Acoes.ConfigContatos', [ 
    'RB.pagina',
    'QuickPeek.Requisicao.ConfigContatos',
    'RB.validacoesPadroes'
])

.factory('ConfigContatosAcoes', ['Pagina','$timeout','ConfigContatosRequisicoes','$cordovaSocialSharing','VP',
    function(Pagina,$timeout,ConfigContatosRequisicoes,$cordovaSocialSharing,VP){
    var scope;  
    
    function setScope(obj){
        scope = obj;
        return this;
    };
    
    function voltarConfig(){
        Pagina.navegar({idPage:9});
    }
    
    function attNotificacoes(){
        $timeout(function(){
            ConfigContatosRequisicoes.set({dados:scope.dados,scope:scope,acaoSuccess:ConfigContatosRequisicoes.successEditarContato}).editarContato();
        });
    }
    
    function abrirBarra(){
        scope.dados.exibirBox = true;
        $timeout(function(){
            scope.dados.animar = true;
        },0);
    }
    
    function fecharBarra(){
        scope.dados.animar = false;
        $timeout(function(){
            scope.dados.exibirBox = false;
        },500);
    }
    
    function compartilhar(){
        $cordovaSocialSharing
        .share('Oi', 'sub', null, 'www') // Share via native share sheet
        .then(function(result) {
        }, function(err) {
        });
    }
    
    return {
        setScope:setScope,
        voltarConfig:voltarConfig,
        attNotificacoes:attNotificacoes,
        abrirBarra:abrirBarra,
        fecharBarra:fecharBarra,
        compartilhar:compartilhar
    };
    
 }]);
