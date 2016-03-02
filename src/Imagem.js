'use strict';

angular.module('RB.uploadImagem', ['RB.config', 'toaster'])

.factory('UploadImg', ['$http','Config','toaster', function($http,Config,toaster) {
   
    var imagem, id, scope, acao;
   
    function setDados(obj){
        imagem = obj.imagem;
        id = obj.id;
        scope = obj.scope;
        acao = obj.acao;
        return this;
    };
    
    function enviar(){
        var fd = new FormData();
        fd.append('imagem', imagem);
        scope.imgCarregando = true;

        $http.post(Config.getRefAmbienteReq()+'/InstituicaoEnsino/Upload/imagem?id='+id, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(data){
            console.log(data);   
            scope.imgCarregando = false;
            if(data.success) acao(data.caminho[id]);
            else toaster.error({title: "Falhou", body:data.errors});
        })
        .error(function(data){
            scope.imgCarregando = false;
            toaster.error({title: "Falhou", body:'Não foi possivel enviar a imagem. Tente novamente.'});
        });
    };
    
    return {
        setDados: setDados,
        enviar: enviar
    };
 }])
 
.directive('rbImg', ['$parse','$timeout', function ($parse, $timeout) {
    return {
        scope: {
            imgacao: '=rbImgAcao',
            imgmodel: '=rbImgModel'
        },
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('change', function(){        
                scope.imgacao(element[0].files[0]);                
            });
        }
    };
}]);