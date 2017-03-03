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
        
        function iniciar(nome,metodo){
            var options = {
                maximumImagesCount: 1,
                width: $('body').width(),
                height:0,
                quality: 100
            };
            
            $cordovaImagePicker.getPictures(options)
            .then(function (results) {
                if(scope[nome])scope[nome].img = results[0];
                if(scope[nome])scope[nome].galeria = true;
                //document.getElementById(nome).src = scope[nome].img;
                if(scope[nome].esconder)scope[nome].esconder();
                metodo(results[0]);
            }, function(error) {
                metodo(false);
                scope[nome].img = false;
            });   
        }

          return {
              setScope:setScope,
              iniciar:iniciar
          };
      }
]);