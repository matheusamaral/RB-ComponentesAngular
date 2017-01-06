<?php
namespace Quickpeek\Base;
use Rubeus\ContenerDependencia\Conteiner;
use Rubeus\ManipulacaoEntidade\Dominio\ConteinerEntidade;

class CurtirBase {
    
    public function curtirBase($msg){
        $letras  = array('a','b','c','d','e','f','g','h','i','j','k','l','m','n','p','q','r','s','t','u','v','x','w','y','z');
        $imagens = ['HTTP://172.17.0.2/Quickpeek//file/imagem/1.png', 
            'HTTP://172.17.0.2/Quickpeek//file/imagem/2.jpeg', 
            'HTTP://172.17.0.2/Quickpeek//file/imagem/3.jpg', 
            'HTTP://172.17.0.2/Quickpeek//file/imagem/4.png', 
            'HTTP://172.17.0.2/Quickpeek//file/imagem/5.png', 
            'HTTP://172.17.0.2/Quickpeek//file/imagem/6.jpg', 
            'HTTP://172.17.0.2/Quickpeek//file/imagem/7.jpg', 
            'HTTP://172.17.0.2/Quickpeek//file/imagem/8.jpg', 
            'HTTP://172.17.0.2/Quickpeek//file/imagem/9.jpg', 
            'HTTP://172.17.0.2/Quickpeek//file/imagem/10.jpg'];
        $total_let = count($letras)-1;
        for($i = 0; $i < 10000; $i++){
            $k = array_rand($imagens, 1);
            $endereco[] = $imagens[$k];
            $usuarios[] = rand(1, 10100);
            $usuariosSeguirId[] = rand(1, 10100);
            $tipos[] = rand(1, 5);
            if($tipos[$i] == 3){
                $resposta[] = rand(1, 10000);
            }else{
                $resposta[] = false;
            }
            if($tipos[$i] == 4){
                if(rand(1, 2) == 1){
                    $hashtagLocal[] = rand(1, 10000);
                }else{
                    $midia[] = rand(1, 10000);
                }
            }else{
                $hashtagLocal[] = false;
                $midia[] = false;
            }
            $titulo[] = $letras[rand(0,$total_let)] . $letras[rand(0,$total_let)] . $letras[rand(0,$total_let)] . $letras[rand(0,$total_let)] .
                    $letras[rand(0,$total_let)] . $letras[rand(0,$total_let)] . $letras[rand(0,$total_let)] . $letras[rand(0,$total_let)] . $letras[rand(0,$total_let)] .
                    $letras[rand(0,$total_let)] . $letras[rand(0,$total_let)] . $letras[rand(0,$total_let)] . $letras[rand(0,$total_let)];
        }
        
        $msg->setCampo('entidade', 'Seguir');
        $msg->setCampo('Seguir::usuarioId', $usuarios);
        $msg->setCampo('Seguir::usuarioAcaoId', $usuariosSeguirId);
        $msg->setCampo('Seguir::tipoId', $tipos);
        $msg->setCampo('Seguir::respostaId', $resposta);
        $msg->setCampo('Seguir::midiaId', $midia);
        $msg->setCampo('Seguir::hashtagLocalId', $hashtagLocal);
        Conteiner::get('Cadastro')->cadastrar($msg);
    }
}