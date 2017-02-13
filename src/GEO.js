'use strict';

angular.module('RB.geolocalizacao', ['ngRoute', 'RB.validacoesPadroes'])

.factory('GEO', ['VP', function(VP) {
   
    var watchID;
    var geoLoc;
    var acoes = {success: '', errors: []};
    
    function set(obj){
        acoes = VP.validarObj(obj, acoes);
        return this;
    };
    
    function showLocation(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        if(VP.ehValido(acoes.success)) acoes.success(position);
        clear();
    }

    function errorHandler(err) {
        console.log(acoes);
      if(err.code == 1) {
        console.log("Error: Permissão negada!");
        if(VP.ehValido(acoes.errors[0])) acoes.errors[0]();
      }else if( err.code == 2) {
        console.log("Error: Posição não disponível!");
        if(VP.ehValido(acoes.errors[1])) acoes.errors[1]();
      }
      clear();
    }
    
    function getPosicao(){
       if(navigator.geolocation){
          // timeout at 60000 milliseconds (60 seconds)
          var options = {timeout:60000};
          geoLoc = navigator.geolocation;
          watchID = geoLoc.watchPosition(showLocation, 
                                         errorHandler,
                                         options);
       }else{
          console.log("Sorry, browser does not support geolocation!");
       }
    }
    
    function clear(){
        navigator.geolocation.clearWatch(watchID);
    }
    
    return {
        getPosicao:getPosicao,
        set: set,
        clear: clear
    };
    
 }]);