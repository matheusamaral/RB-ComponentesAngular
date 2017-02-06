
        
CREATE TABLE `usuario`( 
    `id` int  AUTO_INCREMENT ,
     PRIMARY KEY (`id`),
    `nome` varchar(45)   ,
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
    `sms_codigo_id` INT   ,
    INDEX `usuario_fk_sms_codigo_id_idx`(`sms_codigo_id` ASC),
    CONSTRAINT `usuario_fk_sms_codigo_id` 
         FOREIGN KEY (`sms_codigo_id`) REFERENCES `sms_codigo` (`id`)
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
    `visibilidade_id` INT   ,
    INDEX `bloqueado_fk_visibilidade_id_idx`(`visibilidade_id` ASC),
    CONSTRAINT `bloqueado_fk_visibilidade_id` 
         FOREIGN KEY (`visibilidade_id`) REFERENCES `visibilidade_mensagens` (`id`)
     ON DELETE NO ACTION
     ON UPDATE NO ACTION,
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
    `notificacao_publicacao` varchar(45)   ,
    `conta_privada` varchar(45)   ,
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
     ON UPDATE NO ACTION) ENGINE=InnoDB DEFAULT CHARSET=latin1;
        
CREATE TABLE `visibilidade`( 
    `id` int  AUTO_INCREMENT ,
     PRIMARY KEY (`id`),
    `titulo` varchar(45)   ,
    `ativo` tinyint   ,
    `momento` datetime   ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
        
CREATE TABLE `visibilidade_mensagens`( 
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
    `titulo` varchar(45)   ,
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
     ON UPDATE NO ACTION,
    `visibilidade_mensagens_id` INT   ,
    INDEX `mensagens_fk_visibilidade_mensagens_id_idx`(`visibilidade_mensagens_id` ASC),
    CONSTRAINT `mensagens_fk_visibilidade_mensagens_id` 
         FOREIGN KEY (`visibilidade_mensagens_id`) REFERENCES `visibilidade_mensagens` (`id`)
     ON DELETE NO ACTION
     ON UPDATE NO ACTION,
    `visibilidade_usuario_id` INT   ,
    INDEX `mensagens_fk_visibilidade_usuario_id_idx`(`visibilidade_usuario_id` ASC),
    CONSTRAINT `mensagens_fk_visibilidade_usuario_id` 
         FOREIGN KEY (`visibilidade_usuario_id`) REFERENCES `visibilidade_mensagens` (`id`)
     ON DELETE NO ACTION
     ON UPDATE NO ACTION,
    `visualizado` varchar(45)   ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
        
CREATE TABLE `mensagens_excluidas`( 
    `id` int  AUTO_INCREMENT ,
     PRIMARY KEY (`id`),
    `ativo` tinyint   ,
    `momento` datetime   ,
    `usuario_id` INT   ,
    INDEX `mensagens_excluidas_fk_usuario_id_idx`(`usuario_id` ASC),
    CONSTRAINT `mensagens_excluidas_fk_usuario_id` 
         FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`)
     ON DELETE NO ACTION
     ON UPDATE NO ACTION,
    `mensagens_id` INT   ,
    INDEX `mensagens_excluidas_fk_mensagens_id_idx`(`mensagens_id` ASC),
    CONSTRAINT `mensagens_excluidas_fk_mensagens_id` 
         FOREIGN KEY (`mensagens_id`) REFERENCES `mensagens` (`id`)
     ON DELETE NO ACTION
     ON UPDATE NO ACTION) ENGINE=InnoDB DEFAULT CHARSET=latin1;
        
CREATE TABLE `sms_codigo`( 
    `id` int  AUTO_INCREMENT ,
     PRIMARY KEY (`id`),
    `ativo` tinyint   ,
    `momento` datetime   ,
    `codigo` varchar(45)   ,
    `telefone` varchar(45)   ,
    `confirmado` varchar(45)   ,
    `editando` varchar(45)   ,
    `status_sms_id` INT   ,
    INDEX `sms_codigo_fk_status_sms_id_idx`(`status_sms_id` ASC),
    CONSTRAINT `sms_codigo_fk_status_sms_id` 
         FOREIGN KEY (`status_sms_id`) REFERENCES `status_sms` (`id`)
     ON DELETE NO ACTION
     ON UPDATE NO ACTION,
    `usuario_id` INT   ,
    INDEX `sms_codigo_fk_usuario_id_idx`(`usuario_id` ASC),
    CONSTRAINT `sms_codigo_fk_usuario_id` 
         FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`)
     ON DELETE NO ACTION
     ON UPDATE NO ACTION) ENGINE=InnoDB DEFAULT CHARSET=latin1;
        
CREATE TABLE `status_sms`( 
    `id` int  AUTO_INCREMENT ,
     PRIMARY KEY (`id`),
    `ativo` tinyint   ,
    `momento` datetime   ,
    `codigo_mobi` varchar(45)   ,
    `titulo` varchar(45)   ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
        
CREATE TABLE `ddi_paises`( 
    `id` int  AUTO_INCREMENT ,
     PRIMARY KEY (`id`),
    `ddi` varchar(45)   ,
    `nome` varchar(45)   ,
    `cobertura` varchar(45)   ,
    `ativo` tinyint   ,
    `momento` datetime   ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
        
CREATE TABLE `lista_contatos`( 
    `id` int  AUTO_INCREMENT ,
     PRIMARY KEY (`id`),
    `nome` varchar(45)   ,
    `telefone` varchar(45)   ,
    `usuario_id` INT   ,
    INDEX `lista_contatos_fk_usuario_id_idx`(`usuario_id` ASC),
    CONSTRAINT `lista_contatos_fk_usuario_id` 
         FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`)
     ON DELETE NO ACTION
     ON UPDATE NO ACTION,
    `ativo` tinyint   ,
    `momento` datetime   ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
        
CREATE TABLE `casa_trabalho`( 
    `id` int  AUTO_INCREMENT ,
     PRIMARY KEY (`id`),
    `latitude_casa` varchar(45)   ,
    `longitude_casa` varchar(45)   ,
    `latitude_trabalho` varchar(45)   ,
    `longitude_trabalho` varchar(45)   ,
    `casa` varchar(45)   ,
    `trabalho` varchar(45)   ,
    `usuario_id` INT   ,
    INDEX `casa_trabalho_fk_usuario_id_idx`(`usuario_id` ASC),
    CONSTRAINT `casa_trabalho_fk_usuario_id` 
         FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`)
     ON DELETE NO ACTION
     ON UPDATE NO ACTION,
    `ativo` tinyint   ,
    `momento` datetime   ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
        
CREATE TABLE `usuario_onesignal`( 
    `id` int  AUTO_INCREMENT ,
     PRIMARY KEY (`id`),
    `usuario_id` INT   ,
    INDEX `usuario_onesignal_fk_usuario_id_idx`(`usuario_id` ASC),
    CONSTRAINT `usuario_onesignal_fk_usuario_id` 
         FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`)
     ON DELETE NO ACTION
     ON UPDATE NO ACTION,
    `player_id` varchar(45)   ,
    `ativo` tinyint   ,
    `momento` datetime   ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
        
CREATE TABLE `alertas`( 
    `id` int  AUTO_INCREMENT ,
     PRIMARY KEY (`id`),
    `usuario_id` INT   ,
    INDEX `alertas_fk_usuario_id_idx`(`usuario_id` ASC),
    CONSTRAINT `alertas_fk_usuario_id` 
         FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`)
     ON DELETE NO ACTION
     ON UPDATE NO ACTION,
    `perguntas_id` INT   ,
    INDEX `alertas_fk_perguntas_id_idx`(`perguntas_id` ASC),
    CONSTRAINT `alertas_fk_perguntas_id` 
         FOREIGN KEY (`perguntas_id`) REFERENCES `perguntas` (`id`)
     ON DELETE NO ACTION
     ON UPDATE NO ACTION,
    `notificacoes_id` INT   ,
    INDEX `alertas_fk_notificacoes_id_idx`(`notificacoes_id` ASC),
    CONSTRAINT `alertas_fk_notificacoes_id` 
         FOREIGN KEY (`notificacoes_id`) REFERENCES `notificacoes` (`id`)
     ON DELETE NO ACTION
     ON UPDATE NO ACTION,
    `mensagens_id` INT   ,
    INDEX `alertas_fk_mensagens_id_idx`(`mensagens_id` ASC),
    CONSTRAINT `alertas_fk_mensagens_id` 
         FOREIGN KEY (`mensagens_id`) REFERENCES `mensagens` (`id`)
     ON DELETE NO ACTION
     ON UPDATE NO ACTION,
    `local_id` INT   ,
    INDEX `alertas_fk_local_id_idx`(`local_id` ASC),
    CONSTRAINT `alertas_fk_local_id` 
         FOREIGN KEY (`local_id`) REFERENCES `local` (`id`)
     ON DELETE NO ACTION
     ON UPDATE NO ACTION,
    `tipo_id` INT   ,
    INDEX `alertas_fk_tipo_id_idx`(`tipo_id` ASC),
    CONSTRAINT `alertas_fk_tipo_id` 
         FOREIGN KEY (`tipo_id`) REFERENCES `tipo_alertas` (`id`)
     ON DELETE NO ACTION
     ON UPDATE NO ACTION,
    `response` varchar(45)   ,
    `ativo` tinyint   ,
    `momento` datetime   ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
        
CREATE TABLE `tipo_alertas`( 
    `id` int  AUTO_INCREMENT ,
     PRIMARY KEY (`id`),
    `nome` varchar(45)   ,
    `ativo` tinyint   ,
    `momento` datetime   ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
        
CREATE TABLE `usuario_online`( 
    `id` int  AUTO_INCREMENT ,
     PRIMARY KEY (`id`),
    `usuario_id` INT   ,
    INDEX `usuario_online_fk_usuario_id_idx`(`usuario_id` ASC),
    CONSTRAINT `usuario_online_fk_usuario_id` 
         FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`)
     ON DELETE NO ACTION
     ON UPDATE NO ACTION,
    `momento` datetime   ,
    `ativo` tinyint   ) ENGINE=InnoDB DEFAULT CHARSET=latin1;