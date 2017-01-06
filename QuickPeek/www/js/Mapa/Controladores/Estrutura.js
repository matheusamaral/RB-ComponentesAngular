'use strict';

angular.module('QuickPeek.Estrutura.Mapa', [
    'RB.gcs',
    'RB.config',
    'RB.pagina',
    'RB.validacoesPadroes',
    'Cmp.Geolocation'
])

.factory('MapaEstrutura', ['GCS','$timeout','Pagina','VP','Geolocation',
    function(GCS,$timeout,Pagina,VP,Geolocation) {
    var scope;  
    
    function setScope(obj){
        scope = obj;
        return this;
    }
    
    function popular(){
        scope.dados = {};
        scope.dadosUser = {};
        
        calculaDimensoesMapa();
        
        $timeout(function(){
            if(DGlobal.dadosUser && DGlobal.dadosUser.success){
                scope.dadosUser = DGlobal.dadosUser.dados;
            }
            if(DGlobal.locais && DGlobal.locais.success){
                Geolocation.setScope(scope).inicializar('mapaGeral',DGlobal.locais.dados);
            }else{
                Geolocation.setScope(scope).inicializar('mapaGeral');
            }
            
        },0);
        
    };
    
    function calculaDimensoesMapa(){
        scope.larguraMapa = $('body').width();
        scope.alturaMapa = $('body').height() - 75;
    }
  
    return {
        setScope:setScope,
        popular:popular
    };
 }]);
