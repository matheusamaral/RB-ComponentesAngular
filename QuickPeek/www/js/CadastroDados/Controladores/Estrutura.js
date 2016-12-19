'use strict';

angular.module('QuickPeek.Estrutura.CadastroDados', [
    'RB.gcs',
    'RB.config',
    'RB.pagina',
    'RB.validacoesPadroes'
])

.factory('CadastroDadosEstrutura', ['GCS','Config','Pagina','VP',
    function(GCS,Config,Pagina,VP) {
    var scope;  
    
    function setScope(obj){
        scope = obj;
        return this;
    }
    
    function popular(){
        scope.dados = {
            nome:'55',
            nascimento:'',
            generoId:'',
            avataresId:'',
            arquivo:'',
            arquivoAvatar:''
        };
        
        if(DGlobal.dadosSelfie){
            scope.dados.arquivo = DGlobal.dadosSelfie.arquivo;
            scope.dados.urlImg = DGlobal.dadosSelfie.urlImg;
        }
        
        if(DGlobal.dadosEditar){
            scope.dados = DGlobal.dadosEditar;
            scope.dados.editando = true;
            delete DGlobal.dadosEditar;
        }
        
        scope.genero = [{id:1,titulo:'Masculino'},{id:2,titulo:'Feminino'}];
    };
  
    return {
        setScope:setScope,
        popular:popular
    };
 }]);
