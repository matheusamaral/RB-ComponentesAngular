'use strict';

angular.module('QuickPeek.Respostas', [
    'QuickPeek.Estrutura.Respostas',
    'QuickPeek.Acoes.Respostas',
    'QuickPeek.HTML.Respostas'
])

.controller('RespostasCtrl', ['$scope','RespostasEstrutura','RespostasAcoes','$timeout',
    function ($scope,RespostasEstrutura,RespostasAcoes,$timeout){        
        RespostasEstrutura.setScope($scope).popular();
        RespostasAcoes.setScope($scope).configConexao('quickpeek.rubeus.com.br:9876');
        
        $scope.voltarLocais = RespostasAcoes.voltarLocais;
        $scope.setarCursorInicio = RespostasAcoes.setarCursorInicio;
        $scope.responder = RespostasAcoes.responder;
        $scope.carregarRespostas = RespostasAcoes.carregarRespostas;
        $scope.digitando = RespostasAcoes.digitando;
        $scope.removeMarginTeclado = RespostasAcoes.removeMarginTeclado;
        $scope.addMarginTeclado = RespostasAcoes.addMarginTeclado;
        $scope.voltarPerguntas = RespostasAcoes.voltarPerguntas;
        $scope.attPrivacidade = RespostasAcoes.attPrivacidade;
        $scope.addInfinit = RespostasAcoes.addInfinit;
        $scope.irDados = RespostasAcoes.irDados;
        $scope.abrirCamera = RespostasAcoes.abrirCamera;
        $scope.enviarMidia = RespostasAcoes.enviarMidia;
        $scope.exibirMidiaChat = RespostasAcoes.exibirMidiaChat;
        $scope.abrirBarraTools = RespostasAcoes.abrirBarraTools;
        $scope.abrirGaleria = RespostasAcoes.abrirGaleria;
        $scope.getImgs = RespostasAcoes.getImgs;
        $scope.minimizaGaleria = RespostasAcoes.minimizaGaleria;
        $scope.selecionarMidia = RespostasAcoes.selecionarMidia;
        $scope.abrirGifs = RespostasAcoes.abrirGifs;
        $scope.selecionarTecladoGif = RespostasAcoes.selecionarTecladoGif;
        $scope.enviarGif = RespostasAcoes.enviarGif;
        $scope.buscarGif = RespostasAcoes.buscarGif;
        $scope.voltarTeclado = RespostasAcoes.voltarTeclado;
        $scope.showEmoticons = RespostasAcoes.showEmoticons;
    }
])

.directive('pagRespostas', [
    'layoutPadrao',
    'RespostasHtml',
    function(layoutPadrao,RespostasHtml){
        var objPag = {
            menu: '',
            barra: '',
            rodape: false,
            conteudo: RespostasHtml    
        };
        return {
          template: layoutPadrao.set(objPag).montar()
        };
}]);
