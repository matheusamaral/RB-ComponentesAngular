'use strict';

angular.module('RB.validacoesPadroes', ['toaster'])

.factory('VP', ['toaster', function(toaster) {
    
    function validaErro(campos, erros){
        
        var camposInvalidos = '';
        for (var i = 0;i< erros.length;i++){
            for (var j in campos) {
                if(campos[j].length){
                    for (var k in campos[j]){
                        if(campos[j][k].modelo == erros[i].campo){
                            camposInvalidos += campos[j][k].msgErro+': '+erros[i].erro+' \n';
                        }    
                    }    
                }else{
                    if(campos[j].modelo == erros[i].campo){
                        camposInvalidos += campos[j].msgErro+': '+erros[i].erro+' \n';
                    }
                }
            }
        }
        toaster.error({title: "Falhou", body:camposInvalidos});
    }
    
    function converteSegundosHoras(s){
        var hora,minuto,segundo,formatado;
        function calcHora(numero){
            if (numero <= 9){
              numero = "0"+numero;
            }
            return numero;
        }
        hora = calcHora(Math.floor(s/3600));
        minuto = calcHora(parseInt((s%3600)/60));
        segundo = calcHora(parseInt((s%3600)%60));
        formatado = hora+":"+minuto+":"+segundo;
        return formatado;
    }
    
    function converteIdNome(id, arrayNome){
        console.log(arrayNome);
        for(var i = 0;i < arrayNome.length;i++){
            if(id == arrayNome[i].id)
                return arrayNome[i].titulo;
        }
    }
    
    function maiorValor(atributo,array){
        var maiorValor = 0;
        for(var i=0; i < array.length; i++){
            if(parseInt(array[i][atributo]) > parseInt(maiorValor)){
                maiorValor = parseInt(array[i][atributo]);
            }
        }
        return maiorValor;
    }
    
    function menorData(atributo,array){
        var menorValor = 0;
        for(var i=0; i < array.length; i++){
            if((parseInt(dataInt(array[i][atributo])) < dataInt(menorValor) 
                    && dataInt(array[i][atributo]) !== 0) || 
                    ( menorValor === 0 && dataInt(array[i][atributo]) !== 0 )){
                menorValor = array[i][atributo];
            }
        }
        return menorValor === 0 ? '' : menorValor;
    }
    
    function maiorData(atributo,array){
        var maiorValor = 0;
        for(var i=0; i < array.length; i++){
            if((parseInt(dataInt(array[i][atributo])) > dataInt(maiorValor)
                    && dataInt(array[i][atributo]) !== 0) || 
                    (maiorValor === 0 && dataInt(array[i][atributo]) !== 0 )){
                maiorValor = array[i][atributo];
            }
        }
        return maiorValor === 0 ? '' : maiorValor;
    }
    
    function dataBancoVisaoArray(array, campo){
        angular.forEach(array, function(value, key) {
            value[campo] = value[campo].split('-')[2]+'/'+value[campo].split('-')[1]+'/'+value[campo].split('-')[0];
        });
    }
      
    function validarObj(obj, objSubst){
        var novo = Object.create(objSubst);
        if(ehValido(obj)){
            $.each(novo, function(indice, valor){
                if(ehValido(obj[indice])) novo[indice] = obj[indice];
                else novo[indice] = valor;
            });
        }
        return novo;
    };
   
    function removeReferenciaArrayObj(obj){
        if(ehValido(obj)){
            for(var i = 0; i < obj.length; i++){
                delete  obj[i].$$hashKey;                
            }
            return JSON.parse(JSON.stringify(obj));
            
        }
    };
    
    function removeReferenciaObj(obj){
        if(ehValido(obj)){
            for(var i = 0; i < obj.length; i++){
                delete  obj[i].$$hashKey;                
            }
            return JSON.parse(JSON.stringify(obj));
        }
    };
    
    function removeReferencia(obj){
        if(ehValido(obj)){
            if(obj instanceof Array)
                return removeReferenciaArrayObj(obj);
            else return removeReferenciaObj(obj);
        }
    };
    
    function ehValido(text){
        if(String(text) !== 'undefined' && String(text) !== 'null' && String(text) !== '' && String(text) !== '[]'){
            return true;
        }else return false;
    };
    
    /**
     * Retorna vazio caso a string não seja válida.
     * @param {String} text
     * @returns {String}
     */
    function vStr(text){
        if(ehValido(text)) return text;
        else return '';
    };
    
    function irTopoPagina(seletor, distancia){
        if(!ehValido) distancia = 210;
        if(ehValido($(seletor).offset())){
            $('html, body').animate({
               scrollTop: $(seletor).offset().top - distancia
            }, 1000);
            return true;
        }else return false;
    };
    
    function validarCampoForm(dados){
        for(var i=0;i<dados.erro.length;i++){
            $('[name='+dados.erro[i].name+']').attr('title', dados.erro[i].msg).addClass('erro').tooltip('show');
            $('[name='+dados.erro[i].name+']').attr('onkeyup', '$(\'[name='+dados.erro[i].name+']\').removeClass("erro")');
        }
    };
    
    function getAlturaPag(){
        if($('body').scrollTop() > 0) return $('body').scrollTop(); //Para motor google V8
        else if(document.documentElement.scrollTop > 0) return document.documentElement.scrollTop; //Para IE
        else return 0;
    };
    
    function maskValor(valor){
        $('body').append('<div id="input-mask-tt" style="position: fixed;visibility:hidden;"><span>'+valor+'</span></div>');
        var retorno = $('#input-mask-tt span').mask("#.##0,00", {reverse: true}).text();
        $('#input-mask-tt').remove();
        return retorno;
    };
    
    function fimDaPagina(acao){               
        var posicaoAtual = $(window).scrollTop() + screen.height + 340;
        var documentSize = $(document).height();
        var sizeWindow = $(window).height();


            posicaoAtual = $(window).scrollTop() + screen.height + 650;
            if ( posicaoAtual >= (documentSize) ) {                       
                acao();
            }


        $(window).resize(function() {
                posicaoAtual = $(window).scrollTop();
                documentSize = $(document).height();
                sizeWindow = $(window).height();
        });
    };    
    
    function serializeObject(dados){
       var o = {};
       var a = dados.serializeArray();
       $.each(a, function() {
           if (o[this.name]) {
               if (!o[this.name].push) {
                   o[this.name] = [o[this.name]];
               }
               o[this.name].push(this.value || '');
           } else {
               o[this.name] = this.value || '';
           }
       });
       return o;
    };
    
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
    
    function nl2br(str, is_xhtml) {
        //  discuss at: http://phpjs.org/functions/nl2br/
        // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        // improved by: Philip Peterson
        // improved by: Onno Marsman
        // improved by: Atli Þór
        // improved by: Brett Zamir (http://brett-zamir.me)
        // improved by: Maximusya
        // bugfixed by: Onno Marsman
        // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        //    input by: Brett Zamir (http://brett-zamir.me)
        //   example 1: nl2br('Kevin\nvan\nZonneveld');
        //   returns 1: 'Kevin<br />\nvan<br />\nZonneveld'
        //   example 2: nl2br("\nOne\nTwo\n\nThree\n", false);
        //   returns 2: '<br>\nOne<br>\nTwo<br>\n<br>\nThree<br>\n'
        //   example 3: nl2br("\nOne\nTwo\n\nThree\n", true);
        //   returns 3: '<br />\nOne<br />\nTwo<br />\n<br />\nThree<br />\n'

        var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br ' + '/>' : '<br>'; // Adjust comment to avoid issue on phpjs.org display
        
        return (str + '')
          .replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
      };  
      
    function getObjPorId(ref, arrayIds){
        var retorno = [];
        if(String(arrayIds.length) !== 'undefined'){
            for(var i=0;i<arrayIds.length;i++){
                for(var j=0;j<ref.length;j++){
                    if(ref[j].id == arrayIds[i]) retorno.push(ref[j]);
                }
            }
        }else{
            angular.forEach(arrayIds, function(value, key) {
                for(var j=0;j<ref.length;j++)
                    if(ref[j].id == value) retorno.push(ref[j]);
            });
        }
        return retorno;
    }  
    
    function moedaToFloat(valor) {
        if (!valor || valor === "") {
            valor = 0;
        } else {
            valor = valor.replace(/\./g, '');
            valor = valor.replace(",", ".");
            valor = valor.replace("R$", "");
            valor = parseFloat(valor);
        }
        return valor;
    }
    
    function decimalToFloat(valor) {
        if (!valor || valor === "") {
            valor = 0;
        } else {
            valor = valor.replace(",", ".");
            valor = parseFloat(valor);
        }
        return valor;
    }
    
    function floatToMoeda(valor) {
        if (!valor || valor === "") {
            valor = '0,00';
        } else {
            valor = String(valor);
            if(valor.indexOf('.')===-1 && valor.indexOf(',')===-1){
                valor=valor+',00';
            }
            else if(valor.indexOf(',')===-1){ 
                valor = valor.replace(".", ",");
            }
            if(valor.indexOf(',')>valor.length-3){
                valor=valor+'0';
            }
            valor=valor.slice(0,valor.indexOf(',')+3);
        }
        return valor;
    }
    
    function emailValido(email) {
        var regexp = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return regexp.test(email);
    }
    
    function organizaDataString(campo){
        if(campo.indexOf('/') !== -1){
            var dataArray = campo.split('/');
            var dia = dataArray[0];
            var mes = dataArray[1];
            var ano = dataArray[2];
            campo = ano+'-'+mes+'-'+dia;
        }
        return campo;
    }
    
    function organizaDataVisao(campo){
        if(campo.indexOf('-') !== -1){
            var dataArray = campo.split('-');
            var ano = dataArray[0];
            var mes = dataArray[1];
            var dia = dataArray[2];
            campo = dia+'/'+mes+'/'+ano;
        }
        return campo;
    }
    
    function retirarAcento(strToReplace) {
        var str_acento= "áàãâäéèêëíìîïóòõôöúùûüçÁÀÃÂÄÉÈÊËÍÌÎÏÓÒÕÖÔÚÙÛÜÇ",
        str_sem_acento = "aaaaaeeeeiiiiooooouuuucAAAAAEEEEIIIIOOOOOUUUUC",
        nova="";
        for (var i = 0; i < strToReplace.length; i++) {
            if (str_acento.indexOf(strToReplace.charAt(i)) != -1) {
                nova+=str_sem_acento.substr(str_acento.search(strToReplace.substr(i,1)),1);
            } else
                nova+=strToReplace.substr(i,1);            
        }
        return nova;
    };
    
    function dataInt( a ) {
        if (a == null || a == "") {
            return 0;
        }
        if(a.indexOf('/') !== -1){
            var brDatea = a.split('/');
            return (brDatea[2] + brDatea[1] + brDatea[0]) * 1;
        }
        var brDatea = a.split('-');
        return (brDatea[0] + brDatea[1] + brDatea[2]) * 1;
    }
    
    function validaNomecomposto(item){
        var nCaracteres = 0, nomes, stringN;
        if(ehValido(item)){
            nomes = item.split(" ");
            if(nomes.length > 1){
                if(nomes[nomes.length - 1]){
                    stringN = nomes[nomes.length - 1].split("");
                    nCaracteres = stringN.length;
                    if(nCaracteres > 1){
                        return true;
                    }
                    else {
                        return false;
                    }
                }
            }else{
                return false;
            }
        }else{
            return false;
        }
    }
    
    function getDataHoraAtual(){
        var data = new Date();
        var result = (data.getFullYear()+"-"+data.getMonth()+"-"+data.getDate()+" "+data.getHours()+":"+data.getMinutes()+":"+data.getSeconds());
        return result;
    }
    
    function formataDataDiaMes(data){
        var mes = new Date(data).getMonth();
        if(mes == 0){
            mes ='Janeiro';
        }else if(mes == 1){
            mes ='Fevereiro';
        }else if(mes == 2){
            mes ='Março';
        }else if(mes == 3){
            mes ='Abril';
        }else if(mes == 4){
            mes ='Maio';
        }else if(mes == 5){
            mes ='Junho';
        }else if(mes == 6){
            mes ='Julho';
        }else if(mes == 7){
            mes ='Agosto';
        }else if(mes == 8){
            mes ='Setembro';
        }else if(mes == 9){
            mes ='Outubro';
        }else if(mes == 10){
            mes ='Novembro';
        }else if(mes == 11){
            mes ='Dezembro';
        }
        var dia = new Date(data).getDate();
        var date = dia+' de '+mes;
        return date;
    }
    
    function coresGraficos(){
        var arrayCor = new Array();
        arrayCor.push('#4285F4');
        arrayCor.push('#34A853');
        arrayCor.push('#FBBC05');
        arrayCor.push('#EA4335');
        arrayCor.push('#ff7b82');
        arrayCor.push('#ff626a');
        arrayCor.push('#ff4852');
        arrayCor.push('#ff1522');
        arrayCor.push('#fb000d');
        arrayCor.push('#e1000c');
        arrayCor.push('#c8000a');
        arrayCor.push('#ae0009');
        arrayCor.push('#950008');
        arrayCor.push('#ff959a');
        arrayCor.push('#ffaeb3');
        arrayCor.push('#ffc8cb');
        arrayCor.push('#7b0006');
        arrayCor.push('#ffb280');
        arrayCor.push('#ffa266');
        arrayCor.push('#ff934d');
        arrayCor.push('#ff8333');
        arrayCor.push('#ff741a');
        arrayCor.push('#ff6400');
        arrayCor.push('#e65a00');
        arrayCor.push('#cc5000');
        arrayCor.push('#b34600');
        arrayCor.push('#993c00');
        arrayCor.push('#ffc199');
        arrayCor.push('#ffd1b3');
        arrayCor.push('#ffe0cc');
        arrayCor.push('#803200');
        arrayCor.push('#83d99a');
        arrayCor.push('#6fd38a');
        arrayCor.push('#5ccd7a');
        arrayCor.push('#48c66a');
        arrayCor.push('#3abb5d');
        arrayCor.push('#34A853');
        arrayCor.push('#2e9449');
        arrayCor.push('#288140');
        arrayCor.push('#226e36');
        arrayCor.push('#1c5a2d');
        arrayCor.push('#96dfaa');
        arrayCor.push('#aae5ba');
        arrayCor.push('#bdebc9');
        arrayCor.push('#164723');
        return arrayCor;
    }
    
    function mascaraCPF(cpf){
        var retorno;
        var part1 = cpf.slice(0,3);
        var part2 = cpf.slice(3,6);
        var part3 = cpf.slice(6,9);
        var part4 = cpf.slice(9);
        retorno = part1+'.'+part2+'.'+part3+'-'+part4;
        return retorno;
    }
    
    function retiraMascaraCPF(cpf){
        var retorno="";
        if(cpf){
            var variavel = cpf.split(".");
            if(variavel.length){
                for(var i=0; i<variavel.length;i++){
                    retorno=retorno+variavel[i];
                }
            }
            variavel=retorno.split("-");
            if(variavel.length){
                retorno="";
                for(var i=0; i<variavel.length;i++){
                    retorno=retorno+variavel[i];
                }
            }
        }
        return retorno;
    }
    
    return {
        ehValido:ehValido,
        validarObj:validarObj,
        irTopoPagina: irTopoPagina,
        validarCampoForm: validarCampoForm,
        getAlturaPag: getAlturaPag,
        maskValor: maskValor,
        fimDaPagina: fimDaPagina,
        serializeObject: serializeObject,
        capitalizeFirstLetter: capitalizeFirstLetter,
        vStr: vStr,
        nl2br: nl2br,
        getObjPorId: getObjPorId,
        moedaToFloat: moedaToFloat,
        decimalToFloat: decimalToFloat,
        floatToMoeda: floatToMoeda,
        emailValido: emailValido,
        removeReferencia: removeReferencia,
        validaErro:validaErro,
        organizaDataString:organizaDataString,
        organizaDataVisao:organizaDataVisao,
        retirarAcento:retirarAcento,
        dataInt:dataInt,
        validaNomecomposto:validaNomecomposto,
        getDataHoraAtual:getDataHoraAtual,
        dataBancoVisaoArray:dataBancoVisaoArray,
        maiorValor:maiorValor,
        menorData:menorData,
        maiorData:maiorData,
        converteIdNome:converteIdNome,
        formataDataDiaMes:formataDataDiaMes,
        coresGraficos:coresGraficos,
        converteSegundosHoras:converteSegundosHoras,
        mascaraCPF:mascaraCPF,
        retiraMascaraCPF:retiraMascaraCPF
    };
    
 }]);