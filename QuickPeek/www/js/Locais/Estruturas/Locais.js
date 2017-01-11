'use strict';

angular.module('QuickPeek.HTML.Locais', [
])

.factory('LocaisHtml', [ function() {
       
    function montar(){
        return '<div style="z-index: 50;" class="row bar bar-header bar-positive">\n\
                    <div>\n\
                        <button ng-click="voltarMapa()" class="btn-txt-direita button button-clear">\n\
                            <i class="icon ion-android-arrow-back seta-barra"></i>Área no mapa\n\
                        </button>\n\
                    </div>\n\
                </div>\n\
                <div id="container-infinite-scrol">\n\
                    <div infinite-scroll="carregarLocais()" infinite-scroll-distance="1" infinite-scroll-container="\'#container-infinite-scrol\'">\n\
                        <div ng-repeat="local in locais">\n\
                            <div ng-class="{\'padding-top-barra\' : $index == 0}"\n\
                            class="row barra-local">\n\
                                <div class="col">\n\
                                    <p class="p-titulo-local">{{local.dados.localNome}}</p>\n\
                                    <div ng-if="local.dados.checkIn == 1" class="row remove-padding">\n\
                                        <i class="icon ion-ios-location icone-dourado"></i><span class="span-dourado">Seu local atual</span>\n\
                                    </div>\n\
                                    <div ng-if="local.dados.distancia >=1" style="padding-top:3px !important" ng-if="local.dados.checkIn != 1" class="row remove-padding">\n\
                                        <i class="icon ion-ios-location p-titulo-hastag"></i><span class="p-titulo-hastag">a {{local.dados.distancia.split(\'.\')[0]}}km de distância</span>\n\
                                    </div>\n\
                                    <div ng-if="local.dados.distancia < 1" style="padding-top:3px !important" ng-if="local.dados.checkIn != 1" class="row remove-padding">\n\
                                        <i class="icon ion-ios-location p-titulo-hastag"></i><span class="p-titulo-hastag">a {{String((1000 * (parseFloat(0.01154544)))).split(\'.\')[0]}}m de distância</span>\n\
                                    </div>\n\
                                </div>\n\
                                <div class="text-right">\n\
                                    <md-menu>\n\
                                        <md-button class="md-icon-button" ng-click="$mdOpenMenu($event)">\n\
                                            <md-icon class="icone-tamanho-personalizado ion-android-more-vertical"></md-icon>\n\
                                        </md-button>\n\
                                        <md-menu-content width="4">\n\
                                            <md-menu-item>\n\
                                                <md-button ng-click="irCheckin(true)">\n\
                                                    Alterar localização\n\
                                                </md-button>\n\
                                            </md-menu-item>\n\
                                            <md-menu-item>\n\
                                                <md-button ng-click="checkInLocal(local)">\n\
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
                                    <div ng-if="local.qtdPerguntas > 0" ng-click="irPerguntas(local.dados.localId)" class="col remove-padding">\n\
                                        '+sessaoPerguntas()+'\n\
                                    </div>\n\
                                </div>\n\
                            </div>\n\
                            <hr class="hr-locais"></hr>\n\
                            '+sessaoBtns()+'\n\
                        </div>\n\
                    </div>\n\
                </div>'+corpoTutorial();
    };
    
    function sessaoBtns(){
         return'<div class="container-btns">\n\
                    <div class="row" style="padding-bottom: 10px !important;">\n\
                        <div class="col text-center" style="position:relative">\n\
                            '+tutorial5()+'\n\
                            <button ng-class="{\'z-index-locais\' : dadosUser.tutorial == 5}" ng-click="" class="btn-txt-direita button button-positive">\n\
                                <i class="icon ion-help-circled seta-barra"></i>Perguntar\n\
                            </button>\n\
                        </div>\n\
                        <div class="col text-center">\n\
                            '+tutorial6()+'\n\
                            <button ng-class="{\'z-index-locais\' : dadosUser.tutorial == 6}" ng-click="voltarMapa()" class="btn-txt-direita button button-positive">\n\
                                <i class="icon ion-edit seta-barra"></i>Publicar\n\
                            </button>\n\
                        </div>\n\
                    </div>\n\
                </div>';
    }
    
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
                    '+tutorial4()+'\
                    <div>\n\
                        <div \n\
                        ng-repeat="pessoa in local.pessoas"\n\
                        ng-class="{\'borda-dourada-fina\' : pessoa.usuarioId == dadosUser.usuarioId}"\n\
                        class="moldura-foto-redonda pos{{$index+1}} posicao-{{local.pessoas.length}}-foto-quadrada"\n\
                        style="background-image:url({{pessoa.endereco}});z-index:{{20+ (local.pessoas.length - $index)}}">\n\
                        </div>\n\
                        <p ng-class="{\'font-branca\' : dadosUser.tutorial == 4}" class="elevado-locais p-config-itens"><span style="font-weight:bold">{{local.qtdPessoas}}</span> Pessoas</p>\n\
                    </div>\n\
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
                        <div class="padding-hashs row box-hashTag"\n\
                        ng-click="curtirHashtag(hash,local.dados.localId)"\n\
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
    
    function tutorial4(){
         return'<div ng-if="$index == 0 && dadosUser.tutorial == 4">\n\
                    <div class="tutorial-4-locais tutorial-mapa-4">\n\
                    </div>\n\
                    <p class="negrito posiciona-p-tutorial4">Converse diretamente</p>\n\
                    <p class="posiciona-p-tutorial4-4">Aqui vocẽ encontra as pessoas que </br>estão agora neste local!</p>\n\
                    <button ng-click="attTutorial()" class="btn-mapa-tutorial-4 button button-clear button-positive">\n\
                        PULAR<i class="icon ion-chevron-right"></i>\n\
                    </button>\n\
                    <md-icon class="icone-tutorial-4 ion-android-arrow-down"></md-icon>\n\
                </div>';
    }
    
    function tutorial5(){
         return'<div ng-if="$index == 0 && dadosUser.tutorial == 5" style="position: absolute;">\n\
                    <div class="tutorial-5-locais tutorial-mapa-5">\n\
                    </div>\n\
                    <p class="negrito posiciona-p-tutorial5">Quer saber algo do local</br> antes de ir?</p>\n\
                    <p class="posiciona-p-tutorial5-5">Faça uma pergunta para todos que</br> estão lá agora!</p>\n\
                    <button ng-click="attTutorial()" class="btn-mapa-tutorial-5 button button-clear button-positive">\n\
                        PULAR<i class="icon ion-chevron-right"></i>\n\
                    </button>\n\
                    <md-icon class="icone-tutorial-5 ion-android-arrow-down"></md-icon>\n\
                </div>';
    }
    
    function tutorial6(){
         return'<div ng-if="$index == 0 && dadosUser.tutorial == 6" style="position: absolute;">\n\
                    <div class="tutorial-6-locais tutorial-mapa-6">\n\
                    </div>\n\
                    <p class="negrito posiciona-p-tutorial6">Diga como está o local</p>\n\
                    <p class="posiciona-p-tutorial6-6">Esta função permite compartilhar com</br> as pessoas como está o local agora!</p>\n\
                    <button ng-click="attTutorial()" class="btn-mapa-tutorial-6 button button-clear button-positive">\n\
                        PULAR<i class="icon ion-chevron-right"></i>\n\
                    </button>\n\
                    <md-icon class="icone-tutorial-5 ion-android-arrow-down"></md-icon>\n\
                </div>';
    }
    
    function corpoTutorial(){
        return '<div ng-if="dadosUser.tutorial == 4 || dadosUser.tutorial == 5 || dadosUser.tutorial == 6" class="row rb-padding container-tutorial">\n\
                </div>';
    }
  
    return {
        montar: montar
    };
 }]);



