'use strict';

angular.module('QuickPeek.HTML.TiraSelfie', [
])

.factory('TiraSelfieHtml', [ function() {
       
    function montar() {
        return '<div class="rb-padding-padrao">\n\
                    <p ng-if="!cameraPerfil.fotoTirada" class="negrito p-cinza font-19-px">Faça uma selfie para seu perfil</p>\n\
                    <p ng-if="cameraPerfil.fotoTirada" class="negrito p-cinza font-19-px">Ótimo, agora verifique a foto</p>\n\
                </div>\n\
                <div class="pictures">\n\
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
         return '<div ng-if="!cameraPerfil.fotoTirada" class="bar bar-footer bar-positive footer-camera" layout="row" layout-align="center center">\n\
                    <md-button layout="row" layout-align="center center" class="btn-rodape remove-box-shadow btn-padrao largura-alto md-primary md-raised">\n\
                        <md-icon class="img-seta-proximo-sem-traco"></md-icon>\n\
                    </md-button>\n\
                    <span flex></span>\n\
                    <md-button layout="row" layout-align="center center" ng-click="cameraPerfil.tirarFoto()" class="btn-redondo-selfie btn-padrao md-primary md-raised">\n\
                        <md-icon class="img-btn-tirar-foto"></md-icon>\n\
                    </md-button>\n\
                    <span flex></span>\n\
                    <md-button layout="row" layout-align="center center" class="btn-rodape remove-box-shadow btn-padrao largura-alto md-primary md-raised">\n\
                        PULAR <md-icon class="img-seta-proximo-sem-traco"></md-icon>\n\
                    </md-button>\n\
                </div>\n\
                <div ng-if="!cameraPerfil.fotoTirada" class="bar bar-footer bar-positive footer-camera" layout="row" layout-align="center center">\n\
                    <md-button layout="row" layout-align="center center" class="btn-rodape remove-box-shadow btn-padrao largura-alto md-primary md-raised">\n\
                        <md-icon class="img-seta-proximo-sem-traco"></md-icon>\n\
                    </md-button>\n\
                    <span flex></span>\n\
                    <md-button layout="row" layout-align="center center" ng-click="cameraPerfil.tirarFoto()" class="btn-redondo-selfie btn-padrao md-primary md-raised">\n\
                        <md-icon class="img-btn-tirar-foto"></md-icon>\n\
                    </md-button>\n\
                    <span flex></span>\n\
                    <md-button layout="row" layout-align="center center" class="btn-rodape remove-box-shadow btn-padrao largura-alto md-primary md-raised">\n\
                        PULAR <md-icon class="img-seta-proximo-sem-traco"></md-icon>\n\
                    </md-button>\n\
                </div>';
    };        
  
    return {
        montar: montar
    };
 }]);

