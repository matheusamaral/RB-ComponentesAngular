'use strict';

angular.module('RB.GD', [])

.factory('GD', [function() {      
    
    function inserirItem(nome, dados){
        if(String(localStorage.getItem(nome)) === 'null') localStorage.setItem(nome, JSON.stringify(dados));
        else{
            localStorage.removeItem(nome);
            localStorage.setItem(nome, JSON.stringify(dados));
        }
        return true;        
    };
    
    function recuperarItem(nome){
        if(localStorage.getItem(nome)){
            return localStorage.getItem(nome);
        }else{
            return false;
        }
    };
     
    function removerItem(nome){
        if(localStorage.getItem(nome)){
            localStorage.removeItem(nome);
            return true;
        }else return false;
    };
    
    function limparDadosLocal(){
        localStorage.clear();
        if(parseInt(localStorage.length) === 0) return true;
        else return false;
    };
    
    return {
        inserirItem:inserirItem,
        recuperarItem:recuperarItem,
        removerItem:removerItem,
        limparDadosLocal:limparDadosLocal
    };
}]);