'use strict';

angular.module('QuickPeek.HTML.Mapa', [
])

.factory('MapaHtml', [function(){
       
    function montar(){
        return tabs()+'\n\
                <div class="row" style="padding:0;padding-top:75px !important">\n\
                    <div style="width:{{larguraMapa}}px;height:{{alturaMapa}}px;" class="container-mapa" id="map"></div>\n\
                </div>\n\
                <md-button style="bottom:{{btnAltura +100}}px" ng-click="irFiltro()" class="btn-flutuante-redondo md-fab">\n\
                    <md-icon class="img-seta-funil"></md-icon>\n\
                </md-button>\n\
                <md-button style="bottom:{{btnAltura +30}}px" ng-class="{\'z-index-superior\' : dadosUser.tutorial == 2}"\n\
                ng-click="irPesquisa()" class="btn-flutuante-pesquisar md-fab">\n\
                    <i style="font-size: 26px;color: #4d4d4d;" class="icon ion-android-search"></i>\n\
                </md-button>'+barraLocalizacaoAtual()+tutorial();
    };  
    
    function barraLocalizacaoAtual(){
         return'<div ng-click="irLocal(dadosbarra.localId,$event)" \n\
                id="barra-local-atual" \n\
                ng-class="{\'z-index-superior\' : dadosUser.tutorial == 3}"\n\
                class="row barra-localizacao-atual"\n\
                ng-if="dadosbarra && dadosbarra.distancia">\n\
                    <div class="">\n\
                        <div ng-if="dadosUser.visibilidadeCheckInId != 3"\n\
                        class="col remove-paddingicone-local-popover-dourado"\n\
                        style="margin-top: 10px;background-image:url({{dadosUser.usuarioEndereco}})">\n\
                            <div class="container-privacidade-img" ng-if="dadosUser.visibilidadeCheckInId">\n\
                                <md-icon\n\
                                ng-class="{\'ion-android-globe\' : dadosUser.visibilidadeCheckInId == 1,\n\
                                \'ion-android-people\' : dadosUser.visibilidadeCheckInId == 2}">\n\
                                </md-icon>\n\
                            </div>\n\
                        </div>\n\
                        <div ng-if="dadosUser.visibilidadeCheckInId == 3"\n\
                        class="col remove-padding icone-local-popover-dourado"\n\
                        style="margin-top: 10px;background-image:url({{dadosUser.avatarEndereco}})">\n\
                            <div class="container-privacidade-img" style="background-image:url(img/56.svg)"></div>\n\
                        </div>\n\
                    </div>\n\
                    <div class="col remove-padding">\n\
                        <div class="row remove-padding">\n\
                            <p class="p-subtitulo">Você está agora em</p>\n\
                        </div>\n\
                        <p class="p-titulo-local">{{dadosbarra.localTitulo}}?</p>\n\
                    </div>\n\
                    <div class="text-right col">\n\
                        <button ng-click="irCheckin($event)" style="margin-right: 13px;" class="config-btn-mapa button button-outline button-positive">\n\
                            Não\n\
                        </button>\n\
                        <button ng-click="checkInLocal(dadosbarra,$event)" class="config-btn-mapa button button-positive">\n\
                            Sim\n\
                        </button>\n\
                    </div>\n\
                </div>\n\
                <div ng-click="irLocal(dadosbarra.localId,$event)"\n\
                id="barra-local-atual" style="display:flex" class="row barra-localizacao-atual barra-local" \n\
                ng-if="dadosbarra == 1 || dadosbarra == 2 || (dadosbarra && dadosbarra.checkIn == 1)">\n\
                    <div ng-if="dadosUser.visibilidadeCheckInId != 3" class="icone-local-barra"\n\
                    style="background-image:url({{dadosUser.usuarioEndereco}})">\n\
                        <div class="container-privacidade-img-barra">\n\
                            <md-icon\n\
                            ng-class="{\'ion-android-globe\' : dadosUser.visibilidadeCheckInId == 1,\n\
                            \'ion-android-people\' : dadosUser.visibilidadeCheckInId == 2}">\n\
                            </md-icon>\n\
                        </div>\n\
                    </div>\n\
                    <div ng-if="dadosUser.visibilidadeCheckInId == 3" class="icone-local-popover-dourado"\n\
                    style="background-image:url({{dadosUser.avatarEndereco}})">\n\
                        <div class="container-privacidade-img" style="background-image:url(img/56.svg)"></div>\n\
                    </div>\n\
                    <div class="" style="width:100%">\n\
                        <p ng-if="dadosbarra != 1 && dadosbarra != 2" class="p-titulo-local">{{dadosbarra.localTitulo}}</p>\n\
                        <p ng-if="dadosbarra == 1" class="p-titulo-local">Em casa</p>\n\
                        <p ng-if="dadosbarra == 2" class="p-titulo-local">No trabalho</p>\n\
                        <div class="row remove-padding">\n\
                            <i class="icon ion-ios-location icone-dourado"></i><span class="span-dourado">Seu local atual</span>\n\
                        </div>\n\
                    </div>\n\
                    <div class="text-right">\n\
                        <md-menu>\n\
                            <md-button class="md-icon-button" ng-click="$mdOpenMenu($event)">\n\
                                <md-icon class="icone-tamanho-personalizado ion-android-more-vertical"></md-icon>\n\
                            </md-button>\n\
                            <md-menu-content width="4">\n\
                                <md-menu-item>\n\
                                    <md-button ng-click="irCheckin($event)">\n\
                                        Alterar localização\n\
                                    </md-button>\n\
                                </md-menu-item>\n\
                                <md-menu-item ng-if="dadosbarra != 1 && dadosbarra != 2">\n\
                                    <md-button ng-click="checkInLocal(dadosbarra,$event)">\n\
                                        Alterar privacidade\n\
                                    </md-button>\n\
                                </md-menu-item>\n\
                                <md-menu-item>\n\
                                    <md-button ng-click="irAteLocal(dadosbarra)">\n\
                                        Navegar até o local\n\
                                    </md-button>\n\
                                </md-menu-item>\n\
                            </md-menu-content>\n\
                        </md-menu>\n\
                    </div>\n\
                </div>\n\
                <div class="barra-localizacao-atual barra-local" ng-if="!dadosbarra" id="barra-local-atual">\n\
                    <div>\n\
                        <p class="p-titulo-local">Onde você está agora?</p>\n\
                    </div>\n\
                    <div class="row" style="padding-left: 0;padding-top: 10px;">\n\
                        <button ng-click="estouEmCasa()" style="margin-right: 13px;" class="btn-barra-casa config-btn-mapa button button-outline button-positive">\n\
                            <md-icon class="ion-android-home"></md-icon>Em casa\n\
                        </button>\n\
                        <button ng-click="estounoTrabalho()" style="margin-right: 13px;" class="btn-barra-casa config-btn-mapa button button-outline button-positive">\n\
                            <md-icon class="ion-briefcase"></md-icon>No trabalho\n\
                        </button>\n\
                        <button ng-click="cadLocal()" class="btn-barra-casa config-btn-mapa button button-positive">\n\
                            Criar meu local\n\
                        </button>\n\
                    </div>\n\
                </div>';
    }
    
    function tabs(){
        return'<div class="tabs-striped tabs-top tabs-background-positive tabs-color-light">\n\
                    <div class="tabs box-shadow-preta">\n\
                        <a class="tab-item active" href="#">\n\
                            <i class="icon img-quick-logo"></i>\n\
                        </a>\n\
                        <a class="tab-item" href="#" ng-click="mapaGeral.mapaAtivo(true)">\n\
                            <i class="icon ion-chatbox-working"></i>\n\
                        </a>\n\
                        <a class="tab-item" ng-click="irNotificacoes()" href="#">\n\
                            <i class="icon ion-android-notifications"></i>\n\
                        </a>\n\
                        <a class="tab-item" href="#" ng-click="irPerfil(dadosUser.dados.usuarioId)">\n\
                            <i class="icon ion-person"></i>\n\
                        </a>\n\
                    </div>\n\
                </div>';
    }
    
    function tutorial(){
        return'<div ng-if="dadosUser.tutorial == 1 || dadosUser.tutorial == 3 || dadosUser.tutorial == 2" class="row rb-padding container-tutorial">\n\
                    <div class="tutorial tutorial-mapa-{{dadosUser.tutorial}}">\n\
                    </div>\n\
                    <p ng-if="dadosUser.tutorial == 1" class="negrito posiciona-p-tutorial{{dadosUser.tutorial}}">Bem vindo!</p>\n\
                    <p ng-if="dadosUser.tutorial == 1" class="posiciona-p-tutorial{{dadosUser.tutorial}}-{{dadosUser.tutorial}}">Explore no mapa o que está</br> acontecendo agora ao seu redor!</p>\n\
                    <p ng-if="dadosUser.tutorial == 2" class="negrito posiciona-p-tutorial{{dadosUser.tutorial}}">Pesquisar</p>\n\
                    <p ng-if="dadosUser.tutorial == 2" class="posiciona-p-tutorial{{dadosUser.tutorial}}-{{dadosUser.tutorial}}">Busque pelo nome o</br> destino desejado.</p>\n\
                    <p ng-if="dadosUser.tutorial == 3" class="negrito posiciona-p-tutorial{{dadosUser.tutorial}}">Onde você está?</p>\n\
                    <p ng-if="dadosUser.tutorial == 3" class="posiciona-p-tutorial{{dadosUser.tutorial}}-{{dadosUser.tutorial}}">Informe o local que</br> está agora.</p>\n\
                    <button ng-click="attTutorial()" class="btn-mapa-tutorial-{{dadosUser.tutorial}} button button-clear button-positive">\n\
                        PULAR<i class="icon ion-chevron-right"></i>\n\
                    </button>\n\
                    <md-icon ng-if="dadosUser.tutorial == 3 || dadosUser.tutorial == 2" class="icone-tutorial-{{dadosUser.tutorial}} ion-android-arrow-down"></md-icon>\n\
                </div>';
    }
  
    return {
        montar: montar
    };
 }]);

