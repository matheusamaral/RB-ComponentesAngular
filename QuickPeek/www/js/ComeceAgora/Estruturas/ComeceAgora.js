'use strict';

angular.module('QuickPeek.HTML.ComeceAgora', [])

.directive('comeceAgoraHtml', [ function() {
       
    function montar() {
        return '<div class="padding-separa-logo text-center rb-padding-padrao">\n\
                    <div class="centraliza-horizontal logo-quickPeek">\n\
                    </div>\n\
                </div>\n\
                <div class="padding-bottom-grande text-center rb-padding-padrao">\n\
                    <div class="limita-espaco-texto  centraliza-horizontal">\n\
                        <p>Conecte-se com seu destino</p>\n\
                    </div>\n\
                </div>';
    };        
  
    return {
        restrict: 'AC',            
        template: montar
    };
 }]);

