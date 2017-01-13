
        
CREATE TABLE `perguntas`( 
    `id` int  AUTO_INCREMENT ,
     PRIMARY KEY (`id`),
    `titulo` varchar(45)   ,
    `respondida` varchar(45)   ,
    `usuario_id` INT   ,
    INDEX `perguntas_fk_usuario_id_idx`(`usuario_id` ASC),
    CONSTRAINT `perguntas_fk_usuario_id` 
         FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`)
     ON DELETE NO ACTION
     ON UPDATE NO ACTION,
    `local_id` INT   ,
    INDEX `perguntas_fk_local_id_idx`(`local_id` ASC),
    CONSTRAINT `perguntas_fk_local_id` 
         FOREIGN KEY (`local_id`) REFERENCES `local` (`id`)
     ON DELETE NO ACTION
     ON UPDATE NO ACTION,
    `visibilidade_id` INT   ,
    INDEX `perguntas_fk_visibilidade_id_idx`(`visibilidade_id` ASC),
    CONSTRAINT `perguntas_fk_visibilidade_id` 
         FOREIGN KEY (`visibilidade_id`) REFERENCES `visibilidade` (`id`)
     ON DELETE NO ACTION
     ON UPDATE NO ACTION,
    `ativo` tinyint   ,
    `momento` datetime   ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
        
CREATE TABLE `respostas`( 
    `id` int  AUTO_INCREMENT ,
     PRIMARY KEY (`id`),
    `titulo` varchar(45)   ,
    `endereco` varchar(45)   ,
    `check_in` varchar(45)   ,
    `ativo` tinyint   ,
    `momento` datetime   ,
    `usuario_id` INT   ,
    INDEX `respostas_fk_usuario_id_idx`(`usuario_id` ASC),
    CONSTRAINT `respostas_fk_usuario_id` 
         FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`)
     ON DELETE NO ACTION
     ON UPDATE NO ACTION,
    `perguntas_id` INT   ,
    INDEX `respostas_fk_perguntas_id_idx`(`perguntas_id` ASC),
    CONSTRAINT `respostas_fk_perguntas_id` 
         FOREIGN KEY (`perguntas_id`) REFERENCES `perguntas` (`id`)
     ON DELETE NO ACTION
     ON UPDATE NO ACTION,
    `visibilidade_id` INT   ,
    INDEX `respostas_fk_visibilidade_id_idx`(`visibilidade_id` ASC),
    CONSTRAINT `respostas_fk_visibilidade_id` 
         FOREIGN KEY (`visibilidade_id`) REFERENCES `visibilidade` (`id`)
     ON DELETE NO ACTION
     ON UPDATE NO ACTION,
    `bloqueado` varchar(45)   ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
        
CREATE TABLE `respostas_visualizadas`( 
    `id` int  AUTO_INCREMENT ,
     PRIMARY KEY (`id`),
    `ativo` tinyint   ,
    `momento` datetime   ,
    `usuario_id` INT   ,
    INDEX `respostas_visualizadas_fk_usuario_id_idx`(`usuario_id` ASC),
    CONSTRAINT `respostas_visualizadas_fk_usuario_id` 
         FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`)
     ON DELETE NO ACTION
     ON UPDATE NO ACTION,
    `respostas_id` INT   ,
    INDEX `respostas_visualizadas_fk_respostas_id_idx`(`respostas_id` ASC),
    CONSTRAINT `respostas_visualizadas_fk_respostas_id` 
         FOREIGN KEY (`respostas_id`) REFERENCES `respostas` (`id`)
     ON DELETE NO ACTION
     ON UPDATE NO ACTION) ENGINE=InnoDB DEFAULT CHARSET=latin1;
        
CREATE TABLE `pergunta_usuario`( 
    `id` int  AUTO_INCREMENT ,
     PRIMARY KEY (`id`),
    `visualizado` varchar(45)   ,
    `ativo` tinyint   ,
    `momento` datetime   ,
    `usuario_id` INT   ,
    INDEX `pergunta_usuario_fk_usuario_id_idx`(`usuario_id` ASC),
    CONSTRAINT `pergunta_usuario_fk_usuario_id` 
         FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`)
     ON DELETE NO ACTION
     ON UPDATE NO ACTION,
    `perguntas_id` INT   ,
    INDEX `pergunta_usuario_fk_perguntas_id_idx`(`perguntas_id` ASC),
    CONSTRAINT `pergunta_usuario_fk_perguntas_id` 
         FOREIGN KEY (`perguntas_id`) REFERENCES `perguntas` (`id`)
     ON DELETE NO ACTION
     ON UPDATE NO ACTION,
    `momento_visualizado` varchar(45)   ,
    `visibilidade_id` INT   ,
    INDEX `pergunta_usuario_fk_visibilidade_id_idx`(`visibilidade_id` ASC),
    CONSTRAINT `pergunta_usuario_fk_visibilidade_id` 
         FOREIGN KEY (`visibilidade_id`) REFERENCES `visibilidade` (`id`)
     ON DELETE NO ACTION
     ON UPDATE NO ACTION) ENGINE=InnoDB DEFAULT CHARSET=latin1;
        
