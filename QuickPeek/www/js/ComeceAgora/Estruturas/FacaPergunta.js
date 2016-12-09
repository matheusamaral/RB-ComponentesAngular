'use strict';

angular.module('QuickPeek.HTML.FacaPergunta', [])

.directive('facaPerguntaHtml', [ function() {
       
    function montar() {
        return '<div class="padding-separa-logo-top text-center rb-padding-padrao">\n\
                    <div class="centraliza-horizontal img-faca-pergunta">\n\
                    </div>\n\
                </div>\n\
                <div class="text-center remove-padding-bottom rb-padding-padrao">\n\
                    <div class="centraliza-horizontal">\n\
                        <p class="negrito">Faça uma pergunta</p>\n\
                    </div>\n\
                </div>\n\
                <div class="padding-bottom-grande text-center rb-padding-padrao">\n\
                    <div class="limita-espaco-texto centraliza-horizontal">\n\
                        <p class="rb-line-heigth">Ela chegará para todas as pessoas no local de seu interesse.\n\
                    </div>\n\
                </div>';
    };        
  
    return {
        restrict:'AC',
        template: montar
    };
 }]);

