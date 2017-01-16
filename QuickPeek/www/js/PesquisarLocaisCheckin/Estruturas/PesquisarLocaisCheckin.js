'use strict';

angular.module('QuickPeek.HTML.PesquisarLocaisCheckin', [
])

.factory('PesquisarLocaisCheckinHtml', [ function() {
       
    function montar(){
        return '<div class="header-pesquisa has-tabs-top row bar bar-header">\n\
                    <div class="row">\n\
                        <button style="padding-top: 2px;" ng-click="voltarMapa()" class="btn-txt-direita button button-clear">\n\
                            <i class="icone-dourado icon ion-android-arrow-back seta-barra"></i>\n\
                        </button>\n\
                        <input ng-keyup="pesquisarLocal()" ng-model="dados.nome" class="input-pesquisa" type="text" placeholder="Pesquisar locaisdd...">\n\
                    </div>\n\
                </div>'+sessaoUltimosLocais();
    };  
    
    function sessaoUltimosLocais(){
         return'<div id="container-infinite-scrol">\
                    <div infinite-scroll="pesquisarLocalScroll()" infinite-scroll-distance="0" infinite-scroll-container="\'#container-infinite-scrol\'">\n\
                        <div ng-click="checkInLocal(local)" ng-repeat="local in locais" class="row barra-local padding-top-personalizado rb-padding-padrao">\n\
                            <div ng-if="local.presente == 1" class="col">\n\
                                <p class="p-titulo-local">{{local.localNome}}</p>\n\
                                <div class="row remove-padding">\n\
                                    <i class="icon ion-ios-location icone-dourado"></i><span class="span-dourado">Seu local atual - {{local.cidade}}</span>\n\
                                </div>\n\
                            </div>\n\
                            <div ng-if="local.presente != 1" class="col">\n\
                                <p class="p-titulo-local">{{local.localNome}}</p>\n\
                                <div class="row remove-padding" style="padding-top:3px !important">\n\
                                    <i style="padding-top: 3px;" class="p-titulo-hastag icon ion-ios-location" ng-if="local.distancia >= 1"></i><span style="padding-top: 3px;" class="p-titulo-hastag" ng-if="local.distancia >= 1">{{local.distancia.split(\'.\')[0]}} km de distância - {{local.cidade}}</span>\n\
                                    <i style="padding-top: 3px;" class="p-titulo-hastag icon ion-ios-location" ng-if="local.distancia < 1"></i><span style="padding-top: 3px;" class="p-titulo-hastag" ng-if="local.distancia < 1">{{(1000 * local.distancia).split(\'.\')[0]}} m de distância - {{local.cidade}}</span>\n\
                                </div>\n\
                            </div>\n\
                            <div class="text-right">\n\
                                <md-menu>\n\
                                    <md-button class="md-icon-button" ng-click="$mdOpenMenu($event)">\n\
                                        <md-icon class="icone-tamanho-personalizado ion-android-more-vertical"></md-icon>\n\
                                    </md-button>\n\
                                    <md-menu-content width="4">\n\
                                        <md-menu-item>\n\
                                            <md-button ng-click="ctrl.redial($event)">\n\
                                                Alterar localização\n\
                                            </md-button>\n\
                                        </md-menu-item>\n\
                                        <md-menu-item>\n\
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



