<?php
namespace Quickpeek\Usuario\Aplicacao\Cadastro;
use Rubeus\ContenerDependencia\Conteiner;
use Rubeus\ManipulacaoEntidade\Dominio\ConteinerEntidade;

class EnviarSms {
    
    public function enviarSms($msg){
        
        $telefone = urlencode($msg->getCampo('Usuario::telefone')->get('valor'));
        
        $tempo = Conteiner::get('ConfiguracoesQuickpeek')->consultar();
        $editando = Conteiner::get('ConsultaVerificarEdicao')->consultar($telefone, $tempo['sms']);
        
        if($editando){
            $msg->setResultadoEtapa(true, false, ['editando'=>1]);
        }else{
            $credencial = urlencode('F3DB45E6D02E31330CF62F36C8F8242D68A572E9');
            $token = urlencode('c74285');

            $emcrypt = Conteiner::get('Emcrypt');
            $codigo = $emcrypt::gerarCodigoBanco(ConteinerEntidade::getInstancia('SmsCodigo'), 'codigo', 6);

            $mensagem = urlencode('O seu código do Quickpeek é ' . $codigo);

            $retorno = file_get_contents('https://www.mpgateway.com/v_3_00/sms/smspush/enviasms.aspx?Credencial=' . 
                    $credencial . '&Token=' . $token . '&Principal_User=FF' . '&Aux_User=F1' . 
                    '&Mobile=' . $telefone . '&Send_Project=N' . '&Message=' . $mensagem);

            switch($retorno){
                case '000':
                    $id = 1;
                    break;
                case 'X01':
                    $id = 2;
                    break;
                case 'X02:0':
                    $id = 2;
                    break;
                case '001':
                    $id = 3;
                    break;
                case '005':
                    $id = 4;
                    break;
                case '007':
                    $id = 5;
                    break;
                case '008':
                    $id = 6;
                    break;
                case '009':
                    $id = 7;
                    break;
                case '010':
                    $id = 8;
                    break;
                case '012':
                    $id = 9;
                    break;
                case '013':
                    $id = 10;
                    break;
                case '015':
                    $id = 11;
                    break;
                case '016':
                    $id = 12;
                    break;
                case '018':
                    $id = 13;
                    break;
                case '019':
                    $id = 14;
                    break;
                case '022':
                    $id = 15;
                    break;
            }

            $return = $this->setarSmsCodigo($msg, $id, $codigo);

            if($return){
                $msg->setResultadoEtapa(true);
            }else{
                $msg->setResultadoEtapa(false);
            }
        }
    }
    
    private function setarSmsCodigo($msg, $statusId, $codigo){
        
        $telefone = $msg->getCampo('Usuario::telefone')->get('valor');
        $msg->setCampo('entidade', 'SmsCodigo');
        $msg->setCampo('SmsCodigo::telefone', $telefone);
        $msg->setCampo('SmsCodigo::statusSmsId', $statusId);
        $msg->setCampo('SmsCodigo::codigo', $codigo);
        return Conteiner::get('Cadastro')->cadastrar($msg);
    }
}
