'use strict';

angular.module('QuickPeek.Acoes.ConfigConta', [ 
    'RB.pagina',
    'QuickPeek.HTML.ConfigConta',
    'QuickPeek.Requisicao.ConfigConta'
])

.factory('ConfigContaAcoes', ['Pagina','$ionicPopup','popupUltimoHtml','contaPrivadaHtml','ConfigContaRequisicoes','$timeout',
    function(Pagina,$ionicPopup,popupUltimoHtml,contaPrivadaHtml,ConfigContaRequisicoes,$timeout){
    var scope;  
    
    function setScope(obj){
        scope = obj;
        return this;
    };
    
    function popupVisto(){
        scope.popupVisibilidade = $ionicPopup.alert({
            scope:scope,
            title: 'Visto por último',
            template: popupUltimoHtml.montar(),
            buttons:[
                {
                    text:'CANCELAR',
                    type:['button-positive','button-outline'],
                }
            ]
        });
    }
    
    function popupContaPrivada(){
        scope.opTemporarea = scope.dados.contaPrivada;
        if(scope.opTemporarea == 0){
            scope.contaPrivadaPopup = $ionicPopup.alert({
                scope:scope,
                title: 'Alterar para conta privada?',
                template: contaPrivadaHtml.montar(),
                buttons:[
                    {text:'CANCELAR',type:['button-stable','button-outline'],onTap:fecharPopup},
                    {text:'OK',type:['button-positive','button-outline'],onTap:alterarPrivacidade}
                ]
            });
        }else{
            alterarPrivacidade();
        }
    }
    
    function fecharPopup(){
        scope.dados.contaPrivada = scope.opTemporarea;
        scope.contaPrivadaPopup.close();
    }
    
    function alterarPrivacidade(){
        $timeout(function(){
            var obj = {contaPrivada : scope.dados.contaPrivada};
            ConfigContaRequisicoes.set({dados:obj,scope:scope,acaoSuccess:ConfigContaRequisicoes.successEditarCPrivada}).editarCPrivada();
        },0);
    }
    
    function listarPessoasBloqueadas(){
        Pagina.navegar({idPage:11});
    }
    
    function voltarConfiguracoes(){
        Pagina.rollBack();
    }
    
    function mudarNumero(){
        Pagina.navegar({idPage:12});
    }
    
    function irApagarConta(){
        Pagina.navegar({idPage:14});
    }
    
    function attVisibilidade(titulo,id){
        console.log(id);
        scope.dadosAntigos = {
            visibilidadeTitulo : scope.dados.visibilidadeTitulo,
            visibilidade : scope.dados.visibilidade
        };
        var obj = {visibilidadeId:id,titulo:titulo};
        ConfigContaRequisicoes.set({dados:obj,scope:scope,acaoSuccess:ConfigContaRequisicoes.successEditarVisibilidade}).editarVisibilidade();
    }
    
    return {
        setScope:setScope,
        popupVisto:popupVisto,
        popupContaPrivada:popupContaPrivada,
        listarPessoasBloqueadas:listarPessoasBloqueadas,
        voltarConfiguracoes:voltarConfiguracoes,
        mudarNumero:mudarNumero,
        irApagarConta:irApagarConta,
        attVisibilidade:attVisibilidade
    };
    
 }]);
