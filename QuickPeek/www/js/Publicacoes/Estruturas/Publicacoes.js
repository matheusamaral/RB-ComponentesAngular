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
                <div class="col altura-barra-padding remove-padding" style="padding-top:65px !important">\n\
                    <p class="p-normal-publicacoes">Como está <span class="font-dourada">{{local.dados.localNome}}</span> agora?</p>\n\
                    <p ng-click="fazerCheckin()" class="p-sublinhado">Alterar localização</p>\n\
                </div>\n\
                <div ng-init="$index == objHash.length - 1 ? importancia = \'!important\' : important = \'\'" style="margin-bottom:{{alturaChatPub+120}}px {{importancia}}"\n\
                ng-if="!hashClicada" \n\
                class="margin-top-pub row"\n\
                ng-repeat="categorias in objHash"\n\
                ng-class="{\'margin-bottom-comum-pub\' : $index != objHash.length - 1}">\n\
                    <div ng-repeat="categoria in categorias" class="col">\n\
                        <div ng-click="escolherHash(categoria)"\n\
                        style="background-image:url({{categoria.endereco}})"\n\
                        class="container-categorias-pub">\n\
                        </div>\n\
                        <p class="p-nome-visibilidade">{{categoria.titulo}}</p>\n\
                    </div>\n\
                </div>\n\
                <div ng-if="hashClicada" style="margin-bottom:{{alturaChatPub+20}}px !important" class="margin-top-pub row container-painel-hashtags">\n\
                    <div class="col remove-padding painel-hashtags">\n\
                        <div class="row">\n\
                            <div class="col">\n\
                                <button ng-click="voltarCategorias()" class="btn-painel-pub row ion-android-arrow-back button button-clear button-positive">\n\
                                    {{categoriaSelecionada.titulo}}\n\
                                </button>\n\
                            </div>\n\
                            <div class="">\n\
                                <div\n\
                                style="box-shadow: 1px 2px 8px #EDECEC;background-image:url({{categoriaSelecionada.endereco}})"\n\
                                class="container-hash-pubs-img">\n\
                                </div>\n\
                            </div>\n\
                        </div>\n\
                        <div class="row" id="chips-iniciais">\n\
                            <md-chips ng-model="categoriaHashtags" readonly="true"\n\
                            md-removable="false">\n\
                                <md-chip-template ng-class="{\'fundo-dourado\' : $chip.selecionado}" ng-click="addHash($chip)">\n\
                                    <strong>#{{$chip.titulo}}</strong>\n\
                                </md-chip-template>\n\
                            </md-chips>\n\
                        </div>\n\
                    </div>\n\
                </div>\n\
                <div class="container-chat-pub" id="container-chat">\n\
                    <div class="row chat-pub">\n\
                        <div class="col container-chips-txt">\n\
                            <md-chips id="chips-finais" \n\
                            placeholder="Insira suas hashtags" \n\
                            ng-model="dados.tituloChip" \n\
                            readonly="false"\n\
                            md-separator-keys="keyCodes"\n\
                            ng-keyup="gerarHashtag($chip)"\n\
                            md-removable="true"\n\
                            md-on-remove="removerChip($chip)"\n\
                            md-on-add="addHashDigitando($chip)">\n\
                                <md-chip-template class="row">\n\
                                    <div\n\
                                    ng-class="{\'borda-dourada-pub\' : $chip.bordaDourada == true}"\n\
                                    class="img-chip" \n\
                                    style="background-image:url({{$chip.endereco}})">\n\
                                    </div>\n\
                                    <strong class="chip-strong">#{{$chip.titulo}}</strong>\n\
                                </md-chip-template>\n\
                            </md-chips>\n\
                        </div>\n\
                        <div class="col-bottom remove-padding">\n\
                            <button style="margin-bottom: 9px;" ng-click="getImgs()" class="btn-chat-pub ion-android-camera button button-clear button-positive">\n\
                                <span ng-if="dados.arquivoBase64.length > 0" class="cont-midias">{{dados.arquivoBase64.length}}</span>\n\
                            </button>\n\
                        </div>\n\
                        <div class="col-bottom remove-padding">\n\
                            <button style="margin-bottom: 9px;" ng-click="publicar()" class="btn-chat-pub ion-android-send button button-clear button-positive">\n\
                            </button>\n\
                        </div>\n\
                    </div>\n\
                </div>'+galeria();
    };
    
    function galeria(){
         return'<div ng-if="mostrarGaleria"\n\
                style="height:{{alturaTela}}px" class="tela-galeria">\n\
                    <div style="box-shadow: 0px -2px 8px black !important;" class="row bar bar-header bar-positive">\n\
                        <div class="col remove-padding">\n\
                            <button ng-click="fecharGaleria()" class="btn-txt-direita button button-clear">\n\
                                <i class="icon ion-android-arrow-back seta-barra"></i>Galeria\n\
                            </button>\n\
                        </div>\n\
                        <div class="col remove-padding text-right">\n\
                            <button ng-disabled="dados.midiasSelecionadas.length < 1" ng-click="selecionarImgs()" class="btn-txt-direita button button-clear">\n\
                                Concluir\n\
                            </button>\n\
                        </div>\n\
                    </div>\n\
                    <div class="container-glr" style="height:{{alturaTela}}px">\n\
                        <div ng-class="{\'padding-top-midias\' : $index == 0}"\n\
                        ng-repeat="linha in objimg" class="row" style="padding-bottom:0 !important">\n\
                            <div ng-repeat="img in linha" class="col box-img-glr"\n\
                            ng-click="addMidia(img,$event,$index)"\n\
                            ng-class="{\'addFt\' : img.exibirCamera,\n\
                            \'borda-dourada-glr\' : img.selecionado}"\n\
                            style="background-image:url({{img.photoURL}})">\n\
                                <div\n\
                                ng-if="img.selecionado" class="btn-deselecionar">\n\
                                    <md-icon class="ion-android-close"></md-icon>\n\
                                </div>\n\
                                <md-icon ng-if="img.exibirCamera"  class="ion-android-camera"></md-icon>\n\
                            </div>\n\
                        </div>\n\
                    </div>\n\
                </div>';
    }
  
    return {
        montar: montar
    };
 }]);
