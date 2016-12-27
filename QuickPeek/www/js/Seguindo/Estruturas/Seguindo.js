'use strict';

angular.module('QuickPeek.HTML.Seguindo', [
])

.factory('SeguindoHtml', [ function() {
       
    function montar() {
        return '<div class="row bar bar-header bar-positive">\n\
                    <div>\n\
                        <button ng-click="voltarPerfil()" class="btn-txt-direita button button-clear">\n\
                            <i class="icon ion-android-arrow-back seta-barra"></i>{{dados.seguidores.length}} seguindo\n\
                        </button>\n\
                    </div>\n\
                </div>\n\
                <div ng-repeat="pessoa in dados.seguidores" \n\
                class="row remove-padding-row divide-sessoes corpo-lista-config padding-padrao-contas"\n\
                ng-class="{\'padding-top-bloqueados\' : $index == 0}"\n\
                ng-if="dados.seguidores.length > 0">\n\
                    <div class="col-25 remove-padding">\n\
                        <div style="background-image:url({{pessoa.endereco}})" class="btn-redondo-medio"></div>\n\
                    </div>\n\
                    <div class="col remove-padding col-center">\n\
                        <p class="font-preta negrito text-left">{{pessoa.nome}}</p>\n\
                    </div>\n\
                    <div class="remove-padding col-center">\n\
                        <button ng-click="deixarDeSeguir(pessoa.usuarioId)" class="btn-seguidores button button button-balanced">\n\
                            <i class="icon ion-checkmark"></i>Seguindo\n\
                        </button>\n\
                    </div>\n\
                </div>\n\
                <div ng-if="dados.seguidores.length == 0" class="padding-top-bloqueados row padding-padrao-contas">\n\
                    <div class="col text-center">\n\
                        <i class="icone-padrao icon ion-alert-circled"></i>\n\
                        <p style="color:#b0b0b0">Vocẽ não segue nenhuma pessoa, ainda...</p>\n\
                    </div>\n\
                </div>';
    };        
  
    return {
        montar: montar
    };
 }]);



