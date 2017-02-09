'use strict';

angular.module('QuickPeek.HTML.Categorias', [
])

.factory('CategoriasHtml', [function(){
       
    function montar(){
        return '<div ng-if="!novoLocal" class="config-padding-top row bar bar-header bar-light">\n\
                    <div class="">\n\
                        <p class="p-titulo-barra-cinza">Selecione a categorias</p>\n\
                    </div>\n\
                    <div class="col">\n\
                    </div>\n\
                    <div class="col">\n\
                        <button ng-click="redefinir()" class="btn-txt-direita remove-borda-btn button button-outline button-positive">\n\
                            REDEFINIR\n\
                        </button>\n\
                    </div>\n\
                </div>\n\
                <div ng-if="novoLocal" style="padding-top:14px;" class="row bar bar-header bar-positive">\n\
                    <div class="">\n\
                        <button ng-click="voltarLocais()" class="btn-txt-direita button button-clear">\n\
                            <i class="icon ion-android-arrow-back seta-barra"></i>{{dadosNovoLocal.titulo}}\n\
                        </button>\n\
                    </div>\n\
                </div>\n\
                <div ng-repeat="linhaCategorias in objCategorias"\n\
                ng-class="{\'padding-barra\': $index == 0,\n\
                \'remove-padding-top\' : $index != 0,\n\
                \'padding-footer\' : $index == objCategorias.length - 1,\n\
                \'remove-padding-bottom\' : $index != objCategorias.length - 1}"\n\
                class="row"\n\
                style="padding:5px;">\n\
                    <div\n\
                    ng-click="selecionarCategoria(categoria.indice)"\n\
                    ng-repeat="categoria in linhaCategorias"\n\
                    ng-class="{\'selecionado\' : categoria.selecionado}"\n\
                    class="col box-cat">\n\
                        <div style="background-image:url({{categoria.endereco}})" class="bg-img"></div>\n\
                        <p class="p-preto-cat">{{categoria.titulo}}</p>\n\
                    </div>\n\
                    <div ng-if="linhaCategorias.length < 3" class="box-esqueleto col"></div>\n\
                </div>\n\
                <div class="config-footer-cat bar bar-footer bar-light">\n\
                    <div class="col text-center">\n\
                        <button ng-click="voltar()" class="tamanho-btn-footer btn-txt-direita button button-outline button-positive">\n\
                            CANCELAR\n\
                        </button>\n\
                    </div>\n\
                    <div class="col text-center">\n\
                        <button ng-click="addLocal()" class="tamanho-btn-footer btn-txt-direita button button-positive">\n\
                            APLICAR\n\
                        </button>\n\
                    </div>\n\
                </div>';
    }; 
  
    return {
        montar: montar
    };
 }]);