CREATE TABLE `pergunta_alerta`( 
    `id` int  AUTO_INCREMENT ,
     PRIMARY KEY (`id`),
    `ativo` tinyint   ,
    `momento` datetime   ,
    `usuario_id` INT   ,
    INDEX `pergunta_alerta_fk_usuario_id_idx`(`usuario_id` ASC),
    CONSTRAINT `pergunta_alerta_fk_usuario_id` 
         FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`)
     ON DELETE NO ACTION
     ON UPDATE NO ACTION,
    `perguntas_id` INT   ,
    INDEX `pergunta_alerta_fk_perguntas_id_idx`(`perguntas_id` ASC),
    CONSTRAINT `pergunta_alerta_fk_perguntas_id` 
         FOREIGN KEY (`perguntas_id`) REFERENCES `perguntas` (`id`)
     ON DELETE NO ACTION
     ON UPDATE NO ACTION,
    `retorno` varchar(45)   ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
        
CREATE TABLE `pergunta_excluida`( 
    `id` int  AUTO_INCREMENT ,
     PRIMARY KEY (`id`),
    `ativo` tinyint   ,
    `momento` datetime   ,
    `usuario_id` INT   ,
    INDEX `pergunta_excluida_fk_usuario_id_idx`(`usuario_id` ASC),
    CONSTRAINT `pergunta_excluida_fk_usuario_id` 
         FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`)
     ON DELETE NO ACTION
     ON UPDATE NO ACTION,
    `perguntas_id` INT   ,
    INDEX `pergunta_excluida_fk_perguntas_id_idx`(`perguntas_id` ASC),
    CONSTRAINT `pergunta_excluida_fk_perguntas_id` 
         FOREIGN KEY (`perguntas_id`) REFERENCES `perguntas` (`id`)
     ON DELETE NO ACTION
     ON UPDATE NO ACTION,
    `respostas_id` INT   ,
    INDEX `pergunta_excluida_fk_respostas_id_idx`(`respostas_id` ASC),
    CONSTRAINT `pergunta_excluida_fk_respostas_id` 
         FOREIGN KEY (`respostas_id`) REFERENCES `respostas` (`id`)
     ON DELETE NO ACTION
     ON UPDATE NO ACTION) ENGINE=InnoDB DEFAULT CHARSET=latin1;
        
