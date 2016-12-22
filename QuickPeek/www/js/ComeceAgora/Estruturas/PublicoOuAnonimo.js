'use strict';

angular.module('QuickPeek.HTML.PublicoOuAnonimo', [])

.directive('publicoOuAnonimoHtml', [ function() {
       
    function montar() {
        return '<div class="padding-separa-logo-top text-center rb-padding-padrao">\n\
                    <div class="centraliza-horizontal img-publico-anonimo">\n\
                    </div>\n\
                </div>\n\
                <div class="text-center remove-padding-bottom rb-padding-padrao">\n\
                    <div class="centraliza-horizontal">\n\
                        <p class="negrito">Público ou anônimo</p>\n\
                    </div>\n\
                </div>\n\
                <div class="padding-bottom-grande text-center rb-padding-padrao">\n\
                    <div class="limita-espaco-texto centraliza-horizontal">\n\
                        <p class="rb-line-heigth">Converse diretamente com as pessoas de modo público ou anônimo.\n\
                    </div>\n\
                </div>';
    };        
  
    return {
        restrict:'AC',
        template: montar
    };
 }]);

