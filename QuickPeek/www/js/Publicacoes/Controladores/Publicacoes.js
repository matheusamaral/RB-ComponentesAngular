'use strict';

angular.module('QuickPeek.Publicacoes', [
    'QuickPeek.Estrutura.Publicacoes',
    'QuickPeek.Acoes.Publicacoes',
    'QuickPeek.HTML.Publicacoes'
])

.controller('PublicacoesCtrl', ['$scope','PublicacoesEstrutura','PublicacoesAcoes',
    function ($scope,PublicacoesEstrutura,PublicacoesAcoes){        
        PublicacoesEstrutura.setScope($scope).popular();
        PublicacoesAcoes.setScope($scope).inicializar();
        
        $scope.voltar = PublicacoesAcoes.voltar;
        $scope.escolherHash = PublicacoesAcoes.escolherHash;
        $scope.addHash = PublicacoesAcoes.addHash;
        $scope.calcularAlturaChat = PublicacoesAcoes.calcularAlturaChat;
        $scope.voltarCategorias = PublicacoesAcoes.voltarCategorias;
        $scope.removerChip = PublicacoesAcoes.removerChip;
        $scope.addHashDigitando = PublicacoesAcoes.addHashDigitando;
        $scope.publicar = PublicacoesAcoes.publicar;
        $scope.verfificaTecla = PublicacoesAcoes.verfificaTecla;
        $scope.getImgs = PublicacoesAcoes.getImgs;
        $scope.abrirGaleria = PublicacoesAcoes.abrirGaleria;
        $scope.fecharGaleria = PublicacoesAcoes.fecharGaleria;
        $scope.addMidia = PublicacoesAcoes.addMidia;
        $scope.selecionarImgs = PublicacoesAcoes.selecionarImgs;
        $scope.fazerCheckin = PublicacoesAcoes.fazerCheckin;
        $scope.gerarHashtag = PublicacoesAcoes.gerarHashtag;
    }
])

.directive('pagPublicacoes', [
    'layoutPadrao',
    'PublicacoesHtml',
    function(layoutPadrao,PublicacoesHtml){
        var objPag = {
            menu: '',
            barra: '',
            rodape: null,
            conteudo: PublicacoesHtml    
        };
        return {
          template: layoutPadrao.set(objPag).montar()
        };
}]);
