'use strict';

angular.module('QuickPeek.Requisicao.Locais', [
    'RB.pagina',
    'Cmp.InfinitScroll'
])

.factory('LocaisRequisicoes', ['RBLoadingMobile','GCS', 'Config','ionicToast','Pagina','$timeout','InfinitScroll','$ionicPopup',
      function (RBLoadingMobile,GCS, Config,ionicToast,Pagina,$timeout,InfinitScroll,$ionicPopup) {

        var dados;
        var scope;
        var acaoSuccess;
        var acaoPosterior = false;

        function set(obj){
            dados = obj.dados;
            scope = obj.scope;
            acaoSuccess = obj.acaoSuccess;
            if(obj.acaoPosterior)acaoPosterior = obj.acaoPosterior;
            return this;
        };

        function listarAreas(){
            var obj = {
                url: Config.getRefAmbienteReq()+"/Listar/listarAreaMapa",
                dados: $.param(dados),
                tipo: 'POST',
                acao: acaoSuccess,
                error: errorSalvar,
                scope: scope,
                exibeMSGCarregando: 0
            };
            GCS.conectar(obj);
        };

        function successListarAreas(objRetorno){
            console.log("objRetornssso",objRetorno);
            if(objRetorno.success === true){
                for(var i = 0; i < objRetorno.dados.length;i++){
                    scope.locais.push(objRetorno.dados[i]);
                }
                $timeout(function(){
                    InfinitScroll.fechaLoaderBottom();
                },500);
            }
            else{
                RBLoadingMobile.hide();
                OpenToast('Não foi possível localizar mais locais proximos');
            }
        };

        function listarMidias(){
            RBLoadingMobile.show();
            var obj = {
                url: Config.getRefAmbienteReq()+"/Listar/listarMidias",
                dados: $.param(dados),
                tipo: 'POST',
                acao: acaoSuccess,
                error: errorSalvar,
                scope: scope,
                exibeMSGCarregando: 0
            };
            GCS.conectar(obj);
        };

        function successListarMidias(objRetorno){
            RBLoadingMobile.hide();
            console.log("objRetorno",objRetorno);
            if(objRetorno.success === true){
                DGlobal.midias = objRetorno.dados;
                Pagina.navegar({idPage:25},1);
            }
            else{
                OpenToast('Não foi possível localizar midias');
            }
        };

        function curtirHashTag(){
            var obj = {
                url: Config.getRefAmbienteReq()+"/Acoes/curtirHashtag",
                dados: $.param(dados),
                tipo: 'POST',
                acao: acaoSuccess,
                error: errorSalvar,
                scope: scope,
                exibeMSGCarregando: 0
            };
            GCS.conectar(obj);
        };

        function successCurtirHashtag(objRetorno){
            console.log("objRetorno",objRetorno);
            console.log(scope.locais);
            if(objRetorno.success === true){
                for(var i = 0; i < scope.locais.length;i++){
                    if(scope.locais[i].dados.localId == dados.localId){
                        for(var j = 0; j < scope.locais[i].hashtags.length;j++){
                            if(scope.locais[i].hashtags[j].hashtagId == dados.hashtagId){
                                if(scope.locais[i].hashtags[j].jaCurtiu == 1){
                                    scope.locais[i].hashtags[j].jaCurtiu = 0;
                                    if(scope.locais[i].hashtags[j].hashtagQtd > 1)
                                        scope.locais[i].hashtags[j].hashtagQtd--;
                                    else{
                                        scope.locais[i].hashtags.splice(j,1);
                                    }
                                }
                                else{
                                    scope.locais[i].hashtags[j].jaCurtiu = 1;
                                    scope.locais[i].hashtags[j].hashtagQtd ++;
                                }
                            }
                        }
                    }
                }

                if(acaoPosterior)acaoPosterior();
            }
            else{
                OpenToast('Não foi possível curtir esta hashtag');
            }
        };


        function errorSalvar(dados, scope){
            RBLoadingMobile.hide();
            OpenToast("Não foi possível efetuar a ação, por favor, tente novamente!");
        };


        function OpenToast(message) {
          ionicToast.show(message, 'bottom', false, 3000);
        }

        function attTutorial(){
            RBLoadingMobile.show();
            var obj = {
                url: Config.getRefAmbienteReq()+"/Usuario/tutorial",
                dados: $.param(dados),
                tipo: 'POST',
                acao: acaoSuccess,
                error: errorSalvar,
                scope: scope,
                exibeMSGCarregando: 0
            };
            GCS.conectar(obj);
        };


        function successAttTutorial(objRetorno){
            RBLoadingMobile.hide();
            //alert(JSON.stringify(objRetorno));
            console.log(objRetorno);
            if(objRetorno.success === true) {
                scope.dadosUser.tutorial ++;
            }
            else{
                if(objRetorno.errors) OpenToast(objRetorno.errors);
            }
        };

        function verificarLimitePerguntas(){
            RBLoadingMobile.show();
            var obj = {
                url: Config.getRefAmbienteReq()+"/Acoes/verificarLimitePerguntas",
                dados: $.param(dados),
                tipo: 'POST',
                acao: acaoSuccess,
                error: errorSalvar,
                scope: scope,
                exibeMSGCarregando: 0
            };
            GCS.conectar(obj);
        };

        function successVerificarLimitePerguntas(objRetorno){
            RBLoadingMobile.hide();
            console.log('objRetorno');
            console.log(objRetorno);
            if(objRetorno.success === true) {
                DGlobal.idLocal = dados.localId;
                Pagina.navegar({idPage:35});
            }
            else{
                if(objRetorno.dados){
                    scope.hora = calculaHora(objRetorno.dados);
                    scope.contaPrivadaPopup = $ionicPopup.alert({
                        scope:scope,
                        title: 'Limite atingido',
                        template: montarPopup(),
                        buttons:[
                            {text:'OK',type:['button-positive','button-outline']}
                        ]
                    });
                }else{
                    if(objRetorno.errors) OpenToast(objRetorno.errors);
                }
            }
        };

        function calculaHora(tempo){
            var hora='', minutos='';
            if(tempo > 60){
                if(tempo%60 > 0){
                    hora = Math.floor(tempo/60);
                    minutos = tempo%60;
                    if(hora == 1){
                        return hora+' hora e '+minutos+' min.';
                    }else{
                        return hora+' horas e '+minutos+' min.';
                    }
                }else{
                    hora = tempo/60;
                    if(hora == 1){
                        return hora+' hora.';
                    }else{
                        return hora+' horas.';
                    }
                }
            }else{
                if(tempo == 1)return tempo +' minuto.';
                else return tempo +' minutos.';
            }
        }

        function montarPopup(){
            return'<div class="col">\n\
                        <p style="color:black">Você só pode fazer 3 perguntas a cada 3 horas.</p>\n\
                        <p style="color:black;margin-top:10px">Você poderá fazer uma nova pergunta em {{hora}}</p>\n\
                    </div>';
        }

        return {
            set: set,
            successListarAreas: successListarAreas,
            listarAreas: listarAreas,
            listarMidias:listarMidias,
            successListarMidias:successListarMidias,
            attTutorial:attTutorial,
            successAttTutorial:successAttTutorial,
            successCurtirHashtag:successCurtirHashtag,
            curtirHashTag:curtirHashTag,
            verificarLimitePerguntas:verificarLimitePerguntas,
            successVerificarLimitePerguntas:successVerificarLimitePerguntas
        };

}]);
