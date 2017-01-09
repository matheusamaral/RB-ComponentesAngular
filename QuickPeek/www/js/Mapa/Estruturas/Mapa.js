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
         return'<div id="barra-local-atual" ng-if="dadosbarra && dadosbarra.distancia" ng-class="{\'z-index-superior\' : dadosUser.tutorial == 3}"\n\
                class="row barra-localizacao-atual">\n\
                    <div class="col col-67">\n\
                        <div class="row remove-padding">\n\
                            <p class="p-subtitulo">Você está agora em</p>\n\
                        </div>\n\
                        <p class="p-titulo-local">{{dadosbarra.localTitulo}}?</p>\n\
                    </div>\n\
                    <div class="col text-right alinha-vertical">\n\
                        <button ng-click="irCheckin()" style="margin-right: 13px;" class="config-btn-mapa button button-outline button-positive">\n\
                            Não\n\
                        </button>\n\
                        <button ng-click="checkInLocal(dadosbarra)" class="config-btn-mapa button button-positive">\n\
                            Sim\n\
                        </button>\n\
                    </div>\n\
                </div>\n\
                <div id="barra-local-atual" style="display:flex" class="row barra-localizacao-atual barra-local" ng-if="dadosbarra && dadosbarra.checkIn == 1">\n\
                    <div class="col col-75">\n\
                        <p class="p-titulo-local">{{dadosbarra.localTitulo}}</p>\n\
                        <div class="row remove-padding">\n\
                            <i class="icon ion-ios-location icone-dourado"></i><span class="span-dourado">Seu local atual</span>\n\
                        </div>\n\
                    </div>\n\
                    <div class="text-right col">\n\
                        <md-menu>\n\
                            <md-button class="md-icon-button" ng-click="$mdOpenMenu($event)">\n\
                                <md-icon class="icone-tamanho-personalizado ion-android-more-vertical"></md-icon>\n\
                            </md-button>\n\
                            <md-menu-content width="4">\n\
                                <md-menu-item>\n\
                                    <md-button ng-click="irCheckin()">\n\
                                        Alterar localização\n\
                                    </md-button>\n\
                                </md-menu-item>\n\
                                <md-menu-item>\n\
                                    <md-button ng-click="checkInLocal(dadosbarra)">\n\
                                        Alterar privacidade\n\
                                    </md-button>\n\
                                </md-menu-item>\n\
                                <md-menu-item>\n\
                                    <md-button ng-click="ctrl.redial($event)">\n\
                                        Navegar até o local\n\
                                    </md-button>\n\
                                </md-menu-item>\n\
                            </md-menu-content>\n\
                        </md-menu>\n\
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
                        <a class="tab-item" href="#">\n\
                            <i class="icon ion-android-notifications"></i>\n\
                        </a>\n\
                        <a class="tab-item" href="#" ng-click="irPerfil()">\n\
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

