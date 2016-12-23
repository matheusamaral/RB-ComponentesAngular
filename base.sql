-- MySQL dump 10.13  Distrib 5.7.16, for Linux (x86_64)
--
-- Host: 172.17.0.2    Database: quickpeek
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
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `check_in`
--

LOCK TABLES `check_in` WRITE;
/*!40000 ALTER TABLE `check_in` DISABLE KEYS */;
INSERT INTO `check_in` VALUES (1,'2016-11-14 17:47:04',1,0,7,1,1),(2,'2016-11-14 17:48:53',1,0,5,1,2),(3,'2016-11-16 14:39:02',1,1,6,1,1),(4,'2016-11-16 15:24:54',1,0,4,1,3),(5,'2016-11-17 13:27:25',1,0,3,2,1),(6,'2016-11-17 14:39:07',1,0,2,2,1),(7,'2016-11-17 14:40:38',1,0,1,2,2),(8,'2016-11-22 13:20:26',1,0,4,2,1),(9,'2016-11-23 17:17:09',1,0,1,2,2),(10,'2016-11-23 17:17:10',1,0,1,1,2),(11,'2016-11-23 17:18:02',1,0,1,3,3),(13,'2016-11-23 17:18:08',1,0,1,1,3),(14,'2016-12-06 13:15:21',1,0,1,2,3),(15,'2016-12-06 13:15:45',1,0,1,1,3),(16,'2016-12-09 15:23:43',1,0,1,1,1),(17,'2016-12-09 15:23:43',1,0,1,1,1),(18,'2016-12-12 16:24:23',1,1,37,4,2),(19,'2016-12-13 16:25:22',1,0,1,42,1),(20,'2016-12-13 16:35:40',1,0,5,1,2),(21,'2016-12-13 16:35:42',1,1,5,2,2),(22,'2016-12-14 13:45:54',1,0,3,5,1),(23,'2016-12-14 13:58:06',1,0,3,35,3),(24,'2016-12-14 14:10:57',1,0,3,1,1),(25,'2016-12-14 14:11:12',1,0,3,1,1),(26,'2016-12-14 14:18:08',1,0,3,3,1),(27,'2016-12-14 14:18:11',1,1,3,26,2),(28,'2016-12-21 15:51:00',1,0,4,1,1),(29,'2016-12-21 15:51:03',1,1,4,26,1),(30,'2016-12-21 18:44:34',1,0,1,4,2),(33,'2016-12-22 13:12:35',1,1,9,43,2),(34,'2016-12-22 14:05:42',1,0,2,9,2),(35,'2016-12-22 14:11:53',1,0,2,12,1),(36,'2016-12-22 16:12:39',1,0,1,9,2),(37,'2016-12-22 16:12:42',1,1,1,16,2),(38,'2016-12-22 16:33:50',1,1,2,6,2),(39,'2016-12-22 16:37:31',1,1,7,1,3);
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
  `conta_privada` tinyint(4) DEFAULT '1',
  `contato` tinyint(4) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `fk_configuracoes_usuario1_idx` (`usuario_id`),
  KEY `fk_configuracoes_visibilidade1_idx` (`visibilidade_id`),
  CONSTRAINT `fk_configuracoes_usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_configuracoes_visibilidade1` FOREIGN KEY (`visibilidade_id`) REFERENCES `visibilidade` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `configuracoes`
--

