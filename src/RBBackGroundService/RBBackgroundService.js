'use strict';

angular.module('RB.BackgroundService', [
    'RB.pagina',
    'QuickPeek.Acoes.GerenciadorGPS.LoadingInicial'
])

.factory('BackgroundService', ['Pagina','$rootScope','Config','GerenciadorGPS','GCS',
    function (Pagina,$rootScope,Config,GerenciadorGPS,GCS){
        var scope;
        var raio = 100;
        var localizacaoAntiga = null;
        var localizacaoAtual = null;
        var primeiraMudanca = false;
        var diffRaioAnterior = 0;
        var Fetcher;
        
        function setScope(obj){
            scope = obj;
            return this;
        };
        
        function erroAtualizarPosicalServidorIOS(error){
            console.log('- BackgroundFetch failed', error);
        }
        
        function startService(data) {
            if (data.ServiceRunning) {
               enableTimer(data);
            } else {
               myService.startService(function(r){enableTimer(r)}, function(e){handleError(e)});
            }
        }

        function enableTimer(data) {
            if (data.TimerEnabled) {
               allDone();
            } else {
                //var tempo = 30000;//30 segundos (para debug)
                var tempo = 60000*5;//5 minutos
                myService.enableTimer(tempo, function(r){allDone(r)}, function(e){handleError(e)});
            }
        }

        function allDone() {
            //alert("Service now running");                
            //getLocation();                
        }
        
        function monitorarPosicaoIOSInicial(){
            Fetcher = window.BackgroundFetch;
            Fetcher.configure(atualizarPosicaoServidorIOS, erroAtualizarPosicalServidorIOS, {
                stopOnTerminate: false  // <-- true is default
            });
        }
        
        function metodoAtualizarPosicao(localizacao){
//            $.get({
//                url: Config.getRefAmbienteReq()+'/Acoes/verificarPosicao?background=1&latitude=' + DGlobal.coordenadasAtual.latitude + '&longitude='+ DGlobal.coordenadasAtual.longitude +'&uuid='+DGlobal.idDevice,
//                callback: function(response) {
//                    comparaLocalizacoes(response);
//                }
//            });   
            var obj = {
                url: Config.getRefAmbienteReq()+'/Acoes/verificarPosicao?background=1&latitude=' + localizacao.latitude + '&longitude='+ localizacao.longitude +'&uuid='+DGlobal.idDevice,
                dados: null,
                tipo: 'GET',
                acao: function(){},
                error: errorAtt,
                scope: scope,
                exibeMSGCarregando: 0
            };
            GCS.conectar(obj);
            
            comparaLocalizacoes(localizacao);
        }
        
        function errorAtt(){
            console.log('ERRRROU');
        }
        
        function pararIntervalo(){
            clearInterval($rootScope.intervaloChamada);
        }
        
        function iniciaIntervalo(){
            pararIntervalo();
            $rootScope.intervaloChamada = setInterval(function(){
                GerenciadorGPS.atualizarPosicaoAtual(metodoAtualizarPosicao);
            }, 60000*5);
        }
        
        function verificaCheckin(location){
//            $.get({
//                url: Config.getRefAmbienteReq()+'/Local/backgroundSugerirLocal?background=1&latitude=' + DGlobal.latitudePlugin + '&longitude='+ DGlobal.longitudePlugin+'&alertar=1&&uuid='+DGlobal.idDevice,
//                callback: function(response) {
//                }
//            });  
            var obj = {
                url: Config.getRefAmbienteReq()+'/Local/backgroundSugerirLocal?background=1&latitude=' + location.latitude + '&longitude='+ location.longitude+'&alertar=1&&uuid='+DGlobal.idDevice,
                dados: null,
                tipo: 'GET',
                acao: function(){},
                error: errorAtt,
                scope: scope,
                exibeMSGCarregando: 0
            };
            GCS.conectar(obj);
        }

        function comparaLocalizacoes(localizacao){
           
            localizacaoAtual = localizacao;
            
            
            localizacaoAntiga = JSON.parse(localStorage.getItem("localizacaoAntigaLocal"));
            var diffRaioAnterior = JSON.parse(localStorage.getItem("diffRaioAnteriorLocal"));// Recupera os dados armazenados
            
            if(localizacaoAntiga){
                var diffRaio = calculaDiffRaio(localizacaoAntiga,localizacaoAtual);
                if(diffRaioAnterior > raio && localizacao.accuracy < raio && diffRaio < raio){
                    verificaCheckin(localizacao);
                }
                
                if(localizacaoAtual.accuracy < raio){
                     diffRaioAnterior = diffRaio;
                }else diffRaioAnterior = 0.0;
            }
            
            if(localizacao.accuracy < raio){
                localizacaoAntiga = localizacao;
            }
            
            localStorage.setItem("diffRaioAnteriorLocal", JSON.stringify(diffRaioAnterior));
            localStorage.setItem("localizacaoAntigaLocal", JSON.stringify(localizacaoAntiga));
        }

        function calculaDiffRaio(posicaoAnterior, posicaoAtual) {
            if(posicaoAnterior != null && posicaoAtual != null){
                var q1 = parseFloat(toRad(posicaoAnterior.latitude));
                var q2 = parseFloat(toRad(posicaoAtual.latitude));
                var AY = parseFloat(toRad(parseFloat(posicaoAtual.longitude)-parseFloat(posicaoAnterior.longitude)));
                var R = 6371e3; // gives d in metres
                var d = Math.acos( Math.sin(q1)*Math.sin(q2) + Math.cos(q1)*Math.cos(q2) * Math.cos(AY) ) * R;
                return d;
            }else return 0.0;
       }

        function toRad(value) {
            /** Converts numeric degrees to radians */
            return value * Math.PI / 180;
        }

        // This callback will be executed if a location-error occurs.  Eg: this will be called if user disables location-services.
        var failureFn = function(errorCode) {
            console.warn('- BackgroundGeoLocation error: ', errorCode);
        };
        
        function atualizarPosicaoServidorIOS(){
        console.log('[js] BackgroundFetch initiated');   

       // Get a reference to the plugin.
        var bgGeo = window.BackgroundGeolocation;

        //This callback will be executed every time a geolocation is recorded in the background.
        var callbackFn = function(location, taskId) {
            var coords = location.coords;
            console.log('- Location: ', JSON.stringify(location));
            console.log('Colocar para o alerta!!!!');
            comparaLocalizacoes(coords);
//            $.get({
//                url: Config.getRefAmbienteReq()+'/Acoes/verificarPosicao?background=1&latitude=' + coords.latitude + '&longitude='+ coords.longitude+'&uuid='+DGlobal.idDevice,
//                callback: function(response) {
//                    // process your response and whatnot.
//                    console.log('Resposta da requisição');
//                    console.log(response);
//                    // Must signal completion of your callbackFn.
//                    bgGeo.finish(taskId);
//                    Fetcher.finish();
//                    Fetcher.configure(atualizarPosicaoServidorIOS, erroAtualizarPosicalServidorIOS, {
//                        stopOnTerminate: false  // <-- true is default
//                    });
//                }
//            });  
            var obj = {
                url: Config.getRefAmbienteReq()+'/Acoes/verificarPosicao?background=1&latitude=' + coords.latitude + '&longitude='+ coords.longitude+'&uuid='+DGlobal.idDevice,
                dados: null,
                tipo: 'GET',
                acao: function(){
                    successHeartBeat(taskId);
                },
                error: errorAtt,
                scope: scope,
                exibeMSGCarregando: 0
            };
            GCS.conectar(obj);
        };
        
        function successHeartBeat(taskId){
            // Must signal completion of your callbackFn.
            bgGeo.finish(taskId);
            Fetcher.finish();
            Fetcher.configure(atualizarPosicaoServidorIOS, erroAtualizarPosicalServidorIOS, {
                stopOnTerminate: false  // <-- true is default
            });
            
            iniciaIntervalo();
            
        }

            // Listen to location events & errors.
            bgGeo.on('location', callbackFn, failureFn);

            BackgroundGeolocation.on('activitychange', function(activityName) {
                console.log('------------XX---> Activity changed: ', activityName);
//                $.get({
//                    url: Config.getRefAmbienteReq()+'/Acoes/verificarPosicao?background=1&latitude=' + DGlobal.latitudePlugin + '&longitude='+ DGlobal.longitudePlugin+'&uuid='+DGlobal.idDevice,
//                    callback: function(response) {
//                        // process your response and whatnot.
//                        console.log('Resposta da requisição');
//                        console.log(response);
//                        comparaLocalizacoes(response,true);
//                    }
//                });       
            });

            BackgroundGeolocation.on('heartbeat', function(params) {
                var lastKnownLocation = params.location;
                console.log('- heartbeat: ', lastKnownLocation);
                // Or you could request a new location
                BackgroundGeolocation.getCurrentPosition(function(location, taskId) {
                    console.log('- current position: ', location);

//                    $.get({
//                      url: Config.getRefAmbienteReq()+'/Acoes/verificarPosicao?background=1&latitude=' + location.coords.latitude + '&longitude='+ location.coords.longitude +'&uuid='+DGlobal.idDevice,
//                      callback: function(response) {
//                          // process your response and whatnot.
//                          console.log('Resposta da requisição');
//                          console.log(response);
//                          comparaLocalizacoes(location.coords);
//                          BackgroundGeolocation.finish(taskId);
//                          Fetcher.configure(atualizarPosicaoServidorIOS, erroAtualizarPosicalServidorIOS, {
//                            stopOnTerminate: false  // <-- true is default
//                        });
//                      }
//                    });       

                    var obj = {
                        url: Config.getRefAmbienteReq()+'/Acoes/verificarPosicao?background=1&latitude=' + location.coords.latitude + '&longitude='+ location.coords.longitude +'&uuid='+DGlobal.idDevice,
                        dados: null,
                        tipo: 'GET',
                        acao: function(){
                            successOnHeartBeat(location, taskId);
                        },
                        error: errorAtt,
                        scope: scope,
                        exibeMSGCarregando: 0
                    };
                    GCS.conectar(obj);

                });
            });
            
            function successOnHeartBeat(location, taskId){
                console.log('Resposta da requisição');
                  comparaLocalizacoes(location.coords);
                  BackgroundGeolocation.finish(taskId);
                  Fetcher.configure(atualizarPosicaoServidorIOS, erroAtualizarPosicalServidorIOS, {
                    stopOnTerminate: false  // <-- true is default
                });
                
                
            }

            // Fired whenever state changes from moving->stationary or vice-versa.
            bgGeo.on('motionchange', function(isMoving) {
              console.log('- onMotionChange: ', isMoving);
            });
            // Fired whenever a geofence transition occurs.
            bgGeo.on('geofence', function(geofence) {
              console.log('- onGeofence: ', geofence.identifier, geofence.location);
            });
            // Fired whenever an HTTP response is received from your server.
            bgGeo.on('http', function(response) {
              console.log('http success: ', response.responseText);
            }, function(response) {
              console.log('http failure: ', response.status);
            });

            // BackgroundGeoLocation is highly configurable.
            bgGeo.configure({
                // Geolocation config
                desiredAccuracy: 0,
                distanceFilter: 0,
                stationaryRadius: 25,
                // Activity Recognition config
                activityRecognitionInterval: 30000*5,
                stopTimeout: 5,
                // Application config
                //debug: true,  // <-- Debug sounds & notifications.
                stopOnTerminate: false,
                heartbeatInterval: 60*5,
                preventSuspend: true,
                startOnBoot: true,
                autoSync: true,
                maxDaysToPersist: 3,
                headers: {  // <-- Optional HTTP headers
                    "X-FOO": "bar"
                }                   
            }, function(state) {
                // This callback is executed when the plugin is ready to use.
                console.log("BackgroundGeolocation ready: ", state);

                if (!state.enabled) {                            

                    console.log('- Scheduler started');
                    bgGeo.start();
                    Fetcher.start(atualizarPosicaoServidorIOS, erroAtualizarPosicalServidorIOS);

                }
            });
        };   
        
        function onResume(){
            Fetcher.finish();
            Fetcher.configure(atualizarPosicaoServidorIOS, erroAtualizarPosicalServidorIOS, {
                stopOnTerminate: false  // <-- true is default
            });
            
            iniciaIntervalo();
        }
        
        function iniciar(){
            monitorarPosicaoIOSInicial();
        };

        return {
            setScope: setScope,
            monitorarPosicaoIOSInicial:monitorarPosicaoIOSInicial,
            iniciaIntervalo:iniciaIntervalo,
            onResume:onResume,
            iniciar:iniciar
        }; 
    }        
]);