'use strict';

angular.module('QuickPeek.HTML.ConfirmaSms', [
])

.factory('ConfirmaSmsHtml', [ function() {
       
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
                    <div class="rb-padding-padrao remove-padding-bottom">\n\
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
                        <md-input-container style="position:relative" class="rb-input">\n\
                            <input\n\
                            name="codigo"\n\
                            class="input-padrao font-grande"\n\
                            ng-model="dadosSms.codigo"\n\
                            type="tel"\n\
                            ng-required="true">\n\
                            <div ng-if="formCadTel.nCel.$touched && formCadTel.nCel.$invalid" ng-messages="formCadTel.codigo.$error">\n\
                                <div ng-if="!formCadTel.nCel.$error.mask" ng-message="required">Este campo é obrigatório.</div>\n\
                            </div>\n\
                            <p ng-if="!dadosSms.codigo" class="msg-erro">Não foi possível verificar automaticamente seu SMS, por favor, verifique manualmente</p>\n\
                        </md-input-container>\n\
                    </div>\n\
                    <div class="rb-padding-padrao remove-padding-top">\n\
                        <p class="p-medio">\n\
                            Não recebeu um código?</br>\n\
                            <span ng-click="enviarNovoSms()" class="negrito color-amarelo">SOLICITAR NOVO CÓDIGO</span>\n\
                        </p>\n\
                    </div>\n\
                </form>\n\
                <div class="bar bar-footer bar-positive" layout="row" layout-align="end center">\n\
                    <!--<button ng-disabled="formCadTel.$invalid" ng-click="confirmarSms()" class="col btn-txt-direita button button-clear">\n\
                        PRÓXIMA <i class="icon ion-android-arrow-forward"></i>\n\
                    </button>-->\n\
                    <button ng-disabled="formCadTel.$invalid" ng-click="confirmarSms()" class="col btn-txt-direita button button-clear">\n\
                        PRÓXIMA <i class="icon ion-android-arrow-forward"></i>\n\
                    </button>\n\
                </div>';
    };        
  
    return {
        montar: montar
    };
 }])
 
.factory('ConfirmaSmsRodape', [ function() {
       
    function montar() {
        return '';
    };        
  
    return {
        montar: montar
    };
 }]);

