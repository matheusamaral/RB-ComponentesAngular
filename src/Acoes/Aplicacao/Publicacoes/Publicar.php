<?php
namespace Quickpeek\Acoes\Aplicacao\Publicacoes;
use Rubeus\ContenerDependencia\Conteiner;

class Publicar {
    
    public function publicar($msg){
        
        $this->midia($msg);
        
        $cadastro = Conteiner::get('Cadastro');
        $hashtag = $msg->getCampo('Hashtag::titulo')->get('valor');
        if($hashtag){
            $consultaHash = Conteiner::get('ConsultaHashtag');
            $hashtagId = [];

            foreach($hashtag as $v){
                $query = $consultaHash->consultar($v);
                $hashtagId[] = $query;
                if(!$query){
                    $hashtagTitulo[] = $v;
                }
                $usuarioId[] = $msg->getCampoSessao('dadosUsuarioLogado,id');
                $localId[] = $msg->getCampoSessao('dadosUsuarioLogado,local');
            }
            
            if($hashtagTitulo){
                foreach($hashtagTitulo as $v){
                    $usuarioIdNovo[] = $msg->getCampoSessao('dadosUsuarioLogado,id');
                }
                $msg->setCampo('entidade', 'Hashtag');
                $msg->setCampo('Hashtag::usuarioId', $usuarioIdNovo);
                $msg->setCampo('Hashtag::titulo', $hashtagTitulo);
                $cadastro->cadastrar($msg);
                $hashtagIdNovo = $msg->getCampo('Hashtag::id')->get('valor');

                for($i = 0; $i < count($hashtagId); $i++){
                    if(!$hashtagId[$i]){
                        $hashtagId[$i] = $hashtagIdNovo[$i];
                    }
                }
            }

            $msg->setCampo('entidade', 'HashtagLocal');
            $msg->setCampo('HashtagLocal::hashtagId', $hashtagId);
            $msg->setCampo('HashtagLocal::localId', $localId);
            $msg->setCampo('HashtagLocal::usuarioId', $usuarioId);
            $situacao = $cadastro->cadastrar($msg);

            if($situacao){
                $msg->setCampo('entidade', 'HashtagCategoria');
                $msg->setCampo('HashtagCategoria::hashtagId', $hashtagId);
                $cadastro->cadastrar($msg);
            }else{
                $msg->setResultadoEtapa(false);
            }
        }
        
        $this->enviarNotificacao($msg);
    }
    
    private function midia($msg){
        $arquivo = $msg->getCampo('Arquivo')->get('valor');
        if($arquivo){
            $caminho = Conteiner::get('Upload')->upar($arquivo, 'midia', 'mda');    
            if(!$caminho){
                $erro = Conteiner::get('Upload')->getErro();
                $msg->setResultadoEtapa(false, $erro['cod'], ['arquivo' => $erro['arquivo']]);
            }else{
                $msg->setCampo('entidade', 'Midia');
                $msg->setCampo('Midia::endereco', $caminho[0]['url']);
                $msg->setCampo('Midia::localId', $msg->getCampoSessao('dadosUsuarioLogado,local'));
                $msg->setCampo('Midia::usuarioId', $msg->getCampoSessao('dadosUsuarioLogado,id'));
                Conteiner::get('Cadastro')->cadastrar($msg);
            }
        }
    }
    
    private function enviarNotificacao($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $localId = $msg->getCampoSessao('dadosUsuarioLogado,local');
        
        $query = Conteiner::get('ConsultaNotificacao')->consultar($usuarioId, $localId);
        if(!$query){
            
        }
    }
}
