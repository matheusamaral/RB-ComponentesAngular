
        
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
    `categoria_local_id` INT   ,
    INDEX `local_fk_categoria_local_id_idx`(`categoria_local_id` ASC),
    CONSTRAINT `local_fk_categoria_local_id` 
         FOREIGN KEY (`categoria_local_id`) REFERENCES `categoria_local` (`id`)
     ON DELETE NO ACTION
     ON UPDATE NO ACTION,
    `ativo` tinyint   ,
    `momento` datetime   ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
        
CREATE TABLE `categoria_local`( 
    `id` int  AUTO_INCREMENT ,
     PRIMARY KEY (`id`),
    `titulo` varchar(45)   ,
    `ativo` tinyint   ,
    `momento` datetime   ,
    `icone_local_id` INT   ,
    INDEX `categoria_local_fk_icone_local_id_idx`(`icone_local_id` ASC),
    CONSTRAINT `categoria_local_fk_icone_local_id` 
         FOREIGN KEY (`icone_local_id`) REFERENCES `icone_local` (`id`)
     ON DELETE NO ACTION
     ON UPDATE NO ACTION) ENGINE=InnoDB DEFAULT CHARSET=latin1;
        
CREATE TABLE `icone_local`( 
    `id` int  AUTO_INCREMENT ,
     PRIMARY KEY (`id`),
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
    `ativo` tinyint   ,
    `momento` datetime   ) ENGINE=InnoDB DEFAULT CHARSET=latin1;