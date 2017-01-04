<?php
namespace Quickpeek\Local\Aplicacao\Pesquisar;
use Rubeus\ContenerDependencia\Conteiner;

class PesquisarLocais {

    public function pesquisarLocais($msg) {

        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $pesquisa = $msg->getCampo('Nome')->get('valor');
        
        $pesquisa = $this->percorrerPalavras($pesquisa);
        
        $latitude = $msg->getCampo('Latitude')->get('valor');
        $longitude = $msg->getCampo('Longitude')->get('valor');
        
        $pesquisaFiltrada = $this->stopWords($pesquisa);
        $tempo = Conteiner::get('ConfiguracoesQuickpeek')->consultar();
        
        $notIn = $this->atualizando($msg);
        
        if(isset($pesquisaFiltrada)){
            $query = Conteiner::get('ConsultaPesquisarLocais')->consultar($usuarioId, $pesquisaFiltrada, $latitude, $longitude, $notIn, 
                    $tempo['hashtag'], $tempo['midia']);
        }
        
        if($query){
            foreach($query as $v){
                $locaisId = $v['localId'];
            }
            if($notIn){
                $locaisId = array_merge($msg->getCampoSessao('pesquisarLocaisNotIn'), $locaisId);
            }
            $msg->setCampoSessao('pesquisarLocaisNotIn', $locaisId);
            $msg->setResultadoEtapa(true, false, ['dados' => $query]);
        }else{
            $msg->setResultadoEtapa(false);
        }
    }
    
    private function percorrerPalavras($pesquisa){
        
        $pesquisa = explode(' ', $pesquisa);
        for($i = 0; $i < count($pesquisa); $i++){
            $x = 0;
            $var = '';
            for($k = $i; $k < count($pesquisa); $k++){
                if(!$x == 0){
                    $comb[] = $var . ' ' . $pesquisa[$k];
                }else{
                    $comb[] = $pesquisa[$k];
                }
                $var = end($comb);
                $x++;
            }
        }
        return $comb;
    }

    private function stopWords($pesquisa) {

        $filtro = 'de a o que e do da em um para é com não uma os no se na por mais as dos como mas foi ao ele das tem à seu sua ou ser quando há nos já está eu também só pelo pela até isso ela entre era depois sem mesmo aos ter seus quem nas me esse eles estão você tinha foram essa num nem suas meu às minha têm numa pelos elas havia seja qual será nós tenho lhe deles essas esses pelas este fosse dele tu te vocês vos lhes meus minhas teu tua teus tuas nosso nossa nossos nossas dela delas esta estes estas aquele aquela aqueles aquelas isto aquilo estou está estamos estão estive esteve estivemos estiveram estava estávamos estavam estivera estivéramos esteja estejamos estejam estivesse estivéssemos estivessem estiver estivermos estiverem hei há havemos hão houve houvemos houveram houvera houvéramos haja hajamos hajam houvesse houvéssemos houvessem houver houvermos houverem houverei houverá houveremos houverão houveria houveríamos houveriam sou somos são era éramos eram fui foi fomos foram fora fôramos seja sejamos sejam fosse fôssemos fossem for formos forem serei será seremos serão seria seríamos seriam tenho tem temos tém tinha tínhamos tinham tive teve tivemos tiveram tivera tivéramos tenha tenhamos tenham tivesse tivéssemos tivessem tiver tivermos tiverem terei terá teremos terão teria teríamos teriam'; 
        $filtro = explode(" ", $filtro);
        foreach ($pesquisa as $v) {
            if(!in_array($v, $filtro)){
                $pesquisaFiltrada[] = $v;
            }
        }
        return $pesquisaFiltrada;
    }
    
    private function atualizando($msg){
        
        $atualizando = $msg->getCampo('Atualizando')->get('valor');
        
        if($atualizando){
            $notIn = implode(', ', $msg->getCampoSessao('pesquisarLocaisNotIn'));
        }else{
            $notIn = 0;
        }
        return $notIn;
    }
}
