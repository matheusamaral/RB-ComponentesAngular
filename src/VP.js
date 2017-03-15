'use strict';

angular.module('RB.validacoesPadroes', ['toaster'])

.factory('VP', ['toaster','$timeout', function(toaster,$timeout){
    
    var scope = {};
    
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
        if(ehValido(campo)){
            if(campo.indexOf('-') !== -1){
                var dataArray = campo.split('-');
                var ano = dataArray[0];
                var mes = dataArray[1];
                var dia = dataArray[2];
                campo = dia+'/'+mes+'/'+ano;
            }
            return campo;
        }
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
    
    function getDDiPaises(){
        return [
        {"ddi":"93","pais":"AFEGANISTAO"},
        {"ddi":"27","pais":"AFRICA DOUL"},
        {"ddi":"1","pais":"ALASCA"},
        {"ddi":"355","pais":"ALBANIA"},
        {"ddi":"49","pais":"ALEMANHA"},
        {"ddi":"376","pais":"ANDORRA"},
        {"ddi":"244","pais":"ANGOLA"},
        {"ddi":"1","pais":"ANGUILLA"},
        {"ddi":"599","pais":"ANT.HOLANDESAS"},
        {"ddi":"1","pais":"ANTIGUA"},
        {"ddi":"966","pais":"ARABIAAUDITA"},
        {"ddi":"213","pais":"ARGELIA"},
        {"ddi":"54","pais":"ARGENTINA"},
        {"ddi":"374","pais":"ARMENIA"},
        {"ddi":"297","pais":"ARUBA"},
        {"ddi":"247","pais":"ASCENSAO ILHAS"},
        {"ddi":"61","pais":"AUSTRALIA"},
        {"ddi":"43","pais":"AUSTRIA"},
        {"ddi":"994","pais":"AZERBAIJAO"},
        {"ddi":"1","pais":"BAHAMAS"},
        {"ddi":"880","pais":"BANGLADESH"},
        {"ddi":"1","pais":"BARBADOS"},
        {"ddi":"973","pais":"BAREIN"},
        {"ddi":"375","pais":"BELARUS"},
        {"ddi":"32","pais":"BELGICA"},
        {"ddi":"501","pais":"BELIZE"},
        {"ddi":"229","pais":"BENIN"},
        {"ddi":"1","pais":"BERMUDAS"},
        {"ddi":"591","pais":"BOLIVIA"},
        {"ddi":"387","pais":"BOSNIA E HERZEGOVINA"},
        {"ddi":"267","pais":"BOTSUANA"},
        {"ddi":"55","pais":"Brasil"},
        {"ddi":"673","pais":"BRUNEI"},
        {"ddi":"359","pais":"BULGARIA"},
        {"ddi":"226","pais":"BURKINA FASO"},
        {"ddi":"257","pais":"BURUNDI"},
        {"ddi":"975","pais":"BUTAO"},
        {"ddi":"238","pais":"CABO VERDE"},
        {"ddi":"237","pais":"CAMAROES"},
        {"ddi":"855","pais":"CAMPUCHEA"},
        {"ddi":"1","pais":"CANADA"},
        {"ddi":"7","pais":"CASAQUISTAO"},
        {"ddi":"974","pais":"CATAR"},
        {"ddi":"1","pais":"CAYMAN ILHAS"},
        {"ddi":"235","pais":"CHADE"},
        {"ddi":"56","pais":"CHILE"},
        {"ddi":"86","pais":"CHINA"},
        {"ddi":"357","pais":"CHIPRE"},
        {"ddi":"65","pais":"CINGAPURA"},
        {"ddi":"57","pais":"COLOMBIA"},
        {"ddi":"269","pais":"COMORES"},
        {"ddi":"242","pais":"CONGO"},
        {"ddi":"682","pais":"COOK ILHAS"},
        {"ddi":"850","pais":"COREIA DOORTE"},
        {"ddi":"82","pais":"COREIA DOUL"},
        {"ddi":"225","pais":"COSTA DO MARFIM"},
        {"ddi":"506","pais":"COSTA RICA"},
        {"ddi":"385","pais":"CROACIA"},
        {"ddi":"53","pais":"CUBA"},
        {"ddi":"246","pais":"DIEGO GARCIA"},
        {"ddi":"45","pais":"DINAMARCA"},
        {"ddi":"253","pais":"DJIBUTI"},
        {"ddi":"1","pais":"DOMINICA"},
        {"ddi":"1","pais":"DOMINICANA REP"},
        {"ddi":"20","pais":"EGITO"},
        {"ddi":"503","pais":"ELALVADOR"},
        {"ddi":"971","pais":"EMIRADOS A. UNIDOS"},
        {"ddi":"593","pais":"EQUADOR"},
        {"ddi":"291","pais":"ERITREA"},
        {"ddi":"386","pais":"ESLOVENIA"},
        {"ddi":"34","pais":"ESPANHA"},
        {"ddi":"1","pais":"ESTADOS UNIDOS"},
        {"ddi":"372","pais":"ESTONIA"},
        {"ddi":"251","pais":"ETIOPIA"},
        {"ddi":"298","pais":"FAROE ILHAS"},
        {"ddi":"679","pais":"FIJI"},
        {"ddi":"63","pais":"FILIPINAS"},
        {"ddi":"358","pais":"FINLANDIA"},
        {"ddi":"886","pais":"FORMOSA"},
        {"ddi":"33","pais":"FRANCA"},
        {"ddi":"241","pais":"GABAO"},
        {"ddi":"220","pais":"GAMBIA"},
        {"ddi":"233","pais":"GANA"},
        {"ddi":"995","pais":"GEORGIA"},
        {"ddi":"350","pais":"GIBRALTAR"},
        {"ddi":"1","pais":"GRANADA"},
        {"ddi":"30","pais":"GRECIA"},
        {"ddi":"299","pais":"GROENLANDIA"},
        {"ddi":"590","pais":"GUADALUPE"},
        {"ddi":"1","pais":"GUAM"},
        {"ddi":"502","pais":"GUATEMALA"},
        {"ddi":"592","pais":"GUIANA"},
        {"ddi":"594","pais":"GUIANA FRANCESA"},
        {"ddi":"224","pais":"GUINE"},
        {"ddi":"240","pais":"GUINE EQUATORIAL"},
        {"ddi":"245","pais":"GUINE-BISSAU"},
        {"ddi":"509","pais":"HAITI"},
        {"ddi":"1","pais":"HAVAI"},
        {"ddi":"31","pais":"HOLANDA"},
        {"ddi":"504","pais":"HONDURAS"},
        {"ddi":"852","pais":"HONG KONG"},
        {"ddi":"36","pais":"HUNGRIA"},
        {"ddi":"967","pais":"IEMEN REP."},
        {"ddi":"91","pais":"INDIA"},
        {"ddi":"62","pais":"INDONESIA"},
        {"ddi":"98","pais":"IRA"},
        {"ddi":"964","pais":"IRAQUE"},
        {"ddi":"353","pais":"IRLANDA"},
        {"ddi":"354","pais":"ISLANDIA"},
        {"ddi":"972","pais":"ISRAEL"},
        {"ddi":"39","pais":"ITALIA"},
        {"ddi":"1","pais":"JAMAICA"},
        {"ddi":"81","pais":"JAPAO"},
        {"ddi":"962","pais":"JORDANIA"},
        {"ddi":"686","pais":"KIRIBATI"},
        {"ddi":"965","pais":"KUWEIT"},
        {"ddi":"856","pais":"LAOS"},
        {"ddi":"266","pais":"LESOTO"},
        {"ddi":"371","pais":"LETONIA"},
        {"ddi":"961","pais":"LIBANO"},
        {"ddi":"231","pais":"LIBERIA"},
        {"ddi":"218","pais":"LIBIA"},
        {"ddi":"423","pais":"LIECHTENSTEIN"},
        {"ddi":"370","pais":"LITUANIA"},
        {"ddi":"352","pais":"LUXEMBURGO"},
        {"ddi":"853","pais":"MACAU"},
        {"ddi":"389","pais":"MACEDONIA"},
        {"ddi":"261","pais":"MADAGASCAR"},
        {"ddi":"60","pais":"MALASIA"},
        {"ddi":"265","pais":"MALAVI"},
        {"ddi":"960","pais":"MALDIVAS"},
        {"ddi":"223","pais":"MALI"},
        {"ddi":"356","pais":"MALTA"},
        {"ddi":"500","pais":"MALVINAS ILHAS"},
        {"ddi":"1","pais":"MARIANASORTE ISL."},
        {"ddi":"212","pais":"MARROCOS"},
        {"ddi":"692","pais":"MARSHALL ILHAS"},
        {"ddi":"596","pais":"MARTINICA"},
        {"ddi":"230","pais":"MAURICIO"},
        {"ddi":"222","pais":"MAURITANIA"},
        {"ddi":"269","pais":"MAYOTTE(ILHAS)"},
        {"ddi":"52","pais":"MEXICO"},
        {"ddi":"691","pais":"MICRONESIA"},
        {"ddi":"838","pais":"MIDWAY ILHAS"},
        {"ddi":"258","pais":"MOCAMBIQUE"},
        {"ddi":"373","pais":"MOLDOVA"},
        {"ddi":"976","pais":"MONGOLIA"},
        {"ddi":"382","pais":"MONTENEGRO"},
        {"ddi":"1","pais":"MONTSERRAT"},
        {"ddi":"264","pais":"NAMIBIA"},
        {"ddi":"674","pais":"NAURU"},
        {"ddi":"977","pais":"NEPAL"},
        {"ddi":"505","pais":"NICARAGUA"},
        {"ddi":"227","pais":"NIGER"},
        {"ddi":"234","pais":"NIGERIA"},
        {"ddi":"683","pais":"NIUE"},
        {"ddi":"672","pais":"NORFOLK ILHA"},
        {"ddi":"47","pais":"NORUEGA"},
        {"ddi":"687","pais":"NOVA CALEDONIA"},
        {"ddi":"64","pais":"NOVA ZELANDIA"},
        {"ddi":"968","pais":"OMA"},
        {"ddi":"680","pais":"PALAU"},
        {"ddi":"970","pais":"PALESTINA"},
        {"ddi":"507","pais":"PANAMA"},
        {"ddi":"675","pais":"PAPUAOVA GUINE"},
        {"ddi":"92","pais":"PAQUISTAO"},
        {"ddi":"595","pais":"PARAGUAI"},
        {"ddi":"51","pais":"PERU"},
        {"ddi":"48","pais":"POLONIA"},
        {"ddi":"1","pais":"PORTO RICO"},
        {"ddi":"351","pais":"PORTUGAL"},
        {"ddi":"377","pais":"PRINCIPADO MONACO"},
        {"ddi":"254","pais":"QUENIA"},
        {"ddi":"996","pais":"QUIRGUIZIA"},
        {"ddi":"44","pais":"REINO UNIDO"},
        {"ddi":"236","pais":"REP.CENTRO AFRICANA"},
        {"ddi":"421","pais":"REP.ESLOVAQUIA"},
        {"ddi":"420","pais":"REP.TCHECA"},
        {"ddi":"262","pais":"REUNIAO ILHAS"},
        {"ddi":"854","pais":"RODRIGUES ILHAS"},
        {"ddi":"40","pais":"ROMENIA"},
        {"ddi":"250","pais":"RUANDA"},
        {"ddi":"7","pais":"RUSSIA"},
        {"ddi":"1","pais":"S.KITTS &NEVIS"},
        {"ddi":"1","pais":"S.VICENTE ILHAS"},
        {"ddi":"833","pais":"SAARA ESPANHOL"},
        {"ddi":"677","pais":"SALOMAO ILHAS"},
        {"ddi":"685","pais":"SAMOA"},
        {"ddi":"684","pais":"SAMOA AMERICANA"},
        {"ddi":"1","pais":"SANTA LUCIA"},
        {"ddi":"378","pais":"SAO MARINO"},
        {"ddi":"239","pais":"SAO TOME E PRINCIPE"},
        {"ddi":"221","pais":"SENEGAL"},
        {"ddi":"232","pais":"SERRA LEOA"},
        {"ddi":"381","pais":"SÃ�RVIA"},
        {"ddi":"248","pais":"SEYCHELLES"},
        {"ddi":"963","pais":"SIRIA"},
        {"ddi":"252","pais":"SOMALIA"},
        {"ddi":"94","pais":"SRI-LANKA"},
        {"ddi":"508","pais":"ST.PIERRE E MIQUELON"},
        {"ddi":"290","pais":"STA HELENA ILHAS"},
        {"ddi":"268","pais":"SUAZILANDIA"},
        {"ddi":"249","pais":"SUDAO"},
        {"ddi":"46","pais":"SUECIA"},
        {"ddi":"41","pais":"SUICA"},
        {"ddi":"597","pais":"SURINAME"},
        {"ddi":"992","pais":"TADJIQUISTAO"},
        {"ddi":"66","pais":"TAILANDIA"},
        {"ddi":"689","pais":"TAITI"},
        {"ddi":"255","pais":"TANZANIA"},
        {"ddi":"672","pais":"TERRIT.EXT.AUSTRALIA"},
        {"ddi":"670","pais":"TIMOR LESTE"},
        {"ddi":"228","pais":"TOGO"},
        {"ddi":"676","pais":"TONGA"},
        {"ddi":"690","pais":"TOQUELAU"},
        {"ddi":"1","pais":"TRINIDAD E TOBAGO"},
        {"ddi":"216","pais":"TUNISIA"},
        {"ddi":"993","pais":"TURCOMENIA"},
        {"ddi":"1","pais":"TURKS E CAICOS ILHAS"},
        {"ddi":"90","pais":"TURQUIA"},
        {"ddi":"688","pais":"TUVALU"},
        {"ddi":"380","pais":"UCRANIA"},
        {"ddi":"256","pais":"UGANDA"},
        {"ddi":"95","pais":"UNIAO DE MYANMAR"},
        {"ddi":"598","pais":"URUGUAI"},
        {"ddi":"998","pais":"UZBEQUISTAO"},
        {"ddi":"678","pais":"VANUATU"},
        {"ddi":"58","pais":"VENEZUELA"},
        {"ddi":"84","pais":"VIETNA"},
        {"ddi":"1","pais":"VIRGENS A. ILHAS"},
        {"ddi":"1","pais":"VIRGENS B.ILHAS"},
        {"ddi":"839","pais":"WAKE ILHAS"},
        {"ddi":"681","pais":"WALLIS E FUTUNA"},
        {"ddi":"243","pais":"ZAIRE"},
        {"ddi":"260","pais":"ZAMBIA"},
        {"ddi":"259","pais":"ZANZIBAR"},
        {"ddi":"263","pais":"ZIMBABUE"}
        ];
    }
    
    function gerarNumeroAleatorio(de,ate){
        var n = Math.floor(Math.random() * ate + de);
        return n;
    }
    
    function formataDataBanco(string){
        var dataArray = string.split('');
        var dia,mes,ano;
        dia = dataArray[0]+dataArray[1];
        mes = dataArray[2]+dataArray[3];
        ano = dataArray[4]+dataArray[5]+dataArray[6]+dataArray[7];
        
        return ano+'-'+mes+'-'+dia;
    }
    
    function pararEvento($event){
        $event.stopPropagation();
        $event.preventDefault();
    }
    
    function converteMinutosHoras(min){
        return Math.round(min/60);
    }
    
    function setScope(obj){
        scope = obj;
        return this;
    }
    
    function mudarString(string,de,para){
        if(string)
            return string.replace(de,para);
    }
    
    function converteMinutoTempoString(val){
        var tempoString='';
        var valor={minutos:val};
        if(valor.minutos<1)
            tempoString ='menos de 1 minuto';
        
        else{
            tempoString=valor.minutos+' minuto';
            if(valor.minutos>1)
                tempoString=tempoString+'s';
        }
        
        if(valor.minutos){
            valor.horas=parseInt(converteMinutosHoras(valor.minutos));
            if(valor.horas==1)
                tempoString=valor.horas+' hora';
            if(valor.horas>1)
                tempoString=valor.horas+' horas';
        }

        if(valor.horas){
            valor.dias=parseInt((valor.horas/24));
            if(valor.dias==1)
                tempoString=valor.dias+' dia';
            if(valor.dias>1)
                tempoString=valor.dias+' dias';
        }

        if(valor.dias){
            valor.meses=parseInt((valor.dias/30));
            if(valor.meses==1)
                tempoString=valor.meses+' mês';
            if(valor.meses>1)
                tempoString=valor.meses+' meses';
        }

        if(valor.meses){
            valor.anos=parseInt((valor.meses/12));
            if(valor.anos==1)
                tempoString=valor.anos+' ano';
            if(valor.anos>1)
                tempoString=valor.anos+' anos';
        }
        
        return tempoString;
    }
    
    return {
        converteMinutoTempoString:converteMinutoTempoString,
        mudarString:mudarString,
        setScope:setScope,
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
        retiraMascaraCPF:retiraMascaraCPF,
        getDDiPaises:getDDiPaises,
        gerarNumeroAleatorio:gerarNumeroAleatorio,
        formataDataBanco:formataDataBanco,
        pararEvento:pararEvento,
        converteMinutosHoras:converteMinutosHoras
    };
    
 }]);