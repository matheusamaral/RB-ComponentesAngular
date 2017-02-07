'use strict';

angular.module('QuickPeek.HTML.ConfirmaNumero', [
])

.factory('ConfirmaNumeroHtml', [ function() {
       
    function montar() {
        return '<div class="rb-padding-padrao remove-padding-bottom rb-padding-top-inicial">\n\
                    <p class="negrito p-cinza font-19-px">Verifique seu número</p>\n\
                </div>\n\
                <div class="rb-padding-padrao remove-padding-bottom padding-titulo-conteudo">\n\
                    <p class="p-cinza-claro limita-espaco-texto font-16-px">\n\
                        Você receberá um código por SMS.</br>\n\
                        Talvez sejam cobradas tarifas da operadora.\n\
                    </p>\n\
                </div>\n\
                <form name="formCadTel">\n\
                    <div class="rb-padding-padrao">\n\
                        <md-input-container>\n\
                            <md-autocomplete ng-required="true" class="rb-autocomplete"\n\
                                md-selected-item="ddiAutoComplete.selectedItem"\n\
                                md-search-text-change="ddiAutoComplete.searchTextChange(ddiAutoComplete.searchText)"\n\
                                md-search-text="ddiAutoComplete.searchText"\n\
                                md-selected-item-change="ddiAutoComplete.selectedItemChange(item,{obj:\'dadosCel\',attr:\'ddi\'});"\n\
                                md-items="item in ddiAutoComplete.querySearch(\'ddiAutoComplete\',ddiAutoComplete.searchText)"\n\
                                md-item-text="item.display"\n\
                                md-min-length="3"\n\
                                md-no-cache="true"\n\
                                placeholder=""\n\
                                id="auto-cp-nome">\n\
                                <md-item-template>\n\
                                    <span md-highlight-text="ddiAutoComplete.searchText">{{item.display}}</span>\n\
                                </md-item-template>\n\
                                <md-not-found>\n\
                                    <div class="">\n\
                                        <p>Não foi encontrado nem um valor</p>\n\
                                    </div>\n\
                                </md-not-found>\n\
                            </md-autocomplete>\n\
                        </md-input-container>\n\
                    </div>\n\
                    <div class="rb-padding-padrao remove-padding-bottom">\n\
                        <md-input-container class="rb-input">\n\
                            <label class="font-grande">Digite seu número</label>\n\
                            <input\n\
                            minlength="12"\n\
                            name="nCel"\n\
                            id="nCel"\n\
                            class="input-padrao font-grande"\n\
                            ng-model="dadosCel.numero"\n\
                            type="tel"\n\
                            ng-required="true">\n\
                            <div ng-if="formCadTel.nCel.$touched && formCadTel.nCel.$invalid" ng-messages="formCadTel.nCel.$error">\n\
                                <div ng-if="!formCadTel.nCel.$error.minlength" ng-message="required">Este campo é obrigatório.</div>\n\
                                <div ng-if="!formCadTel.nCel.$error.required" ng-message="minlength">Digite um telefone neste formato (DD)99999999.</div>\n\
                            </div>\n\
                        </md-input-container>\n\
                    </div>\n\
                    <div class="rb-padding-padrao remove-padding-top">\n\
                        <p class="p-pequeno">Ao se inscrever, você concorda com os <span class="font-amarela">Termos e Condições</span> e com a <span class="font-amarela">Política de privacidade</span>.</p>\n\
                    </div>\n\
                </form>';
    };        
  
    return {
        montar: montar
    };
 }])
 
.factory('ConfirmaNumeroRodape', [ function() {
       
    function montar() {
        return '<div class="bar bar-footer bar-positive" layout="row" layout-align="end center">\n\
                    <!--<button ng-disabled="formCadTel.$invalid" ng-click="cadastrarNumero()" class="col btn-txt-direita button button-clear">\n\
                        PRÓXIMA <i class="icon ion-android-arrow-forward"></i>\n\
                    </button>-->\n\
                    <button ng-click="teste()" class="col btn-txt-direita button button-clear">\n\
                        PRÓXIMA <i class="icon ion-android-arrow-forward"></i>\n\
                    </button>\n\
                </div>';
    };        
  
    return {
        montar: montar
    };
 }]);

