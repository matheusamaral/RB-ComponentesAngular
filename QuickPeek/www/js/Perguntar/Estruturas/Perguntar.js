'use strict';

angular.module('QuickPeek.HTML.Perguntar', [
])

.factory('PerguntarHtml', [ function() {
       
    function montar() {
        return '<div class="row bar bar-header bar-positive">\n\
                    <div class="col remove-padding text-left">\n\
                        <button ng-click="voltarLocais()" class="btn-txt-direita button button-clear">\n\
                            <i class="icon ion-android-arrow-back seta-barra"></i>{{dados.perguntas.length}} Perguntar\n\
                        </button>\n\
                    </div>\n\
                    <div class="col remove-padding text-right">\n\
                        <button ng-disabled="formCad.txtResp.$invalid" style="margin-right: 20px;" ng-click="perguntar()" class="btn-txt-direita button button-clear">\n\
                            Enviar\n\
                        </button>\n\
                    </div>\n\
                </div>\n\
                <div class="row" style="padding-top:70px !important">\n\
                    <div ng-if="dados.privacidade != 3" class="img-circular-grande-perguntar margin-img"\n\
                    style="background-image:url({{dadosUser.usuarioEndereco}})"></div>\n\
                    <div ng-if="dados.privacidade == 3" class="img-circular-grande-perguntar margin-img"\n\
                    style="background-image:url({{dadosUser.avatarEndereco}})"></div>\n\
                    <div class="col remove-padding" style="margin-left: 10px;">\n\
                        <p ng-if="dados.privacidade != 3" class="negrito titular-pergunta-preto">{{dadosUser.usuarioNome}}</p>\n\
                        <p ng-if="dados.privacidade == 3" class="negrito titular-pergunta-preto">{{dadosUser.avatarNome}}</p>\n\
                        <div class="container-select row remove-padding">\n\
                            <md-icon ng-if="dados.privacidade == 1" style="margin-top:7px !important;margin-left:10px !important;margin: 0;margin-right: 10px;color:#ffb800;font-size:22px !important" class="ion-earth"></md-icon>\n\
                            <md-icon ng-if="dados.privacidade == 2" style="margin-top:7px !important;margin-left:10px !important;margin: 0;margin-right: 10px;color:#ffb800;font-size:22px !important" class="ion-person-stalker"></md-icon>\n\
                            <md-icon ng-if="dados.privacidade == 3" style="margin-top:7px !important;margin-left:10px !important;margin: 0;margin-right: 10px;color:#ffb800;font-size:22px !important" class="img-anonimo-privacidade-dourado"></md-icon>\n\
                            <md-select style="margin-bottom: 4px !important;margin:0" placeholder="Alterar privacidade" style="width:100%" class="select-privacidade" ng-model="dados.privacidade">\n\
                                <md-option ng-repeat="privacidade in privacidades" ng-value="privacidade.id">\n\
                                    {{privacidade.titulo}}\n\
                                </md-option>\n\
                            </md-select>\n\
                        </div>\n\
                    </div>\n\
                </div>\n\
                <form name="formCad" class="row">\n\
                    <textarea placeholder="Faça uma pergunta para todos que estão lá!"\n\
                    class="sem-borda"\n\
                    rows="5"\n\
                    name="txtResp"\n\
                    type="text"\n\
                    required \n\
                    ng-model="dados.pergunta">\n\
                    </textarea>\n\
                </div>';
    };        
  
    return {
        montar: montar
    };
 }]);



