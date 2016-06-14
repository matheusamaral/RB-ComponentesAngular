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
            if(valor.indexOf('.')===-1){
                valor=valor+',00';
            }
            else valor = valor.replace(".", ",");
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
    
    function oganizaDataDatePicker(date){
        var data = new Date(date);
        var mes = (data.getMonth())+1;
        if(mes < 10)
            mes = '0'+mes;
        var dia = data.getDate();
        var ano = data.getFullYear();
        
        return dia+'/'+mes+'/'+ano;
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
        oganizaDataDatePicker:oganizaDataDatePicker
    };
    
 }]);