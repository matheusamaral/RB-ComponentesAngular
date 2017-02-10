<?php
namespace Quickpeek;

class Redirecionar {
    
    public function redirect(){
        
        $iPod = stripos($_SERVER['HTTP_USER_AGENT'], 'iPod');
        $iPhone = stripos($_SERVER['HTTP_USER_AGENT'], 'iPhone');
        $iPad = stripos($_SERVER['HTTP_USER_AGENT'], 'iPad');
        $android = stripos($_SERVER['HTTP_USER_AGENT'], 'Android');
        $windows = stripos($_SERVER['HTTP_USER_AGENT'], 'Windows Phone');
        
        if($iPod || $iPhone || $iPad){
            $string = "Location: itms-apps://itunes.apple.com/app/id880047117";
            header($string);
            die();
        }elseif($android){
            $string = "Location: market://details?id=com.rovio.angrybirds";
            header($string);
            die();
        }elseif($windows){
            $string = "Location: ms-windows-store:navigate?appid=9wzdncrfj2wl";
            header($string);
            die();
        }else{
            $string = "Location: http://quickpeek.com.br/download";
            header($string);
            die();
        }
    }
}

$obj = new Redirecionar();
$obj->redirect();