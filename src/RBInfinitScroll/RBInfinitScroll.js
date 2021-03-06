'use strict';

angular.module('Cmp.InfinitScroll',[
    'RB.validacoesPadroes',
    'RB.pagina'
])

.factory('InfinitScroll', ['$timeout','$ionicScrollDelegate',
    function($timeout,$ionicScrollDelegate){
        var scope,ativo = false;
        
        var options = {
            top:false,
            bottom:false,
            idSeletor:'',
            idSeletorBottom:'',
            distancia:'',
            acaoTop:'',
            acaoBottom:''
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
        
//        var distancia=$ionicScrollDelegate.getScrollPosition().top;
//            if(distancia<10){
//                carregarRespostas();
//            }
        
        function scrollBottom(){
            $("#"+options.idSeletorBottom).scroll(function(){
                if(ionic.Platform.isIOS()){
                    var distancia = $ionicScrollDelegate.$getByHandle('mainScroll').getScrollPosition().top + $(window).height();
                    if(distancia >  $("#"+options.idSeletorBottom+' div.scroll').height() && $(this).scrollTop() > 10){
                        if(!ativo){
                            ativo = true;
                            montarLoaderBottom();
                            options.acaoBottom();
                        }
                    }
                }else{
                    var distancia = $("#"+options.idSeletor).scroll();
                    if($(this).scrollTop() + $(this).innerHeight() >= this.scrollHeight && $(this).scrollTop() > 10){
                        if(!ativo){
                            ativo = true;
                            montarLoaderBottom();
                            options.acaoBottom();
                        }
                    }
                }
            });
        }
        
        function scrollTop(){
            $("#"+options.idSeletor).scroll(function(){
                if($ionicScrollDelegate.$getByHandle('mainScroll').getScrollPosition().top <= 30 && 
                   $ionicScrollDelegate.$getByHandle('mainScroll').getScrollPosition().top < 0){
                    if(!ativo){
                        ativo = true;
                        montarLoader();
                        options.acaoTop();
                    }
                }
            });
        }
        
        function montarLoader(){
            var template = getTemplate();
            
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
        
        function montarLoaderBottom(){
            var template = getTemplateBottom();
            
            $("#"+options.idSeletorBottom).append(template);
            
            $timeout(function(){
                $("#"+options.idSeletorBottom+' .container-rb-loader-bottom').addClass('aberto');
            },0);
        }
        
        function fechaLoaderBottom(){
            $("#"+options.idSeletorBottom+' .container-rb-loader-bottom').removeClass('aberto');
            
            $timeout(function(){
                $("#"+options.idSeletorBottom+' .container-rb-loader-bottom').remove();
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
        
        function getTemplateBottom(){
            return'<div class="container-rb-loader-bottom">\n\
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
            fechaLoader:fechaLoader,
            fechaLoaderBottom:fechaLoaderBottom
        };
 }]);
