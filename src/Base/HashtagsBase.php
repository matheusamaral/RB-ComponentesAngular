<?php
namespace Quickpeek\Base;
use Rubeus\ContenerDependencia\Conteiner;

class HashtagsBase {
    
   public function HashtagsBase($msg){
       
        $this->midia($msg);
        if(!1){
            for($i = 0; $i < 1000; $i++){
                $usuarios[] = rand(1, 10100);
                $locais[] = rand(1, 8795);
                $hashtags[] = rand(1, 11);
                $categorias[] = rand(1, 9);
        }
        
        $msg->setCampo('entidade', 'HashtagCategoria');
        $msg->setCampo('HashtagCategoria::hashtagId', $hashtags);
        $msg->setCampo('HashtagCategoria::categoriaHashtagId', $categorias);
        Conteiner::get('Cadastro')->cadastrar($msg);
        $msg->setCampo('entidade', 'HashtagLocal');
        $msg->setCampo('HashtagLocal::hashtagId', $hashtags);
        $msg->setCampo('HashtagLocal::usuarioId', $usuarios);
        $msg->setCampo('HashtagLocal::localId', $locais);
        Conteiner::get('Cadastro')->cadastrar($msg);
       }
    }
    
    private function midia($msg){
        
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
        
        for($i = 0; $i < 10000; $i++){
            $k = array_rand($imagens, 1);
            $endereco[] = $imagens[$k];
            $usuarios[] = rand(1, 10100);
            $locais[] = rand(1, 8795);
        }
        $msg->setCampo('entidade', 'Midia');
        $msg->setCampo('Midia::endereco', $endereco);
        $msg->setCampo('Midia::localId', $locais);
        $msg->setCampo('Midia::usuarioId', $usuarios);
        Conteiner::get('Cadastro')->cadastrar($msg);
    }
}