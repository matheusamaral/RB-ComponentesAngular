'use strict';

angular.module('QuickPeek.HTML.CadastroDados', [
])

.factory('CadastroDadosHtml', [ function() {
       
    function montar() {
        return '<form name="formCad" class="col" style="padding: 0;">\n\
                    <div ng-if="dados.editando" class="row bar bar-header bar-positive">\n\
                        <div>\n\
                            <button ng-click="voltarPerfil()" class="btn-txt-direita button button-clear">\n\
                                <i class="icon ion-android-arrow-back seta-barra"></i>EDITAR PERFIL\n\
                            </button>\n\
                        </div>\n\
                        <div style="margin-left: auto;">\n\
                            <button ng-click="pular()" ng-disabled="formCad.$invalid" class="btn-txt-direita button button-positive">\n\
                                SALVAR\n\
                            </button>\n\
                        </div>\n\
                    </div>\n\
                    <div ng-class="{\'margin-barra\' : dados.editando}" class="row text-center rb-padding-padrao">\n\
                        <div class="col text-center">\n\
                            <div style="background-size: contain;margin: auto;background-image:url(../img/00.jpg)" class="btn-redondo-grande">\n\
                                <button class="flutuante-btn button" ng-click="voltarSelfie()">\n\
                                    <i class="icon ion-android-camera"></i>\n\
                                </button>\n\
                            </div>\n\
                        </div>\n\
                    </div>\n\
                    <div class="row text-center rb-padding-padrao" style="padding-top:20px">\n\
                        <div class="col">\n\
                            <md-input-container class="rb-input">\n\
                                <label class="font-comun">Nome</label>\n\
                                <input\n\
                                name="nome"\n\
                                class="input-padrao-preto font-grande-cinza"\n\
                                ng-model="dados.nome"\n\
                                type="text"\n\
                                ng-required="true">\n\
                                <div ng-if="formCad.nome.$touched && formCad.nome.$invalid" ng-messages="formCad.nome.$error">\n\
                                    <div ng-if="!formCad.nome.$error.mask" ng-message="required">Este campo é obrigatório.</div>\n\
                                </div>\n\
                            </md-input-container>\n\
                        </div>\n\
                    </div>\n\
                    <div class="row text-center rb-padding-padrao">\n\
                        <div class="col">\n\
                            <md-input-container class="rb-input">\n\
                                <label class="font-comun">Data de nascimento</label>\n\
                                <input\n\
                                name="dtNasc"\n\
                                ui-mask="99/99/9999"\n\
                                pattern="(0[1-9]|1[0-9]|2[0-9]|3[01]).(0[1-9]|1[012]).[0-9]{4}"\n\
                                ui-mask-placeholder-char="space"\n\
                                class="input-padrao-preto font-grande-cinza"\n\
                                ng-model="dados.nascimento"\n\
                                type="text"\n\
                                ng-required="true">\n\
                                <div ng-if="formCad.dtNasc.$touched && formCad.dtNasc.$invalid" ng-messages="formCad.dtNasc.$error">\n\
                                    <div ng-if="!formCad.dtNasc.$error.pattern" ng-message="required">Este campo é obrigatório.</div>\n\
                                    <div ng-if="!formCad.dtNasc.$error" ng-message="pattern">Digite uma data neste formato: "DD/MM/AA".</div>\n\
                                </div>\n\
                            </md-input-container>\n\
                        </div>\n\
                    </div>\n\
                    <div class="row rb-padding-padrao">\n\
                        <div class="col">\n\
                            <md-input-container class="select-comum">\n\
                                <label class="font-comun">Gênero</label>\n\
                                <md-select style="width:100%" class="linha-comum" ng-model="dados.generoId">\n\
                                    <md-option ng-repeat="gen in genero" ng-value="gen.id">\n\
                                        {{gen.titulo}}\n\
                                    </md-option>\n\
                                </md-select>\n\
                            </md-input-container>\n\
                        </div>\n\
                    </div>\n\
                    <div ng-if="!dados.editando" class="row rb-padding-padrao box-avatar" style="padding-top:20px !important;">\n\
                        <div class="col">\n\
                            <div class="row text-center">\n\
                                <p class="col font-preta">Seu avatar anônimo <span ng-click="showAlert()" class="box-duvidas ion-help"></span></p>\n\
                            </div>\n\
                            <div class="row text-center">\n\
                                <div style="margin: auto;background-image: url(img/Animais/anteater.svg)" class="btn-redondo-medio box-img-cad">\n\
                                    <button ng-click="irAvatares()" class="flutuante-btn-medio button">\n\
                                        <i class="icon ion-edit"></i>\n\
                                    </button>\n\
                                </div>\n\
                            </div>\n\
                            <div class="row text-center">\n\
                                <p class="col font-preta negrito">Tatu Feliz</p>\n\
                            </div>\n\
                        </div>\n\
                    </div>\n\
                </form>\n\
                <div ng-if="!dados.editando" class="bar barra-footer bar-positive" layout="row" layout-align="end center">\n\
                    <div class="col col-center">\n\
                    </div>\n\
                    <div class="col col-center col-50">\n\
                        <button ng-click="cadastrar()" class="col btn-txt-direita button button-clear">\n\
                            PRÓXIMA <i class="icon ion-android-arrow-forward"></i>\n\
                        </button>\n\
                    </div>\n\
                </div>';
    };        
  
    return {
        montar: montar
    };
 }])
 
.factory('CadastroDadosRodape', [ function() {
       
    function montar() {
        return '';
    };        
  
    return {
        montar: montar
    };
 }]);

