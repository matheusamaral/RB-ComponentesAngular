'use strict';

angular.module('QuickPeek.Estrutura.Locais', [
    'RB.gcs',
    'RB.config',
    'RB.pagina',
    'RB.validacoesPadroes',
    'QuickPeek.Requisicao.Locais'
])

.factory('LocaisEstrutura', ['$timeout','Config','Pagina','VP','LocaisRequisicoes',
    function($timeout,Config,Pagina,VP,LocaisRequisicoes) {
    var scope;  
    
    function setScope(obj){
        scope = obj;
        scope.busy = false;
        return this;
    }
    
    function popular(){
        scope.dados = {};
        
        if(DGlobal.locais && DGlobal.locais.success){
            scope.locais = DGlobal.locais.dados;
        }
        
        if(DGlobal.dadosUsuario && DGlobal.dadosUsuario.success){
            scope.dadosUser = DGlobal.dadosUsuario.dados;
        }
        
        $timeout(function(){
            montaHashtags();
        },0);
    };
    
    function montaHashtags(){
        if(scope.locais  && scope.locais.length){
            for(var i = 0; i < scope.locais.length;i++){
                scope.locais[i].linhasHashs = montaLinhasHashs(scope.locais[i].hashtags);
            }
        }
    }
    
    function montaLinhasHashs(array){
        var contHash = 0;
//        var linhaHash = new Array();
        var objHashs = new Array();
//        for(var i = 0; i < array.length; i++){
//            contHash++;
//            linhaHash.push(array[i]);
//            if(contHash == 3 || (contHash != 3 && i == array.length - 1)){
//                objHashs.push(linhaHash);
//                linhaHash = new Array();
//                contHash = 0;
//            }
//        }

        var arrays = {};
        arrays['1'] = new Array();
        arrays['2'] = new Array();
        arrays['3'] = new Array();
        for(var i = 0; i < array.length; i++){
            contHash++;
            arrays[contHash].push(array[i]);
            if(contHash == 3 || (contHash != 3 && i == array.length - 1)){
                contHash = 0;
            }
        }
        
        objHashs.push(arrays['1']);
        objHashs.push(arrays['2']);
        objHashs.push(arrays['3']);
        
        console.log(objHashs);
        return objHashs;
    }
  
    return {
        setScope:setScope,
        popular:popular,
        montaHashtags:montaHashtags
    };
 }]);
