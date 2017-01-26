'use strict';

angular.module('QuickPeek.HTML.Notificacoes', [
])

.factory('NotificacoesHtml', [ function() {
       
    function montar() {
        return tabs()+'\n\
                <div class="row" style="padding:0;padding-top:90px !important">\n\
                    <div ng-click="irNotSeguir()" ng-if="dados.seguir.contagem > 0"\n\
                    class="position-relative row remove-padding-row">\n\
                        <div class="display-table-vertical col-20 remove-padding">\n\
                            <div style="background-image:url({{dados.seguir.usuario.usuarioEndereco}})" class="btn-redondo-medio">\n\
                                <div class="container-notificacoes">{{dados.seguir.contagem}}</div>\n\
                            </div>\n\
                        </div>\n\
                        <div style="padding-left:10px !important;padding-right:10px !important;" class="remove-padding col-center">\n\
                            <p style="text-align:start !important;padding-bottom:7px;padding-top:4px;" class="font-preta">Solicitaçôes para seguir</p>\n\
                            <p class="font-cinza text-left">Aprove ou ignore solicitações</p>\n\
                        </div>\n\
                    </div>\n\
                    <div style="padding-top:80px !important;" ng-if="dados.seguir.contagem < 1" class="altura-barra row padding-padrao-contas">\n\
                        <div class="col text-center">\n\
                            <i class="icone-padrao icon ion-alert-circled"></i>\n\
                            <p style="color:#b0b0b0">Nenhum pedido pendente</p>\n\
                        </div>\n\
                    </div>\n\
                </div>';
    }; 
    
    function tabs(){
        return'<div class="tabs-striped tabs-top tabs-background-positive tabs-color-light">\n\
                    <div class="tabs box-shadow-barra">\n\
                        <a class="tab-item" href="#" ng-click="irMapa()">\n\
                            <i style="opacity: 0.5;" class="icon img-quick-logo"></i>\n\
                        </a>\n\
                        <a class="tab-item" href="#">\n\
                            <i class="icon ion-chatbox-working"></i>\n\
                        </a>\n\
                        <a class="tab-item active" href="#">\n\
                            <i class="icon ion-android-notifications"></i>\n\
                        </a>\n\
                        <a class="tab-item" href="#" ng-click="irPerfil()">\n\
                            <i class="icon ion-person"></i>\n\
                        </a>\n\
                    </div>\n\
                </div>';
    }
  
    return {
        montar: montar
    };
 }]);

