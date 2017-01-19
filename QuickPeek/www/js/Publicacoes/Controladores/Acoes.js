'use strict';

angular.module('QuickPeek.Acoes.Publicacoes', [ 
    'RB.pagina',
    'QuickPeek.Requisicao.Publicacoes',
    'RB.validacoesPadroes'
])

.factory('PublicacoesAcoes', ['Pagina','PublicacoesRequisicoes','$timeout','VP',
    function(Pagina,PublicacoesRequisicoes,$timeout,VP){
    var scope;  
    
    function setScope(obj){
        scope = obj;
        return this;
    };
    
    function inicializar(){
        $('ion-side-menu-content').addClass('background-chekin');
    };
    
    function voltar(){
        Pagina.navegar({idPage:24,paramAdd:'?localId='+DGlobal.localAtual+'&atualizando=0'});
    }
    
    function escolherHash(hash){
        scope.hashClicada = true;
        scope.categoriaSelecionada = hash;
        scope.categoriaHashtags = hash.hashtags;
        calcularAlturaChat();
    }
    
    function addHash(chip){
        var achou = false, indiceAchado;
        for(var i = 0;i < scope.dados.tituloChip.length;i++){
            if(chip.titulo == scope.dados.tituloChip[i].titulo && scope.categoriaSelecionada.id == scope.dados.categoriaId[i]){
                achou = true;
                indiceAchado = i;
            }
        }
        
        if(achou){
            achou = false;
            scope.dados.tituloChip.splice(indiceAchado,1);
            scope.dados.titulo.splice(indiceAchado,1);
            scope.dados.categoriaId.splice(indiceAchado,1);
            scope.dados.idHashs.splice(indiceAchado,1);
            chip.selecionado = false;
        }else{
            scope.dados.tituloChip.push({titulo:chip.titulo,id:chip.id});
            scope.dados.titulo.push(chip.titulo);
            scope.dados.categoriaId.push(scope.categoriaSelecionada.id);
            scope.dados.idHashs.push(chip.id);
            chip.selecionado = true;
        }
        
        calcularAlturaChat();
    }
    
    function removerChip(chip){
        for(var i = 0; i < scope.categoriaHashtags.length;i++){
            if(scope.categoriaHashtags[i].id == chip.id)
               scope.categoriaHashtags[i].selecionado = false; 
        }
        console.log(chip);
        for(var i = 0 ;i < scope.dados.idHashs.length;i++){
            if(scope.dados.idHashs[i] == chip.id){
                scope.dados.titulo.splice(i,1);
                scope.dados.categoriaId.splice(i,1);
                scope.dados.idHashs.splice(i,1);
            }
        }
        calcularAlturaChat();
    }
    
    function calcularAlturaChat(){
        $timeout(function(){
            scope.alturaChatPub = $('#container-chat').height();
        },0);
    }
    
    function addHashDigitando(chip){
        var obj= {titulo:chip,id:scope.dados.tituloChip.length - 1};
        scope.dados.tituloChip.splice(scope.dados.tituloChip.length - 1 , 1);
        scope.dados.tituloChip.push(obj);
        scope.dados.categoriaId.push(10);
        scope.dados.titulo.push(chip);
        scope.dados.idHashs.push(obj.id);
        calcularAlturaChat();
    }
    
    function voltarCategorias(){
        scope.hashClicada = false;
        calcularAlturaChat();
    }
    
    function publicar(){
        console.log(scope.dados.categoriaId);
        console.log(scope.dados.titulo);
    }
    
    return {
        setScope:setScope,
        inicializar:inicializar,
        voltar:voltar,
        escolherHash:escolherHash,
        addHash:addHash,
        calcularAlturaChat:calcularAlturaChat,
        voltarCategorias:voltarCategorias,
        removerChip:removerChip,
        addHashDigitando:addHashDigitando,
        publicar:publicar
    };
    
 }]);
