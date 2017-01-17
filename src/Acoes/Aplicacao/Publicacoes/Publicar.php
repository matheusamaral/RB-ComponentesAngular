<?php
namespace Quickpeek\Acoes\Aplicacao\Publicacoes;
use Rubeus\ContenerDependencia\Conteiner;

class Publicar {
    
    public function publicar($msg){
        
        $usuarioIdSessao = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $localIdSessao = $msg->getCampoSessao('dadosUsuarioLogado,local');
        $publicacao = Conteiner::get('ConsultaNotificacao');
        $publicacoes = $publicacao->consultarHashtag($usuarioIdSessao, $localIdSessao);
        if(!$publicacoes){
            $publicacoes = $publicacao->consultarMidia($usuarioIdSessao, $localIdSessao);
        }
        
        $this->midia($msg);
        
        $hashtags = $msg->getCampo('Hashtag::titulo')->get('valor');
        if($hashtags){
            $categoriasTotais = $msg->getCampo('HashtagCategoria::categoriaHashtagId')->get('valor');

            $hashtags = array_unique($hashtags);
            $keys = array_keys(array_unique($hashtags));

            foreach($categoriasTotais as $k=>$v){
                if(in_array($k, $keys)){
                    $categoriaId[] = $v;
                }
            }
            $consultaHash = Conteiner::get('ConsultaHashtag');
            $hashtagsId = [];
            foreach($hashtags as $v){
                $usuarioId[] = $msg->getCampoSessao('dadosUsuarioLogado,id');
                $localId[] = $msg->getCampoSessao('dadosUsuarioLogado,local');
                $query = $consultaHash->consultar($v);
                $hashtagsId[] = $query;
                if(!$query){
                    $hashtagsTitulo[] = $v;
                }
            }
            
            $hashtagsNovosIds = $this->cadastrarHashtags($msg, $hashtagsTitulo, $hashtagsId);
            
            if(isset($hashtagsNovosIds)){
                if($this->cadastrarHashtagLocal($msg, $hashtagsNovosIds, $localId, $usuarioId, $categoriaId)){
                    $this->cadastrarHashtagCategoria($msg, $hashtagsNovosIds, $categoriaId);
                }else{
                    $msg->setResultadoEtapa(false);
                }
            }else{
                $msg->setResultadoEtapa(false);
            }
        }
        if(!$publicacoes){
            $this->enviarNotificacao($msg);
        }
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
    
    private function cadastrarHashtags($msg, $hashtagsTitulo, $hashtagsId){
        
        if($hashtagsTitulo){
            foreach($hashtagsTitulo as $v){
                $usuarioIdNovo[] = $msg->getCampoSessao('dadosUsuarioLogado,id');
            }
            $msg->setCampo('entidade', 'Hashtag');
            $msg->setCampo('Hashtag::usuarioId', $usuarioIdNovo);
            $msg->setCampo('Hashtag::titulo', $hashtagsTitulo);
            Conteiner::get('Cadastro')->cadastrar($msg);
            $hashtagIdValor = $msg->getCampo('Hashtag::id')->get('valor');
            if(!is_array($hashtagIdValor)){
                $hashtagIdNovo[] = $hashtagIdValor;
            }else{
                $hashtagIdNovo = $hashtagIdValor;
            }
        }
        
        $x = 0;
        for($i = 0; $i < count($hashtagsId); $i++){
            if(!$hashtagsId[$i]){
                $hashtagsId[$i] = $hashtagIdNovo[$x];
                $x++;
            }
        }
        return $hashtagsId;
    }
    
    private function cadastrarHashtagLocal($msg, $hashtagsNovosIds, $localId, $usuarioId, $categoriaId){
        
        $visibilidadeId = Conteiner::get('ConsultaVisibilidade')->consultar($usuarioId[0]);
        
        foreach($hashtagsNovosIds as $v){
            $visibilidadeIds[] = $visibilidadeId;
        }
        $msg->setCampo('entidade', 'HashtagLocal');
        $msg->setCampo('HashtagLocal::hashtagId', $hashtagsNovosIds);
        $msg->setCampo('HashtagLocal::categoriaHashtagId', $categoriaId);
        $msg->setCampo('HashtagLocal::visibilidadeId', $visibilidadeIds);
        $msg->setCampo('HashtagLocal::localId', $localId);
        $msg->setCampo('HashtagLocal::usuarioId', $usuarioId);
        return Conteiner::get('Cadastro')->cadastrar($msg);
    }
    
    private function cadastrarHashtagCategoria($msg, $hashtagsNovosIds, $categoriaId){
        $msg->setCampo('entidade', 'HashtagCategoria');
        $msg->setCampo('HashtagCategoria::hashtagId', $hashtagsNovosIds);
        $msg->setCampo('HashtagCategoria::categoriaHashtagId', $categoriaId);
        return Conteiner::get('Cadastro')->cadastrar($msg);
    }
    
    private function enviarNotificacao($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $visibilidadeId = Conteiner::get('ConsultaVisibilidade')->consultar($usuarioId);
        $seguidores = Conteiner::get('ConsultaSeguidoresId')->consultar($usuarioId);

        if($visibilidadeId != 3 && $seguidores){
            $hashtagId = $msg->getCampo('HashtagLocal::id')->get('valor');
            $midiaId = $msg->getCampo('Midia::id')->get('valor');

            foreach($seguidores as $v){
                $usuarioAcaoId[] = $usuarioId;
                $tipoId[] = 4;
                if($hashtagId){
                    $hashtagsId[] = $hashtagId[0];
                }elseif($midiaId){
                    $midiasId[] = $midiaId;
                }
            }
            $msg->setCampo('entidade', 'Notificacoes');
            $msg->setCampo('Notificacoes::usuarioId', $seguidores);
            $msg->setCampo('Notificacoes::usuarioAcaoId', $usuarioAcaoId);
            $msg->setCampo('Notificacoes::tipoId', $tipoId);
            if(isset($hashtagsId)){
                $msg->setCampo('Notificacoes::hashtagLocalId', $hashtagsId);
            }elseif(isset($midiasId)){
                $msg->setCampo('Notificacoes::midiaId', $midiasId);
            }
            Conteiner::get('Cadastro')->cadastrar($msg);
        }
    }
}
