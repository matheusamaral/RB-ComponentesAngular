'use strict';

angular.module('QuickPeek.HTML.PerguntasLocal', [
])

.factory('PerguntasLocalHtml', [ function() {
       
    function montar() {
        return '<div class="row bar bar-header bar-positive">\n\
                    <div>\n\
                        <button ng-click="voltarLocais()" class="btn-txt-direita button button-clear">\n\
                            <i class="icon ion-android-arrow-back seta-barra"></i>{{dados.perguntas.length}} Perguntas\n\
                        </button>\n\
                    </div>\n\
                </div>\n\
                <div ng-repeat="pergunta in dados.perguntas" ng-click="responder(pergunta.id)"\n\
                class="position-relative row remove-padding-row corpo-lista-config padding-padrao-contas"\n\
                ng-class="{\'padding-top-bloqueados\' : $index == 0}"\n\
                ng-if="dados.perguntas.length > 0">\n\
                    <div class="display-table-vertical col-20 remove-padding">\n\
                        <div ng-class="{\'borda-dourada\' : dadosUser.usuarioId == pergunta.usuarioId}" style="background-image:url({{pergunta.endereco}})" class="btn-redondo-medio"></div>\n\
                    </div>\n\
                    <div style="padding-left:10px !important;padding-right:10px !important;" class="col-50 remove-padding col-center">\n\
                        <p style="padding-bottom:7px;padding-top:4px;" ng-if="dadosUser.usuarioId != pergunta.usuarioId" class="font-preta negrito text-left">{{pergunta.nome}}</p>\n\
                        <p ng-if="dadosUser.usuarioId == pergunta.usuarioId" class="font-preta negrito text-left">Vocẽ</p>\n\
                        <p class="font-cinza text-left">{{pergunta.titulo}}</p>\n\
                    </div>\n\
                    <div ng-if="pergunta.respostas > 0" class="col remove-padding col-center">\n\
                        <p ng-class="{\'font-verde-pequeno\' : dadosUser.usuarioId != pergunta.usuarioId,\n\
                        \'font-cinza-pequeno\' : dadosUser.usuarioId == pergunta.usuarioId}">{{pergunta.momento.split(\' \')[1].split(\':\')[0]}}:{{pergunta.momento.split(\' \')[1].split(\':\')[1]}}</p>\n\
                        <div ng-class="{\'font-verde-pequeno\' : dadosUser.usuarioId != pergunta.usuarioId,\n\
                        \'font-cinza-pequeno\' : dadosUser.usuarioId == pergunta.usuarioId}"><span class="redondo-verde">{{pergunta.respostas}}</span></div>\n\
                    </div>\n\
                    <div style="padding-left:10px;" ng-if="pergunta.respostas == 0" class="col-25 remove-padding col-center">\n\
                        <p class="font-dourada-pequena">{{pergunta.momento.split(\' \')[1].split(\':\')[0]}}:{{pergunta.momento.split(\' \')[1].split(\':\')[1]}}</p>\n\
                        <div class=""><span class="redondo-dourado">Responda primeiro</span></div>\n\
                    </div>\n\
                    <hr class="hr-perg"></hr>\n\
                </div>\n\
                <div ng-if="dados.perguntas.length == 0" class="padding-top-bloqueados row padding-padrao-contas">\n\
                    <div class="col text-center">\n\
                        <i class="icone-padrao icon ion-alert-circled"></i>\n\
                        <p style="color:#b0b0b0">Nenhuma pergunta no local, ainda...</p>\n\
                    </div>\n\
                </div>';
    };        
  
    return {
        montar: montar
    };
 }]);



