'use strict';

angular.module('Cmp.AutoComplete',[
    'RB.validacoesPadroes',
    'RB.pagina'
])

.factory('AutoComplete', ['$timeout','VP','$q','$log',
    function($timeout,VP,$q,$log) {
    var scope;  
    
    function setScope(obj){
        scope = obj;
        return this;
    }   
    
    function iniciarAutoComplete(objeto,array,selecionar,textoAdicional){
        scope[objeto] = {};
        scope[objeto].opAuto = loadAll(array,textoAdicional);
        scope[objeto].selectedItemChange = selectedItemChange;
        scope[objeto].searchTextChange = searchTextChange;
        scope[objeto].newState = newState;
        scope[objeto].querySearch = querySearch;
        if(VP.ehValido(selecionar)){
            selecionaItem(selecionar,objeto);
        }
    }
    
    function selecionaItem(item,obj){
        var display,achou = false;
        for(var i = 0;i < scope[obj].opAuto.length;i++){
            if(item == scope[obj].opAuto[i].id){
                achou = true;
                display = scope[obj].opAuto[i].display;
            }
        }
        if(achou){
            scope[obj].selectedItem ={id:item,display:display};
        }
        else{
            scope[obj].selectedItem ={id:'',display:''};
        }
    }
    
    function newState(state) {
      alert("Sorry! You'll need to create a Constituion for " + state + " first!");
    }
    
    function loadAll(array,textoAdicional){
        var allItens = new Array();
        for(var i = 0; i < array.length;i++){
            if(array[i].pais){
                allItens.push({value:array[i].pais.toLowerCase+' (+'+array[i].ddi+')',display:array[i].pais+' (+'+array[i].ddi+')',id:array[i].ddi,dados:array[i]});
            }
        }
        return allItens;
    };
    
    function querySearch (objeto,query){
        var results = query ? scope[objeto].opAuto.filter(filtrarResultados(query)) : scope[objeto].opAuto, deferred;
        results.sort(compare);
        return results;
    }
    
    function compare(a,b) {
        if (a.ordem < b.ordem)
            return -1;
        else if (a.ordem > b.ordem)
            return 1;
        else 
            return 0;
    }
    
    function filtrarResultados(query){
        var lowercaseQuery = VP.retirarAcento(angular.lowercase(query));
        return function filterFn(state) {
            if(String(state.display) !== 'undefined' && String(state.display) !== 'null'){
                state.ordem = VP.retirarAcento(angular.lowercase(state.display)).indexOf(lowercaseQuery);
                if(angular.lowercase(state.display) === 'outros' || angular.lowercase(state.display) === 'outro'){
                    state.ordem = 100;
                }
                return VP.retirarAcento(angular.lowercase(state.display)).indexOf(lowercaseQuery) !== -1
                        || angular.lowercase(state.display) === 'outros' || angular.lowercase(state.display) === 'outro';
            }
        };
    };
    
    function searchTextChange(text) {
        
    }
    
    function selectedItemChange(item,model){
        if(item){
            scope[model.obj][model.attr] = item.id;
        }
    }
    
    return {
        setScope:setScope,
        iniciarAutoComplete:iniciarAutoComplete,
        querySearch:querySearch,
        loadAll:loadAll
    };
 }])
 
 .factory('AutoCompleteArray', ['$timeout','VP','$q','$log',
    function($timeout,VP,$q,$log){
    var scope;  
    
    function setScope(obj){
        scope = obj;
        return this;
    }   
    
    function iniciarAutoComplete(objPai,objArray,indice,objeto,array,selecionar){
        
        scope[objPai][objArray][indice][objeto] = {};
        scope[objPai][objArray][indice][objeto].opAuto = loadAll(array);
        scope[objPai][objArray][indice][objeto].selectedItemChange = selectedItemChange;
        scope[objPai][objArray][indice][objeto].searchTextChange   = searchTextChange;
        scope[objPai][objArray][indice][objeto].newState = newState;
        scope[objPai][objArray][indice][objeto].querySearch = querySearch;
        if(VP.ehValido(selecionar)){
            selecionaItem(selecionar,objPai,objArray,indice,objeto);
        }
    }
    
    function selecionaItem(item,objPai,objArray,indice,obj){
        var display,achou = false;
        for(var i = 0;i < scope[objPai][objArray][indice][obj].opAuto.length;i++){
            if(item == scope[objPai][objArray][indice][obj].opAuto[i].id){
                achou = true;
                display = scope[objPai][objArray][indice][obj].opAuto[i].display;
            }
        }
        if(achou){
            scope[objPai][objArray][indice][obj].selectedItem ={id:item,display:display};
        }
        else{
            scope[objPai][objArray][indice][obj].selectedItem ={id:'',display:''};
        }
    }
    
    function newState(state) {
      alert("Sorry! You'll need to create a Constituion for " + state + " first!");
    }
    
    function loadAll(array){
        var allItens = [];
        for(var i = 0; i < array.length;i++){
            if(array[i].titulo){
                allItens.push({value:array[i].titulo.toLowerCase,display:array[i].titulo,id:array[i].id});
            }
        }
        return allItens;
    };
    
    function querySearch (objPai,objArray,indice,objeto,query){
        var results = query ? scope[objPai][objArray][indice][objeto].opAuto.filter(filtrarResultados(query)) : scope[objPai][objArray][indice][objeto].opAuto, deferred;
        results.sort(compare);
        return results;
    }
    
    function compare(a,b) {
        if (a.ordem < b.ordem)
            return -1;
        else if (a.ordem > b.ordem)
            return 1;
        else 
            return 0;
    }
    
    function filtrarResultados(query){
        var lowercaseQuery = VP.retirarAcento(angular.lowercase(query));
        return function filterFn(state) {
            if(String(state.display) !== 'undefined' && String(state.display) !== 'null'){
                state.ordem = VP.retirarAcento(angular.lowercase(state.display)).indexOf(lowercaseQuery);
                if(angular.lowercase(state.display) === 'outros' || angular.lowercase(state.display) === 'outro'){
                    state.ordem = 100;
                }
                return VP.retirarAcento(angular.lowercase(state.display)).indexOf(lowercaseQuery) !== -1
                        || angular.lowercase(state.display) === 'outros' || angular.lowercase(state.display) === 'outro';
            }
        };
    };
    
    function searchTextChange(text) {
        
    }
    
    function selectedItemChange(item,objPai,objArray,indice,variavel){
        if(item){
            scope[objPai][objArray][indice][variavel] = item.id;
        }
    }
    
    return {
        setScope:setScope,
        iniciarAutoComplete:iniciarAutoComplete,
        querySearch:querySearch
    };
 }]);
 
 