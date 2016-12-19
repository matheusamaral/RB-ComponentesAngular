'use strict';

angular.module('QuickPeek.HTML.Avatares', [
])

.factory('AvataresHtml', [ function() {
       
    function montar() {
        return '<div class="row bar bar-header bar-positive">\n\
                    <div>\n\
                        <button ng-click="voltarCad()" class="btn-txt-direita button button-clear">\n\
                            <i class="icon ion-android-arrow-back seta-barra"></i>ESCOLHA UM AVATAR\n\
                        </button>\n\
                    </div>\n\
                    <div style="margin-left: auto;">\n\
                        <button ng-click="mudarAvatar()" class="btn-txt-direita button button-positive">\n\
                            ACEITAR\n\
                        </button>\n\
                    </div>\n\
                </div>\n\
                <div ng-repeat="linhaAvatar in objAvatares" \n\
                ng-class="{\'margin-barra\' : $index == 0}"\n\
                class="row">\n\
                    <div class="col" ng-repeat="avatar in linhaAvatar">\n\
                        <div\n\
                        ng-class="{\'borda-dourada\' : avatar.selecionado}"\n\
                        ng-click="selecionarAvatar(avatar.id)" \n\
                        class="box-avatar btn-redondo-grande" \n\
                        style="background-image: url({{avatar.endereco}})"></div>\n\
                        <p ng-class="{\'font-dourada\' : avatar.selecionado}" class="col font-preta titulo-avatar">{{avatar.nome}}</p>\n\
                    </div>\n\
                </div>';
    };        
  
    return {
        montar: montar
    };
 }]);

