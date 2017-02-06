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
        
        $query = Conteiner::get('ConsultaSugestaoLocal');
        $alerta = $msg->getCampo('Alertar')->get('valor');
        if($alerta == 1){            
            $casaTrabalho = $query->consultarDistancia($usuarioId, $latitude, $longitude);
        }
        
        if($alerta == 0 || (!$casaTrabalho && $alerta == 1)){
            
            $sugestao = $query->consultarSugestao($usuarioId, $latitude, $longitude);

            if($sugestao){
                $msg->setCampo('entidade', 'CheckIn');
                $msg->setCampo('CheckIn::usuarioId', $usuarioId);
                $msg->setCampo('CheckIn::localId', $sugestao['localId']);
                $msg->setCampo('CheckIn::visibilidadeId', 3);
                $msg->setCampo('CheckIn::automatico', 1);
                Conteiner::get('Cadastro')->cadastrar($msg);
                $msg->setCampoSessao('sugestaoCheckIn', $msg->getCampo('CheckIn::id')->get('valor'));
            }

            if($alerta == 1){
                $this->enviarAlerta($msg);
            }
        }
        
        if(!isset($sugestao)){
            $sugestao = false;
        }
        
        $msg->setResultadoEtapa(true, false, ['dados'=>$sugestao]);
    }
    
    private function enviarAlerta($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        
        $localId = $msg->getCampo('CheckIn::localId')->get('valor');
        $dados = Conteiner::get('ConsultaListarDadosUsuario')->consultar($usuarioId);
        
        $contents = ['en'=>'Confirme o local em que você está!'];
        $fields = [
            'include_player_ids'=>[$dados['playerId']],
            'data'=>['pagina'=>22],
            'contents'=>$contents,
            'headings'=>['en'=>'Check-in!']];
        
        $alerta = Conteiner::get('Alerta');
        $response = $alerta->enviar($fields);
        
        $alerta->cadastrarAlerta($usuarioId, 4, $response, false, false, false, $localId);
    }
}