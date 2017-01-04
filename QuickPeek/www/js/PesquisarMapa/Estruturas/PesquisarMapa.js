'use strict';

angular.module('QuickPeek.HTML.PesquisarMapa', [
])

.factory('PesquisarMapaHtml', [ function() {
       
    function montar() {
        return '<div class="header-pesquisa has-tabs-top row bar bar-header">\n\
                    <div class="row">\n\
                        <button style="padding-top: 2px;" ng-click="voltarMapa()" class="btn-txt-direita button button-clear">\n\
                            <i class="icone-dourado icon ion-android-arrow-back seta-barra"></i>\n\
                        </button>\n\
                        <input ng-keyup="pesquisar()" class="input-pesquisa" type="text" placeholder="Pesquisar locais">\n\
                    </div>\n\
                </div>'+tabs();
    };     
    
    function tabs(){
        return'<div class="tabs-striped tabs-top tabs-background-positive tabs-color-light">\n\
                    <div class="tabs box-shadow-barra config-barra-pesquisar">\n\
                        <a class="tab-item active" href="#">\n\
                            <i class="cor-icones icon ion-android-pin"></i>\n\
                        </a>\n\
                        <a class="tab-item desativo" href="#">\n\
                            <i class="cor-icones icon ion-person"></i>\n\
                        </a>\n\
                    </div>\n\
                </div>\n\
                '+sessaoUltimosLocais();
    }
    
    function sessaoUltimosLocais(){
         return'<div style="padding-top:125px !important" class="row box-ultimos remove-padding">\n\
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



