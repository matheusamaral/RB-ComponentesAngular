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
        return this;
    }
    
    function popular(){
        scope.dados = {};
        getLocais();
        scope.locais = [{"dados":{"localId":"26","localNome":"Via Ville Cal\u00e7ados e Roupas","localEndereco":"Rua Doutor Alves Pequeno, 180, Muria\u00e9","latitude":"-21.1321786","longitude":"-42.364416","distancia":"40.568991951743136","relevancia":"9.6","relevancia2":"0"},"hashtags":[{"hashtagId":"2","hashtagTitulo":"pegaCale","hashtagQtd":"1","categoriaTitulo":"Atendimento","categoriaEndereco":"img\/78.svg","jaCurtiu":"0"},{"hashtagId":"1","hashtagTitulo":"321312","hashtagQtd":"1","categoriaTitulo":"Promo\u00e7\u00e3o","categoriaEndereco":"img\/77.svg","jaCurtiu":"0"}],"midias":[{"id":"2","endereco":"https:\/\/deborajeremias.files.wordpress.com\/2013\/07\/mesa-dr-eduardo-010.jpg","momento":"2016-12-28 15:54:21"},{"id":"3","endereco":"https:\/\/encrypted-tbn2.gstatic.com\/images?q=tbn:ANd9GcSJPi84h1P0A4Uy5HwgoN7EGeLjM5FYtwMysKramLMYbwsFBjMr","momento":"2016-12-28 15:47:52"},{"qtd":"2"}],"pessoas":[{"usuarioId":"2","visibilidade":"1","endereco":"img\/deOlhoAudacia.jpg","localId":"26","count":"5.3","count2":"1.1","minutos":"3104","seguindo":"0"},{"usuarioId":"3","visibilidade":"1","endereco":"https:\/\/scontent-gru2-1.xx.fbcdn.net\/v\/t1.0-9\/10400655_865616040215495_3784457810162904543_n.jpg?oh=44e1e2dd501a9bcb741d2351867d522e&oe=591DCD41","localId":"26","count":null,"count2":"0.0","minutos":"63600","seguindo":"0"},{"usuarioId":"4","visibilidade":"1","endereco":"https:\/\/scontent-gru2-1.xx.fbcdn.net\/v\/t1.0-9\/15095557_1322110414489661_8523253620421857301_n.jpg?oh=62b60d38f48b7c3c0461f6b2de841521&oe=591E29DE","localId":"26","count":null,"count2":"0.0","minutos":"13128","seguindo":"0"}],"qtdPerguntas":{"qtd":"0"}},{"dados":{"localId":"1","localNome":"'","localEndereco":"Pra\u00e7a S\u00e3o Paulo, 109, Muria\u00e9","latitude":"-21.1354965","longitude":"-42.3650207","distancia":"40.76200663790436","relevancia":"1","relevancia2":"0"},"hashtags":false,"midias":[{"qtd":"0"}],"pessoas":[{"usuarioId":"7","visibilidade":"3","endereco":"endereco\/endereco","localId":"1","count":null,"count2":"0.0","minutos":"11642","seguindo":"0"}],"qtdPerguntas":{"qtd":"8"}},{"dados":{"localId":"4","localNome":"Sebasti\u00e3o F Medeiros","localEndereco":"Rua Cel Izalino, 106, Muria\u00e9","latitude":"-21.1355497","longitude":"-42.365222","distancia":"40.78359503703235","relevancia":"1","relevancia2":"0"},"hashtags":false,"midias":[{"qtd":"0"}],"pessoas":[{"usuarioId":"37","visibilidade":"2","endereco":"endereco\/endereco","localId":"4","count":null,"count2":"0.0","minutos":"26055","seguindo":"0"}],"qtdPerguntas":{"qtd":"0"}},{"dados":{"localId":"2","localNome":"Espa\u00e7o Todeschini Muria\u00e9","localEndereco":"Pra\u00e7a S\u00e3o Paulo n\u00ba109 Loja 01\/B - Centro, Muria\u00e9","latitude":"-21.135445","longitude":"-42.365089","distancia":"40.766481932420184","relevancia":"1","relevancia2":"0"},"hashtags":false,"midias":[{"qtd":"0"}],"pessoas":[{"usuarioId":"5","visibilidade":"2","endereco":"endereco\/endereco","localId":"2","count":null,"count2":"0.0","minutos":"24604","seguindo":"0"}],"qtdPerguntas":{"qtd":"18"}}];
        console.log('scope.locais');
        console.log(scope.locais);
        
        $timeout(function(){
            montaHashtags();
        },0);
    };
    
    
    function getLocais(){
        navigator.geolocation.getCurrentPosition(onSuccess,onError);
        $timeout(function(){
            LocaisRequisicoes.set({dados:scope.dados,scope:scope,acaoSuccess:LocaisRequisicoes.successListarAreas}).listarAreas();
        },0);
    }
    
    var onSuccess = function(position){
        scope.dados.latitude = position.coords.latitude;
        scope.dados.longitude = position.coords.longitude;

    };

    function onError(error) {
        scope.dados.latitude = -21.135445;
        scope.dados.longitude = -42.365089;
    } 
    
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
