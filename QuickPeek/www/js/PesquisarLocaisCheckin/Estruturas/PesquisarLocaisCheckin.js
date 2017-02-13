'use strict';

angular.module('QuickPeek.HTML.PesquisarLocaisCheckin', [
])

.factory('PesquisarLocaisCheckinHtml', [ function() {
       
    function montar(){
        return '<div class="header-pesquisa has-tabs-top row bar bar-header">\n\
                    <div class="row">\n\
                        <button style="padding-top: 2px;" ng-click="voltarCheckin()" class="btn-txt-direita button button-clear">\n\
                            <i class="icone-dourado icon ion-android-arrow-back seta-barra"></i>\n\
                        </button>\n\
                        <input ng-keyup="pesquisarLocal()" ng-model="dados.nome" class="input-pesquisa" type="text" placeholder="Pesquisar locais...">\n\
                    </div>\n\
                </div>'+sessaoUltimosLocais();
    };  
    
    function sessaoUltimosLocais(){
         return adicionarLocal()+'<div style="padding-top:65px;" id="container-infinite-scrol">\
                    <div id="paiContainerScrol" style="overflow: auto;height:{{alturaTela}}px">\n\
                        <div>\n\
                            <div ng-click="irLocal(local)" ng-repeat="local in locais" class="row barra-local padding-top-personalizado rb-padding-padrao">\n\
                                <div class="col">\n\
                                    <p class="p-titulo-local">{{local.titulo}}</p>\n\
                                </div>\n\
                            </div>\n\
                        </div>\n\
                    </div>\n\
                </div>';
    }
    
    function adicionarLocal(){
        return'<div style="padding-top:65px;" class="rb-padding-padrao" ng-if="dados.termoBuscado && locais.length == 0">\n\
                <p class="p-preto rb-padding-padrao">O local <span class="negrito">"{{dados.termoBuscado}}"</span> não foi encontrado</p>\n\
                <button ng-click="addLocal()" style="display: block;margin: auto;margin-top: 15px;" class="button button-positive">\n\
                    CRIAR ESTE LOCAL\n\
                </button>\n\
            </div>';
    }
  
    return {
        montar: montar
    };
 }]);



