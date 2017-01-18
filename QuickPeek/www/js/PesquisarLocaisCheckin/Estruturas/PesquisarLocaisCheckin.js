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
         return'<div style="padding-top:65px;" id="container-infinite-scrol">\
                    <div infinite-scroll="pesquisarLocalScroll()" infinite-scroll-distance="0" infinite-scroll-container="\'#container-infinite-scrol\'">\n\
                        <div ng-click="irLocal(local)" ng-repeat="local in locais" class="row barra-local padding-top-personalizado rb-padding-padrao">\n\
                            <div class="col">\n\
                                <p class="p-titulo-local">{{local.titulo}}</p>\n\
                            </div>\n\
                        </div>\n\
                    </div>\n\
                </div>';
    }
  
    return {
        montar: montar
    };
 }]);



