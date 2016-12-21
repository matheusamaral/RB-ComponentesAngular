'use strict';

angular.module('QuickPeek.HTML.MudarNumero', [
])

.factory('MudarNumeroHtml', [ function() {
       
    function montar() {
        return '<div class="row bar bar-header bar-positive">\n\
                    <div>\n\
                        <button ng-click="voltarConfig()" class="btn-txt-direita button button-clear">\n\
                            <i class="icon ion-android-arrow-back seta-barra"></i>Mudar n°\n\
                        </button>\n\
                    </div>\n\
                    <div style="margin-left: auto;">\n\
                        <button ng-click="avancar()" class="btn-txt-direita button button-clear">\n\
                            <i class="icon ion-checkmark seta-barra"></i>Avançar\n\
                        </button>\n\
                    </div>\n\
                </div>\n\
                <div class="row altura-barra text-center" style="margin-top:35px !important;margin-bottom:35px">\n\
                    <div class="col">\n\
                        <div class="img-phone margin-auto"></div>\n\
                    </div>\n\
                </div>\n\
                <div class="col rb-padding-padrao text-center"">\n\
                    <p class="p-mudar-numero">Alterar o seu número de telefone você irá migrar todos os dados da sua conta.</p>\n\
                    <p class="p-mudar-numero">Verifique se o novo nùmero está apto para receber SMS, para garantir o sucesso do procedimento.</p>\n\
                    <p class="p-mudar-numero">Se você possui um novo número e um novo telefone, vocẽ deve, primeiro alterar seu número em seu telefone antigo.</p>\n\
                </div>';
    };        
  
    return {
        montar: montar
    };
 }]);

