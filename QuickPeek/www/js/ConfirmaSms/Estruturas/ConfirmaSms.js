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
                            <md-select class="linha-comum" ng-model="dadosSms.ddi">\n\
                                <md-option ng-repeat="ddi in ddis" ng-value="ddi.ddi">\n\
                                    {{ddi.pais}} (+{{ddi.ddi}})\n\
                                </md-option>\n\
                            </md-select>\n\
                        </md-input-container>\n\
                    </div>\n\
                    <div class="rb-padding-padrao remove-padding-bottom">\n\
                        <md-input-container class="rb-input">\n\
                            <input\n\
                            name="codigo"\n\
                            class="input-padrao font-grande"\n\
                            ng-model="dadosSms.codigo"\n\
                            type="tel"\n\
                            ng-required="true">\n\
                            <div ng-if="formCadTel.nCel.$touched && formCadTel.nCel.$invalid" ng-messages="formCadTel.codigo.$error">\n\
                                <div ng-if="!formCadTel.nCel.$error.mask" ng-message="required">Este campo é obrigatório.</div>\n\
                            </div>\n\
                        </md-input-container>\n\
                    </div>\n\
                    <div class="rb-padding-padrao remove-padding-top">\n\
                        <p class="p-medio">\n\
                            Não recebeu um código?</br>\n\
                            <span ng-click="enviarNovoSms()" class="negrito color-amarelo">SOLICITAR NOVO CÓDIGO</span>\n\
                        </p>\n\
                    </div>\n\
                </form>';
    };        
  
    return {
        montar: montar
    };
 }])
 
.factory('ConfirmaSmsRodape', [ function() {
       
    function montar() {
        return '<div class="bar bar-footer bar-positive" layout="row" layout-align="end center">\n\
                    <md-button ng-disabled="formCadTel.$invalid" layout="row" layout-align="center center" ng-click="confirmarSms()" class="btn-rodape remove-box-shadow btn-padrao largura-alto md-primary md-raised">\n\
                        PRÓXIMA <md-icon class="img-seta-proximo"></md-icon>\n\
                    </md-button>\n\
                </div>';
    };        
  
    return {
        montar: montar
    };
 }]);

