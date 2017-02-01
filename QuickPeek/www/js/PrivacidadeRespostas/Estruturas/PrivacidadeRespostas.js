'use strict';

angular.module('QuickPeek.HTML.PrivacidadeRespostas', [
])

.factory('PrivacidadeRespostasHtml', [function(){
       
    function montar(){
        return '<div style="box-shadow: 0px -2px 8px black !important;" class="row bar bar-header bar-positive">\n\
                    <div class="row remove-padding">\n\
                        <button ng-click="voltarPerguntas()" class="margin-img btn-respostas-voltar btn-txt-direita button button-clear">\n\
                            <i class="icon ion-android-arrow-back seta-barra"></i>\n\
                        </button>\n\
                        <div class="img-circular-grande"\n\
                        style="background-image:url({{dadosPergunta.endereco}})"></div>\n\
                        <div class="col remove-padding" style="margin-left: 10px;">\n\
                            <p ng-if="dadosUser.usuarioId != dadosPergunta.usuarioId" class="negrito ptitular-verificar">{{dadosPergunta.nome}}</p>\n\
                            <p ng-if="dadosUser.usuarioId == dadosPergunta.usuarioId" class="negrito ptitular-verificar">Você</p>\n\
                            <p class="ptitulo-pergunta">{{dadosPergunta.titulo}}</p>\n\
                        </div>\n\
                    </div>\n\
                </div>\n\
                <div style="padding-top:65px !important" class="altura-barra-padding remove-padding">\n\
                    <p class="p-privacidade-pergunta">Como deseja entrar nesta conversa?</p>\n\
                    <div class="col text-center">\n\
                        <div ng-if="dados.visibilidadeId != 2" style="background-image:url({{dadosUser.usuarioEndereco}})" class="box-img-cad icone-redondo-privacidade-foto">\n\
                        </div>\n\
                        <div ng-if="dados.visibilidadeId == 2" style="margin: auto;background-image: url({{dadosUser.avatarEndereco}})" class="btn-redondo-medio-privacidade-avatar box-img-cad">\n\
                            <button ng-click="editarAvatar()" class="flutuante-btn-medio button">\n\
                                <i class="icon ion-edit"></i>\n\
                            </button>\n\
                        </div>\n\
                        <p ng-if="dados.visibilidadeId != 2" class="p-nome-resposta negrito">{{dadosUser.usuarioNome}}</p>\n\
                        <p ng-if="dados.visibilidadeId == 2" class="p-nome-resposta negrito">{{dadosUser.avatarNome}}</p>\n\
                    </div>\n\
                </div>\n\
                <div class="row">\n\
                    <div class="col">\n\
                        <div ng-class="{\'marcado\' : dados.visibilidadeId == 1}"\n\
                        ng-click="dados.visibilidadeId = 1;irResposta(dadosPergunta.id)"\n\
                        class="box-img-cad icone-redondo-resposta-privacidade">\n\
                            <md-icon class="stilo-icones-privacidade ion-earth"></md-icon>\n\
                        </div>\n\
                        <p ng-class="{\'font-dourada\' : dados.visibilidadeId == 1}" class="p-nome-resposta">Publicamente</p>\n\
                    </div>\n\
                    <div class="col">\n\
                        <div ng-class="{\'marcado\' : dados.visibilidadeId == 2}"\n\
                        ng-click="dados.visibilidadeId = 2;irResposta(dadosPergunta.id)"\n\
                        class="box-img-cad icone-redondo-resposta-privacidade">\n\
                            <md-icon class="stilo-icones-privacidade img-anonimo-privacidade"></md-icon>\n\
                        </div>\n\
                        <p ng-class="{\'font-dourada\' : dados.visibilidadeId == 2}" class="p-nome-resposta">Anônimamente</p>\n\
                    </div>\n\
                </div>';
    };
  
    return {
        montar: montar
    };
 }]);
