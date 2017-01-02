<?php
namespace OneSignal;

class NotificacaoGeral{
      
    public function enviar($idNuvem, $img, $msg, $id=1){
        $content = array(
			"en" => $msg                        
			);
		                   
        $mensagem = array(
                    'msg' 	=> $msg,
                    'vibrate'	=> 1,
                    'sound'	=> 1,
                    'img'	=> $img,
                    'id'	=> $id
            );
            
        $fields = array(
                'app_id' => "7d2eabe6-90cd-45c0-aac8-3de22a0cf193",
                //Exemplo enviando para usuarios especificos
                'include_player_ids' => $idNuvem,
                //'included_segments' => array('All'),//$idNuvem,
                'data' => $mensagem,                        
                'contents' => $content,
                'headings' => array('en'=>"Quickpeek")
        );

        $fields = json_encode($fields);


        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, "https://onesignal.com/api/v1/notifications");
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json; charset=utf-8',
                                                                                           'Authorization: Basic YmU4MTIwMjctNTMwYS00NmE4LThjNjgtNTU3NjZkMWQyNTFm'));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
        curl_setopt($ch, CURLOPT_HEADER, FALSE);
        curl_setopt($ch, CURLOPT_POST, TRUE);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $fields);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);

        $response = curl_exec($ch);
        curl_close($ch);

        return $response;
    }
}

var_dump("entrou");
$notificacao = new NotificacaoGeral();
$response = $notificacao->enviar(array('a40228d5-05a8-4921-85a8-f1b74749ee8d'),null,"Sergio Lanches Seu pedido saiu para entrega.",1);
var_dump("resposta=>",$response);

	$return["allresponses"] = $response;
	$return = json_encode( $return);
	
        var_dump("\n\nJSON received:\n");
	var_dump($return);
        var_dump("\n");
       
