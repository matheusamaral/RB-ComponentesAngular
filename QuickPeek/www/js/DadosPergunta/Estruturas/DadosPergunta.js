'use strict';

angular.module('QuickPeek.HTML.DadosPergunta', [
])

.factory('DadosPerguntaHtml', [ function() {
       
    function montar() {
        return '<div class="row bar bar-header bar-positive remove-padding">\n\
                        <div class="row remove-padding">\n\
                            <div style="width:100%">\n\
                                <button style="margin-top: 15px;" ng-click="voltar()" class="margin-img btn-respostas-voltar btn-txt-direita button button-clear">\n\
                                    <i class="icon ion-android-arrow-back seta-barra"></i>Dados da pergunta\n\
                                </button>\n\
                            </div>\n\
                            <div class="text-right">\n\
                                <md-menu>\n\
                                    <md-button style="margin-top: 9px;" class="md-icon-button" ng-click="$mdOpenMenu($event)">\n\
                                        <md-icon style="color:#FFFFFF !important" class="icone-tamanho-personalizado ion-android-more-vertical"></md-icon>\n\
                                    </md-button>\n\
                                    <md-menu-content width="4">\n\
                                        <md-menu-item>\n\
                                            <md-button ng-click="attPrivacidade()">\n\
                                                Alterar privacidade\n\
                                            </md-button>\n\
                                        </md-menu-item>\n\
                                    </md-menu-content>\n\
                                </md-menu>\n\
                            </div>\n\
                        </div>\n\
                    </div>\n\
                    '+conversa()+'\n\
                    <div ng-if="dados.perguntas.length == 0" class="padding-top-bloqueados row padding-padrao-contas">\n\
                        <div class="col text-center">\n\
                            <i class="icone-padrao icon ion-alert-circled"></i>\n\
                            <p style="color:#b0b0b0">Nenhuma pergunta no local, ainda...</p>\n\
                        </div>\n\
                    </div>';
    };   
    
    function conversa(){
        return'<ion-content id="container-respostas" class="container-chat-geral" style="position:relative;padding-top:80px !important">\n\
                    <div class="container-centro" style="width:{{larguraBody}}px">\n\
                        <div class="remove-padding container-dialogo row" style="margin-bottom: 20px !important;">\n\
                            <div class="balao-direita">\n\
                                <div class="container-textos">\n\
                                    <div class="row remove-padding">\n\
                                        <div class="col resp-momento remove-padding">12:30</div>\n\
                                        <div class="col remetente remove-padding">Você</div>\n\
                                    </div>\n\
                                    <div class="container-resposta">\n\
                                        Como está o clima ae?\n\
                                    </div>\n\
                                </div>\n\
                                <div class="container-img-resposta text-right remove-padding">\n\
                                    <div class="chat img-circular-grande margin-img"\n\
                                    style="background-image:url({{dados.pergunta.enderecoUsuario}})"></div>\n\
                                </div>\n\
                            </div>\n\
                        </div>\n\
                    </div>\n\
                </ion-content>\n\
                '+boxLido()+boxEntregue();
    }
    
    function boxLido(){
        return'<div class="col" style="padding: 15px !important;">\n\
                    <div class="box-lido" id="container-dados">\n\
                        <div class="p-dourado borda-box" style="padding:10px">Lida por</div>\n\
                        <div ng-repeat="pessoa in dados.visualizado"\n\
                        class="position-relative row remove-padding-row corpo-lista-config" style="padding:10px !important;">\n\
                            <div ng-init="calcLargurahr()" id="box-img{{$index}}" class="display-table-vertical col-20 remove-padding">\n\
                                <div style="background-image:url({{pessoa.endereco}})" class="btn-redondo-medio-dados"></div>\n\
                            </div>\n\
                            <div style="padding-left:10px !important;padding-right:10px !important;" class="col-50 remove-padding col-center">\n\
                                <p style="padding-top:4px;" class="font-preta-dados negrito text-left">{{pessoa.nome}}</p>\n\
                                <p class="font-cinza-dados text-left">{{verificaData(pessoa.momento.split(\' \')[0])}}, {{pessoa.momento.split(\' \')[1].split(\':\')[0]}}:{{pessoa.momento.split(\' \')[1].split(\':\')[1]}}</p>\n\
                                <hr ng-if="$index != dados.visualizado.length - 1" style="width:{{largura}}px" class="hr-dados"></hr>\n\
                            </div>\n\
                        </div>\n\
                        <div ng-if="!dados.visualizado || !dados.visualizado.length" class="altura-barra row padding-padrao-contas">\n\
                            <div class="col text-center">\n\
                                <i class="icone-padrao icon ion-alert-circled"></i>\n\
                                <p style="color:#b0b0b0">Nenhuma pessoa leu</p>\n\
                            </div>\n\
                        </div>\n\
                        <div class="p-cinza-entregues borda-box-top" style="padding:10px">1 restante</div>\n\
                    </div>\n\
                </div>';
    }
    
    function boxEntregue(){
        return'<div class="col" style="padding: 15px !important;">\n\
                    <div class="box-lido" id="container-dados">\n\
                        <div class="p-dourado borda-box" style="padding:10px">Entregue a</div>\n\
                        <div ng-repeat="pessoa in dados.entregue"\n\
                        class="position-relative row remove-padding-row corpo-lista-config" style="padding:10px !important;">\n\
                            <div id="box-img{{$index}}" class="display-table-vertical col-20 remove-padding">\n\
                                <div style="background-image:url({{pessoa.endereco}})" class="btn-redondo-medio-dados"></div>\n\
                            </div>\n\
                            <div style="padding-left:10px !important;padding-right:10px !important;" class="col-50 remove-padding col-center">\n\
                                <p style="padding-top:4px;" class="font-preta-dados negrito text-left">{{pessoa.nome}}</p>\n\
                                <p class="font-cinza-dados text-left">{{verificaData(pessoa.momento.split(\' \')[0])}}, {{pessoa.momento.split(\' \')[1].split(\':\')[0]}}:{{pessoa.momento.split(\' \')[1].split(\':\')[1]}}</p>\n\
                                <hr ng-if="$index != dados.visualizado.length - 1" style="width:{{largura}}px" class="hr-dados"></hr>\n\
                            </div>\n\
                        </div>\n\
                        <div ng-if="!dados.entregue || !dados.entregue.length" class="altura-barra row padding-padrao-contas">\n\
                            <div class="col text-center">\n\
                                <i class="icone-padrao icon ion-alert-circled"></i>\n\
                                <p style="color:#b0b0b0">Nenhuma pessoa recebeu</p>\n\
                            </div>\n\
                        </div>\n\
                        <div class="p-cinza-entregues borda-box-top" style="padding:10px">1 restante</div>\n\
                    </div>\n\
                </div>';
    }
  
    return {
        montar: montar
    };
 }]);



