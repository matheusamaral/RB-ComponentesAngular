'use strict';

angular.module('Cmp.Geolocation', [
    'RB.validacoesPadroes',
    'RB.pagina',
    'QuickPeek.Requisicao.Mapa'
])

.factory('Geolocation', ['VP','$timeout','Pagina','GeolocationPopovers','MapaRequisicoes',
    function (VP,$timeout,Pagina,GeolocationPopovers,MapaRequisicoes){
        var scope,nomeObj,array = false;  
        var gm = google.maps;
        
        function setScope(obj){
            scope = obj;
            return this;
        };
        
        function inicializar(nome,array){
           nomeObj = nome;
           scope[nomeObj] = {};
           scope[nomeObj].array = array;
           personalizaMapa(scope[nomeObj].array);
           verifficaPosicao();
        }
        
        function verifficaPosicao(){
            if(DGlobal.localBarra && DGlobal.localBarra.success && DGlobal.localBarra.dados.checkIn == 1){
                scope[nomeObj].coordenadas = {lat:parseFloat(DGlobal.localBarra.dados.latitude),lng:parseFloat(DGlobal.localBarra.dados.longitude)};
                initMap();
            }else{
                navigator.geolocation.getCurrentPosition(onSuccess,onError);
            }
        }
        
        function initMap(){
            $timeout(function(){
                scope[nomeObj].map = new gm.Map(document.getElementById('map'),
                {
                    center: scope[nomeObj].coordenadas,
                    scrollwheel: true,
                    zoom: 20,
                    clickableIcons:false,
                    draggable:true,
                    disableDefaultUI: true,
                    styles:scope[nomeObj].styleMap
                });

                scope[nomeObj].map.addListener('dragend', function() {   
                    var obj = {atualizando:0,latitude:scope[nomeObj].map.getCenter().lat(),longitude:scope[nomeObj].map.getCenter().lng()};
                    MapaRequisicoes.set({acaoPosterior:listarLocaisOnDragg,dados:obj,scope:scope,acaoSuccess:MapaRequisicoes.successCadastrarLocaisProximo}).cadastrarLocaisProximo();
                });

                $timeout(function(){
                    if(scope[nomeObj].array && scope[nomeObj].array.length)marcarNoMapa(scope[nomeObj].array);
                    else{
                        var iconEu = {
                            url:'img/97.svg', // url
                            scaledSize: new google.maps.Size(70, 70) // scaled size
                        };

                        var local;
                        if(DGlobal.localBarra.dados == 1)
                            local = 'Casa';

                        if(DGlobal.localBarra.dados == 2)
                            local = 'Trabalho'

                        scope[nomeObj]['markerEu'] = new gm.Marker({
                            position: new gm.LatLng(DGlobal.coordenadasAtual.latitude,DGlobal.coordenadasAtual.longitude),
                            title:local,
                            icon: iconEu,
                            zIndex: 50,
                            idMarcador:'markPrivado',
                            animation: gm.Animation.DROP,
                            map:scope[nomeObj].map
                        });
                    }
                },0);
            },0);
        };
        
        function listarLocaisOnDragg(){
            var obj = {atualizando:0,latitude:scope[nomeObj].map.getCenter().lat(),longitude:scope[nomeObj].map.getCenter().lng()};
            MapaRequisicoes.set({dados:obj,scope:scope,acaoSuccess:MapaRequisicoes.successVerificarLocaisProximos}).verificarLocaisProximos();
        }
        
        function marcarNoMapa(array){
            console.log('array');
            console.log(array);
            $timeout(function(){
                if(array){
                    for(var i = 0; i < array.length; i++){
                        var img = 'img/79.svg';
                        if(array[i].fotoLocal){
                            img = array[i].fotoLocal;
                        }else{
                            if(array[i].categoriaHashtagFoto){
                                img = array[i].categoriaHashtagFoto;
                            }else{
                                if(array[i].categoriaLocalFoto){
                                    img = array[i].categoriaLocalFoto;
                                }
                            }
                        }

                        var icon = {
                            url: img,
                            scaledSize: new google.maps.Size(40, 40) // scaled size
                        };
                        
                        scope[nomeObj]['marker'+i] = new gm.Marker({
                            position: new gm.LatLng(array[i].latitude,array[i].longitude),
                            title:array[i].localNome,
                            icon:icon,
                            zIndex: 100,
                            animation: gm.Animation.DROP,
                            scaledSize: new google.maps.Size(50, 50),
                            idMarcador:array[i].localId,
                            map:scope[nomeObj].map
                        });

                        scope[nomeObj]['marker'+i].addListener('click', function(){
                            GeolocationPopovers.setScope(scope,this);
                        });
                        
                        if(DGlobal.localBarra.dados.localId == array[i].localId){
                            var iconEu = {
                                url:'img/97.svg', // url
                                scaledSize: new google.maps.Size(70, 70) // scaled size
                            };
                            scope[nomeObj]['markerEu'] = new gm.Marker({
                                position: new gm.LatLng(array[i].latitude,array[i].longitude),
                                title:array[i].localNome,
                                icon: iconEu,
                                zIndex: 50,
                                idMarcador:array[i].localId,
                                animation: gm.Animation.DROP,
                                map:scope[nomeObj].map
                            });
                            
                            scope[nomeObj]['markerEu'].addListener('click', function(){
                                GeolocationPopovers.setScope(scope,this);
                            });
                        }
                    }
                }
            },0);
        }
        
        var onSuccess = function(position){
            scope[nomeObj].coordenadas = {lat:position.coords.latitude,lng:position.coords.longitude};
            initMap();
        };
        
        function onError(error) {
            onDeviceReady();
        } 
        
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
        
        function personalizaMapa(array){
            scope[nomeObj].styleMap = [
                {
                  "elementType": "geometry",
                  "stylers": [
                    {
                      "color": "#212121"
                    }
                  ]
                },
                {
                  "elementType": "labels.icon",
                  "stylers": [
                    {
                      "visibility": "off"
                    }
                  ]
                },
                {
                  "elementType": "labels.text.fill",
                  "stylers": [
                    {
                      "color": "#757575"
                    }
                  ]
                },
                {
                  "elementType": "labels.text.stroke",
                  "stylers": [
                    {
                      "color": "#212121"
                    }
                  ]
                },
                {
                  "featureType": "administrative",
                  "elementType": "geometry",
                  "stylers": [
                    {
                      "color": "#757575"
                    }
                  ]
                },
                {
                  "featureType": "administrative.country",
                  "elementType": "labels.text.fill",
                  "stylers": [
                    {
                      "color": "#9e9e9e"
                    }
                  ]
                },
                {
                  "featureType": "administrative.land_parcel",
                  "stylers": [
                    {
                      "visibility": "off"
                    }
                  ]
                },
                {
                  "featureType": "administrative.locality",
                  "elementType": "labels.text.fill",
                  "stylers": [
                    {
                      "color": "#bdbdbd"
                    }
                  ]
                },
                {
                  "featureType": "poi",
                  "elementType": "labels.text.fill",
                  "stylers": [
                    {
                      "color": "#757575"
                    }
                  ]
                },
                {
                  "featureType": "poi.park",
                  "elementType": "geometry",
                  "stylers": [
                    {
                      "color": "#181818"
                    }
                  ]
                },
                {
                  "featureType": "poi.park",
                  "elementType": "labels.text.fill",
                  "stylers": [
                    {
                      "color": "#616161"
                    }
                  ]
                },
                {
                  "featureType": "poi.park",
                  "elementType": "labels.text.stroke",
                  "stylers": [
                    {
                      "color": "#1b1b1b"
                    }
                  ]
                },
                {
                  "featureType": "road",
                  "elementType": "geometry.fill",
                  "stylers": [
                    {
                      "color": "#2c2c2c"
                    }
                  ]
                },
                {
                  "featureType": "road",
                  "elementType": "labels.text.fill",
                  "stylers": [
                    {
                      "color": "#8a8a8a"
                    }
                  ]
                },
                {
                  "featureType": "road.arterial",
                  "elementType": "geometry",
                  "stylers": [
                    {
                      "color": "#373737"
                    }
                  ]
                },
                {
                  "featureType": "road.highway",
                  "elementType": "geometry",
                  "stylers": [
                    {
                      "color": "#3c3c3c"
                    }
                  ]
                },
                {
                  "featureType": "road.highway.controlled_access",
                  "elementType": "geometry",
                  "stylers": [
                    {
                      "color": "#4e4e4e"
                    }
                  ]
                },
                {
                  "featureType": "road.local",
                  "elementType": "labels.text.fill",
                  "stylers": [
                    {
                      "color": "#616161"
                    }
                  ]
                },
                {
                  "featureType": "transit",
                  "elementType": "labels.text.fill",
                  "stylers": [
                    {
                      "color": "#757575"
                    }
                  ]
                },
                {
                  "featureType": "water",
                  "elementType": "geometry",
                  "stylers": [
                    {
                      "color": "#000000"
                    }
                  ]
                },
                {
                  "featureType": "water",
                  "elementType": "labels.text.fill",
                  "stylers": [
                    {
                      "color": "#3d3d3d"
                    }
                  ]
                }
              ];
                
            if(array && array.length){
                scope[nomeObj].styleMap.push(
                    {
                      "featureType": "poi",
                      "elementType": "labels.icon",
                      "stylers": [
                        {
                          "color": "#212121"
                        },
                        {
                          "visibility": "simplified"
                        }
                      ]
                    }
                );
            }else{
                scope[nomeObj].styleMap.push(
                    {
                      "featureType": "poi",
                      "elementType": "labels.icon",
                      "stylers": [
                        {
                          "visibility": "simplified"
                        }
                      ]
                    }
                );
            }
        }
        
        return {
            setScope:setScope,
            inicializar:inicializar
        };
    }
])

