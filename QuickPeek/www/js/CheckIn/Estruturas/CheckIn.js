'use strict';

angular.module('QuickPeek.HTML.CheckIn', [
])

.factory('CheckInHtml', [function(){
       
    function montar(){
        return '<div style="box-shadow: 0px -2px 8px black !important;" class="row bar bar-header bar-positive">\n\
                    <div class="col remove-padding">\n\
                        <button ng-click="voltarConfig()" class="btn-txt-direita button button-clear">\n\
                            <i class="icon ion-android-arrow-back seta-barra"></i>Onde você está?\n\
                        </button>\n\
                    </div>\n\
                    <div class="col col-20 remove-padding text-right">\n\
                        <button ng-click="voltarConfig()" class="btn-txt-direita button button-clear">\n\
                            <i class="icon ion-android-search seta-barra"></i>\n\
                        </button>\n\
                    </div>\n\
                    <div class="col col-20  text-right remove-padding">\n\
                        <button ng-click="voltarConfig()" class="btn-txt-direita button button-clear">\n\
                            <i class="icon ion-android-sync seta-barra"></i>\n\
                        </button>\n\
                    </div>\n\
                </div>\n\
                <div style="height:{{alturaTela}}px;" class="altura-barra-padding remove-padding row corpo-lista-config">\n\
                    <div class="container-sinais">\n\
                        <div class="onda um" style="left:{{(larguraTela/2)-75}}px">\n\
                            <div class="col text-center" style="margin-top: 38px;">\n\
                                <div style="background-image:url({{dadosUser.usuarioEndereco}})" class="box-img-cad icone-redondo-medio">\n\
                                </div>\n\
                            </div>\n\
                        </div>\n\
                        <div class="onda dois" style="left:{{(larguraTela/2)-125}}px">\n\
                            <div ng-click="checkInLocal(locais[0])" ng-if="locais[0]" class="container-icone-checkin">\n\
                                <div class="alinha-item-bottom col text-center" style="margin-top: 19px;">\n\
                                    <div style="background-image:url({{locais[0].categoriaHashtagFoto}})" class="box-img-cad icone-redondo-medio">\n\
                                    </div>\n\
                                    <p class="nome-icone">{{locais[0].localNome}}</p>\n\
                                </div>\n\
                            </div>\n\
                        </div>\n\
                        <div class="onda tres" style="left:{{(larguraTela/2)-175}}px"></div>\n\
                        <div class="onda quatro" style="left:{{(larguraTela/2)-225}}px">\n\
                            <div class="container-icone-checkin">\n\
                                <div ng-click="checkInLocal(locais[1])" ng-if="locais[1]" class="alinha-item-bottom-esquerda col text-center" style="margin-top: 19px;">\n\
                                    <div style="background-image:url({{locais[1].categoriaHashtagFoto}})" class="box-img-cad icone-redondo-medio">\n\
                                    </div>\n\
                                    <p class="nome-icone">{{locais[1].localNome}}</p>\n\
                                </div>\n\
                                <div ng-click="checkInLocal(locais[2])" ng-if="locais[2]" class="alinha-item-bottom-direita col text-center" style="margin-top: 19px;">\n\
                                    <div style="background-image:url({{locais[2].categoriaHashtagFoto}})" class="box-img-cad icone-redondo-medio">\n\
                                    </div>\n\
                                    <p class="nome-icone">{{locais[2].localNome}}</p>\n\
                                </div>\n\
                            </div>\n\
                        </div>\n\
                        <div class="onda cinco" style="left:{{(larguraTela/2)-275}}px"></div>\n\
                        <div class="onda seis" style="left:{{(larguraTela/2)-325}}px">\n\
                            <div ng-click="checkInLocal(locais[3])" ng-if="locais[3]" class="container-icone-checkin">\n\
                                <div class="alinha-item-bottom-ultimo col text-center" style="margin-top: 19px;">\n\
                                    <div style="background-image:url({{locais[3].categoriaHashtagFoto}})" class="box-img-cad icone-redondo-medio">\n\
                                    </div>\n\
                                    <p class="nome-icone">{{locais[3].localNome}}</p>\n\
                                </div>\n\
                            </div>\n\
                        </div>\n\
                    </div>\n\
                </div>\n\
                <div align-title="left" class="row rodape-check-in bar-assertive">\n\
                    <div class="col buttons col-center">\n\
                        <button class="button btn-rodape-check-in">\n\
                            <i class="icon ion-home seta-barra"></i>Estou em casa\n\
                        </button>\n\
                    </div>\n\
                    <div class="col buttons col-center" ng-click="doSomething()">\n\
                        <button class="button btn-rodape-check-in">\n\
                            <i class="icon ion-briefcase seta-barra"></i>Estou no trabalho\n\
                        </button>\n\
                    </div>\n\
                </div>';
    };
  
    return {
        montar: montar
    };
 }]);

