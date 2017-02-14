'use strict';

angular.module('QuickPeek.Estrutura.Mapa', [
    'RB.gcs',
    'RB.config',
    'RB.pagina',
    'RB.validacoesPadroes',
    'Cmp.Geolocation'
])

.factory('MapaEstrutura', ['GCS','$timeout','Pagina','VP','Geolocation',
    function(GCS,$timeout,Pagina,VP,Geolocation) {
    var scope;  
    
    function setScope(obj){
        scope = obj;
        return this;
    }
    
    function popular(){
        scope.dados = {};
        scope.dadosUser = {};
        
        calculaDimensoesMapa();
        
        if(DGlobal.dadosUser && DGlobal.dadosUser.success){
            scope.dadosUser = DGlobal.dadosUser.dados;
        }

        if(DGlobal.locais && DGlobal.locais.success){
            //console.log(JSON.stringify(DGlobal.locais.dados));
            Geolocation.setScope(scope).inicializar('mapaGeral',DGlobal.locais.dados);
        }else{
            Geolocation.setScope(scope).inicializar('mapaGeral');
            //Geolocation.setScope(scope).inicializar('mapaGeral',[{"localId":"20732","localNome":"Barmometro","localEndereco":"R. Dr. Silveira Brun, 70, Muriaé - MG, 36880-000, Brazil","checkIn":"1","visibilidadeCheckIn":"3","latitude":"-21.1318843","longitude":"-42.3643629","distancia":"0","relevancia":"32970","relevancia2":"0","fotoLocal":null,"categoriaHashtagFoto":null,"categoriaLocalFoto":"http://quickpeek.rubeus.com.br//ui/imagens/categorias-local/75.svg"},{"localId":"20825","localNome":"Papelaria Veredas","localEndereco":"R. Dr. Silveira Brun, 70, Muriaé - MG, 36880-000, Brazil","checkIn":"0","visibilidadeCheckIn":null,"latitude":"-21.1318843","longitude":"-42.3643629","distancia":"0","relevancia":"5880","relevancia2":"0","fotoLocal":null,"categoriaHashtagFoto":null,"categoriaLocalFoto":"http://quickpeek.rubeus.com.br//ui/imagens/categorias-local/83.svg"},{"localId":"20677","localNome":"Rubeus Tecnologia e Inovação","localEndereco":"Rua Doutor Silveira Brun, 86 - sala 302, Muriaé","checkIn":"0","visibilidadeCheckIn":null,"latitude":"-21.131764","longitude":"-42.364326","distancia":"0.013913447282072009","relevancia":"49958.862524003096","relevancia2":"0","fotoLocal":null,"categoriaHashtagFoto":"http://quickpeek.rubeus.com.br//ui/imagens/categorias-hashtag/64.svg","categoriaLocalFoto":"http://quickpeek.rubeus.com.br//ui/imagens/categorias-local/94.svg"},{"localId":"20701","localNome":"Salão da Carla","localEndereco":"Rua São Pedro, 37, Muriaé","checkIn":"0","visibilidadeCheckIn":null,"latitude":"-21.1323627","longitude":"-42.3644035","distancia":"0.05336208298950024","relevancia":"393.5378610338741","relevancia2":"0","fotoLocal":null,"categoriaHashtagFoto":null,"categoriaLocalFoto":null},{"localId":"21622","localNome":"Casa da","localEndereco":"R. João Grossi, 1-177, Muriaé - MG, 36880-000, Brazil","checkIn":"0","visibilidadeCheckIn":null,"latitude":"-21.1315704","longitude":"-42.3609802","distancia":"0.35257720969173195","relevancia":"113.16670193994013","relevancia2":"0","fotoLocal":null,"categoriaHashtagFoto":null,"categoriaLocalFoto":"http://quickpeek.rubeus.com.br//ui/imagens/categorias-local/94.svg"}]);
        }

        if(DGlobal.localBarra && DGlobal.localBarra.success){
            scope.dadosbarra = DGlobal.localBarra.dados;
        }
    };
    
    function calculaDimensoesMapa(){
        scope.larguraMapa = $('body').width();
        scope.alturaMapa = $('body').height() - 75;
    }
  
    return {
        setScope:setScope,
        popular:popular
    };
 }]);
