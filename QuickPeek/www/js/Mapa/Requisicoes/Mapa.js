'use strict';

angular.module('QuickPeek.Requisicao.Mapa', [
    'RB.pagina'
])
 
.factory('MapaRequisicoes', ['RBLoadingMobile','GCS', 'Config','ionicToast','Pagina',
      function (RBLoadingMobile,GCS, Config,ionicToast,Pagina) {
        
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

        function verificarLocaisProximos(){
            var obj = {
                url: Config.getRefAmbienteReq()+"/Local/mapa",
                dados: $.param(dados),
                tipo: 'POST',
                acao: acaoSuccess,
                error: errorSalvar,
                scope: scope,
                exibeMSGCarregando: 0
            };
            GCS.conectar(obj);
        };
        
        
        function successVerificarLocaisProximos(objRetorno){
            RBLoadingMobile.hide();
            //alert(JSON.stringify(objRetorno));
            console.log('Pega valores no bancoe marca no mapa'+objRetorno);
            console.log(objRetorno);
            if(objRetorno.success === true){
                marcarNoMapa(objRetorno.dados);
            }
            else{
                //if(objRetorno.errors) OpenToast(objRetorno.errors);
            }
        };
        
        function cadastrarLocaisProximo(){
            var obj = {
                url: Config.getRefAmbienteReq()+"/Local/locaisPertos",
                dados: $.param(dados),
                tipo: 'POST',
                acao: acaoSuccess,
                error: errorSalvar,
                scope: scope,
                exibeMSGCarregando: 0
            };
            GCS.conectar(obj);
        };
        
        
        function successCadastrarLocaisProximo(objRetorno){
            console.log('Salva locais do mapa nop banco '+objRetorno);
            console.log(objRetorno);
            if(acaoPosterior)acaoPosterior();
        };
        
        function marcarNoMapa(array){
            if(array){
                for(var i = 0; i < array.length; i++){
                    var img = 'img/79.svg';
                    if(array[i].fotoLocal){
                        img = array[i].fotoLocal;
                    }else{
                        if(array[i].categoriaHashtagFoto){
                            img = array[i].categoriaHashtagFoto;
                        }else{
                            if(array[i].categoriaLocalFoto){
                                img = array[i].categoriaLocalFoto;
                            }
                        }
                    }
                    
                    scope.mapaGeral['marker'+i] = new google.maps.Marker({
                        position: new google.maps.LatLng(array[i].latitude,array[i].longitude), // variável com as coordenadas Lat e Lng
                        map: scope.mapaGeral.map,
                        title:array[i].localNome,
                        icon:img,
                        idMarcador:array[i].localId,
                        label:array[i].localNome
                    });
                    
                    //var id = array[i].localId;

                    scope.mapaGeral['marker'+i].addListener('click', function(){
                        irLocal(this.idMarcador);
                    });
                }
            }
        }
        
        function irLocal(id){
            DGlobal.localAtual = id;
            Pagina.navegar({idPage:24,paramAdd:'?localId='+id+'&atualizando=0'});
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
                if(acaoPosterior)acaoPosterior(scope.locais);
                if(objRetorno.errors) OpenToast(objRetorno.errors);
            }
        };
        
        
        function errorSalvar(dados, scope){
            RBLoadingMobile.hide();
            OpenToast("Não foi possível efetuar a ação, por favor, tente novamente!");
        };
        
        
        function OpenToast(message) {
          ionicToast.show(message, 'bottom', false, 3000);
        }
        
        return {
            set: set,
            verificarLocaisProximos: verificarLocaisProximos,
            successVerificarLocaisProximos: successVerificarLocaisProximos,
            attTutorial:attTutorial,
            successAttTutorial:successAttTutorial,
            successCadastrarLocaisProximo:successCadastrarLocaisProximo,
            cadastrarLocaisProximo:cadastrarLocaisProximo
        };
                           
}]);     
