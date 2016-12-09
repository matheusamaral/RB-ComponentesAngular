'use strict';

angular.module('Cmp.Barra', ['RB.pagina'])

.factory('acoes', ['Pagina','$timeout',
    function (Pagina,$timeout) {
        var scope;

        function setScope(obj){
            scope = obj;
            return this;
        };

        function abrirCurso(){
            Pagina.navegar({idPage: 3});
        }  
        
        function mudarOp(index){
            for(var i = 0;i < scope.botoesBarra.length; i++){
                if(scope.botoesBarra[i].clicked == true){
                    scope.botoesBarra[i].clicked = false;
                    scope.botoesBarra[i].display = false;
                }
            }
            
            scope.botoesBarra[index].display = true;
            scope.botoesBarra[index].clicked = true;
//            $timeout(function(){
//                ativaBotao(scope.botoesBarra[index]);
//            },0);
            
        }
        
        function adicionaCss(){
            $("#barraComponente").parent().addClass('configMdMenuComponente');
            $("#barraComponente").parent().addClass('posiciona-md-menu-componente');
            $("#barraComponente").parent().addClass('largura-div-md-menu-componente');
        }

        function ativaBotao(botao){
            $timeout(function(){
                var posBarraInicio = $("#barraAnimada").position().left;
                var posDestinoBarra = $("#barraCursosBtn"+botao.id).position().left;
                var larguraBotao = $("#barraCursosBtn"+botao.id).width();        

                if(posBarraInicio<posDestinoBarra){
                    var width = posDestinoBarra+larguraBotao-posBarraInicio;
                    animacaoBarraDireita(posBarraInicio,posDestinoBarra,width);
                }

                if(posBarraInicio>posDestinoBarra){
                    var width = posBarraInicio+larguraBotao-posDestinoBarra;
                    animacaoBarraEsquerda(posBarraInicio,posDestinoBarra,width);

                }        
                $("#barraAnimada").css('left',posDestinoBarra);  

                for(var i = 0;i < scope.botoesBarra.length; i++){
                    scope.botoesBarra[i].clicked = false;
                }
                botao.clicked = true;
            },0);
        }
        
        function animacaoBarraDireita(posBarraInicio,posDestinoBarra,width){
            $.keyframe.define([{
                name: 'animaDireita',
                '0%': {'width': '150px','left':posBarraInicio+'px'},
                '50%': {'width': width+'px','left':posBarraInicio+'px'},
                '51%': {'width': width+'px','left':posBarraInicio+'px'},
                '100%': {'width': '150px','left':posDestinoBarra+'px'}
            }]); 
            $("#barraAnimada").addClass('movimentaBarraParadireita');
            limpaClass();
        }
    
        function animacaoBarraEsquerda(posBarraInicio,posDestinoBarra,width){
            $.keyframe.define([{
                name: 'animaEsquerda',
                '0%': {'width': '150px','left':posBarraInicio+'px'},
                '50%': {'width': width+'px','left':posDestinoBarra+'px'},
                '51%': {'width': width+'px','left':posDestinoBarra+'px'},
                '100%': {'width': '150px','left':posDestinoBarra+'px'}
            }]);
            $("#barraAnimada").addClass('movimentaBarraParaEsquerda');
            limpaClass();
        }

        function limpaClass(){
            $timeout(function(){
                    $("#barraAnimada").removeClass('movimentaBarraParadireita');
                    $("#barraAnimada").removeClass('movimentaBarraParaEsquerda');
            },400);
        }
       return {
            setScope: setScope,
            abrirCurso: abrirCurso,
            ativaBotao:ativaBotao,
            adicionaCss:adicionaCss,
            mudarOp:mudarOp
        }; 
    }        
])

.factory('estrutura', ['Pagina',
    function (Pagina) {
        var scope;  

        function setScope(obj){
            scope = obj;
            return this;
        };

        function popular(array){
            scope.botoesBarra = array;
            scope.mostrarMais = false;
        }

        return {
            setScope:setScope,
            popular: popular
        };
    }        
])

