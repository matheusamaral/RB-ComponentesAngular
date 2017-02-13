'use strict';

angular.module('QuickPeek.Acoes.DadosPergunta', [
    'RB.pagina',
    'RB.validacoesPadroes'
])

.factory('DadosPerguntaAcoes', ['Pagina','VP','$timeout',
    function(Pagina,VP,$timeout){
    var scope;

    function setScope(obj){
        scope = obj;
        addCss();
        return this;
    };

    function verificaData(data){
        var dataAtual = new Date();
        var dataVisu = new Date(data);
        if(dataAtual == dataVisu)
            return 'Hoje';
        else{
            return VP.organizaDataVisao(data);
        }
    }

    function addCss(){
        $('ion-side-menu-content').addClass('background-cinza');
        //calcLargurahr();
    }

    function calcLargurahr(){
        console.log($('#box-img0').width());
        console.log($('body').width());
        $timeout(function(){
            scope.largura = ($('#container-dados').width() - $('#box-img0').width()) - 20;
        },0);
    }

    function voltar(){
        Pagina.navegar({idPage:34,paramAdd:'?perguntasId='+DGlobal.idPergunta});
        delete DGlobal.idPergunta;
    }

    return {
        setScope:setScope,
        verificaData:verificaData,
        calcLargurahr:calcLargurahr,
        voltar:voltar
    };

 }]);
