'use strict';

angular.module('QuickPeek.HTML.ConfigSobre', [
])

.factory('ConfigSobreHtml', [ function() {
       
    function montar() {
        return '<div class="row bar bar-header bar-positive">\n\
                    <div>\n\
                        <button ng-click="voltarConfiguracoes()" class="btn-txt-direita button button-clear">\n\
                            <i class="icon ion-android-arrow-back seta-barra"></i>Sobre e ajuda\n\
                        </button>\n\
                    </div>\n\
                </div>\n\
                <div ng-click="irSobre()" class="row divide-sessoes corpo-lista-config padding-padrao-contas padding-adpatado-contatos" style="padding-top:85px !important">\n\
                    <div class="col remove-padding">\n\
                        <div ng-click="popupVisto()" class="col remove-padding">\n\
                            <p class="titulo-sessao">Sobre</p>\n\
                        </div>\n\
                    </div>\n\
                </div>\n\
                <a ng-href="http://quickpeek.dev.codevip.com.br/fale-conosco/" class="row divide-sessoes corpo-lista-config padding-padrao-contas padding-adpatado-contatos">\n\
                    <div class="col remove-padding">\n\
                        <div class="col remove-padding">\n\
                            <p class="titulo-sessao">FAQ</p>\n\
                        </div>\n\
                    </div>\n\
                </a>\n\
                <div ng-click="irTermos()" class="row divide-sessoes corpo-lista-config padding-padrao-contas padding-adpatado-contatos">\n\
                    <div class="col remove-padding">\n\
                        <div class="col remove-padding">\n\
                            <p class="titulo-sessao">Termos e política de privacidade</p>\n\
                        </div>\n\
                    </div>\n\
                </div>\n\
                <div class="row divide-sessoes corpo-lista-config padding-padrao-contas padding-adpatado-contatos">\n\
                    <div class="col remove-padding">\n\
                        <div ng-click="popupVisto()" class="col remove-padding">\n\
                            <p class="titulo-sessao">Fale conosco</p>\n\
                        </div>\n\
                    </div>\n\
                </div>';
    };        
  
    return {
        montar: montar
    };
 }]);



