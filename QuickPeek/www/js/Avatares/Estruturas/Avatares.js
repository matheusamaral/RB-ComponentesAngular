'use strict';

angular.module('QuickPeek.HTML.Avatares', [
])

.factory('AvataresHtml', [ function() {
       
    function montar() {
        return '<div class="row bar bar-header bar-positive">\n\
                    <div>\n\
                        <button ng-click="pular()" class="btn-txt-direita button button-positive">\n\
                            <i class="icon ion-android-arrow-back"></i>ESCOLHA UM AVATAR\n\
                        </button>\n\
                    </div>\n\
                    <div style="margin-left: auto;">\n\
                        <button ng-click="pular()" ng-disabled="!avatares.selecionado" class="btn-txt-direita button button-positive">\n\
                            ACEITAR\n\
                        </button>\n\
                    </div>\n\
                </div>\n\
                <div class="row" style="margin-top:80px !important">\n\
                    <div class="col">\n\
                        <div class="box-avatar btn-redondo-grande" style="background-image: url(img/Animais/anteater.svg)"></div>\n\
                        <p class="col font-preta titulo-avatar">Nome do avatar</p>\n\
                    </div>\n\
                    <div class="col">\n\
                        <div class="box-avatar btn-redondo-grande" style="background-image: url(img/Animais/bat.svg)"></div>\n\
                        <p class="col font-preta titulo-avatar">Nome do avatar</p>\n\
                    </div>\n\
                    <div class="col">\n\
                        <div class="box-avatar btn-redondo-grande" style="background-image: url(img/Animais/bear.svg)"></div>\n\
                        <p class="col font-preta titulo-avatar">Nome do avatar</p>\n\
                    </div>\n\
                </div>\n\
                <div class="row">\n\
                    <div class="col">\n\
                        <div class="box-avatar btn-redondo-grande" style="background-image: url(img/Animais/bee.svg)"></div>\n\
                        <p class="col font-preta titulo-avatar">Nome do avatar</p>\n\
                    </div>\n\
                    <div class="col">\n\
                        <div class="box-avatar btn-redondo-grande" style="background-image: url(img/Animais/bird.svg)"></div>\n\
                        <p class="col font-preta titulo-avatar">Nome do avatar</p>\n\
                    </div>\n\
                    <div class="col">\n\
                        <div class="box-avatar btn-redondo-grande" style="background-image: url(img/Animais/boar.svg)"></div>\n\
                        <p class="col font-preta titulo-avatar">Nome do avatar</p>\n\
                    </div>\n\
                </div>';
    };        
  
    return {
        montar: montar
    };
 }]);

