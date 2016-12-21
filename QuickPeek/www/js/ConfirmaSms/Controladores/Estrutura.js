'use strict';

angular.module('QuickPeek.Estrutura.ConfirmaSms', [
    'RB.gcs',
    'RB.config',
    'RB.pagina',
    'RB.validacoesPadroes'
])

.factory('ConfirmaSmsEstrutura', ['GCS','Config','Pagina','VP',
    function(GCS,Config,Pagina,VP) {
    var scope;  
    
    function setScope(obj){
        scope = obj;
        return this;
    }
    
    function popular(){
        scope.dadosSms = {
            ddi:'55',
            numero:'',
            codigo:''
        };
        
        if(DGlobal.dadosUsuario && DGlobal.dadosUsuario.success){
            scope.dadosSms.ddi = separaDdi(DGlobal.dadosUsuario.dados.telefone).ddi;
            scope.dadosSms.numero = separaDdi(DGlobal.dadosUsuario.dados.telefone).num;
        }
        
        scope.ddis = VP.getDDiPaises();
    };
    
    function separaDdi(num){
        var tel = {ddi:'',num:''};
        var numeroQuebrado = num.split('');
        tel.ddi = numeroQuebrado[0]+numeroQuebrado[1];
        for(var i = 2; i < numeroQuebrado.length;i++){
            tel.num = tel.num+numeroQuebrado[i];
        }
        
        return tel;
    }
  
    return {
        setScope:setScope,
        popular:popular
    };
 }]);
