'use strict';

angular.module('QuickPeek.Acoes.Mapa', [ 
    'RB.pagina',
    'QuickPeek.Requisicao.Mapa',
    'Cmp.Geolocation'
])

.factory('MapaAcoes', ['Pagina','MapaRequisicoes','Geolocation',
    function(Pagina,MapaRequisicoes,Geolocation){
    var scope;  
    
    function setScope(obj){
        scope = obj;
        return this;
    };
    
    function inicializar(){
        Geolocation.setScope(scope).inicializar('mapaGeral');
    };
    
    return {
        setScope:setScope,
        inicializar:inicializar
    };
    
 }]);
