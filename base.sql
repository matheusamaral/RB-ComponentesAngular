CREATE DATABASE  IF NOT EXISTS `quickpeek` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `quickpeek`;
-- MySQL dump 10.13  Distrib 5.5.47, for debian-linux-gnu (x86_64)
--
-- Host: 127.0.0.2    Database: quickpeek
-- ------------------------------------------------------
-- Server version	5.7.11

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `avatares`
--

DROP TABLE IF EXISTS `avatares`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `avatares` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) DEFAULT NULL,
  `endereco` varchar(255) DEFAULT NULL,
  `momento` datetime DEFAULT NULL,
  `ativo` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `avatares`
--

LOCK TABLES `avatares` WRITE;
/*!40000 ALTER TABLE `avatares` DISABLE KEYS */;
INSERT INTO `avatares` VALUES (1,'avatar1','endereco/endereco','2000-01-01 00:00:00',1),(2,'teste2','endereco/endereco','2000-01-01 00:00:00',1);
/*!40000 ALTER TABLE `avatares` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bloqueado`
--

DROP TABLE IF EXISTS `bloqueado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bloqueado` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `momento` datetime DEFAULT NULL,
  `ativo` tinyint(4) DEFAULT NULL,
  `anonimo` tinyint(4) DEFAULT NULL,
  `usuario_id` int(11) NOT NULL,
  `usuario_bloqueado_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_bloqueado_usuario1_idx` (`usuario_id`),
  KEY `fk_bloqueado_usuario2_idx` (`usuario_bloqueado_id`),
  CONSTRAINT `fk_bloqueado_usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_bloqueado_usuario2` FOREIGN KEY (`usuario_bloqueado_id`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bloqueado`
--

LOCK TABLES `bloqueado` WRITE;
/*!40000 ALTER TABLE `bloqueado` DISABLE KEYS */;
INSERT INTO `bloqueado` VALUES (1,'2016-11-09 14:32:55',1,0,3,1),(2,'2016-11-09 14:33:12',1,1,3,1),(3,'2016-11-09 14:37:27',1,1,3,1);
/*!40000 ALTER TABLE `bloqueado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categoria_hashtag`
--

DROP TABLE IF EXISTS `categoria_hashtag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categoria_hashtag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(45) DEFAULT NULL,
  `momento` datetime DEFAULT NULL,
  `ativo` tinyint(4) DEFAULT NULL,
  `endereco` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_categoria_hashtag_icone_hashtag1_idx` (`endereco`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria_hashtag`
--

LOCK TABLES `categoria_hashtag` WRITE;
/*!40000 ALTER TABLE `categoria_hashtag` DISABLE KEYS */;
INSERT INTO `categoria_hashtag` VALUES (1,'Promoção','2000-01-01 10:10:10',1,'um'),(2,'Atendimento','2016-12-06 13:41:10',1,''),(3,'Atração Musical','2016-12-06 13:41:10',1,'tres'),(4,'Público & Movimento','2016-12-06 13:41:10',1,''),(5,'Perigo','2016-12-06 13:41:10',1,''),(6,'Sentimento & Clima','2016-12-06 13:41:10',1,''),(7,'Contratempo','2016-12-06 13:41:10',1,''),(8,'Fila','2016-12-06 13:41:10',1,''),(9,'Estacionamento','2016-12-06 13:41:10',1,'');
/*!40000 ALTER TABLE `categoria_hashtag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categoria_local`
--

DROP TABLE IF EXISTS `categoria_local`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categoria_local` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(45) DEFAULT NULL,
  `momento` datetime DEFAULT NULL,
  `ativo` tinyint(4) DEFAULT NULL,
  `endereco` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_categoria_local_icone_local1_idx` (`endereco`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria_local`
--

LOCK TABLES `categoria_local` WRITE;
/*!40000 ALTER TABLE `categoria_local` DISABLE KEYS */;
INSERT INTO `categoria_local` VALUES (1,'Bancos e Lotéricas','2016-12-05 19:01:02',1,NULL),(2,'Bares','2016-12-05 19:01:02',1,NULL),(3,'Cafés','2016-12-05 19:01:02',1,NULL),(4,'Restaurantes','2016-12-05 19:01:02',1,NULL),(5,'Pizzarias','2016-12-05 19:01:02',1,NULL),(6,'Churrascarias','2016-12-05 19:01:02',1,NULL),(7,'Pubs','2016-12-05 19:01:02',1,NULL),(8,'Shopping Centers','2016-12-05 19:01:02',1,NULL),(9,'Casas Noturnas','2016-12-05 19:01:02',1,NULL),(10,'Teatros','2016-12-05 19:01:02',1,NULL),(11,'Lojas','2016-12-05 19:01:02',1,NULL),(12,'Padarias','2016-12-05 19:01:02',1,NULL),(13,'Laboratórios','2016-12-05 19:01:02',1,NULL),(14,'Hospitais e Postos de Saúdes','2016-12-05 19:01:02',1,NULL),(15,'Instituições e Serviços Públicos','2016-12-05 19:01:02',1,NULL),(16,'Outros','2016-12-05 19:01:02',1,NULL);
/*!40000 ALTER TABLE `categoria_local` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `check_in`
--

DROP TABLE IF EXISTS `check_in`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `check_in` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `momento` datetime DEFAULT NULL,
  `ativo` tinyint(4) DEFAULT NULL,
  `presente` tinyint(4) NOT NULL DEFAULT '1',
  `usuario_id` int(11) NOT NULL,
  `local_id` int(11) NOT NULL,
  `visibilidade_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_check_in_usuario1_idx` (`usuario_id`),
  KEY `fk_check_in_local1_idx` (`local_id`),
  KEY `fk_check_in_visibilidade1_idx` (`visibilidade_id`),
  CONSTRAINT `fk_check_in_local1` FOREIGN KEY (`local_id`) REFERENCES `local` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_check_in_usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_check_in_visibilidade1` FOREIGN KEY (`visibilidade_id`) REFERENCES `visibilidade` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `check_in`
--

LOCK TABLES `check_in` WRITE;
/*!40000 ALTER TABLE `check_in` DISABLE KEYS */;
INSERT INTO `check_in` VALUES (1,'2016-11-14 17:47:04',1,1,7,1,1),(2,'2016-11-14 17:48:53',1,1,5,1,2),(3,'2016-11-16 14:39:02',1,1,6,1,1),(4,'2016-11-16 15:24:54',1,0,4,1,3),(5,'2016-11-17 13:27:25',1,1,3,2,1),(6,'2016-11-17 14:39:07',1,1,2,2,1),(7,'2016-11-17 14:40:38',1,0,1,2,2),(8,'2016-11-22 13:20:26',1,1,4,2,1),(9,'2016-11-23 17:17:09',1,0,1,2,2),(10,'2016-11-23 17:17:10',1,0,1,1,2),(11,'2016-11-23 17:18:02',1,0,1,3,3),(13,'2016-11-23 17:18:08',1,0,1,1,3),(14,'2016-12-06 13:15:21',1,0,1,2,3),(15,'2016-12-06 13:15:45',1,1,1,1,3);
/*!40000 ALTER TABLE `check_in` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `configuracoes`
--

DROP TABLE IF EXISTS `configuracoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `configuracoes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `momento` datetime DEFAULT NULL,
  `ativo` tinyint(4) DEFAULT NULL,
  `usuario_id` int(11) NOT NULL,
  `visibilidade_id` int(11) NOT NULL DEFAULT '1',
  `notificacao_presenca` tinyint(4) DEFAULT '1',
  `notificacao_publicacao` tinyint(4) DEFAULT '1',
  `padrao_aprovacao` tinyint(4) DEFAULT '1',
  `contato` tinyint(4) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `fk_configuracoes_usuario1_idx` (`usuario_id`),
  KEY `fk_configuracoes_visibilidade1_idx` (`visibilidade_id`),
  CONSTRAINT `fk_configuracoes_usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_configuracoes_visibilidade1` FOREIGN KEY (`visibilidade_id`) REFERENCES `visibilidade` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `configuracoes`
--

LOCK TABLES `configuracoes` WRITE;
/*!40000 ALTER TABLE `configuracoes` DISABLE KEYS */;
INSERT INTO `configuracoes` VALUES (1,'2016-11-28 17:41:55',1,1,3,0,0,0,0),(2,'2016-11-08 16:09:07',1,2,1,1,1,0,1),(3,'2016-11-09 13:38:01',1,3,1,1,1,1,1),(6,'2016-11-09 15:37:33',1,4,1,1,1,1,1),(7,'2016-11-09 16:16:23',1,5,1,1,1,1,1),(8,'2016-11-09 16:39:24',1,6,1,1,1,1,1),(9,'2016-11-09 17:11:19',1,7,1,1,1,1,1),(10,'2016-11-09 17:18:25',1,7,1,1,1,1,1),(11,'2016-11-09 17:18:39',1,7,1,1,1,1,0),(13,'2016-11-10 13:24:48',1,8,3,0,0,0,0),(15,'2016-11-10 17:29:42',1,9,1,1,1,1,1),(16,'2016-11-11 13:00:20',1,10,1,1,1,1,1),(17,'2016-11-11 16:11:55',1,11,1,1,1,1,1),(18,'2016-11-11 17:36:17',1,12,1,1,1,1,1),(19,'2016-11-14 13:35:54',1,13,1,1,1,1,1),(20,'2016-11-21 16:50:13',1,14,1,1,1,1,1),(21,'2016-11-25 16:23:04',1,15,1,1,1,1,1),(22,'2016-11-28 15:18:11',1,16,1,1,1,1,1),(23,'2016-11-28 15:18:27',1,17,1,1,1,1,1),(25,'2016-11-28 16:35:21',1,19,1,1,1,1,1),(26,'2016-11-29 16:12:46',1,20,1,1,1,1,1),(27,'2016-11-29 16:25:47',1,21,1,1,1,1,1),(28,'2016-11-29 16:29:00',1,22,1,1,1,1,1),(29,'2016-12-01 16:31:22',1,23,1,1,1,1,1),(30,'2016-12-02 18:06:20',1,24,1,1,1,1,1),(31,'2016-12-02 18:12:14',1,26,1,1,1,1,1),(32,'2016-12-02 18:13:54',1,27,1,1,1,1,1),(33,'2016-12-02 18:15:28',1,28,1,1,1,1,1),(34,'2016-12-02 18:18:06',1,29,1,1,1,1,1),(35,'2016-12-02 18:19:22',1,30,1,1,1,1,1),(36,'2016-12-05 13:08:01',1,31,1,1,1,1,1),(37,'2016-12-05 13:09:13',1,32,1,1,1,1,1),(38,'2016-12-05 13:10:44',1,33,1,1,1,1,1),(39,'2016-12-05 13:14:45',1,34,1,1,1,1,1);
/*!40000 ALTER TABLE `configuracoes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `configuracoes_quickpeek`
--

DROP TABLE IF EXISTS `configuracoes_quickpeek`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `configuracoes_quickpeek` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(45) DEFAULT NULL,
  `tempo` varchar(45) DEFAULT NULL,
  `ativo` tinyint(4) DEFAULT NULL,
  `momento` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `configuracoes_quickpeek`
--

LOCK TABLES `configuracoes_quickpeek` WRITE;
/*!40000 ALTER TABLE `configuracoes_quickpeek` DISABLE KEYS */;
INSERT INTO `configuracoes_quickpeek` VALUES (1,'hashtag','1000',1,'2000-01-01 10:10:10'),(2,'midia','1000',1,'2000-01-01 10:10:10'),(3,'perguntas','1000',1,'2000-01-01 10:10:10'),(4,'respostas','1000',1,'2000-01-01 10:10:10'),(5,'limitePerguntas','24',1,'2000-01-01 10:10:10'),(6,'sms','10000',1,'2000-01-01 10:10:10');
/*!40000 ALTER TABLE `configuracoes_quickpeek` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `curtir`
--

DROP TABLE IF EXISTS `curtir`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `curtir` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `momento` datetime DEFAULT NULL,
  `ativo` tinyint(4) DEFAULT NULL,
  `usuario_id` int(11) NOT NULL,
  `midia_id` int(11) NOT NULL,
  `visibilidade_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_curtir_usuario1_idx` (`usuario_id`),
  KEY `fk_curtir_midia1_idx` (`midia_id`),
  KEY `fk_curtir_1_idx` (`visibilidade_id`),
  CONSTRAINT `fk_curtir_1` FOREIGN KEY (`visibilidade_id`) REFERENCES `visibilidade` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_curtir_midia1` FOREIGN KEY (`midia_id`) REFERENCES `midia` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_curtir_usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `curtir`
--

LOCK TABLES `curtir` WRITE;
/*!40000 ALTER TABLE `curtir` DISABLE KEYS */;
INSERT INTO `curtir` VALUES (4,'2016-11-24 15:23:54',1,3,1,1),(5,'2016-11-24 15:26:04',1,3,2,2),(6,'2016-11-24 15:26:31',1,1,2,3),(7,'2016-11-29 16:31:42',1,22,2,1),(12,'2016-12-06 16:39:23',1,2,4,1);
/*!40000 ALTER TABLE `curtir` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genero`
--

DROP TABLE IF EXISTS `genero`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `genero` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(45) DEFAULT NULL,
  `momento` datetime DEFAULT NULL,
  `ativo` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genero`
--

LOCK TABLES `genero` WRITE;
/*!40000 ALTER TABLE `genero` DISABLE KEYS */;
INSERT INTO `genero` VALUES (1,'Masculino','2016-07-11 15:38:00',1),(2,'Feminino','2016-07-11 15:38:00',1);
/*!40000 ALTER TABLE `genero` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hashtag`
--

DROP TABLE IF EXISTS `hashtag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hashtag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) DEFAULT NULL,
  `momento` datetime DEFAULT NULL,
  `ativo` tinyint(4) DEFAULT NULL,
  `usuario_id` int(11) NOT NULL,
  `visivel` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_hashtag_usuario1_idx` (`usuario_id`),
  CONSTRAINT `fk_hashtag_usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hashtag`
--

LOCK TABLES `hashtag` WRITE;
/*!40000 ALTER TABLE `hashtag` DISABLE KEYS */;
INSERT INTO `hashtag` VALUES (1,'nova3','2016-11-18 15:38:13',1,1,1),(2,'nova2','2016-11-18 15:38:13',1,1,1),(3,'nova6','2016-11-18 15:39:11',1,1,0),(4,'nova8','2016-11-18 15:39:34',1,1,0),(5,'ola tuod bem','2016-12-06 13:15:29',1,1,0),(6,'fodase','2016-12-06 13:15:29',1,1,0);
/*!40000 ALTER TABLE `hashtag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hashtag_categoria`
--

DROP TABLE IF EXISTS `hashtag_categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hashtag_categoria` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `momento` datetime DEFAULT NULL,
  `ativo` tinyint(4) DEFAULT NULL,
  `categoria_hashtag_id` int(11) NOT NULL,
  `hashtag_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_hashtag_categoria_categoria_hashtag1_idx` (`categoria_hashtag_id`),
  KEY `fk_hashtag_categoria_hashtag1_idx` (`hashtag_id`),
  CONSTRAINT `fk_hashtag_categoria_categoria_hashtag1` FOREIGN KEY (`categoria_hashtag_id`) REFERENCES `categoria_hashtag` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_hashtag_categoria_hashtag1` FOREIGN KEY (`hashtag_id`) REFERENCES `hashtag` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hashtag_categoria`
--

LOCK TABLES `hashtag_categoria` WRITE;
/*!40000 ALTER TABLE `hashtag_categoria` DISABLE KEYS */;
INSERT INTO `hashtag_categoria` VALUES (1,'2016-11-18 15:38:13',1,1,1),(2,'2016-11-18 15:38:13',1,2,2),(3,'2016-11-18 15:38:41',1,3,1),(4,'2016-11-18 15:38:41',1,4,2),(5,'2016-11-18 15:38:58',1,3,1),(6,'2016-11-18 15:39:11',1,3,3),(7,'2016-11-18 15:39:34',1,3,4),(8,'2016-11-18 15:39:34',1,4,1),(9,'2016-12-06 13:15:29',1,1,5),(10,'2016-12-06 13:15:29',1,2,6),(27,'2016-12-06 13:17:22',1,1,5),(28,'2016-12-06 13:17:22',1,2,6),(29,'2016-12-06 13:17:22',1,3,5),(30,'2016-12-06 13:17:22',1,4,6),(31,'2016-12-06 13:17:22',1,3,5),(32,'2016-12-06 13:17:22',1,1,6),(33,'2016-12-06 13:17:22',1,1,5),(34,'2016-12-06 13:17:22',1,1,6),(35,'2016-12-06 13:17:47',1,1,5);
/*!40000 ALTER TABLE `hashtag_categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hashtag_local`
--

DROP TABLE IF EXISTS `hashtag_local`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hashtag_local` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario_id` int(11) NOT NULL,
  `hashtag_id` int(11) NOT NULL,
  `local_id` int(11) NOT NULL,
  `momento` datetime DEFAULT NULL,
  `ativo` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_hashtag_local_hashtag1_idx` (`hashtag_id`),
  KEY `fk_hashtag_local_local1_idx` (`local_id`),
  KEY `fk_hashtag_local_usuario1_idx` (`usuario_id`),
  CONSTRAINT `fk_hashtag_local_hashtag1` FOREIGN KEY (`hashtag_id`) REFERENCES `hashtag` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_hashtag_local_local1` FOREIGN KEY (`local_id`) REFERENCES `local` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_hashtag_local_usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hashtag_local`
--

LOCK TABLES `hashtag_local` WRITE;
/*!40000 ALTER TABLE `hashtag_local` DISABLE KEYS */;
INSERT INTO `hashtag_local` VALUES (1,1,1,2,'2016-11-18 15:38:13',1),(2,3,2,2,'2016-11-18 15:38:13',1),(3,2,1,2,'2016-11-18 15:38:41',1),(4,4,2,2,'2016-11-18 15:38:41',1),(5,5,1,2,'2016-11-18 15:38:58',1),(6,1,3,2,'2016-11-18 15:39:11',1),(7,2,4,2,'2016-11-18 15:39:34',1),(8,1,1,2,'2016-11-18 15:39:34',1),(9,1,2,1,'2016-11-18 15:38:13',1),(10,1,2,1,'2016-11-18 15:38:13',1),(11,1,1,1,'2016-11-18 15:38:13',1),(12,1,5,2,'2016-12-06 13:15:29',1),(13,1,6,2,'2016-12-06 13:15:29',1),(30,1,5,1,'2016-12-06 13:17:22',1),(31,1,6,1,'2016-12-06 13:17:22',1),(32,1,5,1,'2016-12-06 13:17:22',1),(33,1,6,1,'2016-12-06 13:17:22',1),(34,1,5,1,'2016-12-06 13:17:22',1),(35,1,6,1,'2016-12-06 13:17:22',1),(36,1,5,1,'2016-12-06 13:17:22',1),(37,1,6,1,'2016-12-06 13:17:22',1),(38,1,5,1,'2016-12-06 13:17:47',1);
/*!40000 ALTER TABLE `hashtag_local` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `local`
--

DROP TABLE IF EXISTS `local`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `local` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `latitude` varchar(45) DEFAULT NULL,
  `longitude` varchar(45) DEFAULT NULL,
  `titulo` varchar(45) DEFAULT NULL,
  `momento` datetime DEFAULT NULL,
  `ativo` tinyint(4) DEFAULT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `endereco` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_local_usuario1_idx` (`usuario_id`),
  CONSTRAINT `fk_local_usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `local`
--

LOCK TABLES `local` WRITE;
/*!40000 ALTER TABLE `local` DISABLE KEYS */;
INSERT INTO `local` VALUES (1,'-21.1318556','-42.3616705','Sicoob Credisudeste','2016-12-06 13:10:34',1,NULL,'Muriaé, MG, Brazil'),(2,'-21.1318915','-42.3615751','Edifício Antônio Esposito','2016-12-06 13:10:34',1,NULL,'Edifício Antônio Esposito - R. João Grossi, 37 - Centro, Muriaé - MG, 36880-000, Brazil'),(3,'-21.1317305','-42.3616888','Pernambucanas - Muriaé','2016-12-06 13:10:34',1,NULL,'R. Paschoal Bernadino, 81, Muriaé - MG, 36880-000, Brazil'),(4,'-21.131855','-42.361799','Animale Laboratório de Análises Veterinárias ','2016-12-06 13:10:34',1,NULL,'R. Paschoal Bernardino, 101 - Sala 402 - Centro, Muriaé - MG, 36880-000, Brazil'),(5,'-21.1320498','-42.3618286','Porcaro Catroli - Factoring & Fomento Mercant','2016-12-06 13:10:34',1,NULL,'113 - R. Paschoal Bernadino, 75, Muriaé - MG, 36880-000, Brazil'),(6,'-21.1316074','-42.3618025','Son Artes Marciais','2016-12-06 13:10:34',1,NULL,'R. Paschoal Bernadino, 73, Muriaé - MG, 36880-000, Brazil'),(7,'-21.131632','-42.3618386','Loja Pernambucanas','2016-12-06 13:10:34',1,NULL,'R. Paschoal Bernadino, 73, Muriaé - MG, 36880-000, Brazil'),(8,'-21.1320022','-42.3613388','Pag Facil','2016-12-06 13:10:34',1,NULL,'Muriaé - State of Minas Gerais, Brazil'),(9,'-21.1315973','-42.3618503','Loja Tim','2016-12-06 13:10:34',1,NULL,'R. Paschoal Bernadino, 73, Muriaé - MG, 36880-000, Brazil'),(10,'-21.132167','-42.361427','RESTAURANTE ESTRELA','2016-12-06 13:10:34',1,NULL,'RUA ITAMURI 45 - CENTRO, Muriaé - MG, 36880-000, Brazil'),(11,'-21.1315077','-42.3617679','Magazine Luiza Centro de Muriae- Loja 212','2016-12-06 13:10:34',1,NULL,'Rua Paschoal Bernardino, 61 - Centro, Muriaé - MG, 36880-000, Brazil'),(12,'-21.1315077','-42.3617679','forum','2016-12-06 13:10:34',1,NULL,'R. Paschoal Bernadino, 61, Muriaé - MG, Brazil'),(13,'-21.1314976','-42.3617682','Hotel Regina','2016-12-06 13:10:34',1,NULL,'R. Paschoal Bernadino, 61 - Centro, Muriaé - MG, 36880-000, Brazil'),(14,'-21.1322185','-42.3617056','Boutique Alto Astral','2016-12-06 13:10:34',1,NULL,'R. Pascoal Bernardino, 137 - Centro, Muriaé - MG, 36880-000, Brazil'),(15,'-21.1320809','-42.3619525','Kit\'s Lanches','2016-12-06 13:10:34',1,NULL,'R. Paschoal Bernadino, Muriaé - MG, 36880-000, Brazil'),(16,'-21.1316621','-42.3620136','Lanchonete Ce - Q - Sabe','2016-12-06 13:10:34',1,NULL,'R. Paschoal Bernadino, 5 - Centro, Muriaé - MG, Brazil'),(17,'-21.1320458','-42.36122','Loja das Artesas do Pano de Muriaé','2016-12-06 13:10:34',1,NULL,'R. Itamuri, 53, Muriaé - MG, 36880-000, Brazil'),(18,'-21.1314803','-42.3618407','Magazine Luiza','2016-12-06 13:10:34',1,NULL,'R. Paschoal Bernadino, 61, Muriaé - MG, 36880-000, Brazil'),(19,'-21.1319886','-42.3611674','Igreja do Nazareno Muriaé','2016-12-06 13:10:34',1,NULL,'R. Itamuri, 61A, Muriaé - MG, 36880-000, Brazil'),(20,'-21.1323133','-42.361568','Banco do Brasil S/A','2016-12-06 13:10:34',1,NULL,'Rua Pascoal Bernardino, 161, Muriaé - MG, 36880-000, Brazil'),(21,'34.9429028','-98.8146333','Cooperton Dolose Rock Quarry','2016-12-06 16:56:11',1,NULL,'Gotebo, OK 73041, USA'),(22,'34.9917536','-98.8508546','Rainy Mountain Indian School Reservation','2016-12-06 16:56:11',1,NULL,'Gotebo, OK 73041, USA'),(23,'35.0008922','-98.7975669','Lone Wolf Chapel','2016-12-06 16:56:11',1,NULL,'Mountain View, OK 73062, USA'),(24,'34.9138478','-98.8475609','Union Dale Cemetery','2016-12-06 16:56:11',1,NULL,'Union Dale Cemetery, Gotebo, OK 73041, USA'),(25,'42.8720691','74.6017401','Dogtas Exclusive','2016-12-06 16:57:35',1,NULL,'Bishkek, Kyrgyzstan'),(26,'42.8721266','74.6014749','Dream Home','2016-12-06 16:57:35',1,NULL,'Bishkek, Kyrgyzstan'),(27,'42.8725517','74.6021502','Baratov\'s (Friends Bar)','2016-12-06 16:57:35',1,NULL,'Orozbekov St, Bishkek, Kyrgyzstan'),(28,'42.8721056','74.6022624','РК Глобал Групп','2016-12-06 16:57:35',1,NULL,'52 Orozbekov St, Bishkek, Kyrgyzstan'),(29,'42.872695','74.6014743','КыргызСтандарт','2016-12-06 16:57:35',1,NULL,'КыргызСтандарт, Toktogul Street, Bishkek, Kyrgyzstan'),(30,'42.8726844','74.6023637','China town','2016-12-06 16:57:35',1,NULL,'Bishkek, Kyrgyzstan'),(31,'42.8718218','74.6021284','ADB - Kyrgyz Republic Resident Mission (KYRM)','2016-12-06 16:57:35',1,NULL,'720040,, 52-54 Orozbekov St, Bishkek, Kyrgyzstan'),(32,'42.871851','74.602247','RK Global Group Переводческая и Юридическая К','2016-12-06 16:57:35',1,NULL,'ул.Орозбекова,54, Bishkek 720040, Kyrgyzstan'),(33,'42.8727861','74.6023493','Zölden','2016-12-06 16:57:35',1,NULL,'Orozbekov St, Bishkek, Kyrgyzstan'),(34,'42.8717815','74.6022081','Rk Legal','2016-12-06 16:57:35',1,NULL,'46 Orozbekov St, Bishkek, Kyrgyzstan'),(35,'42.8726824','74.602699','Nar Restaurant','2016-12-06 16:57:35',1,NULL,'Bishkek, Kyrgyzstan'),(36,'42.8724751','74.6030383','Центральный государственный архив Кыргызской ','2016-12-06 16:57:35',1,NULL,'Bishkek, Kyrgyzstan'),(37,'42.8724748','74.6031216','Государственный архив','2016-12-06 16:57:35',1,NULL,'Государственный архив, Toktogul Street, Bishkek, Kyrgyzstan'),(38,'42.8732341','74.601337','Детский сад №25','2016-12-06 16:57:35',1,NULL,'Детский сад №25, Panfilov St, Bishkek, Kyrgyzstan'),(39,'42.8729852','74.6028838','Omar Ne Hayam','2016-12-06 16:57:35',1,NULL,'Bishkek, Kyrgyzstan'),(40,'42.872035','74.6004033','Bon Voyage','2016-12-06 16:57:35',1,NULL,'Bishkek, Kyrgyzstan'),(41,'42.873353','74.6023061','Ыр кесе','2016-12-06 16:57:35',1,NULL,'Bishkek, Kyrgyzstan'),(42,'42.87123','74.602189','Neomed Clinic','2016-12-06 16:57:35',1,NULL,'Бишкек, ул. Орозбекова 46, Bishkek, Kyrgyzstan'),(43,'42.87204','74.603347','East Star Capital Investment Bank','2016-12-06 16:57:35',1,NULL,'102/104 Toktogul St., 5, Bishkek 720040, Kyrgyzstan'),(44,'42.8711718','74.6016204','Webformat','2016-12-06 16:57:35',1,NULL,'Bishkek, Kyrgyzstan'),(45,'-21.1316781','-42.3674887','Imobiliária Espaço','2016-12-06 17:10:37',1,NULL,'R. Cel. Domiciano, 83, Muriaé - MG, 36880-000, Brazil'),(46,'-21.1316781','-42.3674887','Bruno de Castro Almeida Advogados','2016-12-06 17:10:37',1,NULL,'R. Cel. Domiciano, 83, Muriaé - MG, 36888-000, Brazil'),(47,'-21.1313751','-42.3675184','Junta De Serviço Militar','2016-12-06 17:10:37',1,NULL,'R. Cel. Domiciano, 26, Muriaé - MG, 36880-000, Brazil'),(48,'-21.13149','-42.367233','Energisa - Posto de Atendimento','2016-12-06 17:10:37',1,NULL,'R. Cel. Domiciano, 53, Muriaé - MG, 36880-000, Brazil'),(49,'-21.1316065','-42.3678792','Tribunal da Justiça-Fórum de Muriaé','2016-12-06 17:10:37',1,NULL,'R. Pres. Artur Bernardes, Muriaé - MG, 36880-000, Brazil'),(50,'-21.1316065','-42.3678792','Táxi','2016-12-06 17:10:37',1,NULL,'R. Cel. Domiciano, Muriaé - MG, 36880-000, Brazil'),(51,'-21.1316065','-42.3678792','Teatro Belmira Villas Boas','2016-12-06 17:10:37',1,NULL,'R. Cel. Domiciano, Muriaé - MG, 36880-000, Brazil'),(52,'-21.1315275','-42.3679031','Oi Atende','2016-12-06 17:10:37',1,NULL,'Muriaé - State of Minas Gerais, Brazil'),(53,'-21.1316716','-42.367896','CHURRASQUINHO DO PAULINHO','2016-12-06 17:10:37',1,NULL,'R. Cel. Domiciano, 23, Muriaé - MG, 36880-000, Brazil'),(54,'-21.1311092','-42.36757','Câmara Municipal de Muriaé','2016-12-06 17:10:37',1,NULL,'Praça Coronel Pacheco de Medeiros - Centro, Muriaé - MG, 36880-000, Brazil'),(55,'-21.131276','-42.3670774','Secretaria de Estado de Planejamento e Gestão','2016-12-06 17:10:37',1,NULL,'R. Cel. Domiciano, 170, Muriaé - MG, 36880-000, Brazil'),(56,'-21.131276','-42.3670774','Secretaria de Estado de Recursos Humanos de A','2016-12-06 17:10:37',1,NULL,'R. Cel. Domiciano, 170, Muriaé - MG, 36880-000, Brazil'),(57,'-21.131814','-42.36703','Ivaldo Nolasco Nunes Barreto','2016-12-06 17:10:37',1,NULL,'Rua Paulo Pacheco de Medeiros 52 - Centro, Muriaé - MG, 36880-000, Brazil'),(58,'-21.1313346','-42.3670151','Carneiro e Felippe Advogados Associados','2016-12-06 17:10:37',1,NULL,'R. Cel. Domiciano, 164, Muriaé - MG, 36880-000, Brazil'),(59,'-21.1312649','-42.3670374','Sinal Verde Empréstimo Pessoal','2016-12-06 17:10:37',1,NULL,'R. Cel. Domiciano, 164, Muriaé - MG, 36880-000, Brazil'),(60,'-21.1317302','-42.3681072','Hakuna Batata','2016-12-06 17:10:37',1,NULL,'R. Cel. Domiciano, 47, Muriaé - MG, 36880-000, Brazil'),(61,'-21.1310181','-42.3673032','Memorial Municipal de Muriaé','2016-12-06 17:10:37',1,NULL,'R. Pres. Artur Bernardes, Muriaé - MG, 36880-000, Brazil'),(62,'-21.1319597','-42.367007','Dinâmica Imóveis Muriaé','2016-12-06 17:10:37',1,NULL,'Praça São Paulo, 7/101 - Centro, Muriaé - MG, Brazil'),(63,'-21.1309051','-42.3676628','Topogram','2016-12-06 17:10:37',1,NULL,'R. Pres. Artur Bernardes, 37, Muriaé - MG, 36880-000, Brazil'),(64,'-21.1309051','-42.3676628','Trota & Duarte Advogados','2016-12-06 17:10:37',1,NULL,'R. Pres. Artur Bernardes, 37, Muriaé - MG, 36880-000, Brazil');
/*!40000 ALTER TABLE `local` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `local_categoria`
--

DROP TABLE IF EXISTS `local_categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `local_categoria` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `local_id` int(11) DEFAULT NULL,
  `categoria_id` int(11) DEFAULT NULL,
  `ativo` tinyint(4) DEFAULT NULL,
  `momento` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_local_categoria_1_idx` (`local_id`),
  KEY `fk_local_categoria_2_idx` (`categoria_id`),
  CONSTRAINT `fk_local_categoria_1` FOREIGN KEY (`local_id`) REFERENCES `local` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_local_categoria_2` FOREIGN KEY (`categoria_id`) REFERENCES `categoria_local` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=169 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `local_categoria`
--

LOCK TABLES `local_categoria` WRITE;
/*!40000 ALTER TABLE `local_categoria` DISABLE KEYS */;
INSERT INTO `local_categoria` VALUES (1,1,1,1,'2016-12-06 13:10:34'),(2,1,1,1,'2016-12-06 13:10:34'),(3,2,16,1,'2016-12-06 13:10:34'),(4,1,10,1,'2016-12-06 13:10:34'),(5,3,11,1,'2016-12-06 13:10:34'),(6,2,10,1,'2016-12-06 13:10:34'),(7,4,16,1,'2016-12-06 13:10:34'),(8,3,11,1,'2016-12-06 13:10:34'),(9,3,10,1,'2016-12-06 13:10:34'),(10,5,10,1,'2016-12-06 13:10:34'),(11,4,10,1,'2016-12-06 13:10:34'),(12,5,10,1,'2016-12-06 13:10:34'),(13,6,16,1,'2016-12-06 13:10:34'),(14,7,16,1,'2016-12-06 13:10:34'),(15,6,13,1,'2016-12-06 13:10:34'),(16,6,14,1,'2016-12-06 13:10:34'),(17,6,10,1,'2016-12-06 13:10:34'),(18,8,16,1,'2016-12-06 13:10:34'),(19,7,10,1,'2016-12-06 13:10:34'),(20,9,10,1,'2016-12-06 13:10:34'),(21,8,10,1,'2016-12-06 13:10:34'),(22,9,10,1,'2016-12-06 13:10:34'),(23,11,16,1,'2016-12-06 13:10:34'),(24,10,5,1,'2016-12-06 13:10:34'),(25,10,6,1,'2016-12-06 13:10:34'),(26,10,4,1,'2016-12-06 13:10:34'),(27,10,5,1,'2016-12-06 13:10:34'),(28,10,6,1,'2016-12-06 13:10:34'),(29,10,10,1,'2016-12-06 13:10:34'),(30,12,10,1,'2016-12-06 13:10:34'),(31,11,11,1,'2016-12-06 13:10:34'),(32,11,10,1,'2016-12-06 13:10:34'),(33,12,10,1,'2016-12-06 13:10:34'),(34,13,16,1,'2016-12-06 13:10:34'),(35,14,11,1,'2016-12-06 13:10:34'),(36,13,10,1,'2016-12-06 13:10:34'),(37,14,11,1,'2016-12-06 13:10:34'),(38,15,10,1,'2016-12-06 13:10:34'),(39,14,10,1,'2016-12-06 13:10:34'),(40,15,10,1,'2016-12-06 13:10:34'),(41,17,16,1,'2016-12-06 13:10:34'),(42,16,5,1,'2016-12-06 13:10:34'),(43,16,6,1,'2016-12-06 13:10:34'),(44,16,10,1,'2016-12-06 13:10:34'),(45,18,10,1,'2016-12-06 13:10:34'),(46,17,10,1,'2016-12-06 13:10:34'),(47,18,10,1,'2016-12-06 13:10:34'),(48,19,16,1,'2016-12-06 13:10:34'),(49,20,1,1,'2016-12-06 13:10:34'),(50,19,16,1,'2016-12-06 13:10:34'),(51,19,10,1,'2016-12-06 13:10:34'),(52,20,1,1,'2016-12-06 13:10:34'),(53,20,1,1,'2016-12-06 13:10:34'),(54,20,10,1,'2016-12-06 13:10:34'),(55,21,16,1,'2016-12-06 16:56:11'),(56,22,10,1,'2016-12-06 16:56:11'),(57,21,10,1,'2016-12-06 16:56:11'),(58,22,10,1,'2016-12-06 16:56:11'),(59,23,16,1,'2016-12-06 16:56:11'),(60,24,16,1,'2016-12-06 16:56:11'),(61,23,16,1,'2016-12-06 16:56:11'),(62,23,10,1,'2016-12-06 16:56:11'),(63,24,16,1,'2016-12-06 16:56:11'),(64,24,16,1,'2016-12-06 16:56:11'),(65,24,10,1,'2016-12-06 16:56:11'),(66,25,11,1,'2016-12-06 16:57:35'),(67,25,11,1,'2016-12-06 16:57:35'),(68,25,11,1,'2016-12-06 16:57:35'),(69,26,11,1,'2016-12-06 16:57:35'),(70,25,10,1,'2016-12-06 16:57:35'),(71,26,11,1,'2016-12-06 16:57:35'),(72,26,11,1,'2016-12-06 16:57:35'),(73,28,10,1,'2016-12-06 16:57:35'),(74,27,7,1,'2016-12-06 16:57:35'),(75,27,10,1,'2016-12-06 16:57:35'),(76,28,10,1,'2016-12-06 16:57:35'),(77,29,16,1,'2016-12-06 16:57:35'),(78,31,1,1,'2016-12-06 16:57:35'),(79,30,5,1,'2016-12-06 16:57:35'),(80,30,6,1,'2016-12-06 16:57:35'),(81,30,4,1,'2016-12-06 16:57:35'),(82,30,5,1,'2016-12-06 16:57:35'),(83,30,6,1,'2016-12-06 16:57:35'),(84,30,10,1,'2016-12-06 16:57:35'),(85,31,1,1,'2016-12-06 16:57:35'),(86,32,10,1,'2016-12-06 16:57:35'),(87,31,10,1,'2016-12-06 16:57:35'),(88,32,10,1,'2016-12-06 16:57:35'),(89,34,10,1,'2016-12-06 16:57:35'),(90,33,5,1,'2016-12-06 16:57:35'),(91,33,6,1,'2016-12-06 16:57:35'),(92,33,10,1,'2016-12-06 16:57:35'),(93,34,10,1,'2016-12-06 16:57:35'),(94,36,16,1,'2016-12-06 16:57:35'),(95,35,5,1,'2016-12-06 16:57:35'),(96,35,6,1,'2016-12-06 16:57:35'),(97,35,4,1,'2016-12-06 16:57:35'),(98,35,5,1,'2016-12-06 16:57:35'),(99,35,6,1,'2016-12-06 16:57:35'),(100,35,10,1,'2016-12-06 16:57:35'),(101,37,16,1,'2016-12-06 16:57:35'),(102,36,10,1,'2016-12-06 16:57:35'),(103,38,16,1,'2016-12-06 16:57:35'),(104,37,10,1,'2016-12-06 16:57:35'),(105,40,10,1,'2016-12-06 16:57:35'),(106,39,5,1,'2016-12-06 16:57:35'),(107,39,6,1,'2016-12-06 16:57:35'),(108,39,4,1,'2016-12-06 16:57:35'),(109,39,5,1,'2016-12-06 16:57:35'),(110,39,6,1,'2016-12-06 16:57:35'),(111,39,10,1,'2016-12-06 16:57:35'),(112,40,10,1,'2016-12-06 16:57:35'),(113,42,14,1,'2016-12-06 16:57:35'),(114,41,5,1,'2016-12-06 16:57:35'),(115,41,6,1,'2016-12-06 16:57:35'),(116,41,4,1,'2016-12-06 16:57:35'),(117,41,5,1,'2016-12-06 16:57:35'),(118,41,6,1,'2016-12-06 16:57:35'),(119,41,10,1,'2016-12-06 16:57:35'),(120,43,16,1,'2016-12-06 16:57:35'),(121,42,10,1,'2016-12-06 16:57:35'),(122,44,10,1,'2016-12-06 16:57:35'),(123,43,10,1,'2016-12-06 16:57:35'),(124,44,10,1,'2016-12-06 16:57:35'),(125,45,16,1,'2016-12-06 17:10:37'),(126,46,16,1,'2016-12-06 17:10:37'),(127,45,10,1,'2016-12-06 17:10:37'),(128,47,10,1,'2016-12-06 17:10:37'),(129,46,10,1,'2016-12-06 17:10:37'),(130,47,10,1,'2016-12-06 17:10:37'),(131,48,10,1,'2016-12-06 17:10:37'),(132,48,10,1,'2016-12-06 17:10:37'),(133,49,15,1,'2016-12-06 17:10:37'),(134,50,10,1,'2016-12-06 17:10:37'),(135,49,10,1,'2016-12-06 17:10:37'),(136,50,10,1,'2016-12-06 17:10:37'),(137,51,10,1,'2016-12-06 17:10:37'),(138,51,10,1,'2016-12-06 17:10:37'),(139,52,10,1,'2016-12-06 17:10:37'),(140,52,10,1,'2016-12-06 17:10:37'),(141,54,15,1,'2016-12-06 17:10:37'),(142,53,7,1,'2016-12-06 17:10:37'),(143,53,10,1,'2016-12-06 17:10:37'),(144,55,15,1,'2016-12-06 17:10:37'),(145,54,10,1,'2016-12-06 17:10:37'),(146,56,10,1,'2016-12-06 17:10:37'),(147,55,10,1,'2016-12-06 17:10:37'),(148,56,10,1,'2016-12-06 17:10:37'),(149,57,10,1,'2016-12-06 17:10:37'),(150,57,10,1,'2016-12-06 17:10:37'),(151,58,16,1,'2016-12-06 17:10:37'),(152,59,16,1,'2016-12-06 17:10:37'),(153,58,10,1,'2016-12-06 17:10:37'),(154,61,16,1,'2016-12-06 17:10:38'),(155,60,5,1,'2016-12-06 17:10:38'),(156,60,6,1,'2016-12-06 17:10:38'),(157,60,4,1,'2016-12-06 17:10:38'),(158,60,5,1,'2016-12-06 17:10:38'),(159,60,6,1,'2016-12-06 17:10:38'),(160,60,10,1,'2016-12-06 17:10:38'),(161,62,16,1,'2016-12-06 17:10:38'),(162,61,10,1,'2016-12-06 17:10:38'),(163,63,10,1,'2016-12-06 17:10:38'),(164,62,10,1,'2016-12-06 17:10:38'),(165,63,10,1,'2016-12-06 17:10:38'),(166,64,16,1,'2016-12-06 17:10:38'),(167,64,16,1,'2016-12-06 17:10:38'),(168,64,10,1,'2016-12-06 17:10:38');
/*!40000 ALTER TABLE `local_categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `local_google`
--

DROP TABLE IF EXISTS `local_google`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `local_google` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `place_id` varchar(255) NOT NULL,
  `local_id` int(11) DEFAULT NULL,
  `ativo` tinyint(4) DEFAULT NULL,
  `momento` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_local_google_1_idx` (`local_id`),
  CONSTRAINT `fk_local_google_1` FOREIGN KEY (`local_id`) REFERENCES `local` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `local_google`
--

LOCK TABLES `local_google` WRITE;
/*!40000 ALTER TABLE `local_google` DISABLE KEYS */;
INSERT INTO `local_google` VALUES (1,'ChIJzTi4flvGvAARamyRa4kbIec',1,1,'2016-12-06 13:10:34'),(2,'ChIJByI5mVvGvAARznLNpkZePAQ',2,1,'2016-12-06 13:10:34'),(3,'ChIJ--R4d1vGvAARlPryC2RgUR0',3,1,'2016-12-06 13:10:34'),(4,'ChIJ-SLggkbGvAARc_zw2kFWIZg',4,1,'2016-12-06 13:10:34'),(5,'ChIJtTGuglvGvAAR-CZnsSfblEo',5,1,'2016-12-06 13:10:34'),(6,'ChIJVdw2nlvGvAARLFTMqLJZDMU',6,1,'2016-12-06 13:10:34'),(7,'ChIJe7wjnlvGvAARIz6AozxThNI',7,1,'2016-12-06 13:10:34'),(8,'ChIJUUcOgVvGvAARIyHBFIJD0oQ',8,1,'2016-12-06 13:10:34'),(9,'ChIJT-gonlvGvAARpWEGrvfwlQw',9,1,'2016-12-06 13:10:34'),(10,'ChIJ1cPxB1nGvAARLcRgukNN9uI',10,1,'2016-12-06 13:10:34'),(11,'ChIJ-T8xgFzGvAARubk7bRO62cA',11,1,'2016-12-06 13:10:34'),(12,'ChIJC3-Wn1vGvAARxJpdMX5_TyY',12,1,'2016-12-06 13:10:34'),(13,'ChIJO4sfcVvGvAARfutl-3Lf3Hc',13,1,'2016-12-06 13:10:34'),(14,'ChIJdXt9flvGvAARnvGCbLw3qWM',14,1,'2016-12-06 13:10:34'),(15,'ChIJBdFDeFvGvAARhpEpxqk_Y5I',15,1,'2016-12-06 13:10:34'),(16,'ChIJU8JKnVvGvAARZlyeWxkLVLk',16,1,'2016-12-06 13:10:34'),(17,'ChIJH5R_kFvGvAARwUlxDmldC2o',17,1,'2016-12-06 13:10:34'),(18,'ChIJ_QcLdVvGvAARZd_QX2S_LfI',18,1,'2016-12-06 13:10:34'),(19,'ChIJ2ezAkFvGvAAR5FQH-xUdznI',19,1,'2016-12-06 13:10:34'),(20,'ChIJxw4rflvGvAAR5nxFXmTFb_k',20,1,'2016-12-06 13:10:34'),(21,'ChIJL42T8zVerIcRtvrrF8U2guQ',21,1,'2016-12-06 16:56:11'),(22,'ChIJFfkNl0VnrIcR7KQwMZy3Ojw',22,1,'2016-12-06 16:56:11'),(23,'ChIJ8wc44stdrIcRHaFibHp9HP4',23,1,'2016-12-06 16:56:11'),(24,'ChIJ43RWqRJgrIcR4I6lSZ-f6Kk',24,1,'2016-12-06 16:56:11'),(25,'ChIJo_q6q9u3njgRqw1IhvLYJos',25,1,'2016-12-06 16:57:35'),(26,'ChIJhykmrNu3njgRpFkQOfpQnGo',26,1,'2016-12-06 16:57:35'),(27,'ChIJb7R9CNu3njgRwgFjFVeW43A',27,1,'2016-12-06 16:57:35'),(28,'ChIJ7wF1Adu3njgREX9RvrMKOLA',28,1,'2016-12-06 16:57:35'),(29,'ChIJd_x8pNu3njgRhgoUOJGjCVA',29,1,'2016-12-06 16:57:35'),(30,'ChIJpxosD9u3njgR5lhnls2wXA0',30,1,'2016-12-06 16:57:35'),(31,'ChIJqcmx_9q3njgR67L8CSkNzSU',31,1,'2016-12-06 16:57:35'),(32,'ChIJj1EgW8W3njgR80cqLWHOxUg',32,1,'2016-12-06 16:57:35'),(33,'ChIJ-SG1Dtu3njgRAiUAFRp8ico',33,1,'2016-12-06 16:57:35'),(34,'ChIJJ3n3_tq3njgRz1Lqen3S8F8',34,1,'2016-12-06 16:57:35'),(35,'ChIJ_7TfD9u3njgRjAyPHxzoUKU',35,1,'2016-12-06 16:57:35'),(36,'ChIJobrRG9u3njgRfNyNY02ACpg',36,1,'2016-12-06 16:57:35'),(37,'ChIJc4bUG9u3njgRiPHTCClcUKc',37,1,'2016-12-06 16:57:35'),(38,'ChIJBbCQmdu3njgRvc_3fj-M6ts',38,1,'2016-12-06 16:57:35'),(39,'ChIJ2400Etu3njgRcgiXasMAW6o',39,1,'2016-12-06 16:57:35'),(40,'ChIJSzGSydu3njgRJvXCCOuDZCg',40,1,'2016-12-06 16:57:35'),(41,'ChIJaThydNu3njgRBWjXQyG0GNw',41,1,'2016-12-06 16:57:35'),(42,'ChIJwfQF99q3njgRI45KJQkj98U',42,1,'2016-12-06 16:57:35'),(43,'ChIJ6Qg-4Nq3njgRXIk_MLCQv_Q',43,1,'2016-12-06 16:57:35'),(44,'ChIJZSiKWdq3njgRDvpXtunRBPk',44,1,'2016-12-06 16:57:35'),(45,'ChIJxXW8lkPGvAAR1jLHC8wjFfQ',45,1,'2016-12-06 17:10:38'),(46,'ChIJmT1IlEPGvAAR_PNueOyBHyA',46,1,'2016-12-06 17:10:38'),(47,'ChIJA2Swj0PGvAARsesJkGE3pgU',47,1,'2016-12-06 17:10:38'),(48,'ChIJ6Tzjj0PGvAARf5D9sZFH2DA',48,1,'2016-12-06 17:10:38'),(49,'ChIJ43Z0k0PGvAARybD6_Sy9kV8',49,1,'2016-12-06 17:10:38'),(50,'ChIJ43Z0k0PGvAARaL56amEw-10',50,1,'2016-12-06 17:10:38'),(51,'ChIJ43Z0k0PGvAARcpxyCCKPnR8',51,1,'2016-12-06 17:10:38'),(52,'ChIJ4RzPhEPGvAAR5zn-FfZGYEE',52,1,'2016-12-06 17:10:38'),(53,'ChIJi_Zlm0PGvAAR6Zhxwde4hyE',53,1,'2016-12-06 17:10:38'),(54,'ChIJQ8sVMNfIvAARQg12U7vXzuo',54,1,'2016-12-06 17:10:38'),(55,'ChIJD3Klw0PGvAARCjWJHEOLvJA',55,1,'2016-12-06 17:10:38'),(56,'ChIJD3Klw0PGvAARIJ0iVrpcmxU',56,1,'2016-12-06 17:10:38'),(57,'ChIJTxZmnEPGvAAR1PO-z3piQpA',57,1,'2016-12-06 17:10:38'),(58,'ChIJH_7fg0PGvAARiyKzdS_pzDA',58,1,'2016-12-06 17:10:38'),(59,'ChIJ6arLw0PGvAARol21GF4ZWs8',59,1,'2016-12-06 17:10:38'),(60,'ChIJj0wZ60PGvAARxXRVt3MfuK4',60,1,'2016-12-06 17:10:38'),(61,'ChIJkweWh0PGvAAR6ohhpPlvA3k',61,1,'2016-12-06 17:10:38'),(62,'ChIJw-XPnkPGvAAR46Yczm1UPQk',62,1,'2016-12-06 17:10:38'),(63,'ChIJldcBhkPGvAAR8tXt4d_cuOs',63,1,'2016-12-06 17:10:38'),(64,'ChIJoZAPr0bGvAARKS1yvIYEkts',64,1,'2016-12-06 17:10:38');
/*!40000 ALTER TABLE `local_google` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mensagens`
--

DROP TABLE IF EXISTS `mensagens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mensagens` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) DEFAULT NULL,
  `momento` datetime DEFAULT NULL,
  `ativo` tinyint(4) DEFAULT NULL,
  `endereco` varchar(255) DEFAULT NULL,
  `usuario_id` int(11) NOT NULL,
  `usuario_mensagem_id` int(11) NOT NULL,
  `status_mensagem_id` int(11) NOT NULL DEFAULT '1',
  `momento_visualizado` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_mensagens_usuario1_idx` (`usuario_id`),
  KEY `fk_mensagens_usuario2_idx` (`usuario_mensagem_id`),
  KEY `fk_mensagens_status_mensagem1_idx` (`status_mensagem_id`),
  CONSTRAINT `fk_mensagens_status_mensagem1` FOREIGN KEY (`status_mensagem_id`) REFERENCES `status_mensagem` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_mensagens_usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_mensagens_usuario2` FOREIGN KEY (`usuario_mensagem_id`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mensagens`
--

LOCK TABLES `mensagens` WRITE;
/*!40000 ALTER TABLE `mensagens` DISABLE KEYS */;
INSERT INTO `mensagens` VALUES (1,'teste1','2016-11-14 16:24:00',1,NULL,13,2,3,'2016-11-14 16:24:00'),(2,'teste12','2016-11-14 16:24:00',1,NULL,13,2,3,'2016-11-14 16:24:00'),(3,'teste123','2016-11-14 16:24:00',1,NULL,13,2,3,'2016-11-14 16:24:00'),(4,'teste1234','2016-11-14 16:24:00',1,NULL,13,2,3,'2016-11-14 16:24:00'),(5,'respondi','2016-11-14 16:23:53',1,NULL,2,13,2,NULL),(6,NULL,'2016-11-14 16:23:53',1,'HTTP://172.17.0.2/Quickpeek//file/imagem/img/gjk-2016-11-14-15-23-17.png',2,13,2,NULL),(7,'sadadadada','2016-11-14 16:20:57',1,'HTTP://172.17.0.2/Quickpeek//file/imagem/img/9HZ-2016-11-14-15-23-22.png',2,13,2,NULL);
/*!40000 ALTER TABLE `mensagens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mensagens_excluidas`
--

DROP TABLE IF EXISTS `mensagens_excluidas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mensagens_excluidas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mensagens_id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `ativo` tinyint(4) DEFAULT NULL,
  `momento` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_mensagens_excluidas_1_idx` (`mensagens_id`),
  KEY `fk_mensagens_excluidas_2_idx` (`usuario_id`),
  CONSTRAINT `fk_mensagens_excluidas_1` FOREIGN KEY (`mensagens_id`) REFERENCES `mensagens` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_mensagens_excluidas_2` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mensagens_excluidas`
--

LOCK TABLES `mensagens_excluidas` WRITE;
/*!40000 ALTER TABLE `mensagens_excluidas` DISABLE KEYS */;
INSERT INTO `mensagens_excluidas` VALUES (1,2,13,1,'2016-11-14 15:42:22'),(2,3,13,1,'2016-11-14 15:42:22'),(3,1,13,1,'2016-11-14 15:42:59'),(4,1,13,1,'2016-11-14 15:43:09'),(5,2,13,1,'2016-11-14 15:43:09'),(6,3,13,1,'2016-11-14 15:43:09'),(7,4,13,1,'2016-11-14 15:43:09'),(8,5,13,1,'2016-11-14 15:43:09'),(9,6,13,1,'2016-11-14 15:43:09'),(10,7,13,1,'2016-11-14 15:43:09');
/*!40000 ALTER TABLE `mensagens_excluidas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `midia`
--

DROP TABLE IF EXISTS `midia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `midia` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `endereco` varchar(255) DEFAULT NULL,
  `momento` datetime DEFAULT NULL,
  `ativo` tinyint(4) DEFAULT NULL,
  `usuario_id` int(11) NOT NULL,
  `local_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_foto_usuario1_idx` (`usuario_id`),
  KEY `fk_foto_local1_idx` (`local_id`),
  CONSTRAINT `fk_foto_local1` FOREIGN KEY (`local_id`) REFERENCES `local` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_foto_usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `midia`
--

LOCK TABLES `midia` WRITE;
/*!40000 ALTER TABLE `midia` DISABLE KEYS */;
INSERT INTO `midia` VALUES (1,'HTTP://172.17.0.2/Quickpeek//file/midia/mda/PtJ-2016-11-08-15-20-02.png','2016-11-08 15:20:02',1,2,2),(2,'HTTP://172.17.0.2/Quickpeek//file/midia/mda/eH7-2016-11-08-15-39-56.png','2016-11-08 15:39:56',1,2,2),(3,'HTTP://172.17.0.2/Quickpeek//file/midia/mda/Xll-2016-11-11-16-12-46.png','2016-11-11 16:12:46',1,1,1),(4,'HTTP://172.17.0.2/Quickpeek//file/midia/mda/srW-2016-11-17-15-11-46.png','2016-11-17 15:11:46',1,1,2),(5,'HTTP://172.17.0.2/Quickpeek//file/midia/mda/Yrs-2016-11-17-16-07-01.png','2016-11-17 16:07:01',1,1,1),(6,'HTTP://172.17.0.2/Quickpeek//file/midia/mda/mEz-2016-11-17-16-07-04.png','2016-11-18 16:07:04',1,1,2),(7,'HTTP://172.17.0.2/Quickpeek//file/midia/mda/ouR-2016-11-22-13-20-34.png','2016-11-22 13:20:34',1,4,2),(8,'HTTP://172.17.0.2/Quickpeek//file/midia/mda/aKY-2016-11-22-13-31-12.jpg','2016-11-22 13:31:13',1,4,2),(9,'HTTP://172.17.0.2/Quickpeek//file/midia/mda/cKB-2016-12-06-13-15-51.png','2016-12-06 13:15:51',1,1,1);
/*!40000 ALTER TABLE `midia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `numerounico_usuario`
--

DROP TABLE IF EXISTS `numerounico_usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `numerounico_usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario_id` int(11) DEFAULT NULL,
  `numerounico` varchar(255) DEFAULT NULL,
  `ativo` tinyint(4) DEFAULT NULL,
  `momento` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_numerounico_usuario_1_idx` (`usuario_id`),
  CONSTRAINT `fk_numerounico_usuario_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `numerounico_usuario`
--

LOCK TABLES `numerounico_usuario` WRITE;
/*!40000 ALTER TABLE `numerounico_usuario` DISABLE KEYS */;
INSERT INTO `numerounico_usuario` VALUES (1,NULL,NULL,0,'2016-12-02 16:28:22'),(2,NULL,'519819457456456454654',0,'2016-12-02 16:29:28'),(3,NULL,'159',0,'2016-12-02 18:01:52'),(4,NULL,'147',0,'2016-12-02 18:02:13'),(5,1,'147',0,'2016-12-02 18:02:25'),(6,1,'147',0,'2016-12-02 18:04:02'),(7,29,'11111',1,'2016-12-02 18:18:06'),(8,26,NULL,1,'2016-12-02 18:12:14'),(9,1,'11111',0,'2016-12-02 18:14:57'),(10,30,'202028282929',0,'2016-12-02 18:19:22'),(11,30,'202028282929',0,'2016-12-02 18:26:42'),(12,30,NULL,1,'2016-12-05 13:07:51'),(13,31,NULL,1,'2016-12-05 13:08:01'),(14,32,'12312313321',0,'2016-12-05 13:09:13'),(15,33,'sdsdsds',0,'2016-12-05 13:10:44'),(16,32,'sdsdsds',1,'2016-12-05 13:10:35'),(17,33,'sdsdsds',1,'2016-12-05 13:11:37'),(18,34,'123123123212313',0,'2016-12-05 13:14:45'),(19,NULL,'123123111111111',1,'2016-12-05 13:15:16'),(20,34,'123123111111111',1,'2016-12-05 13:15:35'),(21,1,'123123111111111',1,'2016-12-05 13:16:57');
/*!40000 ALTER TABLE `numerounico_usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pergunta_alerta`
--

DROP TABLE IF EXISTS `pergunta_alerta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pergunta_alerta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario_id` int(11) NOT NULL,
  `perguntas_id` int(11) NOT NULL,
  `retorno` varchar(255) DEFAULT NULL,
  `ativo` tinyint(4) DEFAULT NULL,
  `momento` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_pergunta_alerta_1_idx` (`usuario_id`),
  KEY `fk_pergunta_alerta_2_idx` (`perguntas_id`),
  CONSTRAINT `fk_pergunta_alerta_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_pergunta_alerta_2` FOREIGN KEY (`perguntas_id`) REFERENCES `perguntas` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pergunta_alerta`
--

LOCK TABLES `pergunta_alerta` WRITE;
/*!40000 ALTER TABLE `pergunta_alerta` DISABLE KEYS */;
INSERT INTO `pergunta_alerta` VALUES (1,2,4,'0',1,'2000-01-01 10:10:10'),(2,3,4,'2',1,'2000-01-01 10:10:10'),(3,4,4,'3',1,'2000-01-01 10:10:10');
/*!40000 ALTER TABLE `pergunta_alerta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pergunta_usuario`
--

DROP TABLE IF EXISTS `pergunta_usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pergunta_usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `momento` datetime DEFAULT NULL,
  `ativo` tinyint(4) DEFAULT NULL,
  `visualizado` tinyint(4) DEFAULT '0',
  `visibilidade_id` int(11) NOT NULL,
  `perguntas_id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `momento_visualizado` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_pergunta_usuario_perguntas1_idx` (`perguntas_id`),
  KEY `fk_pergunta_usuario_usuario1_idx` (`usuario_id`),
  KEY `fk_pergunta_usuario_1_idx` (`visibilidade_id`),
  CONSTRAINT `fk_pergunta_usuario_1` FOREIGN KEY (`visibilidade_id`) REFERENCES `visibilidade` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_pergunta_usuario_perguntas1` FOREIGN KEY (`perguntas_id`) REFERENCES `perguntas` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_pergunta_usuario_usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pergunta_usuario`
--

LOCK TABLES `pergunta_usuario` WRITE;
/*!40000 ALTER TABLE `pergunta_usuario` DISABLE KEYS */;
INSERT INTO `pergunta_usuario` VALUES (1,'2000-01-01 10:10:10',1,0,1,4,2,NULL),(2,'2016-11-25 14:14:07',1,1,2,4,3,'2016-11-25 14:14:07'),(3,'2000-01-01 10:10:10',1,1,3,4,4,'2017-01-01 10:10:15'),(4,'2000-01-01 10:10:10',1,1,2,4,8,'2016-05-01 10:10:15'),(5,'2000-01-01 10:10:10',1,1,1,4,9,'2000-01-01 10:10:15');
/*!40000 ALTER TABLE `pergunta_usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `perguntas`
--

DROP TABLE IF EXISTS `perguntas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `perguntas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) DEFAULT NULL,
  `respondida` tinyint(4) DEFAULT '0',
  `momento` datetime DEFAULT NULL,
  `ativo` tinyint(4) DEFAULT NULL,
  `usuario_id` int(11) NOT NULL,
  `local_id` int(11) NOT NULL,
  `visibilidade_id` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `fk_perguntas_usuario1_idx` (`usuario_id`),
  KEY `fk_perguntas_local1_idx` (`local_id`),
  KEY `fk_perguntas_1_idx` (`visibilidade_id`),
  CONSTRAINT `fk_perguntas_1` FOREIGN KEY (`visibilidade_id`) REFERENCES `visibilidade` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_perguntas_local1` FOREIGN KEY (`local_id`) REFERENCES `local` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_perguntas_usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `perguntas`
--

LOCK TABLES `perguntas` WRITE;
/*!40000 ALTER TABLE `perguntas` DISABLE KEYS */;
INSERT INTO `perguntas` VALUES (4,'2',1,'2016-11-24 15:38:41',1,2,1,1),(5,'dasdas',0,'2016-11-16 16:52:53',1,1,1,1),(6,'dasdas2',0,'2016-11-16 16:52:54',1,1,1,1),(7,'dasdas23',0,'2016-11-16 16:52:55',1,1,1,1),(8,'zzz',0,'2016-11-16 16:53:02',1,1,2,1),(9,'zzz333',0,'2016-11-16 16:53:03',1,1,2,1),(10,'Ola',0,'2016-11-21 15:28:39',1,2,2,1),(11,'Ola1',0,'2016-11-21 15:28:40',1,2,2,1),(12,'Ola12',0,'2016-11-21 15:28:42',1,2,2,1),(13,'dasdasdsa',1,'2016-11-23 12:51:55',1,4,2,1),(14,'dasdasdsa',0,'2016-11-22 16:08:07',1,4,1,1),(15,'1',0,'2016-11-23 13:29:18',1,2,2,1),(16,'2',0,'2016-11-23 13:29:21',1,2,2,1),(17,'3',0,'2016-11-23 13:29:22',1,2,2,1),(18,'1',0,'2016-11-24 15:30:32',1,1,2,3),(19,'131231',0,'2016-11-24 15:31:01',1,1,1,3),(20,'131231',0,'2016-11-24 15:31:12',1,1,1,3),(21,'131231',0,'2016-11-24 15:31:41',1,1,1,1),(22,'teste1',0,'2016-11-10 15:32:30',1,1,2,1),(23,'teste1',0,'2016-11-10 15:32:36',1,1,2,1),(24,'teste1',0,'2016-11-24 15:33:08',1,1,2,3),(25,'teste1',0,'2016-11-24 15:33:28',1,1,2,1),(26,'teste1',0,'2016-11-24 15:34:46',1,1,2,1),(27,'teste1',0,'2016-11-24 15:35:05',1,1,2,2),(28,'teste1',0,'2016-11-24 15:35:18',1,1,2,1),(29,'teste1',0,'2016-11-24 15:35:55',1,1,2,3);
/*!40000 ALTER TABLE `perguntas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `respostas`
--

DROP TABLE IF EXISTS `respostas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `respostas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) DEFAULT NULL,
  `endereco` varchar(255) DEFAULT NULL,
  `check_in` tinyint(4) DEFAULT NULL,
  `visibilidade_id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `perguntas_id` int(11) NOT NULL,
  `ativo` tinyint(4) DEFAULT NULL,
  `momento` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_respostas_usuario1_idx` (`usuario_id`),
  KEY `fk_respostas_perguntas1_idx` (`perguntas_id`),
  KEY `fk_respostas_1_idx` (`visibilidade_id`),
  CONSTRAINT `fk_respostas_1` FOREIGN KEY (`visibilidade_id`) REFERENCES `visibilidade` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_respostas_perguntas1` FOREIGN KEY (`perguntas_id`) REFERENCES `perguntas` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_respostas_usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `respostas`
--

LOCK TABLES `respostas` WRITE;
/*!40000 ALTER TABLE `respostas` DISABLE KEYS */;
INSERT INTO `respostas` VALUES (2,'11',NULL,0,1,1,4,1,'2016-11-24 15:36:45'),(3,'11',NULL,1,1,1,4,1,'2016-11-24 15:37:27'),(4,'11',NULL,1,1,1,4,1,'2016-11-24 15:37:29'),(5,'11',NULL,1,1,1,4,1,'2016-11-24 15:37:35'),(6,'11',NULL,1,3,1,4,1,'2016-11-24 15:37:36'),(7,'11',NULL,1,3,1,4,1,'2016-11-24 15:37:36'),(8,'11',NULL,1,3,1,4,1,'2016-11-24 15:37:36'),(9,'11',NULL,1,3,12,4,1,'2016-11-24 15:37:36'),(10,'11',NULL,1,3,1,4,1,'2016-11-24 15:37:36'),(11,'11',NULL,1,3,1,4,1,'2016-11-24 15:37:37'),(12,'11',NULL,1,3,5,4,1,'2016-11-24 15:37:37'),(13,'11',NULL,1,3,1,4,1,'2016-11-24 15:37:37'),(14,'11',NULL,1,3,4,4,1,'2016-11-24 15:37:37'),(15,'113',NULL,0,2,3,4,1,'2016-11-24 15:38:18'),(16,'113','HTTP://172.17.0.2/Quickpeek//file/imagem/img/tKi-2016-11-24-15-38-32.png',0,2,2,4,1,'2016-11-24 15:38:32'),(17,NULL,'HTTP://172.17.0.2/Quickpeek//file/imagem/img/K2Q-2016-11-24-15-38-41.png',0,2,1,4,1,'2016-11-24 15:38:41');
/*!40000 ALTER TABLE `respostas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `respostas_visualizadas`
--

DROP TABLE IF EXISTS `respostas_visualizadas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `respostas_visualizadas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `momento` datetime DEFAULT NULL,
  `ativo` tinyint(4) DEFAULT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `respostas_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_respostas_visualizadas_1_idx` (`usuario_id`),
  KEY `fk_respostas_visualizadas_2_idx` (`respostas_id`),
  CONSTRAINT `fk_respostas_visualizadas_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_respostas_visualizadas_2` FOREIGN KEY (`respostas_id`) REFERENCES `respostas` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `respostas_visualizadas`
--

LOCK TABLES `respostas_visualizadas` WRITE;
/*!40000 ALTER TABLE `respostas_visualizadas` DISABLE KEYS */;
INSERT INTO `respostas_visualizadas` VALUES (1,NULL,1,1,2),(2,NULL,1,1,2),(3,NULL,1,1,3);
/*!40000 ALTER TABLE `respostas_visualizadas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seguir`
--

DROP TABLE IF EXISTS `seguir`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `seguir` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `momento` datetime DEFAULT NULL,
  `ativo` tinyint(4) DEFAULT NULL,
  `usuario_id` int(11) NOT NULL,
  `usuario_seguir_id` int(11) NOT NULL,
  `confirmar_seguir` tinyint(4) DEFAULT '0',
  `momento_confirmar_seguir` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_seguir_usuario2_idx` (`usuario_seguir_id`),
  KEY `fk_seguir_usuario1_idx` (`usuario_id`),
  CONSTRAINT `fk_seguir_usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_seguir_usuario2` FOREIGN KEY (`usuario_seguir_id`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seguir`
--

LOCK TABLES `seguir` WRITE;
/*!40000 ALTER TABLE `seguir` DISABLE KEYS */;
INSERT INTO `seguir` VALUES (1,'2016-11-08 16:37:31',1,4,1,1,'2016-11-08 16:37:31'),(2,'2016-11-09 14:01:11',1,3,1,1,NULL),(3,'2016-11-09 14:16:51',1,3,2,1,NULL),(4,'2016-11-09 14:25:26',1,1,3,1,NULL),(5,'2016-11-11 16:19:05',1,3,5,1,NULL),(7,'2016-11-11 16:19:05',1,9,11,1,NULL),(8,'2016-11-11 16:19:05',1,11,10,1,NULL),(9,'2016-11-22 15:10:14',1,2,4,1,'2016-11-22 15:10:14'),(10,'2016-11-28 16:39:04',0,19,5,1,'0000-00-00 00:00:00'),(11,'2016-11-28 16:40:15',0,19,8,0,NULL),(12,'2016-11-28 16:42:34',0,19,5,0,NULL),(13,'2016-11-28 16:42:36',0,19,8,0,NULL),(14,'2016-11-28 16:42:53',0,19,8,0,NULL),(15,'2016-11-28 16:43:09',0,19,8,0,NULL),(16,'2016-11-28 16:43:49',0,19,8,1,'2016-11-28 16:43:49'),(17,'2016-11-28 16:46:37',0,19,8,1,'2016-11-28 16:46:37'),(18,'2016-11-28 16:48:43',0,19,8,0,NULL),(19,'2016-11-28 16:50:01',1,19,8,1,'2016-11-28 16:50:01'),(20,'2016-11-29 16:51:43',1,22,1,1,'2016-11-29 16:51:43'),(21,'2016-11-29 16:51:45',1,22,2,1,'2016-11-29 16:51:45'),(22,'2016-11-29 16:51:46',1,22,3,0,NULL),(23,'2016-11-29 16:51:47',1,22,4,0,NULL),(24,'2016-11-29 16:51:49',1,22,5,0,NULL),(25,'2016-11-29 16:51:54',1,22,6,0,NULL),(26,'2016-11-29 16:51:57',1,22,7,0,NULL),(30,'2016-11-29 16:51:43',1,1,22,1,NULL),(31,'2016-11-29 16:51:43',1,1,2,1,'2016-11-29 16:51:43');
/*!40000 ALTER TABLE `seguir` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessaobanco`
--

DROP TABLE IF EXISTS `sessaobanco`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sessaobanco` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `momento` datetime DEFAULT NULL,
  `ativo` tinyint(4) DEFAULT NULL,
  `codigo` varchar(255) DEFAULT NULL,
  `dados_sessao` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessaobanco`
--

LOCK TABLES `sessaobanco` WRITE;
/*!40000 ALTER TABLE `sessaobanco` DISABLE KEYS */;
INSERT INTO `sessaobanco` VALUES (1,'2016-12-06 15:30:01',1,'fe8GSFNIdSKto9kohzfU1U7guEj6VdCVqVw9dkaitwVvMX0oIAWwq5cTONJOU2CgM8b76wXiFtzW2NGNGvD6gK2MgMmDSIyLVXF9','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"5\",\"local\":\"1\"},\"locaisNotIn\":[\"2\",\"1\"],\"codSess\":\"fe8GSFNIdSKto9kohzfU1U7guEj6VdCVqVw9dkaitwVvMX0oIAWwq5cTONJOU2CgM8b76wXiFtzW2NGNGvD6gK2MgMmDSIyLVXF9\",\"idSess\":\"1\"}'),(2,'2016-12-06 15:31:05',1,'U6Asmx3ApQCNcHzRQsKsnTnuWETbyx3CqABlBc035lNenMdx9WIUfqa5xAKvyPJJT1llXa03xRSXcxcm2wdqCrVWu4S5AyXllaaV','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"5\",\"local\":\"1\"},\"locaisNotIn\":[\"2\",\"1\"],\"codSess\":\"U6Asmx3ApQCNcHzRQsKsnTnuWETbyx3CqABlBc035lNenMdx9WIUfqa5xAKvyPJJT1llXa03xRSXcxcm2wdqCrVWu4S5AyXllaaV\",\"idSess\":\"2\"}'),(3,'2016-12-06 15:36:53',1,'DXvaKpRiS1ElRxkEYS7G6SYTJvaECC5BsBzO7xYEi0P7qy19P5pPUtGltMqssO4Hd0QWzWRjc8J98dPj3Vk4FjWIZin5OEozrulh','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"5\",\"local\":\"1\"},\"locaisNotIn\":[\"2\",\"1\"],\"codSess\":\"DXvaKpRiS1ElRxkEYS7G6SYTJvaECC5BsBzO7xYEi0P7qy19P5pPUtGltMqssO4Hd0QWzWRjc8J98dPj3Vk4FjWIZin5OEozrulh\",\"idSess\":\"3\"}'),(4,'2016-12-06 15:36:55',1,'k7MqyR3lW989BavcxKbJg3cPYWElAEOwOrwVGsrHw7onfKAl5824VBI34X4gvppuAMT4CMSRnrcMINvBHigwy1sIT6kk8NcRyYAM','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"5\",\"local\":\"1\"},\"locaisNotIn\":[\"2\",\"1\"],\"codSess\":\"k7MqyR3lW989BavcxKbJg3cPYWElAEOwOrwVGsrHw7onfKAl5824VBI34X4gvppuAMT4CMSRnrcMINvBHigwy1sIT6kk8NcRyYAM\",\"idSess\":\"4\"}'),(5,'2016-12-06 15:37:06',1,'dhiJ3XE3vXsp10S8El2OoMkeB163j7sLNK2R9FwcnPU6hZUVGCpoppZ0KSg8tyUNq3A5EwJQaLq5jWaHvhYxNG0wlMVWfDsj46a8','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"1\",\"local\":\"1\"},\"locaisNotIn\":[\"2\",\"1\"],\"codSess\":\"dhiJ3XE3vXsp10S8El2OoMkeB163j7sLNK2R9FwcnPU6hZUVGCpoppZ0KSg8tyUNq3A5EwJQaLq5jWaHvhYxNG0wlMVWfDsj46a8\",\"idSess\":\"5\"}'),(6,'2016-12-06 15:39:43',1,'XxNtffPONS6UuGi7DQDjfX4pCzIDDbDi75QY7Qu3kqO3haQCowfKbZZm6AAuPlSctwQJjHdfUHO2HjQU6ok9Srbq5ATujwj7LHcl','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"1\",\"local\":\"1\"},\"locaisNotIn\":[\"2\",\"1\"],\"codSess\":\"XxNtffPONS6UuGi7DQDjfX4pCzIDDbDi75QY7Qu3kqO3haQCowfKbZZm6AAuPlSctwQJjHdfUHO2HjQU6ok9Srbq5ATujwj7LHcl\",\"idSess\":\"6\"}'),(18,'2016-12-06 16:38:38',1,'Gf9IG5vqLOG7OzAMCL3UwRqW0ZCV9HnGgbGnOClnJeiuyUUWtzXYqVUAI1BbdkK6chRFhyFZcCG4B45SCK2wClvBVT4oauAAXX4k','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"locaisNotIn\":[\"1\",\"2\"],\"codSess\":\"Gf9IG5vqLOG7OzAMCL3UwRqW0ZCV9HnGgbGnOClnJeiuyUUWtzXYqVUAI1BbdkK6chRFhyFZcCG4B45SCK2wClvBVT4oauAAXX4k\",\"idSess\":\"18\"}'),(19,'2016-12-06 16:40:52',1,'KzEc81KwT43OddtUU3jfQUXUatXeixdtk3UKD5lpb3wRgS1xN5owhtOesbNpwoaukFIc0ER89y0sOLMsNFKbN0pUaeNT5TLD1RpM','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"locaisNotIn\":null,\"codSess\":\"KzEc81KwT43OddtUU3jfQUXUatXeixdtk3UKD5lpb3wRgS1xN5owhtOesbNpwoaukFIc0ER89y0sOLMsNFKbN0pUaeNT5TLD1RpM\",\"idSess\":\"19\"}'),(20,'2016-12-06 16:41:24',1,'z5SxRibjUs7Q8YHX6GPY8PNXD8vV0LJQn5OmzlNkQgt5dAxPweEPDxdTNlAFOGX0ay4DbIVjyPmMzEeVPlAK7Lrrw1jd87du8VNr','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"locaisNotIn\":null,\"codSess\":\"z5SxRibjUs7Q8YHX6GPY8PNXD8vV0LJQn5OmzlNkQgt5dAxPweEPDxdTNlAFOGX0ay4DbIVjyPmMzEeVPlAK7Lrrw1jd87du8VNr\",\"idSess\":\"20\"}'),(25,'2016-12-06 16:44:49',1,'kqxbMrRzEwAcRzS5ROTTFggab3IadVHkoLGlODUsLFaFIOCB2PWZ4F9RLJSOf7FrdnQEVpMJlhREJsBbMC3PskgG3KOi3YXVEaiC','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"locaisNotIn\":[\"1\",\"2\"],\"codSess\":\"kqxbMrRzEwAcRzS5ROTTFggab3IadVHkoLGlODUsLFaFIOCB2PWZ4F9RLJSOf7FrdnQEVpMJlhREJsBbMC3PskgG3KOi3YXVEaiC\",\"idSess\":\"25\"}'),(26,'2016-12-06 16:45:32',1,'PwB37ZpyZrNtgFuDJWShzLfftMfKRPAf0VydEZi0cp7Zuz4nzeogvFlAHV6aM5Vk5NUT80TReFs75CBzhqlxUlM8l4UMm8TFhrVl','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"locaisNotIn\":[\"1\",\"2\"],\"codSess\":\"PwB37ZpyZrNtgFuDJWShzLfftMfKRPAf0VydEZi0cp7Zuz4nzeogvFlAHV6aM5Vk5NUT80TReFs75CBzhqlxUlM8l4UMm8TFhrVl\",\"idSess\":\"26\"}'),(27,'2016-12-06 16:45:34',1,'uuTxYwx5ftUohj5AYvGRjjxxQkIRfqoQ3bdwjkODlmHTP1g9FyNB14Vto6fqB3x5UNKvwBfI68g2anopqfxpGYmt8kSCKadk1Hqw','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"locaisNotIn\":[\"1\",\"2\"],\"codSess\":\"uuTxYwx5ftUohj5AYvGRjjxxQkIRfqoQ3bdwjkODlmHTP1g9FyNB14Vto6fqB3x5UNKvwBfI68g2anopqfxpGYmt8kSCKadk1Hqw\",\"idSess\":\"27\"}'),(28,'2016-12-06 16:45:34',1,'VhJrmGqA4ZGvSB3ocH2vq1etXp4MjHI2O8kVY3enE0C74Sg150bK7ljkLStxEr6UxKPdWcmXphHzaU1mHVSd4fzv3oQGsBsl8yqu','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"locaisNotIn\":[\"1\",\"2\"],\"codSess\":\"VhJrmGqA4ZGvSB3ocH2vq1etXp4MjHI2O8kVY3enE0C74Sg150bK7ljkLStxEr6UxKPdWcmXphHzaU1mHVSd4fzv3oQGsBsl8yqu\",\"idSess\":\"28\"}'),(29,'2016-12-06 16:45:48',1,'RzfFpEyHsr1Z46x0OLj5RpXR7C5kmb15w9w1nBj9Ozlyyv7jatUhdES0OMlJg0pc5YTJgB6vnuJ6dwhnN4n1l8NbbToe4hwuakpk','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"1\",\"local\":\"1\"},\"locaisNotIn\":[\"1\",\"2\"],\"codSess\":\"RzfFpEyHsr1Z46x0OLj5RpXR7C5kmb15w9w1nBj9Ozlyyv7jatUhdES0OMlJg0pc5YTJgB6vnuJ6dwhnN4n1l8NbbToe4hwuakpk\",\"idSess\":\"29\"}'),(31,'2016-12-06 16:47:48',1,'xDs0SBi1Ax1NNbhPwpkXl7pvtEAr5cy9vADgqgrw1LEAWs2HbXzOR9Ocyxfpi3Htcl2Grdjp2bcR5efsKGUHkoTckY3hR44OW4VB','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"1\",\"local\":\"1\"},\"locaisNotIn\":[\"2\",\"1\"],\"codSess\":\"xDs0SBi1Ax1NNbhPwpkXl7pvtEAr5cy9vADgqgrw1LEAWs2HbXzOR9Ocyxfpi3Htcl2Grdjp2bcR5efsKGUHkoTckY3hR44OW4VB\",\"idSess\":\"31\"}'),(32,'2016-12-06 16:47:48',1,'9veXdtcQcGxA243yDHLkGqwud65Fv7eePaXGnnHMsnJHvDz1YkEbvovFPt0h4iFe9y432fhRHF6bPLHbnlFpP6IS8BmhDU6uAc4A','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"1\",\"local\":\"1\"},\"locaisNotIn\":[\"2\",\"1\"],\"codSess\":\"9veXdtcQcGxA243yDHLkGqwud65Fv7eePaXGnnHMsnJHvDz1YkEbvovFPt0h4iFe9y432fhRHF6bPLHbnlFpP6IS8BmhDU6uAc4A\",\"idSess\":\"32\"}'),(33,'2016-12-06 16:47:49',1,'HG8MMzH0fN7cnPhy8lQ6w2LI0YR7gaAWGNT2NGMah5IXLuTqygLBzrbkNK646R9OgYdJiXbzAWaeQbnR6WRpXdU2T1Pkh1LcJNtx','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"1\",\"local\":\"1\"},\"locaisNotIn\":[\"2\",\"1\"],\"codSess\":\"HG8MMzH0fN7cnPhy8lQ6w2LI0YR7gaAWGNT2NGMah5IXLuTqygLBzrbkNK646R9OgYdJiXbzAWaeQbnR6WRpXdU2T1Pkh1LcJNtx\",\"idSess\":\"33\"}'),(34,'2016-12-06 16:47:49',1,'X158e5bnekrEqBNmJHPfEdrVXjI4itk5r1KGoFgsYUO0Luom5XCItol4SWKI8fIrLgXwNnEMMLerLeB0ljTtJc0AYKH42DII0THz','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"1\",\"local\":\"1\"},\"locaisNotIn\":[\"2\",\"1\"],\"codSess\":\"X158e5bnekrEqBNmJHPfEdrVXjI4itk5r1KGoFgsYUO0Luom5XCItol4SWKI8fIrLgXwNnEMMLerLeB0ljTtJc0AYKH42DII0THz\",\"idSess\":\"34\"}'),(35,'2016-12-06 16:47:49',1,'ItzYkutlEewjWv9PrcuFYroeOQlK6qQIhlThdFWvk2xfLXchqYnlEKW2zS5fYd6D2ZxwWSzT32MwGPDfiUZE3eE0u5AvAHGPIVen','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"1\",\"local\":\"1\"},\"locaisNotIn\":[\"2\",\"1\"],\"codSess\":\"ItzYkutlEewjWv9PrcuFYroeOQlK6qQIhlThdFWvk2xfLXchqYnlEKW2zS5fYd6D2ZxwWSzT32MwGPDfiUZE3eE0u5AvAHGPIVen\",\"idSess\":\"35\"}'),(36,'2016-12-06 16:47:53',1,'lW3kgkLfVaaIpxrYAM8TldibzCIljnaSNvJHe2GdSqHSKJSLrOTOtSPiwwHEivbqojsOcE3TIEVoIKBpLWH8O6e8jGzg9JIdwFD7','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"1\",\"local\":\"1\"},\"locaisNotIn\":[\"2\",\"1\"],\"codSess\":\"lW3kgkLfVaaIpxrYAM8TldibzCIljnaSNvJHe2GdSqHSKJSLrOTOtSPiwwHEivbqojsOcE3TIEVoIKBpLWH8O6e8jGzg9JIdwFD7\",\"idSess\":\"36\"}'),(37,'2016-12-06 16:47:58',1,'Zxq8IPlheeijDeBz81QZdrxoYheAyDlbICB7BGlJWeoubYn3xVOtbGyr4auaAHWT5dMT3U8y3qiFB9JFibZi6ZLAgqBHS5aB7lLf','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"1\",\"local\":\"1\"},\"locaisNotIn\":[\"2\",\"1\"],\"codSess\":\"Zxq8IPlheeijDeBz81QZdrxoYheAyDlbICB7BGlJWeoubYn3xVOtbGyr4auaAHWT5dMT3U8y3qiFB9JFibZi6ZLAgqBHS5aB7lLf\",\"idSess\":\"37\"}'),(38,'2016-12-06 16:48:04',1,'3bPQofvXf0s8V7jIO11xey4Z6gYOMrECnUad7dbJ1SBeK6FcFwnE4cXztE41nW5GEBRzBhT0Gw0OZCBmU0HNtUIZ7Ew3ZaAGq8Yj','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"1\",\"local\":\"1\"},\"locaisNotIn\":[\"2\",\"1\"],\"codSess\":\"3bPQofvXf0s8V7jIO11xey4Z6gYOMrECnUad7dbJ1SBeK6FcFwnE4cXztE41nW5GEBRzBhT0Gw0OZCBmU0HNtUIZ7Ew3ZaAGq8Yj\",\"idSess\":\"38\"}'),(39,'2016-12-06 16:48:23',1,'Ds1T3M8a7SivmqgKsm2lGjnfPFRWM7zCkTAlTr3c8BqVovzV09yrdgCfK4CX3cCJGE0JSbWolJB2ii20gnQuYwDR5ZvLtCEGNrFZ','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"locaisNotIn\":[\"1\",\"2\"],\"codSess\":\"Ds1T3M8a7SivmqgKsm2lGjnfPFRWM7zCkTAlTr3c8BqVovzV09yrdgCfK4CX3cCJGE0JSbWolJB2ii20gnQuYwDR5ZvLtCEGNrFZ\",\"idSess\":\"39\"}'),(40,'2016-12-06 16:48:47',1,'zPD8FwhhTwOnRHTwB9h1n1EFh3LYugrn19iKqcknHGRoT7hJBjQGhrAG3RjEzeWUsDIYkVIYFqYPerYaor0o4dGDuRda3YbuYwwN','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"locaisNotIn\":[\"1\",\"2\"],\"codSess\":\"zPD8FwhhTwOnRHTwB9h1n1EFh3LYugrn19iKqcknHGRoT7hJBjQGhrAG3RjEzeWUsDIYkVIYFqYPerYaor0o4dGDuRda3YbuYwwN\",\"idSess\":\"40\"}'),(41,'2016-12-06 16:48:47',1,'DoMNs1ONKN0mVXQmIknTqLcEIplug6oFTxnAQ3JgzlXS6B3kbwEPmVRzuHoz4zmMhXfyKo5bRxQqQX9ZaJ2kYz3SZkymoVrU8Iap','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"locaisNotIn\":[\"1\",\"2\"],\"codSess\":\"DoMNs1ONKN0mVXQmIknTqLcEIplug6oFTxnAQ3JgzlXS6B3kbwEPmVRzuHoz4zmMhXfyKo5bRxQqQX9ZaJ2kYz3SZkymoVrU8Iap\",\"idSess\":\"41\"}'),(42,'2016-12-06 16:48:47',1,'pstB7lGGfuHrhFyENEBLwAQofDb1bKXafzjH2HR5Rvkw74vjFCjXsP9N0yQRUotmjfDodcF0AG2te7v7ORpBXGia45HWpOeK24Zh','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"locaisNotIn\":[\"1\",\"2\"],\"codSess\":\"pstB7lGGfuHrhFyENEBLwAQofDb1bKXafzjH2HR5Rvkw74vjFCjXsP9N0yQRUotmjfDodcF0AG2te7v7ORpBXGia45HWpOeK24Zh\",\"idSess\":\"42\"}'),(43,'2016-12-06 16:48:48',1,'qc6Oln92p3OsGx18xXYXG3Xi0oyeLRlsCoBoZbiKiOoHbXV9pIu6Gd4yUb38Z2blebM8heE1PSOF0cvKevSuO2n2FYzcjSLLSrrc','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"locaisNotIn\":[\"1\",\"2\"],\"codSess\":\"qc6Oln92p3OsGx18xXYXG3Xi0oyeLRlsCoBoZbiKiOoHbXV9pIu6Gd4yUb38Z2blebM8heE1PSOF0cvKevSuO2n2FYzcjSLLSrrc\",\"idSess\":\"43\"}'),(44,'2016-12-06 16:48:48',1,'vRLXGb79LIU5ai1SdcPl9MV4z6zVFLHlWunjb8wLci1jDUBxnikksQEUFEECqQjzm0tZHtncELyRORMu4kjebZdYM813JLOv9o0Q','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"locaisNotIn\":[\"1\",\"2\"],\"codSess\":\"vRLXGb79LIU5ai1SdcPl9MV4z6zVFLHlWunjb8wLci1jDUBxnikksQEUFEECqQjzm0tZHtncELyRORMu4kjebZdYM813JLOv9o0Q\",\"idSess\":\"44\"}'),(45,'2016-12-06 16:48:49',1,'2afY97GOymp0GLhHHx5CtCF0Dcc7fdHxT9IkqQG3u1K3adQyIh8hZ6kdkjUWMPuIwtgpsEaXOtOuz8QCPBy1xb8kwVqNWxd5mOyX','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"locaisNotIn\":[\"1\",\"2\"],\"codSess\":\"2afY97GOymp0GLhHHx5CtCF0Dcc7fdHxT9IkqQG3u1K3adQyIh8hZ6kdkjUWMPuIwtgpsEaXOtOuz8QCPBy1xb8kwVqNWxd5mOyX\",\"idSess\":\"45\"}'),(46,'2016-12-06 16:48:49',1,'UMhdg6p2VTjc8NWA0n1z2ba70BKWPRX8Pks1oR623dLfxD62HBIjJhGpw7MVWZS726uDkpQhM5nqJpjQgLi1xgLbKjo6Lrhnqa6E','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"locaisNotIn\":[\"1\",\"2\"],\"codSess\":\"UMhdg6p2VTjc8NWA0n1z2ba70BKWPRX8Pks1oR623dLfxD62HBIjJhGpw7MVWZS726uDkpQhM5nqJpjQgLi1xgLbKjo6Lrhnqa6E\",\"idSess\":\"46\"}'),(47,'2016-12-06 16:48:49',1,'Fc5wNG2vAEJo1azkEjHcnkrp3k5Wh00znzmEwDLdGG43I9NSYYAuqpnvjyHqgJwXppgnzEM8Py1Tx6bl9ZpmUPA9I29RqrF7KCgB','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"locaisNotIn\":[\"1\",\"2\"],\"codSess\":\"Fc5wNG2vAEJo1azkEjHcnkrp3k5Wh00znzmEwDLdGG43I9NSYYAuqpnvjyHqgJwXppgnzEM8Py1Tx6bl9ZpmUPA9I29RqrF7KCgB\",\"idSess\":\"47\"}'),(48,'2016-12-06 16:48:53',1,'46l6xtKErNpb7fUY85O4J7MML9hRF3pIOzC6IeuaG4m18fzSX9vcnduBT2iOh5xsmVneZ4mAeuwFi30r171VfLJExzBOGzfOnqpR','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"1\",\"local\":\"1\"},\"locaisNotIn\":null,\"codSess\":\"46l6xtKErNpb7fUY85O4J7MML9hRF3pIOzC6IeuaG4m18fzSX9vcnduBT2iOh5xsmVneZ4mAeuwFi30r171VfLJExzBOGzfOnqpR\",\"idSess\":\"48\"}'),(66,'2016-12-06 16:53:31',1,'kZiy1QTbp80uAyQgDzhr558N2kUEK756Qwc7hhLVALzoVdkM7fhcmVl4MNDnQFjSRgUiROdr2I0A2FjswjAQoJXiGVzm1lLFnZ4r','{\"codSess\":\"kZiy1QTbp80uAyQgDzhr558N2kUEK756Qwc7hhLVALzoVdkM7fhcmVl4MNDnQFjSRgUiROdr2I0A2FjswjAQoJXiGVzm1lLFnZ4r\",\"idSess\":\"66\",\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"locaisNotIn\":[\"1\",\"2\"]}'),(67,'2016-12-06 18:48:26',1,'nPatEmXqD49CO5DfwlCd9TvSQ04QJrxUhvh5kQNraMtBTeGtSIp26Leq3OugSm4447IcIvsbrpnSPbjcosJy9SffoJRo81CUMKFe','{\"codSess\":\"nPatEmXqD49CO5DfwlCd9TvSQ04QJrxUhvh5kQNraMtBTeGtSIp26Leq3OugSm4447IcIvsbrpnSPbjcosJy9SffoJRo81CUMKFe\",\"idSess\":\"67\"}'),(68,'2016-12-06 18:53:38',1,'dlpaJdwFIL1XARaICsKZ6GJYmcbWP1NLmT4rNnOqEeTz79RmWkcYSdBuCFJ1M1ZOWGIe2wSvvWgjtTR9TrxgNUAwSh6FAtqGX96r','{\"codSess\":\"dlpaJdwFIL1XARaICsKZ6GJYmcbWP1NLmT4rNnOqEeTz79RmWkcYSdBuCFJ1M1ZOWGIe2wSvvWgjtTR9TrxgNUAwSh6FAtqGX96r\",\"idSess\":\"68\"}');
/*!40000 ALTER TABLE `sessaobanco` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sms_codigo`
--

DROP TABLE IF EXISTS `sms_codigo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sms_codigo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `codigo` varchar(255) DEFAULT NULL,
  `telefone` varchar(255) DEFAULT NULL,
  `status_sms_id` int(11) NOT NULL,
  `ativo` tinyint(4) DEFAULT NULL,
  `momento` datetime DEFAULT NULL,
  `confirmado` tinyint(4) DEFAULT '0',
  `editando` tinyint(4) DEFAULT '0',
  `usuario_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_sms_codigo_1_idx` (`status_sms_id`),
  KEY `fk_sms_codigo_2_idx` (`usuario_id`),
  CONSTRAINT `fk_sms_codigo_1` FOREIGN KEY (`status_sms_id`) REFERENCES `status_sms` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_sms_codigo_2` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sms_codigo`
--

LOCK TABLES `sms_codigo` WRITE;
/*!40000 ALTER TABLE `sms_codigo` DISABLE KEYS */;
INSERT INTO `sms_codigo` VALUES (1,'cJmxpV','5532987072490',7,1,'2016-11-29 16:25:29',1,0,NULL),(2,'A5t4Rt','5532988888888',7,1,'2016-11-29 16:26:20',0,1,21),(7,'Ao8mvu','5532987072490',7,1,'2016-11-29 16:28:45',1,0,NULL),(8,'PqgWvZ','26656565',11,1,'2016-11-29 16:30:48',1,1,22),(9,'hY5QZf','55328987072940',4,1,'2016-12-02 15:36:13',0,0,NULL),(10,'k92KuC','123',11,1,'2016-12-02 18:01:16',1,1,1),(11,'MDbVZZ','123',11,1,'2016-12-02 18:04:02',1,0,NULL),(12,'aNDp2Q','147',11,1,'2016-12-02 18:05:34',1,0,NULL),(13,'Hw2JK1','123',11,1,'2016-12-02 18:14:57',1,0,NULL),(14,'ZTOaCR','12345',11,1,'2016-12-02 18:17:54',1,0,NULL),(15,'C4YagV','123456',11,1,'2016-12-02 18:19:09',1,0,NULL),(16,'Jm3FGR','159159',11,1,'2016-12-02 18:26:42',1,1,30),(17,'rIOhGN','159159',11,1,'2016-12-05 13:07:34',0,0,NULL),(18,'Pu3AWK','159159',11,1,'2016-12-05 13:07:51',1,0,NULL),(19,'ujV14L','321',4,1,'2016-12-05 13:09:06',1,0,NULL),(20,'rYf1dy','321',4,1,'2016-12-05 13:09:50',0,0,NULL),(21,'pvkTzB','321',4,1,'2016-12-05 13:10:35',1,0,NULL),(22,'z6ISua','11',11,1,'2016-12-05 13:11:37',1,1,33),(23,'YmPlrF','159159',11,1,'2016-12-05 13:14:24',0,0,NULL),(24,'I7cEUk','14789',11,1,'2016-12-05 13:14:38',1,0,NULL),(25,'vTXseg','10000',11,1,'2016-12-05 13:15:35',1,1,34),(26,'pigS9r','123',11,1,'2016-12-05 13:16:57',1,0,NULL);
/*!40000 ALTER TABLE `sms_codigo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status_mensagem`
--

DROP TABLE IF EXISTS `status_mensagem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `status_mensagem` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(45) DEFAULT NULL,
  `momento` datetime DEFAULT NULL,
  `ativo` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status_mensagem`
--

LOCK TABLES `status_mensagem` WRITE;
/*!40000 ALTER TABLE `status_mensagem` DISABLE KEYS */;
INSERT INTO `status_mensagem` VALUES (1,'Enviada','2016-11-11 17:43:10',1),(2,'Entregue','2016-11-11 17:43:10',1),(3,'Visualizada','2016-11-11 17:43:10',1);
/*!40000 ALTER TABLE `status_mensagem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status_sms`
--

DROP TABLE IF EXISTS `status_sms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `status_sms` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `codigo_mobi` varchar(45) DEFAULT NULL,
  `titulo` varchar(255) DEFAULT NULL,
  `ativo` tinyint(4) DEFAULT NULL,
  `momento` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status_sms`
--

LOCK TABLES `status_sms` WRITE;
/*!40000 ALTER TABLE `status_sms` DISABLE KEYS */;
INSERT INTO `status_sms` VALUES (1,'000','Mensagem enviada com sucesso',1,'2016-11-25 17:10:38'),(2,'X01 ou X02','Um ou mais parâmetros com erro',1,'2016-11-25 17:10:38'),(3,'001','Credencial inválida',1,'2016-11-25 17:10:38'),(4,'005','MOBILE com formato inválido',1,'2016-11-25 17:10:38'),(5,'007','SEND_PROJECT com formato inválido',1,'2016-11-25 17:10:38'),(6,'008','MESSAGE ou MESSAGE + NOME_PROJETO com mais de 160 posições ou SMS concatenado com mais de 1000 posições',1,'2016-11-25 17:10:38'),(7,'009','Créditos insuficientes em conta',1,'2016-11-25 17:10:38'),(8,'010','Gateway SMS da conta bloqueado',1,'2016-11-25 17:10:38'),(9,'012','MOBILE correto, porém com crítica',1,'2016-11-25 17:10:38'),(10,'013','Conteúdo da mensagem inválido ou vazio',1,'2016-11-25 17:10:38'),(11,'015','País de destino sem cobertura',1,'2016-11-25 17:10:38'),(12,'016','MOBILE com código de área inválido',1,'2016-11-25 17:10:38'),(13,'018','MOBILE se encontra em lista negra',1,'2016-11-25 17:10:38'),(14,'019','TOKEN inválido',1,'2016-11-25 17:10:38'),(15,'022','Conta atingiu o limite de envio do dia',1,'2016-11-25 17:10:38');
/*!40000 ALTER TABLE `status_sms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) DEFAULT NULL,
  `apelido` varchar(45) DEFAULT NULL,
  `endereco` varchar(255) DEFAULT NULL,
  `nascimento` date DEFAULT NULL,
  `telefone` varchar(45) DEFAULT NULL,
  `momento` datetime DEFAULT NULL,
  `ativo` tinyint(4) DEFAULT NULL,
  `avatares_id` int(11) NOT NULL,
  `genero_id` int(11) NOT NULL,
  `tutorial` tinyint(4) DEFAULT '0',
  `sms_codigo_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_usuario_genero_idx` (`genero_id`),
  KEY `fk_usuario_avatares1_idx` (`avatares_id`),
  KEY `fk_usuario_1_idx` (`sms_codigo_id`),
  CONSTRAINT `fk_usuario_1` FOREIGN KEY (`sms_codigo_id`) REFERENCES `sms_codigo` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_usuario_avatares1` FOREIGN KEY (`avatares_id`) REFERENCES `avatares` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_usuario_genero` FOREIGN KEY (`genero_id`) REFERENCES `genero` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'editado','1','HTTP://172.17.0.2/Quickpeek//file/imagem/img/qTa-2016-11-09-13-38-01.png','2000-01-01','123','2016-12-02 18:01:16',1,1,1,3,NULL),(2,'Teste2','teste2',NULL,'2000-01-01','3222222222','2016-11-08 16:09:07',1,1,1,0,NULL),(3,'Diego','user1','HTTP://172.17.0.2/Quickpeek//file/imagem/img/qTa-2016-11-09-13-38-01.png','2000-01-01','123123112313','2016-11-09 13:38:01',1,1,1,0,NULL),(4,'editado','1',NULL,'2000-01-01','123123112313','2016-11-09 15:37:33',1,1,1,0,NULL),(5,'Diego','1','HTTP://172.17.0.2/Quickpeek//file/imagem/img/B35-2016-11-09-16-16-23.png','2000-01-01','123123112313','2016-11-09 16:16:23',1,1,1,0,NULL),(6,'guilherme','ajkdasd',NULL,'2000-01-01','123123112313','2016-11-09 16:54:22',1,2,1,0,NULL),(7,'Diegu','dieguteste','HTTP://172.17.0.2/Quickpeek//file/imagem/img/Tpm-2016-11-09-17-14-46.png','2000-02-12','123123112313','2016-11-09 17:14:46',1,1,1,0,NULL),(8,'1','1',NULL,'2000-01-01','123123112313','2016-11-10 13:22:39',1,1,1,0,NULL),(9,'1','1',NULL,'2000-01-01','123123112313','2016-11-10 17:29:42',1,1,1,0,NULL),(10,'Diego','user1',NULL,'2000-01-01','123123112313','2016-11-11 14:30:10',1,1,1,1,NULL),(11,'Diego','user1',NULL,'2000-01-01','123123112313','2016-11-11 16:11:55',1,1,1,0,NULL),(12,'Diego','user1',NULL,'2000-01-01','123123112313','2016-11-11 17:36:17',1,1,1,0,NULL),(13,'Diego','1',NULL,'2000-01-01','123123112313','2016-11-14 13:35:54',1,1,1,0,NULL),(14,'a','1','HTTP://172.17.0.2/Quickpeek//file/imagem/img/GgN-2016-11-21-16-50-13.png','2000-01-01','123123112313','2016-11-21 16:50:13',1,1,1,0,NULL),(15,'Usuario1','diego','HTTP://172.17.0.2/Quickpeek//file/imagem/img/KAu-2016-11-25-16-23-04.png','2000-07-09','1234567892','2016-11-25 16:23:04',1,1,1,0,NULL),(16,'Diego','471','HTTP://172.17.0.2/Quickpeek//file/imagem/img/lNW-2016-11-28-15-18-11.png','2000-01-01','32987072490','2016-11-28 15:18:11',1,1,1,0,NULL),(17,'Diego','471','HTTP://172.17.0.2/Quickpeek//file/imagem/img/DE8-2016-11-28-15-18-27.png','2000-01-01','32987072490','2016-11-28 15:35:12',1,1,1,6,19),(19,'editado','22','HTTP://172.17.0.2/Quickpeek//file/imagem/img/8eV-2016-11-28-16-37-28.png','2000-07-18','5532987072490','2016-11-28 16:37:40',1,2,1,4,21),(20,'Diego1','diego','HTTP://172.17.0.2/Quickpeek//file/imagem/img/TFb-2016-11-29-16-12-46.png','2000-01-01','15532987072490','2016-11-29 16:12:46',1,2,1,0,39),(21,'Diego','diego',NULL,'2000-07-17','5532988888888','2016-11-29 16:26:53',1,2,1,0,1),(22,'dadsa','dasda',NULL,'2000-01-01','26656565','2016-11-29 16:30:48',1,1,1,0,7),(23,'1','1',NULL,'2000-01-01','123123112313','2016-12-01 16:31:22',1,1,1,0,NULL),(24,'159159','15915',NULL,'2000-01-01','21695165','2016-12-02 18:06:20',1,1,1,0,12),(26,'159159','15915',NULL,'2000-01-01','21695165','2016-12-02 18:12:14',1,1,1,0,12),(27,'159159','15915',NULL,'2000-01-01','21695165','2016-12-02 18:13:54',1,1,1,0,12),(28,'aaa','aaa','HTTP://172.17.0.2/Quickpeek//file/imagem/img/JKt-2016-12-02-18-15-28.png','2000-01-01','123','2016-12-02 18:15:28',1,1,1,0,13),(29,'aaa','a',NULL,'2000-01-01','12345','2016-12-02 18:18:06',1,1,1,0,14),(30,'2','2',NULL,'2000-01-01','159159','2016-12-02 18:26:42',1,2,2,0,15),(31,'aaadsdsds','aaaas',NULL,'2000-01-01','159159','2016-12-05 13:08:01',1,2,2,0,18),(32,'dasdsa','dasda',NULL,'2000-01-01','321','2016-12-05 13:09:13',1,1,1,0,19),(33,'adsdasda','aa',NULL,'2000-01-01','11','2016-12-05 13:11:37',1,1,1,0,21),(34,'adsad','asda',NULL,'2000-01-01','10000','2016-12-05 13:15:35',1,1,1,0,24);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `visibilidade`
--

DROP TABLE IF EXISTS `visibilidade`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `visibilidade` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `momento` datetime DEFAULT NULL,
  `ativo` tinyint(4) DEFAULT NULL,
  `titulo` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visibilidade`
--

LOCK TABLES `visibilidade` WRITE;
/*!40000 ALTER TABLE `visibilidade` DISABLE KEYS */;
INSERT INTO `visibilidade` VALUES (1,'2016-11-08 14:21:10',1,'Qualquer pessoa'),(2,'2016-11-08 14:21:10',1,'Meus seguidores'),(3,'2016-11-08 14:21:10',1,'Ninguém');
/*!40000 ALTER TABLE `visibilidade` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-12-07 11:13:12
