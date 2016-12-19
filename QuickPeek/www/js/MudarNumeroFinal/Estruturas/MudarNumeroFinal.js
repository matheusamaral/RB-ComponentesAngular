'use strict';

angular.module('QuickPeek.HTML.MudarNumeroFinal', [
])

.factory('MudarNumeroFinalHtml', [ function() {
       
    function montar() {
        return '<div class="row bar bar-header bar-positive">\n\
                    <div>\n\
                        <button ng-click="voltarConfig()" class="btn-txt-direita button button-clear">\n\
                            <i class="icon ion-android-arrow-back seta-barra"></i>Mudar n°\n\
                        </button>\n\
                    </div>\n\
                    <div style="margin-left: auto;">\n\
                        <button ng-click="pular()" ng-disabled="formTel.$invalid" class="btn-txt-direita button button-clear">\n\
                            <i class="icon ion-checkmark seta-barra"></i>Concluir\n\
                        </button>\n\
                    </div>\n\
                </div>\n\
                <div class="row altura-barra rb-padding-padrao">\n\
                    <form name="formTel" style="margin-top:15px !important;" class="col rb-padding-padrao box-flutuante">\n\
                        <div class="row">\n\
                            <p class="p-cinza-padrao">Por favor, informe o código do país e número do telefone antigo:</p>\n\
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
                        <div class="row" style="margin-top: 20px !important;">\n\
                            <p class="p-cinza-padrao">Por favor, informe o código do país e número do telefone novo:</p>\n\
                        </div>\n\
                        <div class="row remove-padding">\n\
                            <p style="padding-top: 7px;" class="p-cinza-padrao">+</p>\n\
                            <md-input-container md-no-float class="rb-input" style="width: 100px;">\n\
                                <input\n\
                                name="ddiNovo"\n\
                                class="input-padrao font-media"\n\
                                ng-model="dados.ddiNovo"\n\
                                type="number"\n\
                                ng-required="true">\n\
                                <div ng-if="formTel.ddiNovo.$touched && formTel.ddiNovo.$invalid" ng-messages="formTel.ddiNovo.$error">\n\
                                    <div ng-if="!formTel.ddiNovo.$error.mask" ng-message="required">Este campo é obrigatório.</div>\n\
                                </div>\n\
                            </md-input-container>\n\
                            <md-input-container class="rb-input">\n\
                                <input\n\
                                ui-mask="(99)99999999?9"\n\
                                ui-mask-placeholder-char="space"\n\
                                minlength="8"\n\
                                name="nCelNovo"\n\
                                class="input-padrao font-media"\n\
                                ng-model="dados.telNovo"\n\
                                type="tel"\n\
                                ng-required="true">\n\
                                <div ng-if="formTel.nCelNovo.$touched && formTel.nCelNovo.$invalid" ng-messages="formTel.nCelNovo.$error">\n\
                                    <div ng-if="!formTel.nCelNovo.$error.mask" ng-message="required">Este campo é obrigatório.</div>\n\
                                    <div ng-if="!formTel.nCelNovo.$error.required" ng-message="minlength">Digite um telefone neste formato (DD)99999999.</div>\n\
                                </div>\n\
                            </md-input-container>\n\
                        </div>\n\
                    </form>\n\
                </div>';
    };        
  
    return {
        montar: montar
    };
 }]);

