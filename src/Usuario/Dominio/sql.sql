
        
CREATE TABLE `usuario`( 
    `id` int  AUTO_INCREMENT ,
     PRIMARY KEY (`id`),
    `nome` varchar(45)   ,
    `apelido` varchar(45)   ,
    `endereco` varchar(45)   ,
    `nascimento` varchar(45)   ,
    `telefone` varchar(45)   ,
    `tutorial` varchar(45)   ,
    `avatares_id` INT   ,
    INDEX `usuario_fk_avatares_id_idx`(`avatares_id` ASC),
    CONSTRAINT `usuario_fk_avatares_id` 
         FOREIGN KEY (`avatares_id`) REFERENCES `avatares` (`id`)
     ON DELETE NO ACTION
     ON UPDATE NO ACTION,
    `genero_id` INT   ,
    INDEX `usuario_fk_genero_id_idx`(`genero_id` ASC),
    CONSTRAINT `usuario_fk_genero_id` 
         FOREIGN KEY (`genero_id`) REFERENCES `genero` (`id`)
     ON DELETE NO ACTION
     ON UPDATE NO ACTION,
    `ativo` tinyint   ,
    `momento` datetime   ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
        
CREATE TABLE `avatares`( 
    `id` int  AUTO_INCREMENT ,
     PRIMARY KEY (`id`),
    `endereco` varchar(45)   ,
    `ativo` tinyint   ,
    `momento` datetime   ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
        
CREATE TABLE `genero`( 
    `id` int  AUTO_INCREMENT ,
     PRIMARY KEY (`id`),
    `titulo` varchar(45)   ,
    `ativo` tinyint   ,
    `momento` datetime   ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
        
CREATE TABLE `bloqueado`( 
    `id` int  AUTO_INCREMENT ,
     PRIMARY KEY (`id`),
    `ativo` tinyint   ,
    `momento` datetime   ,
    `anonimo` varchar(45)   ,
    `usuario_id` INT   ,
    INDEX `bloqueado_fk_usuario_id_idx`(`usuario_id` ASC),
    CONSTRAINT `bloqueado_fk_usuario_id` 
         FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`)
     ON DELETE NO ACTION
     ON UPDATE NO ACTION,
    `usuario_bloqueado_id` INT   ,
    INDEX `bloqueado_fk_usuario_bloqueado_id_idx`(`usuario_bloqueado_id` ASC),
    CONSTRAINT `bloqueado_fk_usuario_bloqueado_id` 
         FOREIGN KEY (`usuario_bloqueado_id`) REFERENCES `usuario` (`id`)
     ON DELETE NO ACTION
     ON UPDATE NO ACTION) ENGINE=InnoDB DEFAULT CHARSET=latin1;
        
CREATE TABLE `configuracoes`( 
    `id` int  AUTO_INCREMENT ,
     PRIMARY KEY (`id`),
    `ativo` tinyint   ,
    `momento` datetime   ,
    `notificacao_presenca` varchar(45)   ,
    `notificacao_publicacao` varchar(45)   ,
    `padrao_aprovacao` varchar(45)   ,
    `contato` varchar(45)   ,
    `usuario_id` INT   ,
    INDEX `configuracoes_fk_usuario_id_idx`(`usuario_id` ASC),
    CONSTRAINT `configuracoes_fk_usuario_id` 
         FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`)
     ON DELETE NO ACTION
     ON UPDATE NO ACTION,
    `visibilidade_id` INT   ,
    INDEX `configuracoes_fk_visibilidade_id_idx`(`visibilidade_id` ASC),
    CONSTRAINT `configuracoes_fk_visibilidade_id` 
         FOREIGN KEY (`visibilidade_id`) REFERENCES `visibilidade` (`id`)
     ON DELETE NO ACTION
     ON UPDATE NO ACTION,
    `visto_ultimo_id` INT   ,
    INDEX `configuracoes_fk_visto_ultimo_id_idx`(`visto_ultimo_id` ASC),
    CONSTRAINT `configuracoes_fk_visto_ultimo_id` 
         FOREIGN KEY (`visto_ultimo_id`) REFERENCES `visibilidade` (`id`)
     ON DELETE NO ACTION
     ON UPDATE NO ACTION) ENGINE=InnoDB DEFAULT CHARSET=latin1;
        
CREATE TABLE `visibilidade`( 
    `id` int  AUTO_INCREMENT ,
     PRIMARY KEY (`id`),
    `titulo` varchar(45)   ,
    `ativo` tinyint   ,
    `momento` datetime   ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
        
CREATE TABLE `seguir`( 
    `id` int  AUTO_INCREMENT ,
     PRIMARY KEY (`id`),
    `ativo` tinyint   ,
    `momento` datetime   ,
    `confirmar_seguir` varchar(45)   ,
    `momento_confirmar_seguir` varchar(45)   ,
    `usuario_id` INT   ,
    INDEX `seguir_fk_usuario_id_idx`(`usuario_id` ASC),
    CONSTRAINT `seguir_fk_usuario_id` 
         FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`)
     ON DELETE NO ACTION
     ON UPDATE NO ACTION,
    `usuario_seguir_id` INT   ,
    INDEX `seguir_fk_usuario_seguir_id_idx`(`usuario_seguir_id` ASC),
    CONSTRAINT `seguir_fk_usuario_seguir_id` 
         FOREIGN KEY (`usuario_seguir_id`) REFERENCES `usuario` (`id`)
     ON DELETE NO ACTION
     ON UPDATE NO ACTION) ENGINE=InnoDB DEFAULT CHARSET=latin1;
        
CREATE TABLE `status_mensagem`( 
    `id` int  AUTO_INCREMENT ,
     PRIMARY KEY (`id`),
    `titulo` varchar(45)   ,
    `ativo` tinyint   ,
    `momento` datetime   ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
        
CREATE TABLE `mensagens`( 
    `id` int  AUTO_INCREMENT ,
     PRIMARY KEY (`id`),
    `titulo` tinyint   ,
    `ativo` tinyint   ,
    `momento` datetime   ,
    `momento_visualizado` varchar(45)   ,
    `endereco` varchar(45)   ,
    `usuario_id` INT   ,
    INDEX `mensagens_fk_usuario_id_idx`(`usuario_id` ASC),
    CONSTRAINT `mensagens_fk_usuario_id` 
         FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`)
     ON DELETE NO ACTION
     ON UPDATE NO ACTION,
    `usuario_mensagem_id` INT   ,
    INDEX `mensagens_fk_usuario_mensagem_id_idx`(`usuario_mensagem_id` ASC),
    CONSTRAINT `mensagens_fk_usuario_mensagem_id` 
         FOREIGN KEY (`usuario_mensagem_id`) REFERENCES `usuario` (`id`)
     ON DELETE NO ACTION
     ON UPDATE NO ACTION,
    `status_mensagem_id` INT   ,
    INDEX `mensagens_fk_status_mensagem_id_idx`(`status_mensagem_id` ASC),
    CONSTRAINT `mensagens_fk_status_mensagem_id` 
         FOREIGN KEY (`status_mensagem_id`) REFERENCES `status_mensagem` (`id`)
     ON DELETE NO ACTION
     ON UPDATE NO ACTION) ENGINE=InnoDB DEFAULT CHARSET=latin1;