'use strict';

angular.module('QuickPeek.HTML.Mapa', [
])

.factory('MapaHtml', [function(){
       
    function montar(){
        return tabs()+'\n\
                <div class="row" style="padding:0;padding-top:75px !important">\n\
                    <div style="width:{{larguraMapa}}px;height:{{alturaMapa}}px;" class="container-mapa" id="map"></div>\n\
                </div>\n\
                <md-button ng-click="irFiltro()" class="btn-flutuante-redondo md-fab">\n\
                    <md-icon class="img-seta-funil"></md-icon>\n\
                </md-button>\n\
                <md-button ng-click="irPesquisa()" class="btn-flutuante-pesquisar md-fab">\n\
                    <i style="font-size: 26px;color: #4d4d4d;" class="icon ion-android-search"></i>\n\
                </md-button>';
    };  
    
    function tabs(){
        return'<div class="tabs-striped tabs-top tabs-background-positive tabs-color-light">\n\
                    <div class="tabs box-shadow-barra">\n\
                        <a class="tab-item active" href="#">\n\
                            <i class="icon img-quick-logo"></i>\n\
                        </a>\n\
                        <a class="tab-item" href="#" ng-click="mapaGeral.mapaAtivo(true)">\n\
                            <i class="icon ion-chatbox-working"></i>\n\
                        </a>\n\
                        <a class="tab-item" href="#">\n\
                            <i class="icon ion-android-notifications"></i>\n\
                        </a>\n\
                        <a class="tab-item" href="#">\n\
                            <i class="icon ion-person"></i>\n\
                        </a>\n\
                    </div>\n\
                </div>';
    }
  
    return {
        montar: montar
    };
 }]);