.factory('controlaTamanhoBarra', ['$timeout','$window','acoes',
    function ($timeout,$window,acoes) {
        var scope;  

        function setScope(obj){
            scope = obj;
            calculaDimensoes();
            return this;
        };
        
        function calculaDimensoes(){
            $timeout(function(){
                scope.larguraTela = angular.element($window).width();
                scope.larguraBarra = $('#containerBarra').width();
                $(window).resize(function() {
                    atualizaBarra();
                });
                
            },0);
        }
        
        function atualizaBarra(){
            console.log('scope.larguraTela');
            console.log(scope.larguraTela);
            console.log(scope.larguraBarra);
            $timeout(function(){
                scope.larguraTela = angular.element($window).width();
                if(scope.larguraTela <= scope.larguraBarra){
                    cortaBarra();
                    console.log('removeu');
                }else{
                    console.log('adicionou');
                    adicionaItemBarra();
                }
            },0);
            
        }
        
        function cortaBarra(){
            scope.mostrarMais = true;
            var nBotoes = Math.floor(scope.larguraTela/150);
            for(var i = 0; i < scope.botoesBarra.length; i ++){
                if(i >= nBotoes - 1){
                    if(scope.botoesBarra[i].clicked === false){
                        scope.botoesBarra[i].display = false;
                    }else{
                        if(scope.botoesBarra[i - 1] && scope.botoesBarra[i - 1].display == true)
                            scope.botoesBarra[i - 1].display = false;
                    }
                }
            }
            scope.larguraBarra = $('#containerBarra').width();
        }
        
        function adicionaItemBarra(){
            var nBotoes = Math.floor(scope.larguraTela/150);
            for(var i = 0; i < scope.botoesBarra.length; i ++){
                if(i < nBotoes - 1){
                    scope.botoesBarra[i].display = true;
                }
            }
            scope.larguraBarra = $('#containerBarra').width();
            if(!resetaBtnMais())
                scope.mostrarMais = false;
        }
        
        function resetaBtnMais(){
            var achou = false;
            for(var i = 0; i < scope.botoesBarra.length;i++){
                if(scope.botoesBarra[i].display !== true){
                    achou = true;
                }
            }
            return achou;
        }
        
        return {
            setScope:setScope,
            atualizaBarra:atualizaBarra
        };
    }        
])

.directive('rbBarra', ['Pagina','acoes','estrutura','controlaTamanhoBarra','$timeout','$window',
    function (Pagina,acoes,estrutura,controlaTamanhoBarra,$timeout,$window) {
        return {
            replace: false,
            restrict: 'E',
            scope: {
                opcoes: '=rbBotoes'
            }, // creates an internal scope for this directive (one per directive instance)
            link: function (scope, elm, attrs) {
                estrutura.setScope(scope).popular(scope.opcoes);
                acoes.setScope(scope);
                
                $timeout(function(){
                    controlaTamanhoBarra.setScope(scope);
                    scope.attBarra = controlaTamanhoBarra.atualizaBarra;
                    scope.attBarra();
                    DGlobal.objTeste = scope;
                    
                },0);
                
                //scope.ativaBotao = acoes.ativaBotao;
                scope.addCss = acoes.adicionaCss;
                scope.mudarOp = acoes.mudarOp;
            },
            template: 
                '<md-toolbar class="corpo-barra-adicional">\n\
                    <div class="md-toolbar-tools" layout="row" layout-align="center center">\n\
                        <div id="containerBarra" class="container-barra-personalizada" layout="row">\n\
                            <div class="config-titulo" ng-if="botao.display" id="barraCursosBtn{{botao.id}}" ng-repeat="botao in botoesBarra"\n\
                            ng-class="{\'borda-item-selecionado\' : botao.clicked}">\n\
                                <md-button ng-click="botao.acao(botao.paramAdd,botao.paramAdd2)" ng-class="{campoSelecionado : botao.clicked}" layout-align="center center" layout="row" class="btn-barra-rb config-altura-btn-barra btn-barra-secundaria campo-nao-selecionado-secundario">\n\
                                    {{botao.titulo}}\n\
                                </md-button>\n\
                            </div>\n\
                            <div class="config-titulo" id="barraCursosBtn{{botao.id}}" ng-if="mostrarMais">\n\
                                <md-menu style="min-width: 100%;" md-position-mode="target-right target" class="config-btn-xs" layout-align="end center" flex-xs layout="center">\n\
                                    <md-button ng-click="$mdOpenMenu($event);addCss()" layout-align="center center" layout="row" class="config-altura-btn-barra btn-barra-secundaria campo-nao-selecionado-secundario">\n\
                                        Mais<span style="margin-left:10px" class="glyphicon glyphicon-chevron-down"></span>\n\
                                    </md-button>\n\
                                    <md-menu-content id="barraComponente" width="4" class="md-menu-graficos">\n\
                                        <md-menu-item">\n\
                                            <md-button ng-repeat="btn in botoesBarra" ng-if="!btn.display"\n\
                                            ng-click="mudarOp($index);btn.acao(btn.paramAdd,btn.paramAdd2)">\n\
                                                <div layout="row" flex>\n\
                                                    <p flex>{{btn.titulo}}</p>\n\
                                              </div>\n\
                                            </md-button>\n\
                                        </md-menu-item>\n\
                                    </md-menu-content>\n\
                                </md-menu>\n\
                            </div>\n\
                            <!--<div id="barraAnimada" class="barraAnimada-personalizada"></div>-->\n\
                        </div>\n\
                    </div>\n\
                </md-toolbar>'
        };

    }]
);