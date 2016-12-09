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
                            <md-select class="linha-comum" ng-model="dadosCel.ddi">\n\
                                <md-option ng-repeat="ddi in ddis" ng-value="ddi.ddi">\n\
                                    {{ddi.pais}} (+{{ddi.ddi}})\n\
                                </md-option>\n\
                            </md-select>\n\
                        </md-input-container>\n\
                    </div>\n\
                    <div class="rb-padding-padrao remove-padding-bottom">\n\
                        <md-input-container class="rb-input">\n\
                            <label class="font-grande">Digite seu número</label>\n\
                            <input\n\
                            ui-mask="(99)99999999?9"\n\
                            ui-mask-placeholder-char="space"\n\
                            minlength="8"\n\
                            name="nCel"\n\
                            class="input-padrao font-grande"\n\
                            ng-model="dadosCel.numero"\n\
                            type="tel"\n\
                            ng-required="true">\n\
                            <div ng-if="formCadTel.nCel.$touched && formCadTel.nCel.$invalid" ng-messages="formCadTel.nCel.$error">\n\
                                <div ng-if="!formCadTel.nCel.$error.mask" ng-message="required">Este campo é obrigatório.</div>\n\
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
                    <md-button ng-disabled="formCadTel.$invalid" layout="row" layout-align="center center" ng-click="cadastrarNumero()" class="btn-rodape remove-box-shadow btn-padrao largura-alto md-primary md-raised">\n\
                        PRÓXIMA <md-icon class="img-seta-proximo"></md-icon>\n\
                    </md-button>\n\
                </div>';
    };        
  
    return {
        montar: montar
    };
 }]);

