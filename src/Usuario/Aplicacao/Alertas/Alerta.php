<?php
namespace Quickpeek\Usuario\Aplicacao\Alertas;
use Rubeus\ContenerDependencia\Conteiner;

class Alerta {
    
    public function enviar($fields){
        
        $fields['app_id'] = '7d2eabe6-90cd-45c0-aac8-3de22a0cf193';
        
        $fields = json_encode($fields);
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, "https://onesignal.com/api/v1/notifications");
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json; charset=utf-8',
                                                                                           'Authorization: Basic NGEwMGZmMjItY2NkNy0xMWUzLTk5ZDUtMDAwYzI5NDBlNjJj'));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
        curl_setopt($ch, CURLOPT_HEADER, FALSE);
        curl_setopt($ch, CURLOPT_POST, TRUE);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $fields);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
        
        $response = curl_exec($ch);
        curl_close($ch);
        
        return $response;
    }
    
    public function cadastrarAlerta($usuarioId, $tipoId, $response, $perguntasId = false, $notificacoesId = false, $mensagensId = false, $localId = false){
        
        $msg = Conteiner::get('Mensagem');
        $msg->setCampo('entidade', 'Alertas');
        $msg->setCampo('Alertas::usuarioId', $usuarioId);
        $msg->setCampo('Alertas::perguntasId', $perguntasId);
        $msg->setCampo('Alertas::notificacoesId', $notificacoesId);
        $msg->setCampo('Alertas::mensagensId', $mensagensId);
        $msg->setCampo('Alertas::localId', $localId);
        $msg->setCampo('Alertas::tipoId', $tipoId);
        $msg->setCampo('Alertas::response', $response);
        return Conteiner::get('Cadastro')->cadastrar($msg);
    }
}