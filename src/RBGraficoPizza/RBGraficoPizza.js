'use strict';

angular.module('Cmp.GraficoPizza', ['RB.validacoesPadroes'])

.factory('GraficoPizzaEstrutura', ['VP','$timeout',
    function (VP,$timeout) {
        var scope;  

        function setScope(obj){
            scope = obj;
            return this;
        };
        

        function popular(array, indice){ 
            scope.graficoPizza[indice] = {
                data:{
                    labels:new Array(),
                    datasets:[{
                        data:new Array(),
                        backgroundColor: new Array()
                    }]
                },
                options:{
                    responsive: true,
                    legend:{
                        display:true,
                        position:'bottom',
                        labels:{
                            boxWidth:20,
                            fontSize:14
                        }
                    }
                }
            };

            contaDispositivos(array, indice);
        };
        
        function inicializaChart(indice){
            $timeout(function(){
                var idGrafico = "rbGraficoPizza-"+indice;
                var ctx = document.getElementById(idGrafico);
                var myPieChart = new Chart(ctx, {
                    type: 'pie',
                    data: scope.graficoPizza[indice].data,
                    options:scope.graficoPizza[indice].options
                });
                
            },0);
        }
    
        function contaDispositivos(array, indice){
            var obj = new Array();
            var indiceAchado, achou = false;
            var arrayLimpo = [];
            for(var i = 0; i < array.length;i++){
                arrayLimpo.push(array[i]);
                if(array[i][scope.rbSubArray] && array[i][scope.rbSubArray].length){
                    for(var k=0; k<array[i][scope.rbSubArray].length; k++){
                        arrayLimpo.push(array[i][scope.rbSubArray][k]);
                    }
                }
            }
            for(var i = 0; i < arrayLimpo.length;){
                achou = false;
                var qtd=0;
                for(var j = 0;j < obj.length; j ++){
                    if(arrayLimpo[i][scope.rbPropId[indice]] == obj[j].id){
                        achou = true;
                        indiceAchado = j;
                        qtd++;
                    }
                }
                if(achou){
                    obj[indiceAchado].qtd =obj[indiceAchado].qtd+qtd; 
                    achou = false;
                    i++;
                }else{
                    if(arrayLimpo[i][scope.rbPropId[indice]]){
                        obj.push({id:arrayLimpo[i][scope.rbPropId[indice]],titulo:arrayLimpo[i][scope.rbPropTitulo[indice]], qtd:qtd});
                    }else{
                        i++;
                    }
                }
                
            }
            populaGraficoTags(obj, indice);
        }
        

        function populaGraficoTags(array, indice){
            var cores = VP.coresGraficos();
            for(var i = 0;i < array.length;i++){
                scope.graficoPizza[indice].data.labels.push(array[i].titulo);
                scope.graficoPizza[indice].data.datasets[0].data.push(array[i].qtd);
                if(cores[i])scope.graficoPizza[indice].data.datasets[0].backgroundColor.push(cores[i]);
                else{
                    scope.graficoPizza[indice].data.datasets[0].backgroundColor.push(VP.geraCorAleatoria());
                }
            }
            calculaPctLegendas(scope.graficoPizza[indice].data.datasets[0].data, indice,array);
        }

        function calculaPctLegendas(obj, indice,array){
            var total = 0;

            for(var i = 0;i < obj.length; i++){
                total = total+obj[i];
            }
            var pct = 0;
            for(var i = 0;i < obj.length; i++){
                pct = parseFloat(((obj[i]*100)/total).toFixed(2));
                scope.graficoPizza[indice].data.labels[i] = scope.graficoPizza[indice].data.labels[i] +' ('+ pct + '%)';
            }
        }

        function calculaAltura(indice){
            var anterior = 0,qtdLinhas = 1;
            for(var i = 0; i < scope.graficoPizza[indice].data.labels.length;i++){
                if(scope.graficoPizza[indice].data.labels[i].length + anterior >= 20 && anterior !== 0){
                    anterior = scope.graficoPizza[indice].data.labels[i].length;
                    qtdLinhas++;
                }else{
                    anterior += scope.graficoPizza[indice].data.labels[i].length+8;
                }
            }
            scope.graficoPizza[indice].data.altura = (26*(qtdLinhas))+150;
        }

        return {
            setScope:setScope,
            popular: popular,
            calculaAltura:calculaAltura,
            inicializaChart:inicializaChart
        };
    }        
])

.directive('rbGraficoPizza', ['GraficoPizzaEstrutura','$timeout',
    function (GraficoPizzaEstrutura,$timeout) {
        return {
            replace: false,
            restrict: 'E',
            scope: {
                dados: '=rbArray',
                indice: '=rbIndex',
                rbLabel: '=rbLabel',
                rbPropId: '=rbPropId',
                rbPropTitulo: '=rbPropTitulo',
                rbDirecao: '=rbDirecao',
                rbSubArray:'=rbSubArray'
            }, 
            link: function (scope, elm, attrs) {
                scope.graficoPizza = new Array();
                GraficoPizzaEstrutura.setScope(scope);


                    for(var i=0; i<scope.rbPropId.length; i++){
                        GraficoPizzaEstrutura.popular(scope.dados, i);
                        GraficoPizzaEstrutura.inicializaChart(i);
                        GraficoPizzaEstrutura.calculaAltura(i);

                    }


            },


            template: 
                '<div layout="{{rbDirecao}}" class="rb-grafico-Pizza-div-graficos">\n\
                    <div ng-repeat="grafico in rbLabel" class="rb-grafico-pizza-box-grafico">\n\
                        <div layout="column" >\n\
                            <label class="rb-grafico-Pizza-label">{{rbLabel[$index]}}</label>\n\
                            <canvas id="rbGraficoPizza-{{$index}}" class="md-padding"\n\
                                height="{{graficoPizza[$index].data.altura}}">\n\
                            </canvas> \n\
                        <div>\n\
                    <div>\n\
                <div>'
        };

    }]
);

