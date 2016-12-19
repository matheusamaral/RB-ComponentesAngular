'use strict';

angular.module('QuickPeek.HTML.ConfigConta', [
])

.factory('ConfigContaHtml', [ function() {
       
    function montar() {
        return '<div class="row bar bar-header bar-positive">\n\
                    <div>\n\
                        <button ng-click="voltarConfiguracoes()" class="btn-txt-direita button button-clear">\n\
                            <i class="icon ion-android-arrow-back seta-barra"></i>Conta\n\
                        </button>\n\
                    </div>\n\
                </div>\n\
                <div class="row divide-sessoes corpo-lista-config padding-padrao-contas" style="padding-top:75px !important">\n\
                    <div class="col remove-padding">\n\
                        <div ng-click="popupVisto()" class="col remove-padding">\n\
                            <p class="titulo-sessao">Ao marcar presença em um local, seu perfil estará disponível para quem?</p>\n\
                            <p class="conteudo-sessao">Ninguém</p>\n\
                        </div>\n\
                    </div>\n\
                </div>\n\
                <div class="row divide-sessoes corpo-lista-config padding-padrao-contas" style="padding-top:15px !important">\n\
                    <div class="col remove-padding">\n\
                        <div ng-click="irConfigConta()" class="col remove-padding">\n\
                            <div class="row remove-padding">\n\
                                <p class="col remove-padding titulo-sessao">Conta privada</p>\n\
                                <md-switch \n\
                                ng-click="popupContaPrivada()" \n\
                                ng-model="dados.contaPrivada" class="md-primary md-raised"\n\
                                ng-true-value="1"\n\
                                ng-false-value="0">\n\
                                </md-switch>\n\
                            </div>\n\
                            <p class="conteudo-sessao">Quando sua conta é privada, somente as pessoas que você aprova podem ver as presenças que você compartilha com seus seguidores.seus seguidores existentes não serão afetados.</p>\n\
                        </div>\n\
                    </div>\n\
                </div>\n\
                <div class="row divide-sessoes corpo-lista-config padding-padrao-contas" style="padding-top:15px !important">\n\
                    <div class="col remove-padding">\n\
                        <div ng-click="listarPessoasBloqueadas()" class="col remove-padding">\n\
                            <p class="col remove-padding titulo-sessao">Bloqueados: 2</p>\n\
                            <p class="conteudo-sessao">Lista dos contatos bloqueados</p>\n\
                        </div>\n\
                    </div>\n\
                </div>\n\
                <div class="row divide-sessoes corpo-lista-config padding-padrao-contas" style="padding-top:15px !important">\n\
                    <div class="col remove-padding">\n\
                        <div ng-click="mudarNumero()" class="col remove-padding">\n\
                            <p class="col remove-padding titulo-sessao">Mudar o número</p>\n\
                        </div>\n\
                    </div>\n\
                </div>\n\
                <div class="row divide-sessoes corpo-lista-config padding-padrao-contas" style="padding-top:15px !important">\n\
                    <div class="col remove-padding">\n\
                        <div ng-click="irApagarConta()" class="col remove-padding">\n\
                            <p class="col remove-padding titulo-sessao">Apagar minha conta</p>\n\
                        </div>\n\
                    </div>\n\
                </div>';
    };        
  
    return {
        montar: montar
    };
 }])

.factory('popupUltimoHtml', [ function() {
       
    function montar() {
        return '<div class="col remove-padding">\n\
                    <md-radio-group ng-model="dados.vistoUltimo">\n\
                        <md-radio-button ng-repeat="op in dados.vistoUltimoOp" value="{{op.id}}" class="md-primary">{{op.titulo}}</md-radio-button>\n\
                    </md-radio-group>\n\
                </div>';
    };        
  
    return {
        montar:montar
    };
 }])
 
.factory('contaPrivadaHtml', [ function() {
       
    function montar() {
        return '<div class="col remove-padding">\n\
                    Quando sua conta é privada, somente as pessoas que você aprova podem ver as presenças que você compartilha com seus seguidores.seus seguidores existentes não serão afetados\n\
                </div>';
    };        
  
    return {
        montar:montar
    };
 }]);



