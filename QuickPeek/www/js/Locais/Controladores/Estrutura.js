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
        scope.locais = [{"dados":{"localId":"26","localNome":"Via Ville Cal\u00e7ados e Roupas","localEndereco":"Rua Doutor Alves Pequeno, 180, Muria\u00e9","latitude":"-21.1321786","longitude":"-42.364416","distancia":"40.568991951743136","relevancia":"10.5","relevancia2":"0","checkIn":null},"hashtags":[{"hashtagId":"1","hashtagTitulo":"321312","hashtagQtd":"1","categoriaTitulo":"Promo\u00e7\u00e3o","categoriaEndereco":"img\/77.svg","jaCurtiu":"0"},{"hashtagId":"2","hashtagTitulo":"pegaCale","hashtagQtd":"1","categoriaTitulo":"Atendimento","categoriaEndereco":"img\/78.svg","jaCurtiu":"0"}],"midias":[{"id":"2","endereco":"https:\/\/deborajeremias.files.wordpress.com\/2013\/07\/mesa-dr-eduardo-010.jpg","momento":"2016-12-28 15:54:21"},{"id":"1","endereco":"img\/deOlhoAudacia.jpg","momento":"2016-12-28 14:55:48"},{"id":"3","endereco":"https:\/\/encrypted-tbn2.gstatic.com\/images?q=tbn:ANd9GcSJPi84h1P0A4Uy5HwgoN7EGeLjM5FYtwMysKramLMYbwsFBjMr","momento":"2016-12-28 15:47:52"}],"pessoas":[{"usuarioId":"2","visibilidade":"1","endereco":"img\/deOlhoAudacia.jpg","localId":"26","count":"6.1","count2":"1.1","minutos":"7233","seguindo":"0"},{"usuarioId":"9","visibilidade":"2","endereco":"endereco\/endereco","localId":"26","count":null,"count2":"0.0","minutos":"15976","seguindo":"0"},{"usuarioId":"3","visibilidade":"2","endereco":"endereco\/endereco","localId":"26","count":null,"count2":"0.0","minutos":"27430","seguindo":"0"}],"qtdPerguntas":"0","qtdMidias":"3","qtdPessoas":"6"},{"dados":{"localId":"4","localNome":"Sebasti\u00e3o F Medeiros","localEndereco":"Rua Cel Izalino, 106, Muria\u00e9","latitude":"-21.1355497","longitude":"-42.365222","distancia":"40.78359503703235","relevancia":"1","relevancia2":"0","checkIn":null},"hashtags":false,"midias":false,"pessoas":[{"usuarioId":"37","visibilidade":"2","endereco":"endereco\/endereco","localId":"4","count":null,"count2":"0.0","minutos":"30184","seguindo":"0"}],"qtdPerguntas":"0","qtdMidias":"0","qtdPessoas":"1"},{"dados":{"localId":"2","localNome":"Espa\u00e7o Todeschini Muria\u00e9","localEndereco":"Pra\u00e7a S\u00e3o Paulo n\u00ba109 Loja 01\/B - Centro, Muria\u00e9","latitude":"-21.135445","longitude":"-42.365089","distancia":"40.766481932420184","relevancia":"1","relevancia2":"0","checkIn":null},"hashtags":false,"midias":false,"pessoas":[{"usuarioId":"5","visibilidade":"2","endereco":"endereco\/endereco","localId":"2","count":null,"count2":"0.0","minutos":"28733","seguindo":"0"}],"qtdPerguntas":"15","qtdMidias":"0","qtdPessoas":"1"},{"dados":{"localId":"1","localNome":"'","localEndereco":"Pra\u00e7a S\u00e3o Paulo, 109, Muria\u00e9","latitude":"-21.1354965","longitude":"-42.3650207","distancia":"40.76200663790436","relevancia":"1","relevancia2":"0","checkIn":null},"hashtags":false,"midias":false,"pessoas":[{"usuarioId":"7","visibilidade":"3","endereco":"endereco\/endereco","localId":"1","count":null,"count2":"0.0","minutos":"15771","seguindo":"0"}],"qtdPerguntas":"8","qtdMidias":"0","qtdPessoas":"1"}];
        console.log('scope.locais');
        console.log(scope.locais);
        
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
