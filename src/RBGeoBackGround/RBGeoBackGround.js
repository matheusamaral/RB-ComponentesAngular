'use strict';

angular.module('Cmp.Geolocation', [
    'RB.validacoesPadroes',
    'RB.pagina',
    'QuickPeek.Requisicao.Mapa'
])

.factory('Geolocation', ['VP','$timeout','Pagina','MapaRequisicoes',
    function (VP,$timeout,Pagina,MapaRequisicoes) {
        var scope,nomeObj,array = false;  
        
        function setScope(obj){
            scope = obj;
            return this;
        };
        
        function inicializar(nome,array){
           nomeObj = nome;
           scope[nomeObj] = {};
           scope[nomeObj].array = array;
           personalizaMapa();
           var options = { maximumAge: 0, timeout: 0, enableHighAccuracy: false };
           verifficaPosicao();
        }
        
        function verifficaPosicao(){
            if(DGlobal.localBarra && DGlobal.localBarra.success && DGlobal.localBarra.dados.checkIn == 1){
                scope[nomeObj].coordenadas = {lat:parseFloat(DGlobal.localBarra.dados.latitude),lng:parseFloat(DGlobal.localBarra.dados.longitude)};
                $timeout(function(){
                    initMap();
                },0);
            }else{
                navigator.geolocation.getCurrentPosition(onSuccess,onError);
            }
        }
        
        function initMap(){
            scope.icone = '';
            if(DGlobal.dadosUser && DGlobal.dadosUser.success)
                scope.icone = DGlobal.dadosUser.dados.usuarioEndereco.replace('origem','amn');
            scope[nomeObj].map = new google.maps.Map(document.getElementById('map'),
            {
                center: scope[nomeObj].coordenadas,
                scrollwheel: true,
                zoom: 20,
                draggable:true,
                disableDefaultUI: true,
                styles:scope[nomeObj].styleMap
            });
            
            scope[nomeObj].map.addListener('dragend', function() {   
                var obj = {atualizando:true,latitude:scope[nomeObj].map.getCenter().lat(),longitude:scope[nomeObj].map.getCenter().lng()};
                MapaRequisicoes.set({acaoPosterior:listarLocaisOnDragg,dados:obj,scope:scope,acaoSuccess:MapaRequisicoes.successCadastrarLocaisProximo}).cadastrarLocaisProximo();
                //console.log(scope[nomeObj].map.getCenter().lat());
            });
            
            if(scope[nomeObj].array)marcarNoMapa(scope[nomeObj].array);
        };
        
        function listarLocaisOnDragg(){
            var obj = {atualizando:true,latitude:scope[nomeObj].map.getCenter().lat(),longitude:scope[nomeObj].map.getCenter().lng()};
            MapaRequisicoes.set({dados:obj,scope:scope,acaoSuccess:MapaRequisicoes.successVerificarLocaisProximos}).verificarLocaisProximos();
        }
        
        function marcarNoMapa(array){
            console.log('array');
            console.log(array);
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
                    var marcou = false;
                    
                    if(array[i].localId != DGlobal.localBarra.dados.localId){
                        scope[nomeObj]['marker'+i] = new google.maps.Marker({
                            position: new google.maps.LatLng(array[i].latitude,array[i].longitude), // variável com as coordenadas Lat e Lng
                            map: scope.mapaGeral.map,
                            title:array[i].localNome,
                            icon:img,
                            idMarcador:array[i].localId,
                            label:array[i].localNome
                        });
                    }else{
                        scope[nomeObj]['marker'+i] = new google.maps.Marker({
                            position: new google.maps.LatLng(array[i].latitude,array[i].longitude), // variável com as coordenadas Lat e Lng
                            map: scope.mapaGeral.map,
                            title:array[i].localNome,
                            icon:scope.icone,
                            idMarcador:array[i].localId,
                            label:array[i].localNome
                        });
                        marcou = true;
                    }
                    
                    if(!marcou){
                        scope[nomeObj].suaPosicao = new google.maps.Marker({
                            position: new google.maps.LatLng(scope[nomeObj].coordenadas.lat,scope[nomeObj].coordenadas.lng), // variável com as coordenadas Lat e Lng
                            map: scope[nomeObj].map,
                            title:'Você',
                            icon:scope.icone
                        });
                    }

                    scope[nomeObj]['marker'+i].addListener('click', function(){
                        irLocal(this.idMarcador);
                    });
                }
            }
        }
        
        function irLocal(id){
            DGlobal.localAtual = id;
            Pagina.navegar({idPage:24,paramAdd:'?latitude='+scope[nomeObj].coordenadas.lat+'&longitude='+scope[nomeObj].coordenadas.lng+'&localId='+id+'&atualizando=0'});
        }
        
        var onSuccess = function(position){
            scope[nomeObj].coordenadas = {lat:position.coords.latitude,lng:position.coords.longitude};
            $timeout(function(){
                initMap();
            },0);
        };
        
        function onError(error) {
            scope[nomeObj].coordenadas = {lat:-21.135445,lng:-42.365089};
            $timeout(function(){
                initMap();
            },0);
        } 
        
        function personalizaMapa(){
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
                  "visibility": "on"
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
                  "visibility": "on"
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
        }
        
        return {
            setScope:setScope,
            inicializar:inicializar
        };
    }
]);