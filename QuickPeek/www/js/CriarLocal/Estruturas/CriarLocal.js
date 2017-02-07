'use strict';

angular.module('QuickPeek.HTML.CriarLocal', [
])

.factory('CriarLocalHtml', [ function() {
       
    function montar() {
        return '<div class="row bar bar-header bar-positive">\n\
                    <div class="col remove-padding text-left">\n\
                        <button ng-click="voltarLocais()" class="btn-txt-direita button button-clear">\n\
                            <i class="icon ion-android-arrow-back seta-barra"></i>Criar um local\n\
                        </button>\n\
                    </div>\n\
                    <div class="col remove-padding text-right">\n\
                        <button ng-disabled="formCad.txtResp.$invalid" style="margin-right: 20px;" ng-click="selecionarCat()" class="btn-txt-direita button button-clear">\n\
                            Avançar\n\
                        </button>\n\
                    </div>\n\
                </div>\n\
                <form name="formCad" class="row" style="padding-top:65px !important">\n\
                    <textarea placeholder="Escolha um nome para o local"\n\
                    class="sem-borda"\n\
                    rows="5"\n\
                    name="txtResp"\n\
                    type="text"\n\
                    required \n\
                    ng-model="dados.nome">\n\
                    </textarea>\n\
                </div>';
    };        
  
    return {
        montar: montar
    };
 }]);



