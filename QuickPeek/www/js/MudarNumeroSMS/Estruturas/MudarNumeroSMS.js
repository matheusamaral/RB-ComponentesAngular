'use strict';

angular.module('QuickPeek.HTML.MudarNumeroSMS', [
])

.factory('MudarNumeroSMSHtml', [ function() {
       
    function montar() {
        return '<div class="row bar bar-header bar-positive">\n\
                    <div>\n\
                        <button ng-click="voltarNumero()" class="btn-txt-direita button button-clear">\n\
                            <i class="icon ion-android-arrow-back seta-barra"></i>Verificando +{{dados.telefoneNovo}}\n\
                        </button>\n\
                    </div>\n\
                </div>\n\
                <div class="col altura-barra rb-padding-padrao">\n\
                    <form name="formTel" style="margin-top:15px !important;" class="col rb-padding-padrao box-flutuante">\n\
                        <div class="row">\n\
                            <p class="p-cinza-padrao">Aguardando a detecção automática do SMS enviado para <span class="negrito">+{{dados.telefoneNovo}}</span></p>\n\
                        </div>\n\
                        <p class="p-dourado-sublinhado" ng-click="voltar()">Número errado?</p>\n\
                        <div class="col remove-padding">\n\
                            <md-input-container md-no-float class="config-input-sms rb-input" style="width: 100px;">\n\
                                <input\n\
                                placeholder="--- ---"\n\
                                name="ddiAntigo"\n\
                                class="placeholder-sms input-padrao font-media"\n\
                                ng-model="dados.codigo"\n\
                                type="number"\n\
                                ng-required="true">\n\
                                <div ng-if="formTel.ddiAntigo.$touched && formTel.ddiAntigo.$invalid" ng-messages="formTel.ddiAntigo.$error">\n\
                                    <div ng-if="!formTel.ddiAntigo.$error.mask" ng-message="required">Este campo é obrigatório.</div>\n\
                                </div>\n\
                            </md-input-container>\n\
                            <p class="p-cinza-padrao pesqueno">Insira o código de 6 dígitos</p>\n\
                        </div>\n\
                    </form>\n\
                    <div class="row">\n\
                        <button ng-click="confirmarSms()" style="color: #909090;" class="button ion-chatbox button-clear button-light">\n\
                            Reenviar SMS\n\
                        </button>\n\
                    </div>\n\
                </div>';
    };        
  
    return {
        montar: montar
    };
 }]);

