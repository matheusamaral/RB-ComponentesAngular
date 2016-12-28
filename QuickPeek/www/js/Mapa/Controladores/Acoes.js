'use strict';

angular.module('QuickPeek.Acoes.Mapa', [ 
    'RB.pagina',
    'QuickPeek.Requisicao.Mapa',
    'Cmp.Geolocation'
])

.factory('MapaAcoes', ['Pagina','MapaRequisicoes','Geolocation','$timeout',
    function(Pagina,MapaRequisicoes,Geolocation,$timeout){
    var scope;  
    
    function setScope(obj){
        scope = obj;
        return this;
    };
    
    function inicializar(){
        Geolocation.setScope(scope).inicializar('mapaGeral',getLocaisProximos);
    };
    
    function getLocaisProximos(){
        //alert(JSON.stringify(scope.mapaGeral.coordenadas));
        var obj = {
            latitude:scope.mapaGeral.coordenadas.lat,
            longitude:scope.mapaGeral.coordenadas.lng
        };
        MapaRequisicoes.set({acaoPosterior:marcarNoMapa,dados:obj,scope:scope,acaoSuccess:MapaRequisicoes.successVerificarLocaisProximos}).verificarLocaisProximos();
    }
    
    function marcarNoMapa(array){
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
            scope.mapaGeral.marker = new google.maps.Marker({
                position: new google.maps.LatLng(array[i].latitude,array[i].longitude), // variável com as coordenadas Lat e Lng
                map: scope.mapaGeral.map,
                title:array[i].localNome,
                icon:img,
                label:array[i].localNome
            });
        }
    }
    
    return {
        setScope:setScope,
        inicializar:inicializar
    };
    
 }]);
