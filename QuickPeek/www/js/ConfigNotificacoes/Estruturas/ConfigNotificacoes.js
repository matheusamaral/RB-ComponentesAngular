'use strict';

angular.module('QuickPeek.HTML.ConfigNotificacoes', [
])

.factory('ConfigNotificacoesHtml', [ function() {
       
    function montar() {
        return '<div class="row bar bar-header bar-positive">\n\
                    <div>\n\
                        <button ng-click="voltarConfig()" class="btn-txt-direita button button-clear">\n\
                            <i class="icon ion-android-arrow-back seta-barra"></i>Notificações e alertas\n\
                        </button>\n\
                    </div>\n\
                </div>\n\
                <div class="altura-barra-padding remove-padding row corpo-lista-config">\n\
                    <div class="col remove-padding">\n\
                        <div class="row divide-sessoes padding-padrao-contas">\n\
                            <p class="col remove-padding titulo-sessao">Notificar sempre que um seguidor realizar a primeira contribuição em um local?</p>\n\
                            <md-switch\n\
                            ng-click="attNotificacoes(1)"\n\
                            ng-model="dados.notificacaoPublicacao" class="md-primary md-raised"\n\
                            ng-true-value="1"\n\
                            ng-false-value="0"\n\
                            ng-class="{\'switch-verde\' : dados.notificacaoPublicacao == 1}">\n\
                            </md-switch>\n\
                        </div>\n\
                    </div>\n\
                </div>';
    };        
  
    return {
        montar: montar
    };
 }]);



