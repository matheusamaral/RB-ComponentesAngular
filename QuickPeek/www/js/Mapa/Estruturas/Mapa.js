'use strict';

angular.module('QuickPeek.HTML.Mapa', [
])

.factory('MapaHtml', [function(){
       
    function montar(){
        return tabs()+'\n\
                <div class="row" style="padding:0;padding-top:90px !important">\n\
                    <div class="container-mapa" id="map"></div>\n\
                </div>';
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

