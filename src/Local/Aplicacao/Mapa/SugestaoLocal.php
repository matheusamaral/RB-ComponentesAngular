<?php
namespace Quickpeek\Local\Aplicacao\Mapa;
use Rubeus\ContenerDependencia\Conteiner;
use Rubeus\ManipulacaoEntidade\Dominio\ConteinerEntidade;

class SugestaoLocal {
    
    public function sugestaoLocal($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $latitude = $msg->getCampo('Latitude')->get('valor');
        $longitude = $msg->getCampo('Longitude')->get('valor');
        $query = Conteiner::get('ConsultaSugestaoLocal');
        $checkIn = $query->consultarCheckIn($usuarioId);
        
        if($checkIn){
            if($checkIn['cancelarCheckIn'] == 1){
                $entidade = ConteinerEntidade::getInstancia('CheckIn');
                $entidade->setId($checkIn['checkInId']);
                $entidade->setPresente(0);
                $entidade->salvar();
                if(!$entidade->getErro()){
                    $this->sugerirLocal($msg);
                }
            }else{
                $msg->setResultadoEtapa(true, false, ['dados'=>$checkIn]);
            }
        }else{
            $casaTrabalho = $query->consultarCasaTrabalho($usuarioId, $latitude, $longitude);
            if($casaTrabalho){
                if($casaTrabalho['casa'] == 1 && $casaTrabalho['distanciaCasa'] > 0.03 || 
                        $casaTrabalho['trabalho'] && $casaTrabalho['distanciaTrabalho'] > 0.03){
                    $this->cancelarCasaTrabalho($msg, $casaTrabalho);
                }else{
                    if($casaTrabalho['casa'] == 1){
                        $dados = 1;
                    }elseif($casaTrabalho['trabalho'] == 1){
                        $dados = 2;
                    }
                    $msg->setResultadoEtapa(true, false, ['dados'=>$dados]);
                }
            }else{
                $this->sugerirLocal($msg);
            }
        }
    }
    
    private function cancelarCasaTrabalho($msg, $casaTrabalho){
        
        $entidade = ConteinerEntidade::getInstancia('CasaTrabalho');
        $entidade->setId($casaTrabalho['id']);
        if($casaTrabalho['casa'] == 1){
            $entidade->setCasa(0);
        }
        if($casaTrabalho['trabalho'] == 1){
            $entidade->setTrabalho(0);
        }
        $entidade->salvar();
        if(!$entidade->getErro()){
            $this->sugerirLocal($msg);
        }
    }
    
    private function sugerirLocal($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $latitude = $msg->getCampo('Latitude')->get('valor');
        $longitude = $msg->getCampo('Longitude')->get('valor');
        
        $sugestao = Conteiner::get('ConsultaSugestaoLocal')->consultarSugestao($usuarioId, $latitude, $longitude);
        
        if($sugestao){
            $msg->setCampo('entidade', 'CheckIn');
            $msg->setCampo('CheckIn::usuarioId', $usuarioId);
            $msg->setCampo('CheckIn::localId', $sugestao['localId']);
            $msg->setCampo('CheckIn::visibilidadeId', 3);
            $msg->setCampo('CheckIn::automatico', 1);
            Conteiner::get('Cadastro')->cadastrar($msg);
            $msg->setCampoSessao('sugestaoCheckIn', $msg->getCampo('CheckIn::id')->get('valor'));
        }
        
        $msg->setResultadoEtapa(true, false, ['dados'=>$sugestao]);
    }
}