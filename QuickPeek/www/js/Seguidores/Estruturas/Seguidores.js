'use strict';

angular.module('QuickPeek.HTML.Seguidores', [
])

.factory('SeguidoresHtml', [ function() {
       
    function montar() {
        return '<div class="row bar bar-header bar-positive">\n\
                    <div>\n\
                        <button ng-click="voltarPerfil()" class="btn-txt-direita button button-clear">\n\
                            <i class="icon ion-android-arrow-back seta-barra"></i>771 seguidores\n\
                        </button>\n\
                    </div>\n\
                </div>\n\
                <div ng-repeat="pessoa in dados.seguidores" \n\
                class="row remove-padding-row divide-sessoes corpo-lista-config padding-padrao-contas"\n\
                ng-class="{\'altura-barra\' : $index == 0}"\n\
                ng-if="dados.seguidores.length > 0">\n\
                    <div class="col-25 remove-padding">\n\
                        <div style="background-image:url({{pessoa.urlImg}})" class="btn-redondo-medio"></div>\n\
                    </div>\n\
                    <div class="col remove-padding col-center">\n\
                        <p class="font-preta negrito text-left">{{pessoa.nome}}</p>\n\
                    </div>\n\
                    <div class="remove-padding col-center">\n\
                        <button ng-if="pessoa.seguindo == 0" class="btn-seguidores button button-outline button-positive">\n\
                            <i class="icon ion-ios-plus-empty"></i>Seguir\n\
                        </button>\n\
                        <button ng-if="pessoa.seguindo == 1" class="btn-seguidores button button button-balanced">\n\
                            <i class="icon ion-checkmark"></i>Seguindo\n\
                        </button>\n\
                    </div>\n\
                </div>\n\
                <div ng-if="dados.seguidores.length == 0" class="altura-barra row padding-padrao-contas">\n\
                    <div class="col text-center">\n\
                        <i class="icone-padrao icon ion-alert-circled"></i>\n\
                        <p style="color:#b0b0b0">Nenhuma pessoa te segue, ainda...</p>\n\
                    </div>\n\
                </div>';
    };        
  
    return {
        montar: montar
    };
 }]);



