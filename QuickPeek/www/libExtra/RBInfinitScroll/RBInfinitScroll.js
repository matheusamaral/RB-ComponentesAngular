'use strict';

angular.module('Cmp.InfinitScroll',[
    'RB.validacoesPadroes',
    'RB.pagina'
])

.factory('InfinitScroll', ['$timeout',
    function($timeout){
        var scope,ativo = false;
        
        var options = {
            top:false,
            bottom:false,
            idSeletor:'',
            distancia:'',
            acaoTop:''
        };
        
        function setScope(obj){
            scope = obj;
            return this;
        }
        
        function iniciar(obj){
            options = obj;
            
            if(options.top)
                scrollTop();
            
            if(options.bottom)
                scrollBottom();
            
            return this;
        }
        
        function scrollBottom(){
            $("#"+options.idSeletor).scroll(function(){
                console.log($('#container-respostas').scrollTop());
            });
        }
        
        function scrollTop(){
            $("#"+options.idSeletor).scroll(function(){
                if($("#"+options.idSeletor).scrollTop() == 0){
                    if(!ativo){
                        ativo = true;
                        montarLoader();
                        options.acaoTop();
                    }
                }
            });
        }
        
        function montarLoader(){
            var template = getTemplate();;
            
            $("#"+options.idSeletor).append(template);
            
            $timeout(function(){
                $("#"+options.idSeletor+' .container-rb-loader').addClass('aberto');
            },0);
        }
        
        function fechaLoader(){
            $("#"+options.idSeletor+' .container-rb-loader').removeClass('aberto');
            
            $timeout(function(){
                $("#"+options.idSeletor+' .container-rb-loader').remove();
                ativo = false;
            },500);
        }
        
        function getTemplate(){
            return'<div class="container-rb-loader">\n\
                        <div class="corpo-rb-loader">\n\
                            <div class="remove-padding">\n\
                                <div class="loader">\n\
                                    <div class="loader-inner ball-clip-rotate">\n\
                                      <div></div>\n\
                                    </div>\n\
                                </div>\n\
                                <div><p>Carregando...</p></div>\n\
                            </div>\n\
                        </div>\n\
                    </div>';
        }
        
        return {
            iniciar:iniciar,
            setScope:setScope,
            fechaLoader:fechaLoader
        };
 }]);