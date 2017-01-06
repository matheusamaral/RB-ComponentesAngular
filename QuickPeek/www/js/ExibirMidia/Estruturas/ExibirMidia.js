'use strict';

angular.module('QuickPeek.HTML.ExibirMidia', [
])

.factory('ExibirMidiaHtml', [ function(){
       
    function montar() {
        return '<button style="z-index:2000;margin-top: 18px;font-weight: bold;" ng-click="voltarLocais()" class="btn-flutuante col button button-clear">\n\
                    <i class="icon ion-android-arrow-back" style="color:#FFFFFF"></i>\n\
                </button>\n\
                <ion-slide-box style="height:100%;" show-pager="false" on-slide-changed="slideHasChanged($index)">\n\
                    <ion-slide ng-repeat="midia in midias">\n\
                        <img class="box-img" src="{{midia.endereco}}"></img>\n\
                        <p ng-if="midia.jaCurtiu == 0 && midia.curtidas && midia.curtidas.length > 1" class="p-midia">{{midia.curtidas[0].nome}} e outras {{midia.curtidas.length - 1}} pessoas curtiram</p>\n\
                        <p ng-if="midia.jaCurtiu == 0 && midia.curtidas && midia.curtidas.length == 1" class="p-midia">{{midia.curtidas[0].nome}} curtiu isso</p>\n\
                        <p ng-if="midia.jaCurtiu == 1 && midia.curtidas && midia.curtidas.length > 1" class="p-midia">Você e outras {{midia.curtidas.length - 1}} pessoas curtiram</p>\n\
                        <p ng-if="midia.jaCurtiu == 1 && midia.curtidas && midia.curtidas.length == 1" class="p-midia">Você curtiu isso</p>\n\
                        <p ng-if="midia.curtidas == false && !midia.curtidas.length" class="p-midia">Seja o primeiro a curtir isso</p>\n\
                        <hr class="hr-midias"></hr>\n\
                        <button ng-if="midia.jaCurtiu == 0"\n\
                        ng-click="curtir(midia.id)"\n\
                        ng-class="{\'texto-azul\' : midia.jaCurtiu == 1,\'texto-branco\' : midia.jaCurtiu == 0}"\n\
                        class="config-btn-midia text-center button button-clear button-positive">\n\
                            <md-icon  class="img-curtir"></md-icon>Curtir\n\
                        </button>\n\
                        <button ng-if="midia.jaCurtiu == 1"\n\
                        ng-click="curtir(midia.id)"\n\
                        ng-class="{\'texto-azul\' : midia.jaCurtiu == 1,\'texto-branco\' : midia.jaCurtiu == 0}"\n\
                        class="config-btn-midia text-center button button-clear button-positive">\n\
                            <md-icon class="img-curtir-azul"></md-icon>Curtir\n\
                        </button>\n\
                    </ion-slide>\n\
                </ion-slide-box>';
    };

    return {
        montar: montar
    };
 }]);