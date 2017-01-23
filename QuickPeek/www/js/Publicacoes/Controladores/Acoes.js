'use strict';

angular.module('QuickPeek.Acoes.Publicacoes', [ 
    'RB.pagina',
    'QuickPeek.Requisicao.Publicacoes',
    'RB.validacoesPadroes'
])

.factory('PublicacoesAcoes', ['Pagina','PublicacoesRequisicoes','$timeout','VP','$cordovaCamera',
    function(Pagina,PublicacoesRequisicoes,$timeout,VP,$cordovaCamera){
    var scope;  
    
    function setScope(obj){
        scope = obj;
        return this;
    };
    
    function inicializar(){
        $('ion-side-menu-content').addClass('background-chekin');
        scope.alturaTela = $('body').height();
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
        console.log(scope.categoriaSelecionada);
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
            scope.dados.tituloChip.push({endereco:scope.categoriaSelecionada.endereco,titulo:chip.titulo,id:chip.id});
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
        if(scope.dadosUser && scope.dadosUser.usuarioEndereco)
            var img = scope.dadosUser.usuarioEndereco;
        else
            var img = 'img/bat.svg';
        var obj= {bordaDourada:true,endereco:img,titulo:chip,id:scope.dados.tituloChip.length - 1};
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
    
    function verfificaTecla(evento){
        console.log(evento);
    }
    
    function getImgs(){       
//        // Image picker will load images according to these settings
//        var options = {
//            width: 800,
//            height: 800,
//            quality: 80            // Higher is better
//        };
//
//        $cordovaImagePicker.getPictures(options).then(function (results) {
//            // Loop through acquired images
//            for (var i = 0; i < results.length; i++) {
//                console.log('Image URI: ' + results[i]);   // Print image URI
//            }
//        }, function(error) {
//            console.log('Error: ' + JSON.stringify(error));    // In case of error
//        });

        cordova.plugins.photoLibrary.getLibrary(
            function (library) {
                var i = 0;
                scope.dados.midia = new Array();
                // Here we have the library as array 
                library.forEach(function(libraryItem) {
                    //console.log(libraryItem);
                    if(i < 20){
                        scope.dados.midia.push(libraryItem);
                        abrirGaleria();
                        estruturaLinhas();
                    }
                    i++;
                });

            },
            function (err) {
              console.log('Error occured');
            },
            { // optional options 
              thumbnailWidth: 512,
              thumbnailHeight: 384,
              quality: 0.8
            },
            function partialCallback(partialLibrary) { // optional 
              // If this callback provided and loading library takes time, it will be called each 0.5 seconds with 
              // library that filled up to this time. You can start displaying photos to user right then.   
            }
        );

//var options = {
//      quality: 50,
//      destinationType: Camera.DestinationType.DATA_URL,
//      sourceType: Camera.PictureSourceType.CAMERA,
//      allowEdit: true,
//      encodingType: Camera.EncodingType.JPEG,
//      mediaType:2,
//      targetWidth: 100,
//      targetHeight: 100,
//      saveToPhotoAlbum: false,
//      correctOrientation:true
//    };
//
//    $cordovaCamera.getPicture(options).then(function(imageData) {
//      console.log(imageData);
//      var image = document.getElementById('myImage');
//      image.src = "data:image/jpeg;base64," + imageData;
//    }, function(err) {
//        // error
//    });
    };  
    
    function abrirGaleria(){
        scope.mostrarGaleria = true;
        $('ion-side-menu-content').addClass('remove-overflow-galeria');
        $timeout(function(){
            $('.tela-galeria').addClass('mostrar');
        },100);
    }
    
    function fecharGaleria(){
        scope.dados.midiasSelecionadas = new Array();
        $('.tela-galeria').removeClass('mostrar');
        $('ion-side-menu-content').removeClass('remove-overflow-galeria');
        $timeout(function(){
            scope.mostrarGaleria = false;
        },0);
    }
    
    function estruturaLinhas(){
        var contImg = 0;
        scope.objimg = new Array();
        var linhaImg = new Array();
        for(var i = 0; i < scope.dados.midia.length; i++){
            contImg++;
            for(var j = 0; j < scope.dados.midiasSelecionadas.length; j++){
                if(scope.dados.midiasSelecionadas[j].id == scope.dados.midia[i].id){
                    scope.dados.midia[i].selecionado = true;
                }
            }
            if(i == 0)
                linhaImg.push({exibirCamera:true});
            else
                linhaImg.push(scope.dados.midia[i-1]);
            if(contImg == 3 || (contImg != 3 && i == scope.dados.midia.length - 1)){
                scope.objimg.push(linhaImg);
                linhaImg = new Array();
                contImg = 0;
            }
        }
    }
    
    function addMidia(midia,$event,indice){
        VP.pararEvento($event);
        if(indice == 0){
            abrircamera();
        }else{
            if(midia.selecionado){
                midia.selecionado = false;
                for(var i = 0; i < scope.dados.midiasSelecionadas.length;i++){
                    if(midia.id == scope.dados.midiasSelecionadas[i].id){
                        scope.dados.midiasSelecionadas.splice(i,1);
                    }
                }
            }else{
                midia.selecionado = true;
                scope.dados.midiasSelecionadas.push(midia);
            }
        }
    }
    
    function abrircamera(){
        var options = {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: false,
            encodingType: Camera.EncodingType.JPEG,
            mediaType:2,
            targetWidth: 100,
            targetHeight: 100,
            saveToPhotoAlbum: false,
            correctOrientation:true
        };

        $cordovaCamera.getPicture(options).then(function(imageData) {
            console.log(imageData);
            scope.dados.midia.unshift(
                {photoURL:imageData,id:scope.dados.midiasSelecionadas.length+1}
            );
    
            estruturaLinhas();
            //var image = document.getElementById('myImage');
            //image.src = "data:image/jpeg;base64," + imageData;
        }, function(err) {
            // error
        });
    }
    
    function selecionarImgs(){
        for(var i = 0; i < scope.dados.midiasSelecionadas.length;i++){
            window.plugins.Base64.encodeFile(path, function(base64){
                obj = {arquivoBase64:base64};
            });
        }
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
        publicar:publicar,
        verfificaTecla:verfificaTecla,
        getImgs:getImgs,
        abrirGaleria:abrirGaleria,
        fecharGaleria:fecharGaleria,
        addMidia:addMidia,
        selecionarImgs:selecionarImgs
    };
    
 }]);
