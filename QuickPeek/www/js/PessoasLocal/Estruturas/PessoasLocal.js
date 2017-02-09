'use strict';

angular.module('QuickPeek.HTML.PessoasLocal', [
])

.factory('PessoasLocalHtml', [ function() {
       
    function montar() {
        return '<div class="row bar bar-header bar-positive">\n\
                    <div>\n\
                        <button ng-click="voltar()" class="btn-txt-direita button button-clear">\n\
                            <i class="icon ion-android-arrow-back seta-barra"></i>{{dados.qtd}} Pessoas\n\
                        </button>\n\
                    </div>\n\
                </div>\n\
                <div id="container-infinite-scrol">\n\
                    <div infinite-scroll="maisPessoas()" infinite-scroll-distance="0" infinite-scroll-container="\'#container-infinite-scrol\'">\n\
                        <div ng-repeat="pessoa in dados.pessoas" \n\
                        class="row remove-padding-row divide-sessoes corpo-lista-config padding-padrao-contas"\n\
                        ng-class="{\'padding-top-bloqueados\' : $index == 0}"\n\
                        ng-if="dados.pessoas.length > 0"\n\
                        ng-click="irPerfil(pessoa.usuarioId)">\n\
                            <div class="col-25 remove-padding">\n\
                                <div ng-class="{\'borda-dourada\' : dadosUser.usuarioId == pessoa.usuarioId}" style="background-image:url({{pessoa.endereco}})" class="btn-redondo-medio"></div>\n\
                            </div>\n\
                            <div class="col remove-padding col-center">\n\
                                <p class="font-preta negrito text-left">{{pessoa.usuarioNome}}</p>\n\
                            </div>\n\
                            <div class="remove-padding col-center">\n\
                                <button ng-click="seguir(pessoa.usuarioId,$event)" ng-if="dadosUser.usuarioId != pessoa.usuarioId && pessoa.seguindo == 0" class="btn-seguidores button button-outline button-positive">\n\
                                    <i class="icon ion-ios-plus-empty"></i>Seguir\n\
                                </button>\n\
                                <button ng-click="cancelarSolicitacao(pessoa.seguirId,$event)" ng-if="dadosUser.usuarioId != pessoa.usuarioId && pessoa.seguindo == 2" class="btn-seguidores button button-outline button-positive">\n\
                                    Solicitado\n\
                                </button>\n\
                                <button ng-disabled="dadosUser.usuarioId == pessoa.usuarioId" ng-click="seguir(pessoa.usuarioId)" ng-if="dadosUser.usuarioId == pessoa.usuarioId" class="btn-voce btn-seguidores button button-outline button-positive">\n\
                                    Vocẽ\n\
                                </button>\n\
                                <button ng-click="deixarSeguir(pessoa.usuarioId,$event)" ng-if="dadosUser.usuarioId != pessoa.usuarioId && pessoa.seguindo == 1" class="btn-seguidores button button button-balanced">\n\
                                    <i class="icon ion-checkmark"></i>Seguindo\n\
                                </button>\n\
                            </div>\n\
                        </div>\n\
                        <div ng-if="dados.pessoas.length == 0" class="padding-top-bloqueados row padding-padrao-contas">\n\
                            <div class="col text-center">\n\
                                <i class="icone-padrao icon ion-alert-circled"></i>\n\
                                <p style="color:#b0b0b0">Nenhuma pessoa no local, ainda...</p>\n\
                            </div>\n\
                        </div>\n\
                    </div>\n\
                </div>';
    };        
  
    return {
        montar: montar
    };
 }]);



