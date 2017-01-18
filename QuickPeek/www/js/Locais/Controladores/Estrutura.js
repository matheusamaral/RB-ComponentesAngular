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
    
//    var onSuccess = function(position){
//        scope.dados.latitude = position.coords.latitude;
//        scope.dados.longitude = position.coords.longitude;
//    };
//
//    function onError(error) {
//        scope.dados.latitude = -21.135445;
//        scope.dados.longitude = -42.365089;
//    } 
    
    function montaHashtags(){
        if(scope.locais  && scope.locais.length)
        for(var i = 0; i < scope.locais.length;i++){
            scope.locais[i].linhasHashs = montaLinhasHashs(scope.locais[i].hashtags);
        }
    }
    
    function montaLinhasHashs(array){
        var contHash = 0;
        var linhaHash = new Array();
        var objHashs = new Array();
        for(var i = 0; i < array.length; i++){
            contHash++;
            linhaHash.push(array[i]);
            if(contHash == 5 || (contHash != 5 && i == array.length - 1)){
                objHashs.push(linhaHash);
                linhaHash = new Array();
                contHash = 0;
            }
        }
        return objHashs;
    }
  
    return {
        setScope:setScope,
        popular:popular,
        montaLinhasHashs:montaLinhasHashs
    };
 }]);
