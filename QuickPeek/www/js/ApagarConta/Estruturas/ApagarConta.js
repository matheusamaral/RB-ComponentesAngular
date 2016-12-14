'use strict';

angular.module('QuickPeek.HTML.ApagarConta', [
])

.factory('ApagarContaHtml', [ function() {
       
    function montar() {
        return '<div class="row bar bar-header bar-positive">\n\
                    <div>\n\
                        <button ng-click="voltarConfig()" class="btn-txt-direita button button-clear">\n\
                            <i class="icon ion-android-arrow-back seta-barra"></i>Apagar minha conta\n\
                        </button>\n\
                    </div>\n\
                </div>\n\
                <div class="row altura-barra rb-padding-padrao">\n\
                    <div name="formTel" style="margin-top:15px !important;" class="col rb-padding-padrao box-flutuante">\n\
                        <div class="row">\n\
                            <p class="p-vermelho-padrao">APAGAR SUA CONTA IRÁ:</p>\n\
                        </div>\n\
                        <div class="row">\n\
                            <ol>\n\
                                <li class="p-cinza-padrao">Apagar sua conta do Quickpeek</li>\n\
                                <li class="p-cinza-padrao">Apagar seu histórico de mensagens</li>\n\
                            </ol>\n\
                        </div>\n\
                    </div>\n\
                </div>\n\
                <div class="row rb-padding-padrao">\n\
                    <div style="margin-top:15px !important;" class="row rb-padding-padrao box-flutuante">\n\
                        <p class="col font-azul-italica">Ao invés disso, deseja apenas mudar o número?</p>\n\
                    </div>\n\
                </div>\n\
                <div class="row rb-padding-padrao">\n\
                    <form name="formTel" style="margin-top:15px !important;" class="col rb-padding-padrao box-flutuante">\n\
                        <div class="row">\n\
                            <p class="p-cinza-padrao">Para apagar a sua conta, confirme o código do país e o número do seu telefone</p>\n\
                        </div>\n\
                        <div class="row">\n\
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
                        <div class="row remove-padding">\n\
                            <p style="padding-top: 7px;" class="p-cinza-padrao">+</p>\n\
                            <md-input-container md-no-float class="rb-input" style="width: 100px;">\n\
                                <input\n\
                                name="ddiAntigo"\n\
                                class="input-padrao font-media"\n\
                                ng-model="dados.ddiAntigo"\n\
                                type="number"\n\
                                ng-required="true">\n\
                                <div ng-if="formTel.ddiAntigo.$touched && formTel.ddiAntigo.$invalid" ng-messages="formTel.ddiAntigo.$error">\n\
                                    <div ng-if="!formTel.ddiAntigo.$error.mask" ng-message="required">Este campo é obrigatório.</div>\n\
                                </div>\n\
                            </md-input-container>\n\
                            <md-input-container class="rb-input">\n\
                                <input\n\
                                ui-mask="(99)99999999?9"\n\
                                ui-mask-placeholder-char="space"\n\
                                minlength="8"\n\
                                name="nCelAntigo"\n\
                                class="input-padrao font-media"\n\
                                ng-model="dados.telAntigo"\n\
                                type="tel"\n\
                                ng-required="true">\n\
                                <div ng-if="formTel.nCelAntigo.$touched && formTel.nCelAntigo.$invalid" ng-messages="formTel.nCelAntigo.$error">\n\
                                    <div ng-if="!formTel.nCelAntigo.$error.mask" ng-message="required">Este campo é obrigatório.</div>\n\
                                    <div ng-if="!formTel.nCelAntigo.$error.required" ng-message="minlength">Digite um telefone neste formato (DD)99999999.</div>\n\
                                </div>\n\
                            </md-input-container>\n\
                        </div>\n\
                        <div class="row remove-padding">\n\
                            <button ng-click="voltarConfig()" class="btn-vermelho col button button-positive">\n\
                                APAGAR MINHA CONTA\n\
                            </button>\n\
                        </div>\n\
                    </form>\n\
                </div>';
    };        
  
    return {
        montar: montar
    };
 }])

.factory('PessoasBloqueadasHtmlPopup', [ function() {
       
    function montar() {
        return '<div class="col remove-padding">\n\
                    oi\n\
                </div>';
    };        
  
    return {
        montar:montar
    };
 }]);



