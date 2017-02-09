<?php
namespace Quickpeek\Usuario\Aplicacao\ConvidarAmigos;
use Rubeus\ContenerDependencia\Conteiner;

class ConvidarAmigos {
    
    public function convidarAmigos($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        
        $credencial = urlencode('768789050B22B1592C5871338A9395E1687DB177');
        $token = urlencode('f6cAac');
        $mensagem = urlencode('Venha para o Quickpeek pagina');
        
        $telefones = $msg->getCampo('Telefones')->get('valor');
        foreach($telefones as $telefone){
            $retorno = file_get_contents('http://www.mpgateway.com/v_3_00/sms/smspush/enviasms.aspx?Credencial=' . 
                    $credencial . '&Token=' . $token . '&Principal_User=FF' . '&Aux_User=F1' . 
                    '&Mobile=' . urlencode($telefone) . '&Send_Project=N' . '&Message=' . $mensagem);
            
            $usuarios[] = $usuarioId;
            switch($retorno){
                case '000':
                    $id[] = 1;
                    break;
                case 'X01':
                    $id[] = 2;
                    break;
                case 'X02:0':
                    $id[] = 2;
                    break;
                case '001':
                    $id[] = 3;
                    break;
                case '005':
                    $id[] = 4;
                    break;
                case '007':
                    $id[] = 5;
                    break;
                case '008':
                    $id[] = 6;
                    break;
                case '009':
                    $id[] = 7;
                    break;
                case '010':
                    $id[] = 8;
                    break;
                case '012':
                    $id[] = 9;
                    break;
                case '013':
                    $id[] = 10;
                    break;
                case '015':
                    $id[] = 11;
                    break;
                case '016':
                    $id[] = 12;
                    break;
                case '018':
                    $id[] = 13;
                    break;
                case '019':
                    $id[] = 14;
                    break;
                case '022':
                    $id[] = 15;
                    break;
            }
        }
        
        if($id){
            $msg->setCampo('entidade', 'Sms');
            $msg->setCampo('Sms::usuarioId', $usuarios);
            $msg->setCampo('Sms::telefone', $telefones);
            $msg->setCampo('Sms::statusSmsId', $id);
            Conteiner::get('Cadastro')->cadastrar($msg);
        }else{
            $msg->setResultadoEtapa(false);
        }
    }
}