CREATE TABLE `curtir`( 
    `id` int  AUTO_INCREMENT ,
     PRIMARY KEY (`id`),
    `usuario_id` INT   ,
    INDEX `curtir_fk_usuario_id_idx`(`usuario_id` ASC),
    CONSTRAINT `curtir_fk_usuario_id` 
         FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`)
     ON DELETE NO ACTION
     ON UPDATE NO ACTION,
    `midia_id` INT   ,
    INDEX `curtir_fk_midia_id_idx`(`midia_id` ASC),
    CONSTRAINT `curtir_fk_midia_id` 
         FOREIGN KEY (`midia_id`) REFERENCES `midia` (`id`)
     ON DELETE NO ACTION
     ON UPDATE NO ACTION,
    `hashtag_id` INT   ,
    INDEX `curtir_fk_hashtag_id_idx`(`hashtag_id` ASC),
    CONSTRAINT `curtir_fk_hashtag_id` 
         FOREIGN KEY (`hashtag_id`) REFERENCES `hashtag` (`id`)
     ON DELETE NO ACTION
     ON UPDATE NO ACTION,
    `visibilidade_id` INT   ,
    INDEX `curtir_fk_visibilidade_id_idx`(`visibilidade_id` ASC),
    CONSTRAINT `curtir_fk_visibilidade_id` 
         FOREIGN KEY (`visibilidade_id`) REFERENCES `visibilidade` (`id`)
     ON DELETE NO ACTION
     ON UPDATE NO ACTION,
    `ativo` tinyint   ,
    `momento` datetime   ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
        
CREATE TABLE `midia`( 
    `id` int  AUTO_INCREMENT ,
     PRIMARY KEY (`id`),
    `usuario_id` INT   ,
    INDEX `midia_fk_usuario_id_idx`(`usuario_id` ASC),
    CONSTRAINT `midia_fk_usuario_id` 
         FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`)
     ON DELETE NO ACTION
     ON UPDATE NO ACTION,
    `local_id` INT   ,
    INDEX `midia_fk_local_id_idx`(`local_id` ASC),
    CONSTRAINT `midia_fk_local_id` 
         FOREIGN KEY (`local_id`) REFERENCES `local` (`id`)
     ON DELETE NO ACTION
     ON UPDATE NO ACTION,
    `endereco` varchar(45)   ,
    `ativo` tinyint   ,
    `momento` datetime   ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
        
CREATE TABLE `hashtag`( 
    `id` int  AUTO_INCREMENT ,
     PRIMARY KEY (`id`),
    `titulo` varchar(45)   ,
    `usuario_id` INT   ,
    INDEX `hashtag_fk_usuario_id_idx`(`usuario_id` ASC),
    CONSTRAINT `hashtag_fk_usuario_id` 
         FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`)
     ON DELETE NO ACTION
     ON UPDATE NO ACTION,
    `ativo` tinyint   ,
    `momento` datetime   ,
    `visivel` varchar(45)   ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
        
CREATE TABLE `hashtag_local`( 
    `id` int  AUTO_INCREMENT ,
     PRIMARY KEY (`id`),
    `usuario_id` INT   ,
    INDEX `hashtag_local_fk_usuario_id_idx`(`usuario_id` ASC),
    CONSTRAINT `hashtag_local_fk_usuario_id` 
         FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`)
     ON DELETE NO ACTION
     ON UPDATE NO ACTION,
    `local_id` INT   ,
    INDEX `hashtag_local_fk_local_id_idx`(`local_id` ASC),
    CONSTRAINT `hashtag_local_fk_local_id` 
         FOREIGN KEY (`local_id`) REFERENCES `local` (`id`)
     ON DELETE NO ACTION
     ON UPDATE NO ACTION,
    `hashtag_id` INT   ,
    INDEX `hashtag_local_fk_hashtag_id_idx`(`hashtag_id` ASC),
    CONSTRAINT `hashtag_local_fk_hashtag_id` 
         FOREIGN KEY (`hashtag_id`) REFERENCES `hashtag` (`id`)
     ON DELETE NO ACTION
     ON UPDATE NO ACTION,
    `ativo` tinyint   ,
    `momento` datetime   ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
        
