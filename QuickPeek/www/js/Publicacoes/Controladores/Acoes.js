'use strict';

angular.module('QuickPeek.Acoes.Publicacoes', [ 
    'RB.pagina',
    'QuickPeek.Requisicao.Publicacoes',
    'RB.validacoesPadroes'
])

.factory('PublicacoesAcoes', ['Pagina','PublicacoesRequisicoes','$timeout','VP','$cordovaCamera','$ionicPopup',
    function(Pagina,PublicacoesRequisicoes,$timeout,VP,$cordovaCamera,$ionicPopup){
    var scope;  
    
    function setScope(obj){
        scope = obj;
        return this;
    };
    
    function inicializar(){
        $('ion-side-menu-content').addClass('background-chekin');
        $timeout(function(){
            $('#chips-finais .md-chip-input-container input').attr('id', 'input-chip');
            scope.alturaTela = $('body').height();
        },0);
    };
    
    function voltar(){
        Pagina.navegar({idPage:24,paramAdd:'?latitude='+DGlobal.coordenadasAtual.latitude+'&longitude='+DGlobal.coordenadasAtual.longitude+'&localId='+DGlobal.localAtual+'&atualizando=0'});
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
        console.log('scope.categoriaHashtags');
        console.log(scope.categoriaHashtags);
        if(!scope.categoriaHashtags)scope.categoriaHashtags = new Array();
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
    
    function escolherHash(hash){
        scope.hashClicada = true;
        scope.categoriaSelecionada = hash;
        scope.categoriaHashtags = hash.hashtags;
        calcularAlturaChat();
    }
    
    function addHashDigitando(chip,nRemover){
        var img;
        if(scope.hashClicada){
            img = scope.categoriaSelecionada.endereco;
            scope.dados.categoriaId.push(scope.categoriaSelecionada.id);
        }else{
            scope.dados.categoriaId.push(10);
            if(scope.dadosUser && scope.dadosUser.usuarioEndereco){
                if(scope.dadosUser.visibilidadeCheckInId == 3){
                    img = scope.dadosUser.avatarEndereco;
                }else{
                    img = scope.dadosUser.usuarioEndereco;
                }
            }else
                img = 'img/bat.svg';
        }
        var obj= {bordaDourada:true,endereco:img,titulo:chip,id:scope.dados.tituloChip.length - 1};
        if(!nRemover)scope.dados.tituloChip.splice(scope.dados.tituloChip.length - 1 , 1);
        scope.dados.tituloChip.push(obj);
        scope.dados.titulo.push(chip);
        scope.dados.idHashs.push(obj.id);
        calcularAlturaChat();
    }
    
    function voltarCategorias(){
        scope.hashClicada = false;
        calcularAlturaChat();
    }
    
    function publicar(){
        var ext;
        if(scope.dados.arquivoBase64[0]){
            ext = scope.dados.arquivoBase64[0].split(';')[0].split('/')[1];
        }
        
        var obj = {
            titulo:scope.dados.titulo,
            categoriaId:scope.dados.categoriaId,
            arquivoBase64:scope.dados.arquivoBase64,
            extensao:ext,
            localId:scope.local.dados.localId
        };
        
        PublicacoesRequisicoes.set({dados:obj,scope:scope,acaoSuccess:PublicacoesRequisicoes.successPublicar}).publicar();
    }
    
    function verfificaTecla(evento){
        console.log(evento);
    }
    
    function verificaDataAtual(data){
        var dataAtual = new Date();
        var dataImg = data;
        
        var segundosDiferenca = Math.abs(dataAtual.getTime() - dataImg.getTime());
        var diasDiferenca = Math.ceil(segundosDiferenca / (1000 * 3600 * 24)); 
        
        if(diasDiferenca < 11)
            return true;
        else
            return false;
    }
    
    function getImgs(nAbrirGaleria){
        $timeout(function(){
            cordova.plugins.photoLibrary.getLibrary(
                function (library) {
                    scope.dados.midia = new Array();

                    library.forEach(function(libraryItem) {
                        //console.log(libraryItem);
                        if(verificaDataAtual(new Date(libraryItem.creationDate.split(' ')[0]))){
                            scope.dados.midia.push(libraryItem);
                        }
                    });

                    $timeout(function(){
                        estruturaLinhas();
                        if(!nAbrirGaleria)abrirGaleria();
                    },0);
                }
            );
        },0);
    };  
    
    function abrirGaleria(){
        $timeout(function(){
            scope.mostrarGaleria = true;
            $('ion-side-menu-content').addClass('remove-overflow-galeria');
            $timeout(function(){
                $('.tela-galeria').addClass('mostrar');
            },1000);
        },0);
    }
    
    function fecharGaleria(nApagar){
        if(!nApagar && scope.dados.arquivoBase64.length == 0)scope.dados.midiasSelecionadas = new Array();
        $('.tela-galeria').removeClass('mostrar');
        $('ion-side-menu-content').removeClass('remove-overflow-galeria');
        $timeout(function(){
            scope.mostrarGaleria = false;
        },500);
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
    
    function addMidia(midia,$event){
        VP.pararEvento($event);
        if(scope.dados.midiasSelecionadas.length >= 10){
            popupLimite();
        }else{
            if(midia.exibirCamera){
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
    }
    
    function abrircamera(){
        var options = {
            quality: 100,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: false,
            encodingType: Camera.EncodingType.JPEG,
            mediaType:2,
            targetWidth: 100,
            targetHeight: 100,
            saveToPhotoAlbum: true,
            correctOrientation:true
        };

        $cordovaCamera.getPicture(options).then(function(imageData) {
            console.log(imageData);
//            scope.dados.midia.unshift(
//                {photoURL:imageData,id:scope.dados.midiasSelecionadas.length+1}
//            );
            getImgs(true);
    
            //estruturaLinhas();
            //var image = document.getElementById('myImage');
            //image.src = "data:image/jpeg;base64," + imageData;
        }, function(err) {
            // error
        });
    }
    
    function selecionarImgs(){
        var arrayFiles = new Array;
        for(var i = 0; i < scope.dados.midiasSelecionadas.length;i++){
            window.plugins.Base64.encodeFile(scope.dados.midiasSelecionadas[i].photoURL, function(base64){
                arrayFiles.push(base64);
            });
        }
        scope.dados.arquivoBase64 = arrayFiles;
        fecharGaleria(true);
    }
    
    function fazerCheckin(){
        DGlobal.publicando = true;
        Pagina.navegar({idPage:29,paramAdd:'?latitude='+DGlobal.coordenadasAtual.latitude+'&longitude='+DGlobal.coordenadasAtual.longitude});
    }
    
    function gerarHashtag(){
        var input = $("#input-chip").val();
        var novaStr='';
        if(input.split('').length > 30){
            for(var i = 0; i < 31;i++){
                novaStr = novaStr+input.split('')[i];
            }
            $("#input-chip").val(novaStr);
        }
    }
    
    function popupLimite(){
        scope.popupVisibilidade = $ionicPopup.alert({
            scope:scope,
            title: 'Limite atingido',
            template:'<p style="color: black;">Você atingiu o limite máximo de <span class="negrito">10 mídias</span> por publicação</p>',
            buttons:[
                {
                    text:'OK',
                    type:['button-positive','button-clear'],
                }
            ]
        });
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
        selecionarImgs:selecionarImgs,
        fazerCheckin:fazerCheckin,
        gerarHashtag:gerarHashtag
    };
    
 }]);
