'use strict';

angular.module('RB.Filtro', [ 
'RB.validacoesPadroes'
])

.factory('Filtro', ['VP',
    function(VP) {
        
        var dados = {};

        function validarIn(valor,filtro){
            var valido = 0;
            $.each(filtro, function (index, elementoFiltro){
                if(elementoFiltro.status && String(elementoFiltro.valor) === String(valor)){
                    valido = 1;
                }
            });
            return valido;
        } 
        
        function validarEntre(valor,filtro){
           switch(filtro.tipoData){
               case 'date' :
                    if(VP.dataInt(filtro.inicio) <= VP.dataInt(valor) && VP.dataInt(filtro.fim) >= VP.dataInt(valor)){
                        return 1;
                    }
                    break;
                default:
                    if(parseInt(filtro.inicio) <= parseInt(valor) &&
                            parseInt(filtro.fim) >= parseInt(valor)){
                        return 1;
                    }
                  break;      
            }
            return 0;
        }
        
        
        function validarIgualdade(valor,filtro){
            if(String(filtro.valor) === String(valor) || String(filtro.valor) === '0'){
                return 1;
            }
            return 0;
        }
        
        function validarParte(valor,filtro){
            if(valor.indexOf(filtro.valor) !== -1){
                return 1;
            }
            return 0;
        }
        
        function filtrar(filtro){
            if(!dados.length){
                return []; 
            }
            var arrayInverso = VP.removeReferencia(dados);
            var retorno = [];
            arrayInverso.forEach(function(elemento){
                var valido = 1;
                $.each(filtro, function( indexFiltro, objFiltro){
                    switch(objFiltro.tipo){
                        case '=':
                            valido *= validarIgualdade(elemento[indexFiltro],objFiltro);
                            break;
                        case '%':
                            valido *= validarParte(elemento[indexFiltro],objFiltro);
                            break;
                        case 'in':
                            valido *= validarIn(elemento[indexFiltro],objFiltro);
                            break;
                        case 'entre':
                            valido *= validarEntre(elemento[indexFiltro],objFiltro);
                            break;
                    }
                });
                console.log('=-----------------');
                if(valido === 1){
                    console.log('ADCIONOU!!!!!!');
                    retorno.push(elemento);
                }else{
                    console.log(elemento);
                }
            });
            console.log(retorno);
            return retorno;
        }
        
        function pesquisar(atributo, valor){
            if(!dados.length){
                return []; 
            }
            var arrayInverso = VP.removeReferencia(dados);
            var retorno = [];
            var pesquisa = VP.retirarAcento(VP.vStr(angular.lowercase(valor)));
            arrayInverso.forEach(function(elemento){
                if(typeof atributo === 'string'){
                    var valorElemento = VP.retirarAcento(angular.lowercase(VP.vStr(elemento[atributo])));
                    if(valorElemento.indexOf(pesquisa) !== -1){
                        elemento.order = valorElemento.indexOf(pesquisa);
                        retorno.push(elemento);
                    }
                }else{
                   for(var i = 0; i < atributo.length; i++){
                        var valorElemento = VP.retirarAcento(angular.lowercase(VP.vStr(elemento[atributo[i]])));
                        if(valorElemento.indexOf(pesquisa) !== -1){
                            elemento.order = valorElemento.indexOf(pesquisa);
                            retorno.push(elemento);
                            break;
                        }
                   } 
                }
            });
            retorno.sort(compare);
            return retorno;
        }
        
        function compare(a,b) {
            if (a.order < b.order)
              return -1;
            else if (a.order > b.order)
              return 1;
            else 
              return 0;
        }
        
        function filtrarCampo(atributo, valor){
            if(!dados.length){
                return []; 
            }
            var arrayInverso = VP.removeReferencia(dados);
            var retorno = [];
            arrayInverso.forEach(function(elemento){
                if(String(elemento[atributo]) === String(valor)){
                    retorno.push(elemento);
                }
            });
            return retorno;
        }
        
        function filtrarCampoArray(atributo, valor){
            if(!valor.length){
                return []; 
            }
            var arrayInverso = VP.removeReferencia(dados);
            var retorno = [];
            var id = [];
            arrayInverso.forEach(function(elemento){
                elemento[atributo].forEach(function(posicao){
                    if((String(posicao.id) === String(valor)
                            || String(valor) === '0') && id.indexOf(elemento.id) === -1){
                        retorno.push(elemento);
                        id.push(elemento.id);
                    }
                });
            });
            return retorno;
        }
        
        function setDados(dadosFiltro){
            dados = dadosFiltro; 
            return this;
        }

        return {
            filtrar:filtrar,
            pesquisar:pesquisar,
            filtrarCampo:filtrarCampo,
            setDados:setDados,
            filtrarCampoArray:filtrarCampoArray
        };
 }]);



