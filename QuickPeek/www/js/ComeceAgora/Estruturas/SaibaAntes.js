'use strict';

angular.module('QuickPeek.HTML.SaibaAntes', [])

.directive('saibaAntesHtml', [ function() {
       
    function montar() {
        return '<div class="padding-separa-logo-top text-center rb-padding-padrao">\n\
                    <div class="centraliza-horizontal img-saiba-antes">\n\
                    </div>\n\
                </div>\n\
                <div class="text-center remove-padding-bottom rb-padding-padrao">\n\
                    <div class="centraliza-horizontal">\n\
                        <p class="negrito">Saiba antes de sair</p>\n\
                    </div>\n\
                </div>\n\
                <div class="padding-bottom-grande text-center rb-padding-padrao">\n\
                    <div class="limita-espaco-texto centraliza-horizontal">\n\
                        <p class="rb-line-heigth">Encontre o destino ideal antes de sair de casa ou do trabalho.</p>\n\
                    </div>\n\
                </div>';
    };        
  
    return {
        restrict:'AC',
        template: montar
    };
 }]);

