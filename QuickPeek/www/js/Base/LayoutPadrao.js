'use strict';

angular.module('QuickPeek.layoutPadrao', [
    
])

.factory('layoutPadrao', [function() {
   
   var dados = {};       
    
    function set(obj){
        dados = obj;
        return this;
    };
    
    function limparPagina(){
        $('body').removeAttr('class');
        $('body').contents().remove();
    };
    
    function montar(){
        var conteudo = '<ion-side-menus>';
        if(dados.menu) conteudo += '<ion-side-menu side="left">'+dados.menu.montar()+'</ion-side-menu>';
        conteudo += '<ion-side-menu-content>'; 
        if(dados.barra) conteudo += dados.barra.montar();
        if(dados.conteudo) conteudo += dados.conteudo.montar();
        if(dados.rodape) conteudo += dados.rodape.montar();
        conteudo += '</ion-side-menu-content></ion-side-menus>';
        return conteudo;
    };
  
        
    return {
        set: set,
        limparPagina:limparPagina,
        montar: montar
    };
    
 }]);