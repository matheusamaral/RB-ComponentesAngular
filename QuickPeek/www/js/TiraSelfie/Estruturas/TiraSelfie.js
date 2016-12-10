'use strict';

angular.module('QuickPeek.HTML.TiraSelfie', [
])

.factory('TiraSelfieHtml', [ function() {
       
    function montar() {
        return '<div class="background-cinza rb-padding-padrao box-shadow-padrao" id="cameraPerfilBarra">\n\
                    <p ng-if="!cameraPerfil.fotoTirada" class="negrito p-cinza font-19-px">Faça uma selfie para seu perfil</p>\n\
                    <p ng-if="cameraPerfil.fotoTirada" class="negrito p-cinza font-19-px">Ótimo, agora verifique a foto</p>\n\
                </div>\n\
                <div ng-if="cameraPerfil.galeria && cameraPerfil.fotoTirada" layout="row" layout-align="center center" class="pictures background-cinza" style="height:{{cameraPerfil.containerImgAltura}}px">\n\
                    <img src="{{cameraPerfil.img}}" id="cameraPerfil" style="width:100%,height:auto"/>\n\
                </div>\n\
                <div ng-if="!cameraPerfil.galeria && cameraPerfil.fotoTirada" class="pictures">\n\
                    <p>\n\
                        <img id="cameraPerfil" width="100%"/>\n\
                    </p>\n\
                </div>';
    };

    return {
        montar: montar
    };
 }])
 
.factory('TiraSelfieRodape', [ function() {
       
    function montar() {
         return '<div ng-if="!cameraPerfil.fotoTirada" class="box-shadow-padrao-bottom bar bar-footer bar-positive footer-camera" layout="row" layout-align="center center">\n\
                    <span ng-click="virarCamera()" class="img-inverte-camera"></span>\n\
                    <md-button ng-click="abrirGaleria()" layout="row" layout-align="center center" class="btn-rodape remove-box-shadow btn-padrao tamanho-btn md-primary md-raised">\n\
                        <md-icon style="margin:0 !important" class="img-galerie"></md-icon>\n\
                    </md-button>\n\
                    <span flex></span>\n\
                    <md-button layout="row" layout-align="center center" ng-click="cameraPerfil.tirarFoto()" class="btn-redondo-selfie btn-padrao md-primary md-raised">\n\
                        <md-icon class="img-btn-tirar-foto"></md-icon>\n\
                    </md-button>\n\
                    <span flex></span>\n\
                    <md-button layout="row" ng-click="pular()" layout-align="center center" class="btn-rodape remove-box-shadow btn-padrao tamanho-btn md-primary md-raised">\n\
                        PULAR <md-icon class="img-seta-proximo-sem-traco"></md-icon>\n\
                    </md-button>\n\
                </div>\n\
                <div ng-if="cameraPerfil.fotoTirada" class="box-shadow-padrao-bottom bar bar-footer bar-positive footer-camera" layout="row" layout-align="center center">\n\
                    <md-button layout="row" \n\
                    layout-align="center center"\n\
                    ng-click="mostrarCamera()"\n\
                    class="btn-rodape remove-box-shadow btn-padrao tamanho-btn md-primary md-raised">\n\
                        <md-icon class="img-seta-voltar"></md-icon>\n\
                    </md-button>\n\
                    <span flex></span>\n\
                    <md-button layout="row" layout-align="center center" ng-click="createFile(cameraPerfil.img)" class="btn-redondo-selfie btn-padrao md-primary md-raised">\n\
                        <md-icon class="img-btn-tirar-foto"></md-icon>\n\
                        <span class="img-btn-concluir"></span>\n\
                    </md-button>\n\
                    <span flex></span>\n\
                    <span style="width:36px"></span>\n\
                </div>';
    };        
  
    return {
        montar: montar
    };
 }]);

