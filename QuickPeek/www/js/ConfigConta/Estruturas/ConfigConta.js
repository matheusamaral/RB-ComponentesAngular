'use strict';

angular.module('QuickPeek.HTML.ConfigConta', [
])

.factory('ConfigContaHtml', [ function() {
       
    function montar() {
        return '<div class="row bar bar-header bar-positive">\n\
                    <div>\n\
                        <button ng-click="voltarPerfil()" class="btn-txt-direita button button-clear">\n\
                            <i class="icon ion-android-arrow-back seta-barra"></i>Conta\n\
                        </button>\n\
                    </div>\n\
                </div>\n\
                <div class="row divide-sessoes corpo-lista-config padding-padrao-contas" style="padding-top:75px !important">\n\
                    <div class="col remove-padding">\n\
                        <div ng-click="irConfigConta()" class="col remove-padding">\n\
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
                                <md-switch ng-model="data.cb1" class="md-primary md-raised">\n\
                                </md-switch>\n\
                            </div>\n\
                            <p class="conteudo-sessao">Ninguém</p>\n\
                        </div>\n\
                    </div>\n\
                </div>\n\
                <div class="row divide-sessoes corpo-lista-config padding-padrao-contas" style="padding-top:15px !important">\n\
                    <div class="col remove-padding">\n\
                        <div ng-click="irConfigConta()" class="col remove-padding">\n\
                            <p class="col remove-padding titulo-sessao">Bloqueados: 2</p>\n\
                            <p class="conteudo-sessao">Lista dos contatos bloqueados</p>\n\
                        </div>\n\
                    </div>\n\
                </div>\n\
                <div class="row divide-sessoes corpo-lista-config padding-padrao-contas" style="padding-top:15px !important">\n\
                    <div class="col remove-padding">\n\
                        <div ng-click="irConfigConta()" class="col remove-padding">\n\
                            <p class="col remove-padding titulo-sessao">Mudar o nome</p>\n\
                        </div>\n\
                    </div>\n\
                </div>\n\
                <div class="row divide-sessoes corpo-lista-config padding-padrao-contas" style="padding-top:15px !important">\n\
                    <div class="col remove-padding">\n\
                        <div ng-click="irConfigConta()" class="col remove-padding">\n\
                            <p class="col remove-padding titulo-sessao">Apagar minha conta</p>\n\
                        </div>\n\
                    </div>\n\
                </div>';
    };        
  
    return {
        montar: montar
    };
 }]);

