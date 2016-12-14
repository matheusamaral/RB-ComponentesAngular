'use strict';

angular.module('QuickPeek.Acoes.CadastroDados', [ 
    'RB.pagina',
    'QuickPeek.Requisicao.CadastroDados'
])

.factory('CadastroDadosAcoes', ['Pagina','CadastroDadosRequisicoes','$ionicPopup',
    function(Pagina,CadastroDadosRequisicoes,$ionicPopup) {
    var scope;  
    
    function setScope(obj){
        scope = obj;
        return this;
    };
    
    function inicializar(){
        addCss();
    };
    
    function addCss(){
        $('ion-side-menu-content').addClass('background-cinza');
    }
    
    function cadastrar(){
        CadastroDadosRequisicoes.set({dados:scope.dados,scope:scope,acaoSuccess:CadastroDadosRequisicoes.successCadastrar}).cadastrar();
    }  
    
    function showAlert(){
        var alertPopup = $ionicPopup.alert({
            title: 'O que é isso?',
            template: 'O avatar escolhido será a sua identidade anônima que aparecerá para as outras pessoas'
        });
    }
    
    function irAvatares(){
        Pagina.navegar({idPage:7});
    }
    
    function voltarSelfie(){
        Pagina.navegar({idPage:5});
    }
    
    function voltarPerfil(){
        Pagina.navegar({idPage:8});
    }
    
    return {
        setScope:setScope,
        inicializar:inicializar,
        cadastrar:cadastrar,
        showAlert:showAlert,
        irAvatares:irAvatares,
        voltarSelfie:voltarSelfie,
        voltarPerfil:voltarPerfil
    };
    
 }]);
