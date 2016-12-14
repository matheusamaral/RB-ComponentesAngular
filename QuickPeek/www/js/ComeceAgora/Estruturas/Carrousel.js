'use strict';

angular.module('QuickPeek.HTML.ComeceAgoraCarrousel', [
    'QuickPeek.HTML.ComeceAgora',
    'QuickPeek.HTML.SaibaAntes',
    'QuickPeek.HTML.FacaPergunta',
    'QuickPeek.HTML.PublicoOuAnonimo',
    'QuickPeek.HTML.Compartilhe'
])

.factory('ComeceAgoraCarrouselHtml', [ function() {
       
    function montar() {
return '<ion-slide-box on-slide-changed="slideHasChanged($index)">\n\
            <ion-slide>\n\
                <div comece-agora-html></div>\n\
            </ion-slide>\n\
            <ion-slide>\n\
              <div saiba-antes-html></div>\n\
            </ion-slide>\n\
            <ion-slide>\n\
              <div faca-pergunta-html></div>\n\
            </ion-slide>\n\
            <ion-slide>\n\
              <div publico-ou-anonimo-html></div>\n\
            </ion-slide>\n\
            <ion-slide>\n\
              <div compartilhe-html></div>\n\
            </ion-slide>\n\
        </ion-slide-box>\n\
        <div class="row">\n\
            <div class="margin-auto col col-75 responsive text-center">\n\
                <button ng-click="navegar()" class="col button button-positive">\n\
                    COMEÇAR AGORA\n\
                </button>\n\
            </div>\n\
        </div>';
    };        
  
    return {
        montar: montar
    };
 }]);

