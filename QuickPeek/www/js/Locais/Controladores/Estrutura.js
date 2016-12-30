'use strict';

angular.module('QuickPeek.Estrutura.Locais', [
    'RB.gcs',
    'RB.config',
    'RB.pagina',
    'RB.validacoesPadroes',
    'QuickPeek.Requisicao.Locais'
])

.factory('LocaisEstrutura', ['GCS','Config','Pagina','VP','LocaisRequisicoes',
    function(GCS,Config,Pagina,VP,LocaisRequisicoes) {
    var scope;  
    
    function setScope(obj){
        scope = obj;
        return this;
    }
    
    function popular(){
        scope.dados = {};
        getLocais();
    };
    
    function getLocais(){
        scope.dados.latitude = -21;
        scope.dados.longitude = -42;
        LocaisRequisicoes.set({dados:scope.dados,scope:scope,acaoSuccess:LocaisRequisicoes.successListarAreas}).listarAreas();
        
        scope.hashtags = [
            {hashtagId:1,hashtagTitulo:'#PegaCale',hashtagQtd:8,categoriaEndereco:'img/77.svg',jaCurtiu:1},
            {hashtagId:2,hashtagTitulo:'#PegaCale1',hashtagQtd:8,categoriaEndereco:'img/78.svg',jaCurtiu:0},
            {hashtagId:3,hashtagTitulo:'#PegaCale2',hashtagQtd:8,categoriaEndereco:'img/79.svg',jaCurtiu:1},
            {hashtagId:4,hashtagTitulo:'#PegaCale3',hashtagQtd:8,categoriaEndereco:'img/80.svg',jaCurtiu:0},
            {hashtagId:5,hashtagTitulo:'#PegaCale4',hashtagQtd:8,categoriaEndereco:'img/64.svg',jaCurtiu:0},
            {hashtagId:6,hashtagTitulo:'#PegaCale5',hashtagQtd:8,categoriaEndereco:'img/65.svg',jaCurtiu:0},
            {hashtagId:7,hashtagTitulo:'#PegaCale6',hashtagQtd:8,categoriaEndereco:'img/66.svg',jaCurtiu:0},
            {hashtagId:8,hashtagTitulo:'#PegaCale7',hashtagQtd:8,categoriaEndereco:'img/67.svg',jaCurtiu:1},
            {hashtagId:9,hashtagTitulo:'#PegaCale8',hashtagQtd:8,categoriaEndereco:'img/68.svg',jaCurtiu:0},
            {hashtagId:10,hashtagTitulo:'#PegaCale9',hashtagQtd:8,categoriaEndereco:'img/69.svg',jaCurtiu:1},
            {hashtagId:11,hashtagTitulo:'#PegaCale10',hashtagQtd:8,categoriaEndereco:'img/70.svg',jaCurtiu:0}
        ];
        
        montaLinhasHashs();
    }
    
    function montaLinhasHashs(){
        var contHash = 0;
        var linhaHash = new Array();
        scope.objHashs = new Array();
        for(var i = 0; i < scope.hashtags.length; i++){
            contHash++;
            linhaHash.push(scope.hashtags[i]);
            if(contHash == 5 || (contHash != 5 && i == scope.hashtags.length - 1)){
                scope.objHashs.push(linhaHash);
                linhaHash = new Array();
                contHash = 0;
            }
        }
        console.log('scope.objHashs');
        console.log(scope.objHashs);
    }
  
    return {
        setScope:setScope,
        popular:popular
    };
 }]);
