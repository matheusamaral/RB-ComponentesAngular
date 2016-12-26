'use strict';

angular.module('QuickPeek.Estrutura.Seguidores', [
    'RB.gcs',
    'RB.config',
    'RB.pagina',
    'RB.validacoesPadroes'
])

.factory('SeguidoresEstrutura', ['GCS','Config','Pagina','VP',
    function(GCS,Config,Pagina,VP) {
    var scope;  
    
    function setScope(obj){
        scope = obj;
        return this;
    }
    
    function popular(){
        scope.dados = {
            seguidores:[
                {urlImg:'',nome:'Arthur Maneiro',seguindo:0},
                {urlImg:'',nome:'Arthur Maneiro 2',seguindo:0},
                {urlImg:'',nome:'Anderson Campos',seguindo:1}
            ]
        };
        
        if(DGlobal.seguidores && DGlobal.seguidores.success){
            alert(JSON.stringify(DGlobal.seguidores.dados));
            scope.dados.seguidores = DGlobal.seguidores.dados;
        }
    };
  
    return {
        setScope:setScope,
        popular:popular
    };
 }]);
