'use strict';

angular.module('QuickPeek.HTML.Respostas', [
])

.factory('RespostasHtml', [ function() {
       
    function montar() {
            return '<div style="position:absolute !important" class="row bar bar-header bar-positive remove-padding" ng-if="!cameraFull && !cameraPrev.tirouFoto">\n\
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
                    '+conversa()+exibirMidia();
    };
    
    function exibirMidia(){
        return'<div class="col remove-padding corpoExibirMidia" ng-if="cameraPrev.tirouFoto">\n\
                    <div class="rb-padding-padrao" style="padding-left: 0;padding-top: 20px;">\n\
                        <button ng-click="cameraPrev.tirouFoto = false" class="btn-zoom-tirou button-clear button button-positive">\n\
                            <i class="icon ion-android-close"></i>\n\
                        </button>\n\
                    </div>\n\
                    <div style="padding:10px">\n\
                        <div class="container-img-prev"\n\
                        style="background-size: contain;\n\
                        background-repeat: no-repeat;\n\
                        height:{{larguraBody}}px;\n\
                        position:relative;\n\
                        background-position: center;\n\
                        width:100%;\n\
                        background-image:url({{cameraPrev.urlImg}})">\n\
                        </div>\n\
                    </div>\n\
                    <button ng-if="!sumirBtn" ng-click="enviarMidia(cameraPrev.urlImg)" class="ion-android-send btn-rodape btn-redondo-dourado button button-positive">\n\
                    </button>\n\
                </div>';
    }
    
    function subMenu(){
         return'<div ng-if="previewAberto" style="position:relative;background-color:transparent;text-align: center;padding: 15px;">\n\
                    <button style="z-index: -3;" ng-if="!cameraPrev.tirouFoto" ng-click="cameraPrev.tirarFoto()" class="btn-rodape btn-redondo button button-clear">\n\
                    </button>\n\
                    <!--<button ng-if="cameraPrev.tirouFoto" ng-click="cameraPrev.tirarDeNovo()" class="btn-rodape ion-android-send button button-clear">\n\
                    </button>-->\n\
                    <button style="z-index: -3;" ng-click="girarcamera($event)" class="btn-float-righ-preview btn-rodape button-clear button button-positive">\n\
                        <i class="icon img-inverte-camera-preview"></i>\n\
                    </button>\n\
                </div>\n\
                <div ng-if="exibirBarra == true && !exibirGifs" class="row container-barra-sub-menu">\n\
                    <div class="col">\n\
                        <div class="organiza-margin-chat col-bottom remove-padding">\n\
                            <button ng-click="voltarTeclado()" class="btn-chat-pub button button-clear button-positive">\n\
                                <md-icon class="img-teclado"></md-icon>\n\
                            </button>\n\
                        </div>\n\
                    </div>\n\
                    <div class="col">\n\
                        <div class="organiza-margin-chat col-bottom remove-padding">\n\
                            <button ng-class="{selecionado:previewAberto && !mostrarGaleria}" ng-click="abrirCamera()" class="btn-chat-pub ion-android-camera button button-clear button-positive">\n\
                            </button>\n\
                        </div>\n\
                    </div>\n\
                    <div class="col">\n\
                        <div class="organiza-margin-chat col-bottom remove-padding">\n\
                            <button ng-class="{selecionado: mostrarGaleria}" ng-click="getImgs()" class="btn-chat-pub ion-android-image button button-clear button-positive">\n\
                            </button>\n\
                        </div>\n\
                    </div>\n\
                    <div class="col">\n\
                        <div class="organiza-margin-chat col-bottom remove-padding">\n\
                            <button ng-click="abrirGifs();" class="btn-chat-pub button button-clear button-positive">\n\
                                <md-icon class="img-gif"></md-icon>\n\
                            </button>\n\
                        </div>\n\
                    </div>'+galeria()+'\n\
                </div>';
    }
    
    function conversa(){
        return'<ion-content id="container-respostas" class="container-chat-geral" style="position:relative;height:{{(alturaBody - alturaChat)}}px;padding-top:60px !important">\n\
                    <div class="container-centro" style="width:{{larguraBody}}px">\n\
                        <div class="remove-padding container-dialogo row" style="margin-bottom: 20px;">\n\
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
                                        <div ng-click="exibirMidiaChat(resposta.enderecoMidia)" ng-if="resposta.enderecoMidia" class="container-midia-resposta" \n\
                                        style="background-image:url({{resposta.enderecoMidia}})">\n\
                                        </div>\n\
                                    </div>\n\
                                </div>\n\
                                <div class="container-img-resposta text-right remove-padding">\n\
                                    <div class="chat img-circular-grande margin-img"\n\
                                    style="background-image:url({{resposta.enderecoUsuario}})"></div>\n\
                                </div>\n\
                            </div>\n\
                        </div>\n\
                        <div ng-if="divBranco == true" style="height:{{alturaEspacoGif}}px;width:100%"></div>\n\
                    </div>\n\
                </ion-content>\n\
                <div style="background-size: contain;height:{{cameraPrev.containerImgAltura}}px;position:relative" ng-if="previewAberto" class="espaco-camera">\n\
                    <button ng-if="!cameraFull" ng-click="cameraPrev.iniciarCameraFull($event)" class="btn-zoom button-clear button button-positive">\n\
                        <i class="icon ion-android-expand"></i>\n\
                    </button>\n\
                    <button ng-if="cameraFull" ng-click="cameraPrev.resetarCamera()" class="btn-zoom button-clear button button-positive">\n\
                        <i class="icon ion-android-close"></i>\n\
                    </button>\n\
                </div>\n\
                '+input()+containerGif();
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
                    <div ng-if="!previewAberto && !exibirBarra" class="row remove-padding container-componentes">\n\
                        <div class="organiza-margin-chat col-bottom remove-padding">\n\
                            <button ng-click="abrirBarraTools()" class="btn-chat-pub ion-plus-round button button-clear button-positive">\n\
                            </button>\n\
                        </div>\n\
                        <div class="container-text-area">\n\
                            <textarea\n\
                            class="text-area-chat"\n\
                            ng-model="dados.resposta"\n\
                            rows="1" id="txtChat"\n\
                            ng-keyup="digitando();showEmoticons($event)"\n\
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
    
    function galeria(){
         return'<div ng-if="mostrarGaleria" ng-class="{\'z-index-alto\' : galeriaFull}"\n\
                style="z-index:-1;height:{{alturaTela}}px" class="tela-galeria">\n\
                    <div ng-if="galeriaFull" style="padding-top: 8px !important;box-shadow: 0px -2px 8px black !important;" class="row bar bar-header bar-positive">\n\
                        <div class="col remove-padding" style="text-align: left">\n\
                            <button style="margin-top: 8px;" ng-click="minimizaGaleria()" class="btnbarra-galeria btn-txt-direita button button-clear">\n\
                                <i class="icon ion-android-close seta-barra"></i>Galeria\n\
                            </button>\n\
                        </div>\n\
                    </div>\n\
                    <div class="container-glr" style="height:{{alturaGaleria}}px">\n\
                        <div ng-class="{\'padding-top-midias\' : $index == 0 && galeriaFull}"\n\
                        ng-repeat="linha in objimg" class="row" style="padding-bottom:0 !important">\n\
                            <div ng-repeat="img in linha" class="col box-img-glr"\n\
                            ng-click="selecionarMidia(img.photoURL)"\n\
                            ng-class="{\'addFt\' : img.exibirCamera,\n\
                            \'borda-dourada-glr\' : img.selecionado}"\n\
                            style="background-image:url({{img.thumbnailURL}})">\n\
                            </div>\n\
                        </div>\n\
                    </div>\n\
                </div>';
    }
    
    function containerGif(){
         return'<div class="pai-gifs" ng-if="exibirGifs">\n\
                    <div style="width:{{larguraBody}}px;overflow:auto">\n\
                        <div class="linha-gifs row">\n\
                            <div ng-click="enviarGif(gif)" ng-repeat="gif in gifs" class="container-gif" style="background-image:url({{gif}})"></div>\n\
                       </div>\n\
                    </div>\n\
                    <div>\n\
                        <div class="container-input-gif">\n\
                            <div class="box-input-gif row remove-padding">\n\
                                <button style="margin-top: 6px;color: #949292;" ng-click="selecionarTecladoGif()" class="btn-txt-direita button button-clear">\n\
                                    <i class="icon ion-android-arrow-back seta-barra"></i>\n\
                                </button>\n\
                                <input style="border:none"\n\
                                ng-keyup="buscarGif()"\n\
                                class="text-area-chat"\n\
                                ng-model="dados.gifSearch"\n\
                                placeholder="Pesquisar gif...">\n\
                            </div>\n\
                        </div>\n\
                    </div>\n\
                </div>';
    }
  
    return {
        montar: montar
    };
 }]);



