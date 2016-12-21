'use strict';

angular.module('QuickPeek.HTML.SobrePg2', [])

.directive('sobrePg2Html', [ function() {
       
    function montar() {
        return '<button style="font-weight: bold;" ng-click="voltarSlide()" class="btn-flutuante col button button-clear">\n\
                    <i class="icon ion-android-arrow-back" style="color:#FFFFFF"></i>\n\
                </button>\n\
                <div class="text-center" style="padding: 15px;padding-top:50px">\n\
                    <p style="text-align: justify;" class="p-mudar-numero">THE FOLLOWING SETS FORTH ATTRIBUTION NOTICES FOR THIRD PARTY SOFTWARE THAT MAY BE CONTAINED IN PORTIONS OF THE QUICKPEEK PRODUCT.</p>\n\
                </div>\n\
                <div class="text-center" style="padding: 15px;padding-top:0">\n\
                    <p style="text-align: justify;" class="p-mudar-numero">------</p>\n\
                </div>\n\
                <div class="text-center" style="padding: 15px;padding-top:0">\n\
                    <p style="text-align: justify;" class="p-mudar-numero">MIT License</br>\n\
                        Copyright(c) 2016 Rubeus Tecnologia e inovação</br>\n\
                    </p>\n\
                </div>\n\
                <div class="text-center" style="padding: 15px;padding-top:0">\n\
                    <p class="p-mudar-numero">\n\
                        Permission is hereby granted,free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish distribute, sublicense, and/or sellcopies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:</br>\n\
                    </p>\n\
                </div>\n\
                <div class="text-center" style="padding: 15px;padding-top:0">\n\
                    <p class="p-mudar-numero">\n\
                        The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.\n\
                    </p>\n\
                </div>';    
    };        
  
    return {
        restrict: 'AC',            
        template: montar
    };
 }]);