.factory('GeolocationPopovers', ['VP','$timeout','Pagina','$compile',
    function (VP,$timeout,Pagina,$compile) {
        var scope;
        var aberto = false;
        
        function setScope(obj,local){
            scope = obj;
            scope.localPopover = local;
            scope.popover = {};
            
            verificarPopoverAberto();
            
            inicializarMetodos();
            
            dimensaoTela();
            scope.popover.width = 300;
            
            $timeout(function(){
                moverCentro();
                iniciarCaracteristicas();
            },250);
            return this;
        }
        
        function inicializarMetodos(){
            
            if(DGlobal.localBarra && DGlobal.localBarra.success){
                scope.dadosbarra = DGlobal.localBarra.dados;
            }
            
            scope.irLocal = function(id,evento){
                VP.pararEvento(evento);
                DGlobal.localAtual = id;
                Pagina.navegar({idPage:24,paramAdd:'?latitude='+scope['mapaGeral'].coordenadas.lat+'&longitude='+scope['mapaGeral'].coordenadas.lng+'&localId='+id+'&atualizando=0'});
            };
            
            scope.calculaAltura = function(){
                $timeout(function(){
                    scope.popoverAltura = $('#popoverCorpo').height();
                },0);
            };
            
            scope.irCheckin = function (evento){
                sumirPopover(true);
                VP.pararEvento(evento);
                Pagina.navegar({idPage:29,paramAdd:'?latitude='+DGlobal.coordenadasAtual.latitude+'&longitude='+DGlobal.coordenadasAtual.longitude});
            };
            
            scope.checkInLocal = function(local,evento){
                sumirPopover(true);
                VP.pararEvento(evento);
                DGlobal.checkIn = {local:local};
                if(local.localTitulo)DGlobal.checkIn.local.localNome = local.localTitulo;
                Pagina.navegar({idPage:30});
            };
            
            scope.cancelarFechamentoAutomatico = function(){
                $timeout.cancel(scope.timeoutFechar);
            };
            
            scope.checkInLocal = function(local){
                DGlobal.checkIn = {local:local};
                if(local.localTitulo)DGlobal.checkIn.local.localNome = local.localTitulo;
                Pagina.navegar({idPage:30});
            }
            
            scope.pararEvento = function($event){
                VP.pararEvento($event);
            };
        }
        
        function verificarPopoverAberto(){
            if(!aberto){
                $(document).on('click', 'html', function(){
                    fecharPopup(true);
                });
            }
        }
        
        function fecharPopup(fechar){
            if(fechar)sumirPopover(true);
        }
        
        function dimensaoTela(){
            scope.telaLarg = $('html').width();
            scope.telaAlt = $('html').height();
        }
        
        function getCoordinates(local){
            var coord = {
                lat:local.position.lat(),
                lng:local.position.lng()
            };
            
            return coord;
        }
        
        function sumirPopover(fechar){
            if(fechar){
                $('.container-popover-mapa').removeClass('addOpacidade');  
                $timeout(function(){
                    $('.container-popover-mapa').remove();
                },250);
            }
            
            scope['mapaGeral'].map.setOptions({
                scrollwheel: true,
                draggable: true
            });
            
            aberto = false;
        }
        
        function fecharAutomaticamente(){
//            $timeout.cancel(scope.timeoutFechar);
//            scope.timeoutFechar = $timeout(function(){
//                sumirPopover(true);
//            },4000);
        }
        
        function moverCentro(){
            var center = getCoordinates(scope.localPopover);
            scope['mapaGeral'].map.panTo(center);
            scope.popover.x = ($('html').height()/2) - 100;
            scope.popover.y = ($('html').width()/2) + 115;
        }
        
        function iniciarCaracteristicas(){
            if(!scope.popover)scope.popover = {};
            chamarPopover();
        }
        
        function chamarPopover(){
            if(!aberto){
                $timeout(function(){
                    if(DGlobal.localBarra && DGlobal.localBarra.success && DGlobal.localBarra.dados.localId == scope.localPopover.idMarcador){
                        $('body').append($compile(estruturaPopoverUsuario())(scope));
                    }else{
                        $('body').append($compile(estruturaPopoverLocal())(scope));
                    }
                    $timeout(function(){
                        $('.container-popover-mapa').addClass('addOpacidade');   
                    },250);
                },0);
                
                aberto = true;
            }else{
                sumirPopover(true);     
            }
            
            scope['mapaGeral'].map.setOptions({ 
                scrollwheel: false,
                draggable: false
            });
            
            fecharAutomaticamente();
        }
        
        function estruturaPopoverLocal(){
            return '<div ng-init="calculaAltura()" style="top:{{popover.y - (popoverAltura + (popoverAltura/2))}}px;\n\
                    left:{{popover.x - (popover.width/2)}}px;\n\
                    width:{{popover.width}}px"\n\
                    class="container-popover-mapa"\n\
                    ng-click="irLocal(localPopover.idMarcador,$event)"\n\
                    id="popoverCorpo">\n\
                        <div class="corpo-popover-mapa row remove-padding text-rigth">\n\
                            <div class="icone-local-popover"\n\
                            style="background-image:url({{localPopover.icon.url}})"></div>\n\
                            <p class="p-local">{{localPopover.title}}</p>\n\
                            <div class="ponto-balao"></div>\n\
                        </div>\n\
                    </div>\n\
                    <div style="width:{{telaLarg}}px;\n\
                    height:{{telaAlt}}px" class="back-drop-popover"></div>';
        }
        
        function estruturaPopoverUsuario(){
            return '<div ng-init="calculaAltura()" style="top:{{popover.y - (popoverAltura + (popoverAltura/2))}}px;\n\
                    left:{{popover.x - (popover.width/2)}}px;\n\
                    width:{{popover.width}}px"\n\
                    class="container-popover-mapa"\n\
                    id="popoverCorpo" ng-click="pararEvento($event)">\n\
                        <div id="barra-local-atual"\n\
                        ng-class="{\'z-index-superior\' : dadosUser.tutorial == 3}"\n\
                        class="col remove-padding corpo-popover-mapa"\n\
                        ng-if="dadosbarra && dadosbarra.distancia">\n\
                            <div class="col">\n\
                                <div class="row remove-padding">\n\
                                    <p class="p-subtitulo">Você está agora em</p>\n\
                                </div>\n\
                                <p class="p-titulo-local">{{dadosbarra.localTitulo}}?</p>\n\
                            </div>\n\
                            <div class="text-right row">\n\
                                <button ng-click="irCheckin($event)"\n\
                                style="margin-right: auto;height: 36px;line-height: 11px;width: 107px;min-height: 36px" \n\
                                class="config-btn-mapa button button-outline button-positive">\n\
                                    Não\n\
                                </button>\n\
                                <button ng-click="checkInLocal(dadosbarra)"\n\
                                style="height: 36px;line-height: 11px;width: 107px;min-height: 36px" \n\
                                class="config-btn-mapa button button-positive">\n\
                                    Sim\n\
                                </button>\n\
                            </div>\n\
                            <div class="ponto-balao"></div>\n\
                        </div>\n\
                        <div ng-if="dadosbarra && dadosbarra.checkIn == 1" class="corpo-popover-mapa col remove-padding text-rigth">\n\
                            <div class="row">\n\
                                <p class="cinza-claro-popover">Você está aqui:</p>\n\
                            </div>\n\
                            <div id="barra-local-atual" style="display:flex" class="row">\n\
                                <div ng-if="dadosUser.visibilidadeCheckInId != 3" class="icone-local-popover-dourado"\n\
                                style="background-image:url({{dadosUser.usuarioEndereco}})">\n\
                                    <div class="container-privacidade-img">\n\
                                        <md-icon\n\
                                        ng-class="{\'ion-android-globe\' : dadosUser.visibilidadeCheckInId == 1,\n\
                                        \'ion-android-people\' : dadosUser.visibilidadeCheckInId == 2}">\n\
                                        </md-icon>\n\
                                    </div>\n\
                                </div>\n\
                                <div ng-if="dadosUser.visibilidadeCheckInId == 3" class="icone-local-popover-dourado"\n\
                                style="background-image:url({{dadosUser.avatarEndereco}})">\n\
                                    <div class="container-privacidade-img" style="background-image:url(img/56.svg)"></div>\n\
                                </div>\n\
                                <div class="" style="width:100%">\n\
                                    <p class="p-titulo-local">{{localPopover.title}}</p>\n\
                                    <div class="row remove-padding">\n\
                                        <p ng-if="dadosUser.visibilidadeCheckInId == 1" class="cinza-claro-popover">Privacidade: Pública</p>\n\
                                        <p ng-if="dadosUser.visibilidadeCheckInId == 2" class="cinza-claro-popover">Privacidade: Meus seguidores</p>\n\
                                        <p ng-if="dadosUser.visibilidadeCheckInId == 3" class="cinza-claro-popover">Privacidade: Anônima</p>\n\
                                    </div>\n\
                                </div>\n\
                                <div class="text-right">\n\
                                    <md-menu>\n\
                                        <md-button class="md-icon-button" ng-click="cancelarFechamentoAutomatico();$mdOpenMenu($event)">\n\
                                            <md-icon class="icone-tamanho-personalizado ion-android-more-vertical"></md-icon>\n\
                                        </md-button>\n\
                                        <md-menu-content width="4">\n\
                                            <md-menu-item>\n\
                                                <md-button ng-click="irCheckin($event)">\n\
                                                    Alterar localização\n\
                                                </md-button>\n\
                                            </md-menu-item>\n\
                                            <md-menu-item>\n\
                                                <md-button ng-click="checkInLocal(dadosbarra,$event)">\n\
                                                    Alterar privacidade\n\
                                                </md-button>\n\
                                            </md-menu-item>\n\
                                            <md-menu-item>\n\
                                                <md-button ng-click="ctrl.redial($event)">\n\
                                                    Navegar até o local\n\
                                                </md-button>\n\
                                            </md-menu-item>\n\
                                        </md-menu-content>\n\
                                    </md-menu>\n\
                                </div>\n\
                            </div>\n\
                            <div class="ponto-balao"></div>\n\
                        </div>\n\
                    </div>\n\
                    <div style="width:{{telaLarg}}px;\n\
                    height:{{telaAlt}}px" class="back-drop-popover"></div>';
        }
        
        return {
            chamarPopover:chamarPopover,
            setScope:setScope
        };
    }
]);