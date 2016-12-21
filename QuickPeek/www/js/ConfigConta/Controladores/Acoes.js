'use strict';

angular.module('QuickPeek.Acoes.ConfigConta', [ 
    'RB.pagina',
    'QuickPeek.HTML.ConfigConta'
])

.factory('ConfigContaAcoes', ['Pagina','$ionicPopup','popupUltimoHtml','contaPrivadaHtml',
    function(Pagina,$ionicPopup,popupUltimoHtml,contaPrivadaHtml) {
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
                {text:'CANCELAR',type:['button-positive','button-outline']}
            ]
        });
    }
    
    function popupContaPrivada(){
        console.log(scope.dados.contaPrivada);
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
        scope.contaPrivadaPopup.close();
    }
    
    function listarPessoasBloqueadas(){
        Pagina.navegar({idPage:11});
    }
    
    function voltarConfiguracoes(){
        Pagina.navegar({idPage:9});
    }
    
    function mudarNumero(){
        Pagina.navegar({idPage:12});
    }
    
    function irApagarConta(){
        Pagina.navegar({idPage:14});
    }
    
    function attVisibilidade(titulo,id){
        scope.dados.visibilidadeTitulo = titulo;
        scope.dados.visibilidade = id;
        scope.popupVisibilidade.close();
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
