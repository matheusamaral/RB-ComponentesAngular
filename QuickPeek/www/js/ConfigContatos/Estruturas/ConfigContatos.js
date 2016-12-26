'use strict';

angular.module('QuickPeek.HTML.ConfigContatos', [
])

.factory('ConfigContatosHtml', [ function() {
       
    function montar() {
        return '<div class="row bar bar-header bar-positive">\n\
                    <div>\n\
                        <button ng-click="voltarConfig()" class="btn-txt-direita button button-clear">\n\
                            <i class="icon ion-android-arrow-back seta-barra"></i>Contatos\n\
                        </button>\n\
                    </div>\n\
                </div>\n\
                <div class="altura-barra-padding remove-padding row corpo-lista-config">\n\
                    <div class="col remove-padding">\n\
                        <div ng-click="compartilhar()" class="padding-adpatado-contatos row divide-sessoes padding-padrao-contas">\n\
                            <p class="col remove-padding titulo-sessao">Convidar amigos</p>\n\
                        </div>\n\
                        <div class="row divide-sessoes padding-padrao-contas">\n\
                            <p style="margin-top: 5px;" class="col remove-padding titulo-sessao">\n\
                                Ver todos os contatos</br>\n\
                                <span style="margin-top: 15px;display: block;" class="conteudo-sessao">Ativar também o uso de contatos ocultos</span>\n\
                            </p>\n\
                            <md-switch\n\
                            ng-click="attNotificacoes()"\n\
                            ng-model="dados.contato" class="md-primary md-raised"\n\
                            ng-true-value="1"\n\
                            ng-false-value="0"\n\
                            ng-class="{\'switch-verde\' : dados.contato == 1}">\n\
                            </md-switch>\n\
                        </div>\n\
                    </div>\n\
                </div>';
    };
  
    return {
        montar: montar
    };
 }]);



