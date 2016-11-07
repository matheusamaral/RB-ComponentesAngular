
        
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
    `ativo` tinyint   ,
    `momento` datetime   ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
        
CREATE TABLE `respostas`( 
    `id` int  AUTO_INCREMENT ,
     PRIMARY KEY (`id`),
    `titulo` varchar(45)   ,
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
    `momento_visualizado` varchar(45)   ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
        
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
    `momento` datetime   ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
        
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
    `icone_hashtag_id` INT   ,
    INDEX `categoria_hashtag_fk_icone_hashtag_id_idx`(`icone_hashtag_id` ASC),
    CONSTRAINT `categoria_hashtag_fk_icone_hashtag_id` 
         FOREIGN KEY (`icone_hashtag_id`) REFERENCES `icone_hashtag` (`id`)
     ON DELETE NO ACTION
     ON UPDATE NO ACTION,
    `ativo` tinyint   ,
    `momento` datetime   ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
        
CREATE TABLE `icone_hashtag`( 
    `id` int  AUTO_INCREMENT ,
     PRIMARY KEY (`id`),
    `endereco` varchar(45)   ,
    `ativo` tinyint   ,
    `momento` datetime   ) ENGINE=InnoDB DEFAULT CHARSET=latin1;