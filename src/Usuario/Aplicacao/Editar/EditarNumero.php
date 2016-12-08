<?php
namespace Quickpeek\Usuario\Aplicacao\Editar;
use Rubeus\ContenerDependencia\Conteiner;

class EditarNumero {
    
    public function editarNumero($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $telefoneAntigo = $msg->getCampo('TelefoneAntigo')->get('valor');
        $telefoneNovo = $msg->getCampo('Usuario::telefone')->get('valor');
        
        $query = Conteiner::get('ConsultaVerificarNumero');
        
        $numeroUsuario = $query->consultar($telefoneAntigo, $usuarioId);
        $numeroExistente = $query->consultarNumero($telefoneNovo);
        
        if($telefoneAntigo != $telefoneNovo){
            if($numeroUsuario){
                if(!$numeroExistente){
                    $msg->setResultadoEtapa(true);
                }else{
                    $msg->setResultadoEtapa(false, 'num_exist');
                }
            }else{
                $msg->setResultadoEtapa(false, 'num_n_seu');
            }
        }else{
            $msg->setResultadoEtapa(false, 'num_igual');
        }
    }
}