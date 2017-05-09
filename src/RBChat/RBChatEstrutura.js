'use strict';

angular.module('RB.ChatEstrutura',[
])

.factory('RBChatEstrutura', ['VP','$timeout','RBLoadingMobile',
    function (VP,$timeout,RBLoadingMobile) {
        
        var scope;
        function setScope(obj){
            scope = obj;
            return this;
        };
        
        function montar(){
            return '<button ng-if="rbChat.abaSelecionada == 1 && rbChat.camFull" ng-click="rbChat.resetarCamera()" \n\
                    class="btn-zoom button-clear button button-positive"\n\
                    style="border-radius: 20px!important;box-shadow: 1px 3px 8px #605f5f;\n\
                    min-width: 40px;height: 40px!important;min-height: 35px;">\n\
                        <i class="icon ion-android-close"></i>\n\
                    </button>\n\
                    <div style="position:fixed !important" class="row bar bar-header bar-positive remove-padding" \n\
                    ng-if="!rbChat.camFull && !rbChat.tirouFoto">\n\
                        <div class="row remove-padding">\n\
                            <button style="margin-top: 13px;" ng-click="rbChat.voltar()" \n\
                            class="margin-img btn-respostas-voltar btn-txt-direita button button-clear">\n\
                                <i class="icon ion-android-arrow-back seta-barra"></i>\n\
                            </button>\n\
                            <div ng-if="!rbChat.dadosConversa" class="img-circular-grande  margin-img"\n\
                            ng-class="{\'img-pessoa-padrao\' : !rbChat.pergunta.enderecoUsuario}"\n\
                            style="background-image:url({{alteraNome(rbChat.pergunta.enderecoUsuario)}})"></div>\n\
                            <div ng-if="!rbChat.dadosConversa" class="col remove-padding" style="margin-left: 10px;width: 100px;">\n\
                                <p style="margin-top: 14px;" ng-if="dadosUser.usuarioId != rbChat.pergunta.usuarioId" class="negrito ptitular-pergunta">{{rbChat.pergunta.nomeUsuario}}</p>\n\
                                <p style="margin-top: 14px;" ng-if="dadosUser.usuarioId == rbChat.pergunta.usuarioId" class="negrito ptitular-pergunta">Você</p>\n\
                                <p class="ptitulo-pergunta">{{rbChat.pergunta.perguntaTitulo}}</p>\n\
                            </div>\n\
                            <div ng-if="rbChat.dadosConversa" class="img-circular-grande  margin-img"\n\
                            ng-class="{\'img-pessoa-padrao\' : !rbChat.dadosConversa.endereco}"\n\
                            style="background-image:url({{alteraNome(rbChat.dadosConversa.endereco)}})"></div>\n\
                            <div ng-if="rbChat.dadosConversa" class="col remove-padding" style="margin-left: 10px;width: 100px;">\n\
                                <p style="margin-top: 14px;" class="negrito ptitular-pergunta">{{rbChat.dadosConversa.nome}}</p>\n\
                                <p ng-if="rbChat.userOnline" class="ptitulo-pergunta">Online</p>\n\
                                <p ng-if="!rbChat.userOnline" class="ptitulo-pergunta">Offline</p>\n\
                            </div>\n\
                            <div class="text-right">\n\
                                <md-menu>\n\
                                    <md-button style="margin-top: 9px;" class="md-icon-button" ng-click="$mdOpenMenu($event);">\n\
                                        <md-icon style="color:#FFFFFF !important" class="icone-tamanho-personalizado ion-android-more-vertical"></md-icon>\n\
                                    </md-button>\n\
                                    <md-menu-content width="4">\n\
                                        <md-menu-item ng-if="!rbChat.dadosConversa">\n\
                                            <md-button ng-click="rbChat.attPrivacidade(rbChat.pergunta.perguntaId)">\n\
                                                Alterar privacidade\n\
                                            </md-button>\n\
                                        </md-menu-item>\n\
                                        <md-menu-item ng-if="rbChat.dadosConversa && rbChat.dadosConversa.bloqueado != 1">\n\
                                            <md-button ng-click="rbChat.bloquearUser()">\n\
                                                Bloquear usuário\n\
                                            </md-button>\n\
                                        </md-menu-item>\n\
                                        <md-menu-item ng-if="rbChat.dadosConversa && rbChat.dadosConversa.bloqueado == 1">\n\
                                            <md-button ng-click="rbChat.desbloquearUser()">\n\
                                                Desbloquear usuário\n\
                                            </md-button>\n\
                                        </md-menu-item>\n\
                                    </md-menu-content>\n\
                                </md-menu>\n\
                            </div>\n\
                        </div>\n\
                    </div>\n\
                    <div ng-if="!rbChat.camFull" style="height:{{alturaBody - rbChat.empurraChat}}px" \n\
                    class="corpo-esconde-fundo"></div>\n\
                    '+conversa()+exibirMidia();
    };
    
    function exibirMidia(){
        return'<div class="col remove-padding corpoExibirMidia" \n\
                ng-if="rbChat.tirouFoto">\n\
                    <div class="rb-padding-padrao" style="padding-left: 0;padding-top: 20px;">\n\
                        <button ng-click="rbChat.fecharExibirMidia()" class="btn-zoom-tirou button-clear button button-positive">\n\
                            <i class="icon ion-android-close"></i>\n\
                        </button>\n\
                    </div>\n\
                    <div ng-if="cameraPrev.novaFoto" style="padding:10px">\n\
                        <div class="container-img-prev"\n\
                        style="background-size: {{backgroudImg}};\n\
                        background-repeat: no-repeat;\n\
                        height:{{imgPrevLargura}}px;\n\
                        position:relative;\n\
                        background-position: 0px -{{imgPrevY}}px;\n\
                        width:{{imgPrevLargura}}px;\n\
                        margin: auto;\n\
                        max-width: 100%;\n\
                        background-image:url({{rbChat.tirouFoto}})">\n\
                        </div>\n\
                    </div>\n\
                    <div ng-if="!cameraPrev.novaFoto && rbChat.acabouDeTirarFotoQuadrada"\n\
                    style="height:{{larguraBody}}px;padding:10px">\n\
                        <div class="div-img-acabou-de-tirar container-img-prev"\n\
                        style="background-size: {{larguraBody}}px;\n\
                        background-image:url({{rbChat.tirouFoto}})">\n\
                        </div>\n\
                    </div>\n\
                    <div ng-if="!cameraPrev.novaFoto && !rbChat.acabouDeTirarFotoQuadrada" style="padding:10px">\n\
                        <div class="container-img-prev"\n\
                        style="background-size: contain;\n\
                        background-repeat: no-repeat;\n\
                        height:{{larguraBody}}px;\n\
                        position:relative;\n\
                        background-position: center;\n\
                        width:100%;\n\
                        background-image:url({{rbChat.tirouFoto}})">\n\
                        </div>\n\
                    </div>\n\
                    <button ng-if="!rbChat.sumirBtn"\n\
                    data-tap-disabled="true"\n\
                    ng-click="rbChat.enviarMidia(rbChat.tirouFoto)"\n\
                    class="ion-android-send btn-rodape btn-redondo-dourado button button-positive">\n\
                    </button>\n\
                </div>';
    }
    
    function subMenu(){
         return'<div ng-if="rbChat.abaSelecionada == 1 && !rbChat.tirouFoto"\n\
                ng-class="{\'btns-can-full\' : rbChat.camFull,\n\
                isIos : !platformAndroid,\n\
                \'orienta-btns-cam-full-ios\' : !platformAndroid && rbChat.camFull}"\n\
                class="btns-cam aberto"\n\
                style="position:relative;background-color:transparent;text-align: center;padding: 15px;">\n\
                    <button style="z-index: -3;" ng-if="!cameraPrev.tirouFoto" \n\
                    ng-click="rbChat.tirarFoto()"\n\
                    data-tap-disabled="true"\n\
                    class="btn-rodape btn-redondo button button-clear">\n\
                    </button>\n\
                    <!--<button ng-if="cameraPrev.tirouFoto" ng-click="cameraPrev.tirarDeNovo()" class="btn-rodape ion-android-send button button-clear">\n\
                    </button>-->\n\
                    <button style="z-index: -3;box-shadow: 1px 3px 8px #605f5f;border-radius: 20px!important;\n\
                    min-width: 40px;height: 40px!important;min-height: 35px;"\n\
                    ng-click="rbChat.girarcamera()"\n\
                    data-tap-disabled="true"\n\
                    class="btn-float-righ-preview btn-rodape button-clear button button-positive">\n\
                        <i ng-class="{isIos : !platformAndroid}" class="icon img-inverte-camera-preview"></i>\n\
                    </button>\n\
                    <button ng-if="!platformAndroid && rbChat.abaSelecionada == 1 && !rbChat.camFull" \n\
                    ng-click="rbChat.cameraFull()"\n\
                    data-tap-disabled="true"\n\
                    style="top:-{{rbChat.empurraChat - 170}}px !important;box-shadow: 1px 3px 8px #605f5f;border-radius: 20px!important;\n\
                    min-width: 40px;height: 40px;min-height: 35px;"\n\
                    class="btn-zoom button-clear button button-positive">\n\
                        <i class="icon ion-android-expand"></i>\n\
                    </button>\n\
                </div>\n\
                <div class="pai-barra-menu" ng-if="rbChat.menuAberto && !rbChat.camFull">\n\
                    <div class="row container-barra-sub-menu">\n\
                        <div class="col">\n\
                            <div class="organiza-margin-chat col-bottom remove-padding">\n\
                                <button ng-disabled="!rbChat.liberaBtns" ng-click="rbChat.voltarTeclado(0)" \n\
                                class="btn-chat-pub button button-clear button-positive"\n\
                                data-tap-disabled="true">\n\
                                    <md-icon class="img-teclado"></md-icon>\n\
                                </button>\n\
                            </div>\n\
                        </div>\n\
                        <div class="col">\n\
                            <div class="organiza-margin-chat col-bottom remove-padding">\n\
                                <button ng-class="{selecionado:rbChat.abaSelecionada == 1}" \n\
                                ng-click="rbChat.abrirCamBtn(1)"\n\
                                data-tap-disabled="true"\n\
                                class="btn-chat-pub ion-android-camera button button-clear button-positive">\n\
                                </button>\n\
                            </div>\n\
                        </div>\n\
                        <div class="col">\n\
                            <div class="organiza-margin-chat col-bottom remove-padding">\n\
                                <button ng-disabled="!rbChat.liberaBtns"\n\
                                ng-class="{selecionado: rbChat.abaSelecionada == 2}" \n\
                                ng-click="rbChat.abrirGlr(2,$event);"\n\
                                data-tap-disabled="true"\n\
                                class="btn-chat-pub ion-android-image button button-clear button-positive">\n\
                                </button>\n\
                            </div>\n\
                        </div>\n\
                        <div class="col">\n\
                            <div class="organiza-margin-chat col-bottom remove-padding">\n\
                                <button ng-disabled="!rbChat.liberaBtns"\n\
                                data-tap-disabled="true"\n\
                                ng-click="rbChat.abrirGifs(3,$event);" \n\
                                class="btn-chat-pub button button-clear button-positive">\n\
                                    <md-icon class="img-gif"></md-icon>\n\
                                </button>\n\
                            </div>\n\
                        </div>\n\
                    </div>\n\
                </div>';
    }
    
    function conversa(){
        return'<div id="container-respostas" class="container-chat-geral" \n\
                style="position:relative;\n\
                padding-top:60px" ng-class="{\'remove-padding-top\' : !platformAndroid && rbChat.camFull}">\n\
                    <ion-scroll id="container-infinit" \n\
                    class="efeitoChat container-centro" \n\
                    delegate-handle="mainScroll"\n\
                    style="height:{{(alturaBody - 75 - rbChat.empurraChat)}}px;width:{{larguraBody}}px">\n\
                        <div ng-class="{\'esconde-itens-ios\' : rbChat.camFull && !platformAndroid}">\n\
                            <div ng-if="rbChat.pergunta" class="remove-padding container-dialogo row" style="padding-bottom: 20px !important;">\n\
                                <div ng-if="dadosUser.usuarioId == rbChat.pergunta.usuarioId" class="balao-direita">\n\
                                    <div class="container-textos">\n\
                                        <div class="row remove-padding">\n\
                                            <div class="col resp-momento remove-padding">12:30</div>\n\
                                            <div class="col remetente remove-padding">{{rbChat.pergunta.nomeUsuario}}</div>\n\
                                        </div>\n\
                                        <div class="container-resposta">\n\
                                            <span style="color: #ffb800;font-size: 21px;margin-right: 8px;" ng-if="dadosUser.usuarioId == rbChat.pergunta.usuarioId" ng-click="irDados()" class="ion-android-alert"></span>{{rbChat.pergunta.perguntaTitulo}}\n\
                                        </div>\n\
                                    </div>\n\
                                    <div class="container-img-resposta text-right remove-padding">\n\
                                        <div class="chat img-circular-grande margin-img"\n\
                                        ng-class="{\'img-pessoa-padrao\' : !rbChat.pergunta.enderecoUsuario}"\n\
                                        style="background-image:url({{alteraNome(rbChat.pergunta.enderecoUsuario)}})"></div>\n\
                                    </div>\n\
                                </div>\n\
                                <div ng-if="dadosUser.usuarioId != rbChat.pergunta.usuarioId" class="balao-esquerda">\n\
                                    <div class="container-img-resposta text-right remove-padding">\n\
                                        <div class="chat img-circular-grande margin-img"\n\
                                        ng-class="{\'img-pessoa-padrao\' : !rbChat.pergunta.enderecoUsuario}"\n\
                                        style="background-image:url({{alteraNome(rbChat.pergunta.enderecoUsuario)}})"></div>\n\
                                    </div>\n\
                                    <div class="container-textos-esquerda">\n\
                                        <div class="row remove-padding">\n\
                                            <div class="col remetente remove-padding">{{rbChat.pergunta.nomeUsuario}}</div>\n\
                                            <div class="col resp-momento remove-padding">12:30</div>\n\
                                        </div>\n\
                                        <div class="container-resposta">\n\
                                            <span style="color: #ffb800;font-size: 21px;margin-right: 8px;" ng-if="dadosUser.usuarioId == rbChat.pergunta.usuarioId" ng-click="irDados()" class="ion-android-alert"></span>{{rbChat.pergunta.perguntaTitulo}}\n\
                                        </div>\n\
                                    </div>\n\
                                </div>\n\
                            </div>\n\
                            <div ng-repeat="resposta in rbChat.respostas | orderBy: $index : true" \n\
                            class="remove-padding container-dialogo row" \n\
                            style="padding-bottom: 20px !important;">\n\
                                <div ng-if="dadosUser.usuarioId != resposta.usuarioId" class="balao-esquerda">\n\
                                    <div ng-class="{\'borda-gif\' :rbChat.ehGif(resposta.enderecoUsuario,resposta.endereco)}" class="container-img-resposta text-right remove-padding">\n\
                                        <div ng-if="resposta.enderecoUsuario" \n\
                                        ng-class="{\'img-pessoa-padrao\' : !resposta.enderecoUsuario}"\n\
                                        class="chat img-circular-grande margin-img"\n\
                                        style="background-image:url({{alteraNome(resposta.enderecoUsuario)}})"></div>\n\
                                        <div ng-if="resposta.endereco"\n\
                                        ng-class="{\'img-pessoa-padrao\' : !resposta.endereco}"\n\
                                        class="chat img-circular-grande margin-img"\n\
                                        style="background-image:url({{alteraNome(resposta.endereco)}})"></div>\n\
                                        <div ng-if="!resposta.endereco && !resposta.enderecoUsuario"\n\
                                        class="img-pessoa-padrao chat img-circular-grande margin-img"></div>\n\
                                    </div>\n\
                                    <div class="container-textos-esquerda">\n\
                                        <div class="row remove-padding">\n\
                                            <div ng-if="resposta.nomeUsuario" class="col remetente-esquerda remove-padding">{{resposta.nomeUsuario}}</div>\n\
                                            <div ng-if="resposta.nome" class="col remetente-esquerda remove-padding">{{resposta.nome}}</div>\n\
                                            <div class="col resp-momento-esquerda remove-padding">\n\
                                                {{resposta.momento.split(\' \')[1].split(\':\')[0]}}:\n\
                                                {{resposta.momento.split(\' \')[1].split(\':\')[1]}}\n\
                                            </div>\n\
                                        </div>\n\
                                        <div class="container-resposta"\n\
                                        ng-class="{\'container-resposta-midia\' : resposta.enderecoMensagem || resposta.enderecoMidia,\n\
                                        \'borda-gif\' :rbChat.ehGif(resposta.enderecoMidia,resposta.enderecoMensagem)}">\n\
                                            <span ng-if="resposta.respostaTitulo">{{resposta.respostaTitulo}}</span>\n\
                                            <span ng-if="resposta.mensagem">{{resposta.mensagem}}</span>\n\
                                            <img ng-if="resposta.enderecoMidia" \n\
                                            ng-click="rbChat.exibirMidiaChat(resposta.enderecoMidia,true)" \n\
                                            ng-class="{\'container-midia-resposta\' : !rbChat.ehGif(resposta.enderecoMidia,resposta.enderecoMensagem),\n\
                                            \'container-midia-resposta-gif\' : rbChat.ehGif(resposta.enderecoMidia,resposta.enderecoMensagem)}"\n\
                                            src="{{alteraNome(resposta.enderecoMidia)}}"/>\n\
                                            <img ng-if="resposta.enderecoMensagem" \n\
                                            ng-click="rbChat.exibirMidiaChat(resposta.enderecoMensagem,true)" \n\
                                            ng-class="{\'container-midia-resposta\' : !rbChat.ehGif(resposta.enderecoMidia,resposta.enderecoMensagem),\n\
                                            \'container-midia-resposta-gif\' : rbChat.ehGif(resposta.enderecoMidia,resposta.enderecoMensagem)}"\n\
                                            src="{{alteraNome(resposta.enderecoMensagem)}}"/>\n\
                                            <p ng-if="rbChat.ehGif(resposta.enderecoMidia,resposta.enderecoMensagem)"\n\
                                            class="texto-giphy">\n\
                                                POWERED BY <span class="negrito">GIPHY</span>\n\
                                            </p>\n\
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
                                        <div class="container-resposta"\n\
                                        ng-class="{\'container-resposta-midia\' : resposta.enderecoMensagem || resposta.enderecoMidia,\n\
                                            \'borda-gif\' :rbChat.ehGif(resposta.enderecoMidia,resposta.enderecoMensagem)}">\n\
                                            <span ng-if="resposta.respostaTitulo">{{resposta.respostaTitulo}}</span>\n\
                                            <span ng-if="resposta.mensagem">{{resposta.mensagem}}</span>\n\
                                            <img ng-if="resposta.enderecoMidia && !resposta.imgTemporaria" \n\
                                            ng-click="rbChat.exibirMidiaChat(resposta.enderecoMidia,true)" \n\
                                            ng-class="{\'container-midia-resposta\' : !rbChat.ehGif(resposta.enderecoMidia,resposta.enderecoMensagem),\n\
                                            \'container-midia-resposta-gif\' : rbChat.ehGif(resposta.enderecoMidia,resposta.enderecoMensagem)}"\n\
                                            src="{{alteraNome(resposta.enderecoMidia)}}"/>\n\
                                            <div ng-if="resposta.imgTemporaria" class="loader img-temporaria">\n\
                                                <div class="loader-inner ball-clip-rotate">\n\
                                                    <div></div>\n\
                                                </div>\n\
                                            </div>\n\
                                            <img ng-if="resposta.enderecoMidia && resposta.imgTemporaria && !resposta.ehImg"\n\
                                            class="controlaImgTemporaria"\n\
                                            src="{{alteraNome(resposta.enderecoMidia)}}"/>\n\
                                            <div ng-if="resposta.enderecoMidia && resposta.imgTemporaria && resposta.ehImg"\n\
                                            style="background-image:url({{alteraNome(resposta.enderecoMidia)}})"\n\
                                            class="controlaImgTemporaria ehImg">\n\
                                            </div>\n\
                                            <img ng-if="resposta.enderecoMensagem && resposta.imgTemporaria && !resposta.ehImg"\n\
                                            class="controlaImgTemporaria"\n\
                                            src="{{alteraNome(resposta.enderecoMensagem)}}"/>\n\
                                            <div ng-if="resposta.enderecoMensagem && resposta.imgTemporaria && resposta.ehImg"\n\
                                            style="background-image:url({{alteraNome(resposta.enderecoMensagem)}})"\n\
                                            class="controlaImgTemporaria ehImg">\n\
                                            </div>\n\
                                            <img ng-if="resposta.enderecoMensagem && !resposta.imgTemporaria" \n\
                                            ng-click="rbChat.exibirMidiaChat(resposta.enderecoMensagem,true)" \n\
                                            ng-class="{\'container-midia-resposta\' : !rbChat.ehGif(resposta.enderecoMidia,resposta.enderecoMensagem),\n\
                                            \'container-midia-resposta-gif\' : rbChat.ehGif(resposta.enderecoMidia,resposta.enderecoMensagem)}"\n\
                                            src="{{alteraNome(resposta.enderecoMensagem)}}"/>\n\
                                            <p ng-if="rbChat.ehGif(resposta.enderecoMidia,resposta.enderecoMensagem)"\n\
                                            class="texto-giphy">\n\
                                                POWERED BY <span class="negrito">GIPHY</span>\n\
                                            </p>\n\
                                        </div>\n\
                                    </div>\n\
                                    <div style="position:relative" class="container-img-resposta text-right remove-padding">\n\
                                        <div ng-if="resposta.enderecoUsuario" \n\
                                        ng-class="{\'img-pessoa-padrao\' : !resposta.enderecoUsuario}"\n\
                                        class="chat img-circular-grande margin-img"\n\
                                        style="background-image:url({{alteraNome(resposta.enderecoUsuario)}})"></div>\n\
                                        <div ng-if="resposta.endereco" \n\
                                        ng-class="{\'img-pessoa-padrao\' : !resposta.endereco}"\n\
                                        class="chat img-circular-grande margin-img"\n\
                                        style="background-image:url({{alteraNome(resposta.endereco)}})"></div>\n\
                                        <div ng-if="!resposta.endereco && !resposta.enderecoUsuario"\n\
                                        class="img-pessoa-padrao chat img-circular-grande margin-img"></div>\n\
                                        <span \n\
                                        ng-class="{\'ion-android-done\' : resposta.statusMensagem == 1,\n\
                                        \'ion-android-time\' : resposta.statusMensagem == 0,\n\
                                        \'ion-android-done-all\' : resposta.statusMensagem == 2 || resposta.statusMensagem == 3,\n\
                                        \'color-verde\' : resposta.statusMensagem == 3}">\n\
                                        </span>\n\
                                    </div>\n\
                                </div>\n\
                            </div>\n\
                        </div>\n\
                        <div style="position:relative">\n\
                            <button ng-if="platformAndroid && rbChat.abaSelecionada == 1 && !rbChat.camFull" ng-click="rbChat.cameraFull()" \n\
                            class="btn-zoom button-clear button button-positive">\n\
                                <i class="icon ion-android-expand"></i>\n\
                            </button>\n\
                            <div ng-class="{transparente : rbChat.cameraAberta,\n\
                            \'fundo-preto\' : rbChat.abaSelecionada == 1,\n\
                            animar : rbChat.abrindoCamera == true}" \n\
                            style="height:{{rbChat.empurraChat}}px" class="espaco-empurra-chat">\n\
                            </div>\n\
                        </div>\n\
                    </ion-scroll>\n\
                </div>\n\
                '+input()+'\
                '+subMenu()+'\
                '+containerGif();
    }
    
    function input(){
        return'<div class="container-chat" \n\
                ng-if="rbChat.abaSelecionada == 0" id="container-input">\n\
                    <div class="row container-digitando" \n\
                    ng-if="digitandoObj != false && dadosUser.usuarioId != digitandoObj.idDigitando">\n\
                        <div class="img-circular-digitando"\n\
                        ng-class="{\'img-pessoa-padrao\' : !digitandoObj.endereco}"\n\
                        style="background-image:url({{alteraNome(digitandoObj.endereco)}})"></div>\n\
                        <div class="container-digitando-bolas loader-inner ball-pulse-sync">\n\
                            <div class="bola-digitando"></div>\n\
                            <div class="bola-digitando"></div>\n\
                            <div class="bola-digitando"></div>\n\
                        </div>\n\
                    </div>\n\
                    <div class="row remove-padding container-componentes">\n\
                        <div class="organiza-margin-chat col-bottom remove-padding">\n\
                            <button ng-click="rbChat.fecharTeclado(1)" class="btn-chat-pub ion-plus-round button button-clear button-positive">\n\
                            </button>\n\
                        </div>\n\
                        <div class="container-text-area">\n\
                            <p class="lead emoji-picker-container">\n\
                                <textarea id="txtAreaChat"\n\
                                class="form-control textarea-control"\n\
                                ng-model="rbChat.resposta"\n\
                                ng-init="rbChat.calcularTxtAreaAltura()"\n\
                                rows="1"\n\
                                data-tap-disabled="true"\n\
                                ng-keyup="rbChat.digitando();"\n\
                                placeholder="Digite alguma coisa">\n\
                                </textarea>\n\
                            </p>\n\
                        </div>\n\
                        <div class="organiza-margin-chat col-bottom remove-padding">\n\
                            <button ng-disabled="!rbChat.resposta" ng-click="rbChat.responder()" class="btn-chat-pub ion-android-send button button-clear button-positive">\n\
                            </button>\n\
                        </div>\n\
                    </div>\n\
                </div>';
    }
    
    function containerGif(){
         return'<div class="pai-gifs" ng-if="rbChat.abaSelecionada == 3">\n\
                    <ion-scroll direction="x" style="width:{{larguraBody}}px;overflow:auto">\n\
                        <div class="linha-gifs row">\n\
                            <div ng-click="rbChat.enviarGif(gif)" \n\
                            ng-repeat="gif in rbChat.gifs"\n\
                            class="container-gif" \n\
                            style="background-image:url({{gif.small}})"></div>\n\
                       </div>\n\
                    </ion-scroll>\n\
                    <div>\n\
                        <div class="container-input-gif">\n\
                            <div class="box-input-gif row remove-padding">\n\
                                <button style="margin-top: 6px;color: #949292;" \n\
                                ng-click="rbChat.fecharGif()" \n\
                                class="btn-txt-direita button button-clear">\n\
                                    <i class="icon ion-android-arrow-back seta-barra"></i>\n\
                                </button>\n\
                                <input style="border:none"\n\
                                ng-keyup="rbChat.buscarGif()"\n\
                                class="text-area-chat"\n\
                                data-tap-disabled="true"\n\
                                ng-model="rbChat.gifSearch"\n\
                                placeholder="Pesquisar GIPHY...">\n\
                            </div>\n\
                        </div>\n\
                    </div>\n\
                </div>';
    }

        return {
            setScope:setScope,
            montar:montar
        };
    }
]);
