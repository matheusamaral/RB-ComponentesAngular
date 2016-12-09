'use strict';

angular.module('QuickPeek.HTML.Compartilhe', [])

.directive('compartilheHtml', [ function() {
       
    function montar() {
        return '<div class="padding-separa-logo-top text-center rb-padding-padrao">\n\
                    <div class="centraliza-horizontal img-compartilhe">\n\
                    </div>\n\
                </div>\n\
                <div class="text-center remove-padding-bottom rb-padding-padrao">\n\
                    <div class="centraliza-horizontal">\n\
                        <p class="negrito">Compartilhe e divirta-se</p>\n\
                    </div>\n\
                </div>\n\
                <div class="padding-bottom-grande text-center rb-padding-padrao">\n\
                    <div class="limita-espaco-texto centraliza-horizontal">\n\
                        <p class="rb-line-heigth">Publique de forma simples como está o seu local atual e conheça novas pessoas.\n\
                    </div>\n\
                </div>';
    };        
  
    return {
        restrict:'AC',
        template: montar
    };
 }]);

