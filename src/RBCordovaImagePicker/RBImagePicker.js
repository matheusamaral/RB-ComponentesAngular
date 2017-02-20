'use strict';

angular.module('Cmp.ImagePicker', [
    'RB.validacoesPadroes'
])

.factory('ImagePicker', ['VP','$timeout','$cordovaImagePicker',
    function (VP,$timeout,$cordovaImagePicker) {
        var scope;  

        function setScope(obj){
            scope = obj;
            return this;
        };
        
        function iniciar(nome){
            var options = {
                maximumImagesCount: 1,
                width: $('body').width(),
                height:0,
                quality: 100
            };
            
            $cordovaImagePicker.getPictures(options)
            .then(function (results) {
                scope[nome].img = results[0];
                scope[nome].galeria = true;
                //document.getElementById(nome).src = scope[nome].img;
                scope[nome].esconder();
            }, function(error) {
                scope[nome].img = false;
            });   
        }

          return {
              setScope:setScope,
              iniciar:iniciar
          };
      }
]);