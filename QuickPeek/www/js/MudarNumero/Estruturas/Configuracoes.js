'use strict';

angular.module('QuickPeek.HTML.Configuracoes', [
])

.factory('ConfiguracoesHtml', [ function() {
       
    function montar() {
        return '<div class="row bar bar-header bar-positive">\n\
                    <div>\n\
                        <button ng-click="voltarPerfil()" class="btn-txt-direita button button-clear">\n\
                            <i class="icon ion-android-arrow-back seta-barra"></i>Configurações\n\
                        </button>\n\
                    </div>\n\
                </div>\n\
                <div class="row corpo-lista-config remove-padding" style="padding-top:75px !important">\n\
                    <div class="col remove-padding">\n\
                        <div ng-click="irConfigConta()" class="row remove-padding">\n\
                            <div class="col-20 text-center" style="padding: 20px;">\n\
                                <i class="icon ion-key"></i>\n\
                            </div>\n\
                            <div class="row border-bottom-config remove-padding-left">\n\
                                <div class="col-center">\n\
                                    <p class="titulo-config">Conta</p>\n\
                                </div>\n\
                            </div>\n\
                        </div>\n\
                        <div class="row remove-padding">\n\
                            <div class="col-20 text-center" style="padding: 20px;">\n\
                                <i class="icon ion-android-notifications"></i>\n\
                            </div>\n\
                            <div class="row border-bottom-config remove-padding-left">\n\
                                <div class="col-center">\n\
                                    <p class="titulo-config">Notificações e alertas</p>\n\
                                </div>\n\
                            </div>\n\
                        </div>\n\
                        <div class="row remove-padding">\n\
                            <div class="col-20 text-center" style="padding: 20px;">\n\
                                <i class="icon ion-ios-people"></i>\n\
                            </div>\n\
                            <div class="row border-bottom-config remove-padding-left">\n\
                                <div class="col-center">\n\
                                    <p class="titulo-config">Contatos</p>\n\
                                </div>\n\
                            </div>\n\
                        </div>\n\
                        <div class="row remove-padding">\n\
                            <div class="col-20 text-center" style="padding: 20px;">\n\
                                <i class="icon ion-help-circled"></i>\n\
                            </div>\n\
                            <div class="row border-bottom-config remove-padding-left">\n\
                                <div class="col-center">\n\
                                    <p class="titulo-config">Sobre e ajuda</p>\n\
                                </div>\n\
                            </div>\n\
                        </div>\n\
                    </div>\n\
                </div>';
    };        
  
    return {
        montar: montar
    };
 }]);

