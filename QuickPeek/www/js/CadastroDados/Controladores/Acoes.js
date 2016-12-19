'use strict';

angular.module('QuickPeek.Acoes.CadastroDados', [ 
    'RB.pagina',
    'QuickPeek.Requisicao.CadastroDados',
    'RB.validacoesPadroes'
])

.factory('CadastroDadosAcoes', ['Pagina','CadastroDadosRequisicoes','$ionicPopup','VP',
    function(Pagina,CadastroDadosRequisicoes,$ionicPopup,VP){
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
        scope.dados.nascimento = VP.formataDataBanco(scope.dados.nascimentoVisao);
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
        DGlobal.dadosCadastro = scope.dados;
    }
    
    function voltarSelfie(){
        Pagina.navegar({idPage:5});
        DGlobal.dadosCadastro = scope.dados;
    }
    
    function voltarPerfil(){
        Pagina.navegar({idPage:8});
        DGlobal.dadosCadastro = scope.dados;
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