CREATE TABLE `hashtag_categoria`( 
    `id` int  AUTO_INCREMENT ,
     PRIMARY KEY (`id`),
    `categoria_hashtag_id` INT   ,
    INDEX `hashtag_categoria_fk_categoria_hashtag_id_idx`(`categoria_hashtag_id` ASC),
    CONSTRAINT `hashtag_categoria_fk_categoria_hashtag_id` 
         FOREIGN KEY (`categoria_hashtag_id`) REFERENCES `categoria_hashtag` (`id`)
     ON DELETE NO ACTION
     ON UPDATE NO ACTION,
    `hashtag_id` INT   ,
    INDEX `hashtag_categoria_fk_hashtag_id_idx`(`hashtag_id` ASC),
    CONSTRAINT `hashtag_categoria_fk_hashtag_id` 
         FOREIGN KEY (`hashtag_id`) REFERENCES `hashtag` (`id`)
     ON DELETE NO ACTION
     ON UPDATE NO ACTION,
    `ativo` tinyint   ,
    `momento` datetime   ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
        
CREATE TABLE `categoria_hashtag`( 
    `id` int  AUTO_INCREMENT ,
     PRIMARY KEY (`id`),
    `titulo` varchar(45)   ,
    `endereco` varchar(45)   ,
    `ativo` tinyint   ,
    `momento` datetime   ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
        
CREATE TABLE `notificacoes`( 
    `id` int  AUTO_INCREMENT ,
     PRIMARY KEY (`id`),
    `usuario_id` INT   ,
    INDEX `notificacoes_fk_usuario_id_idx`(`usuario_id` ASC),
    CONSTRAINT `notificacoes_fk_usuario_id` 
         FOREIGN KEY (`usuario_id`) REFERENCES `usuario_id` (`id`)
     ON DELETE NO ACTION
     ON UPDATE NO ACTION,
    `usuario_acao_id` INT   ,
    INDEX `notificacoes_fk_usuario_acao_id_idx`(`usuario_acao_id` ASC),
    CONSTRAINT `notificacoes_fk_usuario_acao_id` 
         FOREIGN KEY (`usuario_acao_id`) REFERENCES `usuario_id` (`id`)
     ON DELETE NO ACTION
     ON UPDATE NO ACTION,
    `tipo_id` INT   ,
    INDEX `notificacoes_fk_tipo_id_idx`(`tipo_id` ASC),
    CONSTRAINT `notificacoes_fk_tipo_id` 
         FOREIGN KEY (`tipo_id`) REFERENCES `tipo_notificacoes` (`id`)
     ON DELETE NO ACTION
     ON UPDATE NO ACTION,
    `resposta_id` INT   ,
    INDEX `notificacoes_fk_resposta_id_idx`(`resposta_id` ASC),
    CONSTRAINT `notificacoes_fk_resposta_id` 
         FOREIGN KEY (`resposta_id`) REFERENCES `respostas` (`id`)
     ON DELETE NO ACTION
     ON UPDATE NO ACTION,
    `hashtag_local_id` INT   ,
    INDEX `notificacoes_fk_hashtag_local_id_idx`(`hashtag_local_id` ASC),
    CONSTRAINT `notificacoes_fk_hashtag_local_id` 
         FOREIGN KEY (`hashtag_local_id`) REFERENCES `hashtag_local` (`id`)
     ON DELETE NO ACTION
     ON UPDATE NO ACTION,
    `midia_id` INT   ,
    INDEX `notificacoes_fk_midia_id_idx`(`midia_id` ASC),
    CONSTRAINT `notificacoes_fk_midia_id` 
         FOREIGN KEY (`midia_id`) REFERENCES `midia` (`id`)
     ON DELETE NO ACTION
     ON UPDATE NO ACTION,
    `visualizado` varchar(45)   ,
    `ativo` tinyint   ,
    `momento` datetime   ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
        
CREATE TABLE `tipo_notificacoes`( 
    `id` int  AUTO_INCREMENT ,
     PRIMARY KEY (`id`),
    `nome` varchar(45)   ,
    `ativo` tinyint   ,
    `momento` datetime   ) ENGINE=InnoDB DEFAULT CHARSET=latin1;