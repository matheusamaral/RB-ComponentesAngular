'use strict';

angular.module('QuickPeek.HTML.PesquisarMapa', [
])

.factory('PesquisarMapaHtml', [ function() {
       
    function montar() {
        return '<div class="header-pesquisa has-tabs-top row bar bar-header">\n\
                    <div ng-if="nSlide == 0" class="row">\n\
                        <button style="padding-top: 2px;" ng-click="voltarMapa()" class="btn-txt-direita button button-clear">\n\
                            <i class="icone-dourado icon ion-android-arrow-back seta-barra"></i>\n\
                        </button>\n\
                        <input ng-keyup="pesquisarLocal()" ng-model="dados.nome" class="input-pesquisa" type="text" placeholder="Pesquisar locais...">\n\
                    </div>\n\
                    <div ng-if="nSlide == 1" class="row">\n\
                        <button style="padding-top: 2px;" ng-click="voltarMapa()" class="btn-txt-direita button button-clear">\n\
                            <i class="icone-dourado icon ion-android-arrow-back seta-barra"></i>\n\
                        </button>\n\
                        <input ng-keyup="pesquisarPessoa()" ng-model="dados.pesquisa" class="input-pesquisa" type="text" placeholder="Pesquisar pessoas...">\n\
                    </div>\n\
                </div>'+tabs();
    };
    
    function tabs(){
        return'<div class="tabs-striped tabs-top tabs-background-positive tabs-color-light">\n\
                    <div class="tabs box-shadow-barra config-barra-pesquisar">\n\
                        <a class="tab-item"\n\
                        ng-class="{\'active\' : nSlide == 0,desativo : nSlide == 1}"\n\
                        href="#" ng-click="nSlide = 0">\n\
                            <i class="cor-icones icon ion-android-pin"></i>\n\
                        </a>\n\
                        <a class="tab-item"\n\
                        ng-class="{\'active\' : nSlide == 1,desativo : nSlide == 0}"\n\
                        href="#" ng-click="nSlide = 1">\n\
                            <i class="cor-icones icon ion-person"></i>\n\
                        </a>\n\
                    </div>\n\
                </div>\n\
                <ion-slide-box class="slider-full" show-pager="false" style="padding-top:125px;" active-slide="nSlide" on-slide-changed="slideHasChanged($index);gerenciaScroll($index)">\n\
                    <ion-slide>\n\
                        '+sessaoUltimosLocais()+'\n\
                    </ion-slide>\n\
                    <ion-slide>\n\
                        <div id="container-infinite-scrol-pessoas">'+pessoas()+'</div>\n\
                    </ion-slide>\n\
                </ion-slide-box>';
    }
    
    function pessoas(){
         return'<div id="paiContainerScrolPessoa" style="overflow: auto;height:{{alturaTela}}px">\n\
                    <div>\n\
                        <div ng-click="irPerfil(pessoa.usuarioId)"\n\
                        class="row remove-padding-row divide-sessoes corpo-lista-config padding-padrao-contas"\n\
                        ng-repeat="pessoa in pessoas">\n\
                            <div class="col-25 remove-padding">\n\
                                <div ng-class="{\'borda-dourada\' : dadosUser.usuarioId == pessoa.usuarioId}" style="background-image:url({{pessoa.endereco}})" class="btn-redondo-medio"></div>\n\
                            </div>\n\
                            <div class="col remove-padding col-center">\n\
                                <p class="font-preta negrito text-left">{{pessoa.nome}}</p>\n\
                            </div>\n\
                            <div class="remove-padding col-center">\n\
                                <button ng-click="seguir(pessoa.usuarioId,$event)" ng-if="dadosUser.usuarioId != pessoa.usuarioId && pessoa.seguindo == 0" class="btn-seguidores button button-outline button-positive">\n\
                                    <i class="icon ion-ios-plus-empty"></i>Seguir\n\
                                </button>\n\
                                <button ng-click="cancelarSolicitacao(pessoa.seguirId,$event)" ng-if="dadosUser.usuarioId != pessoa.usuarioId && pessoa.seguindo == 2" class="btn-seguidores button button-outline button-positive">\n\
                                    Solicitado\n\
                                </button>\n\
                                <button ng-disabled="dadosUser.usuarioId == pessoa.usuarioId" ng-click="seguir(pessoa.usuarioId)" ng-if="dadosUser.usuarioId == pessoa.usuarioId" class="btn-voce btn-seguidores button button-outline button-positive">\n\
                                    Voce\n\
                                </button>\n\
                                <button ng-click="deixarSeguir(pessoa.usuarioId,$event)" ng-if="dadosUser.usuarioId != pessoa.usuarioId && pessoa.seguindo == 1" class="btn-seguidores button button button-balanced">\n\
                                    <i class="icon ion-checkmark"></i>Seguindo\n\
                                </button>\n\
                            </div>\n\
                        </div>\n\
                    </div>\n\
                </div>';
    }
    
    function sessaoUltimosLocais(){
         return '<div ng-if="!pesquisou" class="row box-ultimos remove-padding">\n\
                    <div class="col remove-padding">\n\
                        <div class="row padding-pequeno-ultimo">\n\
                            <p class="p-ultimos-locais"> Locais recentes</p>\n\
                        </div>\n\
                    </div>\n\
                </div>\n\
                <div id="paiContainerScrol" style="overflow: auto;height:{{alturaTela}}px">\n\
                    <div>\n\
                        <div ng-click="irLocal(local.localId)" ng-repeat="local in locais.ultimosLocais" class="row barra-local padding-top-personalizado rb-padding-padrao">\n\
                            <!--<div ng-if="local.presente == 1" class="col">\n\
                                <p ng-if="local.localTitulo" class="p-titulo-local">{{local.localTitulo}}</p>\n\
                                <div class="row remove-padding">\n\
                                    <i class="icon ion-ios-location icone-dourado"></i><span class="span-dourado">Seu local atual - {{local.cidade}}</span>\n\
                                </div>\n\
                            </div>-->\n\
                            <div class="col">\n\
                                <p ng-if="local.localTitulo" class="p-titulo-local">{{local.localTitulo}}</p>\n\
                                <p ng-if="local.localNome" class="p-titulo-local">{{local.localNome}}</p>\n\
                                <div class="row remove-padding" style="padding-top:3px !important">\n\
                                    <i style="padding-top: 3px;" class="p-titulo-hastag icon ion-ios-location" ng-if="local.distancia >= 1"></i><span style="padding-top: 3px;" class="p-titulo-hastag" ng-if="local.distancia >= 1">{{local.distancia.split(\'.\')[0]}} km de distância - {{local.cidade}}</span>\n\
                                    <i style="padding-top: 3px;" class="p-titulo-hastag icon ion-ios-location" ng-if="local.distancia < 1"></i><span style="padding-top: 3px;" class="p-titulo-hastag" ng-if="local.distancia < 1">{{converteKmM(local.distancia)}} m de distância - {{local.cidade}}</span>\n\
                                </div>\n\
                            </div>\n\
                            <div class="text-right">\n\
                                <md-menu>\n\
                                    <md-button class="md-icon-button" ng-click="$mdOpenMenu($event)">\n\
                                        <md-icon class="icone-tamanho-personalizado ion-android-more-vertical"></md-icon>\n\
                                    </md-button>\n\
                                    <md-menu-content width="4">\n\
                                        <md-menu-item ng-if="local.checkIn == 1">\n\
                                            <md-button ng-click="ctrl.redial($event)">\n\
                                                Alterar localização\n\
                                            </md-button>\n\
                                        </md-menu-item>\n\
                                        <md-menu-item ng-if="local.checkIn == 1">\n\
                                            <md-button ng-click="ctrl.redial($event)">\n\
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
                        </div>\n\
                    </div>\n\
                </div>';
    }
  
    return {
        montar: montar
    };
 }]);



