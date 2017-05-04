'use strict';

angular.module('Cmp.GraficoLinha', ['RB.validacoesPadroes'])

.factory('GraficoLinhaEstrutura', ['VP','$timeout',
    function (VP,$timeout) {
        var scope;  

        function setScope(obj){
            scope = obj;
            return this;
        };
        
        function popular(){
            inicializarGraficoLinha();
        
        }

        function inicializarGraficoLinha(){ 
                scope.graficoLinha = {
                    data:{
                        labels: new Array(),
                        data:new Array()
                    }
                };
                populaArrayDatasDiferentes(scope.dados);
                inicializaChart();
        }

        function populaArrayDatasDiferentes(array){
            scope.menorQtd = false;
            scope.maiorQtd = 0;
            var obj = new Array();
            var indiceAchado, achou = false;
            var arrayLimpo = new Array();
            for(var i = 0; i < array.length;i++){
                arrayLimpo.push(array[i]);
                if(array[i][scope.rbSubArray] && array[i][scope.rbSubArray].length){
                    for(var k=0; k<array[i][scope.rbSubArray].length; k++){
                        if(array[i][scope.rbSubArray][k] && !array[i][scope.rbSubArray][k].data){
                            if(array[i].data) array[i][scope.rbSubArray][k].data=array[i].data;
                        }
                        arrayLimpo.push(array[i][scope.rbSubArray][k]);
                    }
                }
            }            
            
            for(var i = 0; i < arrayLimpo.length;){
                achou = false;
                var qtd=0;
                
                for(var  j = 0; j < obj.length;j ++){
                    if(arrayLimpo[i].data == obj[j].data){
                        achou = true;
                        indiceAchado = j;  
                        qtd++;
                    } 
                    if(obj[j].qtd){
                        if(obj[j].qtd>scope.maiorQtd) scope.maiorQtd=obj[j].qtd;
                        if(!scope.menorQtd) scope.menorQtd=obj[j].qtd;
                        else if(obj[j].qtd<scope.menorQtd) scope.menorQtd=obj[j].qtd;
                    }
                }
                if(achou){
                    obj[indiceAchado].qtd=obj[indiceAchado].qtd + qtd;
                    achou = false;
                    i++;

                }
                else{
                    obj.push({data:arrayLimpo[i].data, qtd:qtd});
                }
                
            }
            populaGraficoLinha(obj);
        }
        
        function populaGraficoLinha(obj){
            for(var i = 0; i < obj.length;i++){
                scope.graficoLinha.data.labels.push(VP.formataDataDiaMes(obj[i].data));
                scope.graficoLinha.data.data.push(obj[i].qtd);
            }
        }

        function inicializaChart(){
                var tamanhoIntervalo = 1;
                var diferenca = scope.maiorQtd-scope.menorQtd;
                if(diferenca>10){
                    tamanhoIntervalo = parseInt(scope.maiorQtd/10)+1;
                }
                var idGrafico = "rbGraficoLinha-"+scope.indice;
                var ctx = document.getElementById(idGrafico);
                var myLineChart = new Chart(ctx, {
                    type: 'line',
                    data: montaData(),
                    options:{
                        legend:{
                            display:false
                        },
                        scales:{
                            yAxes: [{
                                ticks: {
                                    stepSize: tamanhoIntervalo
//                                    fixedStepSize:10
                                }
                            }]
                        }
                    }
                });
        }

        function montaData(){
            var data = {
                labels: scope.graficoLinha.data.labels,
                datasets: [
                    {
                        label: scope.rbLabel,
                        fill: true,
                        lineTension: 0.1,
                        backgroundColor: "rgba(66, 133, 244, 0.32)",
                        borderColor: "#4285F4",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "#4285F4",
                        pointBackgroundColor: "red",
                        pointBorderWidth: 5,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "#4285F4",
                        pointHoverBorderColor: "#4285F4",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: scope.graficoLinha.data.data
                    }
                ]
            };
            return data;
        }

        return {
            setScope:setScope,
            popular: popular
        };
    }        
])

.directive('rbGraficoLinha', ['GraficoLinhaEstrutura','$timeout',
    function (GraficoLinhaEstrutura,$timeout) {
        return {
            replace: false,
            restrict: 'E',
            scope: {
                dados: '=rbArray',
                indice: '=rbIndex',
                rbLabel: '=rbLabel',
                rbSubArray: '=rbSubArray'
            }, // creates an internal scope for this directive (one per directive instance)
            link: function (scope, elm, attrs) {
                GraficoLinhaEstrutura.setScope(scope);
                $timeout(function(){
                    GraficoLinhaEstrutura.popular();
                },0);
            },


            template: 
                '<div style="height: 200px;width: 900px;">\n\
                    <label class="rb-grafico-linha-label">{{rbLabel}}</label>\n\
                    <canvas id="rbGraficoLinha-{{indice}}" class="md-padding rbGraficoLinha"\n\
                        width="900" \n\
                        height="200">\n\
                    </canvas> \n\
                <div>'
        };

    }]
);
