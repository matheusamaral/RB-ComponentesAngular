<?php
namespace Quickpeek\Usuario\Aplicacao\Cadastro;
use Rubeus\ContenerDependencia\Conteiner;
use Rubeus\Servicos\Entrada\Sessao;

class SalvarFoto {
    
    public function salvarFoto($msg){
        
        $enderecoFoto = '/file/imagem/'.date('Y_m_d_H_i_s_'). rand(90000, 9999999999).'.jpeg';
        $msg->setCampoSessao('ultimasImagens,0', DIR_BASE . $enderecoFoto);
        Conteiner::get('Base64')->upload($msg->getCampo('ArquivoBase64')->get('valor'), DIR_BASE.$enderecoFoto);
        $url = $this->imagemUpada('imagem', 'perfil', 0, 1);
//        $caminho = [['url' => $url]];
        $caminho = 'HTTP://192.168.0.121:8000/QuickPeek/quickpeek/' . $enderecoFoto;
        
        if($url){
            $msg->setCampoSessao('salvarFoto', $caminho);
//            $msg->setCampoSessao('salvarFoto', $caminho[0]['url']);
            $msg->setResultadoEtapa(true, false, ['endereco'=>$caminho[0]['url']]);
        }else{
            $msg->setResultadoEtapa(false);
        }
    }
    
    private function imagemUpada($atributo, $pasta, $id=false, $tipo=false){
        if(Sessao::get('ultimasImagens,'.$id)){
            $dados = array( 'h-0' => false,'hr-0' => false,
                        'w-0' => false,'wr-0' => false,
                        'y-0' => false,'x-0' => false);
            
            return Conteiner::get('Imagem')->ImagemUpada($atributo, $pasta, $dados, $id, $tipo);
        }
        return true;
    }
}
