'use strict';

angular.module('QuickPeek.Estrutura.PesquisarMapa', [
    'RB.gcs',
    'RB.config',
    'RB.pagina',
    'RB.validacoesPadroes'
])

.factory('PesquisarMapaEstrutura', ['GCS','Config','Pagina','VP',
    function(GCS,Config,Pagina,VP) {
    var scope;  
    
    function setScope(obj){
        scope = obj;
        return this;
    }
    
    function popular(){
        scope.dados = {};
        
        scope.nSlide = 0;
        
        if(DGlobal.ultimosLocais && DGlobal.ultimosLocais.success){
            scope.locais = DGlobal.ultimosLocais.dados;
            console.log(scope.locais);
        }
    };
  
    return {
        setScope:setScope,
        popular:popular
    };
 }]);