LOCK TABLES `configuracoes` WRITE;
/*!40000 ALTER TABLE `configuracoes` DISABLE KEYS */;
INSERT INTO `configuracoes` VALUES (1,'2016-11-28 17:41:55',1,1,3,1,0,0),(2,'2016-11-08 16:09:07',1,2,1,1,0,1),(3,'2016-11-09 13:38:01',1,3,1,1,1,1),(6,'2016-11-09 15:37:33',1,4,1,1,1,1),(7,'2016-11-09 16:16:23',1,5,1,1,1,1),(8,'2016-11-09 16:39:24',1,6,1,1,1,1),(9,'2016-11-09 17:11:19',1,7,1,1,1,1),(10,'2016-11-09 17:18:25',1,7,1,1,1,1),(11,'2016-11-09 17:18:39',1,7,1,1,1,0),(13,'2016-11-10 13:24:48',1,8,3,0,0,0),(15,'2016-11-10 17:29:42',1,9,1,1,1,1),(16,'2016-11-11 13:00:20',1,10,1,1,1,1),(17,'2016-11-11 16:11:55',1,11,1,1,1,1),(18,'2016-11-11 17:36:17',1,12,1,1,1,1),(19,'2016-11-14 13:35:54',1,13,1,1,1,1),(20,'2016-11-21 16:50:13',1,14,1,1,1,1),(21,'2016-11-25 16:23:04',1,15,1,1,1,1),(22,'2016-11-28 15:18:11',1,16,1,1,1,1),(23,'2016-11-28 15:18:27',1,17,1,1,1,1),(25,'2016-11-28 16:35:21',1,19,1,1,1,1),(26,'2016-11-29 16:12:46',1,20,1,1,1,1),(27,'2016-11-29 16:25:47',1,21,1,1,1,1),(28,'2016-11-29 16:29:00',1,22,1,1,1,1),(29,'2016-12-01 16:31:22',1,23,1,1,1,1),(30,'2016-12-02 18:06:20',1,24,1,1,1,1),(31,'2016-12-02 18:12:14',1,26,1,1,1,1),(32,'2016-12-02 18:13:54',1,27,1,1,1,1),(33,'2016-12-02 18:15:28',1,28,1,1,1,1),(34,'2016-12-02 18:18:06',1,29,1,1,1,1),(35,'2016-12-02 18:19:22',1,30,1,1,1,1),(36,'2016-12-05 13:08:01',1,31,1,1,1,1),(37,'2016-12-05 13:09:13',1,32,1,1,1,1),(38,'2016-12-05 13:10:44',1,33,1,1,1,1),(39,'2016-12-05 13:14:45',1,34,1,1,1,1),(40,'2016-12-12 14:34:29',1,37,1,1,1,1),(42,'2016-12-14 18:12:17',1,39,1,1,1,1),(43,'2016-12-14 18:13:20',1,40,1,1,1,1),(44,'2016-12-19 17:24:51',1,41,1,1,1,1),(45,'2016-12-19 17:25:34',1,42,1,1,1,1),(46,'2016-12-19 17:26:48',1,43,1,1,1,1),(47,'2016-12-19 17:30:08',1,44,1,1,1,1),(48,'2016-12-20 14:54:19',1,45,1,1,1,1),(49,'2016-12-20 14:55:56',1,46,1,1,1,1),(50,'2016-12-20 14:56:31',1,47,1,1,1,1),(51,'2016-12-20 14:57:55',1,48,1,1,1,1),(52,'2016-12-20 15:03:48',1,49,1,1,1,1),(53,'2016-12-20 15:14:43',1,50,1,1,1,1),(54,'2016-12-20 16:31:21',1,51,1,1,1,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hashtag`
--

LOCK TABLES `hashtag` WRITE;
/*!40000 ALTER TABLE `hashtag` DISABLE KEYS */;
INSERT INTO `hashtag` VALUES (1,'321312','2016-12-22 16:33:58',1,2,0);
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hashtag_categoria`
--

LOCK TABLES `hashtag_categoria` WRITE;
/*!40000 ALTER TABLE `hashtag_categoria` DISABLE KEYS */;
INSERT INTO `hashtag_categoria` VALUES (1,'2016-12-22 16:33:58',1,1,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hashtag_local`
--

LOCK TABLES `hashtag_local` WRITE;
/*!40000 ALTER TABLE `hashtag_local` DISABLE KEYS */;
INSERT INTO `hashtag_local` VALUES (1,2,1,6,'2016-12-22 16:33:58',1);
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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mensagens`
--

LOCK TABLES `mensagens` WRITE;
/*!40000 ALTER TABLE `mensagens` DISABLE KEYS */;
INSERT INTO `mensagens` VALUES (2,'Mnesagem1','2016-12-09 13:16:44',1,NULL,1,5,1,NULL,1,1),(3,'Mnesagem12','2016-12-09 13:16:47',1,NULL,2,5,1,NULL,1,1),(4,'Mnesagem123','2016-12-09 13:16:50',1,NULL,3,5,1,NULL,1,1),(5,'Mnesagem1234','2016-12-09 13:16:53',1,NULL,1,5,1,NULL,1,1),(6,'Mnesagem1234','2016-12-09 13:22:35',1,NULL,1,3,3,'2016-12-09 13:22:39',2,0),(7,'Mnesagem12345','2016-12-09 13:22:36',1,NULL,1,3,3,'2016-12-09 13:22:39',2,0),(8,'Mnesagem123456','2016-12-09 13:22:37',1,NULL,1,3,3,'2016-12-09 13:22:39',2,0),(9,'Mnesagem1234567','2016-12-09 13:22:38',1,NULL,1,3,3,'2016-12-09 13:22:39',2,0),(10,'aa','2016-12-09 13:17:09',1,NULL,1,7,1,NULL,2,0),(11,'aass','2016-12-09 13:17:11',1,NULL,1,7,1,NULL,2,0),(12,'aasssss','2016-12-09 13:22:33',1,NULL,1,3,3,'2016-12-09 13:22:33',1,0),(13,'dadas','2016-12-09 14:14:52',1,NULL,1,1,1,NULL,1,1),(14,'asdasdasda1','2016-12-22 17:15:08',1,'HTTP://172.17.0.2/Quickpeek//file/imagem/img/nv7-2016-12-22-17-15-08.desktop',2,1,3,'2016-12-22 17:15:36',2,1);
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `midia`
--

LOCK TABLES `midia` WRITE;
/*!40000 ALTER TABLE `midia` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notificacoes`
--

LOCK TABLES `notificacoes` WRITE;
/*!40000 ALTER TABLE `notificacoes` DISABLE KEYS */;
INSERT INTO `notificacoes` VALUES (1,1,2,4,NULL,1,NULL,0,1,'2016-12-22 16:33:58'),(2,6,2,4,NULL,1,NULL,0,1,'2016-12-22 16:33:58'),(3,9,2,4,NULL,1,NULL,0,1,'2016-12-22 16:33:58'),(4,13,2,4,NULL,1,NULL,0,1,'2016-12-22 16:33:58'),(5,2,21,5,NULL,NULL,NULL,0,1,'2016-12-22 16:34:57'),(6,2,1,3,31,NULL,NULL,0,1,'2016-12-22 16:36:43'),(7,2,7,3,32,NULL,NULL,0,1,'2016-12-22 16:37:55');
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
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `numerounico_usuario`
--

LOCK TABLES `numerounico_usuario` WRITE;
/*!40000 ALTER TABLE `numerounico_usuario` DISABLE KEYS */;
INSERT INTO `numerounico_usuario` VALUES (1,NULL,NULL,0,'2016-12-02 16:28:22'),(2,NULL,'519819457456456454654',0,'2016-12-02 16:29:28'),(3,NULL,'159',0,'2016-12-02 18:01:52'),(4,NULL,'147',0,'2016-12-02 18:02:13'),(5,1,'147',0,'2016-12-02 18:02:25'),(6,1,'147',0,'2016-12-02 18:04:02'),(7,29,'11111',0,'2016-12-02 18:18:06'),(8,26,NULL,0,'2016-12-02 18:12:14'),(9,1,'11111',0,'2016-12-02 18:14:57'),(10,30,'202028282929',0,'2016-12-02 18:19:22'),(11,30,'202028282929',0,'2016-12-02 18:26:42'),(12,30,NULL,0,'2016-12-05 13:07:51'),(13,31,NULL,0,'2016-12-05 13:08:01'),(14,32,'12312313321',0,'2016-12-05 13:09:13'),(15,33,'sdsdsds',0,'2016-12-05 13:10:44'),(16,32,'sdsdsds',0,'2016-12-05 13:10:35'),(17,33,'sdsdsds',0,'2016-12-05 13:11:37'),(18,34,'123123123212313',0,'2016-12-05 13:14:45'),(19,NULL,'123123111111111',0,'2016-12-05 13:15:16'),(20,34,'123123111111111',0,'2016-12-05 13:15:35'),(21,1,'123123111111111',0,'2016-12-05 13:16:57'),(22,1,NULL,0,'2016-12-09 14:40:09'),(23,37,NULL,0,'2016-12-12 14:34:29'),(25,39,NULL,0,'2016-12-14 18:12:17'),(26,40,NULL,0,'2016-12-14 18:13:20'),(27,41,NULL,0,'2016-12-19 17:24:51'),(28,42,NULL,0,'2016-12-19 17:25:34'),(29,3,NULL,1,'2016-12-19 17:26:43'),(30,43,NULL,1,'2016-12-19 17:26:48'),(31,44,NULL,1,'2016-12-19 17:30:08'),(32,45,NULL,1,'2016-12-20 14:54:19'),(33,46,NULL,1,'2016-12-20 14:55:56'),(34,47,NULL,1,'2016-12-20 14:56:31'),(35,48,NULL,1,'2016-12-20 14:57:55'),(36,49,NULL,1,'2016-12-20 15:03:48'),(37,50,NULL,1,'2016-12-20 15:14:43'),(38,51,NULL,1,'2016-12-20 16:31:21');
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
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `perguntas`
--

LOCK TABLES `perguntas` WRITE;
/*!40000 ALTER TABLE `perguntas` DISABLE KEYS */;
INSERT INTO `perguntas` VALUES (4,'2',1,'2016-11-24 15:38:41',1,2,1,1),(5,'dasdas',0,'2016-11-16 16:52:53',1,1,1,1),(6,'dasdas2',0,'2016-11-16 16:52:54',1,1,1,1),(7,'dasdas23',0,'2016-11-16 16:52:55',1,1,1,1),(8,'zzz',0,'2016-11-16 16:53:02',1,1,2,1),(9,'zzz333',0,'2016-11-16 16:53:03',1,1,2,1),(10,'Ola',0,'2016-11-21 15:28:39',1,2,2,1),(11,'Ola1',0,'2016-11-21 15:28:40',1,2,2,1),(12,'Ola12',0,'2016-11-21 15:28:42',1,2,2,1),(13,'dasdasdsa',1,'2016-11-23 12:51:55',1,4,2,1),(14,'dasdasdsa',0,'2016-11-22 16:08:07',1,4,1,1),(15,'1',0,'2016-11-23 13:29:18',1,2,2,1),(16,'2',0,'2016-11-23 13:29:21',1,2,2,1),(17,'3',0,'2016-11-23 13:29:22',1,2,2,1),(18,'1',0,'2016-11-24 15:30:32',1,1,2,3),(19,'131231',0,'2016-11-24 15:31:01',1,1,1,3),(20,'131231',0,'2016-11-24 15:31:12',1,1,1,3),(21,'131231',0,'2016-11-24 15:31:41',1,1,1,1),(22,'teste1',0,'2016-11-10 15:32:30',1,1,2,1),(23,'teste1',0,'2016-11-10 15:32:36',1,1,2,1),(24,'teste1',0,'2016-11-24 15:33:08',1,1,2,3),(25,'teste1',0,'2016-11-24 15:33:28',1,1,2,1),(26,'teste1',0,'2016-11-24 15:34:46',1,1,2,1),(27,'teste1',0,'2016-11-24 15:35:05',1,1,2,2),(28,'teste1',0,'2016-11-24 15:35:18',1,1,2,1),(29,'teste1',0,'2016-11-24 15:35:55',1,1,2,3),(30,'dasda',0,'2016-12-07 14:57:44',1,2,1,1),(31,'dasda',0,'2016-12-07 14:57:47',1,2,1,1),(32,'dasda',0,'2016-12-07 14:57:47',1,2,1,1),(33,'1124312',0,'2016-12-07 14:59:09',1,2,2,1),(34,'1124312',0,'2016-12-07 14:59:13',1,2,2,1),(35,'1124312',0,'2016-12-07 14:59:14',1,2,2,1),(36,'perguntateste1',0,'2016-12-08 12:44:31',1,5,39,3),(37,'perguntateste1',0,'2016-12-08 12:44:34',1,5,39,2),(38,'perguntateste1',0,'2016-12-08 10:44:35',1,5,39,1),(39,'412312321321321312',0,'2016-12-14 17:27:56',1,1,2,2),(40,'dasdasdas',1,'2016-12-19 16:43:08',1,5,45,2),(41,'dasdasdas',1,'2016-12-22 16:36:19',1,2,3,2);
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
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `respostas`
--

LOCK TABLES `respostas` WRITE;
/*!40000 ALTER TABLE `respostas` DISABLE KEYS */;
INSERT INTO `respostas` VALUES (2,'11',NULL,0,1,1,4,1,'2016-11-24 15:36:45'),(3,'11',NULL,1,1,1,4,1,'2016-11-24 15:37:27'),(4,'11',NULL,1,1,1,4,1,'2016-11-24 15:37:29'),(5,'11',NULL,1,1,1,4,1,'2016-11-24 15:37:35'),(6,'11',NULL,1,3,1,4,1,'2016-11-24 15:37:36'),(7,'11',NULL,1,3,1,4,1,'2016-11-24 15:37:36'),(8,'11',NULL,1,3,1,4,1,'2016-11-24 15:37:36'),(9,'11',NULL,1,3,12,4,1,'2016-11-24 15:37:36'),(10,'11',NULL,1,3,1,4,1,'2016-11-24 15:37:36'),(11,'11',NULL,1,3,1,4,1,'2016-11-24 15:37:37'),(12,'11',NULL,1,3,5,4,1,'2016-11-24 15:37:37'),(13,'11',NULL,1,3,1,4,1,'2016-11-24 15:37:37'),(14,'11',NULL,1,3,4,4,1,'2016-11-24 15:37:37'),(15,'113',NULL,0,2,3,4,1,'2016-11-24 15:38:18'),(16,'113','HTTP://172.17.0.2/Quickpeek//file/imagem/img/tKi-2016-11-24-15-38-32.png',0,2,2,4,1,'2016-11-24 15:38:32'),(17,NULL,'HTTP://172.17.0.2/Quickpeek//file/imagem/img/K2Q-2016-11-24-15-38-41.png',0,2,1,4,1,'2016-11-24 15:38:41'),(18,'dasdas',NULL,0,1,1,39,1,'2016-12-14 17:30:49'),(21,'dasdasdsa',NULL,0,2,5,40,1,'2016-12-19 16:43:20'),(22,'dasdasdsa',NULL,0,2,5,40,1,'2016-12-19 16:46:31'),(23,'dasdas','HTTP://172.17.0.2/Quickpeek//file/imagem/img/U3R-2016-12-19-16-46-51.query',0,2,3,40,1,'2016-12-19 16:46:51'),(24,'dasdas','HTTP://172.17.0.2/Quickpeek//file/imagem/img/WMg-2016-12-19-16-47-35.query',0,2,3,40,1,'2016-12-19 16:47:35'),(25,'dasdas','HTTP://172.17.0.2/Quickpeek//file/imagem/img/Vuj-2016-12-19-16-47-53.query',0,2,3,40,1,'2016-12-19 16:47:53'),(26,'dasdas','HTTP://172.17.0.2/Quickpeek//file/imagem/img/vFB-2016-12-19-16-48-33.query',0,2,3,40,1,'2016-12-19 16:48:33'),(27,'dasdas','HTTP://172.17.0.2/Quickpeek//file/imagem/img/sOH-2016-12-19-16-49-20.query',0,2,3,40,1,'2016-12-19 16:49:20'),(28,'dasdas','HTTP://172.17.0.2/Quickpeek//file/imagem/img/RX5-2016-12-19-16-49-35.query',0,2,3,40,1,'2016-12-19 16:49:35'),(29,'dasdas','HTTP://172.17.0.2/Quickpeek//file/imagem/img/mMq-2016-12-19-16-51-06.query',0,2,3,40,1,'2016-12-19 16:51:06'),(30,'dasdas','HTTP://172.17.0.2/Quickpeek//file/imagem/img/0Tj-2016-12-19-16-51-40.query',0,2,3,40,1,'2016-12-19 16:51:40'),(31,'dasdasssd',NULL,0,2,1,41,1,'2016-12-22 16:36:43'),(32,'99',NULL,0,3,7,41,1,'2016-12-22 16:37:55');
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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seguir`
--

LOCK TABLES `seguir` WRITE;
/*!40000 ALTER TABLE `seguir` DISABLE KEYS */;
INSERT INTO `seguir` VALUES (1,'2016-12-22 13:59:12',1,1,3,0,NULL),(2,'2016-12-22 13:59:33',1,1,2,1,'2016-12-22 13:59:33'),(3,'2016-12-22 13:59:34',1,1,8,1,'2016-12-22 13:59:34'),(4,'2016-12-22 14:05:00',1,6,2,1,'2016-12-22 14:05:00'),(5,'2016-12-22 14:05:11',1,9,2,1,'2016-12-22 14:05:11'),(6,'2016-12-22 14:05:12',1,9,8,1,'2016-12-22 14:05:12'),(7,'2016-12-22 14:05:22',1,13,2,1,'2016-12-22 14:05:22'),(8,'2016-12-22 14:05:23',1,13,8,1,'2016-12-22 14:05:23'),(9,'2016-12-22 14:13:27',1,2,1,1,'2016-12-22 14:13:27'),(10,'2016-12-22 14:14:04',1,2,6,0,NULL),(11,'2016-12-22 16:34:57',1,21,2,1,'2016-12-22 16:34:57');
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
) ENGINE=InnoDB AUTO_INCREMENT=582 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessaobanco`
--

LOCK TABLES `sessaobanco` WRITE;
/*!40000 ALTER TABLE `sessaobanco` DISABLE KEYS */;
INSERT INTO `sessaobanco` VALUES (1,'2016-12-06 15:30:01',1,'fe8GSFNIdSKto9kohzfU1U7guEj6VdCVqVw9dkaitwVvMX0oIAWwq5cTONJOU2CgM8b76wXiFtzW2NGNGvD6gK2MgMmDSIyLVXF9','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"5\",\"local\":\"1\"},\"locaisNotIn\":[\"2\",\"1\"],\"codSess\":\"fe8GSFNIdSKto9kohzfU1U7guEj6VdCVqVw9dkaitwVvMX0oIAWwq5cTONJOU2CgM8b76wXiFtzW2NGNGvD6gK2MgMmDSIyLVXF9\",\"idSess\":\"1\"}'),(2,'2016-12-06 15:31:05',1,'U6Asmx3ApQCNcHzRQsKsnTnuWETbyx3CqABlBc035lNenMdx9WIUfqa5xAKvyPJJT1llXa03xRSXcxcm2wdqCrVWu4S5AyXllaaV','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"5\",\"local\":\"1\"},\"locaisNotIn\":[\"2\",\"1\"],\"codSess\":\"U6Asmx3ApQCNcHzRQsKsnTnuWETbyx3CqABlBc035lNenMdx9WIUfqa5xAKvyPJJT1llXa03xRSXcxcm2wdqCrVWu4S5AyXllaaV\",\"idSess\":\"2\"}'),(3,'2016-12-06 15:36:53',1,'DXvaKpRiS1ElRxkEYS7G6SYTJvaECC5BsBzO7xYEi0P7qy19P5pPUtGltMqssO4Hd0QWzWRjc8J98dPj3Vk4FjWIZin5OEozrulh','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"5\",\"local\":\"1\"},\"locaisNotIn\":[\"2\",\"1\"],\"codSess\":\"DXvaKpRiS1ElRxkEYS7G6SYTJvaECC5BsBzO7xYEi0P7qy19P5pPUtGltMqssO4Hd0QWzWRjc8J98dPj3Vk4FjWIZin5OEozrulh\",\"idSess\":\"3\"}'),(4,'2016-12-06 15:36:55',1,'k7MqyR3lW989BavcxKbJg3cPYWElAEOwOrwVGsrHw7onfKAl5824VBI34X4gvppuAMT4CMSRnrcMINvBHigwy1sIT6kk8NcRyYAM','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"5\",\"local\":\"1\"},\"locaisNotIn\":[\"2\",\"1\"],\"codSess\":\"k7MqyR3lW989BavcxKbJg3cPYWElAEOwOrwVGsrHw7onfKAl5824VBI34X4gvppuAMT4CMSRnrcMINvBHigwy1sIT6kk8NcRyYAM\",\"idSess\":\"4\"}'),(5,'2016-12-06 15:37:06',1,'dhiJ3XE3vXsp10S8El2OoMkeB163j7sLNK2R9FwcnPU6hZUVGCpoppZ0KSg8tyUNq3A5EwJQaLq5jWaHvhYxNG0wlMVWfDsj46a8','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"1\",\"local\":\"1\"},\"locaisNotIn\":[\"2\",\"1\"],\"codSess\":\"dhiJ3XE3vXsp10S8El2OoMkeB163j7sLNK2R9FwcnPU6hZUVGCpoppZ0KSg8tyUNq3A5EwJQaLq5jWaHvhYxNG0wlMVWfDsj46a8\",\"idSess\":\"5\"}'),(6,'2016-12-06 15:39:43',1,'XxNtffPONS6UuGi7DQDjfX4pCzIDDbDi75QY7Qu3kqO3haQCowfKbZZm6AAuPlSctwQJjHdfUHO2HjQU6ok9Srbq5ATujwj7LHcl','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"1\",\"local\":\"1\"},\"locaisNotIn\":[\"2\",\"1\"],\"codSess\":\"XxNtffPONS6UuGi7DQDjfX4pCzIDDbDi75QY7Qu3kqO3haQCowfKbZZm6AAuPlSctwQJjHdfUHO2HjQU6ok9Srbq5ATujwj7LHcl\",\"idSess\":\"6\"}'),(18,'2016-12-06 16:38:38',1,'Gf9IG5vqLOG7OzAMCL3UwRqW0ZCV9HnGgbGnOClnJeiuyUUWtzXYqVUAI1BbdkK6chRFhyFZcCG4B45SCK2wClvBVT4oauAAXX4k','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"locaisNotIn\":[\"1\",\"2\"],\"codSess\":\"Gf9IG5vqLOG7OzAMCL3UwRqW0ZCV9HnGgbGnOClnJeiuyUUWtzXYqVUAI1BbdkK6chRFhyFZcCG4B45SCK2wClvBVT4oauAAXX4k\",\"idSess\":\"18\"}'),(19,'2016-12-06 16:40:52',1,'KzEc81KwT43OddtUU3jfQUXUatXeixdtk3UKD5lpb3wRgS1xN5owhtOesbNpwoaukFIc0ER89y0sOLMsNFKbN0pUaeNT5TLD1RpM','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"locaisNotIn\":null,\"codSess\":\"KzEc81KwT43OddtUU3jfQUXUatXeixdtk3UKD5lpb3wRgS1xN5owhtOesbNpwoaukFIc0ER89y0sOLMsNFKbN0pUaeNT5TLD1RpM\",\"idSess\":\"19\"}'),(20,'2016-12-06 16:41:24',1,'z5SxRibjUs7Q8YHX6GPY8PNXD8vV0LJQn5OmzlNkQgt5dAxPweEPDxdTNlAFOGX0ay4DbIVjyPmMzEeVPlAK7Lrrw1jd87du8VNr','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"locaisNotIn\":null,\"codSess\":\"z5SxRibjUs7Q8YHX6GPY8PNXD8vV0LJQn5OmzlNkQgt5dAxPweEPDxdTNlAFOGX0ay4DbIVjyPmMzEeVPlAK7Lrrw1jd87du8VNr\",\"idSess\":\"20\"}'),(25,'2016-12-06 16:44:49',1,'kqxbMrRzEwAcRzS5ROTTFggab3IadVHkoLGlODUsLFaFIOCB2PWZ4F9RLJSOf7FrdnQEVpMJlhREJsBbMC3PskgG3KOi3YXVEaiC','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"locaisNotIn\":[\"1\",\"2\"],\"codSess\":\"kqxbMrRzEwAcRzS5ROTTFggab3IadVHkoLGlODUsLFaFIOCB2PWZ4F9RLJSOf7FrdnQEVpMJlhREJsBbMC3PskgG3KOi3YXVEaiC\",\"idSess\":\"25\"}'),(26,'2016-12-06 16:45:32',1,'PwB37ZpyZrNtgFuDJWShzLfftMfKRPAf0VydEZi0cp7Zuz4nzeogvFlAHV6aM5Vk5NUT80TReFs75CBzhqlxUlM8l4UMm8TFhrVl','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"locaisNotIn\":[\"1\",\"2\"],\"codSess\":\"PwB37ZpyZrNtgFuDJWShzLfftMfKRPAf0VydEZi0cp7Zuz4nzeogvFlAHV6aM5Vk5NUT80TReFs75CBzhqlxUlM8l4UMm8TFhrVl\",\"idSess\":\"26\"}'),(27,'2016-12-06 16:45:34',1,'uuTxYwx5ftUohj5AYvGRjjxxQkIRfqoQ3bdwjkODlmHTP1g9FyNB14Vto6fqB3x5UNKvwBfI68g2anopqfxpGYmt8kSCKadk1Hqw','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"locaisNotIn\":[\"1\",\"2\"],\"codSess\":\"uuTxYwx5ftUohj5AYvGRjjxxQkIRfqoQ3bdwjkODlmHTP1g9FyNB14Vto6fqB3x5UNKvwBfI68g2anopqfxpGYmt8kSCKadk1Hqw\",\"idSess\":\"27\"}'),(28,'2016-12-06 16:45:34',1,'VhJrmGqA4ZGvSB3ocH2vq1etXp4MjHI2O8kVY3enE0C74Sg150bK7ljkLStxEr6UxKPdWcmXphHzaU1mHVSd4fzv3oQGsBsl8yqu','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"locaisNotIn\":[\"1\",\"2\"],\"codSess\":\"VhJrmGqA4ZGvSB3ocH2vq1etXp4MjHI2O8kVY3enE0C74Sg150bK7ljkLStxEr6UxKPdWcmXphHzaU1mHVSd4fzv3oQGsBsl8yqu\",\"idSess\":\"28\"}'),(29,'2016-12-06 16:45:48',1,'RzfFpEyHsr1Z46x0OLj5RpXR7C5kmb15w9w1nBj9Ozlyyv7jatUhdES0OMlJg0pc5YTJgB6vnuJ6dwhnN4n1l8NbbToe4hwuakpk','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"1\",\"local\":\"1\"},\"locaisNotIn\":[\"1\",\"2\"],\"codSess\":\"RzfFpEyHsr1Z46x0OLj5RpXR7C5kmb15w9w1nBj9Ozlyyv7jatUhdES0OMlJg0pc5YTJgB6vnuJ6dwhnN4n1l8NbbToe4hwuakpk\",\"idSess\":\"29\"}'),(31,'2016-12-06 16:47:48',1,'xDs0SBi1Ax1NNbhPwpkXl7pvtEAr5cy9vADgqgrw1LEAWs2HbXzOR9Ocyxfpi3Htcl2Grdjp2bcR5efsKGUHkoTckY3hR44OW4VB','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"1\",\"local\":\"1\"},\"locaisNotIn\":[\"2\",\"1\"],\"codSess\":\"xDs0SBi1Ax1NNbhPwpkXl7pvtEAr5cy9vADgqgrw1LEAWs2HbXzOR9Ocyxfpi3Htcl2Grdjp2bcR5efsKGUHkoTckY3hR44OW4VB\",\"idSess\":\"31\"}'),(32,'2016-12-06 16:47:48',1,'9veXdtcQcGxA243yDHLkGqwud65Fv7eePaXGnnHMsnJHvDz1YkEbvovFPt0h4iFe9y432fhRHF6bPLHbnlFpP6IS8BmhDU6uAc4A','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"1\",\"local\":\"1\"},\"locaisNotIn\":[\"2\",\"1\"],\"codSess\":\"9veXdtcQcGxA243yDHLkGqwud65Fv7eePaXGnnHMsnJHvDz1YkEbvovFPt0h4iFe9y432fhRHF6bPLHbnlFpP6IS8BmhDU6uAc4A\",\"idSess\":\"32\"}'),(33,'2016-12-06 16:47:49',1,'HG8MMzH0fN7cnPhy8lQ6w2LI0YR7gaAWGNT2NGMah5IXLuTqygLBzrbkNK646R9OgYdJiXbzAWaeQbnR6WRpXdU2T1Pkh1LcJNtx','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"1\",\"local\":\"1\"},\"locaisNotIn\":[\"2\",\"1\"],\"codSess\":\"HG8MMzH0fN7cnPhy8lQ6w2LI0YR7gaAWGNT2NGMah5IXLuTqygLBzrbkNK646R9OgYdJiXbzAWaeQbnR6WRpXdU2T1Pkh1LcJNtx\",\"idSess\":\"33\"}'),(34,'2016-12-06 16:47:49',1,'X158e5bnekrEqBNmJHPfEdrVXjI4itk5r1KGoFgsYUO0Luom5XCItol4SWKI8fIrLgXwNnEMMLerLeB0ljTtJc0AYKH42DII0THz','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"1\",\"local\":\"1\"},\"locaisNotIn\":[\"2\",\"1\"],\"codSess\":\"X158e5bnekrEqBNmJHPfEdrVXjI4itk5r1KGoFgsYUO0Luom5XCItol4SWKI8fIrLgXwNnEMMLerLeB0ljTtJc0AYKH42DII0THz\",\"idSess\":\"34\"}'),(35,'2016-12-06 16:47:49',1,'ItzYkutlEewjWv9PrcuFYroeOQlK6qQIhlThdFWvk2xfLXchqYnlEKW2zS5fYd6D2ZxwWSzT32MwGPDfiUZE3eE0u5AvAHGPIVen','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"1\",\"local\":\"1\"},\"locaisNotIn\":[\"2\",\"1\"],\"codSess\":\"ItzYkutlEewjWv9PrcuFYroeOQlK6qQIhlThdFWvk2xfLXchqYnlEKW2zS5fYd6D2ZxwWSzT32MwGPDfiUZE3eE0u5AvAHGPIVen\",\"idSess\":\"35\"}'),(36,'2016-12-06 16:47:53',1,'lW3kgkLfVaaIpxrYAM8TldibzCIljnaSNvJHe2GdSqHSKJSLrOTOtSPiwwHEivbqojsOcE3TIEVoIKBpLWH8O6e8jGzg9JIdwFD7','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"1\",\"local\":\"1\"},\"locaisNotIn\":[\"2\",\"1\"],\"codSess\":\"lW3kgkLfVaaIpxrYAM8TldibzCIljnaSNvJHe2GdSqHSKJSLrOTOtSPiwwHEivbqojsOcE3TIEVoIKBpLWH8O6e8jGzg9JIdwFD7\",\"idSess\":\"36\"}'),(37,'2016-12-06 16:47:58',1,'Zxq8IPlheeijDeBz81QZdrxoYheAyDlbICB7BGlJWeoubYn3xVOtbGyr4auaAHWT5dMT3U8y3qiFB9JFibZi6ZLAgqBHS5aB7lLf','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"1\",\"local\":\"1\"},\"locaisNotIn\":[\"2\",\"1\"],\"codSess\":\"Zxq8IPlheeijDeBz81QZdrxoYheAyDlbICB7BGlJWeoubYn3xVOtbGyr4auaAHWT5dMT3U8y3qiFB9JFibZi6ZLAgqBHS5aB7lLf\",\"idSess\":\"37\"}'),(38,'2016-12-06 16:48:04',1,'3bPQofvXf0s8V7jIO11xey4Z6gYOMrECnUad7dbJ1SBeK6FcFwnE4cXztE41nW5GEBRzBhT0Gw0OZCBmU0HNtUIZ7Ew3ZaAGq8Yj','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"1\",\"local\":\"1\"},\"locaisNotIn\":[\"2\",\"1\"],\"codSess\":\"3bPQofvXf0s8V7jIO11xey4Z6gYOMrECnUad7dbJ1SBeK6FcFwnE4cXztE41nW5GEBRzBhT0Gw0OZCBmU0HNtUIZ7Ew3ZaAGq8Yj\",\"idSess\":\"38\"}'),(39,'2016-12-06 16:48:23',1,'Ds1T3M8a7SivmqgKsm2lGjnfPFRWM7zCkTAlTr3c8BqVovzV09yrdgCfK4CX3cCJGE0JSbWolJB2ii20gnQuYwDR5ZvLtCEGNrFZ','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"locaisNotIn\":[\"1\",\"2\"],\"codSess\":\"Ds1T3M8a7SivmqgKsm2lGjnfPFRWM7zCkTAlTr3c8BqVovzV09yrdgCfK4CX3cCJGE0JSbWolJB2ii20gnQuYwDR5ZvLtCEGNrFZ\",\"idSess\":\"39\"}'),(40,'2016-12-06 16:48:47',1,'zPD8FwhhTwOnRHTwB9h1n1EFh3LYugrn19iKqcknHGRoT7hJBjQGhrAG3RjEzeWUsDIYkVIYFqYPerYaor0o4dGDuRda3YbuYwwN','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"locaisNotIn\":[\"1\",\"2\"],\"codSess\":\"zPD8FwhhTwOnRHTwB9h1n1EFh3LYugrn19iKqcknHGRoT7hJBjQGhrAG3RjEzeWUsDIYkVIYFqYPerYaor0o4dGDuRda3YbuYwwN\",\"idSess\":\"40\"}'),(41,'2016-12-06 16:48:47',1,'DoMNs1ONKN0mVXQmIknTqLcEIplug6oFTxnAQ3JgzlXS6B3kbwEPmVRzuHoz4zmMhXfyKo5bRxQqQX9ZaJ2kYz3SZkymoVrU8Iap','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"locaisNotIn\":[\"1\",\"2\"],\"codSess\":\"DoMNs1ONKN0mVXQmIknTqLcEIplug6oFTxnAQ3JgzlXS6B3kbwEPmVRzuHoz4zmMhXfyKo5bRxQqQX9ZaJ2kYz3SZkymoVrU8Iap\",\"idSess\":\"41\"}'),(42,'2016-12-06 16:48:47',1,'pstB7lGGfuHrhFyENEBLwAQofDb1bKXafzjH2HR5Rvkw74vjFCjXsP9N0yQRUotmjfDodcF0AG2te7v7ORpBXGia45HWpOeK24Zh','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"locaisNotIn\":[\"1\",\"2\"],\"codSess\":\"pstB7lGGfuHrhFyENEBLwAQofDb1bKXafzjH2HR5Rvkw74vjFCjXsP9N0yQRUotmjfDodcF0AG2te7v7ORpBXGia45HWpOeK24Zh\",\"idSess\":\"42\"}'),(43,'2016-12-06 16:48:48',1,'qc6Oln92p3OsGx18xXYXG3Xi0oyeLRlsCoBoZbiKiOoHbXV9pIu6Gd4yUb38Z2blebM8heE1PSOF0cvKevSuO2n2FYzcjSLLSrrc','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"locaisNotIn\":[\"1\",\"2\"],\"codSess\":\"qc6Oln92p3OsGx18xXYXG3Xi0oyeLRlsCoBoZbiKiOoHbXV9pIu6Gd4yUb38Z2blebM8heE1PSOF0cvKevSuO2n2FYzcjSLLSrrc\",\"idSess\":\"43\"}'),(44,'2016-12-06 16:48:48',1,'vRLXGb79LIU5ai1SdcPl9MV4z6zVFLHlWunjb8wLci1jDUBxnikksQEUFEECqQjzm0tZHtncELyRORMu4kjebZdYM813JLOv9o0Q','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"locaisNotIn\":[\"1\",\"2\"],\"codSess\":\"vRLXGb79LIU5ai1SdcPl9MV4z6zVFLHlWunjb8wLci1jDUBxnikksQEUFEECqQjzm0tZHtncELyRORMu4kjebZdYM813JLOv9o0Q\",\"idSess\":\"44\"}'),(45,'2016-12-06 16:48:49',1,'2afY97GOymp0GLhHHx5CtCF0Dcc7fdHxT9IkqQG3u1K3adQyIh8hZ6kdkjUWMPuIwtgpsEaXOtOuz8QCPBy1xb8kwVqNWxd5mOyX','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"locaisNotIn\":[\"1\",\"2\"],\"codSess\":\"2afY97GOymp0GLhHHx5CtCF0Dcc7fdHxT9IkqQG3u1K3adQyIh8hZ6kdkjUWMPuIwtgpsEaXOtOuz8QCPBy1xb8kwVqNWxd5mOyX\",\"idSess\":\"45\"}'),(46,'2016-12-06 16:48:49',1,'UMhdg6p2VTjc8NWA0n1z2ba70BKWPRX8Pks1oR623dLfxD62HBIjJhGpw7MVWZS726uDkpQhM5nqJpjQgLi1xgLbKjo6Lrhnqa6E','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"locaisNotIn\":[\"1\",\"2\"],\"codSess\":\"UMhdg6p2VTjc8NWA0n1z2ba70BKWPRX8Pks1oR623dLfxD62HBIjJhGpw7MVWZS726uDkpQhM5nqJpjQgLi1xgLbKjo6Lrhnqa6E\",\"idSess\":\"46\"}'),(47,'2016-12-06 16:48:49',1,'Fc5wNG2vAEJo1azkEjHcnkrp3k5Wh00znzmEwDLdGG43I9NSYYAuqpnvjyHqgJwXppgnzEM8Py1Tx6bl9ZpmUPA9I29RqrF7KCgB','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"locaisNotIn\":[\"1\",\"2\"],\"codSess\":\"Fc5wNG2vAEJo1azkEjHcnkrp3k5Wh00znzmEwDLdGG43I9NSYYAuqpnvjyHqgJwXppgnzEM8Py1Tx6bl9ZpmUPA9I29RqrF7KCgB\",\"idSess\":\"47\"}'),(48,'2016-12-06 16:48:53',1,'46l6xtKErNpb7fUY85O4J7MML9hRF3pIOzC6IeuaG4m18fzSX9vcnduBT2iOh5xsmVneZ4mAeuwFi30r171VfLJExzBOGzfOnqpR','{\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"1\",\"local\":\"1\"},\"locaisNotIn\":null,\"codSess\":\"46l6xtKErNpb7fUY85O4J7MML9hRF3pIOzC6IeuaG4m18fzSX9vcnduBT2iOh5xsmVneZ4mAeuwFi30r171VfLJExzBOGzfOnqpR\",\"idSess\":\"48\"}'),(66,'2016-12-06 16:53:31',1,'kZiy1QTbp80uAyQgDzhr558N2kUEK756Qwc7hhLVALzoVdkM7fhcmVl4MNDnQFjSRgUiROdr2I0A2FjswjAQoJXiGVzm1lLFnZ4r','{\"codSess\":\"kZiy1QTbp80uAyQgDzhr558N2kUEK756Qwc7hhLVALzoVdkM7fhcmVl4MNDnQFjSRgUiROdr2I0A2FjswjAQoJXiGVzm1lLFnZ4r\",\"idSess\":\"66\",\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"44\",\"local\":\"26\",\"telefone\":\"123123112313\"},\"locaisNotIn\":[\"35\",\"2\",\"1\",\"4\",\"42\"],\"mensagensId\":[\"3\",\"1\"],\"smsCodigoId\":\"48\",\"categoria16\":1,\"categoria4\":false,\"categoria15\":false,\"categoria13\":false,\"categoria14\":false,\"categoria11\":1,\"categoria0\":false,\"categoria1\":false,\"categoria2\":false,\"categoria3\":false,\"categoria5\":false,\"categoria6\":false,\"categoria7\":false,\"categoria8\":false,\"categoria9\":false,\"categoria10\":false,\"categoria12\":false,\"salvarFoto\":\"HTTP:\\/\\/172.17.0.2\\/Quickpeek\\/\\/file\\/imagem\\/img\\/ggQ-2016-12-12-17-14-43.png\"}'),(67,'2016-12-06 18:48:26',1,'nPatEmXqD49CO5DfwlCd9TvSQ04QJrxUhvh5kQNraMtBTeGtSIp26Leq3OugSm4447IcIvsbrpnSPbjcosJy9SffoJRo81CUMKFe','{\"codSess\":\"nPatEmXqD49CO5DfwlCd9TvSQ04QJrxUhvh5kQNraMtBTeGtSIp26Leq3OugSm4447IcIvsbrpnSPbjcosJy9SffoJRo81CUMKFe\",\"idSess\":\"67\"}'),(68,'2016-12-06 18:53:38',1,'dlpaJdwFIL1XARaICsKZ6GJYmcbWP1NLmT4rNnOqEeTz79RmWkcYSdBuCFJ1M1ZOWGIe2wSvvWgjtTR9TrxgNUAwSh6FAtqGX96r','{\"codSess\":\"dlpaJdwFIL1XARaICsKZ6GJYmcbWP1NLmT4rNnOqEeTz79RmWkcYSdBuCFJ1M1ZOWGIe2wSvvWgjtTR9TrxgNUAwSh6FAtqGX96r\",\"idSess\":\"68\"}'),(69,'2016-12-07 13:48:03',1,'whaBbrINCLX3l86QRU96BL5w3GvVEboGBYDZ9x8lFnLHeR1UaOhZBgSSozJwi4427Eug9wrvvMGufgBDRauA2B1baN4lH5BaoLSD','{\"codSess\":\"whaBbrINCLX3l86QRU96BL5w3GvVEboGBYDZ9x8lFnLHeR1UaOhZBgSSozJwi4427Eug9wrvvMGufgBDRauA2B1baN4lH5BaoLSD\",\"idSess\":\"69\",\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"1\",\"local\":\"1\"},\"locaisNotIn\":[\"1\",\"2\"]}'),(70,'2016-12-07 14:23:42',1,'GbkPoro7qjVSzxdRF5rZPlhyJxxsWSYv13l4oF6vgNM2NTPDnX8tQGfY5ovDvX9VgEvUz19iFrf9XKf7LGaEBoWFOYERQtOJUxpP','{\"codSess\":\"GbkPoro7qjVSzxdRF5rZPlhyJxxsWSYv13l4oF6vgNM2NTPDnX8tQGfY5ovDvX9VgEvUz19iFrf9XKf7LGaEBoWFOYERQtOJUxpP\",\"idSess\":\"70\",\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"locaisNotIn\":[\"1\",\"2\"]}'),(82,'2016-12-07 14:53:00',1,'SwE0iRUdqvCYXKwv2N214gkBERFbrstPuLKJEGvxkFKYXaUtlXrXh3hk72EfrE0ojYA8rgybImyjIC5NPvZ3QuMwgWgJoeKzMVGW','{\"codSess\":\"SwE0iRUdqvCYXKwv2N214gkBERFbrstPuLKJEGvxkFKYXaUtlXrXh3hk72EfrE0ojYA8rgybImyjIC5NPvZ3QuMwgWgJoeKzMVGW\",\"idSess\":\"82\",\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"locaisNotIn\":[\"1\",\"2\"]}'),(83,'2016-12-07 14:59:09',1,'Fg1kq1h7QqyEfMWPLOZQHTUBMHTbfjzfJRswUcTn83GMG7YZtIKYFcxCKJFERoHiPOGqtTQ3ajTzfD5BKvn30JB8o7uI58S4dCie','{\"codSess\":\"Fg1kq1h7QqyEfMWPLOZQHTUBMHTbfjzfJRswUcTn83GMG7YZtIKYFcxCKJFERoHiPOGqtTQ3ajTzfD5BKvn30JB8o7uI58S4dCie\",\"idSess\":\"83\",\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"locaisNotIn\":[\"1\",\"2\"]}'),(85,'2016-12-07 16:56:49',1,'2gaHTd07QrMBcsumGbpw6FG8HaD5onsdDS6fwhruq5tU9tYSgG4hYA13C9nUf6Gs2uACwW5BeYfeZYfjkSX4Vk7GW27tTCRPidwC','{\"codSess\":\"2gaHTd07QrMBcsumGbpw6FG8HaD5onsdDS6fwhruq5tU9tYSgG4hYA13C9nUf6Gs2uACwW5BeYfeZYfjkSX4Vk7GW27tTCRPidwC\",\"idSess\":\"85\",\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"13\",\"local\":\"1\"},\"locaisNotIn\":[\"1\",\"2\"]}'),(86,'2016-12-07 17:07:53',1,'EL9DcKG15gvJsOksOQwELgkZfqgeNA0qy2ktcQsQMYNBaRUqD6gAFUXtEguaQdYMYWJUGEX1gIDpoZhZqTCNNkn2AwhtE3x0WyqL','{\"codSess\":\"EL9DcKG15gvJsOksOQwELgkZfqgeNA0qy2ktcQsQMYNBaRUqD6gAFUXtEguaQdYMYWJUGEX1gIDpoZhZqTCNNkn2AwhtE3x0WyqL\",\"idSess\":\"86\",\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"13\",\"local\":\"1\"},\"locaisNotIn\":[\"1\",\"2\"]}'),(88,'2016-12-08 13:26:40',1,'1D2DdK8ZVTUq8apIZmCTKnwGDb2UiUJVbaE1MHF6p91hYD9pxZ39dt0XEz4eN7NoZnVpvk61lXrjw6PcxvRylps26bYa9M07tC6l','{\"codSess\":\"1D2DdK8ZVTUq8apIZmCTKnwGDb2UiUJVbaE1MHF6p91hYD9pxZ39dt0XEz4eN7NoZnVpvk61lXrjw6PcxvRylps26bYa9M07tC6l\",\"idSess\":\"88\",\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"5\",\"local\":\"1\"},\"locaisNotIn\":[\"1\",\"2\"]}'),(89,'2016-12-08 13:33:01',1,'jxbMVcq3e899EEJo9uakLsaeSqeh3tXexmvnTUAAO1oyrkzCAqciEKAfGNVOapKexyTN83Lj0Sx2zarBjGvARvI2Sfqusekspa06','{\"codSess\":\"jxbMVcq3e899EEJo9uakLsaeSqeh3tXexmvnTUAAO1oyrkzCAqciEKAfGNVOapKexyTN83Lj0Sx2zarBjGvARvI2Sfqusekspa06\",\"idSess\":\"89\",\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"5\",\"local\":\"1\"},\"locaisNotIn\":[\"1\",\"2\"]}'),(90,'2016-12-08 15:12:10',1,'gbp688zIp0vuomtwfniAxBQSut3LamM36fxFN7qhBjeTSTQoPOmI6hXEAEiOrWCX7BI2vLV8SD3Q3OjEgQR7yulYJO9qnL7j9Fsc','{\"codSess\":\"gbp688zIp0vuomtwfniAxBQSut3LamM36fxFN7qhBjeTSTQoPOmI6hXEAEiOrWCX7BI2vLV8SD3Q3OjEgQR7yulYJO9qnL7j9Fsc\",\"idSess\":\"90\",\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"5\",\"local\":\"1\"},\"locaisNotIn\":[\"1\",\"2\"]}'),(91,'2016-12-09 13:16:31',1,'78oY0XuLRTUTKnfz4K88diXnGeibCW1ygX9wyjxwqaOINzYS0bUJXNmFYelBHVHsGRQ9nNpQvXozY0WhDHRrVEpQzxhHCJiZntBv','{\"codSess\":\"78oY0XuLRTUTKnfz4K88diXnGeibCW1ygX9wyjxwqaOINzYS0bUJXNmFYelBHVHsGRQ9nNpQvXozY0WhDHRrVEpQzxhHCJiZntBv\",\"idSess\":\"91\",\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"1\",\"local\":\"1\"},\"locaisNotIn\":[\"1\",\"2\"],\"mensagensId\":[\"3\",\"1\"]}'),(92,'2016-12-12 13:24:12',1,'nYpkxEDYaAdO2N4AJwGVMSi6paCItaoPGXF9bMfvTT8WtTeDEztmsNoYPTf0A1hfo9XlWzTV05XaRRtqxVvGUlbLJjlJDQajjWNg','{\"codSess\":\"nYpkxEDYaAdO2N4AJwGVMSi6paCItaoPGXF9bMfvTT8WtTeDEztmsNoYPTf0A1hfo9XlWzTV05XaRRtqxVvGUlbLJjlJDQajjWNg\",\"idSess\":\"92\"}'),(94,'2016-12-12 16:24:16',1,'PnR8KgAH9fFzIOPpAoCoXaMexeYjA44yuh59x5QTr8So3R2Ttpcl8vZUwX0yLhkXMNfwJn5qMk25gTSLEdkq9wpOuZ2FoHLQSW1W','{\"codSess\":\"PnR8KgAH9fFzIOPpAoCoXaMexeYjA44yuh59x5QTr8So3R2Ttpcl8vZUwX0yLhkXMNfwJn5qMk25gTSLEdkq9wpOuZ2FoHLQSW1W\",\"idSess\":\"94\",\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"1\",\"local\":\"1\"},\"locaisNotIn\":[\"1\",\"2\"],\"mensagensId\":[\"3\",\"1\"],\"smsCodigoId\":\"42\",\"categoria16\":1,\"categoria4\":false,\"categoria15\":false,\"categoria13\":false,\"categoria14\":false,\"categoria11\":1,\"categoria0\":false,\"categoria1\":false,\"categoria2\":false,\"categoria3\":false,\"categoria5\":false,\"categoria6\":false,\"categoria7\":false,\"categoria8\":false,\"categoria9\":false,\"categoria10\":false,\"categoria12\":false,\"salvarFoto\":\"HTTP:\\/\\/172.17.0.2\\/Quickpeek\\/\\/file\\/imagem\\/img\\/xJm-2016-12-12-14-34-04.png\"}'),(95,'2016-12-12 16:56:22',1,'WBMJgDbRYMGNgcjSBlx2LpXhvq6WJDDvFpycquvsOISo7aqucMWalzQqIE1S7kKdLEDlQqav4rdGW8OQGvey4iOcEyQtp3r2MyIu','{\"codSess\":\"WBMJgDbRYMGNgcjSBlx2LpXhvq6WJDDvFpycquvsOISo7aqucMWalzQqIE1S7kKdLEDlQqav4rdGW8OQGvey4iOcEyQtp3r2MyIu\",\"idSess\":\"95\",\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"23\"},\"locaisNotIn\":[\"23\",\"2\",\"1\",\"4\"],\"mensagensId\":[\"3\",\"1\"],\"smsCodigoId\":\"42\",\"categoria16\":1,\"categoria4\":false,\"categoria15\":false,\"categoria13\":false,\"categoria14\":false,\"categoria11\":1,\"categoria0\":false,\"categoria1\":false,\"categoria2\":false,\"categoria3\":false,\"categoria5\":false,\"categoria6\":false,\"categoria7\":false,\"categoria8\":false,\"categoria9\":false,\"categoria10\":false,\"categoria12\":false,\"salvarFoto\":\"HTTP:\\/\\/172.17.0.2\\/Quickpeek\\/\\/file\\/imagem\\/img\\/xJm-2016-12-12-14-34-04.png\"}'),(97,'2016-12-13 13:43:43',1,'93Hc4vqtEgO2rR1GSjYhPDiLpcx34NjRHh7I4n5Y2RwwRg1XFqbQmIHefR7uD8BHiyTTs3CaWEYrHjKhrXK3d0zZT96NoUq77ImP','{\"codSess\":\"93Hc4vqtEgO2rR1GSjYhPDiLpcx34NjRHh7I4n5Y2RwwRg1XFqbQmIHefR7uD8BHiyTTs3CaWEYrHjKhrXK3d0zZT96NoUq77ImP\",\"idSess\":\"97\",\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"23\"},\"locaisNotIn\":[\"23\",\"2\",\"1\",\"4\"],\"mensagensId\":[\"3\",\"1\"],\"smsCodigoId\":\"42\",\"categoria16\":1,\"categoria4\":false,\"categoria15\":false,\"categoria13\":false,\"categoria14\":false,\"categoria11\":1,\"categoria0\":false,\"categoria1\":false,\"categoria2\":false,\"categoria3\":false,\"categoria5\":false,\"categoria6\":false,\"categoria7\":false,\"categoria8\":false,\"categoria9\":false,\"categoria10\":false,\"categoria12\":false,\"salvarFoto\":\"HTTP:\\/\\/172.17.0.2\\/Quickpeek\\/\\/file\\/imagem\\/img\\/ggQ-2016-12-12-17-14-43.png\"}'),(98,'2016-12-13 14:34:34',1,'cOep2kRAiV1s8VCzX3qQD7mSIIdaCS6G41rG4xxrgVQxXmvawlGAJKMYHzi0Ed7xmR4tZJj6JJBBUry9wMCirFqWRaKGKL5MeXbS','{\"codSess\":\"cOep2kRAiV1s8VCzX3qQD7mSIIdaCS6G41rG4xxrgVQxXmvawlGAJKMYHzi0Ed7xmR4tZJj6JJBBUry9wMCirFqWRaKGKL5MeXbS\",\"idSess\":\"98\",\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"23\"},\"locaisNotIn\":[\"23\",\"2\",\"1\",\"4\"],\"mensagensId\":[\"3\",\"1\"],\"smsCodigoId\":\"42\",\"categoria16\":1,\"categoria4\":false,\"categoria15\":false,\"categoria13\":false,\"categoria14\":false,\"categoria11\":1,\"categoria0\":false,\"categoria1\":false,\"categoria2\":false,\"categoria3\":false,\"categoria5\":false,\"categoria6\":false,\"categoria7\":false,\"categoria8\":false,\"categoria9\":false,\"categoria10\":false,\"categoria12\":false,\"salvarFoto\":\"HTTP:\\/\\/172.17.0.2\\/Quickpeek\\/\\/file\\/imagem\\/img\\/ggQ-2016-12-12-17-14-43.png\"}'),(99,'2016-12-14 13:16:32',1,'abOji6jozfPG53zockEzyOElJZQVjLDo6YgqxumdDvlyaPOjeenfEg8hwmjR6XOV7K1DvKihAPcTJxs1Ur3n0Vpef5UgxZEY1AB2','{\"codSess\":\"abOji6jozfPG53zockEzyOElJZQVjLDo6YgqxumdDvlyaPOjeenfEg8hwmjR6XOV7K1DvKihAPcTJxs1Ur3n0Vpef5UgxZEY1AB2\",\"idSess\":\"99\",\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"1\",\"local\":\"2\"},\"locaisNotIn\":[\"23\",\"2\",\"1\",\"4\"],\"mensagensId\":[\"3\",\"1\"],\"smsCodigoId\":\"42\",\"categoria16\":1,\"categoria4\":false,\"categoria15\":false,\"categoria13\":false,\"categoria14\":false,\"categoria11\":1,\"categoria0\":false,\"categoria1\":false,\"categoria2\":false,\"categoria3\":false,\"categoria5\":false,\"categoria6\":false,\"categoria7\":false,\"categoria8\":false,\"categoria9\":false,\"categoria10\":false,\"categoria12\":false,\"salvarFoto\":\"HTTP:\\/\\/172.17.0.2\\/Quickpeek\\/\\/file\\/imagem\\/img\\/ggQ-2016-12-12-17-14-43.png\"}'),(100,'2016-12-14 14:18:08',1,'XQgQdcZPfXK8iBD1ff3CncWwv52TFF4nvuLtamd76GetND3glykFgwREATEgHyrXbmaizmdwbpUtk80jfrnHvG01vKPQEuL3LXJp','{\"codSess\":\"XQgQdcZPfXK8iBD1ff3CncWwv52TFF4nvuLtamd76GetND3glykFgwREATEgHyrXbmaizmdwbpUtk80jfrnHvG01vKPQEuL3LXJp\",\"idSess\":\"100\",\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"3\",\"local\":\"3\"},\"locaisNotIn\":[\"35\",\"2\",\"1\",\"4\",\"42\"],\"mensagensId\":[\"3\",\"1\"],\"smsCodigoId\":\"42\",\"categoria16\":1,\"categoria4\":false,\"categoria15\":false,\"categoria13\":false,\"categoria14\":false,\"categoria11\":1,\"categoria0\":false,\"categoria1\":false,\"categoria2\":false,\"categoria3\":false,\"categoria5\":false,\"categoria6\":false,\"categoria7\":false,\"categoria8\":false,\"categoria9\":false,\"categoria10\":false,\"categoria12\":false,\"salvarFoto\":\"HTTP:\\/\\/172.17.0.2\\/Quickpeek\\/\\/file\\/imagem\\/img\\/ggQ-2016-12-12-17-14-43.png\"}'),(101,'2016-12-14 17:27:56',1,'VdAs8mdMnEA6zaiA5ReMrGEH4XZl3Y1QnIIMU1Wt7cbGIUmryx8BZKBZMppgdtCYJhdMMN33pMwUICDwDUXH0GF6otqmP5BUBIzS','{\"codSess\":\"VdAs8mdMnEA6zaiA5ReMrGEH4XZl3Y1QnIIMU1Wt7cbGIUmryx8BZKBZMppgdtCYJhdMMN33pMwUICDwDUXH0GF6otqmP5BUBIzS\",\"idSess\":\"101\",\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"1\",\"local\":\"26\"},\"locaisNotIn\":[\"35\",\"2\",\"1\",\"4\",\"42\"],\"mensagensId\":[\"3\",\"1\"],\"smsCodigoId\":\"42\",\"categoria16\":1,\"categoria4\":false,\"categoria15\":false,\"categoria13\":false,\"categoria14\":false,\"categoria11\":1,\"categoria0\":false,\"categoria1\":false,\"categoria2\":false,\"categoria3\":false,\"categoria5\":false,\"categoria6\":false,\"categoria7\":false,\"categoria8\":false,\"categoria9\":false,\"categoria10\":false,\"categoria12\":false,\"salvarFoto\":\"HTTP:\\/\\/172.17.0.2\\/Quickpeek\\/\\/file\\/imagem\\/img\\/ggQ-2016-12-12-17-14-43.png\"}'),(105,'2016-12-19 17:23:54',1,'tTesxu5OOzkdaEvIQOkXov1gzuOEKSCUUXwpPekguUs4eBpCDGEsmgpnXVmn8Bk4iZQnChvPMwH4o9pliMtDaLVvgSjholDjQ7MA','{\"codSess\":\"tTesxu5OOzkdaEvIQOkXov1gzuOEKSCUUXwpPekguUs4eBpCDGEsmgpnXVmn8Bk4iZQnChvPMwH4o9pliMtDaLVvgSjholDjQ7MA\",\"idSess\":\"105\",\"locaisId\":null,\"dadosUsuarioLogado\":{\"id\":\"3\",\"local\":\"26\",\"telefone\":\"123156456\"},\"locaisNotIn\":[\"35\",\"2\",\"1\",\"4\",\"42\"],\"mensagensId\":[\"3\",\"1\"],\"smsCodigoId\":\"45\",\"categoria16\":1,\"categoria4\":false,\"categoria15\":false,\"categoria13\":false,\"categoria14\":false,\"categoria11\":1,\"categoria0\":false,\"categoria1\":false,\"categoria2\":false,\"categoria3\":false,\"categoria5\":false,\"categoria6\":false,\"categoria7\":false,\"categoria8\":false,\"categoria9\":false,\"categoria10\":false,\"categoria12\":false,\"salvarFoto\":\"HTTP:\\/\\/172.17.0.2\\/Quickpeek\\/\\/file\\/imagem\\/img\\/ggQ-2016-12-12-17-14-43.png\"}'),(108,'2016-12-20 14:38:33',1,'u5YygJeLLDOJDC9mBnZSbnuE2xoAntU0KzRMbY8pUXc2B3VsOXbVh596Ibm8OO7NrVcMd82vJ3F67m7qf7qcPbqLbIUIiiFfYAWd','{\"codSess\":\"u5YygJeLLDOJDC9mBnZSbnuE2xoAntU0KzRMbY8pUXc2B3VsOXbVh596Ibm8OO7NrVcMd82vJ3F67m7qf7qcPbqLbIUIiiFfYAWd\",\"idSess\":\"108\"}'),(109,'2016-12-20 14:38:42',1,'jTNlVOVjcOj6LL9q9rf1m8anmP9vUp1Fx4DToJONDL1hIYH8IaUjXmWcMbWTeyFI1BgNlJMxZN9OHZvKsHKI4LmlYlhk5f5ZVLRj','{\"codSess\":\"jTNlVOVjcOj6LL9q9rf1m8anmP9vUp1Fx4DToJONDL1hIYH8IaUjXmWcMbWTeyFI1BgNlJMxZN9OHZvKsHKI4LmlYlhk5f5ZVLRj\",\"idSess\":\"109\",\"dadosUsuarioLogado\":{\"id\":\"5\"}}'),(110,'2016-12-20 14:38:46',1,'9s7GghLE20BXw0RKex503y4WyBLqhAMnoKyM20gUO7VppxrH3oAb3M8RnRsOWpws4LDQKIsE0bDrSqT4zWK7EwodK38cq844Ur0v','{\"codSess\":\"9s7GghLE20BXw0RKex503y4WyBLqhAMnoKyM20gUO7VppxrH3oAb3M8RnRsOWpws4LDQKIsE0bDrSqT4zWK7EwodK38cq844Ur0v\",\"idSess\":\"110\",\"dadosUsuarioLogado\":{\"id\":\"5\"}}'),(111,'2016-12-20 14:38:53',1,'bqQ2gIAWEzve5K3ZLZwSoVSr5l1KqfdCYmTzy9RI91CxtOZHLy34tSHt0ve5ohUAZq76H1kiUPjIE2zhN0GBaDpMrLk04oq2wVA6','{\"codSess\":\"bqQ2gIAWEzve5K3ZLZwSoVSr5l1KqfdCYmTzy9RI91CxtOZHLy34tSHt0ve5ohUAZq76H1kiUPjIE2zhN0GBaDpMrLk04oq2wVA6\",\"idSess\":\"111\",\"dadosUsuarioLogado\":{\"id\":\"5\"}}'),(113,'2016-12-20 14:48:49',1,'625wiK02A7KIscojSAxBVKEaW4tHqJlBtJLoEkAUvORjfu7IVNl3UIOhPzpYDhuYw2npSe02GVdDaj6wQzWMKCHz0lOH4r78VttE','{\"codSess\":\"625wiK02A7KIscojSAxBVKEaW4tHqJlBtJLoEkAUvORjfu7IVNl3UIOhPzpYDhuYw2npSe02GVdDaj6wQzWMKCHz0lOH4r78VttE\",\"idSess\":\"113\",\"dadosUsuarioLogado\":{\"id\":\"5\",\"telefone\":\"456456\"}}'),(114,'2016-12-20 14:48:51',1,'KmIOMvbW3ckojihp4YrbPTZBfAEOaktdYZBcobVtuEMBU3howkWSbJswb6J6CFt86GYMwImV5LGZSizccjUxPQb2u6G8QCdniqZU','{\"codSess\":\"KmIOMvbW3ckojihp4YrbPTZBfAEOaktdYZBcobVtuEMBU3howkWSbJswb6J6CFt86GYMwImV5LGZSizccjUxPQb2u6G8QCdniqZU\",\"idSess\":\"114\",\"dadosUsuarioLogado\":{\"id\":\"5\",\"telefone\":\"456456\"}}'),(117,'2016-12-20 14:53:50',1,'zRfU1rPz9PxFp0Q9pUUn1IC3y5PYK7Fwxi7XxU70VStnXuu0napTo4Vdd3rEDMDbfZrwwAKdGs9CGcqOZVjhhrOCxdhQf0KZ4Mrr','{\"codSess\":\"zRfU1rPz9PxFp0Q9pUUn1IC3y5PYK7Fwxi7XxU70VStnXuu0napTo4Vdd3rEDMDbfZrwwAKdGs9CGcqOZVjhhrOCxdhQf0KZ4Mrr\",\"idSess\":\"117\",\"dadosUsuarioLogado\":{\"id\":\"5\",\"telefone\":\"456456\"},\"salvarFoto\":\"\\/file\\/imagem\\/2016_12_20_14_53_50_4127329003.jpeg\"}'),(118,'2016-12-20 14:54:19',1,'V8GIcerZVkg8X56Or2uExrk6cuVhrSEEmbrrvPRSbtcfYk3mHFUVI6va7v9wsaucOLAVbJlvM7dcz7f917iCSLRPcwwQwD83Lkhc','{\"codSess\":\"V8GIcerZVkg8X56Or2uExrk6cuVhrSEEmbrrvPRSbtcfYk3mHFUVI6va7v9wsaucOLAVbJlvM7dcz7f917iCSLRPcwwQwD83Lkhc\",\"idSess\":\"118\",\"dadosUsuarioLogado\":{\"id\":\"45\",\"telefone\":\"456456\"},\"salvarFoto\":\"\\/file\\/imagem\\/2016_12_20_14_53_50_4127329003.jpeg\"}'),(119,'2016-12-20 14:55:56',1,'FpebaCcgRzWAC4ZUO4bM1Ea4y019ZBsu6u4DEGYsrW6WwVjxDzVsss7pgxXirbHz2Yq8ioUDdv5067HM2qN94gCUeAxHjLarQu3y','{\"codSess\":\"FpebaCcgRzWAC4ZUO4bM1Ea4y019ZBsu6u4DEGYsrW6WwVjxDzVsss7pgxXirbHz2Yq8ioUDdv5067HM2qN94gCUeAxHjLarQu3y\",\"idSess\":\"119\",\"dadosUsuarioLogado\":{\"id\":\"46\",\"telefone\":\"456456\"},\"salvarFoto\":\"\\/file\\/imagem\\/2016_12_20_14_53_50_4127329003.jpeg\"}'),(120,'2016-12-20 14:56:25',1,'SMf239wHCduszoE7mHIROdEnGSfbRsSESnBzouzB0P03aqpLh7uRpoPi2dzxZ0fkGYqp8p3lcpSzsPcJhwDJ5tZSoKTBFaKXdMUH','{\"codSess\":\"SMf239wHCduszoE7mHIROdEnGSfbRsSESnBzouzB0P03aqpLh7uRpoPi2dzxZ0fkGYqp8p3lcpSzsPcJhwDJ5tZSoKTBFaKXdMUH\",\"idSess\":\"120\",\"dadosUsuarioLogado\":{\"id\":\"46\",\"telefone\":\"456456\"},\"salvarFoto\":\"http:\\/\\/172.17.0.2\\/Quickpeek\\/\\/file\\/imagem\\/2016_12_20_14_56_25_1782109216.jpeg\"}'),(121,'2016-12-20 14:56:31',1,'VDCXVgobL4qfKwTRXQbOukI3KNBUkMbwItlQwtuNUjGtEeJGqrWdtlsQ90DCw5y0mbN6GpiMNYIVZdGFNhMtvDmgrMO8OBgUdRP4','{\"codSess\":\"VDCXVgobL4qfKwTRXQbOukI3KNBUkMbwItlQwtuNUjGtEeJGqrWdtlsQ90DCw5y0mbN6GpiMNYIVZdGFNhMtvDmgrMO8OBgUdRP4\",\"idSess\":\"121\",\"dadosUsuarioLogado\":{\"id\":\"47\",\"telefone\":\"456456\"},\"salvarFoto\":\"http:\\/\\/172.17.0.2\\/Quickpeek\\/\\/file\\/imagem\\/2016_12_20_14_56_25_1782109216.jpeg\"}'),(122,'2016-12-20 14:57:47',1,'6WYBayO73KeBypVbhIjQ4rNZ2VHvmWQyIhfm1TZJ9ndf1RPFwII3PLS2jbMYk1qmagxvDZC6QaOitwjJpheNQaaQE2GyT0AJFxY2','{\"codSess\":\"6WYBayO73KeBypVbhIjQ4rNZ2VHvmWQyIhfm1TZJ9ndf1RPFwII3PLS2jbMYk1qmagxvDZC6QaOitwjJpheNQaaQE2GyT0AJFxY2\",\"idSess\":\"122\",\"dadosUsuarioLogado\":{\"id\":\"47\",\"telefone\":\"456456\"},\"salvarFoto\":\"http:\\/\\/172.17.0.2\\/Quickpeek\\/\\/file\\/imagem\\/2016_12_20_14_57_47_9527726610.jpeg\"}'),(123,'2016-12-20 14:57:55',1,'adHSVz3Z8VLu193QSSm5HM7OeZN1xv4waTyavKMU48osEhS4kzJNF5xB3XUkhACc3o78CvqYxb5tbWO7iQkz3lEgjsrGkPdrwjBI','{\"codSess\":\"adHSVz3Z8VLu193QSSm5HM7OeZN1xv4waTyavKMU48osEhS4kzJNF5xB3XUkhACc3o78CvqYxb5tbWO7iQkz3lEgjsrGkPdrwjBI\",\"idSess\":\"123\",\"dadosUsuarioLogado\":{\"id\":\"48\",\"telefone\":\"456456\"},\"salvarFoto\":\"http:\\/\\/172.17.0.2\\/Quickpeek\\/\\/file\\/imagem\\/2016_12_20_14_57_47_9527726610.jpeg\"}'),(124,'2016-12-20 15:03:40',1,'eqnyJOaAzFfzDvwYnCdgW4N2PHaWqIbbEvOIuTBxEFQ5gIwoGhPtXbQOt2F7IY21gP6ResLgARZCcgMR4NXOgIVt8YMsDB7X3Tie','{\"codSess\":\"eqnyJOaAzFfzDvwYnCdgW4N2PHaWqIbbEvOIuTBxEFQ5gIwoGhPtXbQOt2F7IY21gP6ResLgARZCcgMR4NXOgIVt8YMsDB7X3Tie\",\"idSess\":\"124\",\"dadosUsuarioLogado\":{\"id\":\"48\",\"telefone\":\"456456\"},\"salvarFoto\":\"http:\\/\\/172.17.0.2\\/Quickpeek\\/\\/file\\/imagem\\/2016_12_20_15_03_40_2258150028.jpeg\"}'),(125,'2016-12-20 15:03:48',1,'FC0evxItMjj6LEd8oheKXU5PwLTZQjBbtxbjogovuEOf0HVMz6VgDwGLFlcsAaLgYdqKpueGGKW2FOXxyHOEv72ofktxXqdd8kln','{\"codSess\":\"FC0evxItMjj6LEd8oheKXU5PwLTZQjBbtxbjogovuEOf0HVMz6VgDwGLFlcsAaLgYdqKpueGGKW2FOXxyHOEv72ofktxXqdd8kln\",\"idSess\":\"125\",\"dadosUsuarioLogado\":{\"id\":\"49\",\"telefone\":\"456456\"},\"salvarFoto\":\"http:\\/\\/172.17.0.2\\/Quickpeek\\/\\/file\\/imagem\\/2016_12_20_15_03_40_2258150028.jpeg\"}'),(126,'2016-12-20 15:14:37',1,'A6NJZUDqhdFNiEWcef2XNhbB0M1tTZu0OjBHm1KHQxEImGqvtvJsJb0Kpp71ZOUdVMDiDv7Ra39oaSCTBgFNgUa5GKlyLRPhsswY','{\"codSess\":\"A6NJZUDqhdFNiEWcef2XNhbB0M1tTZu0OjBHm1KHQxEImGqvtvJsJb0Kpp71ZOUdVMDiDv7Ra39oaSCTBgFNgUa5GKlyLRPhsswY\",\"idSess\":\"126\",\"dadosUsuarioLogado\":{\"id\":\"49\",\"telefone\":\"456456\"},\"salvarFoto\":\"http:\\/\\/172.17.0.2\\/Quickpeek\\/\\/file\\/imagem\\/2016_12_20_15_14_37_2250349601.jpeg\"}'),(127,'2016-12-20 15:14:43',1,'xApb9sXD1bMaP5p5YtQm4A6XMWS165Pv2NB6mGaNCQAI5sZC9h4ul2ar0rxo4WcEbANYy3KhOZmjj17otDGAaoXfkPgPK8IFyBZj','{\"codSess\":\"xApb9sXD1bMaP5p5YtQm4A6XMWS165Pv2NB6mGaNCQAI5sZC9h4ul2ar0rxo4WcEbANYy3KhOZmjj17otDGAaoXfkPgPK8IFyBZj\",\"idSess\":\"127\",\"dadosUsuarioLogado\":{\"id\":\"50\",\"telefone\":\"456456\"},\"salvarFoto\":\"http:\\/\\/172.17.0.2\\/Quickpeek\\/\\/file\\/imagem\\/2016_12_20_15_14_37_2250349601.jpeg\"}'),(129,'2016-12-20 16:31:14',1,'Ez24jf5fEMyQxVtey8OehUTiHM1cHbgrJVAVFBuH0AAsan7xGJsKK3gaOKmt9lUUB8rYCkWUsA7wvHFl9WZPtbD6awtdjO6ECwW8','{\"codSess\":\"Ez24jf5fEMyQxVtey8OehUTiHM1cHbgrJVAVFBuH0AAsan7xGJsKK3gaOKmt9lUUB8rYCkWUsA7wvHFl9WZPtbD6awtdjO6ECwW8\",\"idSess\":\"129\",\"dadosUsuarioLogado\":{\"id\":\"50\",\"telefone\":\"456456\"},\"salvarFoto\":\"http:\\/\\/172.17.0.2\\/Quickpeek\\/\\/file\\/imagem\\/2016_12_20_16_31_14_4190363872.jpeg\"}'),(130,'2016-12-20 16:31:21',1,'jSf4JPwNuW7fbrChxIu7qoJsjJ676SjyncLqpjIbwkOFbfND3aFJy8WN7ipg2K1a2fcJ0L4SZomsfitVmiSCitOp0IkbGVH3FoJu','{\"codSess\":\"jSf4JPwNuW7fbrChxIu7qoJsjJ676SjyncLqpjIbwkOFbfND3aFJy8WN7ipg2K1a2fcJ0L4SZomsfitVmiSCitOp0IkbGVH3FoJu\",\"idSess\":\"130\",\"dadosUsuarioLogado\":{\"id\":\"51\",\"telefone\":\"456456\"},\"salvarFoto\":\"http:\\/\\/172.17.0.2\\/Quickpeek\\/\\/file\\/imagem\\/2016_12_20_16_31_14_4190363872.jpeg\"}'),(131,'2016-12-20 16:45:50',1,'8b6L9Kwx38DIp5HCX0Wu3Hx4jZpDTy7pSMTus1LqDtqakeYr8z0t7jdrw0ooRykTurn9frqRvb6Lb7s0zG3r3YNlmPoGVQ1DCOtl','{\"codSess\":\"8b6L9Kwx38DIp5HCX0Wu3Hx4jZpDTy7pSMTus1LqDtqakeYr8z0t7jdrw0ooRykTurn9frqRvb6Lb7s0zG3r3YNlmPoGVQ1DCOtl\",\"idSess\":\"131\",\"dadosUsuarioLogado\":{\"id\":\"51\",\"telefone\":\"456456\"},\"salvarFoto\":\"http:\\/\\/172.17.0.2\\/Quickpeek\\/\\/file\\/imagem\\/2016_12_20_16_31_14_4190363872.jpeg\"}'),(132,'2016-12-20 16:45:57',1,'jtuNE5sfiz8k5SLwEwanruQwubfl73GvNad8Cu2cv5oJ0Q9JtBJ0Dd95EDnF6unnRSYwLOZlTUyFDvW5CKmZMVGOyyLDUuhgzbV7','{\"codSess\":\"jtuNE5sfiz8k5SLwEwanruQwubfl73GvNad8Cu2cv5oJ0Q9JtBJ0Dd95EDnF6unnRSYwLOZlTUyFDvW5CKmZMVGOyyLDUuhgzbV7\",\"idSess\":\"132\",\"dadosUsuarioLogado\":{\"id\":\"51\",\"telefone\":\"456456\"},\"salvarFoto\":\"http:\\/\\/172.17.0.2\\/Quickpeek\\/\\/file\\/imagem\\/2016_12_20_16_31_14_4190363872.jpeg\"}'),(133,'2016-12-20 16:45:58',1,'xrPgdqIuhEhRNdk19eLpF06w8X8AQUeSqwIl40miGQzJN3rw5x7n7ye3vd2sUKeaaE2rBZw6fEghHYRhj9i8EedOxC6DhAgCyxFV','{\"codSess\":\"xrPgdqIuhEhRNdk19eLpF06w8X8AQUeSqwIl40miGQzJN3rw5x7n7ye3vd2sUKeaaE2rBZw6fEghHYRhj9i8EedOxC6DhAgCyxFV\",\"idSess\":\"133\",\"dadosUsuarioLogado\":{\"id\":\"51\",\"telefone\":\"456456\"},\"salvarFoto\":\"http:\\/\\/172.17.0.2\\/Quickpeek\\/\\/file\\/imagem\\/2016_12_20_16_31_14_4190363872.jpeg\"}'),(134,'2016-12-20 16:45:58',1,'7exB2YbK5uYJFTxHeJTby8nHTVasvBKHYe90yvzGUvcI4vgOtimEB7Hxp6IFtL5wy4Hrtt2QtmxszPQPu3u5BzIhIiwvYO8przwZ','{\"codSess\":\"7exB2YbK5uYJFTxHeJTby8nHTVasvBKHYe90yvzGUvcI4vgOtimEB7Hxp6IFtL5wy4Hrtt2QtmxszPQPu3u5BzIhIiwvYO8przwZ\",\"idSess\":\"134\",\"dadosUsuarioLogado\":{\"id\":\"51\",\"telefone\":\"456456\"},\"salvarFoto\":\"http:\\/\\/172.17.0.2\\/Quickpeek\\/\\/file\\/imagem\\/2016_12_20_16_31_14_4190363872.jpeg\"}'),(135,'2016-12-20 16:45:58',1,'NSuidM6NCIXP3MXgmaX1oxfQcFCxdQ3RmmTTRNHzRFgSyGIktP18kUG4o0oieEXu8bVcTGPVJiNlRLeeAZkUZrkE0Sa8yuTgaL7H','{\"codSess\":\"NSuidM6NCIXP3MXgmaX1oxfQcFCxdQ3RmmTTRNHzRFgSyGIktP18kUG4o0oieEXu8bVcTGPVJiNlRLeeAZkUZrkE0Sa8yuTgaL7H\",\"idSess\":\"135\",\"dadosUsuarioLogado\":{\"id\":\"51\",\"telefone\":\"456456\"},\"salvarFoto\":\"http:\\/\\/172.17.0.2\\/Quickpeek\\/\\/file\\/imagem\\/2016_12_20_16_31_14_4190363872.jpeg\"}'),(136,'2016-12-20 16:45:59',1,'kQ2vvDronJC1KD15Q135Cg7uHpUelRQxumGeTlClezhNaqpY55wyKp96VTJfTfLq7L0I7tSPbwVGUj1qRj88YeIOEAU8yHs1iC9J','{\"codSess\":\"kQ2vvDronJC1KD15Q135Cg7uHpUelRQxumGeTlClezhNaqpY55wyKp96VTJfTfLq7L0I7tSPbwVGUj1qRj88YeIOEAU8yHs1iC9J\",\"idSess\":\"136\",\"dadosUsuarioLogado\":{\"id\":\"51\",\"telefone\":\"456456\"},\"salvarFoto\":\"http:\\/\\/172.17.0.2\\/Quickpeek\\/\\/file\\/imagem\\/2016_12_20_16_31_14_4190363872.jpeg\"}'),(137,'2016-12-20 16:45:59',1,'ayhHHuCzbip8EhJ714nRjElIguCrRDzzNvtQmT3qyFDAxLLv89IW67NiuzgUYh3Z07vnt5EiegzbFrF5YWnykiWiYY4r3SOp2x5P','{\"codSess\":\"ayhHHuCzbip8EhJ714nRjElIguCrRDzzNvtQmT3qyFDAxLLv89IW67NiuzgUYh3Z07vnt5EiegzbFrF5YWnykiWiYY4r3SOp2x5P\",\"idSess\":\"137\",\"dadosUsuarioLogado\":{\"id\":\"51\",\"telefone\":\"456456\"},\"salvarFoto\":\"http:\\/\\/172.17.0.2\\/Quickpeek\\/\\/file\\/imagem\\/2016_12_20_16_31_14_4190363872.jpeg\"}'),(138,'2016-12-20 16:45:59',1,'xaiOGJqqi7ftMmonabpV3L3LPkFb72IMKP4DtSRlSRaz5Euweki4qlTZ668fXBOQru28AfDEpDKZYrkcUQ5JTrPOkIU4Ga5aQRAH','{\"codSess\":\"xaiOGJqqi7ftMmonabpV3L3LPkFb72IMKP4DtSRlSRaz5Euweki4qlTZ668fXBOQru28AfDEpDKZYrkcUQ5JTrPOkIU4Ga5aQRAH\",\"idSess\":\"138\",\"dadosUsuarioLogado\":{\"id\":\"51\",\"telefone\":\"456456\"},\"salvarFoto\":\"http:\\/\\/172.17.0.2\\/Quickpeek\\/\\/file\\/imagem\\/2016_12_20_16_31_14_4190363872.jpeg\"}'),(139,'2016-12-20 16:45:59',1,'Suf7VYnYCIEua26FoVIMdT43tGYK23QewpIebcvixitzkVA2Z86igYZq8mpMdjqkHWjXge5y2Q3TB8Vn7bhsK5g6PJuN4hnfb6wt','{\"codSess\":\"Suf7VYnYCIEua26FoVIMdT43tGYK23QewpIebcvixitzkVA2Z86igYZq8mpMdjqkHWjXge5y2Q3TB8Vn7bhsK5g6PJuN4hnfb6wt\",\"idSess\":\"139\",\"dadosUsuarioLogado\":{\"id\":\"51\",\"telefone\":\"456456\"},\"salvarFoto\":\"http:\\/\\/172.17.0.2\\/Quickpeek\\/\\/file\\/imagem\\/2016_12_20_16_31_14_4190363872.jpeg\"}'),(140,'2016-12-20 16:45:59',1,'WAyeMcj6eyQjsttdfJM3TmpWZLjF6NUWDUod5fQhsqckzpL5IPAchemCnDyk4glFxzFOJoxZk6KyVUWDe5DYJZHFfVVaxk9ewkvO','{\"codSess\":\"WAyeMcj6eyQjsttdfJM3TmpWZLjF6NUWDUod5fQhsqckzpL5IPAchemCnDyk4glFxzFOJoxZk6KyVUWDe5DYJZHFfVVaxk9ewkvO\",\"idSess\":\"140\",\"dadosUsuarioLogado\":{\"id\":\"51\",\"telefone\":\"456456\"},\"salvarFoto\":\"http:\\/\\/172.17.0.2\\/Quickpeek\\/\\/file\\/imagem\\/2016_12_20_16_31_14_4190363872.jpeg\"}'),(141,'2016-12-20 16:46:00',1,'wBmGpN16OJtmff6KX84qiHEjoyayOrkuqO465yoVLlYyranMNHmuFtmd3Z5Cm0sLnas6y2yxYvFKUFk1wNf1fSoKhCD2eWY0sOAl','{\"codSess\":\"wBmGpN16OJtmff6KX84qiHEjoyayOrkuqO465yoVLlYyranMNHmuFtmd3Z5Cm0sLnas6y2yxYvFKUFk1wNf1fSoKhCD2eWY0sOAl\",\"idSess\":\"141\",\"dadosUsuarioLogado\":{\"id\":\"51\",\"telefone\":\"456456\"},\"salvarFoto\":\"http:\\/\\/172.17.0.2\\/Quickpeek\\/\\/file\\/imagem\\/2016_12_20_16_31_14_4190363872.jpeg\"}'),(142,'2016-12-20 16:46:00',1,'cq34lWavN9HwHvhZ9Ml0T719Bbc1HqBbtzQ5PePf9TPhJsVymy727VPHhxFeFwfMIoQk5pA4yt4FF3BNY8c8c8xrb8Qdu4vdC3xg','{\"codSess\":\"cq34lWavN9HwHvhZ9Ml0T719Bbc1HqBbtzQ5PePf9TPhJsVymy727VPHhxFeFwfMIoQk5pA4yt4FF3BNY8c8c8xrb8Qdu4vdC3xg\",\"idSess\":\"142\",\"dadosUsuarioLogado\":{\"id\":\"51\",\"telefone\":\"456456\"},\"salvarFoto\":\"http:\\/\\/172.17.0.2\\/Quickpeek\\/\\/file\\/imagem\\/2016_12_20_16_31_14_4190363872.jpeg\"}'),(143,'2016-12-20 16:50:03',1,'5yX5UA8Y7H4BPVSuhGqLfQ5PBRh5MiZA8ptmf1Yl1G4W2f6QQOzNM9xarKjAkxdkpJqnFkjXN7dQQXqAjTaou0VPoeacRd86z8mo','{\"codSess\":\"5yX5UA8Y7H4BPVSuhGqLfQ5PBRh5MiZA8ptmf1Yl1G4W2f6QQOzNM9xarKjAkxdkpJqnFkjXN7dQQXqAjTaou0VPoeacRd86z8mo\",\"idSess\":\"143\",\"dadosUsuarioLogado\":{\"id\":\"5\",\"telefone\":\"456456\"},\"salvarFoto\":\"http:\\/\\/172.17.0.2\\/Quickpeek\\/\\/file\\/imagem\\/2016_12_20_16_31_14_4190363872.jpeg\"}'),(144,'2016-12-20 16:50:27',1,'5uf6g7zaPvF7PrJE9h8uaTzYkfJrTQPJQjVX4fM0HCkU9KCpAQdkuf6gVlZCBZAfuEecPlRA1ck2sWczaA2y3rS8TR63SzrTZyCG','{\"codSess\":\"5uf6g7zaPvF7PrJE9h8uaTzYkfJrTQPJQjVX4fM0HCkU9KCpAQdkuf6gVlZCBZAfuEecPlRA1ck2sWczaA2y3rS8TR63SzrTZyCG\",\"idSess\":\"144\",\"dadosUsuarioLogado\":{\"id\":\"5\",\"telefone\":\"456456\"},\"salvarFoto\":\"http:\\/\\/172.17.0.2\\/Quickpeek\\/\\/file\\/imagem\\/2016_12_20_16_31_14_4190363872.jpeg\"}'),(161,'2016-12-20 16:54:01',1,'9BWRMD1ZIsNVUyPAATFcyOBJuZquZMLxik3bUER7MgeVMGBUjifIdSQcqwjnbo47yukx1BEbakA5UbaDDp1aEdmbYsLBjL8jAtpo','{\"codSess\":\"9BWRMD1ZIsNVUyPAATFcyOBJuZquZMLxik3bUER7MgeVMGBUjifIdSQcqwjnbo47yukx1BEbakA5UbaDDp1aEdmbYsLBjL8jAtpo\",\"idSess\":\"161\",\"dadosUsuarioLogado\":{\"id\":\"5\",\"telefone\":\"456456\"},\"salvarFoto\":\"http:\\/\\/172.17.0.2\\/Quickpeek\\/\\/file\\/imagem\\/2016_12_20_16_31_14_4190363872.jpeg\"}'),(162,'2016-12-20 16:54:14',1,'bJK0wlmic131TXfJbnIohxY1Fk8g5wZes7mCQSo0yUu6etMJ3cuBkeaRQKRxMFnZXMIXPlubqxjsm075YkizDlzkc7JdX1F6URCg','{\"codSess\":\"bJK0wlmic131TXfJbnIohxY1Fk8g5wZes7mCQSo0yUu6etMJ3cuBkeaRQKRxMFnZXMIXPlubqxjsm075YkizDlzkc7JdX1F6URCg\",\"idSess\":\"162\",\"dadosUsuarioLogado\":{\"id\":\"5\",\"telefone\":\"456456\"},\"salvarFoto\":\"http:\\/\\/172.17.0.2\\/Quickpeek\\/\\/file\\/imagem\\/2016_12_20_16_31_14_4190363872.jpeg\"}'),(163,'2016-12-20 16:54:25',1,'ibuFG6bSSis6c5b1wtnNV6J50oVM4eT2ABilTkiHSI6S8BzzRZPT0mg6wcClsF7QTeeJslvWBBXYy3Er0A9h73Se1eB0ZDsLUy5N','{\"codSess\":\"ibuFG6bSSis6c5b1wtnNV6J50oVM4eT2ABilTkiHSI6S8BzzRZPT0mg6wcClsF7QTeeJslvWBBXYy3Er0A9h73Se1eB0ZDsLUy5N\",\"idSess\":\"163\",\"dadosUsuarioLogado\":{\"id\":\"5\",\"telefone\":\"456456\"},\"salvarFoto\":\"http:\\/\\/172.17.0.2\\/Quickpeek\\/\\/file\\/imagem\\/2016_12_20_16_31_14_4190363872.jpeg\"}'),(164,'2016-12-20 16:57:20',1,'Yvpp7RUcaiRsJQtwkTIQKJSagUXANSxntFnu35nUtQanUwdstvcIVUFrBRsmTq4PUT0pQTPpGKYOfQDmQNwEip6XI3IEbivbNkM8','{\"codSess\":\"Yvpp7RUcaiRsJQtwkTIQKJSagUXANSxntFnu35nUtQanUwdstvcIVUFrBRsmTq4PUT0pQTPpGKYOfQDmQNwEip6XI3IEbivbNkM8\",\"idSess\":\"164\",\"dadosUsuarioLogado\":{\"id\":\"5\",\"telefone\":\"456456\"},\"salvarFoto\":\"http:\\/\\/172.17.0.2\\/Quickpeek\\/\\/file\\/imagem\\/2016_12_20_16_31_14_4190363872.jpeg\"}'),(165,'2016-12-20 17:19:12',1,'syxe3UF9Z2t61bUIsSqPh8tHqDNMybzBFuDdEam29Car6OtOiMMZ1fjJmqq9CCP93aXckq6p17rmQ5bqTO9zfJNGXiDQyPJeYlxq','{\"codSess\":\"syxe3UF9Z2t61bUIsSqPh8tHqDNMybzBFuDdEam29Car6OtOiMMZ1fjJmqq9CCP93aXckq6p17rmQ5bqTO9zfJNGXiDQyPJeYlxq\",\"idSess\":\"165\",\"dadosUsuarioLogado\":{\"id\":\"5\",\"telefone\":\"456456\"},\"salvarFoto\":\"http:\\/\\/172.17.0.2\\/Quickpeek\\/\\/file\\/imagem\\/2016_12_20_16_31_14_4190363872.jpeg\"}'),(166,'2016-12-20 17:19:45',1,'KA9tqsU5EiPpYzjs09AfzF3qC0AHoEh0y59isePZPZwwgXpKF4lNVuti36PqVEoC9NIzekB1uJKfdQkUzdY37O1vLiR2ED61DYtl','{\"codSess\":\"KA9tqsU5EiPpYzjs09AfzF3qC0AHoEh0y59isePZPZwwgXpKF4lNVuti36PqVEoC9NIzekB1uJKfdQkUzdY37O1vLiR2ED61DYtl\",\"idSess\":\"166\",\"dadosUsuarioLogado\":{\"id\":\"5\",\"telefone\":\"456456\"},\"salvarFoto\":\"http:\\/\\/172.17.0.2\\/Quickpeek\\/\\/file\\/imagem\\/2016_12_20_16_31_14_4190363872.jpeg\"}'),(170,'2016-12-20 17:22:15',1,'5gA0soe5IpyZWpeDg9M2JNqLPDQslKui0gEGTEkldlD8FKBzc4xDBZyYW7Nf23EdgG4P3X3XLB5ph25YarY5AFVhTjurtc7H136p','{\"codSess\":\"5gA0soe5IpyZWpeDg9M2JNqLPDQslKui0gEGTEkldlD8FKBzc4xDBZyYW7Nf23EdgG4P3X3XLB5ph25YarY5AFVhTjurtc7H136p\",\"idSess\":\"170\",\"dadosUsuarioLogado\":{\"id\":\"5\",\"telefone\":\"456456\"},\"salvarFoto\":\"http:\\/\\/172.17.0.2\\/Quickpeek\\/\\/file\\/imagem\\/2016_12_20_16_31_14_4190363872.jpeg\"}'),(171,'2016-12-20 17:22:37',1,'hCNMMZeii7NkIKt6Xwf8zsGOVZAbHUOpliTIPCeG3sFJQS8STKW6wL1PBUEcFXOakiiJFogGwidOMjfGrtlDXUMr3MUDZ57nNyxY','{\"codSess\":\"hCNMMZeii7NkIKt6Xwf8zsGOVZAbHUOpliTIPCeG3sFJQS8STKW6wL1PBUEcFXOakiiJFogGwidOMjfGrtlDXUMr3MUDZ57nNyxY\",\"idSess\":\"171\",\"dadosUsuarioLogado\":{\"id\":\"5\",\"telefone\":\"456456\"},\"salvarFoto\":\"http:\\/\\/172.17.0.2\\/Quickpeek\\/\\/file\\/imagem\\/2016_12_20_16_31_14_4190363872.jpeg\"}'),(172,'2016-12-20 17:24:24',1,'nomv1KfvhpVwXPUbmzop84JLEJc0WfoLbyHZVpYMCpKZXkSMrXUKcbEOFqU4LBpQJFJo6ievlxvxzMcwWmyYXI1UjHCkL4HMKZW9','{\"codSess\":\"nomv1KfvhpVwXPUbmzop84JLEJc0WfoLbyHZVpYMCpKZXkSMrXUKcbEOFqU4LBpQJFJo6ievlxvxzMcwWmyYXI1UjHCkL4HMKZW9\",\"idSess\":\"172\",\"dadosUsuarioLogado\":{\"id\":\"5\",\"telefone\":\"456456\"},\"salvarFoto\":\"http:\\/\\/172.17.0.2\\/Quickpeek\\/\\/file\\/imagem\\/2016_12_20_16_31_14_4190363872.jpeg\"}'),(173,'2016-12-20 17:24:35',1,'o58qhYeZc7kJZZQzzi4AAZjl6qCQ1fOdxqSN6YkBBLCLEQK5YQKvaYHln3LRiQPZDJdWnJE0b1Iy2YBPfkCXWRjtSSiSRSIXrDzr','{\"codSess\":\"o58qhYeZc7kJZZQzzi4AAZjl6qCQ1fOdxqSN6YkBBLCLEQK5YQKvaYHln3LRiQPZDJdWnJE0b1Iy2YBPfkCXWRjtSSiSRSIXrDzr\",\"idSess\":\"173\",\"dadosUsuarioLogado\":{\"id\":\"5\",\"telefone\":\"456456\"},\"salvarFoto\":\"http:\\/\\/172.17.0.2\\/Quickpeek\\/\\/file\\/imagem\\/2016_12_20_16_31_14_4190363872.jpeg\"}'),(174,'2016-12-20 17:24:39',1,'AEjCZXd8KcbSNEkAwDP9qUjomrVFePWao8FnRYEkKfmVckUMU8CTesVeAfIDMJglKZLJjhyyQcwGNLBoz0I1jswtuBJGDlgVOf0G','{\"codSess\":\"AEjCZXd8KcbSNEkAwDP9qUjomrVFePWao8FnRYEkKfmVckUMU8CTesVeAfIDMJglKZLJjhyyQcwGNLBoz0I1jswtuBJGDlgVOf0G\",\"idSess\":\"174\",\"dadosUsuarioLogado\":{\"id\":\"5\",\"telefone\":\"456456\"},\"salvarFoto\":\"http:\\/\\/172.17.0.2\\/Quickpeek\\/\\/file\\/imagem\\/2016_12_20_16_31_14_4190363872.jpeg\"}'),(175,'2016-12-20 17:25:48',1,'xhWG4kX0qEUCaQYOFY9Dci0SKw2jQtEnIb8akQPSWR3frvVDrRwwxZ8ZYkT5QgDi9Vcx4GO6CpEjCPq9oD9toGnEPIqGn8rnlu13','{\"codSess\":\"xhWG4kX0qEUCaQYOFY9Dci0SKw2jQtEnIb8akQPSWR3frvVDrRwwxZ8ZYkT5QgDi9Vcx4GO6CpEjCPq9oD9toGnEPIqGn8rnlu13\",\"idSess\":\"175\",\"dadosUsuarioLogado\":{\"id\":\"5\",\"telefone\":\"456456\"},\"salvarFoto\":\"http:\\/\\/172.17.0.2\\/Quickpeek\\/\\/file\\/imagem\\/2016_12_20_16_31_14_4190363872.jpeg\"}'),(176,'2016-12-20 17:25:56',1,'tlSV47kgdIWPK8k5jR8nkDLy8wFrYaOWh5hd3cMgFFcpfLb30P0S6dTuwlRcFnc5Gzhj5qct9LJgXDic7dUhwNYUqgo5SVDJnsOk','{\"codSess\":\"tlSV47kgdIWPK8k5jR8nkDLy8wFrYaOWh5hd3cMgFFcpfLb30P0S6dTuwlRcFnc5Gzhj5qct9LJgXDic7dUhwNYUqgo5SVDJnsOk\",\"idSess\":\"176\",\"dadosUsuarioLogado\":{\"id\":\"5\",\"telefone\":\"456456\"},\"salvarFoto\":\"http:\\/\\/172.17.0.2\\/Quickpeek\\/\\/file\\/imagem\\/2016_12_20_16_31_14_4190363872.jpeg\"}'),(177,'2016-12-20 17:26:58',1,'U81d5dewfJG7xpDeJ70R6ootMmtYic7DlRvtVbb0anr8MDL51qHL9KQLruBFZYw2xzMFwMcC6ZhH6GIoEcMYwTw9MsdZho8uPLgd','{\"codSess\":\"U81d5dewfJG7xpDeJ70R6ootMmtYic7DlRvtVbb0anr8MDL51qHL9KQLruBFZYw2xzMFwMcC6ZhH6GIoEcMYwTw9MsdZho8uPLgd\",\"idSess\":\"177\",\"dadosUsuarioLogado\":{\"id\":\"5\",\"telefone\":\"456456\"},\"salvarFoto\":\"http:\\/\\/172.17.0.2\\/Quickpeek\\/\\/file\\/imagem\\/2016_12_20_16_31_14_4190363872.jpeg\"}'),(178,'2016-12-20 17:27:20',1,'4dwMnuWd74XqQyjOOmwyZIQU9XQELkGv6VbWR4JsZHO14LtqelgwD7lMXKdLqgTVMSFFlLquIiGKuxvKBfAp72aOKC43tYu7y6uJ','{\"codSess\":\"4dwMnuWd74XqQyjOOmwyZIQU9XQELkGv6VbWR4JsZHO14LtqelgwD7lMXKdLqgTVMSFFlLquIiGKuxvKBfAp72aOKC43tYu7y6uJ\",\"idSess\":\"178\",\"dadosUsuarioLogado\":{\"id\":\"5\",\"telefone\":\"456456\"},\"salvarFoto\":\"http:\\/\\/172.17.0.2\\/Quickpeek\\/\\/file\\/imagem\\/2016_12_20_16_31_14_4190363872.jpeg\"}'),(182,'2016-12-20 17:39:03',1,'PBmyVznmLAS6osUWhEvTqXQ3sujoh6Zr0lmKhekOWZJrxYcb9Q1r31oDFVhpEHkuMnjxPlgVh1quXX7TzZlhw1OJUqhUnhXTsdoO','{\"codSess\":\"PBmyVznmLAS6osUWhEvTqXQ3sujoh6Zr0lmKhekOWZJrxYcb9Q1r31oDFVhpEHkuMnjxPlgVh1quXX7TzZlhw1OJUqhUnhXTsdoO\",\"idSess\":\"182\",\"dadosUsuarioLogado\":{\"id\":\"4\",\"telefone\":\"456456\"},\"salvarFoto\":\"http:\\/\\/172.17.0.2\\/Quickpeek\\/\\/file\\/imagem\\/2016_12_20_16_31_14_4190363872.jpeg\"}'),(184,'2016-12-21 13:16:25',1,'B1wEl2o0PJ4mnhdvxYslPUkMYWSjqMpu6jYvBCgj1E5pUP1HMzVspTKVqjw1L7WIb5Ui6LC1GJlc5s6Rvc9BpN7zJHZrBsL6sTvN','{\"codSess\":\"B1wEl2o0PJ4mnhdvxYslPUkMYWSjqMpu6jYvBCgj1E5pUP1HMzVspTKVqjw1L7WIb5Ui6LC1GJlc5s6Rvc9BpN7zJHZrBsL6sTvN\",\"idSess\":\"184\",\"dadosUsuarioLogado\":{\"id\":\"5\"}}'),(186,'2016-12-21 13:16:56',1,'nqNPQtTLpDDGHN9sfpqLZkEkFaqeg32RbCwRAysYpWCvlJG3nPBEB47ThSCkuCO1rWKapDamvdDwp4ffvkcFYS7GHuQCYYWDRk84','{\"codSess\":\"nqNPQtTLpDDGHN9sfpqLZkEkFaqeg32RbCwRAysYpWCvlJG3nPBEB47ThSCkuCO1rWKapDamvdDwp4ffvkcFYS7GHuQCYYWDRk84\",\"idSess\":\"186\",\"dadosUsuarioLogado\":{\"id\":\"4\"}}'),(194,'2016-12-21 13:38:34',1,'ZDjAzkZ3V8I4p9e29LjwWRErqtTetcbRlj7RqmJQi79Up5qSkLHlt2FHbh3udyeasGp7SpYTGxFbZ5Ql2zj8kGF3Fp2Hjci0geJ5','{\"codSess\":\"ZDjAzkZ3V8I4p9e29LjwWRErqtTetcbRlj7RqmJQi79Up5qSkLHlt2FHbh3udyeasGp7SpYTGxFbZ5Ql2zj8kGF3Fp2Hjci0geJ5\",\"idSess\":\"194\",\"dadosUsuarioLogado\":{\"id\":\"4\"}}'),(196,'2016-12-21 14:02:17',1,'qyKUuDHoSCg6FaygAafbLuf6jiItbF0THGx2wq3nD2BmXfKPZi39kLN98vmjZ0ub0WJD5nqUvj0r8vgIAmlTmeDTk1wqGKcs5nl3','{\"codSess\":\"qyKUuDHoSCg6FaygAafbLuf6jiItbF0THGx2wq3nD2BmXfKPZi39kLN98vmjZ0ub0WJD5nqUvj0r8vgIAmlTmeDTk1wqGKcs5nl3\",\"idSess\":\"196\",\"dadosUsuarioLogado\":{\"id\":\"4\"}}'),(197,'2016-12-21 14:02:34',1,'OOW5fLHu361zxkbld5KBySxFKmm4aKRkNjRvRMil2aDSGXfeB4aPUvPGA75qbmudWxzImpqbRR4XJ9p8mi9pDsc2yjOLn7Te5r8X','{\"codSess\":\"OOW5fLHu361zxkbld5KBySxFKmm4aKRkNjRvRMil2aDSGXfeB4aPUvPGA75qbmudWxzImpqbRR4XJ9p8mi9pDsc2yjOLn7Te5r8X\",\"idSess\":\"197\",\"dadosUsuarioLogado\":{\"id\":\"4\"}}'),(198,'2016-12-21 14:29:16',1,'hV27fotGksRWFb7sbygrKmzuL36WufcwKlJ5SWdg9GzSzqpUB6EaR6kyDTyKKCXhemQEaUqDtFuVx7fiAn1XOSzML8NAlIA21wrv','{\"codSess\":\"hV27fotGksRWFb7sbygrKmzuL36WufcwKlJ5SWdg9GzSzqpUB6EaR6kyDTyKKCXhemQEaUqDtFuVx7fiAn1XOSzML8NAlIA21wrv\",\"idSess\":\"198\",\"dadosUsuarioLogado\":{\"id\":\"4\"}}'),(199,'2016-12-21 14:31:15',1,'sSy4NmbWexivLT1hWYZW1vurfe6QGz0k07N9kojmOXrSz8Y9avDJBcZMMwPmtrp3cVQWoOiqhkxuAALVG1wkqrBD7kVjANkoniuA','{\"codSess\":\"sSy4NmbWexivLT1hWYZW1vurfe6QGz0k07N9kojmOXrSz8Y9avDJBcZMMwPmtrp3cVQWoOiqhkxuAALVG1wkqrBD7kVjANkoniuA\",\"idSess\":\"199\",\"dadosUsuarioLogado\":{\"id\":\"4\"}}'),(218,'2016-12-21 15:51:00',1,'f7wverMB1cTIAiIkxJfK2N62zt7gzL1JK1g8AWl9jb0BogH4JL4Z83sOkFybV5n4YKkYZ2e4Jg5fk1RjjGNevCnVyrDLMrnufmbV','{\"codSess\":\"f7wverMB1cTIAiIkxJfK2N62zt7gzL1JK1g8AWl9jb0BogH4JL4Z83sOkFybV5n4YKkYZ2e4Jg5fk1RjjGNevCnVyrDLMrnufmbV\",\"idSess\":\"218\",\"dadosUsuarioLogado\":{\"id\":\"4\",\"local\":\"1\"}}'),(219,'2016-12-21 15:51:03',1,'xMoRzvrxKopHDmqDLBcDLzSFbNUhjOLVE7piOMLLJBosggDMzhV8H0T8lyrgLHOYzjn9KRgJar8X9DmVmDp3PkYQSrlQVPKgTrb7','{\"codSess\":\"xMoRzvrxKopHDmqDLBcDLzSFbNUhjOLVE7piOMLLJBosggDMzhV8H0T8lyrgLHOYzjn9KRgJar8X9DmVmDp3PkYQSrlQVPKgTrb7\",\"idSess\":\"219\",\"dadosUsuarioLogado\":{\"id\":\"4\",\"local\":\"26\"}}'),(220,'2016-12-21 15:51:15',1,'I8TisyFyKSQ861UnQP6efTLjF9tAH8RBvh9lwLNvW2t8TJwbtGhnrnvExqBjjOXyNcX4IjzPH1ObyqsIswxRjVDSGFZ6GDVyzMWu','{\"codSess\":\"I8TisyFyKSQ861UnQP6efTLjF9tAH8RBvh9lwLNvW2t8TJwbtGhnrnvExqBjjOXyNcX4IjzPH1ObyqsIswxRjVDSGFZ6GDVyzMWu\",\"idSess\":\"220\",\"dadosUsuarioLogado\":{\"id\":\"4\",\"local\":\"26\"}}'),(221,'2016-12-21 15:51:19',1,'LWQfmJHcL5LoxCJF1aCEfWgHTnkNbC34xOfGvbQQOsOfREhfo4VrjGJCx2JdsFZwP4LZTpUSPin7Q2fuj4WDilRRYcy1QRfA5pDp','{\"codSess\":\"LWQfmJHcL5LoxCJF1aCEfWgHTnkNbC34xOfGvbQQOsOfREhfo4VrjGJCx2JdsFZwP4LZTpUSPin7Q2fuj4WDilRRYcy1QRfA5pDp\",\"idSess\":\"221\",\"dadosUsuarioLogado\":{\"id\":\"4\",\"local\":\"26\"}}'),(222,'2016-12-21 15:53:09',1,'d74Ba5I0NhRIHSLVSM63e7HaQGWwhBsUH921BOjB9cBRPInF7h6u6sVl4BqojXmWzEViC35gYuIn6iqgJLBuNrp00Db4SGKC1SmV','{\"codSess\":\"d74Ba5I0NhRIHSLVSM63e7HaQGWwhBsUH921BOjB9cBRPInF7h6u6sVl4BqojXmWzEViC35gYuIn6iqgJLBuNrp00Db4SGKC1SmV\",\"idSess\":\"222\",\"dadosUsuarioLogado\":{\"id\":\"4\",\"local\":\"26\"}}'),(223,'2016-12-21 15:53:33',1,'vNTffVYRdH4KMwfQV0v7An9sdFspYQW80wwxV3qc8ME8IeYtYrMKKxpxk6jJTi9eRDQUDTu3oUVqolNGFzQDQU7SjbYDqAAbWl1j','{\"codSess\":\"vNTffVYRdH4KMwfQV0v7An9sdFspYQW80wwxV3qc8ME8IeYtYrMKKxpxk6jJTi9eRDQUDTu3oUVqolNGFzQDQU7SjbYDqAAbWl1j\",\"idSess\":\"223\",\"dadosUsuarioLogado\":{\"id\":\"4\",\"local\":\"26\"}}'),(224,'2016-12-21 15:54:10',1,'jnw7ILN2Hzcuv3HHnwdQ2I8Lzxm8qmXFcWJlSf6D5nQp5AtaX1lA4CPRx6gdydsG3sfAgQKOzp6A2YSu1ykl0lXPsCEQZ2ZArfU7','{\"codSess\":\"jnw7ILN2Hzcuv3HHnwdQ2I8Lzxm8qmXFcWJlSf6D5nQp5AtaX1lA4CPRx6gdydsG3sfAgQKOzp6A2YSu1ykl0lXPsCEQZ2ZArfU7\",\"idSess\":\"224\",\"dadosUsuarioLogado\":{\"id\":\"4\",\"local\":\"26\"}}'),(225,'2016-12-21 15:54:13',1,'E5F916EbvPhHGmDdI84Xd1qtRoAyNYGHFzhz2XhCnot3Ni7j1sEKvEZtpRvWXvxTkBXyeqEEDmyx5HvrwaGNg94HKo3uwYfKOECe','{\"codSess\":\"E5F916EbvPhHGmDdI84Xd1qtRoAyNYGHFzhz2XhCnot3Ni7j1sEKvEZtpRvWXvxTkBXyeqEEDmyx5HvrwaGNg94HKo3uwYfKOECe\",\"idSess\":\"225\",\"dadosUsuarioLogado\":{\"id\":\"4\",\"local\":\"26\"}}'),(227,'2016-12-21 16:00:47',1,'irTO7quXVym0N9wMGOrgQCrOcYpN0aAXEb2ilCD6I5NNPcl6H5rIefAS6i88hjSbRphAQsYf5nnPv4wguqa5MW018ryjMGeiZBTS','{\"codSess\":\"irTO7quXVym0N9wMGOrgQCrOcYpN0aAXEb2ilCD6I5NNPcl6H5rIefAS6i88hjSbRphAQsYf5nnPv4wguqa5MW018ryjMGeiZBTS\",\"idSess\":\"227\",\"dadosUsuarioLogado\":{\"id\":\"4\",\"local\":\"26\"}}'),(228,'2016-12-21 16:02:27',1,'YlEMAEpWOj8BVweu5b9qRkVCZ5r20AegaMff9PTWbJzjqSYNZJKjmRphH5WFs7wSINHgBpN1pGafH23xn4fskBipqEykJFAXrszU','{\"codSess\":\"YlEMAEpWOj8BVweu5b9qRkVCZ5r20AegaMff9PTWbJzjqSYNZJKjmRphH5WFs7wSINHgBpN1pGafH23xn4fskBipqEykJFAXrszU\",\"idSess\":\"228\",\"dadosUsuarioLogado\":{\"id\":\"4\",\"local\":\"26\"}}'),(229,'2016-12-21 16:02:37',1,'MlxbfwBtBJ9Sjk5fdbVi9KGe2J6LVJzuqUuGbukQabdYuRw9AcVuHVsehhqZ7yPNdJc7x6C1wqsupH5b6v90SDGcfyU5LMcc1Dti','{\"codSess\":\"MlxbfwBtBJ9Sjk5fdbVi9KGe2J6LVJzuqUuGbukQabdYuRw9AcVuHVsehhqZ7yPNdJc7x6C1wqsupH5b6v90SDGcfyU5LMcc1Dti\",\"idSess\":\"229\",\"dadosUsuarioLogado\":{\"id\":\"4\",\"local\":\"26\"}}'),(230,'2016-12-21 16:02:49',1,'nO9irAi3L9Cq55pdqPfajzaQFM00Mrknymv25rRTjwV9J0aYC10AeVUrqsOAyavs9fp5JxLwzFz7FbufATj74YpHCMbQE43lgtpC','{\"codSess\":\"nO9irAi3L9Cq55pdqPfajzaQFM00Mrknymv25rRTjwV9J0aYC10AeVUrqsOAyavs9fp5JxLwzFz7FbufATj74YpHCMbQE43lgtpC\",\"idSess\":\"230\",\"dadosUsuarioLogado\":{\"id\":\"4\",\"local\":\"26\"}}'),(231,'2016-12-21 16:02:49',1,'xtOotC9XWRbXk8FHnOTiiUwFYrApTMWhTPgpx2Dyu86pNgLDOLKhMeCxgZ813snRup4VN2Fy2rgStN2kj5bfuIOz36ZYmjZWo5P4','{\"codSess\":\"xtOotC9XWRbXk8FHnOTiiUwFYrApTMWhTPgpx2Dyu86pNgLDOLKhMeCxgZ813snRup4VN2Fy2rgStN2kj5bfuIOz36ZYmjZWo5P4\",\"idSess\":\"231\",\"dadosUsuarioLogado\":{\"id\":\"4\",\"local\":\"26\"}}'),(232,'2016-12-21 16:02:50',1,'DPViqFMiqBb1VQedl9xg95qoChAePzIMIsEnTd9ujrgpUDNWJbqVLW9pvR1tCczR0eq9f4INdS8Wlb3s04QMmKGiyGOoeoXWPqDt','{\"codSess\":\"DPViqFMiqBb1VQedl9xg95qoChAePzIMIsEnTd9ujrgpUDNWJbqVLW9pvR1tCczR0eq9f4INdS8Wlb3s04QMmKGiyGOoeoXWPqDt\",\"idSess\":\"232\",\"dadosUsuarioLogado\":{\"id\":\"4\",\"local\":\"26\"}}'),(233,'2016-12-21 16:02:57',1,'vMzVNZufIhzZprY4w31ve2mbCew0mms16dlLAqKIaqBIVvLxzRFOakkCfhS3B3LoGKl8Oay4uDKiC7VteqhnaPq8FDEcg5q5CCJk','{\"codSess\":\"vMzVNZufIhzZprY4w31ve2mbCew0mms16dlLAqKIaqBIVvLxzRFOakkCfhS3B3LoGKl8Oay4uDKiC7VteqhnaPq8FDEcg5q5CCJk\",\"idSess\":\"233\",\"dadosUsuarioLogado\":{\"id\":\"4\",\"local\":\"26\"}}'),(234,'2016-12-21 16:02:58',1,'RYnRO8BOhSu0HYtTzXgWdsukO7jppUn3UsRMD4n3kyvMzJoPIDqYspK8RL4toBOC2lDcwgGdD9uaMcS405I7vTWbwJsIgvss0meB','{\"codSess\":\"RYnRO8BOhSu0HYtTzXgWdsukO7jppUn3UsRMD4n3kyvMzJoPIDqYspK8RL4toBOC2lDcwgGdD9uaMcS405I7vTWbwJsIgvss0meB\",\"idSess\":\"234\",\"dadosUsuarioLogado\":{\"id\":\"4\",\"local\":\"26\"}}'),(235,'2016-12-21 16:03:06',1,'sZ7dgTzQXYlHOZE79EYx5oh3C6CdizdSogZsOfcjsDjjpEi6Cqrop6ATAFR9TcasCbxWRxVgG4guj4EEsy7STFgWlLbGuRQw0xIv','{\"codSess\":\"sZ7dgTzQXYlHOZE79EYx5oh3C6CdizdSogZsOfcjsDjjpEi6Cqrop6ATAFR9TcasCbxWRxVgG4guj4EEsy7STFgWlLbGuRQw0xIv\",\"idSess\":\"235\",\"dadosUsuarioLogado\":{\"id\":\"4\",\"local\":\"26\"}}'),(236,'2016-12-21 16:03:06',1,'9rxQ7RPdXdwNBxVEz12SLMzdNnPonKwlDHaMv8WB74Z7YHn8aK5SfsfTNpEXUCvhMY9gEqWzreAym0cRyYWonzPbVvW4HxyIJMs3','{\"codSess\":\"9rxQ7RPdXdwNBxVEz12SLMzdNnPonKwlDHaMv8WB74Z7YHn8aK5SfsfTNpEXUCvhMY9gEqWzreAym0cRyYWonzPbVvW4HxyIJMs3\",\"idSess\":\"236\",\"dadosUsuarioLogado\":{\"id\":\"4\",\"local\":\"26\"}}'),(237,'2016-12-21 16:03:14',1,'Udh3HavgHFoygYg1rd17rw6cFP8xLTBQFbxmiiCRfsSKZ2smIQ5RyeeBPrm2BxCIYlqLQRJ7pFzhY6LwyybjZ1LMzaccF95PWZPx','{\"codSess\":\"Udh3HavgHFoygYg1rd17rw6cFP8xLTBQFbxmiiCRfsSKZ2smIQ5RyeeBPrm2BxCIYlqLQRJ7pFzhY6LwyybjZ1LMzaccF95PWZPx\",\"idSess\":\"237\",\"dadosUsuarioLogado\":{\"id\":\"4\",\"local\":\"26\"}}'),(238,'2016-12-21 16:03:34',1,'YOrt0Bx1beeqKSEpendh2928oSLv1dB6HFAb1KrSw2KBK2Bpu1EuVktpaMLXyXSpiLlKeopPW7iUCggGhXMUpshLda3WFHUHM3VN','{\"codSess\":\"YOrt0Bx1beeqKSEpendh2928oSLv1dB6HFAb1KrSw2KBK2Bpu1EuVktpaMLXyXSpiLlKeopPW7iUCggGhXMUpshLda3WFHUHM3VN\",\"idSess\":\"238\",\"dadosUsuarioLogado\":{\"id\":\"4\",\"local\":\"26\"}}'),(239,'2016-12-21 16:03:35',1,'UASuVYR8XWb5vC7XAIWjCD40lddLGkAgN3EFZR9LE6drjUaEUhShPEu1aKDjH4aaAVqQ7j1YSLuJnTvFdhYoPvZ3HlIC74mH1OLA','{\"codSess\":\"UASuVYR8XWb5vC7XAIWjCD40lddLGkAgN3EFZR9LE6drjUaEUhShPEu1aKDjH4aaAVqQ7j1YSLuJnTvFdhYoPvZ3HlIC74mH1OLA\",\"idSess\":\"239\",\"dadosUsuarioLogado\":{\"id\":\"4\",\"local\":\"26\"}}'),(240,'2016-12-21 16:03:35',1,'fsojuXgsaCYt6jEM7l07BNixTXW6UGscLXMH8lMPM8Og5Txvt3xI9QY3PNIJIZzaMvfTmZje3bvFPVAainfKlycgjPa0lY0JcLUW','{\"codSess\":\"fsojuXgsaCYt6jEM7l07BNixTXW6UGscLXMH8lMPM8Og5Txvt3xI9QY3PNIJIZzaMvfTmZje3bvFPVAainfKlycgjPa0lY0JcLUW\",\"idSess\":\"240\",\"dadosUsuarioLogado\":{\"id\":\"4\",\"local\":\"26\"}}'),(241,'2016-12-21 16:03:35',1,'uszokTQ0ifgk6B7vnh34Xd4nwEo7QBBPUXatrKHwNlWvqzx2ijxj55Zro5TCltvm19kzTTxiFIe2uANq9SUXekI0MymY470JHV8y','{\"codSess\":\"uszokTQ0ifgk6B7vnh34Xd4nwEo7QBBPUXatrKHwNlWvqzx2ijxj55Zro5TCltvm19kzTTxiFIe2uANq9SUXekI0MymY470JHV8y\",\"idSess\":\"241\",\"dadosUsuarioLogado\":{\"id\":\"4\",\"local\":\"26\"}}'),(242,'2016-12-21 16:03:36',1,'9nsoyflLCkWEjtpjSlEAs3mDnAG8yWzscZ17SK7J5tffOVsTUMZHmbZIkv8NEEEsEdcWuQ0BMTlV0XcestVilx2z6sFXKhhWkCU3','{\"codSess\":\"9nsoyflLCkWEjtpjSlEAs3mDnAG8yWzscZ17SK7J5tffOVsTUMZHmbZIkv8NEEEsEdcWuQ0BMTlV0XcestVilx2z6sFXKhhWkCU3\",\"idSess\":\"242\",\"dadosUsuarioLogado\":{\"id\":\"4\",\"local\":\"26\"}}'),(243,'2016-12-21 16:04:17',1,'Gb93aLQyY7RTJiWKjiut9dgCtmghK0347hPhReF6oY9Iz2G1KGTi42HMTFR0wOO91DQ8sQyvBAfcWg3XoG5ImYOwQ9pP7qn8lKbt','{\"codSess\":\"Gb93aLQyY7RTJiWKjiut9dgCtmghK0347hPhReF6oY9Iz2G1KGTi42HMTFR0wOO91DQ8sQyvBAfcWg3XoG5ImYOwQ9pP7qn8lKbt\",\"idSess\":\"243\",\"dadosUsuarioLogado\":{\"id\":\"4\",\"local\":\"26\"}}'),(244,'2016-12-21 16:04:53',1,'AOIblIbpJjuEwpZxXFUEt5Ni4Poy5ZUbSDc7PAfKcAjodUjREGCU2eqItugcJAB9GnxX9brcRB7GgO9l6t6VHQcTol5s2ZDznCRX','{\"codSess\":\"AOIblIbpJjuEwpZxXFUEt5Ni4Poy5ZUbSDc7PAfKcAjodUjREGCU2eqItugcJAB9GnxX9brcRB7GgO9l6t6VHQcTol5s2ZDznCRX\",\"idSess\":\"244\",\"dadosUsuarioLogado\":{\"id\":\"4\",\"local\":\"26\"}}'),(245,'2016-12-21 16:05:03',1,'Dhcwim8JXKYWny1FaxdkD4vRlxkgNL8pEoJQ9tVZxBaelE8kjcbryovjgZ6feEjGQWhAZtaR2mqPicoZcbxPcttOiob42chEJRi3','{\"codSess\":\"Dhcwim8JXKYWny1FaxdkD4vRlxkgNL8pEoJQ9tVZxBaelE8kjcbryovjgZ6feEjGQWhAZtaR2mqPicoZcbxPcttOiob42chEJRi3\",\"idSess\":\"245\",\"dadosUsuarioLogado\":{\"id\":\"4\",\"local\":\"26\"}}'),(246,'2016-12-21 16:05:30',1,'wnaXPIo1dJ8Kp2LEa9vi8CtI1Gi92WHcUAduP2UDjAht1iKiAJhA0LDerGB3YgJnBT2aMqTFanjK6bfPoT7uhoKG8XMSIeQcu6Yy','{\"codSess\":\"wnaXPIo1dJ8Kp2LEa9vi8CtI1Gi92WHcUAduP2UDjAht1iKiAJhA0LDerGB3YgJnBT2aMqTFanjK6bfPoT7uhoKG8XMSIeQcu6Yy\",\"idSess\":\"246\",\"dadosUsuarioLogado\":{\"id\":\"4\",\"local\":\"26\"}}'),(247,'2016-12-21 16:05:33',1,'STonXxweJRWcDgRwBvvc6fswRJbzzYmu3YnSXLZwqf3Me2cNLCKw9wNpaB3QeX09QxRxZVdbx5KNH854PMmMXsj7L3FLTJc7EFxb','{\"codSess\":\"STonXxweJRWcDgRwBvvc6fswRJbzzYmu3YnSXLZwqf3Me2cNLCKw9wNpaB3QeX09QxRxZVdbx5KNH854PMmMXsj7L3FLTJc7EFxb\",\"idSess\":\"247\",\"dadosUsuarioLogado\":{\"id\":\"4\",\"local\":\"26\"}}'),(248,'2016-12-21 16:05:47',1,'98dSFhXt6HEdFu3ev7JfzyN2O74ywXrjsqarDMXvZUWJqRPMpzTgaHtfMrFTQXjZGUnIbMyx8IbV4K3FTySCx4X1XQldJloDyyYE','{\"codSess\":\"98dSFhXt6HEdFu3ev7JfzyN2O74ywXrjsqarDMXvZUWJqRPMpzTgaHtfMrFTQXjZGUnIbMyx8IbV4K3FTySCx4X1XQldJloDyyYE\",\"idSess\":\"248\",\"dadosUsuarioLogado\":{\"id\":\"4\",\"local\":\"26\"}}'),(249,'2016-12-21 16:05:48',1,'CANujbkGDIV4ZWx7Q6E6W7TetcuumXnCducccQSV2vWEkIDMphbtEF0WgwGGBuibaqPyielH0mHvfYWwGZq6yQHOvYNbN7eLHDRL','{\"codSess\":\"CANujbkGDIV4ZWx7Q6E6W7TetcuumXnCducccQSV2vWEkIDMphbtEF0WgwGGBuibaqPyielH0mHvfYWwGZq6yQHOvYNbN7eLHDRL\",\"idSess\":\"249\",\"dadosUsuarioLogado\":{\"id\":\"4\",\"local\":\"26\"}}'),(250,'2016-12-21 16:05:51',1,'lACNq0ySJMXH1K9pob2d4GuMaRLY3tOaNlv97NpRi5IA4rHNPhrZJGxyxon6f8ojWmcrzBrYbdihWJVuRszI6Ztxxbhd4PKK03l0','{\"codSess\":\"lACNq0ySJMXH1K9pob2d4GuMaRLY3tOaNlv97NpRi5IA4rHNPhrZJGxyxon6f8ojWmcrzBrYbdihWJVuRszI6Ztxxbhd4PKK03l0\",\"idSess\":\"250\",\"dadosUsuarioLogado\":{\"id\":\"4\",\"local\":\"26\"}}'),(251,'2016-12-21 16:06:12',1,'MdbGbEZChBxoQKEGzD3f6OvHdddVjpx13RnQ1nLZPCtcodUxEZRJ0NgxGhyjQV1kvInlI8Y6GXoUNVZKs9Q2IJBUdef7iKRNCtZe','{\"codSess\":\"MdbGbEZChBxoQKEGzD3f6OvHdddVjpx13RnQ1nLZPCtcodUxEZRJ0NgxGhyjQV1kvInlI8Y6GXoUNVZKs9Q2IJBUdef7iKRNCtZe\",\"idSess\":\"251\",\"dadosUsuarioLogado\":{\"id\":\"4\",\"local\":\"26\"}}'),(252,'2016-12-21 16:06:18',1,'feo2KCrbWPRkchuxIOqPCVPPfHytXtdA9p0CyOXYr2ElsL5wcVmr0HTQYcTE8je2sjbdsZJLqQh1CaKQvPTC10PdxknJlTKUEJoy','{\"codSess\":\"feo2KCrbWPRkchuxIOqPCVPPfHytXtdA9p0CyOXYr2ElsL5wcVmr0HTQYcTE8je2sjbdsZJLqQh1CaKQvPTC10PdxknJlTKUEJoy\",\"idSess\":\"252\",\"dadosUsuarioLogado\":{\"id\":\"4\",\"local\":\"26\"}}'),(253,'2016-12-21 16:06:48',1,'MiqMu0NrkpZEVr6vvesRxUCOsfa3vvJxfm1M0orZK73bq0gaTrLF0zXi8bm0DVUSj77XmaurATTGSufqUu5LyWYT1Iee5RzJmsgL','{\"codSess\":\"MiqMu0NrkpZEVr6vvesRxUCOsfa3vvJxfm1M0orZK73bq0gaTrLF0zXi8bm0DVUSj77XmaurATTGSufqUu5LyWYT1Iee5RzJmsgL\",\"idSess\":\"253\",\"dadosUsuarioLogado\":{\"id\":\"4\",\"local\":\"26\"}}'),(254,'2016-12-21 16:07:09',1,'ItXan2e88paN9jfscPZRFDZ4HI5X15qhzBudLJc8Xb85pXNcGuFqIDigHaQYNr9dh7FqGHFFoIbYMHoFl4aaFDFiqU6Bg0HPqXqB','{\"codSess\":\"ItXan2e88paN9jfscPZRFDZ4HI5X15qhzBudLJc8Xb85pXNcGuFqIDigHaQYNr9dh7FqGHFFoIbYMHoFl4aaFDFiqU6Bg0HPqXqB\",\"idSess\":\"254\",\"dadosUsuarioLogado\":{\"id\":\"4\",\"local\":\"26\"}}'),(255,'2016-12-21 16:08:18',1,'vEmqdDSLhwTjjYTagFB1Kv7xhTFBVjqD3PhfANKQlKD6sfd2Q7VaQW2nAZ7i3XhdZnWt7PmsXq6NBr6u2QiZV6Qz7WSyW3sWJTm4','{\"codSess\":\"vEmqdDSLhwTjjYTagFB1Kv7xhTFBVjqD3PhfANKQlKD6sfd2Q7VaQW2nAZ7i3XhdZnWt7PmsXq6NBr6u2QiZV6Qz7WSyW3sWJTm4\",\"idSess\":\"255\",\"dadosUsuarioLogado\":{\"id\":\"4\",\"local\":\"26\"}}'),(256,'2016-12-21 16:08:32',1,'bwmOzZDUCqfGMGu4BoQcfjijoY76mFgzOtsy8dXxGrRXE8pZdljGe9QQOXDsWtr505h7jNOVmRwCTBSOpD3m4lq7SnKHc3d6vlNO','{\"codSess\":\"bwmOzZDUCqfGMGu4BoQcfjijoY76mFgzOtsy8dXxGrRXE8pZdljGe9QQOXDsWtr505h7jNOVmRwCTBSOpD3m4lq7SnKHc3d6vlNO\",\"idSess\":\"256\",\"dadosUsuarioLogado\":{\"id\":\"4\",\"local\":\"26\"}}'),(276,'2016-12-21 16:24:39',1,'olXOeNdOD2mAiCBAgsf7lykxY2Z90yHnqeVKfV0Rlb9XtoOLs4vWplbPJ0rYTxy1KPX2YxkvXJ3INdojgPofr2FIvXr303XKusb3','{\"codSess\":\"olXOeNdOD2mAiCBAgsf7lykxY2Z90yHnqeVKfV0Rlb9XtoOLs4vWplbPJ0rYTxy1KPX2YxkvXJ3INdojgPofr2FIvXr303XKusb3\",\"idSess\":\"276\",\"dadosUsuarioLogado\":{\"id\":\"4\",\"local\":\"26\"}}'),(277,'2016-12-21 16:26:30',1,'BZsnoYO31nUWEF32cKmJwwZ5XOZD3JnduEyixlNQVAxvwkUvpsQxna3qPQm67XLAiAByKyjZCYkMPiv1iOZoHsLEVFDSByDEFSdS','{\"codSess\":\"BZsnoYO31nUWEF32cKmJwwZ5XOZD3JnduEyixlNQVAxvwkUvpsQxna3qPQm67XLAiAByKyjZCYkMPiv1iOZoHsLEVFDSByDEFSdS\",\"idSess\":\"277\",\"dadosUsuarioLogado\":{\"id\":\"4\",\"local\":\"26\"}}'),(278,'2016-12-21 16:27:21',1,'aYkx7C9R4GvqXquaDmI13WwA0a7QuOGzcVLGD3llqwbJdHXUCjngZBOiqC4AqCqhunOqFV5Crf50YViS3QNDPwks90wCDvyMm3WK','{\"codSess\":\"aYkx7C9R4GvqXquaDmI13WwA0a7QuOGzcVLGD3llqwbJdHXUCjngZBOiqC4AqCqhunOqFV5Crf50YViS3QNDPwks90wCDvyMm3WK\",\"idSess\":\"278\",\"dadosUsuarioLogado\":{\"id\":\"4\",\"local\":\"26\"}}'),(279,'2016-12-21 16:28:46',1,'XwcKXBaZ91HQbG7sR7JwoLoeexGutY3qbYRjNmT7QHDvCBWsZiNtvzVVwa62t1TecoI1moj3iZ5feMbyWb91E6HDqqpjaDebBHN9','{\"codSess\":\"XwcKXBaZ91HQbG7sR7JwoLoeexGutY3qbYRjNmT7QHDvCBWsZiNtvzVVwa62t1TecoI1moj3iZ5feMbyWb91E6HDqqpjaDebBHN9\",\"idSess\":\"279\",\"dadosUsuarioLogado\":{\"id\":\"4\",\"local\":\"26\"}}'),(281,'2016-12-21 16:40:01',1,'BGULF1Pz6a0SFPs94ZxSdKgklzw9UwElCXxhs4f6bg1w1Co7z9uH8f1Vi1QyBxNARV99jlpukmtb0GtIwQ8H2Tdn18qxyEeD6378','{\"codSess\":\"BGULF1Pz6a0SFPs94ZxSdKgklzw9UwElCXxhs4f6bg1w1Co7z9uH8f1Vi1QyBxNARV99jlpukmtb0GtIwQ8H2Tdn18qxyEeD6378\",\"idSess\":\"281\",\"dadosUsuarioLogado\":{\"id\":\"4\",\"local\":\"26\"}}'),(282,'2016-12-21 16:40:22',1,'eJu8NXN5VE5NkXLLllj57JCp23H28QhfXNtvT1MlLwd0icj9hR7bYzBFi0aEDz16rCkWcwJ7qkAwDDMhnQciQysm3pJ2IeVNtsrs','{\"codSess\":\"eJu8NXN5VE5NkXLLllj57JCp23H28QhfXNtvT1MlLwd0icj9hR7bYzBFi0aEDz16rCkWcwJ7qkAwDDMhnQciQysm3pJ2IeVNtsrs\",\"idSess\":\"282\",\"dadosUsuarioLogado\":{\"id\":\"4\",\"local\":\"26\"}}'),(283,'2016-12-21 16:41:39',1,'ooUFrE3eanBoqSsHXmIx2AIOloLuS4fTn95lNSc5BCvHl3qrd7PMYF1WSOBr4L0kcJpm3VBjVsIiVvJKoGRC7Z11b6sILjoXiaBs','{\"codSess\":\"ooUFrE3eanBoqSsHXmIx2AIOloLuS4fTn95lNSc5BCvHl3qrd7PMYF1WSOBr4L0kcJpm3VBjVsIiVvJKoGRC7Z11b6sILjoXiaBs\",\"idSess\":\"283\",\"dadosUsuarioLogado\":{\"id\":\"4\",\"local\":\"26\"}}'),(285,'2016-12-21 16:42:13',1,'6yiDMZbGCN49ABieROLRm2mKejv74QRjVPr4HyDCgFIA6iAvUxr7KcRnDqoFpE7sB1ttb8xAZFeso4XwEPFiFKu8f5xeuxBdj4ub','{\"codSess\":\"6yiDMZbGCN49ABieROLRm2mKejv74QRjVPr4HyDCgFIA6iAvUxr7KcRnDqoFpE7sB1ttb8xAZFeso4XwEPFiFKu8f5xeuxBdj4ub\",\"idSess\":\"285\",\"dadosUsuarioLogado\":{\"id\":\"4\",\"local\":\"26\"}}'),(286,'2016-12-21 16:42:43',1,'r5LABPPCu15bKjTKgFIxC73cN4M2vUfxWmRCoKYMvJg1YMK4AB62qjGA6NthAim8bm6ggETnFWBmYTTBSNfuK64J6cVialsBo66M','{\"codSess\":\"r5LABPPCu15bKjTKgFIxC73cN4M2vUfxWmRCoKYMvJg1YMK4AB62qjGA6NthAim8bm6ggETnFWBmYTTBSNfuK64J6cVialsBo66M\",\"idSess\":\"286\",\"dadosUsuarioLogado\":{\"id\":\"4\",\"local\":\"26\"}}'),(287,'2016-12-21 16:44:19',1,'WLMbDFNISDwKsPGIh1JbIlmtzuiNyAShgIqsEjDePYbVugsrHfQsS2WuZWKzF7GwqTnWNNIVbGavZVzgQiNzwL9Kx3qqwcwVDoVG','{\"codSess\":\"WLMbDFNISDwKsPGIh1JbIlmtzuiNyAShgIqsEjDePYbVugsrHfQsS2WuZWKzF7GwqTnWNNIVbGavZVzgQiNzwL9Kx3qqwcwVDoVG\",\"idSess\":\"287\",\"dadosUsuarioLogado\":{\"id\":\"4\",\"local\":\"26\"}}'),(288,'2016-12-21 16:44:28',1,'czvoK4q1XzBfAOMetAqvsdwc2sjoGzLN9Ku3KZq2FK4PyArK6uAc4P312Mim5OvKMqrn9JyI6u2Uqr0zn2m2Wfo1o9zsVU0sWm1J','{\"codSess\":\"czvoK4q1XzBfAOMetAqvsdwc2sjoGzLN9Ku3KZq2FK4PyArK6uAc4P312Mim5OvKMqrn9JyI6u2Uqr0zn2m2Wfo1o9zsVU0sWm1J\",\"idSess\":\"288\",\"dadosUsuarioLogado\":{\"id\":\"4\",\"local\":\"26\"}}'),(289,'2016-12-21 16:44:47',1,'eRpOB9HL6ffI3IAZ2GYFvphTYqiBRMLMw3g1yEvY1wU44N17UTEGmLllRnjAnVqulRvdVnLY2HbXBBfOlH9VLfp5j4iYJC3hSfcM','{\"codSess\":\"eRpOB9HL6ffI3IAZ2GYFvphTYqiBRMLMw3g1yEvY1wU44N17UTEGmLllRnjAnVqulRvdVnLY2HbXBBfOlH9VLfp5j4iYJC3hSfcM\",\"idSess\":\"289\",\"dadosUsuarioLogado\":{\"id\":\"4\",\"local\":\"26\"}}'),(290,'2016-12-21 16:44:59',1,'wdo5bfFHsi5tjSpGNF8lv6EbK44H1H6qgNx0xupPSez7ypRMCVzGOtel3d1ZFsmDc2CYrqpMJMDvVDapZVNDgiFs0M5J0N7f1KUF','{\"codSess\":\"wdo5bfFHsi5tjSpGNF8lv6EbK44H1H6qgNx0xupPSez7ypRMCVzGOtel3d1ZFsmDc2CYrqpMJMDvVDapZVNDgiFs0M5J0N7f1KUF\",\"idSess\":\"290\",\"dadosUsuarioLogado\":{\"id\":\"4\",\"local\":\"26\"}}'),(291,'2016-12-21 16:46:12',1,'xzJiIScGTCHkD85onl7REprDLWWxiox2WgaqMwsljTbejAT2egYAFRM3nlF3ZTOI2qvlDYQAceTB9QLbOyOXDR85KtqKDL0sQib6','{\"codSess\":\"xzJiIScGTCHkD85onl7REprDLWWxiox2WgaqMwsljTbejAT2egYAFRM3nlF3ZTOI2qvlDYQAceTB9QLbOyOXDR85KtqKDL0sQib6\",\"idSess\":\"291\",\"dadosUsuarioLogado\":{\"id\":\"4\",\"local\":\"26\"}}'),(292,'2016-12-21 16:46:35',1,'sbyjHchdpec6pSjVkCfckn06EOja1inGgHtVfS3YignaEXbXfjCa5QVF2aVvGn4to1eAWYRV2w73X80L76MAHQAYRLjlG8yrIOC3','{\"codSess\":\"sbyjHchdpec6pSjVkCfckn06EOja1inGgHtVfS3YignaEXbXfjCa5QVF2aVvGn4to1eAWYRV2w73X80L76MAHQAYRLjlG8yrIOC3\",\"idSess\":\"292\",\"dadosUsuarioLogado\":{\"id\":\"4\",\"local\":\"26\"}}'),(293,'2016-12-21 16:46:53',1,'1BpaGICA5ZKAxdY81zKIK430dIwsL89VzQ25B7R2C8JtDkv9WU38leSxg4OcXHOHhZwcqlpA4DQy234Dd5rbuYNvAT3XKX2hHMOv','{\"codSess\":\"1BpaGICA5ZKAxdY81zKIK430dIwsL89VzQ25B7R2C8JtDkv9WU38leSxg4OcXHOHhZwcqlpA4DQy234Dd5rbuYNvAT3XKX2hHMOv\",\"idSess\":\"293\",\"dadosUsuarioLogado\":{\"id\":\"4\",\"local\":\"26\"}}'),(295,'2016-12-21 16:55:47',1,'teFuPwLcGH0G6ZjJu7NsTbssO12H0N7vvIGhtH0TQhdsALYyJ5BP6HbLvIdp2p5XrBQupEuxiydEGBfSTeV7enYqwXwZ28ZIPQkK','{\"codSess\":\"teFuPwLcGH0G6ZjJu7NsTbssO12H0N7vvIGhtH0TQhdsALYyJ5BP6HbLvIdp2p5XrBQupEuxiydEGBfSTeV7enYqwXwZ28ZIPQkK\",\"idSess\":\"295\",\"dadosUsuarioLogado\":{\"id\":\"4\",\"local\":\"26\"}}'),(296,'2016-12-21 16:56:09',1,'CgJWoWSWPayuXM0AGBIqJ1Nz7zx3LBACBqr34PkMzdrUcKi9uaFAPnu9c0cN6mEZHyGu7sl05rxk5XE9barok9ngAtFTZGlHuYUo','{\"codSess\":\"CgJWoWSWPayuXM0AGBIqJ1Nz7zx3LBACBqr34PkMzdrUcKi9uaFAPnu9c0cN6mEZHyGu7sl05rxk5XE9barok9ngAtFTZGlHuYUo\",\"idSess\":\"296\",\"dadosUsuarioLogado\":{\"id\":\"4\",\"local\":\"26\"}}'),(297,'2016-12-21 16:56:12',1,'AvJH7zlSuKLakRVr57idYR60v4ifYEmcfna8hXvlXJqTUoBaCzvr9WXn63vB97TFCEojMuG8nuSbcaGKalAPH8TyMJh4Hph1tSJ5','{\"codSess\":\"AvJH7zlSuKLakRVr57idYR60v4ifYEmcfna8hXvlXJqTUoBaCzvr9WXn63vB97TFCEojMuG8nuSbcaGKalAPH8TyMJh4Hph1tSJ5\",\"idSess\":\"297\",\"dadosUsuarioLogado\":{\"id\":\"4\",\"local\":\"26\"}}'),(298,'2016-12-21 16:56:12',1,'V6rZFRFXf0o3t5VlOq94eIScA2hEqS5DyHy9WjTFouCHa8dKlZ8sQS8mamj5a8wb6iXeHfthsMLIXkkEIEgXWRKzrFA2Q6giWR13','{\"codSess\":\"V6rZFRFXf0o3t5VlOq94eIScA2hEqS5DyHy9WjTFouCHa8dKlZ8sQS8mamj5a8wb6iXeHfthsMLIXkkEIEgXWRKzrFA2Q6giWR13\",\"idSess\":\"298\",\"dadosUsuarioLogado\":{\"id\":\"4\",\"local\":\"26\"}}'),(299,'2016-12-21 16:56:12',1,'iCCr2l4OhOTL4hd5MeZAEhkE0QUwvXKTGcDk6AdO0f8x38P4uqaxreNwMiMRCKx32wNuAvmRZDsSCcmBHfTftm0jOXjQENcUgKrg','{\"codSess\":\"iCCr2l4OhOTL4hd5MeZAEhkE0QUwvXKTGcDk6AdO0f8x38P4uqaxreNwMiMRCKx32wNuAvmRZDsSCcmBHfTftm0jOXjQENcUgKrg\",\"idSess\":\"299\",\"dadosUsuarioLogado\":{\"id\":\"4\",\"local\":\"26\"}}'),(300,'2016-12-21 16:56:12',1,'B85VDZOYfVWZaJ7chQ7sK0Dxvpo5ms8Cm3W51hVEkvyTa2Ip9bZvcMC9dRqCpqVzLDYUzF3LFGE386SEUY1BPSWJcMCLe8EOeQOx','{\"codSess\":\"B85VDZOYfVWZaJ7chQ7sK0Dxvpo5ms8Cm3W51hVEkvyTa2Ip9bZvcMC9dRqCpqVzLDYUzF3LFGE386SEUY1BPSWJcMCLe8EOeQOx\",\"idSess\":\"300\",\"dadosUsuarioLogado\":{\"id\":\"4\",\"local\":\"26\"}}'),(301,'2016-12-21 16:56:12',1,'9xRF4DFhdb6Y8g9bFRR4oXa0na0cGDjhMebJBv5aVJNuYDx46HdRCadsAYvksjNycYcX041E1ZztspjmscsGf0np3dx50xHuwXFW','{\"codSess\":\"9xRF4DFhdb6Y8g9bFRR4oXa0na0cGDjhMebJBv5aVJNuYDx46HdRCadsAYvksjNycYcX041E1ZztspjmscsGf0np3dx50xHuwXFW\",\"idSess\":\"301\",\"dadosUsuarioLogado\":{\"id\":\"4\",\"local\":\"26\"}}'),(302,'2016-12-21 16:56:13',1,'V1ioCw8y1xwLsXwBNZXmdRkyPTaR2ebfvxD7PffE1zYi48jzMZSUoIzODtJ20niEOai8q47nu538JH4pGODY98bTnsd80FyGxmS4','{\"codSess\":\"V1ioCw8y1xwLsXwBNZXmdRkyPTaR2ebfvxD7PffE1zYi48jzMZSUoIzODtJ20niEOai8q47nu538JH4pGODY98bTnsd80FyGxmS4\",\"idSess\":\"302\",\"dadosUsuarioLogado\":{\"id\":\"4\",\"local\":\"26\"}}'),(303,'2016-12-21 16:56:13',1,'BXXSopIRbzd5dYPIpYwqtEjdBZRzI8K2DuIM4QPOwnAQHZHEhxY5w0bTazJdwuzaLPjmoKqZdTFKdyz2m33PH8Z5ouHu018KOTaS','{\"codSess\":\"BXXSopIRbzd5dYPIpYwqtEjdBZRzI8K2DuIM4QPOwnAQHZHEhxY5w0bTazJdwuzaLPjmoKqZdTFKdyz2m33PH8Z5ouHu018KOTaS\",\"idSess\":\"303\",\"dadosUsuarioLogado\":{\"id\":\"4\",\"local\":\"26\"}}'),(304,'2016-12-21 16:56:13',1,'kq7uGovjCG3xlugPJCcGkun7NwRpmiHwHOcl3DIHlGZbOODH1RQZuDziGbDqajK17NpHRzfTfsswsDnCWSSRgFLDVILSJHUJ3Ejd','{\"codSess\":\"kq7uGovjCG3xlugPJCcGkun7NwRpmiHwHOcl3DIHlGZbOODH1RQZuDziGbDqajK17NpHRzfTfsswsDnCWSSRgFLDVILSJHUJ3Ejd\",\"idSess\":\"304\",\"dadosUsuarioLogado\":{\"id\":\"4\",\"local\":\"26\"}}'),(305,'2016-12-21 16:56:13',1,'GTqM9wd2Y9dReZc1JNmC6I1YKYzaGZkL14OLOR2F69EyTuWSrbey4h1rHo8p9288Z1H9b5Y4lHLT9orjukxYfgJW5m4pgPxFmis0','{\"codSess\":\"GTqM9wd2Y9dReZc1JNmC6I1YKYzaGZkL14OLOR2F69EyTuWSrbey4h1rHo8p9288Z1H9b5Y4lHLT9orjukxYfgJW5m4pgPxFmis0\",\"idSess\":\"305\",\"dadosUsuarioLogado\":{\"id\":\"4\",\"local\":\"26\"}}'),(306,'2016-12-21 16:56:13',1,'XJcmROMzOFWUHvVMy9ZJsAWfFF5gwhL9nbDToZn0W26lgnArGBPtpGNKYlgvVgOrk01DLBBxDigNYSlvr4W6EqUj82cOestoW7es','{\"codSess\":\"XJcmROMzOFWUHvVMy9ZJsAWfFF5gwhL9nbDToZn0W26lgnArGBPtpGNKYlgvVgOrk01DLBBxDigNYSlvr4W6EqUj82cOestoW7es\",\"idSess\":\"306\",\"dadosUsuarioLogado\":{\"id\":\"4\",\"local\":\"26\"}}'),(307,'2016-12-21 16:56:34',1,'xtRb5TdaAPvCTzUQ6rzVmPsEx60J4224JEDRXErrEHOWH4HrBdCNKWZIIvhL5bypphlDHFfnhqTqQHSwLiltgfw5ktRJvpJmLePu','{\"codSess\":\"xtRb5TdaAPvCTzUQ6rzVmPsEx60J4224JEDRXErrEHOWH4HrBdCNKWZIIvhL5bypphlDHFfnhqTqQHSwLiltgfw5ktRJvpJmLePu\",\"idSess\":\"307\",\"dadosUsuarioLogado\":{\"id\":\"4\",\"local\":\"26\"}}'),(308,'2016-12-21 16:57:11',1,'FBD4gysryTJY59Cyzy0vvLDAWSy7AZmreXLn3auyomXF348V8pH5brhBuvHgxyG5Is1yqFLiJW1ylEtgQnPPwy4m5wqHOyYmB2pG','{\"codSess\":\"FBD4gysryTJY59Cyzy0vvLDAWSy7AZmreXLn3auyomXF348V8pH5brhBuvHgxyG5Is1yqFLiJW1ylEtgQnPPwy4m5wqHOyYmB2pG\",\"idSess\":\"308\",\"dadosUsuarioLogado\":{\"id\":\"4\",\"local\":\"26\"}}'),(331,'2016-12-21 17:25:44',1,'vn62zoK4VXX9mg4VgLoROoBT04Plgc7eGJTgqFGyHyhiCDSsQsY3ChAdOIKa2qLKZDIWPzFhrdlz2MAOCtNOmKZbfIQn3wjXRMKC','{\"codSess\":\"vn62zoK4VXX9mg4VgLoROoBT04Plgc7eGJTgqFGyHyhiCDSsQsY3ChAdOIKa2qLKZDIWPzFhrdlz2MAOCtNOmKZbfIQn3wjXRMKC\",\"idSess\":\"331\",\"dadosUsuarioLogado\":{\"id\":\"4\",\"local\":\"26\"}}'),(333,'2016-12-21 17:30:56',1,'JqvJAUHhigpEH49wDzcKROS5IPUzLml7S96kTr2IaLDezV2yMHNBx4hXzpcTtKA42qCh79HCIkrjfnK0sUc7Q4QeCqNmGWNnYxzK','{\"codSess\":\"JqvJAUHhigpEH49wDzcKROS5IPUzLml7S96kTr2IaLDezV2yMHNBx4hXzpcTtKA42qCh79HCIkrjfnK0sUc7Q4QeCqNmGWNnYxzK\",\"idSess\":\"333\",\"dadosUsuarioLogado\":{\"id\":\"4\",\"local\":\"26\"}}'),(334,'2016-12-21 17:35:50',1,'gW8GHwQ9hUyHhbTUSvXjnboyuwUYfR0mqNRymvzhXAM8l40fgKhFfBpPVfn59qIEYJEN4pkyHHVf5o4cLecsNuh95fgZj3pTwjoP','{\"codSess\":\"gW8GHwQ9hUyHhbTUSvXjnboyuwUYfR0mqNRymvzhXAM8l40fgKhFfBpPVfn59qIEYJEN4pkyHHVf5o4cLecsNuh95fgZj3pTwjoP\",\"idSess\":\"334\",\"dadosUsuarioLogado\":{\"id\":\"4\",\"local\":\"26\"}}'),(346,'2016-12-21 17:44:46',1,'gHIKl2BXdrX9QfP2Izuv3qIvnFGMt1P9RQsftjmjPooQ0Uk4LMtHURupklbrJ6265RD25sBmYU4pf0SktPcPdzVDvgFDofhg0wMz','{\"codSess\":\"gHIKl2BXdrX9QfP2Izuv3qIvnFGMt1P9RQsftjmjPooQ0Uk4LMtHURupklbrJ6265RD25sBmYU4pf0SktPcPdzVDvgFDofhg0wMz\",\"idSess\":\"346\",\"dadosUsuarioLogado\":{\"id\":\"4\",\"local\":\"26\"}}'),(350,'2016-12-21 18:44:28',1,'gfF21DklvyEh6Pu8CFtw7W7cogHeoi9Vq87Yw3eiFn8OFTU9etnb3FGGLzut87MFgl5GwEvPLeC8YEOpdI13Ijeft28D0nQigq0e','{\"codSess\":\"gfF21DklvyEh6Pu8CFtw7W7cogHeoi9Vq87Yw3eiFn8OFTU9etnb3FGGLzut87MFgl5GwEvPLeC8YEOpdI13Ijeft28D0nQigq0e\",\"idSess\":\"350\",\"dadosUsuarioLogado\":{\"id\":\"1\"}}'),(351,'2016-12-21 18:44:34',1,'6SZYkPEzVZuDaimaujKZYQR5U0cj3HgEm1W19yx3WmtVmLJXkLiVnqaSqPowGQvw4nQW5EFSJmmQQ1UORFNlmfoRyrMa5NGNHw56','{\"codSess\":\"6SZYkPEzVZuDaimaujKZYQR5U0cj3HgEm1W19yx3WmtVmLJXkLiVnqaSqPowGQvw4nQW5EFSJmmQQ1UORFNlmfoRyrMa5NGNHw56\",\"idSess\":\"351\",\"dadosUsuarioLogado\":{\"id\":\"1\",\"local\":\"4\"}}'),(352,'2016-12-21 18:44:46',1,'ZCOZybvYZcUuGjuDwijRKvZnOu5D8fYovUqo69y25SLhx9zj5JL6iUywXOh7huljgYcJ1evuzzInvrJqxbiaKVIiafsA9CuwlUSW','{\"codSess\":\"ZCOZybvYZcUuGjuDwijRKvZnOu5D8fYovUqo69y25SLhx9zj5JL6iUywXOh7huljgYcJ1evuzzInvrJqxbiaKVIiafsA9CuwlUSW\",\"idSess\":\"352\",\"dadosUsuarioLogado\":{\"id\":\"1\",\"local\":\"4\"}}'),(353,'2016-12-21 18:48:45',1,'FdzgRH0WDSAQwTQ202qg8lEsc9JpJIVNbR0sBDhiCzi8vFEaCykyVAjDCV6tarmNWLceVGeyGq32oFQJqze7EdOeMXyTCcCqwPxm','{\"codSess\":\"FdzgRH0WDSAQwTQ202qg8lEsc9JpJIVNbR0sBDhiCzi8vFEaCykyVAjDCV6tarmNWLceVGeyGq32oFQJqze7EdOeMXyTCcCqwPxm\",\"idSess\":\"353\",\"dadosUsuarioLogado\":{\"id\":\"1\",\"local\":\"4\"}}'),(354,'2016-12-21 18:48:57',1,'NarmZ0mP6oQc6t9UgQLdEeH8OHQYzkUK0GRXrIxAajmhFoGnd2RNKI6fsMj1GZDc0UySqv64p9aKL2Dlmkci2ByKmXaFZq8pDV7v','{\"codSess\":\"NarmZ0mP6oQc6t9UgQLdEeH8OHQYzkUK0GRXrIxAajmhFoGnd2RNKI6fsMj1GZDc0UySqv64p9aKL2Dlmkci2ByKmXaFZq8pDV7v\",\"idSess\":\"354\",\"dadosUsuarioLogado\":{\"id\":\"1\",\"local\":\"4\"}}'),(355,'2016-12-21 18:49:24',1,'CS63u2LQquH3l9wpUPHJHurc3PUVsYpwC0NsUHBZ1Wu3ar0o65biz8l0Ez0pT3tk1mio1yHx9W0qaQAgkCSTa8bh4e8YilgidTN6','{\"codSess\":\"CS63u2LQquH3l9wpUPHJHurc3PUVsYpwC0NsUHBZ1Wu3ar0o65biz8l0Ez0pT3tk1mio1yHx9W0qaQAgkCSTa8bh4e8YilgidTN6\",\"idSess\":\"355\",\"dadosUsuarioLogado\":{\"id\":\"1\",\"local\":\"4\"}}'),(379,'2016-12-21 19:18:49',1,'NvBbevgFfBJjpcNxfSS2NxV013jxCv9ICamU2p4ACt6FbMsRcZWjz1DTDnZjBQsDq33YsbJ3XXgTWHSBmqC4wSTqSpgfxH6lQJOT','{\"codSess\":\"NvBbevgFfBJjpcNxfSS2NxV013jxCv9ICamU2p4ACt6FbMsRcZWjz1DTDnZjBQsDq33YsbJ3XXgTWHSBmqC4wSTqSpgfxH6lQJOT\",\"idSess\":\"379\",\"dadosUsuarioLogado\":{\"id\":\"1\",\"local\":\"4\"}}'),(380,'2016-12-21 19:19:15',1,'FDveYKVwE2eNj74JItAVmBkBl2Qu7hNjJZZCpV6O0QyDSP1pXndXqEk6dipvuiS4rHOaDv0BKhq5FU9UYBqeeIhrOxGPV0vVMKHx','{\"codSess\":\"FDveYKVwE2eNj74JItAVmBkBl2Qu7hNjJZZCpV6O0QyDSP1pXndXqEk6dipvuiS4rHOaDv0BKhq5FU9UYBqeeIhrOxGPV0vVMKHx\",\"idSess\":\"380\",\"dadosUsuarioLogado\":{\"id\":\"1\",\"local\":\"4\"}}'),(381,'2016-12-21 19:19:37',1,'cahwEjrJ1GDT9o2bAk1bJyF6ZQelui8VXfloVV0i2bdxaHlVxRMmAQBge51RiNSsBiU8uslK3x44NuekEdT92IG9L1xo3c0giRJI','{\"codSess\":\"cahwEjrJ1GDT9o2bAk1bJyF6ZQelui8VXfloVV0i2bdxaHlVxRMmAQBge51RiNSsBiU8uslK3x44NuekEdT92IG9L1xo3c0giRJI\",\"idSess\":\"381\",\"dadosUsuarioLogado\":{\"id\":\"1\",\"local\":\"4\"}}'),(382,'2016-12-21 19:19:52',1,'fDyHDvdixqRmE9hC14ORYFU4uPyT0uMAfwgL5NO00TZdb954c7Xn3aqGcxfiniG4vT8IkwWOnhTXVbN4qTvJpkDQ2fLo4H3FSZ8J','{\"codSess\":\"fDyHDvdixqRmE9hC14ORYFU4uPyT0uMAfwgL5NO00TZdb954c7Xn3aqGcxfiniG4vT8IkwWOnhTXVbN4qTvJpkDQ2fLo4H3FSZ8J\",\"idSess\":\"382\",\"dadosUsuarioLogado\":{\"id\":\"1\",\"local\":\"4\"}}'),(383,'2016-12-21 19:20:09',1,'uEpbUUb3ZXFQLjL1yznp4RsfZB27hsAKJ98MURTnkXrSRIXOs4XcvycXUpNKNvvLSF8aVnGSEiNrE2rrIIRoBTcnYY2IND20dX5u','{\"codSess\":\"uEpbUUb3ZXFQLjL1yznp4RsfZB27hsAKJ98MURTnkXrSRIXOs4XcvycXUpNKNvvLSF8aVnGSEiNrE2rrIIRoBTcnYY2IND20dX5u\",\"idSess\":\"383\",\"dadosUsuarioLogado\":{\"id\":\"1\",\"local\":\"4\"}}'),(384,'2016-12-21 19:33:11',1,'LdUyKKtcvWkvJEJI8kxhePzoXssVvgYGyMRjtnVIkHrU4Kpe5IR23dagdui6PcQ8smAXXhju3y7nyvW5rcV3jqPJxgF6ImzM2i82','{\"codSess\":\"LdUyKKtcvWkvJEJI8kxhePzoXssVvgYGyMRjtnVIkHrU4Kpe5IR23dagdui6PcQ8smAXXhju3y7nyvW5rcV3jqPJxgF6ImzM2i82\",\"idSess\":\"384\",\"dadosUsuarioLogado\":{\"id\":\"1\",\"local\":\"4\"}}'),(393,'2016-12-21 19:42:52',1,'zXrHVlfqUdgKQlLHnvIvz6ozKJu6NKzaNzpfjW7OyEfSym1xiQllYoSWun8TCCV5ekjh7xgAAi34fOCLtaRxgdQH2yMrAUCnncaS','{\"codSess\":\"zXrHVlfqUdgKQlLHnvIvz6ozKJu6NKzaNzpfjW7OyEfSym1xiQllYoSWun8TCCV5ekjh7xgAAi34fOCLtaRxgdQH2yMrAUCnncaS\",\"idSess\":\"393\",\"dadosUsuarioLogado\":{\"id\":\"1\",\"local\":\"4\"}}'),(397,'2016-12-22 13:12:25',1,'jERTz2RjY2WBXQnFPbgD3ENRCI2XyelncCpRKCDsAGly4EE4NvBLsZIwQO7KWskohgRohDkqPJDTABNSXNoQYxsaTvFXgyZedVRR','{\"codSess\":\"jERTz2RjY2WBXQnFPbgD3ENRCI2XyelncCpRKCDsAGly4EE4NvBLsZIwQO7KWskohgRohDkqPJDTABNSXNoQYxsaTvFXgyZedVRR\",\"idSess\":\"397\",\"dadosUsuarioLogado\":{\"id\":\"9\"}}'),(399,'2016-12-22 13:12:35',1,'IMFQT4u2ahwlEEjij5UPBBPWFYqQbkI1KGJEqg65B1DxoLKgZivk66DrIixhOmRE6edu5m88B1gKEiaY3tgncDrqHMZbfe3yhXaY','{\"codSess\":\"IMFQT4u2ahwlEEjij5UPBBPWFYqQbkI1KGJEqg65B1DxoLKgZivk66DrIixhOmRE6edu5m88B1gKEiaY3tgncDrqHMZbfe3yhXaY\",\"idSess\":\"399\",\"dadosUsuarioLogado\":{\"id\":\"9\",\"local\":\"43\"}}'),(400,'2016-12-22 13:27:27',1,'nOnfSNGlxANxMlIEBQxUHJggAtPcvduNN2H1yiXmPJo8bFjPLIrOHekXdlnxvphK86z8pPnvnj9GtVRgdcb95DRjFGWIhzVEj486','{\"codSess\":\"nOnfSNGlxANxMlIEBQxUHJggAtPcvduNN2H1yiXmPJo8bFjPLIrOHekXdlnxvphK86z8pPnvnj9GtVRgdcb95DRjFGWIhzVEj486\",\"idSess\":\"400\",\"dadosUsuarioLogado\":{\"id\":\"9\",\"local\":\"43\"}}'),(401,'2016-12-22 13:28:07',1,'ZhYAwLCcqzCzJ67klYWRvvVIe6nGuPvRN27Bze3vVSJffE7nNwo4NCEbWor6BYKDDBLU7LNeiCEb2yRgNfRm8Mb6HIVTBzX0kecR','{\"codSess\":\"ZhYAwLCcqzCzJ67klYWRvvVIe6nGuPvRN27Bze3vVSJffE7nNwo4NCEbWor6BYKDDBLU7LNeiCEb2yRgNfRm8Mb6HIVTBzX0kecR\",\"idSess\":\"401\",\"dadosUsuarioLogado\":{\"id\":\"9\",\"local\":\"43\"}}'),(402,'2016-12-22 13:29:20',1,'HHH3DgEmODYauVNijjwPcOi0IoXAzo3e7Nv6cb6kmwc77ZOYS6qWj6RafKjWDKltuKOAJJtej2Vw3MUQ6zO3dQvgFfgzIJXDwZMm','{\"codSess\":\"HHH3DgEmODYauVNijjwPcOi0IoXAzo3e7Nv6cb6kmwc77ZOYS6qWj6RafKjWDKltuKOAJJtej2Vw3MUQ6zO3dQvgFfgzIJXDwZMm\",\"idSess\":\"402\",\"dadosUsuarioLogado\":{\"id\":\"9\",\"local\":\"43\"}}'),(403,'2016-12-22 13:29:48',1,'uHSRNuPbguiKTRKH09VuxMV8O28fYzgEqjHAbL2LCmdhJYa3AbDbNILb8iApMAGOZC5hMAaJkEpiU3NzirEadVeHje15SK9YffUB','{\"codSess\":\"uHSRNuPbguiKTRKH09VuxMV8O28fYzgEqjHAbL2LCmdhJYa3AbDbNILb8iApMAGOZC5hMAaJkEpiU3NzirEadVeHje15SK9YffUB\",\"idSess\":\"403\",\"dadosUsuarioLogado\":{\"id\":\"9\",\"local\":\"43\"}}'),(404,'2016-12-22 13:29:59',1,'VBdx6DQyF7wfjmg8Xnt0B5T8UW19Q4Uu21zEajzWGWY9MZhTzzVX21uCDsQEqrVMrVd2ypbIchL2SfshCVcTrpm9h1oY3MMH8VLz','{\"codSess\":\"VBdx6DQyF7wfjmg8Xnt0B5T8UW19Q4Uu21zEajzWGWY9MZhTzzVX21uCDsQEqrVMrVd2ypbIchL2SfshCVcTrpm9h1oY3MMH8VLz\",\"idSess\":\"404\",\"dadosUsuarioLogado\":{\"id\":\"9\",\"local\":\"43\"}}'),(406,'2016-12-22 13:33:10',1,'AhS0bu6NWa7f6APNTHCVbtdpvUoojmLoXapE2L3wXveEx2Neo1NIxKmBbYDKRbqNZ1sIaEuCH4iX28SHOKWn65rpaDysjf3lFkJL','{\"codSess\":\"AhS0bu6NWa7f6APNTHCVbtdpvUoojmLoXapE2L3wXveEx2Neo1NIxKmBbYDKRbqNZ1sIaEuCH4iX28SHOKWn65rpaDysjf3lFkJL\",\"idSess\":\"406\",\"dadosUsuarioLogado\":{\"id\":\"9\",\"local\":\"43\"}}'),(407,'2016-12-22 13:34:39',1,'Hqa8ZpJ7CnsZhL5sfGyiRKHWgBUf1gReccBOKXqgs7A7aKo0tIaipT6wfJnj37Qtw8hAZUEvGnl3WKSTteH9uDw6KP8DJPnfYNhi','{\"codSess\":\"Hqa8ZpJ7CnsZhL5sfGyiRKHWgBUf1gReccBOKXqgs7A7aKo0tIaipT6wfJnj37Qtw8hAZUEvGnl3WKSTteH9uDw6KP8DJPnfYNhi\",\"idSess\":\"407\",\"dadosUsuarioLogado\":{\"id\":\"9\",\"local\":\"43\"}}'),(408,'2016-12-22 13:35:05',1,'FhQSSRsiUPxIQT6OrDTOaNpU3HBZ1tXmXNZ33MvgcrgsAnMwA7zeFGaiGMe139y5fXeWhhP6TvHWWTvePkO1OcRr14N7pwsvrIov','{\"codSess\":\"FhQSSRsiUPxIQT6OrDTOaNpU3HBZ1tXmXNZ33MvgcrgsAnMwA7zeFGaiGMe139y5fXeWhhP6TvHWWTvePkO1OcRr14N7pwsvrIov\",\"idSess\":\"408\",\"dadosUsuarioLogado\":{\"id\":\"9\",\"local\":\"43\"}}'),(409,'2016-12-22 13:36:06',1,'ujZWwG6Jf4mSKggGZ3WEimIfPBmtnwVz5G8M5VVB9RORYNVifta2Wmg9xALTv0uA3x4IWcuXdEmFyV6i2WRW1Z5J70z64zMdj8Jj','{\"codSess\":\"ujZWwG6Jf4mSKggGZ3WEimIfPBmtnwVz5G8M5VVB9RORYNVifta2Wmg9xALTv0uA3x4IWcuXdEmFyV6i2WRW1Z5J70z64zMdj8Jj\",\"idSess\":\"409\",\"dadosUsuarioLogado\":{\"id\":\"9\",\"local\":\"43\"}}'),(411,'2016-12-22 13:37:38',1,'yLnvhTMWWHrIT5UerYB83V0oqklVeF8aEMQWDZzQOXb6aQTgF5tMNQlJbyrbZv4iEvDWY2oU5LlBvjOPLzB0HgUZwnHGm07MYdSn','{\"codSess\":\"yLnvhTMWWHrIT5UerYB83V0oqklVeF8aEMQWDZzQOXb6aQTgF5tMNQlJbyrbZv4iEvDWY2oU5LlBvjOPLzB0HgUZwnHGm07MYdSn\",\"idSess\":\"411\",\"dadosUsuarioLogado\":{\"id\":\"9\",\"local\":\"43\"}}'),(413,'2016-12-22 13:40:42',1,'dfbskDL3EDioqbdOkPsmz2xh9KuGBOhFsG0kpzOnZZITqnJC7IMjguSGTwvIjy1e2MTaFbJS4wIVJG2MU2mUD3PbTtgbBBEiwqtA','{\"codSess\":\"dfbskDL3EDioqbdOkPsmz2xh9KuGBOhFsG0kpzOnZZITqnJC7IMjguSGTwvIjy1e2MTaFbJS4wIVJG2MU2mUD3PbTtgbBBEiwqtA\",\"idSess\":\"413\",\"dadosUsuarioLogado\":{\"id\":\"9\",\"local\":\"43\"}}'),(414,'2016-12-22 13:41:52',1,'D0YNXTZWAIgsJTipoEiyoCbbWVVt4TyLToAKuUsHdPXKIFfjAjgKT4JxpOfopgldgP1SpKqPktRKXuRmJL8WSWxbb9d2taZsqYuM','{\"codSess\":\"D0YNXTZWAIgsJTipoEiyoCbbWVVt4TyLToAKuUsHdPXKIFfjAjgKT4JxpOfopgldgP1SpKqPktRKXuRmJL8WSWxbb9d2taZsqYuM\",\"idSess\":\"414\",\"dadosUsuarioLogado\":{\"id\":\"9\",\"local\":\"43\"}}'),(415,'2016-12-22 13:42:03',1,'VxgHF6wuuh7b2QF3Uu6vR4sRauLHPFRUx6qZ1JangF1jiwTGVgHzZjwO40OLkCpHgG3vFGpNv1bwBU91WQAGL9rfc3KP38McRdsv','{\"codSess\":\"VxgHF6wuuh7b2QF3Uu6vR4sRauLHPFRUx6qZ1JangF1jiwTGVgHzZjwO40OLkCpHgG3vFGpNv1bwBU91WQAGL9rfc3KP38McRdsv\",\"idSess\":\"415\",\"dadosUsuarioLogado\":{\"id\":\"9\",\"local\":\"43\"}}'),(416,'2016-12-22 13:42:15',1,'ZZbvxAx0264AxJFpvpYb45g38PlOBu2whROu4YY2cEdGXQMFFgywQWIwEp0uVzWHEYY4czcpapTXcY05U1mcPJ5cXHVm9tjugpM4','{\"codSess\":\"ZZbvxAx0264AxJFpvpYb45g38PlOBu2whROu4YY2cEdGXQMFFgywQWIwEp0uVzWHEYY4czcpapTXcY05U1mcPJ5cXHVm9tjugpM4\",\"idSess\":\"416\",\"dadosUsuarioLogado\":{\"id\":\"9\",\"local\":\"43\"}}'),(417,'2016-12-22 13:43:36',1,'86VAW78t9EePkMBCigI69KEmvMKJ3SidUQ50ed5BnUx8GZdCKnyRKIRBTEhvjWIV0EgjZAGnNwId23RPT8eapmrLC1NK0cAViGir','{\"codSess\":\"86VAW78t9EePkMBCigI69KEmvMKJ3SidUQ50ed5BnUx8GZdCKnyRKIRBTEhvjWIV0EgjZAGnNwId23RPT8eapmrLC1NK0cAViGir\",\"idSess\":\"417\",\"dadosUsuarioLogado\":{\"id\":\"9\",\"local\":\"43\"}}'),(418,'2016-12-22 13:44:14',1,'S9szHvxi0X1rROvw79QmIm271X5laPtHHgv0nxCSRaPQsm5K6ENogsbxdZMMwfSFqusNORKbB97YYyNOLyKnWGgn0CFzSKxzfg67','{\"codSess\":\"S9szHvxi0X1rROvw79QmIm271X5laPtHHgv0nxCSRaPQsm5K6ENogsbxdZMMwfSFqusNORKbB97YYyNOLyKnWGgn0CFzSKxzfg67\",\"idSess\":\"418\",\"dadosUsuarioLogado\":{\"id\":\"9\",\"local\":\"43\"}}'),(419,'2016-12-22 13:44:50',1,'PMvqPg7uppStzhBdlwHMmqvisDKbgM4H1DuOcdhEsdhPiSNNkkHhUKtAacXx4mhU4UBdIUJyidOPMoeh10Ske5r5NTjPqzpMHJJ2','{\"codSess\":\"PMvqPg7uppStzhBdlwHMmqvisDKbgM4H1DuOcdhEsdhPiSNNkkHhUKtAacXx4mhU4UBdIUJyidOPMoeh10Ske5r5NTjPqzpMHJJ2\",\"idSess\":\"419\",\"dadosUsuarioLogado\":{\"id\":\"9\",\"local\":\"43\"}}'),(420,'2016-12-22 13:45:28',1,'e3PxuR27EEtyCkcJR72a83eQwksgmk6rg5AdVoginojEd7jcISVvCYp9nLqpGFE9YSUykB1ebtLdKkdY9kyD1ZJA5krYJsEFIopW','{\"codSess\":\"e3PxuR27EEtyCkcJR72a83eQwksgmk6rg5AdVoginojEd7jcISVvCYp9nLqpGFE9YSUykB1ebtLdKkdY9kyD1ZJA5krYJsEFIopW\",\"idSess\":\"420\",\"dadosUsuarioLogado\":{\"id\":\"9\",\"local\":\"43\"}}'),(421,'2016-12-22 13:47:04',1,'uShQ4C7t6l8JoyptXwtznyrBihZdDq9vTX76WQOJns72ujBhabC4vnKeEwnjmKCE3HXzxx3Rdz5ibJc4thI16guEhPt7QTaN7QNe','{\"codSess\":\"uShQ4C7t6l8JoyptXwtznyrBihZdDq9vTX76WQOJns72ujBhabC4vnKeEwnjmKCE3HXzxx3Rdz5ibJc4thI16guEhPt7QTaN7QNe\",\"idSess\":\"421\",\"dadosUsuarioLogado\":{\"id\":\"9\",\"local\":\"43\"}}'),(422,'2016-12-22 13:47:27',1,'gGpAQiXhBP0G0GoDVcAvG8cHFTUIoxNN8fJISmgbKv0sK9JtcDNYyOaFIRpFCi7tPF81HD8sSq6GLLg9MGI1IzebD7JJVqd0a0gF','{\"codSess\":\"gGpAQiXhBP0G0GoDVcAvG8cHFTUIoxNN8fJISmgbKv0sK9JtcDNYyOaFIRpFCi7tPF81HD8sSq6GLLg9MGI1IzebD7JJVqd0a0gF\",\"idSess\":\"422\",\"dadosUsuarioLogado\":{\"id\":\"9\",\"local\":\"43\"}}'),(423,'2016-12-22 13:58:48',1,'pLBO8ZrwQzSJkOgGkLfm0LM0yaXw9WlVvZI7ynV2Ebpjo1WYbwkNzcnaLJwEEGTxUohhEgghPeh5wvZ22WQRJqDEj21uSXnMtbKv','{\"codSess\":\"pLBO8ZrwQzSJkOgGkLfm0LM0yaXw9WlVvZI7ynV2Ebpjo1WYbwkNzcnaLJwEEGTxUohhEgghPeh5wvZ22WQRJqDEj21uSXnMtbKv\",\"idSess\":\"423\",\"dadosUsuarioLogado\":{\"id\":\"1\",\"local\":\"43\"}}'),(424,'2016-12-22 13:59:12',1,'NLhWBdL6r8lFbfzWjAojlEhSthkw9tUoiMfrOmELjLJufGVlu5D8vfEQ81HPsUUdsm8uJZGDWL9yVNazda5QTtSfpDFdgevAwrdX','{\"codSess\":\"NLhWBdL6r8lFbfzWjAojlEhSthkw9tUoiMfrOmELjLJufGVlu5D8vfEQ81HPsUUdsm8uJZGDWL9yVNazda5QTtSfpDFdgevAwrdX\",\"idSess\":\"424\",\"dadosUsuarioLogado\":{\"id\":\"1\",\"local\":\"43\"}}'),(425,'2016-12-22 13:59:33',1,'z14b9aKOhsyNFjn0ud3nfohGwX6AgMLhgjnXBH2vH796bbfIboHQaFjZzH2iiweOleXNF9fl7295YKZDMn0VYjSrAp4naBJR26TE','{\"codSess\":\"z14b9aKOhsyNFjn0ud3nfohGwX6AgMLhgjnXBH2vH796bbfIboHQaFjZzH2iiweOleXNF9fl7295YKZDMn0VYjSrAp4naBJR26TE\",\"idSess\":\"425\",\"dadosUsuarioLogado\":{\"id\":\"1\",\"local\":\"43\"}}'),(426,'2016-12-22 13:59:34',1,'4gWqZAipqn7h76DKXUEAZZGv28sznPEJLgR5YbpymOn9qIFMUTd46aRV9eE8FhBuTdC1CaDdIHOlGgN9fFye0S4EKhGlN4DWpgAr','{\"codSess\":\"4gWqZAipqn7h76DKXUEAZZGv28sznPEJLgR5YbpymOn9qIFMUTd46aRV9eE8FhBuTdC1CaDdIHOlGgN9fFye0S4EKhGlN4DWpgAr\",\"idSess\":\"426\",\"dadosUsuarioLogado\":{\"id\":\"1\",\"local\":\"43\"}}'),(427,'2016-12-22 14:04:52',1,'7DQh5082rrOveYfhZZH2TM7nmoZcsqx8aNRLR38YytSIddftJnKVrHdJEhtcZPyc7jcrLonJwA9C48An0B6bfCRhiOgx7ySttjbi','{\"codSess\":\"7DQh5082rrOveYfhZZH2TM7nmoZcsqx8aNRLR38YytSIddftJnKVrHdJEhtcZPyc7jcrLonJwA9C48An0B6bfCRhiOgx7ySttjbi\",\"idSess\":\"427\",\"dadosUsuarioLogado\":{\"id\":\"6\",\"local\":\"43\"}}'),(428,'2016-12-22 14:05:00',1,'OotPjwuqZNygHjl5xktRacUiIMttHVydwCByEGhrkpFlAfbfxhHkMvSMtC0XroVyA8IrorC4HW21sHpCb56AKvqsKa62zkWgYStv','{\"codSess\":\"OotPjwuqZNygHjl5xktRacUiIMttHVydwCByEGhrkpFlAfbfxhHkMvSMtC0XroVyA8IrorC4HW21sHpCb56AKvqsKa62zkWgYStv\",\"idSess\":\"428\",\"dadosUsuarioLogado\":{\"id\":\"6\",\"local\":\"43\"}}'),(429,'2016-12-22 14:05:06',1,'uWCqXxmGV7CUfC6lj7hl1jiUAZIpQ7bouIrYL0cwSq9zitfIcHOmnzXbQwJYf8SJvvPlh8A75X59KAHHOvVdHozrJtSkXLVH53zM','{\"codSess\":\"uWCqXxmGV7CUfC6lj7hl1jiUAZIpQ7bouIrYL0cwSq9zitfIcHOmnzXbQwJYf8SJvvPlh8A75X59KAHHOvVdHozrJtSkXLVH53zM\",\"idSess\":\"429\",\"dadosUsuarioLogado\":{\"id\":\"9\",\"local\":\"43\"}}'),(430,'2016-12-22 14:05:11',1,'c5NcpyS7K6IojgGMyqoqQ4gcIv5lRYJqP4jk2Lmi4z5BeMO9WK76u1xGnZAOSqBrmqTONezCGLdntUazeFez78C0nwn3lSsCjBiO','{\"codSess\":\"c5NcpyS7K6IojgGMyqoqQ4gcIv5lRYJqP4jk2Lmi4z5BeMO9WK76u1xGnZAOSqBrmqTONezCGLdntUazeFez78C0nwn3lSsCjBiO\",\"idSess\":\"430\",\"dadosUsuarioLogado\":{\"id\":\"9\",\"local\":\"43\"}}'),(431,'2016-12-22 14:05:12',1,'3q9vDfciK1o0W98BM93BWIcP1lg1xFsjl4uLmA6rn6VKLrz9Fu7nkNMGcmzv70kiqOdiCpBoi64SMcEpmbYl447fJoPHpYpR1Ck2','{\"codSess\":\"3q9vDfciK1o0W98BM93BWIcP1lg1xFsjl4uLmA6rn6VKLrz9Fu7nkNMGcmzv70kiqOdiCpBoi64SMcEpmbYl447fJoPHpYpR1Ck2\",\"idSess\":\"431\",\"dadosUsuarioLogado\":{\"id\":\"9\",\"local\":\"43\"}}'),(432,'2016-12-22 14:05:17',1,'ZzT26DoReDMT3XgY9Y1gxRTs5VQkdFxQ2TtTtuywaRwFWZGeRZ25KnT4Jp9DNHXvIX1Vo7h6oCX011EFJEns539sQdA7m1sC0jz7','{\"codSess\":\"ZzT26DoReDMT3XgY9Y1gxRTs5VQkdFxQ2TtTtuywaRwFWZGeRZ25KnT4Jp9DNHXvIX1Vo7h6oCX011EFJEns539sQdA7m1sC0jz7\",\"idSess\":\"432\",\"dadosUsuarioLogado\":{\"id\":\"13\",\"local\":\"43\"}}'),(433,'2016-12-22 14:05:22',1,'QaGjfis0AO0ra9GvAjF4f58bwUg7Hoi1UzOen8KcZ8W6yQ3moPWmpWvAviyk07YIHckQDkNN2vncjCeCym19YDw3sGGoU4sqKBkz','{\"codSess\":\"QaGjfis0AO0ra9GvAjF4f58bwUg7Hoi1UzOen8KcZ8W6yQ3moPWmpWvAviyk07YIHckQDkNN2vncjCeCym19YDw3sGGoU4sqKBkz\",\"idSess\":\"433\",\"dadosUsuarioLogado\":{\"id\":\"13\",\"local\":\"43\"}}'),(434,'2016-12-22 14:05:23',1,'CXoPJiPWEhV9aajbdOp5rg1JBrlE7yrN2qP59JF4vs9Phk3rKnSDyuNPiM5puyBaZY6GGVvDVUeCnZeW1tcWSzDR37zNbQhCACur','{\"codSess\":\"CXoPJiPWEhV9aajbdOp5rg1JBrlE7yrN2qP59JF4vs9Phk3rKnSDyuNPiM5puyBaZY6GGVvDVUeCnZeW1tcWSzDR37zNbQhCACur\",\"idSess\":\"434\",\"dadosUsuarioLogado\":{\"id\":\"13\",\"local\":\"43\"}}'),(435,'2016-12-22 14:05:37',1,'hkezb3CsrVBLLWHg3VWz9SljFdqjw2v2YhSsEd12l3jVaRPKJk7M8El4dyu87DUFzp6pNriI3VRH2XwoiShcdF0LKVcWUWEb0rTO','{\"codSess\":\"hkezb3CsrVBLLWHg3VWz9SljFdqjw2v2YhSsEd12l3jVaRPKJk7M8El4dyu87DUFzp6pNriI3VRH2XwoiShcdF0LKVcWUWEb0rTO\",\"idSess\":\"435\",\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"43\"}}'),(436,'2016-12-22 14:05:42',1,'9jsTJB4Mxd9vlxMCalOuUNgrEOLyE1cbA0jv414RIoLogwu3GNDYVQ7ulBStP3oxLpbXMPlUy7K3YeULUNuOY9DKrlPYaUqTsVUl','{\"codSess\":\"9jsTJB4Mxd9vlxMCalOuUNgrEOLyE1cbA0jv414RIoLogwu3GNDYVQ7ulBStP3oxLpbXMPlUy7K3YeULUNuOY9DKrlPYaUqTsVUl\",\"idSess\":\"436\",\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"9\"}}'),(437,'2016-12-22 14:06:12',1,'86AHI7p5dfcLlMxSgi1RegvzfKY5EXOt6mTk2Xx3x6GzpFMz1zpBgKFZaF8yTWakhXaod2qTiqPhbLMRMjEtFztJQu2DmC6hmjeK','{\"codSess\":\"86AHI7p5dfcLlMxSgi1RegvzfKY5EXOt6mTk2Xx3x6GzpFMz1zpBgKFZaF8yTWakhXaod2qTiqPhbLMRMjEtFztJQu2DmC6hmjeK\",\"idSess\":\"437\",\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"9\"}}'),(438,'2016-12-22 14:11:13',1,'sGTEOkbCIR5F3yToHtl86R6NyKR4lx1XYdLugVQp4NeGKHhiPzlIBpYbxFtFLIyWaLc3FJeE13DnqRNRLcERTDE6ry1PvtxCOmLW','{\"codSess\":\"sGTEOkbCIR5F3yToHtl86R6NyKR4lx1XYdLugVQp4NeGKHhiPzlIBpYbxFtFLIyWaLc3FJeE13DnqRNRLcERTDE6ry1PvtxCOmLW\",\"idSess\":\"438\",\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"9\"}}'),(439,'2016-12-22 14:11:53',1,'Q4ymPCG1EPp6ZPoD8OdyMG4oPFsadl2zscRzpLdixMkhegWIBqaqmkM7k3PKh4WEwPBeWtUIPOkU5OGrpe5UOnVHOtH0CDpfZI1A','{\"codSess\":\"Q4ymPCG1EPp6ZPoD8OdyMG4oPFsadl2zscRzpLdixMkhegWIBqaqmkM7k3PKh4WEwPBeWtUIPOkU5OGrpe5UOnVHOtH0CDpfZI1A\",\"idSess\":\"439\",\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"12\"}}'),(440,'2016-12-22 14:12:12',1,'2rcOV2du7k0E9A3kWHfpks9LJTqMLh2WScT9gYXLRtFN17dKwyaf7mwylc0aDzYSMzffa1upKrjkViiVw2ydteWYkw65bopj3RGL','{\"codSess\":\"2rcOV2du7k0E9A3kWHfpks9LJTqMLh2WScT9gYXLRtFN17dKwyaf7mwylc0aDzYSMzffa1upKrjkViiVw2ydteWYkw65bopj3RGL\",\"idSess\":\"440\",\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"12\"}}'),(441,'2016-12-22 14:13:27',1,'tBn6fcOpIqCaxuT7YgucozBMY0vi1axmisbhwdqq5SOkp4XMoH5ZPJRhEszOThzLoRW564oiMwBuA9k0vRJjSrXRGMtlh7gVdhJz','{\"codSess\":\"tBn6fcOpIqCaxuT7YgucozBMY0vi1axmisbhwdqq5SOkp4XMoH5ZPJRhEszOThzLoRW564oiMwBuA9k0vRJjSrXRGMtlh7gVdhJz\",\"idSess\":\"441\",\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"12\"}}'),(442,'2016-12-22 14:14:04',1,'rgCnvdoohimdiYJHs9EE6R6CzhCDUcOcakGnrIXzx7E2PMKMvTs6KKxARXx9Ja18iGRCsdLTzt4RC3mDxcoTkVEFz5mRg6UDOMh6','{\"codSess\":\"rgCnvdoohimdiYJHs9EE6R6CzhCDUcOcakGnrIXzx7E2PMKMvTs6KKxARXx9Ja18iGRCsdLTzt4RC3mDxcoTkVEFz5mRg6UDOMh6\",\"idSess\":\"442\",\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"12\"}}'),(444,'2016-12-22 15:16:33',1,'PeD7HwG6bINPUJ0W6IrhzwinamnrUsWeB1goGiA35Rsr1veqd0PdD8Ud5VxuLEXDx5rfQ8MCz5sFENCclLbeszlfpcboYQhAByL1','{\"codSess\":\"PeD7HwG6bINPUJ0W6IrhzwinamnrUsWeB1goGiA35Rsr1veqd0PdD8Ud5VxuLEXDx5rfQ8MCz5sFENCclLbeszlfpcboYQhAByL1\",\"idSess\":\"444\",\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"12\"}}'),(446,'2016-12-22 15:17:30',1,'oS1yyxiXg0XqJ6ERhcuErqI69zuG10cbmmajhLuXiJq4opyUe7BhzI7VXQA90qrkDdk0vQXdcIHjfrR4m4wMJjnmq4pshYJtJo2a',NULL),(447,'2016-12-22 15:17:30',1,'IK8PLVCZiCJSM0dgeNatJKoGuYP6lDwZ2Ze8KDQ0NDEbSPNJDCFdukXkrMwN5XRQ3meY3qyJerFD1XZsC1BxTnTqYALUMcVCDfAv','{\"codSess\":\"IK8PLVCZiCJSM0dgeNatJKoGuYP6lDwZ2Ze8KDQ0NDEbSPNJDCFdukXkrMwN5XRQ3meY3qyJerFD1XZsC1BxTnTqYALUMcVCDfAv\",\"idSess\":\"447\",\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"12\"}}'),(448,'2016-12-22 15:18:33',1,'8mqhh6OnorCUp3TbUbznTtBwwrmrFwiTsoQrSm27pZ7JzRgtMEwc8XJXgWtZHL6HdLHLI1K66NHzXMIBlAWaMGZm8aFpjFXyIj8S',NULL),(449,'2016-12-22 15:18:33',1,'hcRiXCKhOcL59GVjkfU8QUilYCj9izc57pqzcBMkwmPPItFQAhRkd0XLw9C6Xiy7g3lU7qN3bH5MwqcMBOdemvY7DMFwgfxu2Trj','{\"codSess\":\"hcRiXCKhOcL59GVjkfU8QUilYCj9izc57pqzcBMkwmPPItFQAhRkd0XLw9C6Xiy7g3lU7qN3bH5MwqcMBOdemvY7DMFwgfxu2Trj\",\"idSess\":\"449\",\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"12\"}}'),(452,'2016-12-22 15:18:57',1,'choIKpdvbRZxI8MI2f7u3e16DdsPfZz4MmHfHDVbhpFoKZpHgJ3FsHUpmLvG6xgzrUvZfZcrZ1qh5tkyekUN5fe1KpSQZTXVHDX0',NULL),(453,'2016-12-22 15:18:57',1,'IYCnEHtcIEV1nejEUMeQySJdLKKP1lewwmmEc5jZAU91ZAn9Vo7B1BfSizEpgB0hM3Ve1I2Nr3QlXd2Uzj92ZqzVXfbczYJ66N6m','{\"codSess\":\"IYCnEHtcIEV1nejEUMeQySJdLKKP1lewwmmEc5jZAU91ZAn9Vo7B1BfSizEpgB0hM3Ve1I2Nr3QlXd2Uzj92ZqzVXfbczYJ66N6m\",\"idSess\":\"453\",\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"12\"}}'),(454,'2016-12-22 15:19:08',1,'9vPCLTHmkx3ZjYFAJ8Rt0TRMI3ajD5cCnIYqPXxpNfyvENUpl0D6b84beBh1BjTgRr1AaPbVnDM4CeqHW6sCHWrO09slQABFdSdT',NULL),(455,'2016-12-22 15:19:08',1,'CoiO8TvvrlKrKZRiH10JoDBFQgebPQEMPAlSKiWtrRx14V0WmzqKtWvztuW5zGyXxMbR7QLmVD7Ji6jMSq3J6E2fKNhC8lKG7upI','{\"codSess\":\"CoiO8TvvrlKrKZRiH10JoDBFQgebPQEMPAlSKiWtrRx14V0WmzqKtWvztuW5zGyXxMbR7QLmVD7Ji6jMSq3J6E2fKNhC8lKG7upI\",\"idSess\":\"455\",\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"12\"}}'),(456,'2016-12-22 15:19:20',1,'Jzlcqryf2gkmOap7k5rOVbg9wam4Ox8fdFmTfMVQ89OL5KktVPbqwKgsM9TYW6t7jGcVSoZR36hMsQxkxMRJKN07Nsx5DBsniyWL',NULL),(457,'2016-12-22 15:19:20',1,'MRoPq3A76fYAwz67tUZse7keLAYZCOfghrT1IQU79pMotak1Izk1vEnF5fjMT6fBv8cGLhotQBapm6K3cOKKkvLjGffHpcoJWq2l','{\"codSess\":\"MRoPq3A76fYAwz67tUZse7keLAYZCOfghrT1IQU79pMotak1Izk1vEnF5fjMT6fBv8cGLhotQBapm6K3cOKKkvLjGffHpcoJWq2l\",\"idSess\":\"457\",\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"12\"}}'),(458,'2016-12-22 15:20:08',1,'qzFw8QwQt1cJtejC4uaFrdmG3ubJpqPXBi8hdQrqiZZ9IP29tM3jDBtqGwkYvVHZUnTlD3AxxPUHuWocaaPf4dUtSHLlSEavSvHK',NULL),(459,'2016-12-22 15:20:08',1,'xPRRa3IEwRMu68jeIoiz9kTWttsB18c76UxaGzF3yZZomvgYmpmnWI3Fu0pzuRXkmXPjum78IdqMZqpqJMw0WSc9NsB5cQKFQRWQ','null'),(460,'2016-12-22 15:20:14',1,'NIvVqTIBOkdEgapUisz7SeuaSCwoQPqx2DGPqfom7oBdf4vG1E8PA8oAXX9PxfctOlXygjn5SPzNfqngHoIqqnsg8Xr0cXwRu83p',NULL),(461,'2016-12-22 15:20:14',1,'cRfAaSJF7s9S1Eo16S3lcFv8YyNbfzZNHIZIrdD9yAUjt0WsCQ21pqZtGXJUJ2TZUMBsDBL0GcjfTaKAwwAREBNm29ygtdVhXh8Z','null'),(466,'2016-12-22 16:04:05',1,'cyTtvyBMcPVnlSKYP16cAQn1H1U5vYlbSXnf1PFqAc5InCEnBzTK3PZF9ILKjsU9ES5L1vGHL6kfvy5NDT5E4ZTEQ02TGzPU8ZPV','{\"codSess\":\"cyTtvyBMcPVnlSKYP16cAQn1H1U5vYlbSXnf1PFqAc5InCEnBzTK3PZF9ILKjsU9ES5L1vGHL6kfvy5NDT5E4ZTEQ02TGzPU8ZPV\",\"idSess\":\"466\",\"dadosUsuarioLogado\":{\"id\":\"2\"}}'),(468,'2016-12-22 16:12:24',1,'DCvHSmnW3FOCdISkIuRve4BDbR4rK1cUVhdQrhZzLKOSOuRxxVDRFisGiqgvJhic5626ZZXRpxtnsZ3o2Fo6VwCkpYCeOlOXISmK','{\"codSess\":\"DCvHSmnW3FOCdISkIuRve4BDbR4rK1cUVhdQrhZzLKOSOuRxxVDRFisGiqgvJhic5626ZZXRpxtnsZ3o2Fo6VwCkpYCeOlOXISmK\",\"idSess\":\"468\",\"dadosUsuarioLogado\":{\"id\":\"1\"}}'),(469,'2016-12-22 16:12:39',1,'51YlMlJbZ0h0CUspU0HRDX5HXTF221nOfAKFsOAQ6fzukr82JSrgcl66PwjRSdrdePZPMCXJ4bDAbDcJrFBFU5GntTxeblCo9D37','{\"codSess\":\"51YlMlJbZ0h0CUspU0HRDX5HXTF221nOfAKFsOAQ6fzukr82JSrgcl66PwjRSdrdePZPMCXJ4bDAbDcJrFBFU5GntTxeblCo9D37\",\"idSess\":\"469\",\"dadosUsuarioLogado\":{\"id\":\"1\",\"local\":\"9\"}}'),(470,'2016-12-22 16:12:42',1,'RxU589yEdcOibvpxZDN0FIGzB2fNwVVzMGxQXspfo6GTgTI2pAepoAf8suKTrQSsjD1XE7lMrSw2S6fovDiKQ0A5OfYeOIeMyG5h','{\"codSess\":\"RxU589yEdcOibvpxZDN0FIGzB2fNwVVzMGxQXspfo6GTgTI2pAepoAf8suKTrQSsjD1XE7lMrSw2S6fovDiKQ0A5OfYeOIeMyG5h\",\"idSess\":\"470\",\"dadosUsuarioLogado\":{\"id\":\"1\",\"local\":\"16\"}}'),(471,'2016-12-22 16:12:54',1,'3VcxrwFde3JLv8LSLThoBLYBFlmfSvMzThD2UqicDydI3zaXSFEvvBDn0EjwtePyOL4A9AtnRlDUWQNBIiymM0GJO97yp5bHpnJO','{\"codSess\":\"3VcxrwFde3JLv8LSLThoBLYBFlmfSvMzThD2UqicDydI3zaXSFEvvBDn0EjwtePyOL4A9AtnRlDUWQNBIiymM0GJO97yp5bHpnJO\",\"idSess\":\"471\",\"dadosUsuarioLogado\":{\"id\":\"1\",\"local\":\"16\"}}'),(472,'2016-12-22 16:21:42',1,'UfJetd5KhCWWVweWWW4Zezze0yWtIs8KJTzoXszpTE84MVJIv69HRQVMMrAB6XAF4JdVL8OyA1SfnHPgNvakOhBlVZU5leDRlaGG','{\"codSess\":\"UfJetd5KhCWWVweWWW4Zezze0yWtIs8KJTzoXszpTE84MVJIv69HRQVMMrAB6XAF4JdVL8OyA1SfnHPgNvakOhBlVZU5leDRlaGG\",\"idSess\":\"472\",\"dadosUsuarioLogado\":{\"id\":\"1\",\"local\":\"16\"}}'),(473,'2016-12-22 16:21:52',1,'H3IjFQFRpTsdbWMEAaz5UJzG22Mc8J99k0RAc0iNmxReLnyysKUhkzjfSRX806JLLDdlsKTs2m4hbkBOwINN8sPWxaXJYM7ysZqF','{\"codSess\":\"H3IjFQFRpTsdbWMEAaz5UJzG22Mc8J99k0RAc0iNmxReLnyysKUhkzjfSRX806JLLDdlsKTs2m4hbkBOwINN8sPWxaXJYM7ysZqF\",\"idSess\":\"473\",\"dadosUsuarioLogado\":{\"id\":\"1\",\"local\":\"16\"}}'),(474,'2016-12-22 16:22:45',1,'W5YH1ysmLNynCcoMpraawX5oD37CwoHZiw3bvUxyrTst3JxGlknquo7OI48zlPMQqlTWd4UTn5Bt3kd7TBRBIDl1d92wP7NT4KoU','{\"codSess\":\"W5YH1ysmLNynCcoMpraawX5oD37CwoHZiw3bvUxyrTst3JxGlknquo7OI48zlPMQqlTWd4UTn5Bt3kd7TBRBIDl1d92wP7NT4KoU\",\"idSess\":\"474\",\"dadosUsuarioLogado\":{\"id\":\"1\",\"local\":\"16\"}}'),(475,'2016-12-22 16:23:00',1,'TgXXdEPF4JBLVv7n9l50VWISBxPvyCnwqvcK75tSJ2w6V4oEt9WCqEfSIIZ9N3zxwZWLqtEzDBA7G5ustKvnFrCiYiL5RwB1dgai','{\"codSess\":\"TgXXdEPF4JBLVv7n9l50VWISBxPvyCnwqvcK75tSJ2w6V4oEt9WCqEfSIIZ9N3zxwZWLqtEzDBA7G5ustKvnFrCiYiL5RwB1dgai\",\"idSess\":\"475\",\"dadosUsuarioLogado\":{\"id\":\"1\",\"local\":\"16\"}}'),(476,'2016-12-22 16:27:01',1,'fKlYPlLxHlFHTHULiNS9xGS9fGbPQpGIArGJERdG30E9yBjhXrCzz8e3t0CWwhLoS2AOarXljxHuEcOPklbfkDpLiuSlmRAbjPYO','{\"codSess\":\"fKlYPlLxHlFHTHULiNS9xGS9fGbPQpGIArGJERdG30E9yBjhXrCzz8e3t0CWwhLoS2AOarXljxHuEcOPklbfkDpLiuSlmRAbjPYO\",\"idSess\":\"476\",\"dadosUsuarioLogado\":{\"id\":\"1\",\"local\":\"16\"}}'),(477,'2016-12-22 16:27:16',1,'gjs1fAe0ss3HR1HWvA6ZJJqH5Su1rYwit72yxixTZFGf2wGvJw7RkZVzBZjYAj0tKorbCJ3JDsnudmRJtpvxZQ1gCDg2NpOBACIt','{\"codSess\":\"gjs1fAe0ss3HR1HWvA6ZJJqH5Su1rYwit72yxixTZFGf2wGvJw7RkZVzBZjYAj0tKorbCJ3JDsnudmRJtpvxZQ1gCDg2NpOBACIt\",\"idSess\":\"477\",\"dadosUsuarioLogado\":{\"id\":\"1\",\"local\":\"16\"}}'),(478,'2016-12-22 16:27:56',1,'a3OJMVKyTF1yhwAwxPlyIanTYpQPLOh3V9WiYkYH0RngK5LUP4uTpaSDHWF16z7jrTTtQi4Ce1mV8B1GL2VYiND7GhCvh8XBBLrU','{\"codSess\":\"a3OJMVKyTF1yhwAwxPlyIanTYpQPLOh3V9WiYkYH0RngK5LUP4uTpaSDHWF16z7jrTTtQi4Ce1mV8B1GL2VYiND7GhCvh8XBBLrU\",\"idSess\":\"478\",\"dadosUsuarioLogado\":{\"id\":\"1\",\"local\":\"16\"}}'),(479,'2016-12-22 16:28:37',1,'enEOtmDbPkfXbbp9AZ2buas6Fj2EoLbmOR897rzCF3hluWDOFYkZChba3qAkrIs9KYGoNFosNlDtpLhRF3Bw91h0XrWBvLXdCQOW','{\"codSess\":\"enEOtmDbPkfXbbp9AZ2buas6Fj2EoLbmOR897rzCF3hluWDOFYkZChba3qAkrIs9KYGoNFosNlDtpLhRF3Bw91h0XrWBvLXdCQOW\",\"idSess\":\"479\",\"dadosUsuarioLogado\":{\"id\":\"1\",\"local\":\"16\"}}'),(480,'2016-12-22 16:28:47',1,'cWTYMVM9gsAFYJOzxLwF0Dj7D92iNYLtw9O57FpK74NnVwnJBsgqL4pKvbLjS0cGIi6DnZWyoLauUrXib2pP0TswC1rGWL8dyJZD','{\"codSess\":\"cWTYMVM9gsAFYJOzxLwF0Dj7D92iNYLtw9O57FpK74NnVwnJBsgqL4pKvbLjS0cGIi6DnZWyoLauUrXib2pP0TswC1rGWL8dyJZD\",\"idSess\":\"480\",\"dadosUsuarioLogado\":{\"id\":\"1\",\"local\":\"16\"}}'),(481,'2016-12-22 16:29:02',1,'npkI66WMY6PY6lpUieoh37cKqUAIoAxTAW7pxg5Rx874FXbrRtoJHnnElniNcwgGlJ7vnYWlYEDj1RNAQUruY8T1hDkSCqeWatV7','{\"codSess\":\"npkI66WMY6PY6lpUieoh37cKqUAIoAxTAW7pxg5Rx874FXbrRtoJHnnElniNcwgGlJ7vnYWlYEDj1RNAQUruY8T1hDkSCqeWatV7\",\"idSess\":\"481\",\"dadosUsuarioLogado\":{\"id\":\"1\",\"local\":\"16\"}}'),(482,'2016-12-22 16:29:22',1,'oxGEWTkElTrH0SkUYEc8eMx8OxVhUITUp9f0FYKLtXb9ulLfTRhoUSG2lIlpzqEvKNtWDAegzLmqrH1pVBnk7xHKuXeO3C3h29qf','{\"codSess\":\"oxGEWTkElTrH0SkUYEc8eMx8OxVhUITUp9f0FYKLtXb9ulLfTRhoUSG2lIlpzqEvKNtWDAegzLmqrH1pVBnk7xHKuXeO3C3h29qf\",\"idSess\":\"482\",\"dadosUsuarioLogado\":{\"id\":\"1\",\"local\":\"16\"}}'),(483,'2016-12-22 16:29:34',1,'HXCsWVs8KE3WdXcS8TelgeBCDRt46KaaeO9NZI9RdVCXHz5d8EEo0Cn0kHJnWX37psSqJ6CMBoAnx0pGmKoJm4VRTh8us5SdsFjb','{\"codSess\":\"HXCsWVs8KE3WdXcS8TelgeBCDRt46KaaeO9NZI9RdVCXHz5d8EEo0Cn0kHJnWX37psSqJ6CMBoAnx0pGmKoJm4VRTh8us5SdsFjb\",\"idSess\":\"483\",\"dadosUsuarioLogado\":{\"id\":\"1\",\"local\":\"16\"}}'),(485,'2016-12-22 16:30:27',1,'3pBnqiuYoAvXKhSiCu52O3aWZ5oviceGGywB0HneEVd1u770YR4ca575LXByEmxW2qV3sW3Jyikx32BV9PLfBz1Iz5BVeut11Ll5','{\"codSess\":\"3pBnqiuYoAvXKhSiCu52O3aWZ5oviceGGywB0HneEVd1u770YR4ca575LXByEmxW2qV3sW3Jyikx32BV9PLfBz1Iz5BVeut11Ll5\",\"idSess\":\"485\",\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"16\"}}'),(489,'2016-12-22 16:33:28',1,'nDTIBJVQ1RiArFRrhWZD0DJXV2CHAuQFFFd29qAZk1TEjgHzVBQtLVlm4CgztwciJKw09YWiAb99g9xug0w7973gbXaTamtxwhT5','{\"codSess\":\"nDTIBJVQ1RiArFRrhWZD0DJXV2CHAuQFFFd29qAZk1TEjgHzVBQtLVlm4CgztwciJKw09YWiAb99g9xug0w7973gbXaTamtxwhT5\",\"idSess\":\"489\",\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"16\"}}'),(490,'2016-12-22 16:33:50',1,'bmQbTlfwCRHlqhR74AON41ajsGMs0cDgPc9lY34CvAbZ5gLpP5h7AErJPCeUfO6Xacbb2Vr1jrO04kuH1zbnDtpkjM5nUCFhhUnq','{\"codSess\":\"bmQbTlfwCRHlqhR74AON41ajsGMs0cDgPc9lY34CvAbZ5gLpP5h7AErJPCeUfO6Xacbb2Vr1jrO04kuH1zbnDtpkjM5nUCFhhUnq\",\"idSess\":\"490\",\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"6\"}}'),(491,'2016-12-22 16:33:58',1,'8qZsdPD5NUHJBe5AmbtbnxKVUWr4wYY8KBDgo6zsbblfyf6DPTG8jeLfhh78n6hGLsHhsYfqAgr45bzDsOi5wdEbIIKFW6CBpyGM','{\"codSess\":\"8qZsdPD5NUHJBe5AmbtbnxKVUWr4wYY8KBDgo6zsbblfyf6DPTG8jeLfhh78n6hGLsHhsYfqAgr45bzDsOi5wdEbIIKFW6CBpyGM\",\"idSess\":\"491\",\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"6\"}}'),(492,'2016-12-22 16:34:21',1,'jsjGMMDA9h887gZvMkyWwmTCpR1tYOv3B6rExGHaV43ihavu6N5i5fiqVNXmWESDNGtXPslOOFTfoIIi84Kol7jZttmbpXMylpKh','{\"codSess\":\"jsjGMMDA9h887gZvMkyWwmTCpR1tYOv3B6rExGHaV43ihavu6N5i5fiqVNXmWESDNGtXPslOOFTfoIIi84Kol7jZttmbpXMylpKh\",\"idSess\":\"492\",\"dadosUsuarioLogado\":{\"id\":\"1\",\"local\":\"6\"}}'),(494,'2016-12-22 16:34:45',1,'5Z5j3n1gZw7LY6ngY6m28bKgCIt0ZQd31o7jyqksO265fzft5EwRiSPtIFMYoBm9OLWdW7qjWstFA2Vl206V7shingKjFCVSiqk6','{\"codSess\":\"5Z5j3n1gZw7LY6ngY6m28bKgCIt0ZQd31o7jyqksO265fzft5EwRiSPtIFMYoBm9OLWdW7qjWstFA2Vl206V7shingKjFCVSiqk6\",\"idSess\":\"494\",\"dadosUsuarioLogado\":{\"id\":\"21\",\"local\":\"6\"}}'),(495,'2016-12-22 16:34:57',1,'A8uhxGavFrEoX6oM2v73pfDhdsU159b5YUqlVKEm17vx8IlqrnKEBUq7OyfV7piMshhUsZdgvWd7zAE43cTBFH0OIEK5eYvUZBDv','{\"codSess\":\"A8uhxGavFrEoX6oM2v73pfDhdsU159b5YUqlVKEm17vx8IlqrnKEBUq7OyfV7piMshhUsZdgvWd7zAE43cTBFH0OIEK5eYvUZBDv\",\"idSess\":\"495\",\"dadosUsuarioLogado\":{\"id\":\"21\",\"local\":\"6\"}}'),(496,'2016-12-22 16:35:06',1,'7lIR4ucoWuGPDQaYzXXw03ntHyGcQlH0ZczhG8FRNp2rYcbjDjyrgBKTz5Wi1R3OOUOcwrKRDkcJ4YKZdSKXh9ycxRB59MUubmwm','{\"codSess\":\"7lIR4ucoWuGPDQaYzXXw03ntHyGcQlH0ZczhG8FRNp2rYcbjDjyrgBKTz5Wi1R3OOUOcwrKRDkcJ4YKZdSKXh9ycxRB59MUubmwm\",\"idSess\":\"496\",\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"6\"}}'),(498,'2016-12-22 16:36:19',1,'lhWcviqqpKm2YxTECF6dJWclxLntVfTFnZ5RAWTWsXOIxP2efYOdMl5hbtv5Es6UyKkp5Bun3zPC5CLeJ7HIx5MuyKecOU147s7q','{\"codSess\":\"lhWcviqqpKm2YxTECF6dJWclxLntVfTFnZ5RAWTWsXOIxP2efYOdMl5hbtv5Es6UyKkp5Bun3zPC5CLeJ7HIx5MuyKecOU147s7q\",\"idSess\":\"498\",\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"6\"}}'),(499,'2016-12-22 16:36:35',1,'9RsjS6uUjOKyobSfg6E6DUtdPRmjzPQ9JbsR7tIN2ZcB6paYkU0ZrWZvqyR9iMQAiGxLDW4uxgvaEwPtR6tntMx2jZYpSnPShzzP','{\"codSess\":\"9RsjS6uUjOKyobSfg6E6DUtdPRmjzPQ9JbsR7tIN2ZcB6paYkU0ZrWZvqyR9iMQAiGxLDW4uxgvaEwPtR6tntMx2jZYpSnPShzzP\",\"idSess\":\"499\",\"dadosUsuarioLogado\":{\"id\":\"1\",\"local\":\"6\"}}'),(500,'2016-12-22 16:36:43',1,'LL7fCuhUdlym8Xopntu7ccCnIAvwm4QwvgyKsJUjXyWMi7qaY5mCkJsqioo7OYERyfcDsZyUhxF8RSv2NJjR5NQTTs36kRY7MZmx','{\"codSess\":\"LL7fCuhUdlym8Xopntu7ccCnIAvwm4QwvgyKsJUjXyWMi7qaY5mCkJsqioo7OYERyfcDsZyUhxF8RSv2NJjR5NQTTs36kRY7MZmx\",\"idSess\":\"500\",\"dadosUsuarioLogado\":{\"id\":\"1\",\"local\":\"6\"}}'),(501,'2016-12-22 16:36:52',1,'jzsGuDBXXt2Zudi8b3OhF4K5xeNONjpsLHmvLgBc37LxMI6wfskcbeARkgp4hQvGtT5HCljX7CAfex2UkC6deSCANiOWt4z8CTyR','{\"codSess\":\"jzsGuDBXXt2Zudi8b3OhF4K5xeNONjpsLHmvLgBc37LxMI6wfskcbeARkgp4hQvGtT5HCljX7CAfex2UkC6deSCANiOWt4z8CTyR\",\"idSess\":\"501\",\"dadosUsuarioLogado\":{\"id\":\"1\",\"local\":\"6\"}}'),(502,'2016-12-22 16:36:53',1,'8z1DjBmfpWhOgvNxSvXFFdkpijOwKRMETDSKwnwBatGivaJLTOO87HKjU6Ll84S2q2kWL0Y7Jf8n127XQu68f2kg48eIgq5GGaU2','{\"codSess\":\"8z1DjBmfpWhOgvNxSvXFFdkpijOwKRMETDSKwnwBatGivaJLTOO87HKjU6Ll84S2q2kWL0Y7Jf8n127XQu68f2kg48eIgq5GGaU2\",\"idSess\":\"502\",\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"6\"}}'),(504,'2016-12-22 16:37:24',1,'oVn1LNPBmzoLvbb8IA6t6HYBHaMLEinl1BcYRnDj8BDdROcUPvUQC7YV5x4xo31Nz92m1KcPVJdwT5Bnvaomi59tbXXUp2CdqQWL','{\"codSess\":\"oVn1LNPBmzoLvbb8IA6t6HYBHaMLEinl1BcYRnDj8BDdROcUPvUQC7YV5x4xo31Nz92m1KcPVJdwT5Bnvaomi59tbXXUp2CdqQWL\",\"idSess\":\"504\",\"dadosUsuarioLogado\":{\"id\":\"7\",\"local\":\"6\"}}'),(505,'2016-12-22 16:37:31',1,'YaDNNaAfGkv3bBT47i6INfPChr6NAmGzfVOvXzns8JMM5z1VrLXG7tetLHmfmn0ACD2kht4ieD6VaPOGdvFzWE1AT7XCJkOUAIMI','{\"codSess\":\"YaDNNaAfGkv3bBT47i6INfPChr6NAmGzfVOvXzns8JMM5z1VrLXG7tetLHmfmn0ACD2kht4ieD6VaPOGdvFzWE1AT7XCJkOUAIMI\",\"idSess\":\"505\",\"dadosUsuarioLogado\":{\"id\":\"7\",\"local\":\"1\"}}'),(506,'2016-12-22 16:37:55',1,'EMWliBQrxaI3S6YcgPZC0aNHATX14lERwpfBtpiPtB6cUD8ug5XtzOg7mZfNTA1tiwG6gmoO2Guq06wwwmPcwKNWBEyCEkZVIk5c','{\"codSess\":\"EMWliBQrxaI3S6YcgPZC0aNHATX14lERwpfBtpiPtB6cUD8ug5XtzOg7mZfNTA1tiwG6gmoO2Guq06wwwmPcwKNWBEyCEkZVIk5c\",\"idSess\":\"506\",\"dadosUsuarioLogado\":{\"id\":\"7\",\"local\":\"1\"}}'),(507,'2016-12-22 16:38:01',1,'KNIlr9AoyKOOppwrfOoKE1g6YG1denKhTFM577AyALdlr6PZ0SsJbYmFhWyNzJxH1YxjwbmhA7Ns6r8iDKkF8f2vHcnVlYl4lfY9','{\"codSess\":\"KNIlr9AoyKOOppwrfOoKE1g6YG1denKhTFM577AyALdlr6PZ0SsJbYmFhWyNzJxH1YxjwbmhA7Ns6r8iDKkF8f2vHcnVlYl4lfY9\",\"idSess\":\"507\",\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"}}'),(515,'2016-12-22 16:55:00',1,'lIhZm5JuORRDj19U2GT34uwoYimiktpo2XkHdv93zEoIHAFSp8IixT62a8LSGhmMH6nbmVfW5AaFjUGZhkaHmknlBpyOQKh6OYdu','{\"codSess\":\"lIhZm5JuORRDj19U2GT34uwoYimiktpo2XkHdv93zEoIHAFSp8IixT62a8LSGhmMH6nbmVfW5AaFjUGZhkaHmknlBpyOQKh6OYdu\",\"idSess\":\"515\",\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"}}'),(518,'2016-12-22 16:55:52',1,'5SNBnBogRsZeVHGUbhyUBLd6W5NJHeFBGQ3GK8PEdbD18D1AZpWLHhpbpMs2hSCvZTwwKerQkGJUsbDxnYzNP2AtbSvd08I0r0Fq','{\"codSess\":\"5SNBnBogRsZeVHGUbhyUBLd6W5NJHeFBGQ3GK8PEdbD18D1AZpWLHhpbpMs2hSCvZTwwKerQkGJUsbDxnYzNP2AtbSvd08I0r0Fq\",\"idSess\":\"518\",\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"notIn\":null}'),(519,'2016-12-22 16:56:16',1,'ainwTq73Vy7ZO8X5krApZbSvRrQR3hPTZNXCcQLLmTFS5wv3abMm3bpcLYbd0vv1ssbwj2DttUGakwm0tuJobmbo48w7YGtP4Mxp','{\"codSess\":\"ainwTq73Vy7ZO8X5krApZbSvRrQR3hPTZNXCcQLLmTFS5wv3abMm3bpcLYbd0vv1ssbwj2DttUGakwm0tuJobmbo48w7YGtP4Mxp\",\"idSess\":\"519\",\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"notIn\":null}'),(520,'2016-12-22 16:56:32',1,'PCYdr7AQZP66wIC61curz23Vfk1bOl8VTuIsH6jfP9WvUUFJ9IH3iFsh7wKen5mrOoEBx3h69OBvfmajfZhDld8tkDvPo2txPM8o','{\"codSess\":\"PCYdr7AQZP66wIC61curz23Vfk1bOl8VTuIsH6jfP9WvUUFJ9IH3iFsh7wKen5mrOoEBx3h69OBvfmajfZhDld8tkDvPo2txPM8o\",\"idSess\":\"520\",\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"notIn\":null}'),(521,'2016-12-22 16:56:34',1,'7dGwXLiNG5GCmdSfXgsuYiS1iBpdjAa9EVVHvMEFbFxzW9qRp21foLSheIMWoYjgwXA5K60ShltxH67ot46qZi4K87hYIh4gezu6','{\"codSess\":\"7dGwXLiNG5GCmdSfXgsuYiS1iBpdjAa9EVVHvMEFbFxzW9qRp21foLSheIMWoYjgwXA5K60ShltxH67ot46qZi4K87hYIh4gezu6\",\"idSess\":\"521\",\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"notIn\":null}'),(522,'2016-12-22 16:56:35',1,'FMFG1iuxzoBU6prKqdmfBgv1zTRRjLUB2MUJdzhrYMJVoxetNQSbOBhD3W8AFS9MVpHxJepK5B1HVgW7lnDrdUcg7PV9khZtpXBX','{\"codSess\":\"FMFG1iuxzoBU6prKqdmfBgv1zTRRjLUB2MUJdzhrYMJVoxetNQSbOBhD3W8AFS9MVpHxJepK5B1HVgW7lnDrdUcg7PV9khZtpXBX\",\"idSess\":\"522\",\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"notIn\":null}'),(523,'2016-12-22 16:56:35',1,'c7SuKouyMxJwc7oN3LCzdlEHl3RvdDWOb7kdSvj5JIt9ZskvjXYrAk1QMQkwcv8iXC460kV714zjvmoHXgbVZhRRkP6aSaFBKiD9','{\"codSess\":\"c7SuKouyMxJwc7oN3LCzdlEHl3RvdDWOb7kdSvj5JIt9ZskvjXYrAk1QMQkwcv8iXC460kV714zjvmoHXgbVZhRRkP6aSaFBKiD9\",\"idSess\":\"523\",\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"notIn\":null}'),(524,'2016-12-22 16:56:35',1,'AMx01BHhdHefIrFLqy3mhqOG7DDTR8Re10jDvve8bR8cuF9PFISs0Oa01DDicTL9NQB2UXHHlAy7EF0VnrN7A9K8LxTBcEU2uIPj','{\"codSess\":\"AMx01BHhdHefIrFLqy3mhqOG7DDTR8Re10jDvve8bR8cuF9PFISs0Oa01DDicTL9NQB2UXHHlAy7EF0VnrN7A9K8LxTBcEU2uIPj\",\"idSess\":\"524\",\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"notIn\":null}'),(525,'2016-12-22 16:56:35',1,'fgjF9QlgghNv9FIB7tfXv4pOEfNnvLyY2AIRyxbNEJfyBwSPn6Zfcb3DLlWtUbpUifSC4mjXkaQTlHLuYTXr3okWt5F8L36UYd1B','{\"codSess\":\"fgjF9QlgghNv9FIB7tfXv4pOEfNnvLyY2AIRyxbNEJfyBwSPn6Zfcb3DLlWtUbpUifSC4mjXkaQTlHLuYTXr3okWt5F8L36UYd1B\",\"idSess\":\"525\",\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"notIn\":null}'),(526,'2016-12-22 16:56:36',1,'QydR4ku01buSOyxzJGlwSLl9qV2QRbHnoYzuZwG1AdrTbDMAIyq2IM8VaNkZYsRqJO4LBupUJ4pXbp8O4HqEM0jPEfqetXosctzX','{\"codSess\":\"QydR4ku01buSOyxzJGlwSLl9qV2QRbHnoYzuZwG1AdrTbDMAIyq2IM8VaNkZYsRqJO4LBupUJ4pXbp8O4HqEM0jPEfqetXosctzX\",\"idSess\":\"526\",\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"notIn\":null}'),(539,'2016-12-22 16:59:25',1,'KmzOpnPRtBtukiMyfd9u1di36tJACH09Uc7XQChNzTtVRXcLFaOku6GtiE6ne5eGpxmb7Jxj7dm5Rm1qIIcE9XcXqzplIPiiaiXD','{\"codSess\":\"KmzOpnPRtBtukiMyfd9u1di36tJACH09Uc7XQChNzTtVRXcLFaOku6GtiE6ne5eGpxmb7Jxj7dm5Rm1qIIcE9XcXqzplIPiiaiXD\",\"idSess\":\"539\",\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"notIn\":[\"7\",\"6\",\"5\"]}'),(540,'2016-12-22 16:59:25',1,'9jZZCOsTcMe7dj7r1vaIJ1m9QlJNnOWmPz6w0UCK7jIAB2u8WX0hJ9wYntTlvbXUZnBYCHo2iQHvmzrDXAXep8DaLwQ75K6wqsFL','{\"codSess\":\"9jZZCOsTcMe7dj7r1vaIJ1m9QlJNnOWmPz6w0UCK7jIAB2u8WX0hJ9wYntTlvbXUZnBYCHo2iQHvmzrDXAXep8DaLwQ75K6wqsFL\",\"idSess\":\"540\",\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"notIn\":[\"7\",\"6\",\"5\"]}'),(541,'2016-12-22 16:59:25',1,'Qvsz0kJposwD8Cw0AnAivMFI1154b3SzigjdCp9mMcEPbT4e6KHJyZYZa1z9zG6MbYheUsTBEUZBDfdhJr0sjV3tCXsoNIuRsm3R','{\"codSess\":\"Qvsz0kJposwD8Cw0AnAivMFI1154b3SzigjdCp9mMcEPbT4e6KHJyZYZa1z9zG6MbYheUsTBEUZBDfdhJr0sjV3tCXsoNIuRsm3R\",\"idSess\":\"541\",\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"notIn\":[\"7\",\"6\",\"5\"]}'),(542,'2016-12-22 16:59:26',1,'vpD239WJjSf9XRmaB6M9C75vIioliISXlJkzdmXhJu8a1F7MydS3g6JGQgfSLwUBNEinwoEiLBS5kB714KXoaUtX4Ti3weCZDRWN','{\"codSess\":\"vpD239WJjSf9XRmaB6M9C75vIioliISXlJkzdmXhJu8a1F7MydS3g6JGQgfSLwUBNEinwoEiLBS5kB714KXoaUtX4Ti3weCZDRWN\",\"idSess\":\"542\",\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"notIn\":[\"7\",\"6\",\"5\"]}'),(543,'2016-12-22 16:59:26',1,'MuBT6GlHmalcPWN7FBl3CR4kkY1dJCqgp2FQyxySb1xqC3ZpcJX89vuHlJ6MoXjs9ZrAZTifb0GnO46V5CXHmSjEAxdCD3CmA0xw','{\"codSess\":\"MuBT6GlHmalcPWN7FBl3CR4kkY1dJCqgp2FQyxySb1xqC3ZpcJX89vuHlJ6MoXjs9ZrAZTifb0GnO46V5CXHmSjEAxdCD3CmA0xw\",\"idSess\":\"543\",\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"notIn\":[\"7\",\"6\",\"5\"]}'),(544,'2016-12-22 16:59:26',1,'ghyGXPYwfmefwFRcfp3YWybutSsO3qWZkeimAls6n9bmAYTdFt2sUP3BloYmDtWaFR7Odp6zDyVdFUAYHRmtdGQynOiYPhddepdX','{\"codSess\":\"ghyGXPYwfmefwFRcfp3YWybutSsO3qWZkeimAls6n9bmAYTdFt2sUP3BloYmDtWaFR7Odp6zDyVdFUAYHRmtdGQynOiYPhddepdX\",\"idSess\":\"544\",\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"notIn\":[\"7\",\"6\",\"5\"]}'),(545,'2016-12-22 16:59:34',1,'ieUWDsanU5lT1Qk58tkqZn8ZtnlwQ7itCGbnAvklZy7CRc08gM63qEUPxafWUQuzZ3bHMbcJ6tQ8KRTDLUAlYLSb2ZGlkj3F7nVK','{\"codSess\":\"ieUWDsanU5lT1Qk58tkqZn8ZtnlwQ7itCGbnAvklZy7CRc08gM63qEUPxafWUQuzZ3bHMbcJ6tQ8KRTDLUAlYLSb2ZGlkj3F7nVK\",\"idSess\":\"545\",\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"notIn\":[\"7\",\"6\",\"5\"]}'),(546,'2016-12-22 16:59:34',1,'eiRrGSiAxNC0NK6RauvURhyO3vpWQKxkrqlxB5vFfCxFB55XAVTuzXNiU1F26sZqAw83u1NdWmoMswHsQutOu6NG2h4nfy9e0vZo','{\"codSess\":\"eiRrGSiAxNC0NK6RauvURhyO3vpWQKxkrqlxB5vFfCxFB55XAVTuzXNiU1F26sZqAw83u1NdWmoMswHsQutOu6NG2h4nfy9e0vZo\",\"idSess\":\"546\",\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"notIn\":[\"7\",\"6\",\"5\"]}'),(547,'2016-12-22 16:59:35',1,'SEWghEmSTasIaAnaAhE7w5NYvtdo32k9IHyw5M5MB4JfRAnXrm4MR0lu0zWTdBQ0ErUKpdgVxj3qoKNq0MZlpkF2urTcOWn24XyK','{\"codSess\":\"SEWghEmSTasIaAnaAhE7w5NYvtdo32k9IHyw5M5MB4JfRAnXrm4MR0lu0zWTdBQ0ErUKpdgVxj3qoKNq0MZlpkF2urTcOWn24XyK\",\"idSess\":\"547\",\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"notIn\":[\"7\",\"6\",\"5\"]}'),(548,'2016-12-22 16:59:35',1,'ytE6twtXzZ4qKcJTQJp1Wu3rUyB0EclGhUhOdfldUTU1UkdsBXGrMHwAV1vIKWUhDjAgefYwGeg5H6bHp6JUO8usvEWigJ6ufx8d','{\"codSess\":\"ytE6twtXzZ4qKcJTQJp1Wu3rUyB0EclGhUhOdfldUTU1UkdsBXGrMHwAV1vIKWUhDjAgefYwGeg5H6bHp6JUO8usvEWigJ6ufx8d\",\"idSess\":\"548\",\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"notIn\":[\"7\",\"6\",\"5\"]}'),(549,'2016-12-22 16:59:35',1,'i40cU8gT6Wf3Huas7oQW2zbF3VJDFKqdFLT1Jc1hhZkO7K3TiflDOsK3sDol9rVEA48NqadMYupM06e7B7XDUQMYnHY852kMWniR','{\"codSess\":\"i40cU8gT6Wf3Huas7oQW2zbF3VJDFKqdFLT1Jc1hhZkO7K3TiflDOsK3sDol9rVEA48NqadMYupM06e7B7XDUQMYnHY852kMWniR\",\"idSess\":\"549\",\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"notIn\":[\"7\",\"6\",\"5\"]}'),(550,'2016-12-22 16:59:35',1,'uKnR1PUB7N3zDAliQb4GkVO19GBtZdPQwAuGmlX7p2LFvTUKoG26jKgrsSI2RBkauWi8FrQZOt48B3ywMdCtmrMzQmtRt70CTfGB','{\"codSess\":\"uKnR1PUB7N3zDAliQb4GkVO19GBtZdPQwAuGmlX7p2LFvTUKoG26jKgrsSI2RBkauWi8FrQZOt48B3ywMdCtmrMzQmtRt70CTfGB\",\"idSess\":\"550\",\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"notIn\":[\"7\",\"6\",\"5\"]}'),(555,'2016-12-22 16:59:47',1,'HVOpyLd13Uh1Y9q5f4H9eF9u9EJiAYzsGTRtq75MlfV9Q0IDN0yeDvEF7elepCzE5L8saz7Ye3RcMSlnHI5nhrsgjh5NE66Skw9u','{\"codSess\":\"HVOpyLd13Uh1Y9q5f4H9eF9u9EJiAYzsGTRtq75MlfV9Q0IDN0yeDvEF7elepCzE5L8saz7Ye3RcMSlnHI5nhrsgjh5NE66Skw9u\",\"idSess\":\"555\",\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"notIn\":[\"7\"]}'),(556,'2016-12-22 16:59:55',1,'EQQWYOFtmbmg2enQwAxBjU2HCsm1SCv6PCOjBgGkZyAZToxQ8UgRsBUxY6rkdeeapIwhawmPg3AtMwSSjSCO5griJ4TvZv6bwo0M','{\"codSess\":\"EQQWYOFtmbmg2enQwAxBjU2HCsm1SCv6PCOjBgGkZyAZToxQ8UgRsBUxY6rkdeeapIwhawmPg3AtMwSSjSCO5griJ4TvZv6bwo0M\",\"idSess\":\"556\",\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"notIn\":[\"7\"]}'),(557,'2016-12-22 16:59:56',1,'LFUKWPp1rIDXFV2KtAugrCDOfGY0PcTRZjgiNdsH2eTPLfV17hEZASeNGv9Mz7aLn6ineE3alCYHEaE03ubRbYYr5RZ69ZqwacfG','{\"codSess\":\"LFUKWPp1rIDXFV2KtAugrCDOfGY0PcTRZjgiNdsH2eTPLfV17hEZASeNGv9Mz7aLn6ineE3alCYHEaE03ubRbYYr5RZ69ZqwacfG\",\"idSess\":\"557\",\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"notIn\":[\"7\"]}'),(558,'2016-12-22 16:59:57',1,'DrPKufyT765JuGcKkPSfQROokqVFEhMDXvapVkJCvUIrPPXVtoY9fJmqSLHV2qDifST7hADLQ3GKXQm9MzKixsZ8wzLdHBJhsUBy','{\"codSess\":\"DrPKufyT765JuGcKkPSfQROokqVFEhMDXvapVkJCvUIrPPXVtoY9fJmqSLHV2qDifST7hADLQ3GKXQm9MzKixsZ8wzLdHBJhsUBy\",\"idSess\":\"558\",\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"notIn\":[\"7\"]}'),(559,'2016-12-22 16:59:57',1,'aImk4HHynWXyXvgvkphOWgD2nbonnsPCrFkYLwfWroTo8VFUJK1VDAYZm5Ai2Jk5LMThqXZRjxTJW0mMDmIOicvoWhxPeRJIYAuB','{\"codSess\":\"aImk4HHynWXyXvgvkphOWgD2nbonnsPCrFkYLwfWroTo8VFUJK1VDAYZm5Ai2Jk5LMThqXZRjxTJW0mMDmIOicvoWhxPeRJIYAuB\",\"idSess\":\"559\",\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"notIn\":[\"7\"]}'),(560,'2016-12-22 16:59:57',1,'axvh60LdqrV3VKGpoBp0IGDs4A7SmKEy2QqgtJktxqeAaUuoJj4PqinQ2EYF0pCBoio4ReOgfbOJWR9J91HKWkldMhGETBGl3Vt3','{\"codSess\":\"axvh60LdqrV3VKGpoBp0IGDs4A7SmKEy2QqgtJktxqeAaUuoJj4PqinQ2EYF0pCBoio4ReOgfbOJWR9J91HKWkldMhGETBGl3Vt3\",\"idSess\":\"560\",\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"notIn\":[\"7\"]}'),(561,'2016-12-22 16:59:57',1,'WKng8r3XhttgoLCeavmfMXatCNslerJqSEwPnKV5dejC75J0vGrAL1TswAjym25usvNE9MXV8P5WJVNqrSaSspvZ6Lho0TuLnqXB','{\"codSess\":\"WKng8r3XhttgoLCeavmfMXatCNslerJqSEwPnKV5dejC75J0vGrAL1TswAjym25usvNE9MXV8P5WJVNqrSaSspvZ6Lho0TuLnqXB\",\"idSess\":\"561\",\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"notIn\":[\"7\"]}'),(562,'2016-12-22 16:59:58',1,'iki9phkMwaudheHP8mTgqDXSFWuTOMDsK5SLS40ZkOH7kFy0hJSLBH71XKr1TR706tQHhY317z21cPWbEZaOs6tTUNoNxwpjagDA','{\"codSess\":\"iki9phkMwaudheHP8mTgqDXSFWuTOMDsK5SLS40ZkOH7kFy0hJSLBH71XKr1TR706tQHhY317z21cPWbEZaOs6tTUNoNxwpjagDA\",\"idSess\":\"562\",\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"notIn\":[\"7\"]}'),(563,'2016-12-22 17:00:00',1,'vHAkDbNTFiRsrupG6Y6QzlEKVOi4OgNlHHrBdlAUalT0D1DBWuIiCK6tAJpIypTwPpGwZpdioBDe3JRo65SsrfbUmXBkBTbmvx5F','{\"codSess\":\"vHAkDbNTFiRsrupG6Y6QzlEKVOi4OgNlHHrBdlAUalT0D1DBWuIiCK6tAJpIypTwPpGwZpdioBDe3JRo65SsrfbUmXBkBTbmvx5F\",\"idSess\":\"563\",\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"notIn\":[\"7\"]}'),(564,'2016-12-22 17:00:01',1,'zdkGNzXrAJ48KRBKpR9nH1gE4RMNIkxMlaU8PyTddMLvNLHzYIXbkW61D3AM07AVvELzZCP4qQClpj9T7dSmpN8gWg9vi3UAFKrh','{\"codSess\":\"zdkGNzXrAJ48KRBKpR9nH1gE4RMNIkxMlaU8PyTddMLvNLHzYIXbkW61D3AM07AVvELzZCP4qQClpj9T7dSmpN8gWg9vi3UAFKrh\",\"idSess\":\"564\",\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"notIn\":[\"7\"]}'),(565,'2016-12-22 17:00:01',1,'DfLvcsoFF2AiZYOPcuDIXy14BcGfxpmD9Tye010UgQvFhJmrlKTk06lQaEhhmuZc74hmYBNtRGX8CeXZymjKslo9VgEU1fpfb9Tg','{\"codSess\":\"DfLvcsoFF2AiZYOPcuDIXy14BcGfxpmD9Tye010UgQvFhJmrlKTk06lQaEhhmuZc74hmYBNtRGX8CeXZymjKslo9VgEU1fpfb9Tg\",\"idSess\":\"565\",\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"notIn\":[\"7\"]}'),(566,'2016-12-22 17:00:01',1,'8rlTXNiOglAoSagtywbVnX2nEmEJLk1mg8W2NOpdXzvtewN6K7WNkmy1ygGafihb1lhV27JpsFi7GWZrexnYRiBZYuw71FMGwJBa','{\"codSess\":\"8rlTXNiOglAoSagtywbVnX2nEmEJLk1mg8W2NOpdXzvtewN6K7WNkmy1ygGafihb1lhV27JpsFi7GWZrexnYRiBZYuw71FMGwJBa\",\"idSess\":\"566\",\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"notIn\":[\"7\"]}'),(567,'2016-12-22 17:00:01',1,'DdYwQvAVoilBuYlg5NWSCZ8onoMktserSRUTdpjzXxATt7OK7xw9w9jzCWpfqOSJSSnyvILFyMzJLeJ7jDlMpRkEQdaryk8Ws2og','{\"codSess\":\"DdYwQvAVoilBuYlg5NWSCZ8onoMktserSRUTdpjzXxATt7OK7xw9w9jzCWpfqOSJSSnyvILFyMzJLeJ7jDlMpRkEQdaryk8Ws2og\",\"idSess\":\"567\",\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"notIn\":[\"7\"]}'),(568,'2016-12-22 17:00:01',1,'S3bMrmwrS9jMyOO75iHkO3DblAE9A0pi4b7n8vYR8TfgsrxKDsKt2BP7vZ2QTIql4TxxAwhuOIS3KU1pI0YCB0FqxSSldgWeWQz1','{\"codSess\":\"S3bMrmwrS9jMyOO75iHkO3DblAE9A0pi4b7n8vYR8TfgsrxKDsKt2BP7vZ2QTIql4TxxAwhuOIS3KU1pI0YCB0FqxSSldgWeWQz1\",\"idSess\":\"568\",\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"notIn\":[\"7\"]}'),(569,'2016-12-22 17:00:01',1,'4XfBkQwODlDyxWm9TnkyMpWvMS4QEYbsBRy4YJjF6EWYo3MRaIIiDw3JxPE8VaXDylpBxfX5TchvkAlvsgZWpuSorQnlrV7q50iX','{\"codSess\":\"4XfBkQwODlDyxWm9TnkyMpWvMS4QEYbsBRy4YJjF6EWYo3MRaIIiDw3JxPE8VaXDylpBxfX5TchvkAlvsgZWpuSorQnlrV7q50iX\",\"idSess\":\"569\",\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"notIn\":[\"7\"]}'),(570,'2016-12-22 17:00:03',1,'UElL0za5s36iWG1SLVpEeh8NS5sGFYQcR8RC0rlwXKVc8xGm2lDPpcifA6kQzjvjDKAJZtyQcyyuI7Ov1mDZJBH0NzYGbRcZM996','{\"codSess\":\"UElL0za5s36iWG1SLVpEeh8NS5sGFYQcR8RC0rlwXKVc8xGm2lDPpcifA6kQzjvjDKAJZtyQcyyuI7Ov1mDZJBH0NzYGbRcZM996\",\"idSess\":\"570\",\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"notIn\":[\"6\",\"7\"]}'),(571,'2016-12-22 17:00:04',1,'xz1Et3JE5IQgtGZNmIvmnUIm9iGH3rfW0zCFa1TwQgvLGl0jxLSyaGkJi9T6GcR3MVoOc6ayE60afpaiSp9OeQDTRvvPdb6442t4','{\"codSess\":\"xz1Et3JE5IQgtGZNmIvmnUIm9iGH3rfW0zCFa1TwQgvLGl0jxLSyaGkJi9T6GcR3MVoOc6ayE60afpaiSp9OeQDTRvvPdb6442t4\",\"idSess\":\"571\",\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"notIn\":[\"5\",\"6\",\"7\"]}'),(573,'2016-12-22 17:00:14',1,'5BUmybkdMlgfJ1QUS3hvtF5oWadP1Xbmqi8iPNL1KePqewz06222iS2PWn6wcGvk1rrmfZiBw4c5A6Hlyh2xLrgrgDXyLNB6Kj0J','{\"codSess\":\"5BUmybkdMlgfJ1QUS3hvtF5oWadP1Xbmqi8iPNL1KePqewz06222iS2PWn6wcGvk1rrmfZiBw4c5A6Hlyh2xLrgrgDXyLNB6Kj0J\",\"idSess\":\"573\",\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"notIn\":[\"7\"]}'),(574,'2016-12-22 17:01:36',1,'wzMIhP71UF1BgwQBS8ezIAoxCurjhdlAxqzn2rUmRIWfMNzKCC3alYMdJefe1f1qFQE2WX7ZoUR1X2R9hYazmHGnsRncxACtF7Ht','{\"codSess\":\"wzMIhP71UF1BgwQBS8ezIAoxCurjhdlAxqzn2rUmRIWfMNzKCC3alYMdJefe1f1qFQE2WX7ZoUR1X2R9hYazmHGnsRncxACtF7Ht\",\"idSess\":\"574\",\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"notIn\":[\"7\",\"6\",\"5\"]}'),(575,'2016-12-22 17:15:08',1,'u0uWk9MCfI1jXxKLgPFDzNqQRir1mqtwHH15BsDaXxyKKxTQjIChYMXnGaKUspneZCn3wfDKwohzxY8xMMklgbZzA6exh23rNqaO','{\"codSess\":\"u0uWk9MCfI1jXxKLgPFDzNqQRir1mqtwHH15BsDaXxyKKxTQjIChYMXnGaKUspneZCn3wfDKwohzxY8xMMklgbZzA6exh23rNqaO\",\"idSess\":\"575\",\"dadosUsuarioLogado\":{\"id\":\"2\",\"local\":\"1\"},\"notIn\":[\"7\",\"6\",\"5\"]}'),(576,'2016-12-22 17:15:25',1,'XbgRsmWDzyNEBphloF8qz4vh1CgI9JVpghqOQXkgC5jEsSx2sZxWNpp6GCbvnXyxRoqIqymRFm7DxhopczYuLFPkne53mPUiVUjz','{\"codSess\":\"XbgRsmWDzyNEBphloF8qz4vh1CgI9JVpghqOQXkgC5jEsSx2sZxWNpp6GCbvnXyxRoqIqymRFm7DxhopczYuLFPkne53mPUiVUjz\",\"idSess\":\"576\",\"dadosUsuarioLogado\":{\"id\":\"1\",\"local\":\"1\"},\"notIn\":[\"7\",\"6\",\"5\"]}'),(577,'2016-12-22 17:15:32',1,'RrWJP50Jm7vodCvEVHaBeXF8v4c8Ui0Iv7Q5boGSaP982TxasCxzlUeZQ4Eb96sMOKzO9ShmFAN7dTD4J9z9rgrtGiFuHxZyRePG','{\"codSess\":\"RrWJP50Jm7vodCvEVHaBeXF8v4c8Ui0Iv7Q5boGSaP982TxasCxzlUeZQ4Eb96sMOKzO9ShmFAN7dTD4J9z9rgrtGiFuHxZyRePG\",\"idSess\":\"577\",\"dadosUsuarioLogado\":{\"id\":\"1\",\"local\":\"1\"},\"notIn\":[\"7\",\"6\",\"5\"]}'),(578,'2016-12-22 17:15:36',1,'OTCcljaJf6YOtITXUrYW9dP2QmmWOQ2tPkJWl0Wa1rK9sxE41Zvp9PkErbNidZh5X6ir8pRvwrHec0ImzhBB6uj0wqeTb3cWvBgg','{\"codSess\":\"OTCcljaJf6YOtITXUrYW9dP2QmmWOQ2tPkJWl0Wa1rK9sxE41Zvp9PkErbNidZh5X6ir8pRvwrHec0ImzhBB6uj0wqeTb3cWvBgg\",\"idSess\":\"578\",\"dadosUsuarioLogado\":{\"id\":\"1\",\"local\":\"1\"},\"notIn\":[\"7\",\"6\",\"5\"]}'),(580,'2016-12-23 13:00:57',1,'XReulGOoWtHiwW5I6l2IUAW6SIZpd2TDgtDEh0NwT0txjWXva2XQGc26Sm5jdQeDQmiIH3ppq9XXvNk6l5D4b3bvHS1ues9ZYssU','{\"codSess\":\"XReulGOoWtHiwW5I6l2IUAW6SIZpd2TDgtDEh0NwT0txjWXva2XQGc26Sm5jdQeDQmiIH3ppq9XXvNk6l5D4b3bvHS1ues9ZYssU\",\"idSess\":\"580\",\"dadosUsuarioLogado\":{\"id\":\"2\"}}'),(581,'2016-12-23 13:01:01',1,'CjgAXeRf7KOYhtLcQTBu8nuTOgNV6GbenpAB0L5hHGqDD0bxVEwBtE711TktEKYnMW0G1tNIlYsgQMUZLl2bC7ylq4GdUMFg30qF','{\"codSess\":\"CjgAXeRf7KOYhtLcQTBu8nuTOgNV6GbenpAB0L5hHGqDD0bxVEwBtE711TktEKYnMW0G1tNIlYsgQMUZLl2bC7ylq4GdUMFg30qF\",\"idSess\":\"581\",\"dadosUsuarioLogado\":{\"id\":\"2\"}}');
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
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sms_codigo`
--

LOCK TABLES `sms_codigo` WRITE;
/*!40000 ALTER TABLE `sms_codigo` DISABLE KEYS */;
INSERT INTO `sms_codigo` VALUES (1,'cJmxpV','5532987072490',7,1,'2016-11-29 16:25:29',1,0,NULL),(2,'A5t4Rt','5532988888888',7,1,'2016-11-29 16:26:20',0,1,21),(7,'Ao8mvu','5532987072490',7,1,'2016-11-29 16:28:45',1,0,NULL),(8,'PqgWvZ','26656565',11,1,'2016-11-29 16:30:48',1,1,22),(9,'hY5QZf','55328987072940',4,1,'2016-12-02 15:36:13',0,0,NULL),(10,'k92KuC','123',11,1,'2016-12-02 18:01:16',1,1,1),(11,'MDbVZZ','123',11,1,'2016-12-02 18:04:02',1,0,NULL),(12,'aNDp2Q','147',11,1,'2016-12-02 18:05:34',1,0,NULL),(13,'Hw2JK1','123',11,1,'2016-12-02 18:14:57',1,0,NULL),(14,'ZTOaCR','12345',11,1,'2016-12-02 18:17:54',1,0,NULL),(15,'C4YagV','123456',11,1,'2016-12-02 18:19:09',1,0,NULL),(16,'Jm3FGR','159159',11,1,'2016-12-02 18:26:42',1,1,30),(17,'rIOhGN','159159',11,1,'2016-12-05 13:07:34',0,0,NULL),(18,'Pu3AWK','159159',11,1,'2016-12-05 13:07:51',1,0,NULL),(19,'ujV14L','321',4,1,'2016-12-05 13:09:06',1,0,NULL),(20,'rYf1dy','321',4,1,'2016-12-05 13:09:50',0,0,NULL),(21,'pvkTzB','321',4,1,'2016-12-05 13:10:35',1,0,NULL),(22,'z6ISua','11',11,1,'2016-12-05 13:11:37',1,1,33),(23,'YmPlrF','159159',11,1,'2016-12-05 13:14:24',0,0,NULL),(24,'I7cEUk','14789',11,1,'2016-12-05 13:14:38',1,0,NULL),(25,'vTXseg','10000',11,1,'2016-12-05 13:15:35',1,1,34),(26,'pigS9r','123',11,1,'2016-12-05 13:16:57',1,0,NULL),(27,'MBIvC6','5532987072490',7,1,'2016-12-07 17:17:44',0,0,NULL),(28,'V1FZkn','5532987072490',7,1,'2016-12-07 17:17:45',0,0,NULL),(29,'NBpvNe','5532987072490',7,1,'2016-12-07 17:18:11',0,0,NULL),(30,'ifDCJO','5532987072490',7,1,'2016-12-07 17:18:11',0,0,NULL),(31,'svkVuK','5532987072490',7,1,'2016-12-07 17:18:12',0,0,NULL),(32,'qpmEfS','5532987072490',7,1,'2016-12-07 17:18:21',0,0,NULL),(33,'PKc24r','5532987072490',7,1,'2016-12-07 17:18:22',0,0,NULL),(34,'tGutQm','5532987072490',7,1,'2016-12-07 17:18:22',0,0,NULL),(35,'f86abE','5532987072490',7,1,'2016-12-07 17:18:41',0,0,NULL),(36,'2uRzB5','5532987072490',1,1,'2016-12-07 17:21:47',0,0,NULL),(37,'IoJR3S','5532987072490',1,1,'2016-12-07 17:22:38',0,0,NULL),(38,'fKf0JZ','5532987072490',1,1,'2016-12-07 17:25:07',0,0,NULL),(39,'hIDher','5532984925880',1,1,'2016-12-07 17:25:27',0,0,NULL),(40,'6KSacF','5532987072490',1,1,'2016-12-07 17:39:44',0,0,NULL),(41,'ivsbyc','5532987072490',1,1,'2016-12-07 17:40:21',0,0,NULL),(42,'PTrrnV','123',11,1,'2016-12-09 14:40:09',1,0,NULL),(43,'f6XiZD','5532987072490',1,1,'2016-12-09 14:53:16',0,0,NULL),(44,'tMIgS7','5532987072490',1,1,'2016-12-09 14:55:26',0,0,NULL),(45,'ZO4Dlx','1',11,1,'2016-12-14 18:13:01',1,0,NULL),(46,'bcTHD7','123156456',11,1,'2016-12-19 17:23:55',1,0,NULL),(47,'8YbQqz','123123112313',11,1,'2016-12-19 17:26:16',0,0,NULL),(48,'UETay2','123123112313',11,1,'2016-12-19 17:26:24',1,0,NULL),(49,'KFBDKq','456456',11,1,'2016-12-20 14:48:50',0,0,NULL),(50,'D9jZAu','456456',11,1,'2016-12-20 14:48:51',0,0,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_notificacoes`
--

LOCK TABLES `tipo_notificacoes` WRITE;
/*!40000 ALTER TABLE `tipo_notificacoes` DISABLE KEYS */;
INSERT INTO `tipo_notificacoes` VALUES (1,'pediu para te seguir',1,'2016-12-14 16:43:10'),(2,'aceitou seu pedido para segui-lo',1,'2016-12-14 16:43:10'),(3,'respondeu a sua pergunta em ',1,'2016-12-14 16:43:10'),(4,'fez a sua primeira publicação em ',1,'2016-12-14 16:43:10'),(5,'começou a te seguir',1,'2016-12-14 16:43:10');
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
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'editado','HTTP://172.17.0.2/Quickpeek//file/imagem/img/qTa-2016-11-09-13-38-01.png','2000-01-01','123','2016-12-02 18:01:16',1,1,1,3,NULL),(2,'Teste2',NULL,'2000-01-01','3222222222','2016-11-08 16:09:07',1,1,1,0,NULL),(3,'Diego','HTTP://172.17.0.2/Quickpeek//file/imagem/img/qTa-2016-11-09-13-38-01.png','2000-01-01','123123112313','2016-11-09 13:38:01',1,1,1,0,NULL),(4,'editado',NULL,'2000-01-01','123123112313','2016-11-09 15:37:33',1,1,1,0,NULL),(5,'Diego','HTTP://172.17.0.2/Quickpeek//file/imagem/img/B35-2016-11-09-16-16-23.png','2000-01-01','123123112313','2016-11-09 16:16:23',1,1,1,0,NULL),(6,'guilherme',NULL,'2000-01-01','123123112313','2016-11-09 16:54:22',1,2,1,0,NULL),(7,'Diegu','HTTP://172.17.0.2/Quickpeek//file/imagem/img/Tpm-2016-11-09-17-14-46.png','2000-02-12','123123112313','2016-11-09 17:14:46',1,1,1,0,NULL),(8,'1',NULL,'2000-01-01','123123112313','2016-11-10 13:22:39',1,1,1,0,NULL),(9,'1',NULL,'2000-01-01','123123112313','2016-11-10 17:29:42',1,1,1,0,NULL),(10,'Diego',NULL,'2000-01-01','123123112313','2016-11-11 14:30:10',1,1,1,1,NULL),(11,'Diego',NULL,'2000-01-01','123123112313','2016-11-11 16:11:55',1,1,1,0,NULL),(12,'Diego',NULL,'2000-01-01','123123112313','2016-11-11 17:36:17',1,1,1,0,NULL),(13,'Diego',NULL,'2000-01-01','123123112313','2016-11-14 13:35:54',1,1,1,0,NULL),(14,'a','HTTP://172.17.0.2/Quickpeek//file/imagem/img/GgN-2016-11-21-16-50-13.png','2000-01-01','123123112313','2016-11-21 16:50:13',1,1,1,0,NULL),(15,'Usuario1','HTTP://172.17.0.2/Quickpeek//file/imagem/img/KAu-2016-11-25-16-23-04.png','2000-07-09','1234567892','2016-11-25 16:23:04',1,1,1,0,NULL),(16,'Diego','HTTP://172.17.0.2/Quickpeek//file/imagem/img/lNW-2016-11-28-15-18-11.png','2000-01-01','32987072490','2016-11-28 15:18:11',1,1,1,0,NULL),(17,'Diego','HTTP://172.17.0.2/Quickpeek//file/imagem/img/DE8-2016-11-28-15-18-27.png','2000-01-01','32987072490','2016-11-28 15:35:12',1,1,1,6,19),(19,'editado','HTTP://172.17.0.2/Quickpeek//file/imagem/img/8eV-2016-11-28-16-37-28.png','2000-07-18','5532987072490','2016-11-28 16:37:40',1,2,1,4,21),(20,'Diego1','HTTP://172.17.0.2/Quickpeek//file/imagem/img/TFb-2016-11-29-16-12-46.png','2000-01-01','15532987072490','2016-11-29 16:12:46',1,2,1,0,39),(21,'Diego',NULL,'2000-07-17','5532988888888','2016-11-29 16:26:53',1,2,1,0,1),(22,'dadsa',NULL,'2000-01-01','26656565','2016-11-29 16:30:48',1,1,1,0,7),(23,'1',NULL,'2000-01-01','123123112313','2016-12-01 16:31:22',1,1,1,0,NULL),(24,'159159',NULL,'2000-01-01','21695165','2016-12-02 18:06:20',1,1,1,0,12),(26,'159159',NULL,'2000-01-01','21695165','2016-12-02 18:12:14',1,1,1,0,12),(27,'159159',NULL,'2000-01-01','21695165','2016-12-02 18:13:54',1,1,1,0,12),(28,'aaa','HTTP://172.17.0.2/Quickpeek//file/imagem/img/JKt-2016-12-02-18-15-28.png','2000-01-01','123','2016-12-02 18:15:28',1,1,1,0,13),(29,'aaa',NULL,'2000-01-01','12345','2016-12-02 18:18:06',1,1,1,0,14),(30,'2',NULL,'2000-01-01','159159','2016-12-02 18:26:42',1,2,2,0,15),(31,'aaadsdsds',NULL,'2000-01-01','159159','2016-12-05 13:08:01',1,2,2,0,18),(32,'dasdsa',NULL,'2000-01-01','321','2016-12-05 13:09:13',1,1,1,0,19),(33,'adsdasda',NULL,'2000-01-01','11','2016-12-05 13:11:37',1,1,1,0,21),(34,'adsad',NULL,'2000-01-01','10000','2016-12-05 13:15:35',1,1,1,0,24),(36,NULL,'HTTP://172.17.0.2/Quickpeek//file/imagem/img/DvY-2016-12-12-14-26-47.png',NULL,NULL,'2016-12-12 14:26:47',1,NULL,NULL,0,NULL),(37,'Diego','HTTP://172.17.0.2/Quickpeek//file/imagem/img/xJm-2016-12-12-14-34-04.png','2000-01-01','3123123213','2016-12-12 14:34:29',1,1,1,0,42),(39,'dasdasda','HTTP://172.17.0.2/Quickpeek//file/imagem/img/ggQ-2016-12-12-17-14-43.png','2000-01-01','312312312','2016-12-14 18:12:17',1,2,1,0,42),(40,'aaaa','HTTP://172.17.0.2/Quickpeek//file/imagem/img/ggQ-2016-12-12-17-14-43.png','2000-01-01','1','2016-12-14 18:13:20',1,1,1,0,45),(41,'dasdsadsa','HTTP://172.17.0.2/Quickpeek//file/imagem/img/ggQ-2016-12-12-17-14-43.png','2000-01-01',NULL,'2016-12-19 17:24:50',1,1,2,0,46),(42,'dasdsadsa','HTTP://172.17.0.2/Quickpeek//file/imagem/img/ggQ-2016-12-12-17-14-43.png','2000-01-01',NULL,'2016-12-19 17:25:34',1,1,2,0,46),(43,'dasdasda','HTTP://172.17.0.2/Quickpeek//file/imagem/img/ggQ-2016-12-12-17-14-43.png','2000-01-01','123123112313','2016-12-19 17:26:48',1,1,1,0,48),(44,'dasdasda','HTTP://172.17.0.2/Quickpeek//file/imagem/img/ggQ-2016-12-12-17-14-43.png','2000-01-01','123123112313','2016-12-19 17:30:08',1,1,1,0,48),(45,'dasdas','/file/imagem/2016_12_20_14_53_50_4127329003.jpeg','1996-09-13','456456','2016-12-20 14:54:19',1,1,1,0,NULL),(46,'dasdas','/file/imagem/2016_12_20_14_53_50_4127329003.jpeg','1996-09-13','456456','2016-12-20 14:55:56',1,1,1,0,NULL),(47,'dasdas','http://172.17.0.2/Quickpeek//file/imagem/2016_12_20_14_56_25_1782109216.jpeg','1996-09-13','456456','2016-12-20 14:56:31',1,1,1,0,NULL),(48,'Teste','http://172.17.0.2/Quickpeek//file/imagem/2016_12_20_14_57_47_9527726610.jpeg','1996-09-13','456456','2016-12-20 14:57:55',1,1,2,0,NULL),(49,'Teste','http://172.17.0.2/Quickpeek//file/imagem/2016_12_20_15_03_40_2258150028.jpeg','1996-09-13','456456','2016-12-20 15:03:48',1,1,1,0,NULL),(50,'Teste','http://172.17.0.2/Quickpeek//file/imagem/2016_12_20_15_14_37_2250349601.jpeg','1996-09-13','456456','2016-12-20 15:14:43',1,1,1,0,NULL),(51,'Teste','http://172.17.0.2/Quickpeek//file/imagem/2016_12_20_16_31_14_4190363872.jpeg','1996-09-13','456456','2016-12-20 16:31:21',1,1,1,0,NULL);
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

-- Dump completed on 2016-12-23 13:03:02
