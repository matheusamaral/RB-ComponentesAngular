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
  `visibilidade_id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `usuario_bloqueado_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_bloqueado_usuario1_idx` (`usuario_id`),
  KEY `fk_bloqueado_usuario2_idx` (`usuario_bloqueado_id`),
  KEY `fk_bloqueado_1_idx` (`visibilidade_id`),
  CONSTRAINT `fk_bloqueado_1` FOREIGN KEY (`visibilidade_id`) REFERENCES `visibilidade_mensagens` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_bloqueado_usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_bloqueado_usuario2` FOREIGN KEY (`usuario_bloqueado_id`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bloqueado`
--

LOCK TABLES `bloqueado` WRITE;
/*!40000 ALTER TABLE `bloqueado` DISABLE KEYS */;
INSERT INTO `bloqueado` VALUES (1,'2016-12-08 15:25:13',1,2,1,5),(2,'2016-12-08 15:25:13',1,2,1,3),(3,'2016-12-08 15:25:13',1,1,1,2);
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
INSERT INTO `categoria_hashtag` VALUES (1,'Promoção','2000-01-01 10:10:10',1,''),(2,'Atendimento','2016-12-06 13:41:10',1,''),(3,'Atração Musical','2016-12-06 13:41:10',1,''),(4,'Público & Movimento','2016-12-06 13:41:10',1,''),(5,'Perigo','2016-12-06 13:41:10',1,''),(6,'Sentimento & Clima','2016-12-06 13:41:10',1,''),(7,'Contratempo','2016-12-06 13:41:10',1,''),(8,'Fila','2016-12-06 13:41:10',1,''),(9,'Estacionamento','2016-12-06 13:41:10',1,'');
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
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria_local`
--

LOCK TABLES `categoria_local` WRITE;
/*!40000 ALTER TABLE `categoria_local` DISABLE KEYS */;
INSERT INTO `categoria_local` VALUES (1,'Bancos e Lotéricas','2016-12-09 17:37:30',1,NULL),(2,'Bares','2016-12-09 17:37:30',1,NULL),(3,'Cafés','2016-12-09 17:37:30',1,NULL),(4,'Restaurantes','2016-12-09 17:37:30',1,NULL),(5,'Pizzarias','2016-12-09 17:37:30',1,NULL),(6,'Churrascarias','2016-12-09 17:37:30',1,NULL),(7,'Pubs','2016-12-09 17:37:30',1,NULL),(8,'Shopping Centers','2016-12-09 17:37:30',1,NULL),(9,'Casas Noturnas','2016-12-09 17:37:30',1,NULL),(10,'Teatros','2016-12-09 17:37:30',1,NULL),(11,'Lojas','2016-12-09 17:37:30',1,NULL),(12,'Padarias','2016-12-09 17:37:30',1,NULL),(13,'Academias','2016-12-09 17:37:30',1,NULL),(14,'Hospitais e Postos de Saúde','2016-12-09 17:37:30',1,NULL),(15,'Instituições e Serviços Públicos','2016-12-09 17:37:30',1,NULL),(16,'Laboratórios','2016-12-09 17:37:30',1,NULL),(17,'Outros','2016-12-09 17:37:30',1,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `check_in`
--

LOCK TABLES `check_in` WRITE;
/*!40000 ALTER TABLE `check_in` DISABLE KEYS */;
INSERT INTO `check_in` VALUES (1,'2016-11-14 17:47:04',1,1,7,1,1),(2,'2016-11-14 17:48:53',1,0,5,1,2),(3,'2016-11-16 14:39:02',1,1,6,1,1),(4,'2016-11-16 15:24:54',1,0,4,1,3),(5,'2016-11-17 13:27:25',1,0,3,2,1),(6,'2016-11-17 14:39:07',1,1,2,2,1),(7,'2016-11-17 14:40:38',1,0,1,2,2),(8,'2016-11-22 13:20:26',1,1,4,2,1),(9,'2016-11-23 17:17:09',1,0,1,2,2),(10,'2016-11-23 17:17:10',1,0,1,1,2),(11,'2016-11-23 17:18:02',1,0,1,3,3),(13,'2016-11-23 17:18:08',1,0,1,1,3),(14,'2016-12-06 13:15:21',1,0,1,2,3),(15,'2016-12-06 13:15:45',1,0,1,1,3),(16,'2016-12-09 15:23:43',1,0,1,1,1),(17,'2016-12-09 15:23:43',1,0,1,1,1),(18,'2016-12-12 16:24:23',1,1,37,4,2),(19,'2016-12-13 16:25:22',1,1,1,42,1),(20,'2016-12-13 16:35:40',1,0,5,1,2),(21,'2016-12-13 16:35:42',1,1,5,2,2),(22,'2016-12-14 13:45:54',1,0,3,5,1),(23,'2016-12-14 13:58:06',1,0,3,35,3),(24,'2016-12-14 14:10:57',1,0,3,1,1),(25,'2016-12-14 14:11:12',1,0,3,1,1),(26,'2016-12-14 14:18:08',1,0,3,3,1),(27,'2016-12-14 14:18:11',1,1,3,26,2);
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
  `notificacao_publicacao` tinyint(4) DEFAULT '1',
  `padrao_aprovacao` tinyint(4) DEFAULT '1',
  `contato` tinyint(4) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `fk_configuracoes_usuario1_idx` (`usuario_id`),
  KEY `fk_configuracoes_visibilidade1_idx` (`visibilidade_id`),
  CONSTRAINT `fk_configuracoes_usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_configuracoes_visibilidade1` FOREIGN KEY (`visibilidade_id`) REFERENCES `visibilidade` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `configuracoes`
--

LOCK TABLES `configuracoes` WRITE;
/*!40000 ALTER TABLE `configuracoes` DISABLE KEYS */;
INSERT INTO `configuracoes` VALUES (1,'2016-11-28 17:41:55',1,1,3,0,0,0),(2,'2016-11-08 16:09:07',1,2,1,1,0,1),(3,'2016-11-09 13:38:01',1,3,1,1,1,1),(6,'2016-11-09 15:37:33',1,4,1,1,1,1),(7,'2016-11-09 16:16:23',1,5,1,1,1,1),(8,'2016-11-09 16:39:24',1,6,1,1,1,1),(9,'2016-11-09 17:11:19',1,7,1,1,1,1),(10,'2016-11-09 17:18:25',1,7,1,1,1,1),(11,'2016-11-09 17:18:39',1,7,1,1,1,0),(13,'2016-11-10 13:24:48',1,8,3,0,0,0),(15,'2016-11-10 17:29:42',1,9,1,1,1,1),(16,'2016-11-11 13:00:20',1,10,1,1,1,1),(17,'2016-11-11 16:11:55',1,11,1,1,1,1),(18,'2016-11-11 17:36:17',1,12,1,1,1,1),(19,'2016-11-14 13:35:54',1,13,1,1,1,1),(20,'2016-11-21 16:50:13',1,14,1,1,1,1),(21,'2016-11-25 16:23:04',1,15,1,1,1,1),(22,'2016-11-28 15:18:11',1,16,1,1,1,1),(23,'2016-11-28 15:18:27',1,17,1,1,1,1),(25,'2016-11-28 16:35:21',1,19,1,1,1,1),(26,'2016-11-29 16:12:46',1,20,1,1,1,1),(27,'2016-11-29 16:25:47',1,21,1,1,1,1),(28,'2016-11-29 16:29:00',1,22,1,1,1,1),(29,'2016-12-01 16:31:22',1,23,1,1,1,1),(30,'2016-12-02 18:06:20',1,24,1,1,1,1),(31,'2016-12-02 18:12:14',1,26,1,1,1,1),(32,'2016-12-02 18:13:54',1,27,1,1,1,1),(33,'2016-12-02 18:15:28',1,28,1,1,1,1),(34,'2016-12-02 18:18:06',1,29,1,1,1,1),(35,'2016-12-02 18:19:22',1,30,1,1,1,1),(36,'2016-12-05 13:08:01',1,31,1,1,1,1),(37,'2016-12-05 13:09:13',1,32,1,1,1,1),(38,'2016-12-05 13:10:44',1,33,1,1,1,1),(39,'2016-12-05 13:14:45',1,34,1,1,1,1),(40,'2016-12-12 14:34:29',1,37,1,1,1,1),(42,'2016-12-14 18:12:17',1,39,1,1,1,1),(43,'2016-12-14 18:13:20',1,40,1,1,1,1),(44,'2016-12-19 17:24:51',1,41,1,1,1,1),(45,'2016-12-19 17:25:34',1,42,1,1,1,1),(46,'2016-12-19 17:26:48',1,43,1,1,1,1),(47,'2016-12-19 17:30:08',1,44,1,1,1,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `configuracoes_quickpeek`
--

LOCK TABLES `configuracoes_quickpeek` WRITE;
/*!40000 ALTER TABLE `configuracoes_quickpeek` DISABLE KEYS */;
INSERT INTO `configuracoes_quickpeek` VALUES (1,'hashtag','1000',1,'2000-01-01 10:10:10'),(2,'midia','1000',1,'2000-01-01 10:10:10'),(3,'perguntas','1000',1,'2000-01-01 10:10:10'),(4,'respostas','1000',1,'2000-01-01 10:10:10'),(5,'limitePerguntas','24',1,'2000-01-01 10:10:10'),(6,'sms','10000',1,'2000-01-01 10:10:10'),(7,'locais','24',1,'2000-01-01 10:10:10');
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
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `curtir`
--

LOCK TABLES `curtir` WRITE;
/*!40000 ALTER TABLE `curtir` DISABLE KEYS */;
INSERT INTO `curtir` VALUES (4,'2016-11-24 15:23:54',0,3,1,1),(5,'2016-11-24 15:26:04',0,3,2,2),(6,'2016-11-24 15:26:31',1,1,2,3),(7,'2016-11-29 16:31:42',1,22,2,1),(12,'2016-12-06 16:39:23',1,2,4,1),(13,'2016-12-12 17:37:58',0,2,1,1),(14,'2016-12-12 17:38:07',0,2,1,1),(15,'2016-12-12 17:38:40',0,2,1,1),(16,'2016-12-12 17:38:52',0,2,1,1),(17,'2016-12-12 17:38:52',0,2,1,1),(18,'2016-12-12 17:38:53',0,2,1,1),(19,'2016-12-13 17:39:03',1,2,27,1);
/*!40000 ALTER TABLE `curtir` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ddi_paises`
--

DROP TABLE IF EXISTS `ddi_paises`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ddi_paises` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ddi` int(11) DEFAULT NULL,
  `nome` varchar(255) DEFAULT NULL,
  `cobertura` tinyint(4) DEFAULT '0',
  `ativo` tinyint(4) DEFAULT NULL,
  `momento` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=249 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ddi_paises`
--

LOCK TABLES `ddi_paises` WRITE;
/*!40000 ALTER TABLE `ddi_paises` DISABLE KEYS */;
INSERT INTO `ddi_paises` VALUES (1,297,'Aruba',0,1,'2016-12-13 14:22:03'),(2,93,'Afghanistan',0,1,'2016-12-13 14:22:03'),(3,244,'Angola',0,1,'2016-12-13 14:22:03'),(4,1264,'Anguilla',0,1,'2016-12-13 14:22:03'),(5,358,'Åland Islands',0,1,'2016-12-13 14:22:03'),(6,355,'Albania',0,1,'2016-12-13 14:22:03'),(7,376,'Andorra',0,1,'2016-12-13 14:22:03'),(8,971,'United Arab Emirates',0,1,'2016-12-13 14:22:03'),(9,54,'Argentina',0,1,'2016-12-13 14:22:03'),(10,374,'Armenia',0,1,'2016-12-13 14:22:03'),(11,1684,'American Samoa',0,1,'2016-12-13 14:22:03'),(12,NULL,'Antarctica',0,1,'2016-12-13 14:22:03'),(13,NULL,'French Southern and Antarctic Lands',0,1,'2016-12-13 14:22:03'),(14,1268,'Antigua and Barbuda',0,1,'2016-12-13 14:22:03'),(15,61,'Australia',0,1,'2016-12-13 14:22:03'),(16,43,'Austria',0,1,'2016-12-13 14:22:03'),(17,994,'Azerbaijan',0,1,'2016-12-13 14:22:03'),(18,257,'Burundi',0,1,'2016-12-13 14:22:03'),(19,32,'Belgium',0,1,'2016-12-13 14:22:03'),(20,229,'Benin',0,1,'2016-12-13 14:22:03'),(21,226,'Burkina Faso',0,1,'2016-12-13 14:22:03'),(22,880,'Bangladesh',0,1,'2016-12-13 14:22:03'),(23,359,'Bulgaria',0,1,'2016-12-13 14:22:03'),(24,973,'Bahrain',0,1,'2016-12-13 14:22:03'),(25,1242,'Bahamas',0,1,'2016-12-13 14:22:03'),(26,387,'Bosnia and Herzegovina',0,1,'2016-12-13 14:22:03'),(27,590,'Saint Barthélemy',0,1,'2016-12-13 14:22:03'),(28,375,'Belarus',0,1,'2016-12-13 14:22:03'),(29,501,'Belize',0,1,'2016-12-13 14:22:03'),(30,1441,'Bermuda',0,1,'2016-12-13 14:22:03'),(31,591,'Bolivia',0,1,'2016-12-13 14:22:03'),(32,55,'Brazil',1,1,'2016-12-13 14:22:03'),(33,1246,'Barbados',0,1,'2016-12-13 14:22:03'),(34,673,'Brunei',0,1,'2016-12-13 14:22:03'),(35,975,'Bhutan',0,1,'2016-12-13 14:22:03'),(36,NULL,'Bouvet Island',0,1,'2016-12-13 14:22:03'),(37,267,'Botswana',0,1,'2016-12-13 14:22:03'),(38,236,'Central African Republic',0,1,'2016-12-13 14:22:03'),(39,1,'Canada',0,1,'2016-12-13 14:22:03'),(40,61,'Cocos (Keeling) Islands',0,1,'2016-12-13 14:22:03'),(41,41,'Switzerland',0,1,'2016-12-13 14:22:03'),(42,56,'Chile',0,1,'2016-12-13 14:22:03'),(43,86,'China',0,1,'2016-12-13 14:22:03'),(44,225,'Ivory Coast',0,1,'2016-12-13 14:22:03'),(45,237,'Cameroon',0,1,'2016-12-13 14:22:03'),(46,243,'DR Congo',0,1,'2016-12-13 14:22:03'),(47,242,'Republic of the Congo',0,1,'2016-12-13 14:22:03'),(48,682,'Cook Islands',0,1,'2016-12-13 14:22:03'),(49,57,'Colombia',0,1,'2016-12-13 14:22:03'),(50,269,'Comoros',0,1,'2016-12-13 14:22:03'),(51,238,'Cape Verde',0,1,'2016-12-13 14:22:03'),(52,506,'Costa Rica',0,1,'2016-12-13 14:22:03'),(53,53,'Cuba',0,1,'2016-12-13 14:22:03'),(54,5999,'Curaçao',0,1,'2016-12-13 14:22:03'),(55,61,'Christmas Island',0,1,'2016-12-13 14:22:03'),(56,1345,'Cayman Islands',0,1,'2016-12-13 14:22:03'),(57,357,'Cyprus',0,1,'2016-12-13 14:22:03'),(58,420,'Czech Republic',0,1,'2016-12-13 14:22:03'),(59,49,'Germany',0,1,'2016-12-13 14:22:03'),(60,253,'Djibouti',0,1,'2016-12-13 14:22:03'),(61,1767,'Dominica',0,1,'2016-12-13 14:22:03'),(62,45,'Denmark',0,1,'2016-12-13 14:22:03'),(63,1809,'Dominican Republic',0,1,'2016-12-13 14:22:03'),(64,213,'Algeria',0,1,'2016-12-13 14:22:03'),(65,593,'Ecuador',0,1,'2016-12-13 14:22:03'),(66,20,'Egypt',0,1,'2016-12-13 14:22:03'),(67,291,'Eritrea',0,1,'2016-12-13 14:22:03'),(68,212,'Western Sahara',0,1,'2016-12-13 14:22:03'),(69,34,'Spain',0,1,'2016-12-13 14:22:03'),(70,372,'Estonia',0,1,'2016-12-13 14:22:03'),(71,251,'Ethiopia',0,1,'2016-12-13 14:22:03'),(72,358,'Finland',0,1,'2016-12-13 14:22:03'),(73,679,'Fiji',0,1,'2016-12-13 14:22:03'),(74,500,'Falkland Islands',0,1,'2016-12-13 14:22:03'),(75,33,'France',0,1,'2016-12-13 14:22:03'),(76,298,'Faroe Islands',0,1,'2016-12-13 14:22:03'),(77,691,'Micronesia',0,1,'2016-12-13 14:22:03'),(78,241,'Gabon',0,1,'2016-12-13 14:22:03'),(79,44,'United Kingdom',0,1,'2016-12-13 14:22:03'),(80,995,'Georgia',0,1,'2016-12-13 14:22:03'),(81,44,'Guernsey',0,1,'2016-12-13 14:22:03'),(82,233,'Ghana',0,1,'2016-12-13 14:22:03'),(83,350,'Gibraltar',0,1,'2016-12-13 14:22:03'),(84,224,'Guinea',0,1,'2016-12-13 14:22:03'),(85,590,'Guadeloupe',0,1,'2016-12-13 14:22:03'),(86,220,'Gambia',0,1,'2016-12-13 14:22:03'),(87,245,'Guinea-Bissau',0,1,'2016-12-13 14:22:03'),(88,240,'Equatorial Guinea',0,1,'2016-12-13 14:22:03'),(89,30,'Greece',0,1,'2016-12-13 14:22:03'),(90,1473,'Grenada',0,1,'2016-12-13 14:22:03'),(91,299,'Greenland',0,1,'2016-12-13 14:22:03'),(92,502,'Guatemala',0,1,'2016-12-13 14:22:03'),(93,594,'French Guiana',0,1,'2016-12-13 14:22:03'),(94,1671,'Guam',0,1,'2016-12-13 14:22:03'),(95,592,'Guyana',0,1,'2016-12-13 14:22:03'),(96,852,'Hong Kong',0,1,'2016-12-13 14:22:03'),(97,NULL,'Heard Island and McDonald Islands',0,1,'2016-12-13 14:22:03'),(98,504,'Honduras',0,1,'2016-12-13 14:22:03'),(99,385,'Croatia',0,1,'2016-12-13 14:22:03'),(100,509,'Haiti',0,1,'2016-12-13 14:22:03'),(101,36,'Hungary',0,1,'2016-12-13 14:22:03'),(102,62,'Indonesia',0,1,'2016-12-13 14:22:03'),(103,44,'Isle of Man',0,1,'2016-12-13 14:22:03'),(104,91,'India',0,1,'2016-12-13 14:22:03'),(105,246,'British Indian Ocean Territory',0,1,'2016-12-13 14:22:03'),(106,353,'Ireland',0,1,'2016-12-13 14:22:03'),(107,98,'Iran',0,1,'2016-12-13 14:22:03'),(108,964,'Iraq',0,1,'2016-12-13 14:22:03'),(109,354,'Iceland',0,1,'2016-12-13 14:22:03'),(110,972,'Israel',0,1,'2016-12-13 14:22:03'),(111,39,'Italy',0,1,'2016-12-13 14:22:03'),(112,1876,'Jamaica',0,1,'2016-12-13 14:22:03'),(113,44,'Jersey',0,1,'2016-12-13 14:22:03'),(114,962,'Jordan',0,1,'2016-12-13 14:22:03'),(115,81,'Japan',0,1,'2016-12-13 14:22:03'),(116,76,'Kazakhstan',0,1,'2016-12-13 14:22:03'),(117,254,'Kenya',0,1,'2016-12-13 14:22:03'),(118,996,'Kyrgyzstan',0,1,'2016-12-13 14:22:03'),(119,855,'Cambodia',0,1,'2016-12-13 14:22:03'),(120,686,'Kiribati',0,1,'2016-12-13 14:22:03'),(121,1869,'Saint Kitts and Nevis',0,1,'2016-12-13 14:22:03'),(122,82,'South Korea',0,1,'2016-12-13 14:22:03'),(123,383,'Kosovo',0,1,'2016-12-13 14:22:03'),(124,965,'Kuwait',0,1,'2016-12-13 14:22:03'),(125,856,'Laos',0,1,'2016-12-13 14:22:03'),(126,961,'Lebanon',0,1,'2016-12-13 14:22:03'),(127,231,'Liberia',0,1,'2016-12-13 14:22:03'),(128,218,'Libya',0,1,'2016-12-13 14:22:03'),(129,1758,'Saint Lucia',0,1,'2016-12-13 14:22:03'),(130,423,'Liechtenstein',0,1,'2016-12-13 14:22:03'),(131,94,'Sri Lanka',0,1,'2016-12-13 14:22:03'),(132,266,'Lesotho',0,1,'2016-12-13 14:22:03'),(133,370,'Lithuania',0,1,'2016-12-13 14:22:03'),(134,352,'Luxembourg',0,1,'2016-12-13 14:22:03'),(135,371,'Latvia',0,1,'2016-12-13 14:22:03'),(136,853,'Macau',0,1,'2016-12-13 14:22:03'),(137,590,'Saint Martin',0,1,'2016-12-13 14:22:03'),(138,212,'Morocco',0,1,'2016-12-13 14:22:03'),(139,377,'Monaco',0,1,'2016-12-13 14:22:03'),(140,373,'Moldova',0,1,'2016-12-13 14:22:03'),(141,261,'Madagascar',0,1,'2016-12-13 14:22:03'),(142,960,'Maldives',0,1,'2016-12-13 14:22:03'),(143,52,'Mexico',0,1,'2016-12-13 14:22:03'),(144,692,'Marshall Islands',0,1,'2016-12-13 14:22:03'),(145,389,'Macedonia',0,1,'2016-12-13 14:22:03'),(146,223,'Mali',0,1,'2016-12-13 14:22:03'),(147,356,'Malta',0,1,'2016-12-13 14:22:03'),(148,95,'Myanmar',0,1,'2016-12-13 14:22:03'),(149,382,'Montenegro',0,1,'2016-12-13 14:22:03'),(150,976,'Mongolia',0,1,'2016-12-13 14:22:03'),(151,1670,'Northern Mariana Islands',0,1,'2016-12-13 14:22:03'),(152,258,'Mozambique',0,1,'2016-12-13 14:22:03'),(153,222,'Mauritania',0,1,'2016-12-13 14:22:03'),(154,1664,'Montserrat',0,1,'2016-12-13 14:22:03'),(155,596,'Martinique',0,1,'2016-12-13 14:22:03'),(156,230,'Mauritius',0,1,'2016-12-13 14:22:03'),(157,265,'Malawi',0,1,'2016-12-13 14:22:03'),(158,60,'Malaysia',0,1,'2016-12-13 14:22:03'),(159,262,'Mayotte',0,1,'2016-12-13 14:22:03'),(160,264,'Namibia',0,1,'2016-12-13 14:22:03'),(161,687,'New Caledonia',0,1,'2016-12-13 14:22:03'),(162,227,'Niger',0,1,'2016-12-13 14:22:03'),(163,672,'Norfolk Island',0,1,'2016-12-13 14:22:03'),(164,234,'Nigeria',0,1,'2016-12-13 14:22:03'),(165,505,'Nicaragua',0,1,'2016-12-13 14:22:03'),(166,683,'Niue',0,1,'2016-12-13 14:22:03'),(167,31,'Netherlands',0,1,'2016-12-13 14:22:03'),(168,47,'Norway',0,1,'2016-12-13 14:22:03'),(169,977,'Nepal',0,1,'2016-12-13 14:22:03'),(170,674,'Nauru',0,1,'2016-12-13 14:22:03'),(171,64,'New Zealand',0,1,'2016-12-13 14:22:03'),(172,968,'Oman',0,1,'2016-12-13 14:22:03'),(173,92,'Pakistan',0,1,'2016-12-13 14:22:03'),(174,507,'Panama',0,1,'2016-12-13 14:22:03'),(175,64,'Pitcairn Islands',0,1,'2016-12-13 14:22:03'),(176,51,'Peru',0,1,'2016-12-13 14:22:03'),(177,63,'Philippines',0,1,'2016-12-13 14:22:03'),(178,680,'Palau',0,1,'2016-12-13 14:22:03'),(179,675,'Papua New Guinea',0,1,'2016-12-13 14:22:03'),(180,48,'Poland',0,1,'2016-12-13 14:22:03'),(181,1787,'Puerto Rico',0,1,'2016-12-13 14:22:03'),(182,850,'North Korea',0,1,'2016-12-13 14:22:03'),(183,351,'Portugal',1,1,'2016-12-13 14:22:03'),(184,595,'Paraguay',0,1,'2016-12-13 14:22:03'),(185,970,'Palestine',0,1,'2016-12-13 14:22:03'),(186,689,'French Polynesia',0,1,'2016-12-13 14:22:03'),(187,974,'Qatar',0,1,'2016-12-13 14:22:03'),(188,262,'Réunion',0,1,'2016-12-13 14:22:03'),(189,40,'Romania',0,1,'2016-12-13 14:22:03'),(190,7,'Russia',0,1,'2016-12-13 14:22:03'),(191,250,'Rwanda',0,1,'2016-12-13 14:22:03'),(192,966,'Saudi Arabia',0,1,'2016-12-13 14:22:03'),(193,249,'Sudan',0,1,'2016-12-13 14:22:03'),(194,221,'Senegal',0,1,'2016-12-13 14:22:03'),(195,65,'Singapore',0,1,'2016-12-13 14:22:03'),(196,500,'South Georgia',0,1,'2016-12-13 14:22:03'),(197,4779,'Svalbard and Jan Mayen',0,1,'2016-12-13 14:22:03'),(198,677,'Solomon Islands',0,1,'2016-12-13 14:22:03'),(199,232,'Sierra Leone',0,1,'2016-12-13 14:22:03'),(200,503,'El Salvador',0,1,'2016-12-13 14:22:03'),(201,378,'San Marino',0,1,'2016-12-13 14:22:03'),(202,252,'Somalia',0,1,'2016-12-13 14:22:03'),(203,508,'Saint Pierre and Miquelon',0,1,'2016-12-13 14:22:03'),(204,381,'Serbia',0,1,'2016-12-13 14:22:03'),(205,211,'South Sudan',0,1,'2016-12-13 14:22:03'),(206,239,'São Tomé and Príncipe',0,1,'2016-12-13 14:22:03'),(207,597,'Suriname',0,1,'2016-12-13 14:22:03'),(208,421,'Slovakia',0,1,'2016-12-13 14:22:03'),(209,386,'Slovenia',0,1,'2016-12-13 14:22:03'),(210,46,'Sweden',0,1,'2016-12-13 14:22:03'),(211,268,'Swaziland',0,1,'2016-12-13 14:22:03'),(212,1721,'Sint Maarten',0,1,'2016-12-13 14:22:03'),(213,248,'Seychelles',0,1,'2016-12-13 14:22:03'),(214,963,'Syria',0,1,'2016-12-13 14:22:03'),(215,1649,'Turks and Caicos Islands',0,1,'2016-12-13 14:22:03'),(216,235,'Chad',0,1,'2016-12-13 14:22:03'),(217,228,'Togo',0,1,'2016-12-13 14:22:03'),(218,66,'Thailand',0,1,'2016-12-13 14:22:03'),(219,992,'Tajikistan',0,1,'2016-12-13 14:22:03'),(220,690,'Tokelau',0,1,'2016-12-13 14:22:03'),(221,993,'Turkmenistan',0,1,'2016-12-13 14:22:03'),(222,670,'Timor-Leste',0,1,'2016-12-13 14:22:03'),(223,676,'Tonga',0,1,'2016-12-13 14:22:03'),(224,1868,'Trinidad and Tobago',0,1,'2016-12-13 14:22:03'),(225,216,'Tunisia',0,1,'2016-12-13 14:22:03'),(226,90,'Turkey',0,1,'2016-12-13 14:22:03'),(227,688,'Tuvalu',0,1,'2016-12-13 14:22:03'),(228,886,'Taiwan',0,1,'2016-12-13 14:22:03'),(229,255,'Tanzania',0,1,'2016-12-13 14:22:03'),(230,256,'Uganda',0,1,'2016-12-13 14:22:03'),(231,380,'Ukraine',0,1,'2016-12-13 14:22:03'),(232,NULL,'United States Minor Outlying Islands',0,1,'2016-12-13 14:22:03'),(233,598,'Uruguay',0,1,'2016-12-13 14:22:03'),(234,1,'United States',1,1,'2016-12-13 14:22:03'),(235,998,'Uzbekistan',0,1,'2016-12-13 14:22:03'),(236,3906698,'Vatican City',0,1,'2016-12-13 14:22:03'),(237,1784,'Saint Vincent and the Grenadines',0,1,'2016-12-13 14:22:03'),(238,58,'Venezuela',0,1,'2016-12-13 14:22:03'),(239,1284,'British Virgin Islands',0,1,'2016-12-13 14:22:03'),(240,1340,'United States Virgin Islands',0,1,'2016-12-13 14:22:03'),(241,84,'Vietnam',0,1,'2016-12-13 14:22:03'),(242,678,'Vanuatu',0,1,'2016-12-13 14:22:03'),(243,681,'Wallis and Futuna',0,1,'2016-12-13 14:22:03'),(244,685,'Samoa',0,1,'2016-12-13 14:22:03'),(245,967,'Yemen',0,1,'2016-12-13 14:22:03'),(246,27,'South Africa',0,1,'2016-12-13 14:22:03'),(247,260,'Zambia',0,1,'2016-12-13 14:22:03'),(248,263,'Zimbabwe',0,1,'2016-12-13 14:22:03');
/*!40000 ALTER TABLE `ddi_paises` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hashtag`
--

LOCK TABLES `hashtag` WRITE;
/*!40000 ALTER TABLE `hashtag` DISABLE KEYS */;
INSERT INTO `hashtag` VALUES (1,'nova3','2016-11-18 15:38:13',1,1,1),(2,'nova2','2016-11-18 15:38:13',1,1,1),(3,'nova6','2016-11-18 15:39:11',1,1,0),(4,'nova8','2016-11-18 15:39:34',1,1,0),(5,'ola tuod bem','2016-12-06 13:15:29',1,1,0),(6,'fodase','2016-12-06 13:15:29',1,1,0),(7,'hash1','2016-12-12 16:28:06',1,1,0),(8,'hash1','2016-12-12 16:28:06',1,1,0),(9,'hash1','2016-12-12 16:28:06',1,1,0),(10,'hash1','2016-12-12 16:28:06',1,1,0),(11,'hash1','2016-12-12 16:28:06',1,1,0),(12,'hash1','2016-12-12 16:28:06',1,1,0),(13,'hash1','2016-12-12 16:28:06',1,1,0);
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
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hashtag_categoria`
--

LOCK TABLES `hashtag_categoria` WRITE;
/*!40000 ALTER TABLE `hashtag_categoria` DISABLE KEYS */;
INSERT INTO `hashtag_categoria` VALUES (1,'2016-11-18 15:38:13',1,1,1),(2,'2016-11-18 15:38:13',1,2,2),(3,'2016-11-18 15:38:41',1,3,1),(4,'2016-11-18 15:38:41',1,4,2),(5,'2016-11-18 15:38:58',1,3,1),(6,'2016-11-18 15:39:11',1,3,3),(7,'2016-11-18 15:39:34',1,3,4),(8,'2016-11-18 15:39:34',1,4,1),(9,'2016-12-06 13:15:29',1,1,5),(10,'2016-12-06 13:15:29',1,2,6),(27,'2016-12-06 13:17:22',1,1,5),(28,'2016-12-06 13:17:22',1,2,6),(29,'2016-12-06 13:17:22',1,3,5),(30,'2016-12-06 13:17:22',1,4,6),(31,'2016-12-06 13:17:22',1,3,5),(32,'2016-12-06 13:17:22',1,1,6),(33,'2016-12-06 13:17:22',1,1,5),(34,'2016-12-06 13:17:22',1,1,6),(35,'2016-12-06 13:17:47',1,1,5),(36,'2016-12-12 16:28:06',1,1,7),(37,'2016-12-12 16:28:06',1,2,8),(38,'2016-12-12 16:28:06',1,3,9),(39,'2016-12-12 16:28:06',1,1,10),(40,'2016-12-12 16:28:06',1,2,11),(41,'2016-12-12 16:28:06',1,3,12),(42,'2016-12-12 16:28:06',1,1,13),(43,'2016-12-12 16:28:07',1,1,7),(44,'2016-12-12 16:28:07',1,2,7),(45,'2016-12-12 16:28:07',1,3,7),(46,'2016-12-12 16:28:07',1,1,7),(47,'2016-12-12 16:28:07',1,2,7),(48,'2016-12-12 16:28:07',1,3,7),(49,'2016-12-12 16:28:07',1,1,7);
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
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hashtag_local`
--

LOCK TABLES `hashtag_local` WRITE;
/*!40000 ALTER TABLE `hashtag_local` DISABLE KEYS */;
INSERT INTO `hashtag_local` VALUES (1,1,1,2,'2016-11-18 15:38:13',1),(2,3,2,2,'2016-11-18 15:38:13',1),(3,2,1,2,'2016-11-18 15:38:41',1),(4,4,2,2,'2016-11-18 15:38:41',1),(5,5,1,2,'2016-11-18 15:38:58',1),(6,1,3,2,'2016-11-18 15:39:11',1),(7,2,4,2,'2016-11-18 15:39:34',1),(8,1,1,2,'2016-11-18 15:39:34',1),(9,1,2,1,'2016-11-18 15:38:13',1),(10,1,2,1,'2016-11-18 15:38:13',1),(11,1,1,1,'2016-11-18 15:38:13',1),(12,1,5,2,'2016-12-06 13:15:29',1),(13,1,6,2,'2016-12-06 13:15:29',1),(30,1,5,1,'2016-12-06 13:17:22',1),(31,1,6,1,'2016-12-06 13:17:22',1),(32,1,5,1,'2016-12-06 13:17:22',1),(33,1,6,1,'2016-12-06 13:17:22',1),(34,1,5,1,'2016-12-06 13:17:22',1),(35,1,6,1,'2016-12-06 13:17:22',1),(36,1,5,1,'2016-12-06 13:17:22',1),(37,1,6,1,'2016-12-06 13:17:22',1),(38,1,5,1,'2016-12-06 13:17:47',1),(39,1,7,23,'2016-12-12 16:28:06',1),(40,1,8,23,'2016-12-12 16:28:06',1),(41,1,9,23,'2016-12-12 16:28:06',1),(42,1,10,23,'2016-12-12 16:28:06',1),(43,1,11,23,'2016-12-12 16:28:06',1),(44,1,12,23,'2016-12-12 16:28:06',1),(45,1,13,23,'2016-12-12 16:28:06',1),(46,1,7,23,'2016-12-12 16:28:07',1),(47,1,7,23,'2016-12-12 16:28:07',1),(48,1,7,23,'2016-12-12 16:28:07',1),(49,1,7,23,'2016-12-12 16:28:07',1),(50,1,7,23,'2016-12-12 16:28:07',1),(51,1,7,23,'2016-12-12 16:28:07',1),(52,1,7,23,'2016-12-12 16:28:07',1),(53,2,1,47,'2016-12-13 17:02:56',1),(54,2,7,23,'2016-12-12 17:37:06',0),(55,2,7,23,'2016-12-12 17:37:46',1);
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
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `local`
--

LOCK TABLES `local` WRITE;
/*!40000 ALTER TABLE `local` DISABLE KEYS */;
INSERT INTO `local` VALUES (1,'-21.1354965','-42.3650207','Cemup Especialidades Medicas e Ultrassonograf','2016-12-12 14:00:28',1,NULL,'Praça São Paulo, 109, Muriaé'),(2,'-21.135445','-42.365089','Espaço Todeschini Muriaé','2016-12-12 14:00:28',1,NULL,'Praça São Paulo nº109 Loja 01/B - Centro, Muriaé'),(3,'-21.1356665','-42.3651539','Representaçoes Malwee Liberta','2016-12-12 14:00:28',1,NULL,'Rua Coronel Isalino, 33, Muriaé'),(4,'-21.1355497','-42.365222','Sebastião F Medeiros','2016-12-12 14:00:28',1,NULL,'Rua Cel Izalino, 106, Muriaé'),(5,'-21.1355497','-42.365222','SEOT-Serviço Especializado Ortopedia e Trauma','2016-12-12 14:00:28',1,NULL,'Rua Cel Izalino, 106, Muriaé'),(6,'-21.135725','-42.3651787','Erickson Guedes Ferrari','2016-12-12 14:00:28',1,NULL,'Rua Cel Izalino, 125, Muriaé'),(7,'-21.1357672','-42.3652696','Psicomedclin','2016-12-12 14:00:28',1,NULL,'Rua Coronel Isalino, 52, Muriaé'),(8,'-21.1352098','-42.3653411','Academia Center Fit','2016-12-12 14:00:28',1,NULL,'Praça São Paulo, 130 - Centro, Muriaé'),(9,'-21.1360425','-42.365167','Funerária São Mateus','2016-12-12 14:00:28',1,NULL,'Rua Coronel Isalino, 77, Muriaé'),(10,'-21.1360426','-42.3651695','Casa da Criança','2016-12-12 14:00:28',1,NULL,'Rua Cel Izalino, 161, Muriaé'),(11,'-21.136043','-42.36517','Associação de Proteção à Maternidade e à Infâ','2016-12-12 14:00:28',1,NULL,'Rua Cel Izalino, 161, Muriaé'),(12,'-21.1356565','-42.365502','Dom Camilo Com e Rep','2016-12-12 14:00:28',1,NULL,'Rua Coronel Izalino 154 - pa 2, Muriaé'),(13,'-21.136115','-42.364878','actions TI','2016-12-12 14:00:28',1,NULL,'Santos Fintelman 02, Rua Miguel dos S Fintelman - Centro, Muriaé'),(14,'-21.1357881','-42.3643855','Gráfica Castelo','2016-12-12 14:00:28',1,NULL,'Rua Professor Carvalho, 49, Muriaé'),(15,'-21.1349439','-42.3652484','Evane C M Laia','2016-12-12 14:00:28',1,NULL,'Rua Cel Izalino, 52, Muriaé'),(16,'-21.1349186','-42.3652539','Clínica de Acupuntura José Gil Pereira','2016-12-12 14:00:28',1,NULL,'Rua Cel Izalino, 50, Muriaé'),(17,'-21.1362544','-42.3651633','Pronto Socorro','2016-12-12 14:00:28',1,NULL,'Rua Cel Izalino, 185, Muriaé'),(18,'-21.1362481','-42.3652008','Drª Márcia Paula','2016-12-12 14:00:28',1,NULL,'Rua Coronel Isalino, 183 - Sala 104, Muriaé'),(19,'-21.1362721','-42.3651628','Instituto Cardiovascular de Muriaé','2016-12-12 14:00:28',1,NULL,'Rua Cel Izalino, 187, Muriaé'),(20,'-21.1362721','-42.3651628','Marcos Ney de Aquino Rodrigues','2016-12-12 14:00:28',1,NULL,'Rua Cel Izalino, 187, Muriaé'),(21,'-21.1320415','-42.3645565','Academia Cia do Corpo','2016-12-12 14:02:06',1,NULL,'Rua Doutor Alves Pequeno, 173, Muriaé'),(22,'-21.132052','-42.36454','Vencis Odontologia','2016-12-12 14:02:06',1,NULL,'Rua Doutor Silveira Brum 114 - 1º Andar - Centro, Muriaé'),(23,'-21.1319694','-42.3643937','Banco Mercantil do Brasil','2016-12-12 14:02:06',1,NULL,'Rua Doutor Silveira Brun, 60, Muriaé'),(24,'-21.1320454','-42.3643942','Drogasilva','2016-12-12 14:02:06',1,NULL,'Rua Doutor Silveira Brum 67 - lj 1, Muriaé'),(25,'-21.1321393','-42.3646367','Jeans Mania','2016-12-12 14:02:06',1,NULL,'Rua Doutor Alves Pequeno, 138, Muriaé'),(26,'-21.1321786','-42.364416','Via Ville Calçados e Roupas','2016-12-12 14:02:06',1,NULL,'Rua Doutor Alves Pequeno, 180, Muriaé'),(27,'-21.1321786','-42.364416','Fabricatte Rio','2016-12-12 14:02:06',1,NULL,'Rua Doutor Alves Pequeno, 180, Muriaé'),(28,'-21.1321786','-42.364416','Tymar Modas','2016-12-12 14:02:06',1,NULL,'Rua Doutor Alves Pequeno, 180, Muriaé'),(29,'-21.1321699','-42.3643844','Artifarcos','2016-12-12 14:02:06',1,NULL,'Rua São Pedro, 17, Muriaé'),(30,'-21.1319293','-42.3642764','Consultoria Seguro Dpvt','2016-12-12 14:02:06',1,NULL,'Rua Doutor Silveira Brun, 85, Muriaé'),(31,'-21.1321481','-42.3647221','Primeiro Passos Confecções Infantis','2016-12-12 14:02:06',1,NULL,'Rua Doutor Alves Pequeno, 138, Muriaé'),(32,'-21.1322445','-42.3645317','CGS Eletrodomésticos','2016-12-12 14:02:06',1,NULL,'Rua Doutor Alves Pequeno, 154, Muriaé'),(33,'-21.1319778','-42.3642351','Panificadora Toscana de Muriaé','2016-12-12 14:02:06',1,NULL,'Rua Dr. Silveira Brum, 85 - Centro, Muriaé'),(34,'-21.1317573','-42.3643648','Point Informática Muriaé','2016-12-12 14:02:06',1,NULL,'Rua Doutor Silveira Brun, 86 - 204 - entro, Muriaé'),(35,'-21.131834','-42.364279','Fisk Centro de Ensino - Muriaé-MG','2016-12-12 14:02:06',1,NULL,'Rua Dr Silveira Brum 86 Sala 101/102 - Centro, Muriaé'),(36,'-21.131764','-42.364326','Rubeus Tecnologia e Inovação','2016-12-12 14:02:06',1,NULL,'Rua Doutor Silveira Brun, 86 - sala 302, Muriaé'),(37,'-21.1320901','-42.3642207','People Formação Completa','2016-12-12 14:02:06',1,NULL,'Rua São Pedro, 103, Muriaé'),(38,'-21.1322279','-42.3647373','José de Oliveira Muratori','2016-12-12 14:02:06',1,NULL,'Rua Doutor Alves Pequeno, 267, Muriaé'),(39,'-21.13231','-42.36465','Sig\'s Baby Calçados','2016-12-12 14:02:06',1,NULL,'Rua Doutor Silveira Brum 1 - lj B, Muriaé'),(40,'-21.1323627','-42.3644035','Salão da Carla','2016-12-12 14:02:06',1,NULL,'Rua São Pedro, 37, Muriaé'),(41,'-21.1318455','-42.361613','local1','2016-12-13 14:34:35',0,2,NULL),(42,'-21.1318455','-42.361613','local1','2016-12-13 14:35:25',0,2,NULL),(43,'-21.1318455','-42.361613','local1','2016-12-13 14:36:40',0,2,NULL),(44,'-21.1318455','-42.361613','local1','2016-12-13 14:36:52',0,2,NULL),(45,'-21.1318455','-42.361613','local1','2016-12-13 14:36:59',0,2,NULL),(46,'-21.1318455','-42.361613','local1','2016-12-13 14:37:11',0,2,NULL),(47,'-21.1318455','-42.361613','local1','2016-12-13 14:37:28',0,2,'Edifício Antônio Esposito - R. João Grossi, 37 - Centro, Muriaé - MG, 36880-000, Brazil'),(49,'-21.1318455','-42.361613','local1','2016-12-13 14:38:06',0,2,'Edifício Antônio Esposito - R. João Grossi, 37 - Centro, Muriaé - MG, 36880-000, Brazil');
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
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `local_categoria`
--

LOCK TABLES `local_categoria` WRITE;
/*!40000 ALTER TABLE `local_categoria` DISABLE KEYS */;
INSERT INTO `local_categoria` VALUES (1,1,14,1,'2016-12-12 14:00:29'),(2,1,16,1,'2016-12-12 14:00:29'),(3,2,11,1,'2016-12-12 14:00:29'),(4,3,17,1,'2016-12-12 14:00:29'),(5,4,11,1,'2016-12-12 14:00:29'),(6,4,14,1,'2016-12-12 14:00:29'),(7,4,16,1,'2016-12-12 14:00:29'),(8,5,14,1,'2016-12-12 14:00:29'),(9,5,16,1,'2016-12-12 14:00:29'),(10,6,14,1,'2016-12-12 14:00:29'),(11,6,16,1,'2016-12-12 14:00:29'),(12,7,14,1,'2016-12-12 14:00:29'),(13,7,16,1,'2016-12-12 14:00:29'),(14,8,13,1,'2016-12-12 14:00:29'),(15,9,17,1,'2016-12-12 14:00:29'),(16,10,17,1,'2016-12-12 14:00:29'),(17,11,17,1,'2016-12-12 14:00:29'),(18,12,17,1,'2016-12-12 14:00:29'),(19,13,17,1,'2016-12-12 14:00:29'),(20,14,17,1,'2016-12-12 14:00:29'),(21,15,14,1,'2016-12-12 14:00:29'),(22,15,16,1,'2016-12-12 14:00:29'),(23,16,14,1,'2016-12-12 14:00:29'),(24,16,16,1,'2016-12-12 14:00:29'),(25,17,17,1,'2016-12-12 14:00:29'),(26,18,14,1,'2016-12-12 14:00:29'),(27,18,16,1,'2016-12-12 14:00:29'),(28,19,14,1,'2016-12-12 14:00:29'),(29,19,16,1,'2016-12-12 14:00:29'),(30,20,14,1,'2016-12-12 14:00:29'),(31,20,16,1,'2016-12-12 14:00:29'),(32,21,13,1,'2016-12-12 14:02:06'),(33,22,14,1,'2016-12-12 14:02:06'),(34,22,16,1,'2016-12-12 14:02:06'),(35,23,1,1,'2016-12-12 14:02:06'),(36,24,11,1,'2016-12-12 14:02:06'),(37,24,14,1,'2016-12-12 14:02:06'),(38,24,16,1,'2016-12-12 14:02:06'),(39,25,11,1,'2016-12-12 14:02:06'),(40,26,11,1,'2016-12-12 14:02:06'),(41,27,11,1,'2016-12-12 14:02:06'),(42,28,11,1,'2016-12-12 14:02:06'),(43,29,11,1,'2016-12-12 14:02:06'),(44,29,14,1,'2016-12-12 14:02:06'),(45,29,16,1,'2016-12-12 14:02:06'),(46,30,17,1,'2016-12-12 14:02:07'),(47,31,11,1,'2016-12-12 14:02:07'),(48,32,17,1,'2016-12-12 14:02:07'),(49,33,12,1,'2016-12-12 14:02:07'),(50,33,11,1,'2016-12-12 14:02:07'),(51,34,17,1,'2016-12-12 14:02:07'),(52,35,17,1,'2016-12-12 14:02:07'),(53,36,17,1,'2016-12-12 14:02:07'),(54,37,15,1,'2016-12-12 14:02:07'),(55,38,17,1,'2016-12-12 14:02:07'),(56,39,11,1,'2016-12-12 14:02:07'),(57,40,17,1,'2016-12-12 14:02:07'),(58,41,1,1,'2016-12-13 14:34:35'),(59,42,1,1,'2016-12-13 14:35:25'),(60,43,1,1,'2016-12-13 14:36:40'),(61,44,1,1,'2016-12-13 14:36:52'),(62,45,1,1,'2016-12-13 14:36:59'),(63,46,1,1,'2016-12-13 14:37:11'),(64,47,1,1,'2016-12-13 14:37:28'),(69,49,1,1,'2016-12-13 14:38:06'),(70,49,16,1,'2016-12-13 14:38:06'),(71,49,17,1,'2016-12-13 14:38:06'),(72,49,12,1,'2016-12-13 14:38:06'),(73,45,3,1,'2016-12-13 14:38:06');
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
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `local_google`
--

LOCK TABLES `local_google` WRITE;
/*!40000 ALTER TABLE `local_google` DISABLE KEYS */;
INSERT INTO `local_google` VALUES (1,'ChIJv81L0ELGvAARlvbcpVxivd8',1,1,'2016-12-12 14:00:29'),(2,'ChIJA2eguULGvAARxHUwLb4rPy8',2,1,'2016-12-12 14:00:29'),(3,'ChIJ7yuMw0LGvAAR6cNw9AeNigY',3,1,'2016-12-12 14:00:29'),(4,'ChIJR6h9okLGvAARu0LMi7FMo7I',4,1,'2016-12-12 14:00:29'),(5,'ChIJR6h9okLGvAARnLqesMz0mpA',5,1,'2016-12-12 14:00:29'),(6,'ChIJe13zoULGvAARft863Rp3_CM',6,1,'2016-12-12 14:00:29'),(7,'ChIJk5asvELGvAART4O13RYkAPo',7,1,'2016-12-12 14:00:29'),(8,'ChIJZ9wz0ELGvAARAuRQZwdysIQ',8,1,'2016-12-12 14:00:29'),(9,'ChIJixLHuELGvAARTfOBTLx_ZUw',9,1,'2016-12-12 14:00:29'),(10,'ChIJoWzoH2jGvAARMQuqHbcZ-Lk',10,1,'2016-12-12 14:00:29'),(11,'ChIJoWzoH2jGvAARqRr4cwPDssI',11,1,'2016-12-12 14:00:29'),(12,'ChIJv7dFvULGvAARwNTenAfuW5Q',12,1,'2016-12-12 14:00:29'),(13,'ChIJRRBqr0LGvAARUYnBphF9Ico',13,1,'2016-12-12 14:00:29'),(14,'ChIJHW5Ds0LGvAAR6kJ_kejEtyE',14,1,'2016-12-12 14:00:29'),(15,'ChIJRycBvkLGvAARdG7KrV012iw',15,1,'2016-12-12 14:00:29'),(16,'ChIJ95sDvkLGvAAR3-pUNYVuQIQ',16,1,'2016-12-12 14:00:29'),(17,'ChIJjZ9HH2jGvAARqAcN04dFpqg',17,1,'2016-12-12 14:00:29'),(18,'ChIJp5knp0LGvAARSCc7KrMqKZQ',18,1,'2016-12-12 14:00:29'),(19,'ChIJozVIH2jGvAAR6BLv1ZBAz_4',19,1,'2016-12-12 14:00:29'),(20,'ChIJozVIH2jGvAARM25J45zdjdw',20,1,'2016-12-12 14:00:29'),(21,'ChIJoThmD0PGvAARjNSr6rTb0VI',21,1,'2016-12-12 14:02:07'),(22,'ChIJZ-xtVEPGvAARFtJT8wz3j_A',22,1,'2016-12-12 14:02:07'),(23,'ChIJi6GMVFvGvAARQhS8cJM8Z8I',23,1,'2016-12-12 14:02:07'),(24,'ChIJgY_BVEPGvAARi04UWqFWTTQ',24,1,'2016-12-12 14:02:07'),(25,'ChIJ2dm1E0PGvAARddNvJ4CRJ4w',25,1,'2016-12-12 14:02:07'),(26,'ChIJLRvYDkPGvAARnzL9sxdmtJg',26,1,'2016-12-12 14:02:07'),(27,'ChIJLRvYDkPGvAAR0NbNuO9YNiE',27,1,'2016-12-12 14:02:07'),(28,'ChIJLRvYDkPGvAARfPiMRw5HpRs',28,1,'2016-12-12 14:02:07'),(29,'ChIJQaEdSUPGvAARxxNiEottY9E',29,1,'2016-12-12 14:02:07'),(30,'ChIJNdW7qlzGvAARnF0OalSDPh4',30,1,'2016-12-12 14:02:07'),(31,'ChIJ2dm1E0PGvAARO1sKc5nalWw',31,1,'2016-12-12 14:02:07'),(32,'ChIJc98CEkPGvAARPErFWfn3Ngw',32,1,'2016-12-12 14:02:07'),(33,'ChIJRZa1qlzGvAARVeoem46vXxU',33,1,'2016-12-12 14:02:07'),(34,'ChIJF0ozUkHGvAARkStf2uYNCTY',34,1,'2016-12-12 14:02:07'),(35,'ChIJNdW7qlzGvAARxdXdlvqgQyE',35,1,'2016-12-12 14:02:07'),(36,'ChIJaR-6qkTGvAARH-ZoOb7GCFM',36,1,'2016-12-12 14:02:07'),(37,'ChIJow8Rq1zGvAARILbt0H6iU3w',37,1,'2016-12-12 14:02:07'),(38,'ChIJOQK7UUPGvAARNWnkr8YttZU',38,1,'2016-12-12 14:02:07'),(39,'ChIJXc72UUPGvAARXIs-oMqbHM4',39,1,'2016-12-12 14:02:07'),(40,'ChIJQaEdSUPGvAARVG4FPlccr44',40,1,'2016-12-12 14:02:07');
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
  `visibilidade_mensagens_id` int(11) NOT NULL,
  `visualizado` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_mensagens_usuario1_idx` (`usuario_id`),
  KEY `fk_mensagens_usuario2_idx` (`usuario_mensagem_id`),
  KEY `fk_mensagens_status_mensagem1_idx` (`status_mensagem_id`),
  KEY `fk_mensagens_1_idx` (`visibilidade_mensagens_id`),
  CONSTRAINT `fk_mensagens_1` FOREIGN KEY (`visibilidade_mensagens_id`) REFERENCES `visibilidade_mensagens` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_mensagens_status_mensagem1` FOREIGN KEY (`status_mensagem_id`) REFERENCES `status_mensagem` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_mensagens_usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_mensagens_usuario2` FOREIGN KEY (`usuario_mensagem_id`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mensagens`
--

LOCK TABLES `mensagens` WRITE;
/*!40000 ALTER TABLE `mensagens` DISABLE KEYS */;
INSERT INTO `mensagens` VALUES (2,'Mnesagem1','2016-12-09 13:16:44',1,NULL,1,5,1,NULL,1,1),(3,'Mnesagem12','2016-12-09 13:16:47',1,NULL,2,5,1,NULL,1,1),(4,'Mnesagem123','2016-12-09 13:16:50',1,NULL,3,5,1,NULL,1,1),(5,'Mnesagem1234','2016-12-09 13:16:53',1,NULL,1,5,1,NULL,1,1),(6,'Mnesagem1234','2016-12-09 13:22:35',1,NULL,1,3,3,'2016-12-09 13:22:39',2,0),(7,'Mnesagem12345','2016-12-09 13:22:36',1,NULL,1,3,3,'2016-12-09 13:22:39',2,0),(8,'Mnesagem123456','2016-12-09 13:22:37',1,NULL,1,3,3,'2016-12-09 13:22:39',2,0),(9,'Mnesagem1234567','2016-12-09 13:22:38',1,NULL,1,3,3,'2016-12-09 13:22:39',2,0),(10,'aa','2016-12-09 13:17:09',1,NULL,1,7,1,NULL,2,0),(11,'aass','2016-12-09 13:17:11',1,NULL,1,7,1,NULL,2,0),(12,'aasssss','2016-12-09 13:22:33',1,NULL,1,3,3,'2016-12-09 13:22:33',1,0),(13,'dadas','2016-12-09 14:14:52',1,NULL,1,1,1,NULL,1,0);
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
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mensagens_excluidas`
--

LOCK TABLES `mensagens_excluidas` WRITE;
/*!40000 ALTER TABLE `mensagens_excluidas` DISABLE KEYS */;
INSERT INTO `mensagens_excluidas` VALUES (1,2,5,0,'2016-12-08 16:24:24'),(2,6,5,0,'2016-12-08 16:24:24'),(3,8,5,0,'2016-12-08 16:24:24'),(4,9,5,0,'2016-12-08 16:24:24'),(5,10,5,0,'2016-12-08 16:24:24'),(6,11,5,0,'2016-12-08 16:24:24'),(7,12,5,0,'2016-12-08 16:24:24'),(8,1,5,0,'2016-12-08 16:24:33'),(9,3,5,0,'2016-12-08 16:24:33'),(10,5,5,0,'2016-12-08 16:24:33'),(11,7,5,0,'2016-12-08 16:24:33'),(12,13,5,0,'2016-12-08 16:24:33'),(13,14,5,0,'2016-12-08 16:24:33'),(14,15,5,0,'2016-12-08 16:24:33'),(15,16,5,0,'2016-12-08 16:24:33');
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
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `midia`
--

LOCK TABLES `midia` WRITE;
/*!40000 ALTER TABLE `midia` DISABLE KEYS */;
INSERT INTO `midia` VALUES (1,'HTTP://172.17.0.2/Quickpeek//file/midia/mda/PtJ-2016-11-08-15-20-02.png','2016-11-08 15:20:02',0,2,2),(2,'HTTP://172.17.0.2/Quickpeek//file/midia/mda/eH7-2016-11-08-15-39-56.png','2016-11-08 15:39:56',1,2,2),(3,'HTTP://172.17.0.2/Quickpeek//file/midia/mda/Xll-2016-11-11-16-12-46.png','2016-11-11 16:12:46',1,1,1),(4,'HTTP://172.17.0.2/Quickpeek//file/midia/mda/srW-2016-11-17-15-11-46.png','2016-11-17 15:11:46',1,1,2),(5,'HTTP://172.17.0.2/Quickpeek//file/midia/mda/Yrs-2016-11-17-16-07-01.png','2016-11-17 16:07:01',1,1,1),(6,'HTTP://172.17.0.2/Quickpeek//file/midia/mda/mEz-2016-11-17-16-07-04.png','2016-11-18 16:07:04',1,1,2),(7,'HTTP://172.17.0.2/Quickpeek//file/midia/mda/ouR-2016-11-22-13-20-34.png','2016-11-22 13:20:34',1,4,2),(8,'HTTP://172.17.0.2/Quickpeek//file/midia/mda/aKY-2016-11-22-13-31-12.jpg','2016-11-22 13:31:13',1,4,2),(9,'HTTP://172.17.0.2/Quickpeek//file/midia/mda/cKB-2016-12-06-13-15-51.png','2016-12-06 13:15:51',1,1,1),(10,'HTTP://172.17.0.2/Quickpeek//file/midia/mda/1nb-2016-12-12-16-24-34.png','2016-12-12 16:24:34',1,37,4),(11,'HTTP://172.17.0.2/Quickpeek//file/midia/mda/Xce-2016-12-12-16-24-36.png','2016-12-12 16:24:36',1,37,4),(12,'HTTP://172.17.0.2/Quickpeek//file/midia/mda/qvR-2016-12-12-16-24-36.png','2016-12-12 16:24:36',1,37,4),(13,'HTTP://172.17.0.2/Quickpeek//file/midia/mda/lE4-2016-12-12-16-24-36.png','2016-12-12 16:24:36',1,37,4),(14,'HTTP://172.17.0.2/Quickpeek//file/midia/mda/qql-2016-12-12-16-24-37.png','2016-12-12 16:24:37',1,37,4),(15,'HTTP://172.17.0.2/Quickpeek//file/midia/mda/QiX-2016-12-12-16-24-37.png','2016-12-12 16:24:37',1,37,4),(16,'HTTP://172.17.0.2/Quickpeek//file/midia/mda/OlL-2016-12-12-16-25-29.png','2016-12-12 16:25:29',1,1,23),(17,'HTTP://172.17.0.2/Quickpeek//file/midia/mda/Nku-2016-12-12-16-25-29.png','2016-12-12 16:25:29',1,1,23),(18,'HTTP://172.17.0.2/Quickpeek//file/midia/mda/lHe-2016-12-12-16-25-29.png','2016-12-12 16:25:29',1,1,23),(19,'HTTP://172.17.0.2/Quickpeek//file/midia/mda/hi8-2016-12-12-16-25-30.png','2016-12-12 16:25:30',1,1,23),(20,'HTTP://172.17.0.2/Quickpeek//file/midia/mda/VN2-2016-12-12-16-25-38.png','2016-12-12 16:25:38',1,1,23),(21,'HTTP://172.17.0.2/Quickpeek//file/midia/mda/pfS-2016-12-12-16-25-38.png','2016-12-12 16:25:38',1,1,23),(22,'HTTP://172.17.0.2/Quickpeek//file/midia/mda/nF4-2016-12-12-16-25-38.png','2016-12-12 16:25:38',1,1,23),(23,'HTTP://172.17.0.2/Quickpeek//file/midia/mda/PQa-2016-12-12-16-25-39.png','2016-12-12 16:25:39',1,1,23),(24,'HTTP://172.17.0.2/Quickpeek//file/midia/mda/PQa-2016-12-12-16-25-39.png','2016-12-12 16:25:39',1,1,23),(25,'HTTP://172.17.0.2/Quickpeek//file/midia/mda/iK1-2016-12-12-16-27-03.png','2016-12-12 16:27:03',1,1,23),(26,'HTTP://172.17.0.2/Quickpeek//file/midia/mda/st8-2016-12-12-16-27-32.png','2016-12-12 16:27:32',1,1,23),(27,'HTTP://172.17.0.2/Quickpeek//file/midia/mda/yLN-2016-12-12-16-28-06.png','2016-11-12 16:28:06',1,1,41),(28,'HTTP://172.17.0.2/Quickpeek//file/midia/mda/bcl-2016-12-12-16-28-07.png','2016-12-13 16:28:07',1,1,49);
/*!40000 ALTER TABLE `midia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notificacoes`
--

DROP TABLE IF EXISTS `notificacoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notificacoes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario_id` int(11) DEFAULT NULL,
  `usuario_acao_id` int(11) DEFAULT NULL,
  `tipo_id` int(11) DEFAULT NULL,
  `resposta_id` int(11) DEFAULT NULL,
  `hashtag_local_id` int(11) DEFAULT NULL,
  `midia_id` int(11) DEFAULT NULL,
  `visualizado` tinyint(4) DEFAULT '0',
  `ativo` tinyint(4) DEFAULT NULL,
  `momento` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_notificacoes_1_idx` (`usuario_id`),
  KEY `fk_notificacoes_2_idx` (`usuario_acao_id`),
  KEY `fk_notificacoes_3_idx` (`tipo_id`),
  KEY `fk_notificacoes_4_idx` (`resposta_id`),
  KEY `fk_notificacoes_5_idx` (`hashtag_local_id`),
  KEY `fk_notificacoes_6_idx` (`midia_id`),
  CONSTRAINT `fk_notificacoes_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_notificacoes_2` FOREIGN KEY (`usuario_acao_id`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_notificacoes_3` FOREIGN KEY (`tipo_id`) REFERENCES `tipo_notificacoes` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_notificacoes_4` FOREIGN KEY (`resposta_id`) REFERENCES `respostas` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_notificacoes_5` FOREIGN KEY (`hashtag_local_id`) REFERENCES `hashtag_local` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_notificacoes_6` FOREIGN KEY (`midia_id`) REFERENCES `midia` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notificacoes`
--

LOCK TABLES `notificacoes` WRITE;
/*!40000 ALTER TABLE `notificacoes` DISABLE KEYS */;
INSERT INTO `notificacoes` VALUES (3,3,5,1,NULL,NULL,NULL,0,1,'2016-12-19 14:26:33'),(4,22,5,2,NULL,NULL,NULL,0,1,'2016-12-19 14:51:01'),(11,5,3,3,30,NULL,NULL,0,1,'2016-12-19 16:51:06'),(12,5,3,3,30,NULL,NULL,0,1,'2016-12-19 16:51:40');
/*!40000 ALTER TABLE `notificacoes` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `numerounico_usuario`
--

LOCK TABLES `numerounico_usuario` WRITE;
/*!40000 ALTER TABLE `numerounico_usuario` DISABLE KEYS */;
INSERT INTO `numerounico_usuario` VALUES (1,NULL,NULL,0,'2016-12-02 16:28:22'),(2,NULL,'519819457456456454654',0,'2016-12-02 16:29:28'),(3,NULL,'159',0,'2016-12-02 18:01:52'),(4,NULL,'147',0,'2016-12-02 18:02:13'),(5,1,'147',0,'2016-12-02 18:02:25'),(6,1,'147',0,'2016-12-02 18:04:02'),(7,29,'11111',0,'2016-12-02 18:18:06'),(8,26,NULL,0,'2016-12-02 18:12:14'),(9,1,'11111',0,'2016-12-02 18:14:57'),(10,30,'202028282929',0,'2016-12-02 18:19:22'),(11,30,'202028282929',0,'2016-12-02 18:26:42'),(12,30,NULL,0,'2016-12-05 13:07:51'),(13,31,NULL,0,'2016-12-05 13:08:01'),(14,32,'12312313321',0,'2016-12-05 13:09:13'),(15,33,'sdsdsds',0,'2016-12-05 13:10:44'),(16,32,'sdsdsds',0,'2016-12-05 13:10:35'),(17,33,'sdsdsds',0,'2016-12-05 13:11:37'),(18,34,'123123123212313',0,'2016-12-05 13:14:45'),(19,NULL,'123123111111111',0,'2016-12-05 13:15:16'),(20,34,'123123111111111',0,'2016-12-05 13:15:35'),(21,1,'123123111111111',0,'2016-12-05 13:16:57'),(22,1,NULL,0,'2016-12-09 14:40:09'),(23,37,NULL,0,'2016-12-12 14:34:29'),(25,39,NULL,0,'2016-12-14 18:12:17'),(26,40,NULL,0,'2016-12-14 18:13:20'),(27,41,NULL,0,'2016-12-19 17:24:51'),(28,42,NULL,0,'2016-12-19 17:25:34'),(29,3,NULL,1,'2016-12-19 17:26:43'),(30,43,NULL,1,'2016-12-19 17:26:48'),(31,44,NULL,1,'2016-12-19 17:30:08');
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
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `perguntas`
--

LOCK TABLES `perguntas` WRITE;
/*!40000 ALTER TABLE `perguntas` DISABLE KEYS */;
INSERT INTO `perguntas` VALUES (4,'2',1,'2016-11-24 15:38:41',1,2,1,1),(5,'dasdas',0,'2016-11-16 16:52:53',1,1,1,1),(6,'dasdas2',0,'2016-11-16 16:52:54',1,1,1,1),(7,'dasdas23',0,'2016-11-16 16:52:55',1,1,1,1),(8,'zzz',0,'2016-11-16 16:53:02',1,1,2,1),(9,'zzz333',0,'2016-11-16 16:53:03',1,1,2,1),(10,'Ola',0,'2016-11-21 15:28:39',1,2,2,1),(11,'Ola1',0,'2016-11-21 15:28:40',1,2,2,1),(12,'Ola12',0,'2016-11-21 15:28:42',1,2,2,1),(13,'dasdasdsa',1,'2016-11-23 12:51:55',1,4,2,1),(14,'dasdasdsa',0,'2016-11-22 16:08:07',1,4,1,1),(15,'1',0,'2016-11-23 13:29:18',1,2,2,1),(16,'2',0,'2016-11-23 13:29:21',1,2,2,1),(17,'3',0,'2016-11-23 13:29:22',1,2,2,1),(18,'1',0,'2016-11-24 15:30:32',1,1,2,3),(19,'131231',0,'2016-11-24 15:31:01',1,1,1,3),(20,'131231',0,'2016-11-24 15:31:12',1,1,1,3),(21,'131231',0,'2016-11-24 15:31:41',1,1,1,1),(22,'teste1',0,'2016-11-10 15:32:30',1,1,2,1),(23,'teste1',0,'2016-11-10 15:32:36',1,1,2,1),(24,'teste1',0,'2016-11-24 15:33:08',1,1,2,3),(25,'teste1',0,'2016-11-24 15:33:28',1,1,2,1),(26,'teste1',0,'2016-11-24 15:34:46',1,1,2,1),(27,'teste1',0,'2016-11-24 15:35:05',1,1,2,2),(28,'teste1',0,'2016-11-24 15:35:18',1,1,2,1),(29,'teste1',0,'2016-11-24 15:35:55',1,1,2,3),(30,'dasda',0,'2016-12-07 14:57:44',1,2,1,1),(31,'dasda',0,'2016-12-07 14:57:47',1,2,1,1),(32,'dasda',0,'2016-12-07 14:57:47',1,2,1,1),(33,'1124312',0,'2016-12-07 14:59:09',1,2,2,1),(34,'1124312',0,'2016-12-07 14:59:13',1,2,2,1),(35,'1124312',0,'2016-12-07 14:59:14',1,2,2,1),(36,'perguntateste1',0,'2016-12-08 12:44:31',1,5,39,3),(37,'perguntateste1',0,'2016-12-08 12:44:34',1,5,39,2),(38,'perguntateste1',0,'2016-12-08 10:44:35',1,5,39,1),(39,'412312321321321312',0,'2016-12-14 17:27:56',1,1,2,2),(40,'dasdasdas',1,'2016-12-19 16:43:08',1,5,45,2);
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
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `respostas`
--

LOCK TABLES `respostas` WRITE;
/*!40000 ALTER TABLE `respostas` DISABLE KEYS */;
INSERT INTO `respostas` VALUES (2,'11',NULL,0,1,1,4,1,'2016-11-24 15:36:45'),(3,'11',NULL,1,1,1,4,1,'2016-11-24 15:37:27'),(4,'11',NULL,1,1,1,4,1,'2016-11-24 15:37:29'),(5,'11',NULL,1,1,1,4,1,'2016-11-24 15:37:35'),(6,'11',NULL,1,3,1,4,1,'2016-11-24 15:37:36'),(7,'11',NULL,1,3,1,4,1,'2016-11-24 15:37:36'),(8,'11',NULL,1,3,1,4,1,'2016-11-24 15:37:36'),(9,'11',NULL,1,3,12,4,1,'2016-11-24 15:37:36'),(10,'11',NULL,1,3,1,4,1,'2016-11-24 15:37:36'),(11,'11',NULL,1,3,1,4,1,'2016-11-24 15:37:37'),(12,'11',NULL,1,3,5,4,1,'2016-11-24 15:37:37'),(13,'11',NULL,1,3,1,4,1,'2016-11-24 15:37:37'),(14,'11',NULL,1,3,4,4,1,'2016-11-24 15:37:37'),(15,'113',NULL,0,2,3,4,1,'2016-11-24 15:38:18'),(16,'113','HTTP://172.17.0.2/Quickpeek//file/imagem/img/tKi-2016-11-24-15-38-32.png',0,2,2,4,1,'2016-11-24 15:38:32'),(17,NULL,'HTTP://172.17.0.2/Quickpeek//file/imagem/img/K2Q-2016-11-24-15-38-41.png',0,2,1,4,1,'2016-11-24 15:38:41'),(18,'dasdas',NULL,0,1,1,39,1,'2016-12-14 17:30:49'),(21,'dasdasdsa',NULL,0,2,5,40,1,'2016-12-19 16:43:20'),(22,'dasdasdsa',NULL,0,2,5,40,1,'2016-12-19 16:46:31'),(23,'dasdas','HTTP://172.17.0.2/Quickpeek//file/imagem/img/U3R-2016-12-19-16-46-51.query',0,2,3,40,1,'2016-12-19 16:46:51'),(24,'dasdas','HTTP://172.17.0.2/Quickpeek//file/imagem/img/WMg-2016-12-19-16-47-35.query',0,2,3,40,1,'2016-12-19 16:47:35'),(25,'dasdas','HTTP://172.17.0.2/Quickpeek//file/imagem/img/Vuj-2016-12-19-16-47-53.query',0,2,3,40,1,'2016-12-19 16:47:53'),(26,'dasdas','HTTP://172.17.0.2/Quickpeek//file/imagem/img/vFB-2016-12-19-16-48-33.query',0,2,3,40,1,'2016-12-19 16:48:33'),(27,'dasdas','HTTP://172.17.0.2/Quickpeek//file/imagem/img/sOH-2016-12-19-16-49-20.query',0,2,3,40,1,'2016-12-19 16:49:20'),(28,'dasdas','HTTP://172.17.0.2/Quickpeek//file/imagem/img/RX5-2016-12-19-16-49-35.query',0,2,3,40,1,'2016-12-19 16:49:35'),(29,'dasdas','HTTP://172.17.0.2/Quickpeek//file/imagem/img/mMq-2016-12-19-16-51-06.query',0,2,3,40,1,'2016-12-19 16:51:06'),(30,'dasdas','HTTP://172.17.0.2/Quickpeek//file/imagem/img/0Tj-2016-12-19-16-51-40.query',0,2,3,40,1,'2016-12-19 16:51:40');
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
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seguir`
--

LOCK TABLES `seguir` WRITE;
/*!40000 ALTER TABLE `seguir` DISABLE KEYS */;
INSERT INTO `seguir` VALUES (1,'2016-11-08 16:37:31',1,4,1,1,'2016-11-08 16:37:31'),(2,'2016-11-09 14:01:11',1,3,1,1,NULL),(3,'2016-11-09 14:16:51',1,3,2,1,NULL),(4,'2016-11-09 14:25:26',1,1,3,1,NULL),(5,'2016-11-11 16:19:05',1,3,5,1,NULL),(7,'2016-11-11 16:19:05',1,9,11,1,NULL),(8,'2016-11-11 16:19:05',1,11,10,1,NULL),(9,'2016-11-22 15:10:14',1,2,4,1,'2016-11-22 15:10:14'),(10,'2016-11-28 16:39:04',0,19,5,1,'0000-00-00 00:00:00'),(11,'2016-11-28 16:40:15',0,19,8,0,NULL),(12,'2016-11-28 16:42:34',0,19,5,0,NULL),(13,'2016-11-28 16:42:36',0,19,8,0,NULL),(14,'2016-11-28 16:42:53',0,19,8,0,NULL),(15,'2016-11-28 16:43:09',0,19,8,0,NULL),(16,'2016-11-28 16:43:49',0,19,8,1,'2016-11-28 16:43:49'),(17,'2016-11-28 16:46:37',0,19,8,1,'2016-11-28 16:46:37'),(18,'2016-11-28 16:48:43',0,19,8,0,NULL),(19,'2016-11-28 16:50:01',1,19,8,1,'2016-11-28 16:50:01'),(20,'2016-11-29 16:51:43',1,22,1,1,'2016-11-29 16:51:43'),(21,'2016-11-29 16:51:45',1,22,2,1,'2016-11-29 16:51:45'),(22,'2016-11-29 16:51:46',1,22,3,0,NULL),(23,'2016-11-29 16:51:47',1,22,4,0,NULL),(24,'2016-11-29 16:51:49',1,22,5,1,'2016-12-19 14:51:00'),(25,'2016-11-29 16:51:54',1,22,6,0,NULL),(26,'2016-11-29 16:51:57',1,22,7,0,NULL),(30,'2016-11-29 16:51:43',1,1,22,1,NULL),(31,'2016-11-29 16:51:43',1,1,2,1,'2016-11-29 16:51:43'),(32,'2016-12-19 14:04:55',1,5,2,1,'2016-12-19 14:04:55'),(33,'2016-12-19 14:05:02',1,5,1,1,'2016-12-19 14:05:02'),(35,'2016-12-19 14:07:43',0,5,3,0,NULL),(36,'2016-12-19 14:08:01',0,5,3,0,NULL),(37,'2016-12-19 14:18:45',0,5,3,0,NULL),(38,'2016-12-19 14:26:01',0,5,3,0,NULL),(39,'2016-12-19 14:26:33',1,5,3,0,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=106 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessaobanco`
--

LOCK TABLES `sessaobanco` WRITE;
/*!40000 ALTER TABLE `sessaobanco` DISABLE KEYS */;
INSERT INTO `sessaobanco` VALUES (1,'2016-12-06 15:30:01',1,'fe8GSFNIdSKto9kohzfU1U7guEj6VdCVqVw9dkaitwVvMX0oIAWwq5cTONJOU2CgM8b76wXiFtzW2NGNGvD6gK2MgMmDSIyLVXF9','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"5\",\"local\":\"1\"},\"locaisNotIn\":[\"2\",\"1\"],\"codSess\":\"fe8GSFNIdSKto9kohzfU1U7guEj6VdCVqVw9dkaitwVvMX0oIAWwq5cTONJOU2CgM8b76wXiFtzW2NGNGvD6gK2MgMmDSIyLVXF9\",\"idSess\":\"1\"}'),(2,'2016-12-06 15:31:05',1,'U6Asmx3ApQCNcHzRQsKsnTnuWETbyx3CqABlBc035lNenMdx9WIUfqa5xAKvyPJJT1llXa03xRSXcxcm2wdqCrVWu4S5AyXllaaV','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"5\",\"local\":\"1\"},\"locaisNotIn\":[\"2\",\"1\"],\"codSess\":\"U6Asmx3ApQCNcHzRQsKsnTnuWETbyx3CqABlBc035lNenMdx9WIUfqa5xAKvyPJJT1llXa03xRSXcxcm2wdqCrVWu4S5AyXllaaV\",\"idSess\":\"2\"}'),(3,'2016-12-06 15:36:53',1,'DXvaKpRiS1ElRxkEYS7G6SYTJvaECC5BsBzO7xYEi0P7qy19P5pPUtGltMqssO4Hd0QWzWRjc8J98dPj3Vk4FjWIZin5OEozrulh','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"5\",\"local\":\"1\"},\"locaisNotIn\":[\"2\",\"1\"],\"codSess\":\"DXvaKpRiS1ElRxkEYS7G6SYTJvaECC5BsBzO7xYEi0P7qy19P5pPUtGltMqssO4Hd0QWzWRjc8J98dPj3Vk4FjWIZin5OEozrulh\",\"idSess\":\"3\"}'),(4,'2016-12-06 15:36:55',1,'k7MqyR3lW989BavcxKbJg3cPYWElAEOwOrwVGsrHw7onfKAl5824VBI34X4gvppuAMT4CMSRnrcMINvBHigwy1sIT6kk8NcRyYAM','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"5\",\"local\":\"1\"},\"locaisNotIn\":[\"2\",\"1\"],\"codSess\":\"k7MqyR3lW989BavcxKbJg3cPYWElAEOwOrwVGsrHw7onfKAl5824VBI34X4gvppuAMT4CMSRnrcMINvBHigwy1sIT6kk8NcRyYAM\",\"idSess\":\"4\"}'),(5,'2016-12-06 15:37:06',1,'dhiJ3XE3vXsp10S8El2OoMkeB163j7sLNK2R9FwcnPU6hZUVGCpoppZ0KSg8tyUNq3A5EwJQaLq5jWaHvhYxNG0wlMVWfDsj46a8','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"1\",\"local\":\"1\"},\"locaisNotIn\":[\"2\",\"1\"],\"codSess\":\"dhiJ3XE3vXsp10S8El2OoMkeB163j7sLNK2R9FwcnPU6hZUVGCpoppZ0KSg8tyUNq3A5EwJQaLq5jWaHvhYxNG0wlMVWfDsj46a8\",\"idSess\":\"5\"}'),(6,'2016-12-06 15:39:43',1,'XxNtffPONS6UuGi7DQDjfX4pCzIDDbDi75QY7Qu3kqO3haQCowfKbZZm6AAuPlSctwQJjHdfUHO2HjQU6ok9Srbq5ATujwj7LHcl','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"1\",\"local\":\"1\"},\"locaisNotIn\":[\"2\",\"1\"],\"codSess\":\"XxNtffPONS6UuGi7DQDjfX4pCzIDDbDi75QY7Qu3kqO3haQCowfKbZZm6AAuPlSctwQJjHdfUHO2HjQU6ok9Srbq5ATujwj7LHcl\",\"idSess\":\"6\"}'),(18,'2016-12-06 16:38:38',1,'Gf9IG5vqLOG7OzAMCL3UwRqW0ZCV9HnGgbGnOClnJeiuyUUWtzXYqVUAI1BbdkK6chRFhyFZcCG4B45SCK2wClvBVT4oauAAXX4k','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"locaisNotIn\":[\"1\",\"2\"],\"codSess\":\"Gf9IG5vqLOG7OzAMCL3UwRqW0ZCV9HnGgbGnOClnJeiuyUUWtzXYqVUAI1BbdkK6chRFhyFZcCG4B45SCK2wClvBVT4oauAAXX4k\",\"idSess\":\"18\"}'),(19,'2016-12-06 16:40:52',1,'KzEc81KwT43OddtUU3jfQUXUatXeixdtk3UKD5lpb3wRgS1xN5owhtOesbNpwoaukFIc0ER89y0sOLMsNFKbN0pUaeNT5TLD1RpM','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"locaisNotIn\":null,\"codSess\":\"KzEc81KwT43OddtUU3jfQUXUatXeixdtk3UKD5lpb3wRgS1xN5owhtOesbNpwoaukFIc0ER89y0sOLMsNFKbN0pUaeNT5TLD1RpM\",\"idSess\":\"19\"}'),(20,'2016-12-06 16:41:24',1,'z5SxRibjUs7Q8YHX6GPY8PNXD8vV0LJQn5OmzlNkQgt5dAxPweEPDxdTNlAFOGX0ay4DbIVjyPmMzEeVPlAK7Lrrw1jd87du8VNr','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"locaisNotIn\":null,\"codSess\":\"z5SxRibjUs7Q8YHX6GPY8PNXD8vV0LJQn5OmzlNkQgt5dAxPweEPDxdTNlAFOGX0ay4DbIVjyPmMzEeVPlAK7Lrrw1jd87du8VNr\",\"idSess\":\"20\"}'),(25,'2016-12-06 16:44:49',1,'kqxbMrRzEwAcRzS5ROTTFggab3IadVHkoLGlODUsLFaFIOCB2PWZ4F9RLJSOf7FrdnQEVpMJlhREJsBbMC3PskgG3KOi3YXVEaiC','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"locaisNotIn\":[\"1\",\"2\"],\"codSess\":\"kqxbMrRzEwAcRzS5ROTTFggab3IadVHkoLGlODUsLFaFIOCB2PWZ4F9RLJSOf7FrdnQEVpMJlhREJsBbMC3PskgG3KOi3YXVEaiC\",\"idSess\":\"25\"}'),(26,'2016-12-06 16:45:32',1,'PwB37ZpyZrNtgFuDJWShzLfftMfKRPAf0VydEZi0cp7Zuz4nzeogvFlAHV6aM5Vk5NUT80TReFs75CBzhqlxUlM8l4UMm8TFhrVl','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"locaisNotIn\":[\"1\",\"2\"],\"codSess\":\"PwB37ZpyZrNtgFuDJWShzLfftMfKRPAf0VydEZi0cp7Zuz4nzeogvFlAHV6aM5Vk5NUT80TReFs75CBzhqlxUlM8l4UMm8TFhrVl\",\"idSess\":\"26\"}'),(27,'2016-12-06 16:45:34',1,'uuTxYwx5ftUohj5AYvGRjjxxQkIRfqoQ3bdwjkODlmHTP1g9FyNB14Vto6fqB3x5UNKvwBfI68g2anopqfxpGYmt8kSCKadk1Hqw','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"locaisNotIn\":[\"1\",\"2\"],\"codSess\":\"uuTxYwx5ftUohj5AYvGRjjxxQkIRfqoQ3bdwjkODlmHTP1g9FyNB14Vto6fqB3x5UNKvwBfI68g2anopqfxpGYmt8kSCKadk1Hqw\",\"idSess\":\"27\"}'),(28,'2016-12-06 16:45:34',1,'VhJrmGqA4ZGvSB3ocH2vq1etXp4MjHI2O8kVY3enE0C74Sg150bK7ljkLStxEr6UxKPdWcmXphHzaU1mHVSd4fzv3oQGsBsl8yqu','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"locaisNotIn\":[\"1\",\"2\"],\"codSess\":\"VhJrmGqA4ZGvSB3ocH2vq1etXp4MjHI2O8kVY3enE0C74Sg150bK7ljkLStxEr6UxKPdWcmXphHzaU1mHVSd4fzv3oQGsBsl8yqu\",\"idSess\":\"28\"}'),(29,'2016-12-06 16:45:48',1,'RzfFpEyHsr1Z46x0OLj5RpXR7C5kmb15w9w1nBj9Ozlyyv7jatUhdES0OMlJg0pc5YTJgB6vnuJ6dwhnN4n1l8NbbToe4hwuakpk','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"1\",\"local\":\"1\"},\"locaisNotIn\":[\"1\",\"2\"],\"codSess\":\"RzfFpEyHsr1Z46x0OLj5RpXR7C5kmb15w9w1nBj9Ozlyyv7jatUhdES0OMlJg0pc5YTJgB6vnuJ6dwhnN4n1l8NbbToe4hwuakpk\",\"idSess\":\"29\"}'),(31,'2016-12-06 16:47:48',1,'xDs0SBi1Ax1NNbhPwpkXl7pvtEAr5cy9vADgqgrw1LEAWs2HbXzOR9Ocyxfpi3Htcl2Grdjp2bcR5efsKGUHkoTckY3hR44OW4VB','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"1\",\"local\":\"1\"},\"locaisNotIn\":[\"2\",\"1\"],\"codSess\":\"xDs0SBi1Ax1NNbhPwpkXl7pvtEAr5cy9vADgqgrw1LEAWs2HbXzOR9Ocyxfpi3Htcl2Grdjp2bcR5efsKGUHkoTckY3hR44OW4VB\",\"idSess\":\"31\"}'),(32,'2016-12-06 16:47:48',1,'9veXdtcQcGxA243yDHLkGqwud65Fv7eePaXGnnHMsnJHvDz1YkEbvovFPt0h4iFe9y432fhRHF6bPLHbnlFpP6IS8BmhDU6uAc4A','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"1\",\"local\":\"1\"},\"locaisNotIn\":[\"2\",\"1\"],\"codSess\":\"9veXdtcQcGxA243yDHLkGqwud65Fv7eePaXGnnHMsnJHvDz1YkEbvovFPt0h4iFe9y432fhRHF6bPLHbnlFpP6IS8BmhDU6uAc4A\",\"idSess\":\"32\"}'),(33,'2016-12-06 16:47:49',1,'HG8MMzH0fN7cnPhy8lQ6w2LI0YR7gaAWGNT2NGMah5IXLuTqygLBzrbkNK646R9OgYdJiXbzAWaeQbnR6WRpXdU2T1Pkh1LcJNtx','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"1\",\"local\":\"1\"},\"locaisNotIn\":[\"2\",\"1\"],\"codSess\":\"HG8MMzH0fN7cnPhy8lQ6w2LI0YR7gaAWGNT2NGMah5IXLuTqygLBzrbkNK646R9OgYdJiXbzAWaeQbnR6WRpXdU2T1Pkh1LcJNtx\",\"idSess\":\"33\"}'),(34,'2016-12-06 16:47:49',1,'X158e5bnekrEqBNmJHPfEdrVXjI4itk5r1KGoFgsYUO0Luom5XCItol4SWKI8fIrLgXwNnEMMLerLeB0ljTtJc0AYKH42DII0THz','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"1\",\"local\":\"1\"},\"locaisNotIn\":[\"2\",\"1\"],\"codSess\":\"X158e5bnekrEqBNmJHPfEdrVXjI4itk5r1KGoFgsYUO0Luom5XCItol4SWKI8fIrLgXwNnEMMLerLeB0ljTtJc0AYKH42DII0THz\",\"idSess\":\"34\"}'),(35,'2016-12-06 16:47:49',1,'ItzYkutlEewjWv9PrcuFYroeOQlK6qQIhlThdFWvk2xfLXchqYnlEKW2zS5fYd6D2ZxwWSzT32MwGPDfiUZE3eE0u5AvAHGPIVen','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"1\",\"local\":\"1\"},\"locaisNotIn\":[\"2\",\"1\"],\"codSess\":\"ItzYkutlEewjWv9PrcuFYroeOQlK6qQIhlThdFWvk2xfLXchqYnlEKW2zS5fYd6D2ZxwWSzT32MwGPDfiUZE3eE0u5AvAHGPIVen\",\"idSess\":\"35\"}'),(36,'2016-12-06 16:47:53',1,'lW3kgkLfVaaIpxrYAM8TldibzCIljnaSNvJHe2GdSqHSKJSLrOTOtSPiwwHEivbqojsOcE3TIEVoIKBpLWH8O6e8jGzg9JIdwFD7','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"1\",\"local\":\"1\"},\"locaisNotIn\":[\"2\",\"1\"],\"codSess\":\"lW3kgkLfVaaIpxrYAM8TldibzCIljnaSNvJHe2GdSqHSKJSLrOTOtSPiwwHEivbqojsOcE3TIEVoIKBpLWH8O6e8jGzg9JIdwFD7\",\"idSess\":\"36\"}'),(37,'2016-12-06 16:47:58',1,'Zxq8IPlheeijDeBz81QZdrxoYheAyDlbICB7BGlJWeoubYn3xVOtbGyr4auaAHWT5dMT3U8y3qiFB9JFibZi6ZLAgqBHS5aB7lLf','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"1\",\"local\":\"1\"},\"locaisNotIn\":[\"2\",\"1\"],\"codSess\":\"Zxq8IPlheeijDeBz81QZdrxoYheAyDlbICB7BGlJWeoubYn3xVOtbGyr4auaAHWT5dMT3U8y3qiFB9JFibZi6ZLAgqBHS5aB7lLf\",\"idSess\":\"37\"}'),(38,'2016-12-06 16:48:04',1,'3bPQofvXf0s8V7jIO11xey4Z6gYOMrECnUad7dbJ1SBeK6FcFwnE4cXztE41nW5GEBRzBhT0Gw0OZCBmU0HNtUIZ7Ew3ZaAGq8Yj','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"1\",\"local\":\"1\"},\"locaisNotIn\":[\"2\",\"1\"],\"codSess\":\"3bPQofvXf0s8V7jIO11xey4Z6gYOMrECnUad7dbJ1SBeK6FcFwnE4cXztE41nW5GEBRzBhT0Gw0OZCBmU0HNtUIZ7Ew3ZaAGq8Yj\",\"idSess\":\"38\"}'),(39,'2016-12-06 16:48:23',1,'Ds1T3M8a7SivmqgKsm2lGjnfPFRWM7zCkTAlTr3c8BqVovzV09yrdgCfK4CX3cCJGE0JSbWolJB2ii20gnQuYwDR5ZvLtCEGNrFZ','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"locaisNotIn\":[\"1\",\"2\"],\"codSess\":\"Ds1T3M8a7SivmqgKsm2lGjnfPFRWM7zCkTAlTr3c8BqVovzV09yrdgCfK4CX3cCJGE0JSbWolJB2ii20gnQuYwDR5ZvLtCEGNrFZ\",\"idSess\":\"39\"}'),(40,'2016-12-06 16:48:47',1,'zPD8FwhhTwOnRHTwB9h1n1EFh3LYugrn19iKqcknHGRoT7hJBjQGhrAG3RjEzeWUsDIYkVIYFqYPerYaor0o4dGDuRda3YbuYwwN','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"locaisNotIn\":[\"1\",\"2\"],\"codSess\":\"zPD8FwhhTwOnRHTwB9h1n1EFh3LYugrn19iKqcknHGRoT7hJBjQGhrAG3RjEzeWUsDIYkVIYFqYPerYaor0o4dGDuRda3YbuYwwN\",\"idSess\":\"40\"}'),(41,'2016-12-06 16:48:47',1,'DoMNs1ONKN0mVXQmIknTqLcEIplug6oFTxnAQ3JgzlXS6B3kbwEPmVRzuHoz4zmMhXfyKo5bRxQqQX9ZaJ2kYz3SZkymoVrU8Iap','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"locaisNotIn\":[\"1\",\"2\"],\"codSess\":\"DoMNs1ONKN0mVXQmIknTqLcEIplug6oFTxnAQ3JgzlXS6B3kbwEPmVRzuHoz4zmMhXfyKo5bRxQqQX9ZaJ2kYz3SZkymoVrU8Iap\",\"idSess\":\"41\"}'),(42,'2016-12-06 16:48:47',1,'pstB7lGGfuHrhFyENEBLwAQofDb1bKXafzjH2HR5Rvkw74vjFCjXsP9N0yQRUotmjfDodcF0AG2te7v7ORpBXGia45HWpOeK24Zh','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"locaisNotIn\":[\"1\",\"2\"],\"codSess\":\"pstB7lGGfuHrhFyENEBLwAQofDb1bKXafzjH2HR5Rvkw74vjFCjXsP9N0yQRUotmjfDodcF0AG2te7v7ORpBXGia45HWpOeK24Zh\",\"idSess\":\"42\"}'),(43,'2016-12-06 16:48:48',1,'qc6Oln92p3OsGx18xXYXG3Xi0oyeLRlsCoBoZbiKiOoHbXV9pIu6Gd4yUb38Z2blebM8heE1PSOF0cvKevSuO2n2FYzcjSLLSrrc','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"locaisNotIn\":[\"1\",\"2\"],\"codSess\":\"qc6Oln92p3OsGx18xXYXG3Xi0oyeLRlsCoBoZbiKiOoHbXV9pIu6Gd4yUb38Z2blebM8heE1PSOF0cvKevSuO2n2FYzcjSLLSrrc\",\"idSess\":\"43\"}'),(44,'2016-12-06 16:48:48',1,'vRLXGb79LIU5ai1SdcPl9MV4z6zVFLHlWunjb8wLci1jDUBxnikksQEUFEECqQjzm0tZHtncELyRORMu4kjebZdYM813JLOv9o0Q','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"locaisNotIn\":[\"1\",\"2\"],\"codSess\":\"vRLXGb79LIU5ai1SdcPl9MV4z6zVFLHlWunjb8wLci1jDUBxnikksQEUFEECqQjzm0tZHtncELyRORMu4kjebZdYM813JLOv9o0Q\",\"idSess\":\"44\"}'),(45,'2016-12-06 16:48:49',1,'2afY97GOymp0GLhHHx5CtCF0Dcc7fdHxT9IkqQG3u1K3adQyIh8hZ6kdkjUWMPuIwtgpsEaXOtOuz8QCPBy1xb8kwVqNWxd5mOyX','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"locaisNotIn\":[\"1\",\"2\"],\"codSess\":\"2afY97GOymp0GLhHHx5CtCF0Dcc7fdHxT9IkqQG3u1K3adQyIh8hZ6kdkjUWMPuIwtgpsEaXOtOuz8QCPBy1xb8kwVqNWxd5mOyX\",\"idSess\":\"45\"}'),(46,'2016-12-06 16:48:49',1,'UMhdg6p2VTjc8NWA0n1z2ba70BKWPRX8Pks1oR623dLfxD62HBIjJhGpw7MVWZS726uDkpQhM5nqJpjQgLi1xgLbKjo6Lrhnqa6E','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"locaisNotIn\":[\"1\",\"2\"],\"codSess\":\"UMhdg6p2VTjc8NWA0n1z2ba70BKWPRX8Pks1oR623dLfxD62HBIjJhGpw7MVWZS726uDkpQhM5nqJpjQgLi1xgLbKjo6Lrhnqa6E\",\"idSess\":\"46\"}'),(47,'2016-12-06 16:48:49',1,'Fc5wNG2vAEJo1azkEjHcnkrp3k5Wh00znzmEwDLdGG43I9NSYYAuqpnvjyHqgJwXppgnzEM8Py1Tx6bl9ZpmUPA9I29RqrF7KCgB','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"locaisNotIn\":[\"1\",\"2\"],\"codSess\":\"Fc5wNG2vAEJo1azkEjHcnkrp3k5Wh00znzmEwDLdGG43I9NSYYAuqpnvjyHqgJwXppgnzEM8Py1Tx6bl9ZpmUPA9I29RqrF7KCgB\",\"idSess\":\"47\"}'),(48,'2016-12-06 16:48:53',1,'46l6xtKErNpb7fUY85O4J7MML9hRF3pIOzC6IeuaG4m18fzSX9vcnduBT2iOh5xsmVneZ4mAeuwFi30r171VfLJExzBOGzfOnqpR','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"1\",\"local\":\"1\"},\"locaisNotIn\":null,\"codSess\":\"46l6xtKErNpb7fUY85O4J7MML9hRF3pIOzC6IeuaG4m18fzSX9vcnduBT2iOh5xsmVneZ4mAeuwFi30r171VfLJExzBOGzfOnqpR\",\"idSess\":\"48\"}'),(66,'2016-12-06 16:53:31',1,'kZiy1QTbp80uAyQgDzhr558N2kUEK756Qwc7hhLVALzoVdkM7fhcmVl4MNDnQFjSRgUiROdr2I0A2FjswjAQoJXiGVzm1lLFnZ4r','{\"codSess\":\"kZiy1QTbp80uAyQgDzhr558N2kUEK756Qwc7hhLVALzoVdkM7fhcmVl4MNDnQFjSRgUiROdr2I0A2FjswjAQoJXiGVzm1lLFnZ4r\",\"idSess\":\"66\",\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"44\",\"local\":\"26\",\"telefone\":\"123123112313\"},\"locaisNotIn\":[\"35\",\"2\",\"1\",\"4\",\"42\"],\"mensagensId\":[\"3\",\"1\"],\"smsCodigoId\":\"48\",\"categoria16\":1,\"categoria4\":false,\"categoria15\":false,\"categoria13\":false,\"categoria14\":false,\"categoria11\":1,\"categoria0\":false,\"categoria1\":false,\"categoria2\":false,\"categoria3\":false,\"categoria5\":false,\"categoria6\":false,\"categoria7\":false,\"categoria8\":false,\"categoria9\":false,\"categoria10\":false,\"categoria12\":false,\"salvarFoto\":\"HTTP:\\/\\/172.17.0.2\\/Quickpeek\\/\\/file\\/imagem\\/img\\/ggQ-2016-12-12-17-14-43.png\"}'),(67,'2016-12-06 18:48:26',1,'nPatEmXqD49CO5DfwlCd9TvSQ04QJrxUhvh5kQNraMtBTeGtSIp26Leq3OugSm4447IcIvsbrpnSPbjcosJy9SffoJRo81CUMKFe','{\"codSess\":\"nPatEmXqD49CO5DfwlCd9TvSQ04QJrxUhvh5kQNraMtBTeGtSIp26Leq3OugSm4447IcIvsbrpnSPbjcosJy9SffoJRo81CUMKFe\",\"idSess\":\"67\"}'),(68,'2016-12-06 18:53:38',1,'dlpaJdwFIL1XARaICsKZ6GJYmcbWP1NLmT4rNnOqEeTz79RmWkcYSdBuCFJ1M1ZOWGIe2wSvvWgjtTR9TrxgNUAwSh6FAtqGX96r','{\"codSess\":\"dlpaJdwFIL1XARaICsKZ6GJYmcbWP1NLmT4rNnOqEeTz79RmWkcYSdBuCFJ1M1ZOWGIe2wSvvWgjtTR9TrxgNUAwSh6FAtqGX96r\",\"idSess\":\"68\"}'),(69,'2016-12-07 13:48:03',1,'whaBbrINCLX3l86QRU96BL5w3GvVEboGBYDZ9x8lFnLHeR1UaOhZBgSSozJwi4427Eug9wrvvMGufgBDRauA2B1baN4lH5BaoLSD','{\"codSess\":\"whaBbrINCLX3l86QRU96BL5w3GvVEboGBYDZ9x8lFnLHeR1UaOhZBgSSozJwi4427Eug9wrvvMGufgBDRauA2B1baN4lH5BaoLSD\",\"idSess\":\"69\",\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"1\",\"local\":\"1\"},\"locaisNotIn\":[\"1\",\"2\"]}'),(70,'2016-12-07 14:23:42',1,'GbkPoro7qjVSzxdRF5rZPlhyJxxsWSYv13l4oF6vgNM2NTPDnX8tQGfY5ovDvX9VgEvUz19iFrf9XKf7LGaEBoWFOYERQtOJUxpP','{\"codSess\":\"GbkPoro7qjVSzxdRF5rZPlhyJxxsWSYv13l4oF6vgNM2NTPDnX8tQGfY5ovDvX9VgEvUz19iFrf9XKf7LGaEBoWFOYERQtOJUxpP\",\"idSess\":\"70\",\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"locaisNotIn\":[\"1\",\"2\"]}'),(82,'2016-12-07 14:53:00',1,'SwE0iRUdqvCYXKwv2N214gkBERFbrstPuLKJEGvxkFKYXaUtlXrXh3hk72EfrE0ojYA8rgybImyjIC5NPvZ3QuMwgWgJoeKzMVGW','{\"codSess\":\"SwE0iRUdqvCYXKwv2N214gkBERFbrstPuLKJEGvxkFKYXaUtlXrXh3hk72EfrE0ojYA8rgybImyjIC5NPvZ3QuMwgWgJoeKzMVGW\",\"idSess\":\"82\",\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"locaisNotIn\":[\"1\",\"2\"]}'),(83,'2016-12-07 14:59:09',1,'Fg1kq1h7QqyEfMWPLOZQHTUBMHTbfjzfJRswUcTn83GMG7YZtIKYFcxCKJFERoHiPOGqtTQ3ajTzfD5BKvn30JB8o7uI58S4dCie','{\"codSess\":\"Fg1kq1h7QqyEfMWPLOZQHTUBMHTbfjzfJRswUcTn83GMG7YZtIKYFcxCKJFERoHiPOGqtTQ3ajTzfD5BKvn30JB8o7uI58S4dCie\",\"idSess\":\"83\",\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"locaisNotIn\":[\"1\",\"2\"]}'),(85,'2016-12-07 16:56:49',1,'2gaHTd07QrMBcsumGbpw6FG8HaD5onsdDS6fwhruq5tU9tYSgG4hYA13C9nUf6Gs2uACwW5BeYfeZYfjkSX4Vk7GW27tTCRPidwC','{\"codSess\":\"2gaHTd07QrMBcsumGbpw6FG8HaD5onsdDS6fwhruq5tU9tYSgG4hYA13C9nUf6Gs2uACwW5BeYfeZYfjkSX4Vk7GW27tTCRPidwC\",\"idSess\":\"85\",\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"13\",\"local\":\"1\"},\"locaisNotIn\":[\"1\",\"2\"]}'),(86,'2016-12-07 17:07:53',1,'EL9DcKG15gvJsOksOQwELgkZfqgeNA0qy2ktcQsQMYNBaRUqD6gAFUXtEguaQdYMYWJUGEX1gIDpoZhZqTCNNkn2AwhtE3x0WyqL','{\"codSess\":\"EL9DcKG15gvJsOksOQwELgkZfqgeNA0qy2ktcQsQMYNBaRUqD6gAFUXtEguaQdYMYWJUGEX1gIDpoZhZqTCNNkn2AwhtE3x0WyqL\",\"idSess\":\"86\",\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"13\",\"local\":\"1\"},\"locaisNotIn\":[\"1\",\"2\"]}'),(88,'2016-12-08 13:26:40',1,'1D2DdK8ZVTUq8apIZmCTKnwGDb2UiUJVbaE1MHF6p91hYD9pxZ39dt0XEz4eN7NoZnVpvk61lXrjw6PcxvRylps26bYa9M07tC6l','{\"codSess\":\"1D2DdK8ZVTUq8apIZmCTKnwGDb2UiUJVbaE1MHF6p91hYD9pxZ39dt0XEz4eN7NoZnVpvk61lXrjw6PcxvRylps26bYa9M07tC6l\",\"idSess\":\"88\",\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"5\",\"local\":\"1\"},\"locaisNotIn\":[\"1\",\"2\"]}'),(89,'2016-12-08 13:33:01',1,'jxbMVcq3e899EEJo9uakLsaeSqeh3tXexmvnTUAAO1oyrkzCAqciEKAfGNVOapKexyTN83Lj0Sx2zarBjGvARvI2Sfqusekspa06','{\"codSess\":\"jxbMVcq3e899EEJo9uakLsaeSqeh3tXexmvnTUAAO1oyrkzCAqciEKAfGNVOapKexyTN83Lj0Sx2zarBjGvARvI2Sfqusekspa06\",\"idSess\":\"89\",\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"5\",\"local\":\"1\"},\"locaisNotIn\":[\"1\",\"2\"]}'),(90,'2016-12-08 15:12:10',1,'gbp688zIp0vuomtwfniAxBQSut3LamM36fxFN7qhBjeTSTQoPOmI6hXEAEiOrWCX7BI2vLV8SD3Q3OjEgQR7yulYJO9qnL7j9Fsc','{\"codSess\":\"gbp688zIp0vuomtwfniAxBQSut3LamM36fxFN7qhBjeTSTQoPOmI6hXEAEiOrWCX7BI2vLV8SD3Q3OjEgQR7yulYJO9qnL7j9Fsc\",\"idSess\":\"90\",\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"5\",\"local\":\"1\"},\"locaisNotIn\":[\"1\",\"2\"]}'),(91,'2016-12-09 13:16:31',1,'78oY0XuLRTUTKnfz4K88diXnGeibCW1ygX9wyjxwqaOINzYS0bUJXNmFYelBHVHsGRQ9nNpQvXozY0WhDHRrVEpQzxhHCJiZntBv','{\"codSess\":\"78oY0XuLRTUTKnfz4K88diXnGeibCW1ygX9wyjxwqaOINzYS0bUJXNmFYelBHVHsGRQ9nNpQvXozY0WhDHRrVEpQzxhHCJiZntBv\",\"idSess\":\"91\",\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"1\",\"local\":\"1\"},\"locaisNotIn\":[\"1\",\"2\"],\"mensagensId\":[\"3\",\"1\"]}'),(92,'2016-12-12 13:24:12',1,'nYpkxEDYaAdO2N4AJwGVMSi6paCItaoPGXF9bMfvTT8WtTeDEztmsNoYPTf0A1hfo9XlWzTV05XaRRtqxVvGUlbLJjlJDQajjWNg','{\"codSess\":\"nYpkxEDYaAdO2N4AJwGVMSi6paCItaoPGXF9bMfvTT8WtTeDEztmsNoYPTf0A1hfo9XlWzTV05XaRRtqxVvGUlbLJjlJDQajjWNg\",\"idSess\":\"92\"}'),(94,'2016-12-12 16:24:16',1,'PnR8KgAH9fFzIOPpAoCoXaMexeYjA44yuh59x5QTr8So3R2Ttpcl8vZUwX0yLhkXMNfwJn5qMk25gTSLEdkq9wpOuZ2FoHLQSW1W','{\"codSess\":\"PnR8KgAH9fFzIOPpAoCoXaMexeYjA44yuh59x5QTr8So3R2Ttpcl8vZUwX0yLhkXMNfwJn5qMk25gTSLEdkq9wpOuZ2FoHLQSW1W\",\"idSess\":\"94\",\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"1\",\"local\":\"1\"},\"locaisNotIn\":[\"1\",\"2\"],\"mensagensId\":[\"3\",\"1\"],\"smsCodigoId\":\"42\",\"categoria16\":1,\"categoria4\":false,\"categoria15\":false,\"categoria13\":false,\"categoria14\":false,\"categoria11\":1,\"categoria0\":false,\"categoria1\":false,\"categoria2\":false,\"categoria3\":false,\"categoria5\":false,\"categoria6\":false,\"categoria7\":false,\"categoria8\":false,\"categoria9\":false,\"categoria10\":false,\"categoria12\":false,\"salvarFoto\":\"HTTP:\\/\\/172.17.0.2\\/Quickpeek\\/\\/file\\/imagem\\/img\\/xJm-2016-12-12-14-34-04.png\"}'),(95,'2016-12-12 16:56:22',1,'WBMJgDbRYMGNgcjSBlx2LpXhvq6WJDDvFpycquvsOISo7aqucMWalzQqIE1S7kKdLEDlQqav4rdGW8OQGvey4iOcEyQtp3r2MyIu','{\"codSess\":\"WBMJgDbRYMGNgcjSBlx2LpXhvq6WJDDvFpycquvsOISo7aqucMWalzQqIE1S7kKdLEDlQqav4rdGW8OQGvey4iOcEyQtp3r2MyIu\",\"idSess\":\"95\",\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"23\"},\"locaisNotIn\":[\"23\",\"2\",\"1\",\"4\"],\"mensagensId\":[\"3\",\"1\"],\"smsCodigoId\":\"42\",\"categoria16\":1,\"categoria4\":false,\"categoria15\":false,\"categoria13\":false,\"categoria14\":false,\"categoria11\":1,\"categoria0\":false,\"categoria1\":false,\"categoria2\":false,\"categoria3\":false,\"categoria5\":false,\"categoria6\":false,\"categoria7\":false,\"categoria8\":false,\"categoria9\":false,\"categoria10\":false,\"categoria12\":false,\"salvarFoto\":\"HTTP:\\/\\/172.17.0.2\\/Quickpeek\\/\\/file\\/imagem\\/img\\/xJm-2016-12-12-14-34-04.png\"}'),(97,'2016-12-13 13:43:43',1,'93Hc4vqtEgO2rR1GSjYhPDiLpcx34NjRHh7I4n5Y2RwwRg1XFqbQmIHefR7uD8BHiyTTs3CaWEYrHjKhrXK3d0zZT96NoUq77ImP','{\"codSess\":\"93Hc4vqtEgO2rR1GSjYhPDiLpcx34NjRHh7I4n5Y2RwwRg1XFqbQmIHefR7uD8BHiyTTs3CaWEYrHjKhrXK3d0zZT96NoUq77ImP\",\"idSess\":\"97\",\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"23\"},\"locaisNotIn\":[\"23\",\"2\",\"1\",\"4\"],\"mensagensId\":[\"3\",\"1\"],\"smsCodigoId\":\"42\",\"categoria16\":1,\"categoria4\":false,\"categoria15\":false,\"categoria13\":false,\"categoria14\":false,\"categoria11\":1,\"categoria0\":false,\"categoria1\":false,\"categoria2\":false,\"categoria3\":false,\"categoria5\":false,\"categoria6\":false,\"categoria7\":false,\"categoria8\":false,\"categoria9\":false,\"categoria10\":false,\"categoria12\":false,\"salvarFoto\":\"HTTP:\\/\\/172.17.0.2\\/Quickpeek\\/\\/file\\/imagem\\/img\\/ggQ-2016-12-12-17-14-43.png\"}'),(98,'2016-12-13 14:34:34',1,'cOep2kRAiV1s8VCzX3qQD7mSIIdaCS6G41rG4xxrgVQxXmvawlGAJKMYHzi0Ed7xmR4tZJj6JJBBUry9wMCirFqWRaKGKL5MeXbS','{\"codSess\":\"cOep2kRAiV1s8VCzX3qQD7mSIIdaCS6G41rG4xxrgVQxXmvawlGAJKMYHzi0Ed7xmR4tZJj6JJBBUry9wMCirFqWRaKGKL5MeXbS\",\"idSess\":\"98\",\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"23\"},\"locaisNotIn\":[\"23\",\"2\",\"1\",\"4\"],\"mensagensId\":[\"3\",\"1\"],\"smsCodigoId\":\"42\",\"categoria16\":1,\"categoria4\":false,\"categoria15\":false,\"categoria13\":false,\"categoria14\":false,\"categoria11\":1,\"categoria0\":false,\"categoria1\":false,\"categoria2\":false,\"categoria3\":false,\"categoria5\":false,\"categoria6\":false,\"categoria7\":false,\"categoria8\":false,\"categoria9\":false,\"categoria10\":false,\"categoria12\":false,\"salvarFoto\":\"HTTP:\\/\\/172.17.0.2\\/Quickpeek\\/\\/file\\/imagem\\/img\\/ggQ-2016-12-12-17-14-43.png\"}'),(99,'2016-12-14 13:16:32',1,'abOji6jozfPG53zockEzyOElJZQVjLDo6YgqxumdDvlyaPOjeenfEg8hwmjR6XOV7K1DvKihAPcTJxs1Ur3n0Vpef5UgxZEY1AB2','{\"codSess\":\"abOji6jozfPG53zockEzyOElJZQVjLDo6YgqxumdDvlyaPOjeenfEg8hwmjR6XOV7K1DvKihAPcTJxs1Ur3n0Vpef5UgxZEY1AB2\",\"idSess\":\"99\",\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"1\",\"local\":\"2\"},\"locaisNotIn\":[\"23\",\"2\",\"1\",\"4\"],\"mensagensId\":[\"3\",\"1\"],\"smsCodigoId\":\"42\",\"categoria16\":1,\"categoria4\":false,\"categoria15\":false,\"categoria13\":false,\"categoria14\":false,\"categoria11\":1,\"categoria0\":false,\"categoria1\":false,\"categoria2\":false,\"categoria3\":false,\"categoria5\":false,\"categoria6\":false,\"categoria7\":false,\"categoria8\":false,\"categoria9\":false,\"categoria10\":false,\"categoria12\":false,\"salvarFoto\":\"HTTP:\\/\\/172.17.0.2\\/Quickpeek\\/\\/file\\/imagem\\/img\\/ggQ-2016-12-12-17-14-43.png\"}'),(100,'2016-12-14 14:18:08',1,'XQgQdcZPfXK8iBD1ff3CncWwv52TFF4nvuLtamd76GetND3glykFgwREATEgHyrXbmaizmdwbpUtk80jfrnHvG01vKPQEuL3LXJp','{\"codSess\":\"XQgQdcZPfXK8iBD1ff3CncWwv52TFF4nvuLtamd76GetND3glykFgwREATEgHyrXbmaizmdwbpUtk80jfrnHvG01vKPQEuL3LXJp\",\"idSess\":\"100\",\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"3\",\"local\":\"3\"},\"locaisNotIn\":[\"35\",\"2\",\"1\",\"4\",\"42\"],\"mensagensId\":[\"3\",\"1\"],\"smsCodigoId\":\"42\",\"categoria16\":1,\"categoria4\":false,\"categoria15\":false,\"categoria13\":false,\"categoria14\":false,\"categoria11\":1,\"categoria0\":false,\"categoria1\":false,\"categoria2\":false,\"categoria3\":false,\"categoria5\":false,\"categoria6\":false,\"categoria7\":false,\"categoria8\":false,\"categoria9\":false,\"categoria10\":false,\"categoria12\":false,\"salvarFoto\":\"HTTP:\\/\\/172.17.0.2\\/Quickpeek\\/\\/file\\/imagem\\/img\\/ggQ-2016-12-12-17-14-43.png\"}'),(101,'2016-12-14 17:27:56',1,'VdAs8mdMnEA6zaiA5ReMrGEH4XZl3Y1QnIIMU1Wt7cbGIUmryx8BZKBZMppgdtCYJhdMMN33pMwUICDwDUXH0GF6otqmP5BUBIzS','{\"codSess\":\"VdAs8mdMnEA6zaiA5ReMrGEH4XZl3Y1QnIIMU1Wt7cbGIUmryx8BZKBZMppgdtCYJhdMMN33pMwUICDwDUXH0GF6otqmP5BUBIzS\",\"idSess\":\"101\",\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"1\",\"local\":\"26\"},\"locaisNotIn\":[\"35\",\"2\",\"1\",\"4\",\"42\"],\"mensagensId\":[\"3\",\"1\"],\"smsCodigoId\":\"42\",\"categoria16\":1,\"categoria4\":false,\"categoria15\":false,\"categoria13\":false,\"categoria14\":false,\"categoria11\":1,\"categoria0\":false,\"categoria1\":false,\"categoria2\":false,\"categoria3\":false,\"categoria5\":false,\"categoria6\":false,\"categoria7\":false,\"categoria8\":false,\"categoria9\":false,\"categoria10\":false,\"categoria12\":false,\"salvarFoto\":\"HTTP:\\/\\/172.17.0.2\\/Quickpeek\\/\\/file\\/imagem\\/img\\/ggQ-2016-12-12-17-14-43.png\"}'),(105,'2016-12-19 17:23:54',1,'tTesxu5OOzkdaEvIQOkXov1gzuOEKSCUUXwpPekguUs4eBpCDGEsmgpnXVmn8Bk4iZQnChvPMwH4o9pliMtDaLVvgSjholDjQ7MA','{\"codSess\":\"tTesxu5OOzkdaEvIQOkXov1gzuOEKSCUUXwpPekguUs4eBpCDGEsmgpnXVmn8Bk4iZQnChvPMwH4o9pliMtDaLVvgSjholDjQ7MA\",\"idSess\":\"105\",\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"3\",\"local\":\"26\",\"telefone\":\"123156456\"},\"locaisNotIn\":[\"35\",\"2\",\"1\",\"4\",\"42\"],\"mensagensId\":[\"3\",\"1\"],\"smsCodigoId\":\"45\",\"categoria16\":1,\"categoria4\":false,\"categoria15\":false,\"categoria13\":false,\"categoria14\":false,\"categoria11\":1,\"categoria0\":false,\"categoria1\":false,\"categoria2\":false,\"categoria3\":false,\"categoria5\":false,\"categoria6\":false,\"categoria7\":false,\"categoria8\":false,\"categoria9\":false,\"categoria10\":false,\"categoria12\":false,\"salvarFoto\":\"HTTP:\\/\\/172.17.0.2\\/Quickpeek\\/\\/file\\/imagem\\/img\\/ggQ-2016-12-12-17-14-43.png\"}');
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
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sms_codigo`
--

LOCK TABLES `sms_codigo` WRITE;
/*!40000 ALTER TABLE `sms_codigo` DISABLE KEYS */;
INSERT INTO `sms_codigo` VALUES (1,'cJmxpV','5532987072490',7,1,'2016-11-29 16:25:29',1,0,NULL),(2,'A5t4Rt','5532988888888',7,1,'2016-11-29 16:26:20',0,1,21),(7,'Ao8mvu','5532987072490',7,1,'2016-11-29 16:28:45',1,0,NULL),(8,'PqgWvZ','26656565',11,1,'2016-11-29 16:30:48',1,1,22),(9,'hY5QZf','55328987072940',4,1,'2016-12-02 15:36:13',0,0,NULL),(10,'k92KuC','123',11,1,'2016-12-02 18:01:16',1,1,1),(11,'MDbVZZ','123',11,1,'2016-12-02 18:04:02',1,0,NULL),(12,'aNDp2Q','147',11,1,'2016-12-02 18:05:34',1,0,NULL),(13,'Hw2JK1','123',11,1,'2016-12-02 18:14:57',1,0,NULL),(14,'ZTOaCR','12345',11,1,'2016-12-02 18:17:54',1,0,NULL),(15,'C4YagV','123456',11,1,'2016-12-02 18:19:09',1,0,NULL),(16,'Jm3FGR','159159',11,1,'2016-12-02 18:26:42',1,1,30),(17,'rIOhGN','159159',11,1,'2016-12-05 13:07:34',0,0,NULL),(18,'Pu3AWK','159159',11,1,'2016-12-05 13:07:51',1,0,NULL),(19,'ujV14L','321',4,1,'2016-12-05 13:09:06',1,0,NULL),(20,'rYf1dy','321',4,1,'2016-12-05 13:09:50',0,0,NULL),(21,'pvkTzB','321',4,1,'2016-12-05 13:10:35',1,0,NULL),(22,'z6ISua','11',11,1,'2016-12-05 13:11:37',1,1,33),(23,'YmPlrF','159159',11,1,'2016-12-05 13:14:24',0,0,NULL),(24,'I7cEUk','14789',11,1,'2016-12-05 13:14:38',1,0,NULL),(25,'vTXseg','10000',11,1,'2016-12-05 13:15:35',1,1,34),(26,'pigS9r','123',11,1,'2016-12-05 13:16:57',1,0,NULL),(27,'MBIvC6','5532987072490',7,1,'2016-12-07 17:17:44',0,0,NULL),(28,'V1FZkn','5532987072490',7,1,'2016-12-07 17:17:45',0,0,NULL),(29,'NBpvNe','5532987072490',7,1,'2016-12-07 17:18:11',0,0,NULL),(30,'ifDCJO','5532987072490',7,1,'2016-12-07 17:18:11',0,0,NULL),(31,'svkVuK','5532987072490',7,1,'2016-12-07 17:18:12',0,0,NULL),(32,'qpmEfS','5532987072490',7,1,'2016-12-07 17:18:21',0,0,NULL),(33,'PKc24r','5532987072490',7,1,'2016-12-07 17:18:22',0,0,NULL),(34,'tGutQm','5532987072490',7,1,'2016-12-07 17:18:22',0,0,NULL),(35,'f86abE','5532987072490',7,1,'2016-12-07 17:18:41',0,0,NULL),(36,'2uRzB5','5532987072490',1,1,'2016-12-07 17:21:47',0,0,NULL),(37,'IoJR3S','5532987072490',1,1,'2016-12-07 17:22:38',0,0,NULL),(38,'fKf0JZ','5532987072490',1,1,'2016-12-07 17:25:07',0,0,NULL),(39,'hIDher','5532984925880',1,1,'2016-12-07 17:25:27',0,0,NULL),(40,'6KSacF','5532987072490',1,1,'2016-12-07 17:39:44',0,0,NULL),(41,'ivsbyc','5532987072490',1,1,'2016-12-07 17:40:21',0,0,NULL),(42,'PTrrnV','123',11,1,'2016-12-09 14:40:09',1,0,NULL),(43,'f6XiZD','5532987072490',1,1,'2016-12-09 14:53:16',0,0,NULL),(44,'tMIgS7','5532987072490',1,1,'2016-12-09 14:55:26',0,0,NULL),(45,'ZO4Dlx','1',11,1,'2016-12-14 18:13:01',1,0,NULL),(46,'bcTHD7','123156456',11,1,'2016-12-19 17:23:55',1,0,NULL),(47,'8YbQqz','123123112313',11,1,'2016-12-19 17:26:16',0,0,NULL),(48,'UETay2','123123112313',11,1,'2016-12-19 17:26:24',1,0,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status_mensagem`
--

LOCK TABLES `status_mensagem` WRITE;
/*!40000 ALTER TABLE `status_mensagem` DISABLE KEYS */;
INSERT INTO `status_mensagem` VALUES (1,'Enviada','2016-11-11 17:43:10',1),(2,'Entregue','2016-11-11 17:43:10',1),(3,'Visualizada','2016-11-11 17:43:10',1),(4,'Bloqueado','2016-11-11 17:43:10',1);
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
-- Table structure for table `tipo_notificacoes`
--

DROP TABLE IF EXISTS `tipo_notificacoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipo_notificacoes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) DEFAULT NULL,
  `ativo` tinyint(4) DEFAULT NULL,
  `momento` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_notificacoes`
--

LOCK TABLES `tipo_notificacoes` WRITE;
/*!40000 ALTER TABLE `tipo_notificacoes` DISABLE KEYS */;
INSERT INTO `tipo_notificacoes` VALUES (1,'pediu para te seguir',1,'2016-12-14 16:43:10'),(2,'aceitou seu pedido para segui-lo',1,'2016-12-14 16:43:10'),(3,'respondeu a sua pergunta em',1,'2016-12-14 16:43:10'),(4,'fez a sua primeira publicação em',1,'2016-12-14 16:43:10');
/*!40000 ALTER TABLE `tipo_notificacoes` ENABLE KEYS */;
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
  `endereco` varchar(255) DEFAULT NULL,
  `nascimento` date DEFAULT NULL,
  `telefone` varchar(45) DEFAULT NULL,
  `momento` datetime DEFAULT NULL,
  `ativo` tinyint(4) DEFAULT NULL,
  `avatares_id` int(11) DEFAULT NULL,
  `genero_id` int(11) DEFAULT NULL,
  `tutorial` tinyint(4) DEFAULT '0',
  `sms_codigo_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_usuario_genero_idx` (`genero_id`),
  KEY `fk_usuario_avatares1_idx` (`avatares_id`),
  KEY `fk_usuario_1_idx` (`sms_codigo_id`),
  CONSTRAINT `fk_usuario_1` FOREIGN KEY (`sms_codigo_id`) REFERENCES `sms_codigo` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_usuario_avatares1` FOREIGN KEY (`avatares_id`) REFERENCES `avatares` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_usuario_genero` FOREIGN KEY (`genero_id`) REFERENCES `genero` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'editado','HTTP://172.17.0.2/Quickpeek//file/imagem/img/qTa-2016-11-09-13-38-01.png','2000-01-01','123','2016-12-02 18:01:16',1,1,1,3,NULL),(2,'Teste2',NULL,'2000-01-01','3222222222','2016-11-08 16:09:07',1,1,1,0,NULL),(3,'Diego','HTTP://172.17.0.2/Quickpeek//file/imagem/img/qTa-2016-11-09-13-38-01.png','2000-01-01','123123112313','2016-11-09 13:38:01',1,1,1,0,NULL),(4,'editado',NULL,'2000-01-01','123123112313','2016-11-09 15:37:33',1,1,1,0,NULL),(5,'Diego','HTTP://172.17.0.2/Quickpeek//file/imagem/img/B35-2016-11-09-16-16-23.png','2000-01-01','123123112313','2016-11-09 16:16:23',1,1,1,0,NULL),(6,'guilherme',NULL,'2000-01-01','123123112313','2016-11-09 16:54:22',1,2,1,0,NULL),(7,'Diegu','HTTP://172.17.0.2/Quickpeek//file/imagem/img/Tpm-2016-11-09-17-14-46.png','2000-02-12','123123112313','2016-11-09 17:14:46',1,1,1,0,NULL),(8,'1',NULL,'2000-01-01','123123112313','2016-11-10 13:22:39',1,1,1,0,NULL),(9,'1',NULL,'2000-01-01','123123112313','2016-11-10 17:29:42',1,1,1,0,NULL),(10,'Diego',NULL,'2000-01-01','123123112313','2016-11-11 14:30:10',1,1,1,1,NULL),(11,'Diego',NULL,'2000-01-01','123123112313','2016-11-11 16:11:55',1,1,1,0,NULL),(12,'Diego',NULL,'2000-01-01','123123112313','2016-11-11 17:36:17',1,1,1,0,NULL),(13,'Diego',NULL,'2000-01-01','123123112313','2016-11-14 13:35:54',1,1,1,0,NULL),(14,'a','HTTP://172.17.0.2/Quickpeek//file/imagem/img/GgN-2016-11-21-16-50-13.png','2000-01-01','123123112313','2016-11-21 16:50:13',1,1,1,0,NULL),(15,'Usuario1','HTTP://172.17.0.2/Quickpeek//file/imagem/img/KAu-2016-11-25-16-23-04.png','2000-07-09','1234567892','2016-11-25 16:23:04',1,1,1,0,NULL),(16,'Diego','HTTP://172.17.0.2/Quickpeek//file/imagem/img/lNW-2016-11-28-15-18-11.png','2000-01-01','32987072490','2016-11-28 15:18:11',1,1,1,0,NULL),(17,'Diego','HTTP://172.17.0.2/Quickpeek//file/imagem/img/DE8-2016-11-28-15-18-27.png','2000-01-01','32987072490','2016-11-28 15:35:12',1,1,1,6,19),(19,'editado','HTTP://172.17.0.2/Quickpeek//file/imagem/img/8eV-2016-11-28-16-37-28.png','2000-07-18','5532987072490','2016-11-28 16:37:40',1,2,1,4,21),(20,'Diego1','HTTP://172.17.0.2/Quickpeek//file/imagem/img/TFb-2016-11-29-16-12-46.png','2000-01-01','15532987072490','2016-11-29 16:12:46',1,2,1,0,39),(21,'Diego',NULL,'2000-07-17','5532988888888','2016-11-29 16:26:53',1,2,1,0,1),(22,'dadsa',NULL,'2000-01-01','26656565','2016-11-29 16:30:48',1,1,1,0,7),(23,'1',NULL,'2000-01-01','123123112313','2016-12-01 16:31:22',1,1,1,0,NULL),(24,'159159',NULL,'2000-01-01','21695165','2016-12-02 18:06:20',1,1,1,0,12),(26,'159159',NULL,'2000-01-01','21695165','2016-12-02 18:12:14',1,1,1,0,12),(27,'159159',NULL,'2000-01-01','21695165','2016-12-02 18:13:54',1,1,1,0,12),(28,'aaa','HTTP://172.17.0.2/Quickpeek//file/imagem/img/JKt-2016-12-02-18-15-28.png','2000-01-01','123','2016-12-02 18:15:28',1,1,1,0,13),(29,'aaa',NULL,'2000-01-01','12345','2016-12-02 18:18:06',1,1,1,0,14),(30,'2',NULL,'2000-01-01','159159','2016-12-02 18:26:42',1,2,2,0,15),(31,'aaadsdsds',NULL,'2000-01-01','159159','2016-12-05 13:08:01',1,2,2,0,18),(32,'dasdsa',NULL,'2000-01-01','321','2016-12-05 13:09:13',1,1,1,0,19),(33,'adsdasda',NULL,'2000-01-01','11','2016-12-05 13:11:37',1,1,1,0,21),(34,'adsad',NULL,'2000-01-01','10000','2016-12-05 13:15:35',1,1,1,0,24),(36,NULL,'HTTP://172.17.0.2/Quickpeek//file/imagem/img/DvY-2016-12-12-14-26-47.png',NULL,NULL,'2016-12-12 14:26:47',1,NULL,NULL,0,NULL),(37,'Diego','HTTP://172.17.0.2/Quickpeek//file/imagem/img/xJm-2016-12-12-14-34-04.png','2000-01-01','3123123213','2016-12-12 14:34:29',1,1,1,0,42),(39,'dasdasda','HTTP://172.17.0.2/Quickpeek//file/imagem/img/ggQ-2016-12-12-17-14-43.png','2000-01-01','312312312','2016-12-14 18:12:17',1,2,1,0,42),(40,'aaaa','HTTP://172.17.0.2/Quickpeek//file/imagem/img/ggQ-2016-12-12-17-14-43.png','2000-01-01','1','2016-12-14 18:13:20',1,1,1,0,45),(41,'dasdsadsa','HTTP://172.17.0.2/Quickpeek//file/imagem/img/ggQ-2016-12-12-17-14-43.png','2000-01-01',NULL,'2016-12-19 17:24:50',1,1,2,0,46),(42,'dasdsadsa','HTTP://172.17.0.2/Quickpeek//file/imagem/img/ggQ-2016-12-12-17-14-43.png','2000-01-01',NULL,'2016-12-19 17:25:34',1,1,2,0,46),(43,'dasdasda','HTTP://172.17.0.2/Quickpeek//file/imagem/img/ggQ-2016-12-12-17-14-43.png','2000-01-01','123123112313','2016-12-19 17:26:48',1,1,1,0,48),(44,'dasdasda','HTTP://172.17.0.2/Quickpeek//file/imagem/img/ggQ-2016-12-12-17-14-43.png','2000-01-01','123123112313','2016-12-19 17:30:08',1,1,1,0,48);
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

--
-- Table structure for table `visibilidade_mensagens`
--

DROP TABLE IF EXISTS `visibilidade_mensagens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `visibilidade_mensagens` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) DEFAULT NULL,
  `ativo` tinyint(4) DEFAULT NULL,
  `momento` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visibilidade_mensagens`
--

LOCK TABLES `visibilidade_mensagens` WRITE;
/*!40000 ALTER TABLE `visibilidade_mensagens` DISABLE KEYS */;
INSERT INTO `visibilidade_mensagens` VALUES (1,'Publicamente',1,'2016-12-07 17:00:00'),(2,'Anonimamente',1,'2016-12-07 17:00:00');
/*!40000 ALTER TABLE `visibilidade_mensagens` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-12-20 14:04:33
