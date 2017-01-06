<?php
namespace Quickpeek\Base;
use Rubeus\ContenerDependencia\Conteiner;

class UsuariosBase {
    
    public function usuariosBase($msg){
        
        $cadastro = Conteiner::get('Cadastro');
        $msg->setCampo('entidade', 'Usuario');
        
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
        $nomes = ['Jose', 'Augusto', 'Ana', 'Maria', 'Feliz', 'Cale', 'Aline', 'Thiago', 'Clara', 'Diego'];
        
        for($i = 0; $i < 10000; $i++){
            $k = array_rand($imagens, 1);
            $x = array_rand($nomes, 1);
            $endereco[] = $imagens[$k];
            $nome[] = $nomes[$x];
            $telefone[] = '55' . rand(11, 99) . rand(1111, 9999) . rand(1111, 9999);
            $genero[] = rand(1, 2);
            $nascimento[] = rand(1978, 2000) . '-' . rand(1, 12) . '-' . rand(1, 29);
            $avatares[] = rand(1, 4);
        }
        
        $msg->setCampo('Usuario::endereco', $endereco);
        $msg->setCampo('Usuario::telefone', $telefone);
        $msg->setCampo('Usuario::nome', $nome);
        $msg->setCampo('Usuario::generoId', $genero);
        $msg->setCampo('Usuario::nascimento', $nascimento);
        $msg->setCampo('Usuario::avataresId', $avatares);
        $cad = $cadastro->cadastrar($msg);
        
        if($cad){
            $msg->setCampo('entidade', 'Configuracoes');
            $msg->setCampo('Configuracoes::usuarioId', $msg->getCampo('Usuario::id')->get('valor'));
            $cadastro->cadastrar($msg);
        }
    }
}

