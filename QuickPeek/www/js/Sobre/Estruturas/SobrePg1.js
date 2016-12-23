'use strict';

angular.module('QuickPeek.HTML.SobrePg1', [])

.directive('sobrePg1Html', [ function() {
       
    function montar() {
        return '<button style="font-weight: bold;" ng-click="navegar()" class="btn-flutuante col button button-clear">\n\
                    <i class="icon ion-android-arrow-back" style="color:#FFFFFF"></i>\n\
                </button>\n\
                <div class="padding-separa-logo-top text-center rb-padding-padrao">\n\
                    <div class="centraliza-horizontal logo-quickPeek">\n\
                    </div>\n\
                </div>\n\
                <div class="text-center">\n\
                    <div class="centraliza-horizontal logo-nome-quickPeek">\n\
                    </div>\n\
                </div>\n\
                <div style="padding-bottom:25px;" class="text-center rb-padding-padrao">\n\
                    <div class="limita-espaco-texto  centraliza-horizontal">\n\
                        <p class="rb-line-heigth">Versão 02.154.3</p>\n\
                    </div>\n\
                </div>\n\
                <div style="padding-bottom: 35px;" class="text-center rb-padding-padrao">\n\
                    <div class="limita-espaco-texto  centraliza-horizontal">\n\
                        <p class="rb-line-heigth">&#169 2016-2017 Quickpeek Inc.</br>\n\
                            Todos os direitos reservados\n\
                        </p>\n\
                    </div>\n\
                </div>\n\
                <div class="row">\n\
                    <div class="margin-auto col col-75 responsive text-center">\n\
                        <button style="font-weight: bold;" ng-click="irTermos()" class="col button button-clear button-positive">\n\
                            LICENÇAS\n\
                        </button>\n\
                    </div>\n\
                </div>';
    };        
  
    return {
        restrict: 'AC',            
        template: montar
    };
 }]);

