'use strict';

angular.module('QuickPeek.Acoes.FiltroMapa', [ 
    'RB.pagina',
    'Cmp.Geolocation'
])

.factory('FiltroMapaAcoes', ['Pagina','Geolocation',
    function(Pagina,Geolocation){
    var scope;  
    
    function setScope(obj){
        scope = obj;
        return this;
    };
    
    function inicializar(){
        $('ion-side-menu-content').addClass('background-cinza-claro');
    };
    
    function selecionarCategoria(indice){
        for(var i = 0;i < scope.objCategorias.length;i++){
            for(var j = 0; j < scope.objCategorias[i].length; j++){
                if(scope.objCategorias[i][j].indice == indice){
                    if(scope.objCategorias[i][j].selecionado){
                        scope.objCategorias[i][j].selecionado = false;
                        if(scope.objCategorias[i][j].tipo == 0)removeCategoria(scope.objCategorias[i][j].id);
                        else removeTipo(scope.objCategorias[i][j].id);
                    }
                    else{
                        scope.objCategorias[i][j].selecionado = true;
                        if(scope.objCategorias[i][j].tipo == 0)addCategoria(scope.objCategorias[i][j].id);
                        else addTipo(scope.objCategorias[i][j].id);
                    }
                }
            }
        }
    }
    
    function addCategoria(id){
        scope.dados.categorias.push(id);
    }
    
    function removeCategoria(id){
        var achou = false, indiceAchado;
        for(var i = 0; i < scope.dados.categorias.length;i++){
            if(id == scope.dados.categorias[i]){
                achou = true;
                indiceAchado = i;
            }
        }
        
        if(achou){
            scope.dados.categorias.splice(indiceAchado,1);
        }
    }
    
    function addTipo(id){
        scope.dados.tipos.push(id);
    }
    
    function removeTipo(id){
        var achou = false, indiceAchado;
        for(var i = 0; i < scope.dados.tipos.length;i++){
            if(id == scope.dados.tipos[i]){
                achou = true;
                indiceAchado = i;
            }
        }
        
        if(achou){
            scope.dados.tipos.splice(indiceAchado,1);
        }
    }
    
    function redefinir(){
        for(var i = 0;i < scope.objCategorias.length;i++){
            for(var j = 0; j < scope.objCategorias[i].length; j++){
                scope.objCategorias[i][j].selecionado = false;
            }
        }
        
        scope.dados.tipos = new Array();
        scope.dados.categorias = new Array();
        if(DGlobal.filtro)delete DGlobal.filtro;
    }
    
    function aplicarFiltro(){
        DGlobal.filtro = scope.dados;
        Pagina.navegar({idPage:22});
    };
    
    function voltarMapa(){
        if(DGlobal.coordenadasAtual){
            Pagina.navegar({idPage:22,paramAdd:'?atualizando=0&latitude='+DGlobal.coordenadasAtual.latitude+'&longitude='+DGlobal.coordenadasAtual.longitude});
        }else{
            var options = { maximumAge: 3000, timeout: 3000, enableHighAccuracy: true };
            navigator.geolocation.getCurrentPosition(onSuccess,onError);
        }
    }
    
    var onSuccess = function(position){
        DGlobal.coordenadasAtual = {latitude:position.coords.latitude,longitude:position.coords.longitude};
        Pagina.navegar({idPage:22,paramAdd:'?atualizando=0&latitude='+DGlobal.coordenadasAtual.latitude+'&longitude='+DGlobal.coordenadasAtual.longitude});
    };

    function onError(error){
        var coordenadas = {latitude:-21.135445,longitude:-42.365089};
        Pagina.navegar({idPage:22,paramAdd:'?atualizando=0&latitude='+coordenadas.latitude+'&longitude='+coordenadas.longitude});
    }
    
    return {
        setScope:setScope,
        inicializar:inicializar,
        selecionarCategoria:selecionarCategoria,
        redefinir:redefinir,
        aplicarFiltro:aplicarFiltro,
        voltarMapa:voltarMapa
    };
    
 }]);
