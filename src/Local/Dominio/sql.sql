
        
CREATE TABLE `local`( 
    `id` int  AUTO_INCREMENT ,
     PRIMARY KEY (`id`),
    `latitude` varchar(45)   ,
    `longitude` varchar(45)   ,
    `titulo` varchar(45)   ,
    `usuario_id` INT   ,
    INDEX `local_fk_usuario_id_idx`(`usuario_id` ASC),
    CONSTRAINT `local_fk_usuario_id` 
         FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`)
     ON DELETE NO ACTION
     ON UPDATE NO ACTION,
    `ativo` tinyint   ,
    `momento` datetime   ,
    `endereco` varchar(45)   ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
        
CREATE TABLE `categoria_local`( 
    `id` int  AUTO_INCREMENT ,
     PRIMARY KEY (`id`),
    `titulo` varchar(45)   ,
    `endereco` varchar(45)   ,
    `ativo` tinyint   ,
    `momento` datetime   ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
        
CREATE TABLE `local_categoria`( 
    `id` int  AUTO_INCREMENT ,
     PRIMARY KEY (`id`),
    `local_id` INT   ,
    INDEX `local_categoria_fk_local_id_idx`(`local_id` ASC),
    CONSTRAINT `local_categoria_fk_local_id` 
         FOREIGN KEY (`local_id`) REFERENCES `local` (`id`)
     ON DELETE NO ACTION
     ON UPDATE NO ACTION,
    `categoria_id` INT   ,
    INDEX `local_categoria_fk_categoria_id_idx`(`categoria_id` ASC),
    CONSTRAINT `local_categoria_fk_categoria_id` 
         FOREIGN KEY (`categoria_id`) REFERENCES `categoria_local` (`id`)
     ON DELETE NO ACTION
     ON UPDATE NO ACTION,
    `endereco` varchar(45)   ,
    `ativo` tinyint   ,
    `momento` datetime   ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
        
CREATE TABLE `check_in`( 
    `id` int  AUTO_INCREMENT ,
     PRIMARY KEY (`id`),
    `usuario_id` INT   ,
    INDEX `check_in_fk_usuario_id_idx`(`usuario_id` ASC),
    CONSTRAINT `check_in_fk_usuario_id` 
         FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`)
     ON DELETE NO ACTION
     ON UPDATE NO ACTION,
    `local_id` INT   ,
    INDEX `check_in_fk_local_id_idx`(`local_id` ASC),
    CONSTRAINT `check_in_fk_local_id` 
         FOREIGN KEY (`local_id`) REFERENCES `local` (`id`)
     ON DELETE NO ACTION
     ON UPDATE NO ACTION,
    `visibilidade_id` INT   ,
    INDEX `check_in_fk_visibilidade_id_idx`(`visibilidade_id` ASC),
    CONSTRAINT `check_in_fk_visibilidade_id` 
         FOREIGN KEY (`visibilidade_id`) REFERENCES `visibilidade` (`id`)
     ON DELETE NO ACTION
     ON UPDATE NO ACTION,
    `presente` varchar(45)   ,
    `ativo` tinyint   ,
    `momento` datetime   ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
        
CREATE TABLE `configuracoes_quickpeek`( 
    `id` int  AUTO_INCREMENT ,
     PRIMARY KEY (`id`),
    `tempo_hashtag` varchar(45)   ,
    `ativo` tinyint   ,
    `momento` datetime   ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
        
CREATE TABLE `local_google`( 
    `id` int  AUTO_INCREMENT ,
     PRIMARY KEY (`id`),
    `place_id` varchar(45)   ,
    `local_id` INT   ,
    INDEX `local_google_fk_local_id_idx`(`local_id` ASC),
    CONSTRAINT `local_google_fk_local_id` 
         FOREIGN KEY (`local_id`) REFERENCES `local` (`id`)
     ON DELETE NO ACTION
     ON UPDATE NO ACTION,
    `ativo` tinyint   ,
    `momento` datetime   ) ENGINE=InnoDB DEFAULT CHARSET=latin1;