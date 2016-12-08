'use strict';

angular.module('RB.navegacao', ['ngRoute'])

.run(['$route', '$rootScope', '$location', function ($route, $rootScope, $location) {
    var original = $location.path;
    $location.path = function (path, reload) {
//        console.log("entrei aqwui---");
//        console.log("reload---",reload);
        if(DGlobal.acaoCliente){
            if (reload === false) {
                $rootScope.$on('$locationChangeSuccess', function () {
                    if($route.current){
                        $route.current.$$route.controller = DGlobal.acaoCliente.acao;
                        $route.current.$$route.template = '<div class="'+DGlobal.acaoCliente.classe+'" '+DGlobal.acaoCliente.classe+'></div>';
                    }
                });           
            }
            return original.apply($location, [path]);
        }
        else return original.apply($location, [path]);
    };
}])

.config(function ($routeProvider) {
//    console.log("entrei aqui");
//    console.log("$routeProvider",$routeProvider);

//        DGlobal.configNavegacao=function(){
//            if(!DGlobal.configurouNavegacao){
                $routeProvider.when('/', {
                    template: '<div class="'+DGlobal.acaoCliente.classe+'" '+DGlobal.acaoCliente.classe+'></div>',
                    controller: DGlobal.acaoCliente.acao
                });
                $routeProvider.when('/:param1', {
                    template: '<div class="'+DGlobal.acaoCliente.classe+'" '+DGlobal.acaoCliente.classe+'></div>',
                    controller: DGlobal.acaoCliente.acao
                });

                $routeProvider.when('/:param1/:param2', {
                    template: '<div class="'+DGlobal.acaoCliente.classe+'" '+DGlobal.acaoCliente.classe+'></div>',
                    controller: DGlobal.acaoCliente.acao
                });

                $routeProvider.when('/:param1/:param2/:param3', {
                    template: '<div class="'+DGlobal.acaoCliente.classe+'" '+DGlobal.acaoCliente.classe+'></div>',
                    controller: DGlobal.acaoCliente.acao
                });

                $routeProvider.when('/:param1/:param2/:param3/:param4', {
                    template: '<div class="'+DGlobal.acaoCliente.classe+'" '+DGlobal.acaoCliente.classe+'></div>',
                    controller: DGlobal.acaoCliente.acao
                });
                DGlobal.configurouNavegacao=true;
//            }
//        };


});