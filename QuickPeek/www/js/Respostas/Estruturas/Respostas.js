'use strict';

angular.module('QuickPeek.HTML.Respostas', [
])

.factory('RespostasHtml', [ function() {
       
    function montar() {
        return '<div class="row bar bar-header bar-positive remove-padding">\n\
                        <div class="row remove-padding">\n\
                            <button ng-click="voltarPerguntas()" class="margin-img btn-respostas-voltar btn-txt-direita button button-clear">\n\
                                <i class="icon ion-android-arrow-back seta-barra"></i>\n\
                            </button>\n\
                            <div class="img-circular-grande  margin-img"\n\
                            style="background-image:url({{dados.pergunta.enderecoUsuario}})"></div>\n\
                            <div class="col remove-padding" style="margin-left: 10px;">\n\
                                <p ng-if="dadosUser.usuarioId != dados.pergunta.usuarioId" class="negrito ptitular-pergunta">{{dados.pergunta.nomeUsuario}}</p>\n\
                                <p ng-if="dadosUser.usuarioId == dados.pergunta.usuarioId" class="negrito ptitular-pergunta">Você</p>\n\
                                <p class="ptitulo-pergunta">{{dados.pergunta.perguntaTitulo}}</p>\n\
                            </div>\n\
                            <div class="text-right">\n\
                                <md-menu>\n\
                                    <md-button style="margin-top: 9px;" class="md-icon-button" ng-click="$mdOpenMenu($event)">\n\
                                        <md-icon style="color:#FFFFFF !important" class="icone-tamanho-personalizado ion-android-more-vertical"></md-icon>\n\
                                    </md-button>\n\
                                    <md-menu-content width="4">\n\
                                        <md-menu-item>\n\
                                            <md-button ng-click="attPrivacidade()">\n\
                                                Alterar privacidade\n\
                                            </md-button>\n\
                                        </md-menu-item>\n\
                                    </md-menu-content>\n\
                                </md-menu>\n\
                            </div>\n\
                        </div>\n\
                    </div>\n\
                    '+conversa();
    };  
    
    function subMenu(){
         return'<div ng-if="previewAberto" style="position:relative;background-color:transparent;text-align: center;padding: 15px;">\n\
                    <button ng-click="tirarFoto($event)" class="btn-rodape btn-redondo button button-clear">\n\
                    </button>\n\
                    <button ng-click="girarcamera($event)" class="btn-float-righ-preview btn-rodape button-clear button button-positive">\n\
                        <i class="icon img-inverte-camera-preview"></i>\n\
                    </button>\n\
                </div>\n\
                <div class="row container-barra-sub-menu">\n\
                    <div class="col">\n\
                        <div class="organiza-margin-chat col-bottom remove-padding">\n\
                            <button ng-click="" class="btn-chat-pub ion-android-drafts button button-clear button-positive">\n\
                            </button>\n\
                        </div>\n\
                    </div>\n\
                    <div class="col">\n\
                        <div class="organiza-margin-chat col-bottom remove-padding">\n\
                            <button ng-class="{selecionado:previewAberto}" ng-click="abrirCamera()" class="btn-chat-pub ion-android-camera button button-clear button-positive">\n\
                            </button>\n\
                        </div>\n\
                    </div>\n\
                    <div class="col">\n\
                        <div class="organiza-margin-chat col-bottom remove-padding">\n\
                            <button ng-click="" class="btn-chat-pub ion-android-image button button-clear button-positive">\n\
                            </button>\n\
                        </div>\n\
                    </div>\n\
                    <div class="col">\n\
                        <div class="organiza-margin-chat col-bottom remove-padding">\n\
                            <button ng-click="" class="btn-chat-pub ion-android-image button button-clear button-positive">\n\
                            </button>\n\
                        </div>\n\
                    </div>\n\
                </div>';
    }
    
    function conversa(){
        return'<ion-content id="container-respostas" class="container-chat-geral" style="position:relative;height:{{(alturaBody - alturaChat)}}px;padding-top:60px !important">\n\
                    <div class="container-centro" style="width:{{larguraBody}}px">\n\
                        <div class="remove-padding container-dialogo row" style="margin-bottom: 20px !important;">\n\
                            <div class="balao-direita">\n\
                                <div class="container-textos">\n\
                                    <div class="row remove-padding">\n\
                                        <div class="col resp-momento remove-padding">12:30</div>\n\
                                        <div class="col remetente remove-padding">{{dados.pergunta.nomeUsuario}}</div>\n\
                                    </div>\n\
                                    <div class="container-resposta">\n\
                                        <span style="color: #ffb800;font-size: 21px;margin-right: 8px;" ng-if="dadosUser.usuarioId == dados.pergunta.usuarioId" ng-click="irDados()" class="ion-android-alert"></span>{{dados.pergunta.perguntaTitulo}}\n\
                                    </div>\n\
                                </div>\n\
                                <div class="container-img-resposta text-right remove-padding">\n\
                                    <div class="chat img-circular-grande margin-img"\n\
                                    style="background-image:url({{dados.pergunta.enderecoUsuario}})"></div>\n\
                                </div>\n\
                            </div>\n\
                        </div>\n\
                        <div ng-repeat="resposta in dados.respostas | orderBy: $index : true" class="remove-padding container-dialogo row" style="margin-bottom: 20px !important;">\n\
                            <div ng-if="dadosUser.usuarioId != resposta.usuarioId" class="balao-esquerda">\n\
                                <div class="container-img-resposta text-right remove-padding">\n\
                                    <div class="chat img-circular-grande margin-img"\n\
                                    style="background-image:url({{resposta.enderecoUsuario}})"></div>\n\
                                </div>\n\
                                <div class="container-textos-esquerda">\n\
                                    <div class="row remove-padding">\n\
                                        <div class="col remetente-esquerda remove-padding">{{resposta.nomeUsuario}}</div>\n\
                                        <div class="col resp-momento-esquerda remove-padding">\n\
                                            {{resposta.momento.split(\' \')[1].split(\':\')[0]}}:\n\
                                            {{resposta.momento.split(\' \')[1].split(\':\')[1]}}\n\
                                        </div>\n\
                                    </div>\n\
                                    <div class="container-resposta">\n\
                                        {{resposta.respostaTitulo}}\n\
                                    </div>\n\
                                </div>\n\
                            </div>\n\
                            <div ng-if="dadosUser.usuarioId == resposta.usuarioId" class="balao-direita">\n\
                                <div class="container-textos">\n\
                                    <div class="row remove-padding">\n\
                                        <div class="col resp-momento remove-padding">\n\
                                            {{resposta.momento.split(\' \')[1].split(\':\')[0]}}:\n\
                                            {{resposta.momento.split(\' \')[1].split(\':\')[1]}}\n\
                                        </div>\n\
                                        <div class="col remetente remove-padding">Você</div>\n\
                                    </div>\n\
                                    <div class="container-resposta">\n\
                                        {{resposta.respostaTitulo}}\n\
                                    </div>\n\
                                </div>\n\
                                <div class="container-img-resposta text-right remove-padding">\n\
                                    <div class="chat img-circular-grande margin-img"\n\
                                    style="background-image:url({{resposta.enderecoUsuario}})"></div>\n\
                                </div>\n\
                            </div>\n\
                        </div>\n\
                        <div ng-if="divBranco == true" style="height:{{alturaChat}}px;width:100%"></div>\n\
                    </div>\n\
                </ion-content>\n\
                <div style="height:{{cameraPrev.containerImgAltura}}px;position:relative" ng-if="previewAberto" class="espaco-camera">\n\
                    <button ng-click="cameraPrev.iniciarCameraFull($event)" class="btn-zoom button-clear button button-positive">\n\
                        <i class="icon ion-android-expand"></i>\n\
                    </button>\n\
                </div>\n\
                '+input();
    }
    
    function input(){
        return'<div class="container-chat" id="container-input">\n\
                    <div class="row container-digitando" \n\
                    ng-if="digitandoObj != false && dadosUser.usuarioId != digitandoObj.idDigitando">\n\
                        <div class="img-circular-digitando"\n\
                        style="background-image:url({{digitandoObj.endereco}})"></div>\n\
                        <div class="container-digitando-bolas loader-inner ball-pulse-sync">\n\
                            <div class="bola-digitando"></div>\n\
                            <div class="bola-digitando"></div>\n\
                            <div class="bola-digitando"></div>\n\
                        </div>\n\
                    </div>\n\
                    <div ng-if="!previewAberto" class="row remove-padding container-componentes">\n\
                        <div class="organiza-margin-chat col-bottom remove-padding">\n\
                            <button ng-click="abrirCamera()" class="btn-chat-pub ion-plus-round button button-clear button-positive">\n\
                            </button>\n\
                        </div>\n\
                        <div class="container-text-area">\n\
                            <textarea\n\
                            class="text-area-chat"\n\
                            ng-model="dados.resposta"\n\
                            rows="1" id="txtChat"\n\
                            ng-keyup="digitando()"\n\
                            placeholder="Digite alguma coisa">\n\
                            </textarea>\n\
                        </div>\n\
                        <div class="organiza-margin-chat col-bottom remove-padding">\n\
                            <button ng-click="addInfinit()" class="btn-chat-pub ion-android-happy button button-clear button-positive">\n\
                            </button>\n\
                        </div>\n\
                        <div class="organiza-margin-chat col-bottom remove-padding">\n\
                            <button ng-click="responder()" class="btn-chat-pub ion-android-send button button-clear button-positive">\n\
                            </button>\n\
                        </div>\n\
                    </div>\n\
                    '+subMenu()+'\n\
                </div>';
    }
  
    return {
        montar: montar
    };
 }]);



