'use strict';

angular.module('QuickPeek.HTML.NotificacoesSeguir', [
])

.factory('NotificacoesSeguirHtml', [ function() {
       
    function montar(){
        return '<div class="row bar bar-header bar-positive">\n\
                    <div>\n\
                        <button ng-click="voltar()" class="btn-txt-direita button button-clear">\n\
                            <i class="icon ion-android-arrow-back seta-barra"></i>Solicitações para seguir\n\
                        </button>\n\
                    </div>\n\
                </div>\n\
                <div ng-repeat="pessoa in dados.pessoas" \n\
                class="row remove-padding-row divide-sessoes corpo-lista-config padding-padrao-contas"\n\
                ng-class="{\'padding-top-bloqueados\' : $index == 0}"\n\
                ng-if="dados.pessoas.length > 0">\n\
                    <div class="col remove-padding">\n\
                        <div style="background-image:url({{pessoa.endereco}})" class="btn-redondo-medio"></div>\n\
                    </div>\n\
                    <div class="remove-padding col-center" style="margin-right: 10px;">\n\
                        <div class="row remove-padding">\n\
                            <p style="line-height: 36px;" class="font-preta negrito text-left">{{pessoa.nome}}</p>\n\
                            <button ng-click="confirmar(pessoa.seguirId,1)" class="btn-seguidores button button-outline button-positive">\n\
                                Confirmar\n\
                            </button>\n\
                            <button\n\
                            style="width: 25px;min-width: 25px;"\n\
                            ng-click="confirmar(pessoa.seguirId,0)" \n\
                            class="ion-android-close btn-seguidores button button-clear button-stable">\n\
                                \n\
                            </button>\n\
                        </div>\n\
                    </div>\n\
                </div>\n\
                <div style="padding-top:80px !important;" ng-if="dados.pessoas.length == 0" class="altura-barra row padding-padrao-contas">\n\
                    <div class="col text-center">\n\
                        <i class="icone-padrao icon ion-alert-circled"></i>\n\
                        <p style="color:#b0b0b0">Nenhuma nova solicitação</p>\n\
                    </div>\n\
                </div>';
    };        
  
    return {
        montar: montar
    };
 }])

.factory('PessoasBloqueadasHtmlPopup', [ function() {
       
    function montar() {
        return '<div ng-click="desbloquear(dadosDesbloquear.id,dadosDesbloquear.visibilidadeId)" class="config-font-desbloque col remove-padding">\n\
                    Desbloquear {{dadosDesbloquear.nome}}\n\
                </div>';
    };        
  
    return {
        montar:montar
    };
 }]);



