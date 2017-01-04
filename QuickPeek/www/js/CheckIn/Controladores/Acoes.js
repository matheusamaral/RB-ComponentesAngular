'use strict';

angular.module('QuickPeek.Acoes.CheckIn', [ 
    'RB.pagina',
    'QuickPeek.Requisicao.CheckIn'
])

.factory('CheckInAcoes', ['Pagina','CheckInRequisicoes','$timeout',
    function(Pagina,CheckInRequisicoes,$timeout){
    var scope;  
    
    function setScope(obj){
        scope = obj;
        return this;
    };
    
    function inicializar(){
        scope.larguraTela = $('body').width();
        scope.alturaTela = $('body').height();
        $('ion-side-menu-content').addClass('background-chekin');
    };
    
    return {
        setScope:setScope,
        inicializar:inicializar
    };
    
 }]);
