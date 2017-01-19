'use strict';

angular.module('QuickPeek.HTML.Respostas', [
])

.factory('RespostasHtml', [ function() {
       
    function montar() {
        return '<div style="padding-top: 6px !important;" class="row bar bar-header bar-positive remove-padding">\n\
                    <div class="row remove-padding">\n\
                        <button ng-click="perguntar()" class="margin-img btn-respostas-voltar btn-txt-direita button button-clear">\n\
                            <i class="icon ion-android-arrow-back seta-barra"></i>\n\
                        </button>\n\
                        <div class="img-circular-grande margin-img"\n\
                        style="background-image:url({{dados.pergunta.enderecoUsuario}})"></div>\n\
                        <div class="col remove-padding" style="margin-left: 10px;">\n\
                            <p ng-if="dadosUser.usuarioId != dados.pergunta.usuarioId" class="negrito ptitular-pergunta">{{dados.pergunta.nomeUsuario}}</p>\n\
                            <p ng-if="dadosUser.usuarioId == dados.pergunta.usuarioId" class="negrito ptitular-pergunta">Você</p>\n\
                            <p class="ptitulo-pergunta">{{dados.pergunta.perguntaTitulo}}</p>\n\
                        </div>\n\
                    </div>\n\
                </div>\n\
                '+conversa()+'\n\
                '+input()+'\n\
                <div ng-if="dados.perguntas.length == 0" class="padding-top-bloqueados row padding-padrao-contas">\n\
                    <div class="col text-center">\n\
                        <i class="icone-padrao icon ion-alert-circled"></i>\n\
                        <p style="color:#b0b0b0">Nenhuma pergunta no local, ainda...</p>\n\
                    </div>\n\
                </div>';
    };   
    
    function conversa(){
        return'<div class="container-chat-geral" style="height:{{(alturaBody - alturaChat)}}px;padding-top:60px !important">\n\
                    <div class="container-centro" style="width:{{larguraBody}}px">\n\
                        <div class="remove-padding container-dialogo row" style="margin-bottom: 20px !important;">\n\
                            <div class="balao-direita">\n\
                                <div class="container-textos">\n\
                                    <div class="row remove-padding">\n\
                                        <div class="col resp-momento remove-padding">12:30</div>\n\
                                        <div class="col remetente remove-padding">{{dados.pergunta.nomeUsuario}}</div>\n\
                                    </div>\n\
                                    <div class="container-resposta">\n\
                                        {{dados.pergunta.perguntaTitulo}}\n\
                                    </div>\n\
                                </div>\n\
                                <div class="container-img-resposta text-right remove-padding">\n\
                                    <div class="chat img-circular-grande margin-img"\n\
                                    style="background-image:url({{dados.pergunta.enderecoUsuario}})"></div>\n\
                                </div>\n\
                            </div>\n\
                        </div>\n\
                        <div ng-repeat="resposta in dados.respostas" class="remove-padding container-dialogo row" style="margin-bottom: 20px !important;">\n\
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
                    </div>\n\
                </div>';
    }
    
    function input(){
        return'<div class="container-chat" id="container-input">\n\
                    <div class="row container-digitando">\n\
                        <div class="img-circular-digitando"\n\
                        style="background-image:url(https://scontent-grt2-1.xx.fbcdn.net/v/t1.0-9/14721744_878452505622443_4877487745632870256_n.jpg?oh=2235b44e1f04e735036274b43b6f2056&oe=58D60A46)"></div>\n\
                        <div class="container-digitando-bolas loader-inner ball-pulse">\n\
                            <div class="bola-digitando"></div>\n\
                            <div class="bola-digitando"></div>\n\
                            <div class="bola-digitando"></div>\n\
                        </div>\n\
                    </div>\n\
                    <div class="row remove-padding container-componentes">\n\
                        <div class="col-bottom remove-padding">\n\
                            <button ng-click="publicar()" class="btn-chat-pub ion-android-happy button button-clear button-positive">\n\
                            </button>\n\
                        </div>\n\
                        <div class="container-text-area">\n\
                            <textarea ng-click="setarCursorInicio()"\n\
                            class="text-area-chat"\n\
                            ng-model="dados.resposta"\n\
                            rows="1" id="txtChat"\n\
                            placeholder="Digite alguma coisa">\n\
                            </textarea>\n\
                        </div>\n\
                        <div class="col-bottom remove-padding">\n\
                            <button class="btn-chat-pub ion-android-camera button button-clear button-positive">\n\
                            </button>\n\
                        </div>\n\
                        <div class="col-bottom remove-padding">\n\
                            <button ng-click="responder()" class="btn-chat-pub ion-android-send button button-clear button-positive">\n\
                            </button>\n\
                        </div>\n\
                    </div>\n\
                </div>';
    }
  
    return {
        montar: montar
    };
 }]);



