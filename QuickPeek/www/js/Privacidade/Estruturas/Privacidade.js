'use strict';

angular.module('QuickPeek.HTML.Privacidade', [
])

.factory('PrivacidadeHtml', [function(){
       
    function montar(){
        return '<div style="box-shadow: 0px -2px 8px black !important;" class="row bar bar-header bar-positive">\n\
                    <div class="col remove-padding">\n\
                        <button ng-click="voltar()" class="btn-txt-direita button button-clear">\n\
                            <i class="icon ion-android-arrow-back seta-barra"></i>Privacidade\n\
                        </button>\n\
                    </div>\n\
                    <div class="col remove-padding text-right">\n\
                        <button style="font-size: 8px !important;" ng-click="voltarConfig()" class="btn-txt-direita button button-clear">\n\
                            <i class="icon ion-social-facebook seta-barra"></i>Compartilhar no facebook\n\
                        </button>\n\
                    </div>\n\
                </div>\n\
                <div class="altura-barra-padding remove-padding">\n\
                    <p class="p-privacidade">Seu perfil em <span class="font-dourada">{{dados.local.nome}}</span> estará visível para quem?</p>\n\
                    <div class="col text-center">\n\
                        <div ng-if="dados.visibilidadeId != 3" style="background-image:url({{dadosUser.usuarioEndereco}})" class="box-img-cad icone-redondo-privacidade-foto">\n\
                        </div>\n\
                        <div ng-if="dados.visibilidadeId == 3" style="margin: auto;background-image: url({{dadosUser.avatarEndereco}})" class="btn-redondo-medio-privacidade-avatar box-img-cad">\n\
                            <button ng-click="editarAvatar()" class="flutuante-btn-medio button">\n\
                                <i class="icon ion-edit"></i>\n\
                            </button>\n\
                        </div>\n\
                        <p ng-if="dados.visibilidadeId != 3" class="p-privacidade-nome">{{dadosUser.usuarioNome}}</p>\n\
                        <p ng-if="dados.visibilidadeId == 3" class="p-privacidade-nome">{{dadosUser.avatarNome}}</p>\n\
                    </div>\n\
                </div>\n\
                <div class="row">\n\
                    <div class="col">\n\
                        <div ng-class="{\'marcado\' : dados.visibilidadeId == 1}"\n\
                        ng-click="dados.visibilidadeId = 1"\n\
                        class="box-img-cad icone-redondo-privacidade">\n\
                            <md-icon class="stilo-icones-privacidade ion-earth"></md-icon>\n\
                        </div>\n\
                        <p ng-class="{\'font-dourada\' : dados.visibilidadeId == 1}" class="p-nome-visibilidade">Qualquer pessoa</p>\n\
                    </div>\n\
                    <div class="col">\n\
                        <div ng-class="{\'marcado\' : dados.visibilidadeId == 2}"\n\
                        ng-click="dados.visibilidadeId = 2"\n\
                        class="box-img-cad icone-redondo-privacidade">\n\
                            <md-icon style="padding-left: 2px;" class="stilo-icones-privacidade ion-person"></md-icon>\n\
                        </div>\n\
                        <p ng-class="{\'font-dourada\' : dados.visibilidadeId == 2}" class="p-nome-visibilidade">Meus seguidores</p>\n\
                    </div>\n\
                    <div class="col">\n\
                        <div ng-class="{\'marcado\' : dados.visibilidadeId == 3}"\n\
                        ng-click="dados.visibilidadeId = 3"\n\
                        class="box-img-cad icone-redondo-privacidade">\n\
                            <md-icon class="stilo-icones-privacidade img-anonimo-privacidade"></md-icon>\n\
                        </div>\n\
                        <p ng-class="{\'font-dourada\' : dados.visibilidadeId == 3}" class="p-nome-visibilidade">Ninguém</p>\n\
                    </div>\n\
                </div>\n\
                <button ng-click="fazerCheckin()" class="btn-grande-privacidade col button button-positive">\n\
                    Ok\n\
                </button>';
    };
  
    return {
        montar: montar
    };
 }]);