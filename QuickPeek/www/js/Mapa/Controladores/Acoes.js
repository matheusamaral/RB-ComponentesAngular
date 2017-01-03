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
        
    };
    
    function irFiltro(){
        Pagina.navegar({idPage:23});
    }
    
    return {
        setScope:setScope,
        inicializar:inicializar,
        irFiltro:irFiltro
    };
    
 }]);
