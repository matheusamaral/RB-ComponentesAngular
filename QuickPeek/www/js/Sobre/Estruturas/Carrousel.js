'use strict';

angular.module('QuickPeek.HTML.Sobre', [
    'QuickPeek.HTML.SobrePg1'
])

.factory('SobreHtml', [ function() {
       
    function montar() {
return '<ion-slide-box show-pager="false" on-slide-changed="slideHasChanged($index);">\n\
            <ion-slide>\n\
                <div sobre-pg1-html></div>\n\
            </ion-slide>\n\
        </ion-slide-box>';
    };        
  
    return {
        montar: montar
    };
 }]);

