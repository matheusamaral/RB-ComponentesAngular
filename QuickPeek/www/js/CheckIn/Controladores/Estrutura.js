'use strict';

angular.module('QuickPeek.Estrutura.CheckIn', [
    'RB.gcs',
    'RB.config',
    'RB.pagina',
    'RB.validacoesPadroes'
])

.factory('CheckInEstrutura', ['GCS','$timeout','Pagina','VP',
    function(GCS,$timeout,Pagina,VP) {
    var scope;  
    
    function setScope(obj){
        scope = obj;
        return this;
    }
    
    function popular(){
        scope.dados = {};
        
        //scope.locais = [{"localId":"26","localNome":"Via Ville Cal\u00e7ados e Roupas","localEndereco":"Rua Doutor Alves Pequeno, 180, Muria\u00e9","latitude":"-21.1321786","longitude":"-42.364416","distancia":"40.568991951743136","relevancia":"32.5","relevancia2":"0","hashtagId":"1","countHash":"1","categoriaId":"1","fotoLocal":null,"categoriaHashtagFoto":"img\/77.svg","categoriaLocalFoto":null},{"localId":"1","localNome":"Leil\u00e3o muria\u00e9","localEndereco":"Pra\u00e7a S\u00e3o Paulo, 109, Muria\u00e9","latitude":"-21.1354965","longitude":"-42.3650207","distancia":"40.76200663790436","relevancia":"2","relevancia2":"0","hashtagId":null,"countHash":null,"categoriaId":null,"fotoLocal":null,"categoriaHashtagFoto":null,"categoriaLocalFoto":null}];
        
        if(DGlobal.locais && DGlobal.locais.success){
            scope.locais = DGlobal.locais.dados;
        }
        
        if(DGlobal.dadosUsuario && DGlobal.dadosUsuario.success){
            scope.dadosUser = DGlobal.dadosUsuario.dados;
        }
    };
  
    return {
        setScope:setScope,
        popular:popular
    };
 }]);
