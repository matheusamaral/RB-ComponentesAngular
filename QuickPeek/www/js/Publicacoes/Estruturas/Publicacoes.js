'use strict';

angular.module('QuickPeek.HTML.Publicacoes', [
])

.factory('PublicacoesHtml', [function(){
       
    function montar(){
        return '<div style="box-shadow: 0px -2px 8px black !important;" class="row bar bar-header bar-positive">\n\
                    <div class="col remove-padding">\n\
                        <button ng-click="voltar()" class="btn-txt-direita button button-clear">\n\
                            <i class="icon ion-android-arrow-back seta-barra"></i>Publicar\n\
                        </button>\n\
                    </div>\n\
                    <div class="col remove-padding text-right">\n\
                        <button style="font-size: 8px !important;" ng-click="voltarConfig()" class="btn-txt-direita button button-clear">\n\
                            <i class="icon ion-social-facebook seta-barra"></i>Compartilhar no facebook\n\
                        </button>\n\
                    </div>\n\
                </div>\n\
                <div class="col altura-barra-padding remove-padding">\n\
                    <p class="p-normal-publicacoes">Como está <span class="font-dourada">{{local.dados.localNome}}</span> agora?</p>\n\
                    <p class="p-sublinhado">Alterar localização</p>\n\
                </div>\n\
                <div class="row">\n\
                    <div class="col">\n\
                        <div ng-class="{\'marcado\' : dados.visibilidadeId == 1}"\n\
                        ng-click="dados.visibilidadeId = 1"\n\
                        class="container-categorias-pub icone-redondo-privacidade">\n\
                            <md-icon class="stilo-icones-privacidade ion-earth"></md-icon>\n\
                        </div>\n\
                        <p ng-class="{\'font-dourada\' : dados.visibilidadeId == 1}" class="p-nome-visibilidade">Qualquer pessoa</p>\n\
                    </div>\n\
                    <div class="col">\n\
                        <div ng-class="{\'marcado\' : dados.visibilidadeId == 2}"\n\
                        ng-click="dados.visibilidadeId = 2"\n\
                        class="container-categorias-pub icone-redondo-privacidade">\n\
                            <md-icon style="padding-left: 2px;" class="stilo-icones-privacidade ion-person"></md-icon>\n\
                        </div>\n\
                        <p ng-class="{\'font-dourada\' : dados.visibilidadeId == 2}" class="p-nome-visibilidade">Meus seguidores</p>\n\
                    </div>\n\
                    <div class="col">\n\
                        <div ng-class="{\'marcado\' : dados.visibilidadeId == 3}"\n\
                        ng-click="dados.visibilidadeId = 3"\n\
                        class="container-categorias-pub icone-redondo-privacidade">\n\
                            <md-icon class="stilo-icones-privacidade img-anonimo-privacidade"></md-icon>\n\
                        </div>\n\
                        <p ng-class="{\'font-dourada\' : dados.visibilidadeId == 3}" class="p-nome-visibilidade">Ninguém</p>\n\
                    </div>\n\
                </div>\n\
                <div class="container-chat-pub">\n\
                    <div class="row chat-pub">\n\
                        <div class="remove-padding col container-hashtags-pub">\n\
                            <p class="titulo-chat-pub">Insira sua hastags</p>\n\
                        </div>\n\
                        <div class="remove-padding">\n\
                            <button class="btn-chat-pub ion-android-camera button button-clear button-positive">\n\
                            </button>\n\
                        </div>\n\
                        <div class="remove-padding">\n\
                            <button class="btn-chat-pub ion-android-send button button-clear button-positive">\n\
                            </button>\n\
                        </div>\n\
                    </div>\n\
                </div>';
    };
  
    return {
        montar: montar
    };
 }]);