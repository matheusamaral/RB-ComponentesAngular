<?php
namespace Quickpeek\Acoes\Aplicacao\Publicacoes;
use Rubeus\ContenerDependencia\Conteiner;
use Rubeus\Servicos\Entrada\Sessao;

class Publicar {
    
    public function publicar($msg){
        
        $usuarioIdSessao = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $localIdSessao = $msg->getCampo('LocalId')->get('valor');
        $publicacao = Conteiner::get('ConsultaNotificacao');
        $publicacoes = $publicacao->consultarHashtag($usuarioIdSessao, $localIdSessao);
        if(!$publicacoes){
            $publicacoes = $publicacao->consultarMidia($usuarioIdSessao, $localIdSessao);
        }
        
        $arquivo = $msg->getCampo('ArquivoBase64')->get('valor');
        if($arquivo){
            $this->midia($msg);
        }
        
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
                $localId[] = $msg->getCampo('LocalId')->get('valor');
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
        
        $arquivo = $msg->getCampo('ArquivoBase64')->get('valor');
        
        foreach($arquivo as $v){
            $enderecoFoto = '/file/imagem/'.date('Y_m_d_H_i_s_'). rand(90000, 9999999999).'.'.$msg->getCampo('Extensao')->get('valor');
            $msg->setCampoSessao('ultimasImagens,0', DIR_BASE . $enderecoFoto);
            Conteiner::get('Base64')->upload($v, DIR_BASE.$enderecoFoto);
            $url = $this->imagemUpada('imagem', 'midia', 0, 2);
            $usuariosId[] = $msg->getCampoSessao('dadosUsuarioLogado,id');
            $locaisId[] = $msg->getCampo('LocalId')->get('valor');
            $urls[] = $url;
        }
        
        $msg->setCampo('entidade', 'Midia');
        $msg->setCampo('Midia::endereco', $urls);
        $msg->setCampo('Midia::usuarioId', $usuariosId);
        $msg->setCampo('Midia::localId', $locaisId);
        Conteiner::get('Cadastro')->cadastrar($msg);
    }
    
    private function imagemUpada($atributo, $pasta, $id=false, $tipo=false){
        if(Sessao::get('ultimasImagens,'.$id)){
            $dados = array( 'h-0' => false,'hr-0' => false,
                        'w-0' => false,'wr-0' => false,
                        'y-0' => false,'x-0' => false);
            
            return Conteiner::get('Imagem')->ImagemUpada($atributo, $pasta, $dados, $id, $tipo);
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
            $hashtagLocalId = $msg->getCampo('HashtagLocal::id')->get('valor');
            $midiaLocalId = $msg->getCampo('Midia::id')->get('valor');
            
            foreach($seguidores as $v){
                $usuarioAcaoId[] = $usuarioId;
                $tipoId[] = 4;
                if($hashtagLocalId){
                    if(!is_array($hashtagLocalId)){
                        $hashtagId[] = $hashtagLocalId;
                    }else{
                        $hashtagId = $hashtagLocalId;
                    }
                    $hashtagsId[] = $hashtagId[0];
                }elseif($midiaLocalId){
                    if(!is_array($midiaLocalId)){
                        $midiaId[] = $midiaLocalId;
                    }else{
                        $midiaId = $midiaLocalId;
                    }
                    $midiasId[] = $midiaId[0];
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
            if(isset($hashtagsId)){
                $this->enviarAlerta($msg, $seguidores, $hashtagsId[0]);
            }elseif(isset($midiasId)){
                $this->enviarAlerta($msg, $seguidores, false, $midiasId[0]);
            }
        }
    }
    
    private function enviarAlerta($msg, $seguidoresId){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $localId = $msg->getCampo('HashtagLocal::localId')->get('valor');
        $query = Conteiner::get('ConsultaListarDadosUsuario');
        
        $dadosLocal = Conteiner::get('DadosLocal')->consultar($localId);
        $dadosUsuarioLogado = $query->consultar($usuarioId);
        
        foreach($seguidoresId as $v){
            $dadosUsuario = $query->consultar($v);
            $contents = ['en'=>$dadosUsuarioLogado['usuarioNome'] . ' fez sua primeira publicação em ' . $dadosLocal['titulo']];
            $fields = [
                'include_player_ids'=>[$dadosUsuario['playerId']], 
                'data'=>['pagina'=>36], 
                'contents'=>$contents, 
                'large_icon'=>$dadosUsuarioLogado['usuarioEndereco'], 
                'chrome_web_icon'=>$dadosUsuarioLogado['usuarioEndereco'], 
                'firefox_icon'=>$dadosUsuarioLogado['usuarioEndereco'],
                'headings'=>['en'=>'Primeira publicação!']];

            $alerta = Conteiner::get('Alerta');
            $response = $alerta->enviar($fields);
        }
        $alerta->cadastrarAlerta($dadosUsuario['usuarioId'], 2, $response, false, $msg->getCampo('Notificacoes::id')->get('valor'));
    }
}
