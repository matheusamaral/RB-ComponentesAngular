'use strict';

angular.module('QuickPeek.Acoes.LoadingInicial', [ 
    'RB.pagina',
    'RB.loadingMobile',
    'RB.validacoesPadroes'
])

.factory('LoadingInicialAcoes', ['Pagina','RBLoadingMobile','$timeout','VP',
    function(Pagina,RBLoadingMobile,$timeout,VP){
    var scope;  
    
    function setScope(obj){
        scope = obj;
        RBLoadingMobile.show('Encontrando você no mapa');
        scope.mudarBtn = false;
        return this;
    };
    
    function inicializar(){
        addCss();
    };
    
    function addCss(){
        Pagina.navegar({idPage:22});
        $('ion-side-menu-content').addClass('background-img');
    }
    
    //document.addEventListener('deviceready', onDeviceReady, false);
    
    function onDeviceReady(){
            cordova.plugins.diagnostic.isGpsLocationAvailable(function(available){
            if(!available){
               checkAuthorization();
            }else{
                var options = { maximumAge: 3000, timeout: 3000, enableHighAccuracy: true };
                navigator.geolocation.getCurrentPosition(onSuccess,onError);
            }
        }, function(error){
            console.error("The following error occurred: "+error);
        });
    }
    
    function checkAuthorization(){
        cordova.plugins.diagnostic.isLocationAuthorized(function(authorized){
            if(authorized){
                checkDeviceSetting();
            }else{
                cordova.plugins.diagnostic.requestLocationAuthorization(function(status){
                    switch(status){
                        case cordova.plugins.diagnostic.permissionStatus.GRANTED:
                            console.log("Permission granted");
                            checkDeviceSetting();
                            break;
                        case cordova.plugins.diagnostic.permissionStatus.DENIED:
                            console.log("Permission denied");
                            // User denied permission
                            break;
                        case cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS:
                            console.log("Permission permanently denied");
                            // User denied permission permanently
                            break;
                    }
                }, function(error){
                    console.error(error);
                });
            }
        }, function(error){
            console.error("The following error occurred: "+error);
        });
    }

    function checkDeviceSetting(){
        cordova.plugins.diagnostic.isGpsLocationEnabled(function(enabled){
            console.log("GPS location setting is " + (enabled ? "enabled" : "disabled"));
            if(!enabled){
                cordova.plugins.locationAccuracy.request(function (success){
                    onDeviceReady();
                }, function onRequestFailure(error){
                    console.error("Accuracy request failed: error code="+error.code+"; error message="+error.message);
                    if(error.code !== cordova.plugins.locationAccuracy.ERROR_USER_DISAGREED){
                        if(confirm("Failed to automatically set Location Mode to 'High Accuracy'. Would you like to switch to the Location Settings page and do this manually?")){
                            cordova.plugins.diagnostic.switchToLocationSettings();
                        }
                    }
                }, cordova.plugins.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY);
            }
        }, function(error){
            console.error("The following error occurred: "+error);
        });
    }   
    
    var onSuccess = function(position){
        RBLoadingMobile.hide();
        scope.mudarBtn = true;
        var coordenadas = {latitude:position.coords.latitude,longitude:position.coords.longitude};
        DGlobal.coordenadasAtual = coordenadas;
        Pagina.navegar({idPage:22,paramAdd:'?atualizando=0&latitude='+coordenadas.latitude+'&longitude='+coordenadas.longitude});
    };

    function onError(error){
        RBLoadingMobile.hide();
    }
    
    return {
        setScope:setScope,
        inicializar:inicializar,
        onDeviceReady:onDeviceReady
    };
    
 }]);
