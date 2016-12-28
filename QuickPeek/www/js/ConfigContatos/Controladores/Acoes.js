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
        var currentPlatform = ionic.Platform.platform();
        
        var isWebView = ionic.Platform.isWebView();
        var isIPad = ionic.Platform.isIPad();
        var isIOS = ionic.Platform.isIOS();
        var isAndroid = ionic.Platform.isAndroid();
        var isWindowsPhone = ionic.Platform.isWindowsPhone();
        
        var textoSms = 'Oi,eu baixei o QuickPeek no meu '
        +currentPlatform+'.\n\n\
        É um aplicativo que me ajuda a saber como está um local antes de sair de casa.\n\
        Você já teve vontade de saber como estava algum lugar e não tinha ninguém pra te contar?\n\
        Com o Quickpeek é possível espiar onde você quiser agora e conversar com as pessoas que estão lá.';
        
        $cordovaSocialSharing
        .share(textoSms,null, null, null) // Share via native share sheet
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
