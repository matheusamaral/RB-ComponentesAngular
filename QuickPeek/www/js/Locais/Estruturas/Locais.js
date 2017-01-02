'use strict';

angular.module('QuickPeek.HTML.Locais', [
])

.factory('LocaisHtml', [ function() {
       
    function montar(){
        return '<div class="row bar bar-header bar-positive">\n\
                    <div>\n\
                        <button ng-click="voltarConfig()" class="btn-txt-direita button button-clear">\n\
                            <i class="icon ion-android-arrow-back seta-barra"></i>Área no mapa\n\
                        </button>\n\
                    </div>\n\
                </div>\n\
                <div ng-repeat="local in locais">\n\
                    <div ng-class="{\'padding-top-barra\' : $index == 0}"\n\
                    class="row barra-local">\n\
                        <div class="col">\n\
                            <p class="p-titulo-local">{{local.dados.localNome}}</p>\n\
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
                    </div>\n\
                    '+sessaoHashtag()+
                    '<div class="container-fotos">\n\
                        <div class="row remove-padding">\n\
                            <div ng-if="local.qtdMidias > 0" ng-click="exibirMidias(local.dados.localId)" class="col remove-padding">\n\
                                '+sessaoFotos()+'\n\
                            </div>\n\
                            <div ng-if="local.qtdPessoas > 0" ng-click="irPessoas(local.dados.localId)" class="col remove-padding">\n\
                                '+sessaoPessoas()+'\n\
                            </div>\n\
                            <div ng-if="local.qtdPerguntas > 0" class="col remove-padding">\n\
                                '+sessaoPerguntas()+'\n\
                            </div>\n\
                        </div>\n\
                    </div>\n\
                </div>';
    };
    
    function sessaoFotos(){
         return'<div class="box-fotos">\n\
                    <div\n\
                    ng-repeat="midia in local.midias"\n\
                    class="moldura-foto pos{{$index + 1}} posicao-{{local.midias.length}}-foto-quadrada"\n\
                    style="background-image:url({{midia.endereco}})"></div>\n\
                    <p class="p-config-itens"><span style="font-weight:bold">{{local.qtdMidias}}</span> Imagens</p>\n\
                </div>';
    }
    
    function sessaoPessoas(){
         return'<div class="box-fotos">\n\
                    <div \n\
                    ng-repeat="pessoa in local.pessoas"\n\
                    ng-class="{\'borda-dourada-fina\' : pessoa.usuarioId == dadosUser.usuarioId}"\n\
                    class="moldura-foto-redonda pos{{$index+1}} posicao-{{local.pessoas.length}}-foto-quadrada"\n\
                    style="background-image:url({{pessoa.endereco}})">\n\
                    </div>\n\
                    <p class="p-config-itens"><span style="font-weight:bold">{{local.qtdPessoas}}</span> Pessoas</p>\n\
                </div>';
    }
    
    function sessaoPerguntas(){
         return'<div class="box-perguntas">\n\
                    <div class="img-interrogacao-vermelha"></div>\n\
                    <p class="p-config-itens-pers"><span style="font-weight:bold">{{local.qtdPerguntas}}</span> Perguntas</p>\n\
                </div>';
    }
    
    function sessaoHashtag(){
         return'<div class="container-hashs">\
                    <div ng-repeat="linha in local.linhasHashs" ng-if="local.hashtags.length > 0"\n\
                    style="padding-top:10px;" \n\
                    class="row rb-padding-padrao"\n\
                    ng-class="{\'remove-padding-bottom\' : $index != local.hashtags.length - 1,\n\
                    \'padding-mod-hashs\' : $index == 0}">\n\
                        <div class="padding-hashs row box-hashTag" \n\
                        ng-repeat="hash in linha"\n\
                        ng-class="{\'selecionado\' : hash.jaCurtiu == 1}">\n\
                            <div style="background-image:url({{hash.categoriaEndereco}})" class="box-img-hashtag"></div>\n\
                            <p class="p-titulo-hastag"\n\
                            ng-class="{\'selecionado\' : hash.jaCurtiu == 1}">\n\
                                #{{hash.hashtagTitulo}}</br>\n\
                                <span style="font-weight:normal !important;">\n\
                                    {{hash.hashtagQtd}}\n\
                                </span>\n\
                            </p>\n\
                        </div>\n\
                    </div>\n\
                    <div ng-if="local.hashtags.length == 0 || !local.hashtags.length" class="row padding-padrao-contas">\n\
                        <div class="col text-center">\n\
                            <i class="icone-padrao icon ion-alert-circled"></i>\n\
                            <p style="color:#b0b0b0">Nenhuma hashtag relacionada</p>\n\
                        </div>\n\
                    </div>\n\
                </div>\n\
                <hr class="hr-locais"></hr>';
    }
  
    return {
        montar: montar
    };
 }]);



