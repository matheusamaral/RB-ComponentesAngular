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
                        <input ng-keyup="pesquisar()" class="input-pesquisa" type="text" placeholder="Pesquisar locais...">\n\
                    </div>\n\
                    <div ng-if="nSlide == 1" class="row">\n\
                        <button style="padding-top: 2px;" ng-click="voltarMapa()" class="btn-txt-direita button button-clear">\n\
                            <i class="icone-dourado icon ion-android-arrow-back seta-barra"></i>\n\
                        </button>\n\
                        <input ng-keyup="pesquisar()" class="input-pesquisa" type="text" placeholder="Pesquisar pessoas...">\n\
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
                <ion-slide-box show-pager="false" style="padding-top:125px;" active-slide="nSlide" on-slide-changed="slideHasChanged($index)">\n\
                    <ion-slide>\n\
                        <div>'+sessaoUltimosLocais()+'</div>\n\
                    </ion-slide>\n\
                    <ion-slide>\n\
                        <div>'+pessoas()+'</div>\n\
                    </ion-slide>\n\
                </ion-slide-box>';
    }
    
    function pessoas(){
         return'<div\n\
                class="row remove-padding-row divide-sessoes corpo-lista-config padding-padrao-contas"\n\
                ng-class="{\'padding-top-bloqueados\' : $index == 0}">\n\
                    <div class="col-25 remove-padding">\n\
                        <div ng-class="{\'borda-dourada\' : dadosUser.usuarioId == pessoa.usuarioId}" style="background-image:url(https://scontent-gru2-1.xx.fbcdn.net/v/t1.0-9/14100393_1088344121255279_2344681261483649428_n.jpg?oh=6cc650480cf90663ec6809e8c79e840d&oe=58E78D50)" class="btn-redondo-medio"></div>\n\
                    </div>\n\
                    <div class="col remove-padding col-center">\n\
                        <p class="font-preta negrito text-left">Teste</p>\n\
                    </div>\n\
                    <div class="remove-padding col-center">\n\
                        <button ng-click="seguir(pessoa.usuarioId)" ng-if="dadosUser.usuarioId != pessoa.usuarioId && pessoa.seguindo == 0" class="btn-seguidores button button-outline button-positive">\n\
                            <i class="icon ion-ios-plus-empty"></i>Seguir\n\
                        </button>\n\
                        <button ng-disabled="dadosUser.usuarioId == pessoa.usuarioId" ng-click="seguir(pessoa.usuarioId)" ng-if="dadosUser.usuarioId == pessoa.usuarioId" class="btn-voce btn-seguidores button button-outline button-positive">\n\
                            <i class="icon ion-ios-plus-empty"></i>Seguir\n\
                        </button>\n\
                        <button ng-click="deixarSeguir(pessoa.usuarioId)" ng-if="dadosUser.usuarioId != pessoa.usuarioId && pessoa.seguindo == 1" class="btn-seguidores button button button-balanced">\n\
                            <i class="icon ion-checkmark"></i>Seguindo\n\
                        </button>\n\
                    </div>\n\
                </div>';
    }
    
    function sessaoUltimosLocais(){
         return'<div class="row box-ultimos remove-padding">\n\
                    <div class="col remove-padding">\n\
                        <div class="row padding-pequeno-ultimo">\n\
                            <p class="p-ultimos-locais"> Locais recentes</p>\n\
                        </div>\n\
                    </div>\n\
                </div>\n\
                <div class="row barra-local padding-top-personalizado rb-padding-padrao">\n\
                    <div class="col">\n\
                        <p class="p-titulo-local">Empório</p>\n\
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
                </div>';
    }
  
    return {
        montar: montar
    };
 }]);



