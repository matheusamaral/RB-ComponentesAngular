'use strict';

angular.module('QuickPeek.Estrutura.LoadingInicial', [
    'RB.gcs',
    'RB.config',
    'RB.pagina',
    'RB.loadingMobile'
])

.factory('LoadingInicialEstrutura', ['GCS','Config','Pagina','RBLoadingMobile',
    function(GCS,Config,Pagina,RBLoadingMobile) {
    var scope;  
    
    function setScope(obj){
        scope = obj;
        return this;
    }
    
    function popular(){
        //RBLoadingMobile.show();
    };
    
        
    function verificaLogin(){
//        var dados="c=Acessar&o=acessar";
        var obj = {
            url: Config.getRefAmbienteReq()+"?c=Acessar&o=acessar", 
            tipo: 'JSONP',
            dados: null,
            acao: successListar,
            error: errorListar,
            scope: scope,
            exibeMSGCarregando: 0
        };
        GCS.conectar(obj);
    };

    function successListar(objRetorno){
        console.log('Verificar Login - objRetorno',objRetorno);
        if(objRetorno.success === true) {
            if(objRetorno.dados && objRetorno.dados.idEndereco) Pagina.navegar({idPage:3});
            else Pagina.navegar({idPage:4});
        }
        else{
            Pagina.navegar({idPage:2});
        }
    };

    function errorListar(dados, scope){
        Pagina.navegar({idPage:2});
    };

    return {
        setScope:setScope,
        popular:popular
    };
 }]);
