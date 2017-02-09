'use strict';

angular.module('RB.navegacao', ['ui.router'])

.run(['$rootScope','$timeout','$state',function($rootScope, $timeout, $state) {    
    $rootScope.$state = $state;
    $rootScope.$on("routeChangeSuccess", function(e) {
        e.preventDefault();
    });
    $state.go(DGlobal.acaoCliente.acao);
}])

.config(function ($stateProvider) {
        $stateProvider.state(DGlobal.acaoCliente.acao, {
            DGlobal:DGlobal,
            templateProvider: function () {
                return '<div class="'+DGlobal.acaoCliente.classe+'" '+DGlobal.acaoCliente.classe+' ng-controller="'+DGlobal.acaoCliente.acao+'"></div>';
            }
        });
});