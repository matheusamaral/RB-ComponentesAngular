'use strict';

angular.module('QuickPeek.HTML.TiraSelfie', [
])

.factory('TiraSelfieHtml', [ function() {
       
    function montar() {
        return '<div style="z-index:2 !important;padding:20px !important" class="background-cinza rb-padding-padrao box-shadow-padrao" id="cameraPerfilBarra">\n\
                    <p ng-if="!cameraPerfil.img && !cameraPerfil.fotoTirada" class="negrito p-cinza font-19-px">Faça uma selfie para seu perfil</p>\n\
                    <p ng-if="cameraPerfil.img || cameraPerfil.fotoTirada" class="negrito p-cinza font-19-px">Ótimo, agora verifique a foto</p>\n\
                </div>\n\
                <div style="background-image: url({{cameraPerfil.img}});\n\
                height:{{cameraPerfil.containerImgAltura}}px;"\n\
                ng-if="cameraPerfil.galeria && cameraPerfil.img"\n\
                layout="row" \n\
                layout-align="center center" \n\
                class="pictures box-img">\n\
                </div>\n\
                <div ng-if="!cameraPerfil.galeria && cameraPerfil.fotoTirada" \n\
                class="pictures"\n\
                style="height:{{cameraPerfil.containerImgAltura}}px;">\n\
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
         return '<div id="cameraPerfilRodape" ng-if="!cameraPerfil.img && !cameraPerfil.fotoTirada" class="row box-shadow-padrao-bottom bar bar-footer bar-positive footer-camera">\n\
                    <button ng-click="virarCamera()" class="btn-float-right btn-rodape button-clear button button-positive">\n\
                        <i class="icon img-inverte-camera"></i>\n\
                    </button>\n\
                    <div class="col col-center">\n\
                        <button style="padding-left: 8px !important;" ng-click="abrirGaleria()" class="btn-rodape button button-clear">\n\
                            <i class="icon ion-android-image"></i>\n\
                        </button>\n\
                    </div>\n\
                    <div class="col col-center text-center">\n\
                        <button ng-click="cameraPerfil.tirarFoto()" class="btn-rodape btn-redondo button button-clear">\n\
                        </button>\n\
                    </div>\n\
                    <div class="col col-center">\n\
                        <button ng-click="pular()" class="btn-rodape button button-clear">\n\
                            PULAR <i class="icon btn-seta ion-chevron-right"></i>\n\
                        </button>\n\
                    </div>\n\
                </div>\n\
                <div id="cameraPerfilRodape" ng-if="cameraPerfil.img || cameraPerfil.fotoTirada" class="box-shadow-padrao-bottom bar bar-footer bar-positive footer-camera" layout="row" layout-align="center center">\n\
                    <div class="col col-center">\n\
                        <button ng-click="mostrarCamera()" class="btn-rodape button button-clear">\n\
                            <i class="icon ion-reply"></i>\n\
                        </button>\n\
                    </div>\n\
                    <div class="col col-center text-center">\n\
                        <button ng-click="createFile(cameraPerfil.img)" class="btn-rodape btn-redondo button button-clear">\n\
                            <i class="icon ion-checkmark-round"></i>\n\
                        </button>\n\
                    </div>\n\
                    <div class="col col-center">\n\
                    </div>\n\
                </div>';
    };        
  
    return {
        montar: montar
    };
 }]);

