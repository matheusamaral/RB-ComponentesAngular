'use strict';

angular.module('QuickPeek.Estrutura.Publicacoes', [
    'RB.gcs',
    'RB.config',
    'RB.pagina',
    'RB.validacoesPadroes'
])

.factory('PublicacoesEstrutura', ['GCS','$timeout','Pagina','VP',
    function(GCS,$timeout,Pagina,VP) {
    var scope;  
    
    function setScope(obj){
        scope = obj;
        return this;
    }
    
    function popular(){
        scope.dados = {
            titulo:new Array(),
            tituloChip:new Array(),
            categoriaId:new Array(),
            idHashs: new Array(),
            midia: new Array(),
            midiasSelecionadas: new Array(),
            arquivoBase64: new Array()
        };
        
        scope.keyCodes = [32,62,13];
        
        if(DGlobal.dadosUsuario && DGlobal.dadosUsuario.success){
            scope.dadosUser = DGlobal.dadosUsuario.dados;
        }
        
        if(DGlobal.localPublicar){
            scope.local = DGlobal.localPublicar;
            console.log(scope.local);
            if(scope.local.nome){
                scope.local.dados = {};
                scope.local.dados.localNome = scope.local.nome;
            }
        }
        
        if(DGlobal.hashtags && DGlobal.hashtags.success){
            scope.hashtags = DGlobal.hashtags.dados;
            estruturaLinhas();
        }
        
    };
    
    function estruturaLinhas(){
        var contHash = 0;
        scope.objHash = new Array;
        var linhaHash = new Array();
        for(var i = 0; i < scope.hashtags.length; i++){
            contHash++;
            linhaHash.push(scope.hashtags[i]);
            if(contHash == 3 || (contHash != 3 && i == scope.hashtags.length - 1)){
                scope.objHash.push(linhaHash);
                linhaHash = new Array();
                contHash = 0;
            }
        }
    }
  
    return {
        setScope:setScope,
        popular:popular
    };
 }]);
