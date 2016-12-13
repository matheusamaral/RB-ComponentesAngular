'use strict';

angular.module('QuickPeek.HTML.Perfil', [
])

.factory('PerfilHtml', [ function() {
       
    function montar() {
        return tabs()+'\n\
                <div class="row" style="padding:0;padding-top:90px !important">\n\
                    <div class="col col-25 remove-padding">\n\
                        <div style="remove-padding; margin: auto;" class="btn-redondo-grande-cinza-perfil">\n\
                        </div>\n\
                        <p class="col font-preta-perfil negrito remove-padding">Renato Silva</p>\n\
                    </div>\n\
                    <div class="col remove-padding">\n\
                        <div class="row remove-padding">\n\
                            <div class="col text-center remove-padding">\n\
                                <p class="remove-padding col font-preta-perfil negrito">802</p>\n\
                                <p class="remove-padding col p-cinza-perfil">posts</p>\n\
                            </div>\n\
                            <div class="col text-center remove-padding">\n\
                                <p class="remove-padding col font-preta-perfil negrito">711</p>\n\
                                <p class="remove-padding col p-cinza-perfil">seguidores</p>\n\
                            </div>\n\
                            <div class="col text-center remove-padding">\n\
                                <p class="remove-padding col font-preta-perfil negrito">900</p>\n\
                                <p class="remove-padding col p-cinza-perfil">seguindo</p>\n\
                            </div>\n\
                        </div>\n\
                        <div class="col" style="padding-left:0;padding-right:0;padding-top:10px;">\n\
                            <button style="margin-bottom: 10px;" ng-click="editarPerfil()" class="btn-perfil button button-outline button-stable">\n\
                                <i class="icon ion-person config-icons-perfil"></i> Editar seu perfil\n\
                            </button>\n\
                            <button ng-click="irConfiguracoes()" class="btn-perfil button button-outline button-stable">\n\
                                <i class="icon ion-gear-b config-icons-perfil"></i> Confgurações\n\
                            </button>\n\
                        </div>\n\
                    </div>\n\
                </div>\n\
                '+sessaoAvatar()+
                 sessaoLocal()+
                 sessaoUltimosLocais();
    };  
    
    function sessaoAvatar(){
        return'<div class="box-shadow-padrao-barra row box-avatar" style="margin-top:20px !important; padding-top:20px;">\n\
                    <div class="col col-25 remove-padding">\n\
                        <div style="margin: auto;background-image: url(img/Animais/anteater.svg)" \n\
                        class="btn-perfil-medio box-img-cad">\n\
                        </div>\n\
                        <p class="col font-preta negrito">Tatu Feliz</p>\n\
                    </div>\n\
                    <div class="col col-center remove-padding">\n\
                        <button ng-click="editarAvatar()" style="line-height: 20px;" class="row btn-perfil-full btn-att-avatar button button-outline button-stable">\n\
                            <i class="col col-center icon img-anonimo config-icons-perfil"></i> Editar avatar anônimo\n\
                        </button>\n\
                    </div>\n\
                </div>';
    }
    
    function sessaoLocal(){
        return'<div class="row box-sessao-local">\n\
                    <div class="col">\n\
                        <div class="row text-center">\n\
                            <p class="p-local-pequeno">ONDE ESTOU AGORA</p>\n\
                        </div>\n\
                        <div class="row text-center">\n\
                            <p class="p-local-grande">Cais do Chopp</p>\n\
                        </div>\n\
                        <div class="row text-center remove-padding" style="padding-top: 15px !important;">\n\
                            <div class="col remove-padding">\n\
                                <button class="btn-perfil-clear button button-clear button-positive">\n\
                                    <i style="margin-right: 10px;" class="icon ion-android-globe"></i>Alterar privacidade\n\
                                </button>\n\
                            </div>\n\
                            <div class="col remove-padding">\n\
                                <button class="btn-perfil-clear button button-clear button-positive">\n\
                                    <i style="margin-right: 10px;" class="icon ion-location"></i>Alterar localização\n\
                                </button>\n\
                            </div>\n\
                        </div>\n\
                    </div>\n\
               </div>';
    }
    
    function sessaoUltimosLocais(){
        return'<div class="row box-ultimos remove-padding">\n\
                    <div class="col remove-padding">\n\
                        <div class="row padding-pequeno-ultimo">\n\
                            <p class="p-ultimos-locais"> ÚLTIMOS LOCAIS</p>\n\
                        </div>\n\
                        <div class="col box-ultimo-local rb-padding-padrao">\n\
                            <p class="titulo-local">Bar do Broa</p>\n\
                            <p class="descricao-local">19 km. há 2 minutos</p>\n\
                        </div>\n\
                    </div>\n\
                </div>';
    }
    
    function tabs(){
        return'<div class="tabs-striped tabs-top tabs-background-positive tabs-color-light">\n\
                    <div class="tabs box-shadow-barra">\n\
                        <a class="tab-item" href="#">\n\
                            <i style="opacity: 0.5;" class="icon img-quick-logo"></i>\n\
                        </a>\n\
                        <a class="tab-item" href="#">\n\
                            <i class="icon ion-chatbox-working"></i>\n\
                        </a>\n\
                        <a class="tab-item" href="#">\n\
                            <i class="icon ion-android-notifications"></i>\n\
                        </a>\n\
                        <a class="tab-item active" href="#">\n\
                            <i class="icon ion-person"></i>\n\
                        </a>\n\
                    </div>\n\
                </div>';
    }
  
    return {
        montar: montar
    };
 }]);

